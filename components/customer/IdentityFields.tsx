"use client";
const types = [{ value: "Aadhaar", label: "Aadhaar Card" }, { value: "PAN", label: "PAN Card" }, { value: "Voter ID", label: "Voter ID" }, { value: "Passport", label: "Passport" }, { value: "Driving licence", label: "Driving Licence" }];
export default function IdentityFields({ type, number, onTypeChange, onNumberChange, savedMask }: { type: string; number: string; onTypeChange: (value: string) => void; onNumberChange: (value: string) => void; savedMask?: string | null }) {
  return <fieldset className="rounded-xl border border-slate-200 p-4 mt-5">
    <legend className="px-2 text-sm font-bold text-blue-800">ID details (optional)</legend>
    {savedMask && <p className="text-sm text-slate-600">Saved ID: {savedMask}</p>}
    <label>ID type<select value={type} onChange={event => onTypeChange(event.target.value)}>{types.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
    <label>ID number (optional)<input type="text" maxLength={64} autoComplete="off" spellCheck={false} value={number} onChange={event => onNumberChange(event.target.value)} placeholder={savedMask ? "Leave blank to keep your saved ID" : "Aadhaar or other government ID number"} />
      <small>You can leave this blank. A saved ID is shown only with its last four characters.</small>
    </label>
  </fieldset>;
}
