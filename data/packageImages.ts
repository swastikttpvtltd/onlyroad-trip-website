export type PackagePhoto={image:string;alt:string};

const commons=(file:string)=>`https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}`;

const goldenTemple:PackagePhoto={image:commons("Amritsar- The Golden Temple.jpg"),alt:"Golden Temple, Amritsar"};
const goldenTempleNight:PackagePhoto={image:commons("Golden Temple, India.jpg"),alt:"Golden Temple illuminated at night, Amritsar"};
const goldenTempleWide:PackagePhoto={image:commons("The Golden Temple in Amritsar.jpg"),alt:"Panoramic Golden Temple, Amritsar"};
const jallianwala:PackagePhoto={image:commons("Jallianwala bagh.jpg"),alt:"Jallianwala Bagh, Amritsar"};
const wagah:PackagePhoto={image:commons("Attari Wagah Border gate.jpg"),alt:"Attari-Wagah Border, Punjab"};
const anandpur:PackagePhoto={image:commons("Anandpur Sahib.jpg"),alt:"Anandpur Sahib, Punjab"};
const anandpurTwo:PackagePhoto={image:commons("Anandpur Sahib (1) 03.jpg"),alt:"Sri Anandpur Sahib heritage"};

export const packageImageGalleries:Record<string,PackagePhoto[]>={
  "amritsar-golden-temple-wagah":[goldenTemple,jallianwala,wagah,goldenTempleNight,goldenTempleWide],
  "amritsar-anandpur-sahib":[anandpur,goldenTemple,anandpurTwo,goldenTempleNight,jallianwala],
  "corporate-amritsar-retreat":[goldenTempleWide,wagah,goldenTempleNight,jallianwala,goldenTemple],
};

export default packageImageGalleries;
