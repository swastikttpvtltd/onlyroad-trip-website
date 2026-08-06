"use client";

import { useState } from "react";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert("Booking Form Submitted Successfully!");
  }

  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-slate-900">
        Book This Tour
      </h2>

      <p className="mt-2 text-slate-600">
        Fill in your details and our travel expert will contact you shortly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label className="mb-2 block font-semibold">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-cyan-600"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Mobile Number
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-cyan-600"
            placeholder="9876543210"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-cyan-600"
            placeholder="name@email.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Travel Date
          </label>

          <input
            type="date"
            value={travelDate}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full rounded-xl border p-3 outline-none focus:border-cyan-600"
            required
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold">
              Adults
            </label>

            <input
              type="number"
              min={1}
              value={adults}
              onChange={(e) =>
                setAdults(Number(e.target.value))
              }
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Children
            </label>

            <input
              type="number"
              min={0}
              value={children}
              onChange={(e) =>
                setChildren(Number(e.target.value))
              }
              className="w-full rounded-xl border p-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Special Request
          </label>

          <textarea
            rows={5}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            className="w-full rounded-xl border p-3"
            placeholder="Any special requirements..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-600 py-4 text-lg font-bold text-white transition hover:bg-cyan-700"
        >
          Book Now
        </button>
      </form>
    </section>
  );
}