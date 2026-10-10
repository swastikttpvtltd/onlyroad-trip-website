"use client";
import { useEffect, useRef } from "react";
import { normalizeLeadContact } from "@/lib/lead-contact";

type Details = { fullName?: string; mobile?: string; countryCode?: string; email?: string; destination?: string; travelDate?: string };

export function usePartialLeadCapture(formKey: string, details: Details) {
  const latest = useRef(details);
  const queue = useRef<{ payload: string; saved: string; busy: boolean; attempts: number; id: string }>({ payload: "", saved: "", busy: false, attempts: 0, id: "" });
  const trigger = useRef<() => void>(() => {});
  useEffect(() => { latest.current = details; });

  useEffect(() => {
    const state = queue.current;
    const key = `ort-capture:${formKey}:${window.location.pathname}`;
    try { state.id = sessionStorage.getItem(key) || crypto.randomUUID(); sessionStorage.setItem(key, state.id); }
    catch { state.id = crypto.randomUUID(); }
    let stopped = false;
    let retry: ReturnType<typeof setTimeout> | undefined;
    async function send() {
      if (stopped || state.busy || !state.payload || state.payload === state.saved) return;
      state.busy = true;
      const payload = state.payload;
      try {
        const response = await fetch("/api/partial-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true, signal: AbortSignal.timeout(10000) });
        const result = await response.json();
        if (!response.ok || result.success !== true) throw new Error("Lead capture not confirmed");
        state.saved = payload; state.attempts = 0;
      } catch {
        state.attempts += 1;
        // Bounded retries prevent an outage from flooding the API; online/input changes retry again.
        if (!stopped && state.attempts <= 5) retry = setTimeout(() => void send(), Math.min(1000 * 2 ** state.attempts, 30000));
      } finally {
        state.busy = false;
        if (!stopped && state.payload !== payload) void send();
      }
    }
    const update = () => {
      const data = latest.current;
      const contact = normalizeLeadContact(data.mobile, data.countryCode, data.email);
      if (!contact.mobile && !contact.email) return;
      state.payload = JSON.stringify({ ...data, ...contact, partialId: state.id, sourcePage: window.location.pathname });
      state.attempts = 0;
      void send();
    };
    const flush = () => {
      update();
      if (state.payload && state.payload !== state.saved) {
        // Same capture ID makes a retry/beacon an update rather than a duplicate lead.
        navigator.sendBeacon?.("/api/partial-lead", new Blob([state.payload], { type: "application/json" }));
      }
    };
    trigger.current = update;
    update();
    window.addEventListener("online", update);
    window.addEventListener("pagehide", flush);
    return () => { flush(); stopped = true; if (retry) clearTimeout(retry); window.removeEventListener("online", update); window.removeEventListener("pagehide", flush); };
  }, [formKey]);

  useEffect(() => { trigger.current(); }, [details.fullName, details.mobile, details.countryCode, details.email, details.destination, details.travelDate]);
}
