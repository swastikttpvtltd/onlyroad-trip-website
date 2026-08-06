export type PackagePhoto={image:string;alt:string};
const commons=(file:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;
const P=(file:string,alt:string):PackagePhoto=>({image:commons(file),alt});

// Existing state galleries
const galleries:Record<string,PackagePhoto[]>={
"amritsar-golden-temple-wagah":[P("Amritsar- The Golden Temple.jpg","Golden Temple, Amritsar"),P("Jallianwala bagh.jpg","Jallianwala Bagh"),P("Attari Wagah Border gate.jpg","Attari-Wagah Border"),P("Golden Temple, India.jpg","Golden Temple at night"),P("The Golden Temple in Amritsar.jpg","Golden Temple panorama")],
"amritsar-anandpur-sahib":[P("Anandpur Sahib.jpg","Anandpur Sahib"),P("Amritsar- The Golden Temple.jpg","Golden Temple"),P("Anandpur Sahib (1) 03.jpg","Anandpur Sahib heritage"),P("Golden Temple, India.jpg","Golden Temple at night"),P("Jallianwala bagh.jpg","Jallianwala Bagh")],
"corporate-amritsar-retreat":[P("The Golden Temple in Amritsar.jpg","Golden Temple panorama"),P("Attari Wagah Border gate.jpg","Attari-Wagah Border"),P("Golden Temple, India.jpg","Golden Temple at night"),P("Jallianwala bagh.jpg","Jallianwala Bagh"),P("Amritsar- The Golden Temple.jpg","Golden Temple")],
"kerala-munnar-thekkady-alleppey":[P("Munnar Tea Plantations.jpg","Munnar tea plantations"),P("Thekkady.jpg","Thekkady"),P("House Boat, Alleppey, Kerala.jpg","Alleppey houseboat"),P("Chinese fishing nets Kochi.jpg","Kochi fishing nets"),P("Kerala Backwaters.jpg","Kerala backwaters")],
"kerala-honeymoon":[P("House Boat, Alleppey, Kerala.jpg","Alleppey houseboat"),P("Munnar hillstation kerala.jpg","Munnar hills"),P("Thekkady.jpg","Thekkady"),P("Kerala Backwaters.jpg","Kerala backwaters"),P("Munnar Kerala.jpg","Munnar valley")],
"kerala-grand-tour":[P("Kovalam lighthouse beach.jpg","Kovalam"),P("Chinese fishing nets Kochi.jpg","Kochi"),P("Munnar Tea Plantations.jpg","Munnar"),P("House Boat, Alleppey, Kerala.jpg","Alleppey"),P("Thekkady.jpg","Thekkady")],
"corporate-kerala-kochi-munnar":[P("Fort Kochi Beach.jpg","Fort Kochi"),P("Munnar Kerala.jpg","Munnar valley"),P("Chinese fishing nets Kochi.jpg","Kochi"),P("Munnar Tea Plantations.jpg","Munnar tea plantations"),P("Munnar hillstation kerala.jpg","Munnar hills")],
"goa-classic-holiday":[P("Calangute Beach, Goa.jpg","Calangute"),P("Basilica of Bom Jesus, Goa.jpg","Old Goa"),P("Fort Aguada Goa.jpg","Fort Aguada"),P("Palolem Beach Goa.jpg","Palolem"),P("Dona Paula Goa.jpg","Dona Paula")],
"goa-honeymoon":[P("Palolem Beach Goa.jpg","Palolem"),P("Vagator Beach Goa.jpg","Vagator"),P("Anjuna Beach Goa.jpg","Anjuna"),P("Dona Paula Goa.jpg","Dona Paula"),P("Basilica of Bom Jesus, Goa.jpg","Old Goa")],
"corporate-goa-offsite":[P("Baga Beach Goa.jpg","Baga"),P("Fort Aguada Goa.jpg","Fort Aguada"),P("Calangute Beach, Goa.jpg","Calangute"),P("Se Cathedral, Goa.jpg","Se Cathedral"),P("Vagator Beach Goa.jpg","Vagator")],
"mumbai-city-tour":[P("Gateway of India Mumbai 03-2016.jpg","Gateway of India"),P("Marine Drive Mumbai.jpg","Marine Drive"),P("Chhatrapati Shivaji Terminus Mumbai 03-2016.jpg","CSMT"),P("Taj Mahal Palace Hotel Mumbai.jpg","Mumbai waterfront"),P("Mumbai Skyline at Night.jpg","Mumbai skyline")],
"shirdi-nashik":[P("Shirdi Sai Baba Temple.jpg","Shirdi"),P("Trimbakeshwar Temple Nashik.jpg","Trimbakeshwar"),P("Nashik Godavari River.jpg","Nashik"),P("Ramkund Nashik.jpg","Ramkund"),P("Shirdi Sai Baba.jpg","Sai Baba heritage")],
"ajanta-ellora-aurangabad":[P("Ajanta Caves, Maharashtra.jpg","Ajanta"),P("Kailasa temple at Ellora.jpg","Kailasa Temple"),P("Ellora Caves, Maharashtra.jpg","Ellora"),P("Bibi Ka Maqbara Aurangabad.jpg","Bibi Ka Maqbara"),P("Daulatabad Fort Maharashtra.jpg","Daulatabad")],
"lonavala-khandala-weekend":[P("Lonavala, Maharashtra.jpg","Lonavala"),P("Khandala Ghat.jpg","Khandala"),P("Bhushi Dam Lonavala.jpg","Bhushi Dam"),P("Western Ghats near Lonavala.jpg","Western Ghats"),P("Lohagad Fort Maharashtra.jpg","Lohagad")],
"ujjain-omkareshwar":[P("Mahakaleshwar Jyotirlinga Temple Ujjain.jpg","Mahakaleshwar"),P("Omkareshwar Temple Madhya Pradesh.jpg","Omkareshwar"),P("Ram Ghat Ujjain.jpg","Ram Ghat"),P("Omkareshwar Narmada River.jpg","Narmada"),P("Mahakaleshwar temple Ujjain.jpg","Ujjain")],
"khajuraho-orchha":[P("Khajuraho temples.jpg","Khajuraho"),P("Orchha Fort Madhya Pradesh.jpg","Orchha"),P("Kandariya Mahadeva Temple Khajuraho.jpg","Kandariya Mahadeva"),P("Chaturbhuj Temple Orchha.jpg","Chaturbhuj Temple"),P("Orchha cenotaphs Betwa River.jpg","Orchha cenotaphs")],
"kanha-bandhavgarh":[P("Kanha National Park Madhya Pradesh.jpg","Kanha"),P("Tiger at Bandhavgarh National Park.jpg","Bandhavgarh tiger"),P("Tiger Kanha National Park.jpg","Kanha tiger"),P("Bandhavgarh National Park.jpg","Bandhavgarh"),P("Barasingha Kanha National Park.jpg","Kanha barasingha")],

// Sikkim — unique cover + exactly five relevant images per package
"gangtok-tsomgo":[P("Tsomgo Lake Sikkim.jpg","Tsomgo Lake, Sikkim"),P("Gangtok from Ganesh Tok.jpg","Gangtok Himalayan panorama"),P("Rumtek Monastery Sikkim.jpg","Rumtek Monastery"),P("MG Marg Gangtok.jpg","MG Marg, Gangtok"),P("Tsomgo lake in Sikkim.jpg","Tsomgo Lake mountain scenery")],
"gangtok-lachen-lachung":[P("Yumthang Valley Sikkim.jpg","Yumthang Valley, North Sikkim"),P("Lachung Sikkim.jpg","Lachung village"),P("Lachen Sikkim.jpg","Lachen, North Sikkim"),P("Yumthang valley.jpg","Yumthang Himalayan valley"),P("North Sikkim mountains.jpg","North Sikkim mountain landscape")]
};
export const packageImageGalleries=galleries;
export default packageImageGalleries;
