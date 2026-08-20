const d=(n:string,t:string,m:string[],a:string[],e:string[],distance?:string,driveTime?:string)=>({day:`Day ${n}`,title:t,morning:m,afternoon:a,evening:e,distance,driveTime});
const themes=["Jyotirlinga","Pilgrimage","Spiritual","Senior Citizen","Family"];
const base=(id:string,slug:string,state:string,title:string,duration:string,destination:string,short:string,overview:string,highlights:string[],pickup:string,drop:string,itinerary:any[],bestSeason="October – March",difficulty="Easy")=>({id,slug,state,title,duration,destination,category:"Pilgrimage",themes,short,overview,highlights,quickFacts:{pickup,drop,transport:"Private AC Vehicle",meals:"Breakfast & Dinner",hotelCategory:"3-Star Hotels / Similar",bestSeason},itinerary,bestTime:bestSeason,groupSize:"2-12 Persons",difficulty});

export const individualJyotirlingaPackages=[
base("jyotirlinga-somnath-3n4d","somnath-jyotirlinga-yatra","Gujarat","Somnath Jyotirlinga Yatra – Gujarat","3 Nights / 4 Days","Ahmedabad • Somnath • Bhalka Tirth • Dwarka","A comfortable Gujarat pilgrimage built around Somnath Jyotirlinga with Dwarka and coastal spiritual highlights.",["Somnath Jyotirlinga","Somnath Temple evening programme","Bhalka Tirth","Triveni Sangam","Dwarkadhish Temple"],"Ahmedabad","Ahmedabad",[
d("1","Ahmedabad – Somnath",["Pickup from airport / railway station","Drive to Somnath"],["Hotel check-in","Rest"],["Somnath Jyotirlinga darshan if time permits","Dinner and overnight"],"Approx. 410 KM","8–9 Hours"),
d("2","Somnath Darshan & Spiritual Circuit",["Breakfast","Somnath Temple darshan"],["Bhalka Tirth","Triveni Sangam"],["Temple programme subject to official schedule","Dinner and overnight"],"Local","Full day"),
d("3","Somnath – Dwarka",["Breakfast and checkout","Drive towards Dwarka"],["Porbandar / selected stop","Hotel check-in"],["Dwarkadhish darshan if time permits","Dinner and overnight"],"Approx. 235 KM","5–6 Hours"),
d("4","Dwarka – Ahmedabad Departure",["Breakfast","Dwarkadhish / local darshan as time permits"],["Return towards Ahmedabad","Lunch at own expense"],["Airport / railway station drop","Yatra concludes"],"Approx. 440 KM","8–9 Hours")]),

base("jyotirlinga-nageshwar-3n4d","nageshwar-jyotirlinga-yatra","Gujarat","Nageshwar Jyotirlinga Yatra – Dwarka Circuit","3 Nights / 4 Days","Ahmedabad • Dwarka • Nageshwar • Bet Dwarka","A focused Dwarka pilgrimage featuring Nageshwar Jyotirlinga, Dwarkadhish and Bet Dwarka.",["Nageshwar Jyotirlinga","Dwarkadhish Temple","Bet Dwarka","Rukmini Devi Temple","Gopi Talav"],"Ahmedabad","Ahmedabad",[
d("1","Ahmedabad – Dwarka",["Pickup and depart for Dwarka"],["Road journey with comfort stops","Hotel check-in"],["Dwarkadhish darshan if arrival permits","Dinner and overnight"],"Approx. 440 KM","8–9 Hours"),
d("2","Dwarka – Nageshwar – Bet Dwarka",["Breakfast","Dwarkadhish Temple darshan","Nageshwar Jyotirlinga darshan"],["Bet Dwarka subject to ferry operations","Rukmini Devi Temple / Gopi Talav"],["Return to hotel","Dinner and overnight"],"Approx. 80–120 KM","Full day"),
d("3","Dwarka – Local Spiritual Circuit",["Breakfast","Dwarka local temples"],["Gopi Talav / selected sites","Leisure"],["Sunset / temple programme as applicable","Dinner and overnight"],"Local","Half/full day"),
d("4","Dwarka – Ahmedabad",["Breakfast and checkout"],["Return drive to Ahmedabad","Meal break"],["Airport / railway station drop","Yatra concludes"],"Approx. 440 KM","8–9 Hours")]),

base("jyotirlinga-mahakaleshwar-3n4d","mahakaleshwar-jyotirlinga-yatra","Madhya Pradesh","Mahakaleshwar Jyotirlinga Yatra – Ujjain","3 Nights / 4 Days","Indore • Ujjain • Mahakaleshwar • Omkareshwar","A senior-citizen-friendly Ujjain pilgrimage centred on Mahakaleshwar with Mahakal Lok and an optional Omkareshwar extension.",["Mahakaleshwar Jyotirlinga","Mahakal Lok","Harsiddhi Temple","Ram Ghat","Optional Omkareshwar"],"Indore","Indore",[
d("1","Indore – Ujjain",["Pickup from Indore airport / railway station","Transfer to Ujjain"],["Hotel check-in","Mahakal Lok"],["Evening spiritual circuit","Dinner and overnight"],"Approx. 55 KM","1.5–2 Hours"),
d("2","Mahakaleshwar Darshan",["Early morning Mahakaleshwar darshan; special aarti only with official booking","Breakfast"],["Harsiddhi Temple","Ram Ghat / Kal Bhairav as time permits"],["Leisure","Dinner and overnight"],"Local","Full day"),
d("3","Optional Omkareshwar Excursion",["Breakfast","Drive to Omkareshwar if selected"],["Omkareshwar Jyotirlinga","Narmada ghats / Mamleshwar"],["Return to Ujjain","Dinner and overnight"],"Approx. 140 KM one way","Full day"),
d("4","Ujjain – Indore Departure",["Breakfast and checkout"],["Transfer to Indore","Airport / railway station"],["Yatra concludes"])]),

base("jyotirlinga-omkareshwar-3n4d","omkareshwar-jyotirlinga-yatra","Madhya Pradesh","Omkareshwar Jyotirlinga Yatra – Narmada Circuit","3 Nights / 4 Days","Indore • Omkareshwar • Maheshwar • Ujjain","A peaceful Narmada-side Jyotirlinga journey with Omkareshwar, Mamleshwar and optional Maheshwar/Ujjain sightseeing.",["Omkareshwar Jyotirlinga","Mamleshwar Temple","Narmada ghats","Omkareshwar Parikrama option","Maheshwar"],"Indore","Indore",[
d("1","Indore – Omkareshwar",["Pickup from Indore","Drive to Omkareshwar"],["Hotel check-in","Narmada ghat"],["Omkareshwar darshan","Dinner and overnight"],"Approx. 80 KM","2–3 Hours"),
d("2","Omkareshwar Darshan",["Breakfast","Omkareshwar Jyotirlinga","Mamleshwar"],["Parikrama subject to local conditions","Narmada ghats"],["Leisure","Dinner and overnight"],"Local","Full day"),
d("3","Maheshwar Excursion",["Breakfast","Drive to Maheshwar"],["Ahilya Fort / Narmada ghat","Return to Omkareshwar"],["Rest","Dinner and overnight"],"Approx. 65 KM each way","Full day"),
d("4","Omkareshwar – Indore",["Breakfast and checkout"],["Return to Indore","Transfer to airport / railway station"],["Yatra concludes"],"Approx. 80 KM","2–3 Hours")]),

base("jyotirlinga-kedarnath-5n6d","kedarnath-jyotirlinga-yatra","Uttarakhand","Kedarnath Jyotirlinga Yatra – Himalayan Pilgrimage","5 Nights / 6 Days","Haridwar • Guptkashi • Kedarnath • Badrinath optional","A carefully paced Kedarnath pilgrimage with acclimatisation, trek/heli planning and senior-citizen-friendly buffers.",["Kedarnath Jyotirlinga","Gaurikund","Kedarnath Temple","Mandir evening aarti subject to schedule","Optional Badrinath extension"],"Haridwar","Haridwar",[
d("1","Haridwar – Guptkashi",["Pickup from Haridwar","Drive towards Guptkashi"],["Comfort stops","Hotel check-in"],["Rest and acclimatisation","Dinner and overnight"],"Approx. 205 KM","8–10 Hours"),
d("2","Guptkashi – Gaurikund – Kedarnath",["Early transfer to Gaurikund","Trek / pony / palki / helicopter as separately booked"],["Continue to Kedarnath","Hotel / camp check-in"],["Kedarnath Temple darshan if operational","Dinner and overnight"],"Route-dependent","Full day"),
d("3","Kedarnath Darshan – Return Base",["Early darshan subject to temple schedule","Breakfast"],["Descend / helicopter return as booked","Transfer to base"],["Rest","Dinner and overnight"],"Route-dependent","Full day"),
d("4","Base – Rishikesh / Haridwar",["Breakfast and checkout","Drive back"],["En-route breaks","Hotel check-in"],["Ganga aarti if timing permits","Dinner and overnight"],"Approx. 190–220 KM","7–9 Hours"),
d("5","Haridwar Local",["Breakfast","Har Ki Pauri / Mansa Devi option"],["Local leisure","Shopping"],["Rest","Dinner and overnight"],"Local","Half day"),
d("6","Departure",["Breakfast and checkout"],["Railway station / airport transfer"],["Yatra concludes"])] ,"Kedarnath season only; dates depend on official temple opening","Moderate"),

base("jyotirlinga-bhimashankar-3n4d","bhimashankar-jyotirlinga-yatra","Maharashtra","Bhimashankar Jyotirlinga Yatra – Pune Circuit","3 Nights / 4 Days","Pune • Bhimashankar • Lonavala","A compact Maharashtra pilgrimage combining Bhimashankar Jyotirlinga with Pune and optional Lonavala.",["Bhimashankar Jyotirlinga","Sahyadri hills","Pune city","Temple forest surroundings","Lonavala optional"],"Pune","Pune",[
d("1","Pune Arrival",["Pickup from Pune airport / railway station"],["Hotel check-in","Pune local sightseeing"],["Rest","Dinner and overnight"],"Local","1–2 Hours"),
d("2","Pune – Bhimashankar",["Early breakfast","Drive to Bhimashankar"],["Jyotirlinga darshan","Temple surroundings"],["Return towards Pune","Dinner and overnight"],"Approx. 110 KM one way","Full day"),
d("3","Pune / Lonavala",["Breakfast","Optional Lonavala excursion"],["Viewpoints / local sightseeing","Return to Pune"],["Leisure","Dinner and overnight"],"Variable","Full day"),
d("4","Pune Departure",["Breakfast and checkout"],["Airport / railway station transfer"],["Yatra concludes"])] ,"October – March","Easy"),

base("jyotirlinga-kashi-vishwanath-3n4d","kashi-vishwanath-jyotirlinga-yatra","Uttar Pradesh","Kashi Vishwanath Jyotirlinga Yatra – Varanasi","3 Nights / 4 Days","Varanasi • Kashi Vishwanath • Sarnath • Ganga Ghats","A spiritually immersive Kashi pilgrimage with temple darshan, Ganga aarti and Sarnath.",["Kashi Vishwanath Jyotirlinga","Ganga Aarti","Kaal Bhairav","Sankat Mochan","Sarnath"],"Varanasi","Varanasi",[
d("1","Varanasi Arrival",["Airport / railway station pickup","Hotel check-in"],["Kashi Vishwanath corridor area / local temples","Rest"],["Ganga Aarti at Dashashwamedh Ghat","Dinner and overnight"],"Local","Local"),
d("2","Kashi Vishwanath Darshan",["Early morning darshan as per official slot","Breakfast"],["Kaal Bhairav","Sankat Mochan / BHU as time permits"],["Ganga ghat walk","Dinner and overnight"],"Local","Full day"),
d("3","Sarnath & Kashi",["Breakfast","Sarnath"],["Dhamek Stupa / museum subject to opening","Free time"],["Optional evening Ganga Aarti","Dinner and overnight"],"Approx. 20 KM local","Half/full day"),
d("4","Varanasi Departure",["Breakfast and checkout"],["Airport / railway station drop"],["Yatra concludes"])]),

base("jyotirlinga-trimbakeshwar-3n4d","trimbakeshwar-jyotirlinga-yatra","Maharashtra","Trimbakeshwar Jyotirlinga Yatra – Nashik","3 Nights / 4 Days","Nashik • Trimbakeshwar • Panchavati • Shirdi optional","A relaxed Nashik pilgrimage featuring Trimbakeshwar Jyotirlinga, Panchavati and optional Shirdi extension.",["Trimbakeshwar Jyotirlinga","Kushavarta Kund","Panchavati","Sita Gufa","Shirdi optional"],"Nashik","Nashik",[
d("1","Nashik Arrival",["Pickup from Nashik airport / railway station","Hotel check-in"],["Panchavati","Ram Kund"],["Rest","Dinner and overnight"],"Local","1–2 Hours"),
d("2","Trimbakeshwar Darshan",["Breakfast","Drive to Trimbakeshwar","Jyotirlinga darshan"],["Kushavarta Kund","Local spiritual circuit"],["Return to Nashik","Dinner and overnight"],"Approx. 30 KM each way","Half/full day"),
d("3","Nashik / Shirdi Optional",["Breakfast","Optional Shirdi excursion"],["Sai Baba Temple subject to official arrangements","Return to Nashik"],["Leisure","Dinner and overnight"],"Variable","Full day"),
d("4","Nashik Departure",["Breakfast and checkout"],["Airport / railway station transfer"],["Yatra concludes"])]),

base("jyotirlinga-baidyanath-3n4d","baidyanath-jyotirlinga-yatra","Jharkhand","Baidyanath Jyotirlinga Yatra – Deoghar","3 Nights / 4 Days","Deoghar • Baidyanath Dham • Basukinath • Dumka","A focused Deoghar pilgrimage covering Baidyanath Jyotirlinga and nearby spiritual sites.",["Baidyanath Jyotirlinga","Baba Baidyanath Dham","Basukinath Temple","Tapovan","Trikut Hills optional"],"Deoghar","Deoghar",[
d("1","Deoghar Arrival",["Pickup from Deoghar airport / railway station","Hotel check-in"],["Local temple area","Rest"],["Evening temple visit subject to official schedule","Dinner and overnight"],"Local","Local"),
d("2","Baidyanath Dham Darshan",["Early morning temple darshan as per official arrangements","Breakfast"],["Basukinath Temple optional","Local spiritual circuit"],["Leisure","Dinner and overnight"],"Local/Regional","Full day"),
d("3","Deoghar Spiritual Circuit",["Breakfast","Tapovan / Trikut Hills subject to weather"],["Local sightseeing","Free time"],["Rest","Dinner and overnight"],"Variable","Half/full day"),
d("4","Deoghar Departure",["Breakfast and checkout"],["Airport / railway station transfer"],["Yatra concludes"])]),

base("jyotirlinga-rameshwaram-3n4d","rameshwaram-jyotirlinga-yatra-3n4d","Tamil Nadu","Rameshwaram Jyotirlinga Yatra – Madurai & Dhanushkodi","3 Nights / 4 Days","Madurai • Rameshwaram • Dhanushkodi • Pamban","A popular South India pilgrimage combining Ramanathaswamy Jyotirlinga darshan with Madurai and Dhanushkodi.",["Ramanathaswamy Jyotirlinga","Agni Theertham","22 Theerthams bathing ritual subject to temple rules","Dhanushkodi","Pamban Bridge","Meenakshi Amman Temple"],"Madurai","Madurai",[
d("1","Madurai Arrival – Madurai Darshan",["Airport / railway station pickup","Hotel check-in"],["Meenakshi Amman Temple","Thirumalai Nayak Palace as time permits"],["Madurai local market / rest","Dinner and overnight"],"Local","Local"),
d("2","Madurai – Rameshwaram",["Breakfast and checkout","Drive to Rameshwaram"],["Pamban Bridge photo stop subject to access","Hotel check-in","Agni Theertham"],["Ramanathaswamy Temple evening visit if schedule permits","Dinner and overnight"],"Approx. 170 KM","4–5 Hours including stops"),
d("3","Rameshwaram Jyotirlinga & Dhanushkodi",["Early Ramanathaswamy Temple darshan","Theertham ritual only as permitted by temple rules"],["Dhanushkodi","Kothandaramaswamy Temple / selected sites"],["Return to hotel and rest","Dinner and overnight"],"Approx. 50–70 KM","Full day"),
d("4","Rameshwaram – Madurai Departure",["Breakfast and checkout","Drive to Madurai"],["Airport / railway station transfer"],["Yatra concludes"] ,"Approx. 170 KM","4–5 Hours")]),

base("jyotirlinga-mallikarjuna-4n5d","mallikarjuna-jyotirlinga-yatra","Andhra Pradesh","Mallikarjuna Jyotirlinga Yatra – Srisailam","4 Nights / 5 Days","Hyderabad • Srisailam • Mallikarjuna • Bhramaramba Devi","A comfortable Srisailam pilgrimage covering Mallikarjuna Jyotirlinga, Bhramaramba Devi and Krishna River viewpoints.",["Mallikarjuna Jyotirlinga","Bhramaramba Devi Temple","Srisailam Dam","Krishna River","Pathala Ganga","Sakshi Ganapati"],"Hyderabad","Hyderabad",[
d("1","Hyderabad – Srisailam",["Pickup from Hyderabad airport / railway station","Drive to Srisailam"],["Hotel check-in","Rest"],["Sakshi Ganapati / local visit if time permits","Dinner and overnight"],"Approx. 215 KM","5–6 Hours"),
d("2","Mallikarjuna Darshan",["Breakfast","Mallikarjuna Jyotirlinga darshan"],["Bhramaramba Devi Temple","Temple complex"],["Evening spiritual walk / rest","Dinner and overnight"],"Local","Full day"),
d("3","Srisailam Spiritual Circuit",["Breakfast","Pathala Ganga"],["Srisailam Dam","Krishna River viewpoints"],["Leisure","Dinner and overnight"],"Local","Half/full day"),
d("4","Optional Local / Buffer Day",["Breakfast","Optional temple / nature circuit"],["Free time","Shopping"],["Rest","Dinner and overnight"],"Local","Flexible"),
d("5","Srisailam – Hyderabad Departure",["Breakfast and checkout","Drive to Hyderabad"],["Airport / railway station drop"],["Yatra concludes"],"Approx. 215 KM","5–6 Hours")],"October – March","Easy"),

base("jyotirlinga-grishneshwar-3n4d","grishneshwar-jyotirlinga-yatra","Maharashtra","Grishneshwar Jyotirlinga Yatra – Ellora & Aurangabad","3 Nights / 4 Days","Aurangabad • Grishneshwar • Ellora • Daulatabad","A heritage-meets-pilgrimage circuit pairing Grishneshwar Jyotirlinga with the UNESCO-listed Ellora Caves and Daulatabad.",["Grishneshwar Jyotirlinga","Ellora Caves","Daulatabad Fort","Bibi Ka Maqbara","Aurangabad heritage"],"Aurangabad","Aurangabad",[
d("1","Aurangabad Arrival",["Airport / railway station pickup","Hotel check-in"],["Bibi Ka Maqbara","Local sightseeing"],["Rest","Dinner and overnight"],"Local","Local"),
d("2","Grishneshwar – Ellora",["Breakfast","Drive to Verul","Grishneshwar Jyotirlinga darshan"],["Ellora Caves subject to official opening","Temple surroundings"],["Return to Aurangabad","Dinner and overnight"],"Approx. 30 KM each way","Half/full day"),
d("3","Daulatabad & Heritage",["Breakfast","Daulatabad Fort"],["Aurangabad heritage circuit","Local market"],["Leisure","Dinner and overnight"],"Approx. 30–50 KM","Half/full day"),
d("4","Aurangabad Departure",["Breakfast and checkout"],["Airport / railway station transfer"],["Yatra concludes"])]),
];

export default individualJyotirlingaPackages;
