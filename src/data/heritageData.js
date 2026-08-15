import { calculateEndangermentScore } from "../utils/scoring";

export const INITIAL_HERITAGE_DATA = [
  {
    id: "rogan-art-gujarat",
    name: "Rogan Art of Nirona",
    nativeName: "રોગન કળા (Rogan Kalā)",
    category: "Traditional Craft",
    state: "Gujarat",
    region: "Nirona Village, Kutch District",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&w=1000&q=80",
    summary: "A rare 400-year-old Persian-origin art form of painting cloth using boiled castor oil paste and natural earth pigments.",
    historicalBackground: "Practiced in the Kutch hinterlands for over four centuries, Rogan art involves boiling castor oil for two days into a dense gel called 'Rogan'. Master artisans mix this base with mineral oxides on the palm of their hand and trail the colored thread onto silk or cotton using a six-inch iron stylus, creating intricate floral and geometric motifs without the stylus ever touching the cloth.",
    whyEndangered: "Only one single extended family (the Khatri family of Nirona) currently keeps the authentic technique alive. Industrial screen-printing, lack of competitive income for youth apprentices, and strenuous physical demands have brought this ancient craft to the brink of extinction.",
    factors: {
      practitionerDecline: 92,     // 92% decline in master artisans over 30 yrs
      averagePractitionerAge: 68,  // Elderly masters
      youthLearnersDeficit: 88,    // Only 2 full-time young apprentices
      transmissionRisk: 80         // Completely oral and home-based transmission
    },
    preservationActions: [
      "Purchase verified GI-tagged Rogan art directly from verified artisan cooperatives.",
      "Establish government-sponsored craft residencies and living stipends for youth apprentices in Kutch.",
      "Digitally record and archive the chemical formulation of natural castor oil dyes and stylus techniques."
    ],
    tourism: {
      clusterLocation: "Nirona Village, 40 km from Bhuj, Gujarat",
      bestSeasonToVisit: "October to March (during Rann of Kutch cultural season)",
      artisanContactNote: "Khatri Craft Compound, Nirona",
      culturalEtiquette: "Artisans work with sticky oil pigment; avoid touching active wet canvases."
    }
  },
  {
    id: "koodiyattam-theatre-kerala",
    name: "Koodiyattam Sanskrit Theatre",
    nativeName: "കൂടിയാട്ടം (Kūṭiyāṭṭaṁ)",
    category: "Folk Tradition",
    state: "Kerala",
    region: "Thrissur & Palakkad Districts",
    image: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=1000&q=80",
    summary: "India's oldest living theatrical tradition, performing ancient Sanskrit plays inside sacred temple theatres (Koothambalams).",
    historicalBackground: "Recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity, Koodiyattam dates back more than 1,800 years. It integrates elaborate eye movements (Nethrabhinaya), complex hand gestures (Mudras), and live percussive resonance on copper Mizhavu drums, often taking 40 to 60 hours across multiple nights to perform a single play acts.",
    whyEndangered: "Extreme 10-15 year training period required to master facial muscle control, dwindling temple patronage, and modern entertainment competition have drastically shrunk the number of active full-time performers.",
    factors: {
      practitionerDecline: 68,
      averagePractitionerAge: 58,
      youthLearnersDeficit: 62,
      transmissionRisk: 55
    },
    preservationActions: [
      "Sponsor traditional Gurukulam learning institutions like Kerala Kalamandalam.",
      "Promote translated subtitled performance tours for university and college audiences.",
      "Provide health insurance and senior pensions for veteran temple performers."
    ],
    tourism: {
      clusterLocation: "Moothedathu Koodiyattam Kalakendram, Thrissur, Kerala",
      bestSeasonToVisit: "September to February during temple festival cycles",
      artisanContactNote: "Kerala Kalamandalam Deemed University, Cheruthuruthy",
      culturalEtiquette: "Performances are treated as sacred offerings; silence and respectful attire are expected."
    }
  },
  {
    id: "toda-embroidery-tamilnadu",
    name: "Toda Pukhoor Tribal Embroidery",
    nativeName: "പോഹ്പുക് (Poh Pukhoor)",
    category: "Traditional Craft",
    state: "Tamil Nadu",
    region: "Nilgiri Biosphere Reserve",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    summary: "A distinctive reversible black-and-red geometric thread-count embroidery woven onto unbleached white cotton shawls by Toda pastoral women.",
    historicalBackground: "The Toda tribe of the Nilgiris creates 'Poothkulli' shawls using a counting-of-threads technique without any drawn stencil. The bold red and black buffalo motifs and geometric zigzags symbolize pastoral cosmology, tribal deity reverence, and sacred grasslands ecology.",
    whyEndangered: "Loss of traditional buffalo pastures, migration of tribal youth to urban IT hubs, and cheap industrial synthetic imitations sold to tourists threaten authentic handloom production.",
    factors: {
      practitionerDecline: 62,
      averagePractitionerAge: 56,
      youthLearnersDeficit: 60,
      transmissionRisk: 48
    },
    preservationActions: [
      "Enforce Geographical Indication (GI) anti-counterfeiting laws against synthetic machine prints.",
      "Provide fair-trade direct marketplace platforms eliminating middlemen margins.",
      "Incorporate Toda craft workshops in Nilgiri district educational curricula."
    ],
    tourism: {
      clusterLocation: "Toda Hamlets (Munds) around Ooty & Pykara, Nilgiris",
      bestSeasonToVisit: "April to June and September to November",
      artisanContactNote: "Shalom Ooty Toda Women Self Help Group",
      culturalEtiquette: "Toda hamlets are ecologically sensitive sacred sites; travel with certified indigenous guides."
    }
  },
  {
    id: "kurukh-language-jharkhand",
    name: "Kurukh / Oraon Mother Tongue",
    nativeName: "कुड़ुख़ / ᱳᱨᱟᱝ (Kuṛux)",
    category: "Language/Dialect",
    state: "Jharkhand",
    region: "Chhota Nagpur Plateau (Jharkhand, Odisha, Chhattisgarh)",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
    summary: "An ancient North Dravidian tribal language with its unique Tolong Siki script, spoken by the indigenous Oraon people.",
    historicalBackground: "Kurukh contains an extraordinary vocabulary encoding centuries of forest biodiversity, medicinal flora, agro-climatic rhythms, and Sarhul festival oral hymns. It is one of the few surviving Dravidian linguistic islands isolated within the central Indo-Aryan linguistic belt.",
    whyEndangered: "Classified by UNESCO as vulnerable/endangered. Schooling is exclusively conducted in Hindi or English, causing modern generations of Oraon youth to lose fluency in speaking and writing Tolong Siki.",
    factors: {
      practitionerDecline: 78,
      averagePractitionerAge: 62,
      youthLearnersDeficit: 82,
      transmissionRisk: 75
    },
    preservationActions: [
      "Fund primary bilingual early-childhood textbooks in Tolong Siki script across tribal state schools.",
      "Build open-access digital audio dictionaries and speech-to-text datasets for Kurukh.",
      "Support indigenous community radio stations broadcasting daily news and folklore in Kurukh."
    ],
    tourism: {
      clusterLocation: "Ranchi & Gumla Districts, Jharkhand",
      bestSeasonToVisit: "March to April during Sarhul (Spring Sal Blossom) Festival",
      artisanContactNote: "Tolong Siki Linguistic Society, Ranchi University",
      culturalEtiquette: "Learn a few polite greetings in Kurukh when interacting with tribal village elders."
    }
  },
  {
    id: "khamti-wood-mask-arunachal",
    name: "Khamti Wooden Mask Carving",
    nativeName: "ခမ်းတီး (Tai Khamti Mask)",
    category: "Traditional Craft",
    state: "Arunachal Pradesh",
    region: "Namsai & Changlang Districts",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    summary: "Intricately carved lightweight softwood sacred masks used in Theravada Buddhist drama dances (Poi-Leng) and monastic festivals.",
    historicalBackground: "The Tai Khamti artisans carve mythical beasts, celestial guardians, and animal spirits from single blocks of 'Hollock' and local timber. These masks are treated with organic herbal sap coatings and natural lacquers for use during sacred monastery pantomimes.",
    whyEndangered: "Fewer than 10 master woodcarvers possess the sacred ritual knowledge of proportional iconometry. Deforestation restrictions and plastic masks have severely displaced handcrafting.",
    factors: {
      practitionerDecline: 88,
      averagePractitionerAge: 66,
      youthLearnersDeficit: 85,
      transmissionRisk: 78
    },
    preservationActions: [
      "Establish a woodcraft apprenticeship wing at the Golden Pagoda Eco-Cultural Center in Namsai.",
      "Commission ritual mask installations in regional public cultural museums.",
      "Provide sustainable timber access permits for certified ritual craftsmen."
    ],
    tourism: {
      clusterLocation: "Golden Pagoda Complex, Tengapani, Namsai, Arunachal Pradesh",
      bestSeasonToVisit: "November (Sangken & Poi-Leng festival seasons)",
      artisanContactNote: "Tai Khamti Heritage Society, Chongkham",
      culturalEtiquette: "Ritual masks stored in monasteries should not be handled without monks' permission."
    }
  },
  {
    id: "mudiyettu-ritual-theatre-kerala",
    name: "Mudiyettu Kali Ritual Dance-Drama",
    nativeName: "മുടിയേറ്റ് (Muṭiyēṟṟ)",
    category: "Cultural Practice",
    state: "Kerala",
    region: "Ernakulam, Kottayam & Thrissur Districts",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80",
    summary: "An ancient community ritual drama reenacting the mythological triumph of Goddess Kali over demon Darika in sacred village groves.",
    historicalBackground: "Inscribed on UNESCO's Intangible Cultural Heritage list, Mudiyettu is performed annually in Bhagavathy temple courtyards. Before the performance, a magnificent multi-colored floor painting (Kalam) of the goddess is created using rice powder, turmeric, charcoal, and crushed leaves, then ritually erased by the chief performer in trance.",
    whyEndangered: "Practiced exclusively by traditional Marar and Kuruppu community clans, whose youth are increasingly moving away to secular urban occupations.",
    factors: {
      practitionerDecline: 65,
      averagePractitionerAge: 59,
      youthLearnersDeficit: 64,
      transmissionRisk: 52
    },
    preservationActions: [
      "Offer community trust grants to maintain sacred grove temples where Mudiyettu is staged.",
      "Document the natural floor-pigment (Kalam) botanical recipes in university monographs.",
      "Organize inter-temple cultural festivals to encourage year-round performance opportunities."
    ],
    tourism: {
      clusterLocation: "Pazhoor Perumthrikkovil & Kunnackal Temples, Ernakulam, Kerala",
      bestSeasonToVisit: "February to May (Post-harvest temple festival season)",
      artisanContactNote: "Mudiyettu Sangham, Koratty",
      culturalEtiquette: "Observing the Kalam drawing requires quiet reverence in traditional temple attire."
    }
  },
  {
    id: "chhau-mask-purulia-bengal",
    name: "Purulia Chhau Martial Mask Dance",
    nativeName: "পুরুলিয়া ছৌ নাচ (Purulia Chhau)",
    category: "Folk Tradition",
    state: "West Bengal",
    region: "Charida Village, Purulia District",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    summary: "A high-octane acrobatic martial folk dance where dancers don colorful paper-mâché masks depicting epic heroes and demons.",
    historicalBackground: "Born from tribal hunting rituals and military mock-combats, Purulia Chhau dancers perform electrifying somersaults and spins to the thundering beat of Dhamsa drums. In Charida village, over 150 artisan families traditionally hand-molded the clay and paper masks decorated with peacock feathers and beads.",
    whyEndangered: "Low remuneration for grueling seasonal dance troupes, skyrocketing prices of raw papier-mâché materials, and lack of healthcare for injured dancers.",
    factors: {
      practitionerDecline: 48,
      averagePractitionerAge: 46,
      youthLearnersDeficit: 45,
      transmissionRisk: 38
    },
    preservationActions: [
      "Set up an artisan raw material cooperative in Charida to stabilize paper and clay prices.",
      "Create an emergency injury insurance and pension fund for acrobatic martial performers.",
      "Promote state tourism tie-ups for international performing arts delegations."
    ],
    tourism: {
      clusterLocation: "Charida Mask Village, Baghmundi, Purulia, West Bengal",
      bestSeasonToVisit: "December to March during Purulia Chhau Mela",
      artisanContactNote: "Charida Sutradhar Mask Makers Association",
      culturalEtiquette: "Charida is a live artisan village; visitors can sit and watch mask molding with permission."
    }
  },
  {
    id: "apatani-dree-festival-arunachal",
    name: "Apatani Dree Agricultural Rites",
    nativeName: "ᡩᡰᡕᡝ (Dree Rituals)",
    category: "Festival",
    state: "Arunachal Pradesh",
    region: "Ziro Valley, Lower Subansiri District",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80",
    summary: "An indigenous agricultural festival celebrating the world-famous fish-cum-paddy agro-ecosystem of the Apatani tribe in Ziro Valley.",
    historicalBackground: "The Apatani community practices one of the world's most sustainable zero-waste wet-rice farming systems, declared a tentative UNESCO World Heritage site. The Dree festival invokes five protective agrarian deities (Tamu, Harniang, Metii, Danyi, and Dree) through sacred chants and cucumber-rice offerings to safeguard crops from pests.",
    whyEndangered: "Shift from traditional organic wet-paddy farming to commercial horticulture (kiwi/apple orchards) and gradual erosion of oral priesthood (Nyibus) who remember the complex liturgical chants.",
    factors: {
      practitionerDecline: 54,
      averagePractitionerAge: 52,
      youthLearnersDeficit: 50,
      transmissionRisk: 48
    },
    preservationActions: [
      "Incentivize youth participation in traditional Apatani fish-paddy agro-forestry practices.",
      "Record and transcribe the sacred oral chants (Nyibu prayers) in Latin and tribal orthography.",
      "Foster eco-tourism that protects Ziro's unique hydraulic canal architecture from urban encroachment."
    ],
    tourism: {
      clusterLocation: "Ziro Valley, Lower Subansiri District, Arunachal Pradesh",
      bestSeasonToVisit: "July 4th to 7th (Dree Festival main dates)",
      artisanContactNote: "Apatani Cultural & Heritage Society, Ziro",
      culturalEtiquette: "Respect sacred bamboo sacrificial altars (Yugyang); do not tamper with festive ritual installations."
    }
  },
  {
    id: "ladakhi-fresco-restoration",
    name: "Monastic Mineral Fresco Painting",
    nativeName: "ལྷ་བྲིས་ (Lha-bris Ladakh)",
    category: "Cultural Practice",
    state: "Ladakh",
    region: "Alchi & Hemis Monasteries, Leh District",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    summary: "Ancient Himalayan tempera wall painting on monastery mud-plasters using powdered lapis lazuli, malachite, and gold dust.",
    historicalBackground: "Dating back to the 11th-century Kashmiri-Tibetan synthesis seen at Alchi Monastery, master 'Lharipas' (sacred painters) blend crushed Himalayan semi-precious stones with yak-skin glue to depict cosmological mandalas and Tantric deities that have endured centuries of sub-zero temperatures.",
    whyEndangered: "Unregulated tourist moisture condensation inside ancient sanctums, climate-induced flash floods in Ladakh, and fewer than five master restorer-painters with knowledge of classical mineral preparation.",
    factors: {
      practitionerDecline: 76,
      averagePractitionerAge: 64,
      youthLearnersDeficit: 74,
      transmissionRisk: 68
    },
    preservationActions: [
      "Establish scientific conservation fellowships for young Himalayan students in Leh.",
      "Install non-invasive humidity and temperature telemetry in ancient monastic mud temples.",
      "Support ethical eco-certified mineral extraction for sacred icon painters."
    ],
    tourism: {
      clusterLocation: "Alchi, Hemis & Likir Monasteries, Leh District, Ladakh",
      bestSeasonToVisit: "May to September (accessible high passes)",
      artisanContactNote: "Ladakh Arts and Media Organisation (LAMO), Leh Old Town",
      culturalEtiquette: "Strictly forbidden to use camera flash or touch fragile 1000-year-old mud-plaster frescoes."
    }
  },
  {
    id: "gorakhpur-terracotta-craft",
    name: "Gorakhpur Black & Red Terracotta",
    nativeName: "गोरखपुर टेराकोटा शिल्प",
    category: "Traditional Craft",
    state: "Uttar Pradesh",
    region: "Bhathat & Aurangabad, Gorakhpur District",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80",
    summary: "Hand-ornamented terracotta elephants, horses, and clay filigree items sculpted without molds using local pond clay.",
    historicalBackground: "With over a millennium of historical lineage, artisans in Aurangabad village use riverbed clay and natural soda ash to mold majestic ornamental elephant sculptures with elaborate bells and surface carvings, fired in traditional cow-dung kilns.",
    whyEndangered: "Rising cost of clay excavation, transition of clay workers to brick-kiln day labor, and cheap plastic home decor substitutes.",
    factors: {
      practitionerDecline: 38,
      averagePractitionerAge: 44,
      youthLearnersDeficit: 36,
      transmissionRisk: 28
    },
    preservationActions: [
      "Expand the One District One Product (ODOP) online logistics hub for international craft export.",
      "Provide modernized electric pottery wheels and energy-efficient smokeless kilns.",
      "Organize annual craft fairs linking artisans directly with urban interior designers."
    ],
    tourism: {
      clusterLocation: "Aurangabad Village, Gorakhpur, Uttar Pradesh",
      bestSeasonToVisit: "October to March",
      artisanContactNote: "Gorakhpur Terracotta Artisans Union",
      culturalEtiquette: "Clay items in sun-drying courtyards are fragile; walk cautiously through artisan lanes."
    }
  },
  {
    id: "pingla-patachitra-bengal",
    name: "Pingla Patachitra & Pater Gaan",
    nativeName: "পটের গান ও পটচিত্র (Pingla Scroll Ballads)",
    category: "Folk Tradition",
    state: "West Bengal",
    region: "Naya Village, Pingla, Paschim Medinipur District",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
    summary: "Ancient narrative scroll painting paired with oral ballad chanting (Pater Gaan) using 100% natural organic floral and mineral pigments.",
    historicalBackground: "In Naya village, an entire community of Chitrakar (Patua) artists unroll vertical handmade scroll paintings while performing melodious, improvised Bengali ballads recounting mythological epics, ecological tales, and social folklore. The vibrant pigments are hand-ground from aparajita flowers (blue), turmeric (yellow), teak leaves (red), lampblack, and bel fruit resin glue.",
    whyEndangered: "While the visual painting finds urban markets, the sacred oral tradition of singing corresponding narrative verses (Pater Gaan) is rapidly dying as younger Patuas abandon oral memorization in favor of purely commercial wall decor.",
    factors: {
      practitionerDecline: 74,
      averagePractitionerAge: 62,
      youthLearnersDeficit: 80,
      transmissionRisk: 72
    },
    preservationActions: [
      "Record and archive high-fidelity audio performances of elderly Patua ballad singers.",
      "Host annual 'POT Maya' village festival workshops integrating oral storytelling into school curricula.",
      "Provide GI-protection and authentic artist lineage certification for certified Chitrakars."
    ],
    tourism: {
      clusterLocation: "Naya Patachitra Village, Pingla, Paschim Medinipur, West Bengal",
      bestSeasonToVisit: "November (during the annual POT Maya Art Festival)",
      artisanContactNote: "Pingla Chitrakar Co-operative Society",
      culturalEtiquette: "Patua artists welcome visitors into their home verandas; always listen patiently when they sing their scroll verses."
    }
  },
  {
    id: "bikna-dokra-metalcraft-bengal",
    name: "Bikna Dokra Lost-Wax Metal Casting",
    nativeName: "বিকনা ডোকরা শিল্প (Bikna Dokra)",
    category: "Traditional Craft",
    state: "West Bengal",
    region: "Bikna Village, Bankura District",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80",
    summary: "A 4,000-year-old primitive lost-wax non-ferrous metal casting craft creating rustic brass figurines with twisted wax threads.",
    historicalBackground: "Tracing directly to the Indus Valley's famous 'Dancing Girl', the Karmakar tribal artisans of Bikna hand-sculpt clay cores, overlay them with intricate beeswax coils, and bake them in open earthen pit furnaces to cast hollow brass folk deities, owls, and musicians.",
    whyEndangered: "Skyrocketing market prices of pure beeswax and scrap brass raw materials, severe occupational health hazards from inhaling coal kiln smoke, and cheap machine-made die-cast imitations.",
    factors: {
      practitionerDecline: 64,
      averagePractitionerAge: 56,
      youthLearnersDeficit: 68,
      transmissionRisk: 54
    },
    preservationActions: [
      "Provide state subsidies on raw brass and beeswax for registered Bikna craft families.",
      "Install ergonomic smokeless pit-furnaces to safeguard veteran artisans' respiratory health.",
      "Partner with national craft design institutes (NID/NIFT) for contemporary architectural brass applications."
    ],
    tourism: {
      clusterLocation: "Bikna Dokra Village, 4 km from Bankura Town, West Bengal",
      bestSeasonToVisit: "October to February (mild winter crafting season)",
      artisanContactNote: "Bikna Dokra Artisans Guild, Bankura",
      culturalEtiquette: "Open pit kilns operate at very high temperatures; maintain a safe distance when artisans pour molten brass."
    }
  }
];

// Helper to precompute scores and statuses for all items
export const HERITAGE_DATA = INITIAL_HERITAGE_DATA.map((item) => {
  const score = calculateEndangermentScore(item.factors);
  return {
    ...item,
    endangermentScore: score
  };
});
