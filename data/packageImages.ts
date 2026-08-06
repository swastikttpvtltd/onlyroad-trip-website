export type PackagePhoto={image:string;alt:string};

const commons=(file:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const goldenTemple:PackagePhoto={image:commons("Amritsar- The Golden Temple.jpg"),alt:"Golden Temple, Amritsar"};
const goldenTempleNight:PackagePhoto={image:commons("Golden Temple, India.jpg"),alt:"Golden Temple illuminated at night, Amritsar"};
const goldenTempleWide:PackagePhoto={image:commons("The Golden Temple in Amritsar.jpg"),alt:"Panoramic Golden Temple, Amritsar"};
const jallianwala:PackagePhoto={image:commons("Jallianwala bagh.jpg"),alt:"Jallianwala Bagh, Amritsar"};
const wagah:PackagePhoto={image:commons("Attari Wagah Border gate.jpg"),alt:"Attari-Wagah Border, Punjab"};
const anandpur:PackagePhoto={image:commons("Anandpur Sahib.jpg"),alt:"Anandpur Sahib, Punjab"};
const anandpurTwo:PackagePhoto={image:commons("Anandpur Sahib (1) 03.jpg"),alt:"Sri Anandpur Sahib heritage"};

const munnarTea:PackagePhoto={image:commons("Munnar Tea Plantations.jpg"),alt:"Tea plantations in Munnar, Kerala"};
const munnarHills:PackagePhoto={image:commons("Munnar hillstation kerala.jpg"),alt:"Munnar hill landscape, Kerala"};
const munnarValley:PackagePhoto={image:commons("Munnar Kerala.jpg"),alt:"Munnar valley scenery, Kerala"};
const alleppeyBoat:PackagePhoto={image:commons("House Boat, Alleppey, Kerala.jpg"),alt:"Houseboat in Alleppey backwaters, Kerala"};
const backwaters:PackagePhoto={image:commons("Kerala Backwaters.jpg"),alt:"Kerala backwaters"};
const thekkady:PackagePhoto={image:commons("Thekkady.jpg"),alt:"Thekkady landscape, Kerala"};
const kochiNets:PackagePhoto={image:commons("Chinese fishing nets Kochi.jpg"),alt:"Chinese fishing nets in Kochi, Kerala"};
const fortKochi:PackagePhoto={image:commons("Fort Kochi Beach.jpg"),alt:"Fort Kochi waterfront, Kerala"};
const kovalamLight:PackagePhoto={image:commons("Kovalam lighthouse beach.jpg"),alt:"Lighthouse Beach at Kovalam, Kerala"};

const goaPalolem:PackagePhoto={image:commons("Palolem Beach Goa.jpg"),alt:"Palolem Beach, Goa"};
const goaCalangute:PackagePhoto={image:commons("Calangute Beach, Goa.jpg"),alt:"Calangute Beach, North Goa"};
const goaBaga:PackagePhoto={image:commons("Baga Beach Goa.jpg"),alt:"Baga Beach, Goa"};
const goaBasilica:PackagePhoto={image:commons("Basilica of Bom Jesus, Goa.jpg"),alt:"Basilica of Bom Jesus, Old Goa"};
const goaSeCathedral:PackagePhoto={image:commons("Se Cathedral, Goa.jpg"),alt:"Se Cathedral, Old Goa"};
const goaDonaPaula:PackagePhoto={image:commons("Dona Paula Goa.jpg"),alt:"Dona Paula viewpoint, Goa"};
const goaAguada:PackagePhoto={image:commons("Fort Aguada Goa.jpg"),alt:"Fort Aguada, Goa"};
const goaAnjuna:PackagePhoto={image:commons("Anjuna Beach Goa.jpg"),alt:"Anjuna Beach, Goa"};
const goaVagator:PackagePhoto={image:commons("Vagator Beach Goa.jpg"),alt:"Vagator Beach, Goa"};

// Maharashtra — four package-specific covers and five-photo galleries.
const mhGateway:PackagePhoto={image:commons("Gateway of India Mumbai 03-2016.jpg"),alt:"Gateway of India, Mumbai"};
const mhMarine:PackagePhoto={image:commons("Marine Drive Mumbai.jpg"),alt:"Marine Drive, Mumbai"};
const mhCst:PackagePhoto={image:commons("Chhatrapati Shivaji Terminus Mumbai 03-2016.jpg"),alt:"Chhatrapati Shivaji Maharaj Terminus, Mumbai"};
const mhTaj:PackagePhoto={image:commons("Taj Mahal Palace Hotel Mumbai.jpg"),alt:"Taj Mahal Palace and Mumbai waterfront"};
const mhMumbaiSky:PackagePhoto={image:commons("Mumbai Skyline at Night.jpg"),alt:"Mumbai skyline at night"};
const mhShirdi:PackagePhoto={image:commons("Shirdi Sai Baba Temple.jpg"),alt:"Shirdi Sai Baba Temple, Maharashtra"};
const mhNashik:PackagePhoto={image:commons("Nashik Godavari River.jpg"),alt:"Godavari ghats at Nashik"};
const mhTrimbak:PackagePhoto={image:commons("Trimbakeshwar Temple Nashik.jpg"),alt:"Trimbakeshwar Temple near Nashik"};
const mhNashikGhats:PackagePhoto={image:commons("Ramkund Nashik.jpg"),alt:"Ramkund sacred ghats, Nashik"};
const mhShirdiTown:PackagePhoto={image:commons("Shirdi Sai Baba.jpg"),alt:"Sai Baba heritage, Shirdi"};
const mhAjanta:PackagePhoto={image:commons("Ajanta Caves, Maharashtra.jpg"),alt:"Ajanta Caves, Maharashtra"};
const mhEllora:PackagePhoto={image:commons("Kailasa temple at Ellora.jpg"),alt:"Kailasa Temple at Ellora Caves"};
const mhElloraCaves:PackagePhoto={image:commons("Ellora Caves, Maharashtra.jpg"),alt:"Ellora Caves, Maharashtra"};
const mhBibi:PackagePhoto={image:commons("Bibi Ka Maqbara Aurangabad.jpg"),alt:"Bibi Ka Maqbara, Chhatrapati Sambhajinagar"};
const mhDaulatabad:PackagePhoto={image:commons("Daulatabad Fort Maharashtra.jpg"),alt:"Daulatabad Fort, Maharashtra"};
const mhLonavala:PackagePhoto={image:commons("Lonavala, Maharashtra.jpg"),alt:"Lonavala Western Ghats landscape"};
const mhKhandala:PackagePhoto={image:commons("Khandala Ghat.jpg"),alt:"Khandala Ghat, Maharashtra"};
const mhBhushi:PackagePhoto={image:commons("Bhushi Dam Lonavala.jpg"),alt:"Bhushi Dam, Lonavala"};
const mhWesternGhats:PackagePhoto={image:commons("Western Ghats near Lonavala.jpg"),alt:"Western Ghats near Lonavala"};
const mhLohagad:PackagePhoto={image:commons("Lohagad Fort Maharashtra.jpg"),alt:"Lohagad Fort near Lonavala"};

export const packageImageGalleries:Record<string,PackagePhoto[]>={
  "amritsar-golden-temple-wagah":[goldenTemple,jallianwala,wagah,goldenTempleNight,goldenTempleWide],
  "amritsar-anandpur-sahib":[anandpur,goldenTemple,anandpurTwo,goldenTempleNight,jallianwala],
  "corporate-amritsar-retreat":[goldenTempleWide,wagah,goldenTempleNight,jallianwala,goldenTemple],
  "kerala-munnar-thekkady-alleppey":[munnarTea,thekkady,alleppeyBoat,kochiNets,backwaters],
  "kerala-honeymoon":[alleppeyBoat,munnarHills,thekkady,backwaters,munnarValley],
  "kerala-grand-tour":[kovalamLight,kochiNets,munnarTea,alleppeyBoat,thekkady],
  "corporate-kerala-kochi-munnar":[fortKochi,munnarValley,kochiNets,munnarTea,munnarHills],
  "goa-classic-holiday":[goaCalangute,goaBasilica,goaAguada,goaPalolem,goaDonaPaula],
  "goa-honeymoon":[goaPalolem,goaVagator,goaAnjuna,goaDonaPaula,goaBasilica],
  "corporate-goa-offsite":[goaBaga,goaAguada,goaCalangute,goaSeCathedral,goaVagator],
  "mumbai-city-tour":[mhGateway,mhMarine,mhCst,mhTaj,mhMumbaiSky],
  "shirdi-nashik":[mhShirdi,mhTrimbak,mhNashik,mhNashikGhats,mhShirdiTown],
  "ajanta-ellora-aurangabad":[mhAjanta,mhEllora,mhElloraCaves,mhBibi,mhDaulatabad],
  "lonavala-khandala-weekend":[mhLonavala,mhKhandala,mhBhushi,mhWesternGhats,mhLohagad],
};

export default packageImageGalleries;
