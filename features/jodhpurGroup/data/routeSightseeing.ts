import type { DetailedItineraryDay } from "@/data/itineraryDetails";

// Each line names a place followed by specific sites and their context.
// Only package destinations and overnight places are eligible for the day cards.
const guides = `
Puri|Shree Jagannath Temple — The 12th-century shrine honours Jagannath, Balabhadra and Subhadra.
Konark|Konark Sun Temple — The monument takes the form of a chariot with carved stone wheels.
Agra|Taj Mahal — Shah Jahan commissioned the marble mausoleum for Mumtaz Mahal. Look for the inlaid stones and the symmetry of its garden approach.|Agra Fort — The Mughal fort's red walls enclose former royal residences and audience halls beside the Yamuna.
Ahmedabad|Sabarmati Ashram — Gandhi lived here and set out on the 1930 Salt March from the ashram. Hriday Kunj shows the scale of his former living quarters.|Sidi Saiyyed Mosque — Its sixteenth-century stone screens include the city's celebrated Tree of Life design.|Teen Darwaza — The triple gateway marks an approach to the old Bhadra citadel.
Ajanta|Ajanta Caves — Buddhist monasteries and prayer halls were cut into a horseshoe-shaped gorge. Look for the surviving murals and sculpted facades in open caves.
Ajmer|Ajmer Sharif Dargah — The shrine honours Khwaja Moinuddin Chishti and remains an active centre of Sufi pilgrimage.
Alleppey|Alleppey backwaters — The canals, lagoons and low-lying paddy fields show how villages developed around Kerala's waterways. The booked houseboat or shore visit determines the view.
Amaravati|Amaravati Stupa — The remains recall an early Buddhist centre on the Krishna River. Its sculptural tradition is known for narrative reliefs carved in limestone.
Amarnath Yatra|Amarnath Cave — The shrine is revered for its seasonal ice formation. Darshan follows the official yatra arrangements.
Amer|Amber Fort — The hilltop Rajput seat features successive courtyards and palace chambers. The mirror work reflects the decorative style of the royal interiors.
Amritsar|Golden Temple — The sanctum stands within the sacred pool at Sri Harmandir Sahib. The complex also hosts the community kitchen tradition of langar.|Jallianwala Bagh — The memorial garden commemorates those killed in the 1919 massacre.
Anandpur Sahib|Takht Sri Kesgarh Sahib — The shrine marks a city central to the formation of the Khalsa under Guru Gobind Singh.|Virasat-e-Khalsa — The museum tells the story of Sikh history and Punjab through galleries and multimedia.
Araku Valley|Borra Caves — Water shaped the limestone chambers and mineral formations in the Ananthagiri hills.|Araku Tribal Museum — The exhibits introduce regional communities through objects associated with work and daily life.
Attari-Wagah|Attari–Wagah ceremony — The border gates and stands frame the flag-lowering ceremony. Security and operating arrangements control access.
Auli|Auli meadows — The slopes above Joshimath are known for ski terrain and views towards Nanda Devi when the sky is clear.
Ayodhya|Ram Mandir — Ram Lalla is worshipped at the site revered as Rama's birthplace. Temple security and darshan queues shape the visit.|Hanuman Garhi — Steps lead to the hilltop Hanuman shrine in the old city.|Kanak Bhawan — The temple is dedicated to Rama and Sita and is known as the House of Gold.|Ram Ki Paidi — These ghats mark a riverfront used by pilgrims on the Saryu.
Baba Mandir|Baba Harbhajan Singh Mandir — The shrine commemorates an Indian Army soldier and is approached on the high-altitude Sikkim route.
Badrinath|Badrinath Temple — The Vishnu shrine stands above the Alaknanda between the Nar and Narayana ranges.|Tapt Kund — The hot spring below the temple is part of the traditional pilgrimage approach.
Bandhavgarh|Bandhavgarh forest — Sal woodland and open grasslands surround the rocky hills. The safari route depends on the permit zone.
Banjar|Banjar valley — Orchard slopes and small settlements lie along the mountain roads connecting Jibhi and Tirthan.
Barkot|Barkot — The town is a road halt on the Yamunotri approach, where the valley narrows towards the upper Yamuna.
Barsana|Radha Rani Temple — The hilltop shrine overlooks the town associated with Radha. The approach includes steps.
Bengaluru|Lalbagh Botanical Garden — The garden began under Hyder Ali and Tipu Sultan and is known for its historic Glass House.|Cubbon Park — The central park's old trees and paths provide a walk between the city's civic buildings.
Bet Dwarka|Bet Dwarka temple — The island is traditionally associated with Krishna's residence and has its own pilgrimage lanes.
Bhagsu|Bhagsunag Temple and waterfall — The Shiva shrine and the stream-side path above the village are distinct stops. Use the open approach when conditions permit.
Bhimtal|Bhimtal Lake — The wooded Kumaon lake has a small island and accessible stretches of shore.
Bhuj|Aina Mahal — The palace is known for mirror work and decorated interiors from the Kutch court.|Prag Mahal — The neighbouring palace is distinguished by its clock tower and Gothic-influenced design.
Bodh Gaya|Mahabodhi Temple — The brick temple complex marks the place associated with the Buddha's enlightenment. The Bodhi Tree and Vajrasana are central points on the grounds.|Great Buddha Statue — The seated figure is a landmark of modern Buddhist pilgrimage in the town.|Thai Monastery — The rooflines and ornament reflect Thai Buddhist temple architecture.
Chandrashila|Chandrashila summit — The exposed ridge above Tungnath offers a Himalayan panorama in clear weather. The final climb depends on trail conditions.
Chandratal|Chandratal Lake — The seasonal lake sits in an open, high-altitude basin. The permitted approach may end in a walk.
Chennai|Marina Beach — The long urban shoreline gives a view of the Bay of Bengal and the city's public waterfront.|Kapaleeshwarar Temple — The colourful gopuram marks the Mylapore Shiva shrine and surrounding temple streets.
Cherrapunji|Nohkalikai Falls — The waterfall drops from the Sohra plateau into a wooded gorge, with views dependent on cloud cover.|Mawsmai Cave — The accessible limestone passages show rock formations shaped by water.
Chhatrapati Sambhajinagar|Bibi Ka Maqbara — The seventeenth-century mausoleum uses a formal garden, central dome and four corner minarets.|Daulatabad Fort — The hill fortress uses steep approaches and successive gateways to defend the route to its summit.
Chopta|Chopta meadows — Forest opens into grassy slopes on the approach to Tungnath. Short walks follow the accessible paths.
City Palace|City Palace, Udaipur — The Mewar complex grew beside Lake Pichola. Balconies and courtyards overlook the water and old city.
Coorg|Abbey Falls — The waterfall lies among wooded coffee-growing hills near Madikeri.|Raja's Seat — The hilltop garden looks over valleys below Madikeri, particularly in clear weather.
Dalhousie|Gandhi Chowk — The market and nearby lanes lie on the ridge of the former hill station. The short town walk can be fitted around the transfer.
Darjeeling|Tiger Hill — Sunrise can reveal Kangchenjunga beyond the ridges in clear weather.|Batasia Loop — The railway curves around the hillside garden to manage the change in elevation.|Ghoom Monastery — The monastery is known for its Maitreya image and Tibetan Buddhist prayer hall.
Dawki|Umngot River — The valley near the border is known for clear water in suitable conditions. Any boating depends on water level and permission.
Dehradun|Forest Research Institute — The large colonial-era complex is known for its long brick colonnades and forestry collections where visitor access is open.
Delhi|India Gate — The war memorial anchors the ceremonial avenue of New Delhi.|Qutb Minar — The carved tower stands in a Delhi Sultanate complex with early mosque ruins.|Humayun's Tomb — The Mughal mausoleum stands in a formal garden divided by paths and channels.
Deoghar|Baba Baidyanath Dham — The Shiva shrine is revered as a Jyotirlinga. Pilgrims move through a group of shrines around the principal temple.
Devalia Region|Devalia Interpretation Zone — The managed safari circuit introduces Gir's dry forest and wildlife under separate ticket and operating arrangements.
Dhanushkodi|Dhanushkodi ruins — The surviving remains and exposed coastline recall the settlement damaged in the 1964 cyclone.
Dharamkot|Dharamkot lanes — The hillside village above McLeod Ganj offers forested paths and views across the valley.
Dharamshala|Tsuglagkhang — The Tibetan temple complex is a living centre for worship and community gatherings in McLeod Ganj.
Dhordo|Dhordo — The settlement is the gateway for the seasonal Rann programme and the surrounding Banni grassland landscape.
Diu|Diu Fort — The Portuguese-era bastion guards the harbour with stone ramparts on the water.|St Paul's Church — The elaborate church facade reflects the island's Portuguese-era architectural history.
Doodhpathri|Doodhpathri meadows — Open grassy slopes and streams shape the valley landscape. The approach and views vary with weather and road access.
Dwarka|Dwarkadhish Temple — The high spire rises above the Krishna pilgrimage quarter by the Gomti.|Gomti Ghat — The steps connect the temple lanes to the water and are used for pilgrimage rituals.
Ekta Nagar|Statue of Unity — The Narmada monument commemorates Vallabhbhai Patel and the integration of the princely states.|Valley of Flowers — The landscaped riverbank gardens are part of the visitor area.
Ellora|Kailasa Temple — Builders carved the temple and its court from a single mass of rock. The larger complex includes Buddhist, Hindu and Jain caves.
Fatehpur Sikri|Fatehpur Sikri — Akbar's former capital preserves audience halls and courtyards in red sandstone alongside a mosque precinct.
Gangotri|Gangotri Temple — The shrine on the Bhagirathi honours the Ganga and is part of the Char Dham pilgrimage.
Gangtok|Rumtek Monastery — The assembly halls and courtyards reflect the Karma Kagyu tradition.|Namgyal Institute of Tibetology — The collections introduce Tibetan Buddhist art and manuscripts.|MG Marg — The central pedestrian street connects shops and public spaces.
Gaya|Vishnupad Temple — The shrine centres on a footprint revered as Vishnu's.|Falgu riverfront — The riverbanks are associated with ancestral rites. Ritual arrangements are separate from sightseeing.
Gir|Gir safari — Dry woodland and scrub provide the last natural habitat of the Asiatic lion. The permit determines the drive route.
Gira Falls Region|Gira Falls — Water from the Dang hills drops into a rocky basin. View the waterfall only from the open approach.
Goa|Old Goa churches — The Basilica of Bom Jesus houses the remains of Francis Xavier, while Sé Cathedral marks the scale of the former Portuguese capital.
Govardhan|Govardhan Hill — The hill is associated with Krishna lifting it to shelter villagers. A full parikrama requires separate walking time.
Gulmarg|Gulmarg meadows — The upland grasslands turn into a snow landscape in winter.|Gulmarg Gondola — The cable car climbs towards the Apharwat slopes, with each stage subject to tickets and weather.
Guptkashi|Vishwanath Temple, Guptkashi — The Shiva shrine is a pilgrimage halt in the Mandakini valley on the Kedarnath approach.
Gurez Valley|Dawar and the Kishanganga — The valley's settlement and river lie below high mountain slopes, reached by a seasonal road.
Guwahati|Kamakhya Temple — The shrine on Nilachal Hill is an important centre of Shakti worship.|Brahmaputra riverfront — The wide river shapes the city's waterfront and ferry routes.
Hampi|Virupaksha Temple — The gateway and shrine anchor the historic bazaar of the Vijayanagara capital.|Vittala Temple — The courtyard's carved stone chariot is a distinctive feature of Vijayanagara architecture.|Lotus Mahal — The pavilion's arches reflect the architecture of the royal enclosure.
Haridwar|Har Ki Pauri — The main Ganga ghats are used for ritual bathing and evening aarti.
Hospet|Hospet — The town is the access and overnight base for nearby Vijayanagara remains at Hampi.
Jaipur|City Palace — Jaipur's royal seat preserves painted gates and ceremonial courtyards.|Jantar Mantar — The masonry instruments record time and astronomical positions.|Hawa Mahal — The screened facade allowed court women to observe street life.|Albert Hall — The Indo-Saracenic museum building houses textiles, sculpture and decorative arts.
Jaisalmer|Jaisalmer Fort — The inhabited sandstone citadel preserves homes, temples and lanes of the former trading city.|Patwon Ki Haveli — Carved screens and balconies show the wealth of merchant households.|Gadisar Lake — The former water source is framed by pavilions and ghats.
Jalori Pass|Jalori Pass — The high road crossing above Jibhi connects inner valleys. Access and walking conditions change with weather.
Jhansi|Jhansi Fort — The hill fortress is associated with Rani Lakshmibai and the 1857 uprising. The ramparts overlook the city.
Jibhi|Jibhi Waterfall — The forest path follows the stream towards a small waterfall in the valley.|Jibhi village — Timber houses and hillside lanes show the settlement's mountain setting.
Jim Corbett|Corbett safari — The forest, grassland and river habitat are visited through an allotted tourism zone. Wildlife sightings vary.
Jodhpur|Mehrangarh Fort — The Rathore stronghold rises over the Blue City, with palaces inside its walls.|Jaswant Thada — The white-marble royal memorial is known for its finely cut screens.|Umaid Bhawan Palace — The sandstone palace dates to the twentieth century, with access restricted to public areas.
Joshimath|Narsingh Temple — The shrine is associated with the winter worship of Badrinath.|Joshimath — The town is the road base for Auli and the upper Alaknanda pilgrimage route.
Junagadh|Uparkot Fort — The old hill fort's gateways and walls recall the city's defensive history. See the accessible areas according to the visitor route.
Kainchi Dham|Kainchi Dham — The wooded Kumaon ashram and shrine are associated with Neem Karoli Baba.
Kala Dungar|Kala Dungar — The Black Hill is a high viewpoint over the Rann when visibility allows.
Kalimpong|Durpin Dara — The ridge looks over the Teesta valley. The monastery on the hill reflects the area's Buddhist heritage.
Kalpa|Kalpa village — The old lanes and temple precinct look towards the Kinner Kailash range across the valley.
Kanatal|Kanatal ridges — Forest and open slopes are the focus of short walks near the stay area. Higher views depend on weather.
Kanchipuram|Kailasanathar Temple — The sandstone Shiva temple is associated with Pallava patronage and is known for carved niches and shrines.|Kanchipuram weaving — The town is associated with silk weaving, including contrasting borders and brocade work.
Kanha|Kanha safari — Sal forest and meadows support the hard-ground barasingha. The permit governs the route through the reserve.
Kanyakumari|Vivekananda Rock Memorial — The monument stands offshore at a site associated with Swami Vivekananda, reached by ferry when operating.|Kanyakumari shore — The peninsula's exposed waterfront opens onto the seas at India's southern tip.
Kasol|Kasol market — The lanes connect the village's cafes and shops beside the Parvati River.|Parvati riverfront — Accessible paths show the valley's steep slopes and fast mountain water.
Katra|Katra — The town is the reporting and overnight base for the uphill Vaishno Devi pilgrimage.
Kaza|Kaza market — The town is the service base for the Spiti circuit. Nearby valleys and villages follow the day's road conditions.
Kaziranga|Kaziranga safari — The Brahmaputra floodplain is habitat for the greater one-horned rhinoceros. The permit identifies the zone and timing.
Kedarnath|Kedarnath Temple — The stone Shiva shrine stands high in the Mandakini valley. The approved trek and darshan arrangements determine access.
Key|Key Monastery — The clustered prayer halls and residences climb a hill above the Spiti River.
Khajjiar|Khajjiar meadow — The clearing and small lake sit within deodar forests near Dalhousie.
Khajuraho|Western Group of temples — The Chandela temples are noted for their stone towers and carved scenes from religious and everyday life.
Khandala|Khandala viewpoints — The hill-station ridges look across the Western Ghats and seasonal streams.
Khardung La Region|Khardung La — The pass links the Leh side with Nubra through a high mountain crossing. Route access depends on road and weather conditions.
Kibber|Kibber village — The compact Spiti settlement lies among high slopes and open grazing ground.
Kochi|Fort Kochi — The waterfront grew around Indian Ocean trade. The Chinese fishing nets and older streets show layers of maritime influence.|St Francis Church — The church preserves a landmark of the early Portuguese presence in Kochi.
Kodaikanal|Coaker's Walk — The hillside path overlooks the valley in clear weather.|Kodaikanal Lake — The shore paths give views across the artificial lake.|Pillar Rocks — The tall rock formations can be seen from the open viewpoints when cloud lifts.
Kolkata|Victoria Memorial — The marble museum building records a chapter of the city's colonial history.|Howrah Bridge — The cantilever crossing links Kolkata and Howrah across the Hooghly.
Kovalam|Kovalam shore — The coves south of Thiruvananthapuram are framed by rocky headlands. The lighthouse marks the southern beach area.
Kufri|Kufri ridge — The hill area above Shimla is known for wooded slopes and views. Snow and separately booked activities vary by season.
Kushinagar|Mahaparinirvana Temple — The shrine commemorates the Buddha's passing and houses a reclining Buddha image.
Lachen|Lachen village — The settlement is the northern Sikkim road base for the high plateau. Access depends on permits and current road conditions.
Lachung|Lachung village — The valley settlement is the base for the Yumthang drive and is framed by steep mountain slopes.
Lake Pichola|Lake Pichola — The waterfront looks onto palace buildings, ghats and islands. Boat trips follow confirmed ticket arrangements.
Leh|Shanti Stupa — The white hilltop Buddhist monument overlooks Leh town.|Leh Palace — The former royal seat rises in tiers above the old town.|Leh market — The lanes below the palace provide a short town walk within the acclimatisation plan.
Lonavala|Tiger Point — The viewpoint looks across steep escarpments and Western Ghats valleys.
Lucknow|Bara Imambara — The Nawabi complex is known for its vaulted hall and labyrinth.|Rumi Darwaza — The gateway marks the historic Awadhi quarter.|Residency — The surviving buildings recall the siege of 1857.
Madhyamaheshwar|Madhyamaheshwar Temple — The Panch Kedar shrine is reached on foot above Ransi, with the mountain setting central to the pilgrimage.
Madurai|Meenakshi Amman Temple — The tall, painted gateways lead into the shrine complex dedicated to Meenakshi and Sundareswarar.|Thirumalai Nayakkar Mahal — The palace's arcades recall Madurai's Nayak rulers.
Mahabalipuram|Shore Temple — The Pallava structural temple faces the Bay of Bengal.|Five Rathas — The monolithic shrines show different forms of rock-cut temple design.
Mall Road|Mall Road, Nainital — The promenade follows the edge of Naini Lake and links the waterfront to the town's shops.
Mana|Mana village — The lanes above Badrinath reach viewpoints near the meeting of the Saraswati and Alaknanda.
Manali|Hadimba Devi Temple — A timber pagoda in a deodar grove honours Hadimba from the Mahabharata.|Vashisht — The village has a temple precinct and natural hot springs.|Old Manali — The lanes near the Manalsu stream show the older settlement.
Manikaran|Manikaran Sahib — The gurdwara by the Parvati is associated with Guru Nanak. The nearby thermal springs are part of the pilgrimage setting.
Mata Vaishno Devi Bhawan|Vaishno Devi Bhawan — The uphill pilgrimage from the Katra side reaches the shrine in the Trikuta hills.
Mathura|Shri Krishna Janmabhoomi — The temple precinct is revered as Krishna's birthplace. Entry follows its security rules.|Vishram Ghat — The Yamuna steps are a focus of Mathura's river worship.
Mawlynnong|Mawlynnong — Village paths pass Khasi houses, gardens and locally maintained public spaces.
McLeod Ganj|Tsuglagkhang — The temple complex is a centre of Tibetan Buddhist worship and community life.
Mount Abu|Dilwara Temples — The Jain temples are known for deeply carved marble pillars and ceilings.|Nakki Lake — The shore is framed by wooded hills and rocky slopes.|Guru Shikhar — The ridge viewpoint looks across the Aravallis when visibility allows.
Mumbai|Gateway of India — The harbour arch stands at Apollo Bunder.|Chhatrapati Shivaji Maharaj Terminus — The railway station is known for its Gothic facade and stone carvings.|Marine Drive — The promenade curves around Back Bay towards Girgaum Chowpatty.
Munnar|Tea gardens — The planted rows follow the contours of the hills and reflect the region's plantation economy.|Mattupetty — The reservoir and nearby Echo Point are framed by the hills above Munnar.
Mussoorie|Kempty Falls — The cascade lies in a rocky valley below the town.|Company Garden — The landscaped beds and paths offer an easier-paced garden stop.|Mall Road — The ridge promenade links markets and viewpoints.
Mysuru|Mysuru Palace — The Wadiyar residence is known for its ceremonial halls and decorated interiors.|Chamundi Hill — The hilltop temple is associated with Goddess Chamundeshwari and overlooks the city.
Nageshwar|Nageshwar Jyotirlinga — The Shiva pilgrimage shrine is marked by a large statue in the precinct.
Naini Lake|Naini Lake — The lake defines Nainital's geography, with the market and ghats along its shore.
Nainital|Naini Lake — The hill town grew around the water. Mall Road and Mallital follow its shoreline.|Naina Devi Temple — The lakeside shrine is a pilgrimage landmark at the northern end of the lake.
Nako|Nako village — A small lake and old village lanes form an oasis in the drier high-altitude landscape.
Nashik|Panchavati and Ramkund — The old-city ghats on the Godavari are associated with Rama and are used for river worship.
North Goa|Fort Aguada — The fort guarded the Mandovi river mouth from its headland.|Calangute and Baga coast — The wide beaches show Goa's resort coastline, with water activities subject to operation.
Nubra Valley|Diskit Monastery — The monastery and nearby Maitreya statue overlook the valley.|Hunder dunes — The dunes show the cold-desert landscape on the valley floor.
Omkareshwar|Omkareshwar Temple — The Jyotirlinga shrine lies on the island circuit in the Narmada, reached via pilgrim crossings.
Ooty|Government Botanical Garden — The terraced gardens display plant collections beneath the Nilgiri slopes.|Ooty Lake — The wooded shore is the focus of the lake visit.|Doddabetta — The ridge viewpoint looks across the surrounding hills in clear weather.
Orchha|Orchha Fort — The Bundela palace complex overlooks the Betwa and is known for its courtyards and balconies.|Ram Raja Temple — Rama is honoured here as a ruler as well as a deity.
Pahalgam|Lidder Valley — The river, pine slopes and meadows shape Pahalgam's landscape.|Betaab Valley — The meadow acquired its name from the film Betaab.|Aru — The village overlooks an upstream valley, reached by the permitted local road.
Pangong Lake|Pangong Tso — The high-altitude lake stretches across eastern Ladakh. Its colours change with light and weather.
Parvati Valley|Parvati River — The river cuts through steep slopes below the valley's settlements and walking routes.
Porbandar|Kirti Mandir — The memorial beside Gandhi's ancestral house marks his birthplace.
Port Blair|Cellular Jail — The colonial prison held political prisoners deported to the islands. The surviving wings show its cellular design.|Corbyn's Cove — The coastal road leads to a sheltered stretch of beach near the city.
Prayagraj|Triveni Sangam — The Ganga and Yamuna meet here, with the Saraswati understood in tradition as the third river. The ghats are central to major pilgrimage gatherings.
Pushkar|Pushkar Lake — The sacred lake is ringed by pilgrimage ghats.|Brahma Temple — The temple is a prominent example of a shrine dedicated to Brahma.
Rameswaram|Ramanathaswamy Temple — The Shiva shrine is renowned for long pillared corridors.|Agni Theertham — The seafront near the temple is used for ritual bathing.
Ramnagar|Ramnagar — The town is an overnight and road-access base for Corbett's different safari gates.
Ransi|Ransi village — The settlement is the roadhead for the onward walk towards Madhyamaheshwar.
Rishikesh|Triveni Ghat — The Ganga steps are used for bathing and river worship.|Ram Jhula area — The river crossings connect neighbourhoods known for ashrams and temples.
Rudraprayag|Rudraprayag confluence — The Mandakini meets the Alaknanda below the town. This is one of the Panch Prayag confluences.
Sajjangarh|Monsoon Palace — The hilltop palace overlooks Udaipur's lakes and Aravalli ridges.
Sam|Sam Sand Dunes — The dunes west of Jaisalmer are known for changing light late in the day. Rides follow separate booking and safety arrangements.
Saputara|Saputara Lake — The lake is the central landmark of the Sahyadri hill station.|Sunset viewpoint — The ridge looks across the Dang hills when visibility allows.
Sardar Sarovar|Sardar Sarovar Dam — The viewpoints show how the Narmada is held between the dam and surrounding hills.
Sarnath|Dhamek Stupa — The monument marks the monastic area associated with the Buddha's first sermon.|Sarnath archaeological site — The ruins show successive periods of Buddhist worship and patronage.
Shaheed Dweep|Natural Bridge — The rock arch is reached across the tidal shore when conditions allow.|Bharatpur Beach — The shallow coastal setting is the focus of the beach stop.
Sham Valley|Sham Valley — The Indus corridor west of Leh connects villages and historic monasteries. The actual monastery stops follow the booked route.
Shillong|Ward's Lake — The paths and bridge are set in landscaped grounds near central Shillong.|Police Bazaar — The commercial centre gives a view of the town's street and market life.
Shimla|The Ridge — The broad promenade is framed by Christ Church and views of surrounding hills.|Mall Road — The pedestrian route connects the town's historic shops and civic buildings.
Shirdi|Sai Baba's Samadhi Mandir — The shrine houses Sai Baba's tomb and is the focus of the pilgrimage.
Shivpuri|Shivpuri river reach — The Ganga runs through a steep valley above Rishikesh. Riverside activities depend on the booking and river conditions.
Shravasti|Jetavana — The monastery ruins mark a place where Buddhist tradition records many teachings of the Buddha.
Solang Valley|Solang Valley — The open valley has views towards snow-covered slopes. Ropeway and seasonal sports depend on operation and tickets.
Somnath|Somnath Temple — The reconstructed coastal Jyotirlinga shrine overlooks the Arabian Sea.|Bhalka Tirth — Tradition associates the shrine with the episode in which Jara struck Krishna.
Sonmarg|Sonmarg and the Sind valley — Meadows lie beneath high peaks on the mountain route.|Thajiwas — The approach is known for glacial scenery, subject to snow and access.
South Goa|South Goa coast — Beaches such as Colva open onto a long sandy shoreline, with quieter stretches away from the busier access points.
Srinagar|Dal Lake — Shikaras and houseboats form part of the city's lake landscape.|Mughal gardens — Terraces, water channels and trees frame views towards the lake.
Statue of Unity|Statue of Unity — The monument commemorates Vallabhbhai Patel beside the Narmada. The ticket tier determines viewing access.
Sundarbans|Sundarbans waterways — Tidal mangrove channels and mudflats support estuarine wildlife. The approved boat route determines the watchtowers and creeks visited.
Surkanda Devi|Surkanda Devi Temple — The ridge shrine is approached uphill from the Kaddukhal side and overlooks the surrounding hills.
Swaraj Dweep|Radhanagar Beach — The wide sandy shore is backed by coastal forest.|Elephant Beach — Boat access and marine activities depend on conditions and separate arrangements.
Tehri Hills|Tehri reservoir — The water and surrounding steep hills illustrate how the dam reshaped the valley.
Thanjavur|Brihadisvara Temple — The Chola temple is known for its tall granite tower and vast courtyard.|Thanjavur Palace precinct — The halls and collections preserve parts of Nayak and Maratha court history.
Thekkady|Periyar Lake — The lake within the reserve is surrounded by forest. Any boat visit requires the scheduled ticket.|Spice gardens — Cultivated cardamom and other spices illustrate the area's plantation trade.
Thiruvananthapuram|Padmanabhaswamy Temple — The temple reflects the city's royal and religious heritage. Entry follows temple eligibility and dress rules.
Tirthan Valley|Tirthan River — The river passes through forested slopes and villages near the Great Himalayan National Park.
Tirumala|Sri Venkateswara Temple — The hill shrine is the centre of the Tirumala pilgrimage. The TTD schedule and reporting arrangements govern darshan.
Tirupati|Kapila Theertham — The Shiva shrine lies at the foot of the Tirumala hills.|Govindaraja Swamy Temple — The prominent gopuram marks the temple precinct in town.
Tosh|Tosh village — The upper Parvati settlement has timber houses and valley views reached by walking the village lanes.
Trimbakeshwar|Trimbakeshwar Temple — The Jyotirlinga shrine stands near Brahmagiri, traditionally associated with the Godavari's source.
Tso Moriri|Tso Moriri — The Changthang lake near Korzok supports migratory birds and high-altitude wetlands.
Tsomgo Lake|Tsomgo Lake — The lake lies above Gangtok on a steep high-altitude route. Weather and permits govern access.
Tungnath|Tungnath Temple — The stone Shiva shrine is one of the Panch Kedar temples. The trail climbs above Chopta through forest and open slopes.
Udaipur|City Palace — The Mewar complex overlooks Lake Pichola from its courtyards and balconies.|Saheliyon Ki Bari — The royal garden is known for its fountains and pavilions.|Jagdish Temple — The carved Vishnu temple stands above the old-city lanes.
Ujjain|Mahakaleshwar Temple — The Shiva Jyotirlinga shrine is the main pilgrimage stop.|Ram Ghat — The Shipra riverfront is a place of worship and ritual bathing.
Ukhimath|Omkareshwar Temple, Ukhimath — The shrine is associated with winter worship of the Kedarnath and Madhyamaheshwar deities.
Uttarkashi|Kashi Vishwanath Temple, Uttarkashi — The Shiva shrine stands in the Bhagirathi valley town used as a Gangotri route base.
Varanasi|Kashi Vishwanath Dham — The old city's Shiva shrine is reached through the pilgrimage lanes.|Maa Annapurna Mandir — The nearby temple honours the goddess of nourishment.|Dashashwamedh Ghat — The steps are the setting for the evening Ganga Aarti.
Vijayawada|Kanaka Durga Temple — The shrine on Indrakeeladri Hill overlooks the Krishna River.|Prakasam Barrage — The crossing opens onto broad views of the Krishna and its riverfront.
Visakhapatnam|Kailasagiri — The hill park overlooks the city and Bay of Bengal.|INS Kursura Submarine Museum — The preserved vessel shows how sailors lived and worked on board.|RK Beach — The long waterfront links the beach and city museums.
Vrindavan|Banke Bihari Temple — The Krishna shrine is reached through the old temple lanes.|Prem Mandir — Marble sculpture and tableaux depict episodes from Krishna's life.
White Rann|White Rann — When seasonal water recedes, a pale salt crust is exposed. Access varies with weather and the season.
Yamunotri|Yamunotri Temple — The shrine honours the Yamuna and is reached on foot from the roadhead on the approved route.
Yumthang|Yumthang Valley — Mountain meadows and seasonal rhododendrons lie above Lachung on the permitted valley road.
Vadodara|Laxmi Vilas Palace — The Gaekwad residence is known for its large Indo-Saracenic facade and ceremonial interiors.
Hanle|Hanle village — The Changthang settlement is known for its monastery and dark skies. Observatory access is separate from a village stay.
Baltal|Baltal yatra base — The valley camp is a reporting point for the approved Amarnath trail.
Nunwan|Nunwan yatra base — The Pahalgam-side camp is a staging point for the Amarnath route.
`.trim();

const aliases: Readonly<Record<string, string>> = {
  "Araku": "Araku Valley", "Bodhgaya": "Bodh Gaya", "Gurez": "Gurez Valley",
  "Gir National Park": "Gir", "Sasan Gir": "Gir", "Havelock": "Swaraj Dweep",
  "Kevadia": "Ekta Nagar", "Khardung La": "Khardung La Region", "McLeodganj": "McLeod Ganj",
  "Neil Island": "Shaheed Dweep", "Nubra": "Nubra Valley", "Pangong": "Pangong Lake",
  "Pangong region": "Pangong Lake", "Pangong Tso": "Pangong Lake", "Sri Vijaya Puram": "Port Blair",
  "Sohra": "Cherrapunji", "Corbett": "Jim Corbett", "Kashi": "Varanasi",
};

const byPlace = new Map(guides.split("\n").map(line => {
  const [place, ...sights] = line.split("|");
  return [place, sights] as const;
}));

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const names = [...byPlace.keys(), ...Object.keys(aliases)]
  .sort((a, b) => b.length - a.length)
  .map(name => ({ place: aliases[name] ?? name, key: " " + normalise(name) + " " }));

function placesIn(text: string) {
  let remaining = " " + normalise(text) + " ";
  const places = new Set<string>();
  for (const { place, key } of names) {
    if (remaining.includes(key)) {
      places.add(place);
      remaining = remaining.replaceAll(key, " ");
    }
  }
  return places;
}

const periods = ["morning", "afternoon", "evening"] as const;

export type RouteSightseeingStop = { place: string; timing: string; description: string };

export function getRouteSightseeing(destination: string, itinerary: DetailedItineraryDay[]) {
  const route = placesIn(destination);
  for (const day of itinerary) {
    const stay = day.overnightStay ?? "";
    if (!/^no (?:overnight|hotel) stay|overnight (?:road )?journey/i.test(stay)) {
      for (const place of placesIn(stay)) route.add(place);
    }
  }
  const result = itinerary.map((): RouteSightseeingStop[] => []);
  const days = itinerary.map(day => ({
    title: placesIn(day.title),
    stay: placesIn(day.overnightStay ?? ""),
    activities: Object.fromEntries(periods.map(period => [period, normalise(day[period].join(" "))])),
  }));
  const added = new Set<string>();
  const sameSights: Readonly<Record<string, string>> = {
    "city palace": "city palace", "city palace udaipur": "city palace",
    "monsoon palace": "monsoon palace", "sajjangarh monsoon palace": "monsoon palace",
  };
  for (const place of route) {
    for (const description of byPlace.get(place) ?? []) {
      const name = normalise(description.split(" — ")[0]);
      const key = name === "city palace" && place === "Jaipur" ? "jaipur city palace" : sameSights[name] ?? name;
      if (added.has(key)) continue;

      // Keep the exact visit period if the site is already in the published plan.
      const scheduled = days.flatMap((day, index) => periods.flatMap(period =>
        (" " + day.activities[period] + " ").includes(" " + name + " ")
          ? [{ index, period, local: day.title.has(place) || day.stay.has(place) }] : []
      ));
      const visit = scheduled.find(stop => stop.local);
      if (visit) {
        added.add(key);
        result[visit.index].push({ place, timing: visit.period, description });
      }
    }
  }
  return result;
}
