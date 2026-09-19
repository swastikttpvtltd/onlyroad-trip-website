import LegacyPage from "@/app/book/[slug]/page";
import { packages } from "@/data/packages";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
type Props={params:Promise<{locale:string;slug:string}>;searchParams?:Promise<{departureDate?:string;arrivalDate?:string}>};
export const metadata={robots:{index:false,follow:false}};
export function generateStaticParams(){return SUPPORTED_LOCALES.flatMap(locale=>packages.map(pkg=>({locale,slug:String(pkg.slug)})));}
export default async function LocalizedBookPage({params,searchParams}:Props){return <LegacyPage params={params.then(({slug})=>({slug}))} searchParams={searchParams}/>;}
