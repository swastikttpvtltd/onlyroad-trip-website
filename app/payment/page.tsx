import PaymentSelection from "@/components/PaymentSelection";
import { packages } from "@/data/packages";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const get = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };

  const packageTitle = get("title");
  const pkg = packages.find(
    (item: any) => String(item.title).toLowerCase() === packageTitle.toLowerCase(),
  );
  const duration = get("duration") || String(pkg?.duration ?? "");
  const travellers = Number(get("travellers") || 1);
  const advance = Number(get("advance") || 0);
  const total = Number(get("total") || (advance ? Math.round(advance / 0.3) : 0));
  const rate = Number(get("rate") || (travellers ? Math.round(total / travellers) : 0));

  return (
    <PaymentSelection
      booking={{
        packageTitle,
        packageId: get("packageId") || String(pkg?.packageId ?? ""),
        duration,
        departure: get("date"),
        returnDate: get("returnDate"),
        sharing: get("sharing"),
        travellers,
        rate,
        total,
        advance,
        balance: Number(get("balance") || Math.max(0, total - advance)),
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        purpose: get("purpose"),
      }}
    />
  );
}
