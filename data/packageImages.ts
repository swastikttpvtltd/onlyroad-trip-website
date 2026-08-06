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

// Goa — unique covers plus five destination-specific images per package.
const goaPalolem:PackagePhoto={image:commons("Palolem Beach Goa.jpg"),alt:"Palolem Beach, Goa"};
const goaCalangute:PackagePhoto={image:commons("Calangute Beach, Goa.jpg"),alt:"Calangute Beach, North Goa"};
const goaBaga:PackagePhoto={image:commons("Baga Beach Goa.jpg"),alt:"Baga Beach, Goa"};
const goaBasilica:PackagePhoto={image:commons("Basilica of Bom Jesus, Goa.jpg"),alt:"Basilica of Bom Jesus, Old Goa"};
const goaSeCathedral:PackagePhoto={image:commons("Se Cathedral, Goa.jpg"),alt:"Se Cathedral, Old Goa"};
const goaDonaPaula:PackagePhoto={image:commons("Dona Paula Goa.jpg"),alt:"Dona Paula viewpoint, Goa"};
const goaAguada:PackagePhoto={image:commons("Fort Aguada Goa.jpg"),alt:"Fort Aguada, Goa"};
const goaAnjuna:PackagePhoto={image:commons("Anjuna Beach Goa.jpg"),alt:"Anjuna Beach, Goa"};
const goaVagator:PackagePhoto={image:commons("Vagator Beach Goa.jpg"),alt:"Vagator Beach, Goa"};

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
};

export default packageImageGalleries;
