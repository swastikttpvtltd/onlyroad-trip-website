export type PackagePhoto={image:string;alt:string};

const commons=(file:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const goldenTemple:PackagePhoto={image:commons("Amritsar- The Golden Temple.jpg"),alt:"Golden Temple, Amritsar"};
const goldenTempleNight:PackagePhoto={image:commons("Golden Temple, India.jpg"),alt:"Golden Temple illuminated at night, Amritsar"};
const goldenTempleWide:PackagePhoto={image:commons("The Golden Temple in Amritsar.jpg"),alt:"Panoramic Golden Temple, Amritsar"};
const jallianwala:PackagePhoto={image:commons("Jallianwala bagh.jpg"),alt:"Jallianwala Bagh, Amritsar"};
const wagah:PackagePhoto={image:commons("Attari Wagah Border gate.jpg"),alt:"Attari-Wagah Border, Punjab"};
const anandpur:PackagePhoto={image:commons("Anandpur Sahib.jpg"),alt:"Anandpur Sahib, Punjab"};
const anandpurTwo:PackagePhoto={image:commons("Anandpur Sahib (1) 03.jpg"),alt:"Sri Anandpur Sahib heritage"};

// Kerala — package-specific covers and 5-photo galleries.
const munnarTea:PackagePhoto={image:commons("Munnar Tea Plantations.jpg"),alt:"Tea plantations in Munnar, Kerala"};
const munnarHills:PackagePhoto={image:commons("Munnar hillstation kerala.jpg"),alt:"Munnar hill landscape, Kerala"};
const munnarValley:PackagePhoto={image:commons("Munnar Kerala.jpg"),alt:"Munnar valley scenery, Kerala"};
const alleppeyBoat:PackagePhoto={image:commons("House Boat, Alleppey, Kerala.jpg"),alt:"Houseboat in Alleppey backwaters, Kerala"};
const backwaters:PackagePhoto={image:commons("Kerala Backwaters.jpg"),alt:"Kerala backwaters"};
const thekkady:PackagePhoto={image:commons("Thekkady.jpg"),alt:"Thekkady landscape, Kerala"};
const kochiNets:PackagePhoto={image:commons("Chinese fishing nets Kochi.jpg"),alt:"Chinese fishing nets in Kochi, Kerala"};
const fortKochi:PackagePhoto={image:commons("Fort Kochi Beach.jpg"),alt:"Fort Kochi waterfront, Kerala"};
const kovalam:PackagePhoto={image:commons("Kovalam Beach Kerala.jpg"),alt:"Kovalam Beach, Kerala"};
const kovalamLight:PackagePhoto={image:commons("Kovalam lighthouse beach.jpg"),alt:"Lighthouse Beach at Kovalam, Kerala"};

export const packageImageGalleries:Record<string,PackagePhoto[]>={
  "amritsar-golden-temple-wagah":[goldenTemple,jallianwala,wagah,goldenTempleNight,goldenTempleWide],
  "amritsar-anandpur-sahib":[anandpur,goldenTemple,anandpurTwo,goldenTempleNight,jallianwala],
  "corporate-amritsar-retreat":[goldenTempleWide,wagah,goldenTempleNight,jallianwala,goldenTemple],

  "kerala-munnar-thekkady-alleppey":[munnarTea,thekkady,alleppeyBoat,kochiNets,backwaters],
  "kerala-honeymoon":[alleppeyBoat,munnarHills,thekkady,backwaters,munnarValley],
  "kerala-grand-tour":[kovalamLight,kochiNets,munnarTea,alleppeyBoat,thekkady],
  "corporate-kerala-kochi-munnar":[fortKochi,munnarValley,kochiNets,munnarTea,munnarHills],
};

export default packageImageGalleries;
