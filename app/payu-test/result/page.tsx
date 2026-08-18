import Link from "next/link";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export default async function PayUTestResultPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const result = first(params.result) || "unverified";
  const txnid = first(params.txnid) || "-";
  const amount = first(params.amount) || "-";

  const isSuccess = result === "success";
  const isFailure = result === "failure";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">PayU Test</p>
        <h1 className="mt-3 text-3xl font-bold">
          {isSuccess ? "Test Payment Successful" : isFailure ? "Test Payment Failed" : "Payment Could Not Be Verified"}
        </h1>
        <p className="mt-4 text-slate-300">
          {isSuccess
            ? "PayU returned a successful response and the callback hash was verified."
            : isFailure
              ? "PayU returned a failure response. This is expected during some sandbox tests."
              : "The callback was received, but the server could not verify the PayU response hash. Do not treat this transaction as paid."}
        </p>

        <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-left text-sm">
          <div className="flex justify-between gap-4"><span className="text-slate-400">Transaction ID</span><span>{txnid}</span></div>
          <div className="flex justify-between gap-4"><span className="text-slate-400">Amount</span><span>₹{amount}</span></div>
          <div className="flex justify-between gap-4"><span className="text-slate-400">Result</span><span className="capitalize">{result}</span></div>
        </div>

        <Link href="/payu-test" className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 hover:bg-slate-200">
          Test Again
        </Link>
      </div>
    </main>
  );
}
