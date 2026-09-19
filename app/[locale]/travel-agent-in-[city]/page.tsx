import LegacyPage, { generateMetadata as legacyGenerateMetadata } from "@/app/travel-agent-in-[city]/page";
type Props={params:Promise<{locale:string;city:string}>};
export async function generateMetadata({params}:Props){const {locale,city}=await params;const base=await legacyGenerateMetadata({params:Promise.resolve({city})});const url=`https://www.onlyroadtrip.com/${locale}/travel-agent-in-${city}`;return {...base,alternates:{canonical:url},openGraph:{...(base.openGraph||{}),url}};}
export default async function LocalizedCityPage({params}:Props){const {city}=await params;return <LegacyPage params={Promise.resolve({city})}/>;}
