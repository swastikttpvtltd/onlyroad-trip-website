const byState: Record<string, string> = {
  Gujarat: "October to March",
  Rajasthan: "October to March",
  Uttarakhand: "March to June & September to November",
  "Uttar Pradesh": "October to March",
  "Multi-State": "October to March",
  Kashmir: "March to October; December to February for snow",
  "Himachal Pradesh": "March to June & September to December",
  Ladakh: "May to September",
  Punjab: "October to March",
  Kerala: "September to March",
  Goa: "November to February",
  Maharashtra: "October to March",
  "Madhya Pradesh": "October to March",
  Sikkim: "March to June & October to December",
  "West Bengal": "October to March",
  "Assam & Meghalaya": "October to April",
  Karnataka: "October to March",
  "Tamil Nadu": "October to March",
  "Andaman & Nicobar Islands": "October to May",
  Lakshadweep: "October to March",
};

export function getBestTime(pkg: any): string {
  const state = String(pkg.state ?? "");
  const title = String(pkg.title ?? "").toLowerCase();

  if (title.includes("char dham") || title.includes("do dham") || title.includes("kedarnath") || title.includes("badrinath")) return "May to June & September to October (subject to temple opening dates and weather)";
  if (title.includes("amarnath")) return "June to August (during the officially notified Amarnath Yatra period)";
  if (title.includes("tungnath") || title.includes("chopta") || title.includes("madhyamaheshwar")) return "April to June & September to November";
  if (title.includes("spiti")) return "May to October";
  if (state === "Ladakh" || title.includes("leh ladakh")) return "May to September";
  if (title.includes("rann") || title.includes("ram utsav")) return "November to February";
  if (title.includes("gir") || title.includes("corbett") || title.includes("kanha") || title.includes("bandhavgarh") || title.includes("kaziranga")) return "November to April (wildlife zones and park closures are subject to official schedules)";
  if (title.includes("tulip")) return "Late March to April (bloom timing varies by weather)";
  if (title.includes("winter") && state === "Kashmir") return "December to February for snowfall and winter experiences";
  if (title.includes("honeymoon") && state === "Kashmir") return "April to June & December to February";
  if (title.includes("andaman")) return "October to May";
  if (title.includes("lakshadweep")) return "October to March";
  if (title.includes("goa")) return "November to February";
  if (title.includes("munnar") || title.includes("kerala")) return "September to March";
  if (title.includes("darjeeling") || title.includes("gangtok") || state === "Sikkim") return "March to June & October to December";
  if (title.includes("rameswaram") || state === "Tamil Nadu") return "October to March";
  if (title.includes("saputara")) return "July to March";
  if (title.includes("mount abu")) return "October to March";
  if (title.includes("manali") || title.includes("shimla") || title.includes("dalhousie") || title.includes("kasol")) return "March to June & October to February";
  if (title.includes("nainital") || title.includes("mussoorie") || title.includes("auli")) return "March to June & October to February";

  return byState[state] ?? "October to March";
}