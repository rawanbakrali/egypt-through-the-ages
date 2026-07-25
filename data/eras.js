// data/eras.js

module.exports = {
  islamic: {
    slug: "islamic",
    name: "Islamic Egypt",

    // ---- HERO ----
    smallLabel: "THE ISLAMIC ERA",
    heroImage: "/assets/hero/islamic-hero.jpg",
    subtitle: "From the Arab conquest to the Ottoman era,<br>a golden age of science, architecture, and culture<br>that shaped Egypt's timeless identity.",
    timelineRange: "641 CE – 1798 CE",

    // ---- MAP ----
    markerColor: "#16A34A", // locked spec color for Islamic era (corrected from live #D4AF37)
    mapCenter: [30.0444, 31.2357],
    mapZoom: 12,

    // ---- OVERVIEW TEXT ----
    overviewText: {
      heading: "An Era of Faith,<br>Knowledge & Art",
      paragraph: "Islamic Egypt became a center of learning, trade, and craftsmanship. Mosques, madrasas, and markets flourished, leaving behind a rich heritage that still lives in its cities today.",
    },

    // ---- CATEGORY CARDS (Overview feature cards) ----
    categories: [
      {
        key: "mosques",
        label: "Mosques",
        image: "/assets/eras/mosque.jpg",
        blurb: "Places of worship and architectural beauty"
      },
      {
        key: "citadels",
        label: "Citadels",
        image: "/assets/eras/citadels.jpg",
        blurb: "Fortresses that defended Islamic Egypt"
      },
      {
        key: "art-culture",
        label: "Art & Culture",
        image: "/assets/eras/art&culture.jpg",
        blurb: "Calligraphy, crafts, music and traditions"
      }
    ],

    // ---- CATEGORY DATA (dynamic grid cards + drawer content) ----
    categoryData: {
      mosques: [
        {
          name: "Al-Azhar Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "124",
          image: "/assets/eras/al-azhar-main.jpg",
          thumbnails: [
            "/assets/eras/al-azhar-thumb1.jpg",
            "/assets/eras/al-azhar-thumb2.jpg",
            "/assets/eras/al-azhar-thumb3.jpg",
            "/assets/eras/al-azhar-thumb4.jpg"
          ],
          desc: "Founded in 970 CE, Al-Azhar Mosque is one of the most important landmarks of Islamic Cairo and the center of learning for over a thousand years.",
          history: "Al-Azhar Mosque was founded in 970 CE by the Fatimid dynasty, shortly after they established Cairo as their new capital. It was built to serve both as a place of worship and as a center of Islamic scholarship, and just two years later it began functioning as a teaching institution — eventually growing into Al-Azhar University, one of the oldest continuously operating universities in the world. Over the following centuries, successive rulers — Ayyubid, Mamluk, and Ottoman alike — expanded and restored the mosque, adding new gates, minarets, and study halls, each leaving their own architectural mark. Despite occasional periods of neglect, Al-Azhar survived largely intact, and today remains one of the most important religious and educational institutions in the Sunni Muslim world.",
          tags: ["Mosque", "Architecture", "Education", "History"],
          quickFacts: {
            built: "970 CE",
            founder: "Jawhar al-Siqilli",
            style: "Fatimid",
            function: "Mosque & University"
          },
          visitorInfo: {
            hours: "8:00 AM – 6:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Sultan Hassan Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "98",
          image: "/assets/eras/hassan-main.jpg",
          thumbnails: [
            "/assets/eras/hassan-thumb1.jpg",
            "/assets/eras/hassan-thumb2.jpg",
            "/assets/eras/hassan-thumb3.jpg"
          ],
          desc: "A massive Mamluk-era mosque and madrasa near the Citadel. Its incredible scale makes it one of the most iconic monuments in the Islamic world.",
          history: "Commissioned by Sultan An-Nasir Hasan in 1356 CE, this mosque-madrasa complex was built on such an ambitious scale that it reportedly bankrupted the royal treasury during construction. Its central dome collapsed shortly after completion and had to be rebuilt, and the sultan himself was assassinated before the building was finished, leaving parts of it incomplete to this day. Positioned directly beneath the Cairo Citadel, its massive stone walls also served a defensive purpose, and cannons were later mounted on its roof during periods of unrest. Despite this turbulent history, it remains one of the finest surviving examples of Mamluk religious architecture in Egypt.",
          tags: ["Mosque", "Madrasa", "Mamluk Architecture"],
          quickFacts: {
            built: "1356 CE",
            founder: "Sultan An-Nasir Hasan",
            style: "Mamluk",
            function: "Mosque & Madrasa"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Late afternoon",
            dressCode: "Modest clothing required",
            entryFee: "100 EGP"
          }
        },
        {
          name: "Sayyida Zainab Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "198",
          image: "/assets/eras/sayyida-zainab-main.jpg",
          thumbnails: ["/assets/eras/sayyida-zainab-thumb1.jpg"],
          desc: "One of Cairo's most revered shrine-mosques, dedicated to Sayyida Zainab, granddaughter of the Prophet Muhammad, and a major site of pilgrimage.",
          history: "This mosque marks the traditional burial site of Sayyida Zainab, granddaughter of the Prophet Muhammad, who is believed to have sought refuge in Cairo following the upheavals that followed her family's history in the Levant. The current structure dates largely to an 18th-century Ottoman rebuilding, though the site itself has been venerated for far longer. Today it stands as one of Cairo's most significant shrine-mosques, drawing pilgrims year-round, with especially large crowds gathering during her annual moulid (birth commemoration), one of the largest religious festivals in the city.",
          tags: ["Mosque", "Shrine"],
          quickFacts: {
            built: "1768 CE (rebuilt; site venerated earlier)",
            founder: "Ottoman-era patrons",
            style: "Ottoman/Neo-Mamluk",
            function: "Mosque & Shrine"
          },
          visitorInfo: {
            hours: "8:00 AM – 9:00 PM",
            bestTime: "Evening",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Ibn Tulun Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "89",
          image: "/assets/eras/tulun-main.jpg",
          thumbnails: ["/assets/eras/tulun-thumb1.jpg", "/assets/eras/tulun-thumb2.jpg"],
          desc: "One of the oldest mosques in Egypt still standing in its original form, known for its unique spiral minaret.",
          history: "Built in 879 CE by Ahmad ibn Tulun, the governor who established Egypt's first independent Islamic dynasty, this mosque was constructed on a rocky outcrop deliberately chosen to avoid land disputes with Cairo's Coptic Christian and Jewish communities. Its unique spiral minaret, inspired by the Great Mosque of Samarra in Iraq, reflects Ibn Tulun's origins in the Abbasid heartland. Remarkably, the mosque survives today in almost its original form, having escaped the extensive rebuilding that reshaped so many of Cairo's other early monuments, making it one of the best-preserved examples of 9th-century Islamic architecture anywhere in the world.",
          tags: ["Mosque", "Abbasid Architecture"],
          quickFacts: {
            built: "879 CE",
            founder: "Ahmad ibn Tulun",
            style: "Abbasid",
            function: "Mosque"
          },
          visitorInfo: {
            hours: "8:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Al-Hussein Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "287",
          image: "/assets/eras/al-hussein-main.jpg",
          thumbnails: ["/assets/eras/al-hussein-thumb1.jpg"],
          desc: "Located beside Khan El Khalili, this mosque is believed to house a relic associated with Hussein ibn Ali, grandson of the Prophet Muhammad, making it one of the holiest sites in Egypt.",
          history: "Built adjacent to the bustling Khan El Khalili bazaar, Al-Hussein Mosque is believed to house a relic associated with Hussein ibn Ali, grandson of the Prophet Muhammad, brought to Cairo during the Fatimid period. The mosque quickly became one of the holiest sites in Sunni and Shia Islam alike, and Egyptian rulers historically took their oath of office here. The current building dates largely to a 19th-century reconstruction in a Neo-Gothic-influenced style, though the site's religious significance stretches back to the 12th century. It remains an active and deeply revered pilgrimage site, especially crowded during Ramadan.",
          tags: ["Mosque", "Shrine"],
          quickFacts: {
            built: "1154 CE (rebuilt in the 19th century)",
            founder: "Fatimid-era patrons",
            style: "Fatimid/Neo-Gothic",
            function: "Mosque & Shrine"
          },
          visitorInfo: {
            hours: "8:00 AM – 9:00 PM",
            bestTime: "Evening",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Mohamed Ali Mosque",
          location: "Cairo",
          fullLocation: "Cairo Citadel, Cairo, Egypt",
          reviewCount: "312",
          image: "/assets/eras/mohamed-ali-mosque-main.jpg",
          thumbnails: ["/assets/eras/mohamed-ali-mosque-thumb1.jpg"],
          desc: "Perched atop the Cairo Citadel, this Ottoman-style alabaster mosque was commissioned by Mohamed Ali Pasha and remains one of Cairo's most recognizable landmarks.",
          history: "Commissioned by Mohamed Ali Pasha in 1830 and modeled on the great Ottoman mosques of Istanbul, this alabaster-clad mosque was built atop the Cairo Citadel as a statement of the ruler's power and modernizing ambitions for Egypt. Its construction took nearly two decades and Mohamed Ali did not live to see it finished, though he was later buried within its grounds. Perched high above the city, its silhouette — twin minarets and a great central dome — became a defining symbol of 19th-century Cairo and remains one of the most photographed landmarks in Egypt today.",
          tags: ["Mosque", "Ottoman Architecture"],
          quickFacts: {
            built: "1830–1848 CE",
            founder: "Mohamed Ali Pasha",
            style: "Ottoman",
            function: "Mosque"
          },
          visitorInfo: {
            hours: "8:00 AM – 5:00 PM",
            bestTime: "Late afternoon",
            dressCode: "Modest clothing required",
            entryFee: "Included with Citadel ticket"
          }
        },
        {
          name: "Amr ibn Al-Aas Mosque",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          reviewCount: "54",
          image: "/assets/eras/amr-main.jpg",
          thumbnails: ["/assets/eras/amr-thumb1.jpg"],
          desc: "The first mosque ever built in Egypt and Africa, founded in 642 CE by the Muslim general Amr ibn Al-Aas.",
          history: "Founded in 642 CE by the Muslim general Amr ibn Al-Aas shortly after the Arab conquest of Egypt, this was the first mosque ever built on the African continent. Originally a modest structure, it was expanded repeatedly over the following centuries as the surrounding garrison town of Fustat grew into a major city — eventually laying the groundwork for what would become Cairo. Though little of the original 7th-century structure survives due to repeated rebuilding, the site itself has remained in continuous religious use for over 1,300 years, making it one of the oldest sites of Islamic worship anywhere in the world.",
          tags: ["Mosque", "First in Africa"],
          quickFacts: {
            built: "642 CE",
            founder: "Amr ibn Al-Aas",
            style: "Early Islamic",
            function: "Mosque"
          },
          visitorInfo: {
            hours: "8:00 AM – 6:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Al-Hakim Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "47",
          image: "/assets/eras/hakim-main.jpg",
          thumbnails: ["/assets/eras/hakim-thumb1.jpg",
                       "/assets/eras/hakim-thumb2.jpg",
                      "/assets/eras/hakim-thumb3.jpg"],
          desc: "A major Fatimid-era mosque known for its massive minarets and open courtyard, recently restored.",
          history: "Construction on this mosque began under Caliph Al-Aziz in 990 CE and was completed by his son, the famously enigmatic Caliph Al-Hakim, in 1013 CE. Al-Hakim was known for his unpredictable and often severe rule, and the mosque named after him fell into disrepair for centuries, at various points serving as a stable, a Crusader prison, and a warehouse before Islamic scholars pushed for its restoration in the 20th century. Today it stands fully restored, its massive minarets and open courtyard once again reflecting the grandeur of its original Fatimid design.",
          tags: ["Mosque", "Fatimid Architecture"],
          quickFacts: {
            built: "1013 CE",
            founder: "Caliph Al-Hakim",
            style: "Fatimid",
            function: "Mosque"
          },
          visitorInfo: {
            hours: "8:00 AM – 6:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        }
      ],

      citadels: [
        {
          name: "Cairo Citadel",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "203",
          image: "/assets/eras/cairo-citadel-main.jpg",
          thumbnails: ["/assets/eras/cairo-citadel-thumb1.jpg"],
          desc: "Built by Salah al-Din in 1176 CE to defend Cairo against Crusader attacks, this hilltop fortress remained the seat of Egypt's rulers for nearly 700 years.",
          tags: ["Citadel", "Fortress", "Ayyubid"],
          embed3D: "https://sketchfab.com/models/ae6fb6a149bb423c833fdec36b1e5447/embed?ui_theme=dark&ui_infos=0&ui_controls=0&ui_stop=0&ui_watermark_link=0&ui_watermark=0&autostart=1",
          quickFacts: {
            built: "1176 CE",
            founder: "Salah al-Din (Saladin)",
            style: "Ayyubid Military",
            function: "Fortress & Royal Residence"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "200 EGP"
          }
        },
        {
          name: "Qaitbay Citadel",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          reviewCount: "178",
          image: "/assets/eras/qaitbay-main.jpg",
          thumbnails: ["/assets/eras/qaitbay-thumb1.jpg"],
          desc: "Constructed in 1477 by Sultan Qaitbay on the site of the ancient Lighthouse of Alexandria, this coastal fortress guarded the harbor for centuries.",
          tags: ["Citadel", "Coastal Fortress", "Mamluk"],
          quickFacts: {
            built: "1477 CE",
            founder: "Sultan Qaitbay",
            style: "Mamluk Military",
            function: "Fortress"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "80 EGP"
          }
        }
      ],

      "art-culture": [
        {
          name: "Islamic Calligraphy",
          interactive: false,
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "58",
          image: "/assets/eras/calligraphy.jpg",
          thumbnails: ["/assets/eras/calligraphy-thumb1.jpg"],
          desc: "The art of Arabic script has adorned mosques, manuscripts, and monuments across Egypt for over a thousand years.",
          tags: ["Art Form", "Calligraphy"],
          quickFacts: {
            built: "Practiced since 7th century",
            founder: "N/A — traditional art form",
            style: "Kufic, Naskh, Thuluth",
            function: "Decorative & Religious Art"
          },
          visitorInfo: {
            hours: "Workshops vary by location",
            bestTime: "Anytime",
            dressCode: "Casual",
            entryFee: "Varies by workshop"
          }
        },
        {
            name: "Ramadan",
            interactive: false,
            location: "Cairo",
            fullLocation: "Cairo, Egypt",
            reviewCount: "0",
            image: "/assets/eras/ramadan-main.jpg",
            thumbnails: ["/assets/eras/ramadan-thumb1.jpg"],
            desc: "The Islamic holy month of fasting, prayer, and reflection, observed each year according to the lunar calendar and marked across Egypt by lantern-lit streets, communal iftars, and nightly prayers.",
            tags: ["Religious Observance", "Tradition"],
            quickFacts: {
              built: "Observed since 610 CE",
              founder: "N/A — religious observance",
              style: "Islamic Lunar Calendar",
              function: "Month of Fasting & Reflection"
            },
            visitorInfo: {
              hours: "Varies — observed throughout the month",
              bestTime: "Evening, after Iftar",
              dressCode: "Modest clothing recommended",
              entryFee: "N/A"
            }
          },
        {
          name: "Sufi Music & Traditions",
          interactive: false,
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "72",
          image: "/assets/eras/sufi-music.jpg",
          thumbnails: ["/assets/eras/sufi-thumb1.jpg"],
          desc: "Devotional music and Sufi traditions that have echoed through Egypt's mosques and festivals for centuries.",
          tags: ["Music", "Sufi Tradition"],
          quickFacts: {
            built: "Practiced since medieval era",
            founder: "N/A — traditional practice",
            style: "Sufi Devotional",
            function: "Spiritual & Cultural Practice"
          },
          visitorInfo: {
            hours: "Performance schedules vary",
            bestTime: "Religious festivals",
            dressCode: "Modest clothing recommended",
            entryFee: "Varies by event"
          }
        }
      ]
    },

    // ---- MAP MARKERS ----
    markersData: [
      {
        name: "Al-Azhar Mosque",
        coords: [30.0457, 31.2627],
        city: "cairo",
        category: "Mosques",
        location: "Cairo, Egypt",
        desc: "Founded in 970 CE, Al-Azhar Mosque is one of the most important landmarks of Islamic Cairo and the center of learning for over a thousand years.",
        image: "/assets/eras/al-azhar-main.jpg"
      },
      {
        name: "Sultan Hassan Mosque",
        coords: [30.0322, 31.2560],
        city: "cairo",
        category: "Mosques",
        location: "Cairo, Egypt",
        desc: "A massive Mamluk-era mosque and madrasa near the Citadel. Its incredible scale makes it one of the most iconic monuments in the Islamic world.",
        image: "/assets/eras/hassan-main.jpg"
      },
      {
        name: "Qaitbay Citadel",
        coords: [31.2139, 29.8850],
        city: "alexandria",
        category: "Citadels",
        location: "Alexandria, Egypt",
        desc: "Built in 1477 by Sultan Al-Ashraf Sayf al-Din Qa'it Bay, this defensive fortress sits directly on the Mediterranean coast.",
        image: "/assets/eras/qaitbay-main.jpg"
      }
    ],

    // ---- TOP CITIES SIDEBAR ----
    cities: [
      { key: "cairo", name: "Cairo", blurb: "The heart of Islamic Egypt", image: "/assets/eras/cairo.jpg", coords: [30.0444, 31.2357] },
      { key: "alexandria", name: "Alexandria", blurb: "A historic Mediterranean gem", image: "/assets/eras/alexandria.jpg", coords: [31.2001, 29.9187] },
      { key: "fayoum", name: "Fayoum", blurb: "Oases with a rich Islamic past", image: "/assets/eras/fayoum.jpg", coords: [29.3084, 30.8428] },
      { key: "luxor", name: "Luxor", blurb: "Temples and Islamic heritage", image: "/assets/eras/luxor.jpg", coords: [25.6872, 32.6396] },
      { key: "aswan", name: "Aswan", blurb: "Nubian culture and history", image: "/assets/eras/aswan.jpg", coords: [24.0889, 32.8998] }
    ],

    // ---- TIMELINE ----
    timeline: {
      intro: "Explore the major Islamic dynasties that shaped Egypt.",
      points: [
        { name: "Fatimid", date: "969–1171", active: true },
        { name: "Ayyubid", date: "1171–1250", active: false },
        { name: "Mamluk", date: "1250–1517", active: false },
        { name: "Ottoman", date: "1517–1798", active: false },
        { name: "Modern", date: "1798–Now", active: false }
      ]
    },

    // ---- LEGACY ----
    legacy: {
      image: "/assets/eras/islamic-legacy.jpg",
      paragraphs: [
        "Islam arrived in Egypt in 641 CE, when Arab forces led by Amr ibn al-As took the country from Byzantine rule during the early Muslim conquests. A garrison town called Fustat was founded soon after, laying the groundwork for what would eventually become Cairo.",
        "In 969 CE, the Fatimid dynasty founded Cairo itself as a new imperial capital, and established Al-Azhar as one of the earliest centers of Islamic learning anywhere in the world. Under the Mamluks who followed, Egypt became a crossroads of trade between Asia, Africa, and Europe, and its rulers poured wealth into building mosques, madrasas, and public monuments across the city.",
        "By the Ottoman period, Egypt had become one of the wealthiest provinces of the empire, its architecture blending local Mamluk traditions with new influences arriving from Istanbul. Layered over more than a thousand years, this history shaped Cairo into what UNESCO now recognizes as one of the world's oldest surviving Islamic cities.",
        "That legacy is still visible today across Cairo's mosques, madrasas, and markets, many of which remain in active use more than a thousand years after they were built."
      ]
    },

    // ---- ARCHITECTURE ----
    architecture: {
      image: "/assets/eras/islamic-architecture.jpg",
      paragraph: "Islamic architecture in Egypt blends Fatimid, Mamluk, and Ottoman styles, marked by soaring minarets, intricately carved wooden mashrabiya screens, and geometric and calligraphic ornamentation. Courtyards and domes were designed to draw in light while keeping interiors cool — a hallmark of design suited to Egypt's climate."
    },

  },

  // ---- STUB DATA (Step 12): proves /era/:slug works for multiple eras.
  // Full content for each is the actual Stage 2 era-building work, done later.
  "ancient-egypt": {
    slug: "ancient-egypt",
    name: "Ancient Egypt",
    smallLabel: "THE ANCIENT ERA",
    heroImage: "/assets/hero/ancient-egypt-hero.jpg",
    subtitle: "From the first pharaohs to the age of pyramids,<br>a civilization along the Nile<br>that shaped the ancient world.",
    timelineRange: "3100 BCE – 332 BCE",
    markerColor: "#F59E0B", // locked spec: Ancient Egypt = orange
    mapCenter: [26.8206, 30.8025],
    mapZoom: 6,

    overviewText: {
      heading: "A Civilization<br>Along the Nile",
      paragraph: "Ancient Egypt flourished for nearly three thousand years along the banks of the Nile. Pyramids, temples, and royal tombs still stand as monuments to one of the ancient world's most enduring civilizations.",
    },

    categories: [
      {
        key: "pyramids",
        label: "Pyramids",
        image: "/assets/eras/pyramids-category.jpg",
        blurb: "Monumental tombs built for Egypt's pharaohs"
      },
      {
        key: "temples",
        label: "Temples",
        image: "/assets/eras/temples-category.jpg",
        blurb: "Sacred sites dedicated to Egypt's gods and rulers"
      },
      {
        key: "museums",
        label: "Museums",
        image: "/assets/eras/museums-category.jpg",
        blurb: "Home to Egypt's greatest ancient treasures"
      }
    ],

    categoryData: {
      pyramids: [
        {
          name: "Great Pyramid of Giza",
          location: "Giza",
          fullLocation: "Giza, Egypt",
          reviewCount: "412",
          image: "/assets/eras/great-pyramid-main.jpg",
          thumbnails: ["/assets/eras/great-pyramid-thumb1.jpg", "/assets/eras/great-pyramid-thumb2.jpg"],
          desc: "Built around 2560 BCE for Pharaoh Khufu, this was the tallest man-made structure in the world for over 3,800 years.",
          history: "Built around 2560 BCE as the tomb of Pharaoh Khufu, the Great Pyramid was constructed using an estimated 2.3 million limestone blocks, some weighing as much as 80 tons, transported from quarries as far as Aswan. For over 3,800 years it held the record as the tallest human-made structure on Earth, a title it retained until the completion of Lincoln Cathedral in the 14th century CE. Ancient Greek historians included it among the Seven Wonders of the Ancient World, and it remains the only one still largely intact today. Its interior passages and chambers, aligned with extraordinary astronomical precision, continue to be studied by archaeologists seeking to understand the engineering methods of its builders.",
          tags: ["Pyramid", "Old Kingdom", "UNESCO Site"],
          quickFacts: {
            built: "c. 2560 BCE",
            founder: "Pharaoh Khufu",
            style: "Old Kingdom",
            function: "Royal Tomb"
          },
          visitorInfo: {
            hours: "8:00 AM – 4:00 PM",
            bestTime: "Early morning",
            dressCode: "Casual, sun protection recommended",
            entryFee: "540 EGP"
          }
        },
        {
          name: "Pyramid of Khafre",
          location: "Giza",
          fullLocation: "Giza, Egypt",
          reviewCount: "289",
          image: "/assets/eras/khafre-main.jpg",
          thumbnails: ["/assets/eras/khafre-thumb1.jpg"],
          desc: "The second-largest pyramid at Giza, built for Khufu's son Khafre, and still retains some of its original limestone casing near the summit.",
          history: "Built around 2570 BCE for Khufu's son Khafre, this pyramid appears taller than its neighbor due to its slightly higher elevation on the Giza plateau, though it is in fact marginally smaller. It remains the only pyramid at Giza to retain a portion of its original smooth limestone casing, visible near its summit, offering a glimpse of how all three pyramids would have gleamed in white stone when first completed. The pyramid's mortuary and valley temples, along with the causeway connecting them, form part of one of the most complete surviving royal funerary complexes from the Old Kingdom.",
          tags: ["Pyramid", "Old Kingdom"],
          quickFacts: {
            built: "c. 2570 BCE",
            founder: "Pharaoh Khafre",
            style: "Old Kingdom",
            function: "Royal Tomb"
          },
          visitorInfo: {
            hours: "8:00 AM – 4:00 PM",
            bestTime: "Early morning",
            dressCode: "Casual, sun protection recommended",
            entryFee: "440 EGP"
          }
        },
        {
          name: "Great Sphinx of Giza",
          location: "Giza",
          fullLocation: "Giza, Egypt",
          reviewCount: "356",
          image: "/assets/eras/sphinx-main.jpg",
          thumbnails: ["/assets/eras/sphinx-thumb1.jpg"],
          desc: "A limestone statue with the body of a lion and the head of a pharaoh, believed to represent Khafre, guarding the Giza plateau for over 4,500 years.",
          history: "Carved from a single mass of limestone bedrock around 2500 BCE, the Great Sphinx is believed to represent Pharaoh Khafre, its lion's body symbolizing royal power and its human head representing the pharaoh's divine authority. For centuries it lay buried up to its neck in desert sand, only fully excavated in the 20th century. A dream inscribed on a stone tablet between its paws, dating to the New Kingdom, tells the legend of Prince Thutmose IV, who was promised the throne if he cleared the sand from around the statue. Despite millennia of erosion and past attempts at deliberate damage, it remains one of the most recognizable monuments on Earth.",
          tags: ["Monument", "Old Kingdom"],
          quickFacts: {
            built: "c. 2500 BCE",
            founder: "Attributed to Pharaoh Khafre",
            style: "Old Kingdom",
            function: "Guardian Monument"
          },
          visitorInfo: {
            hours: "8:00 AM – 4:00 PM",
            bestTime: "Sunset",
            dressCode: "Casual",
            entryFee: "Included with Giza ticket"
          }
        },
        {
          name: "Step Pyramid of Djoser",
          location: "Saqqara",
          fullLocation: "Saqqara, Egypt",
          reviewCount: "178",
          image: "/assets/eras/djoser-main.jpg",
          thumbnails: ["/assets/eras/djoser-thumb1.jpg"],
          desc: "Egypt's earliest large-scale stone monument, designed by the architect Imhotep, and considered the world's oldest colossal stone building.",
          history: "Designed around 2670 BCE by the architect and polymath Imhotep, the Step Pyramid was Egypt's first major structure built almost entirely of stone rather than mudbrick, marking a revolutionary shift in ancient construction. Its distinctive stepped form evolved from a series of stacked mastaba tombs, representing an intermediate stage between earlier flat-roofed tombs and the smooth-sided pyramids that would follow at Giza a century later. Imhotep was later deified by the ancient Egyptians for his architectural genius, one of the few commoners ever to receive such an honor. The surrounding Saqqara complex includes an elaborate network of courtyards and chapels designed to serve Djoser in the afterlife.",
          tags: ["Pyramid", "Early Dynastic"],
          quickFacts: {
            built: "c. 2670 BCE",
            founder: "Pharaoh Djoser",
            style: "Early Dynastic",
            function: "Royal Tomb"
          },
          visitorInfo: {
            hours: "8:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "200 EGP"
          }
        },
        {
          name: "Red Pyramid",
          location: "Dahshur",
          fullLocation: "Dahshur, Egypt",
          reviewCount: "94",
          image: "/assets/eras/red-pyramid-main.jpg",
          thumbnails: ["/assets/eras/red-pyramid-thumb1.jpg"],
          desc: "Egypt's first successful true smooth-sided pyramid, named for the reddish hue of its limestone in sunlight.",
          history: "Built around 2600 BCE by Pharaoh Sneferu, father of Khufu, the Red Pyramid was Egypt's first successful attempt at a true, smooth-sided pyramid, following two earlier and less stable experiments at the same site. Its reddish hue, most visible at sunrise and sunset, comes from the oxidized limestone used in its core, once concealed beneath a casing of white Tura limestone that has since been stripped away. Sneferu's pioneering engineering at Dahshur directly paved the way for the pyramids at Giza, making the Red Pyramid an essential, if less famous, chapter in the story of Egypt's pyramid-building era.",
          tags: ["Pyramid", "Old Kingdom"],
          quickFacts: {
            built: "c. 2600 BCE",
            founder: "Pharaoh Sneferu",
            style: "Old Kingdom",
            function: "Royal Tomb"
          },
          visitorInfo: {
            hours: "8:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "180 EGP"
          }
        }
      ],

      temples: [
        {
          name: "Karnak Temple",
          location: "Luxor",
          fullLocation: "Luxor, Egypt",
          reviewCount: "521",
          image: "/assets/eras/karnak-main.jpg",
          thumbnails: ["/assets/eras/karnak-thumb1.jpg", "/assets/eras/karnak-thumb2.jpg"],
          desc: "The largest religious complex ever built, expanded over 2,000 years by successive pharaohs and dedicated primarily to the god Amun.",
          history: "Construction at Karnak began around 2000 BCE under Senusret I and continued for more than two thousand years, with successive pharaohs each adding their own halls, obelisks, and pylons to what became the largest religious complex ever built. Dedicated primarily to the god Amun, its Great Hypostyle Hall alone contains 134 massive columns, some over 20 meters tall, densely carved with hieroglyphic inscriptions and reliefs. Karnak served as the religious heart of ancient Thebes during the New Kingdom, when Egypt was at the height of its imperial power, and its scale was intended to reflect the immense wealth and piety of the pharaohs who built it.",
          tags: ["Temple", "New Kingdom"],
          quickFacts: {
            built: "c. 2000–100 BCE",
            founder: "Multiple pharaohs, beginning with Senusret I",
            style: "New Kingdom",
            function: "Religious Complex"
          },
          visitorInfo: {
            hours: "6:00 AM – 5:30 PM",
            bestTime: "Early morning or sunset",
            dressCode: "Modest clothing recommended",
            entryFee: "450 EGP"
          }
        },
        {
          name: "Luxor Temple",
          location: "Luxor",
          fullLocation: "Luxor, Egypt",
          reviewCount: "398",
          image: "/assets/eras/luxor-temple-main.jpg",
          thumbnails: ["/assets/eras/luxor-temple-thumb1.jpg"],
          desc: "Built largely by Amenhotep III and Ramesses II, this temple was dedicated to the rejuvenation of kingship and connected to Karnak by a grand avenue of sphinxes.",
          history: "Built primarily by Amenhotep III around 1400 BCE and later expanded by Ramesses II, Luxor Temple was dedicated not to a single god but to the concept of divine kingship itself, serving as the site where many pharaohs were believed to be ritually reborn as living gods. Unlike most Egyptian temples, it was connected to Karnak by a nearly three-kilometer avenue lined with sphinxes, used during the annual Opet Festival when statues of the gods were paraded between the two sites. Remarkably, the temple has remained in continuous use for religious purposes for over 3,400 years — a mosque built within its walls in the 13th century CE remains active today.",
          tags: ["Temple", "New Kingdom"],
          quickFacts: {
            built: "c. 1400 BCE",
            founder: "Amenhotep III",
            style: "New Kingdom",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "6:00 AM – 10:00 PM",
            bestTime: "Evening",
            dressCode: "Modest clothing recommended",
            entryFee: "260 EGP"
          }
        },
        {
          name: "Abu Simbel",
          location: "Aswan",
          fullLocation: "Aswan, Egypt",
          reviewCount: "467",
          image: "/assets/eras/abu-simbel-main.jpg",
          thumbnails: ["/assets/eras/abu-simbel-thumb1.jpg"],
          desc: "Two massive rock-cut temples built by Ramesses II, famously relocated in the 1960s to avoid flooding from the construction of the Aswan High Dam.",
          history: "Carved directly into a sandstone cliff around 1264 BCE, Abu Simbel's two temples were built by Ramesses II to project Egyptian power at its southern frontier and to honor himself and his queen, Nefertari, alongside the gods. The temple's design was so precise that twice a year, sunlight penetrates 60 meters into the mountain to illuminate statues of the gods within, an alignment believed to mark Ramesses II's birthday and coronation. In one of the 20th century's most remarkable engineering feats, the entire temple complex was cut into more than 1,000 blocks and relocated 65 meters uphill between 1964 and 1968 to save it from flooding caused by the construction of the Aswan High Dam.",
          tags: ["Temple", "New Kingdom", "UNESCO Site"],
          quickFacts: {
            built: "c. 1264 BCE",
            founder: "Pharaoh Ramesses II",
            style: "New Kingdom",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "5:00 AM – 6:00 PM",
            bestTime: "Early morning",
            dressCode: "Casual",
            entryFee: "500 EGP"
          }
        },
        {
          name: "Temple of Hatshepsut",
          location: "Luxor",
          fullLocation: "Luxor, Egypt",
          reviewCount: "245",
          image: "/assets/eras/hatshepsut-main.jpg",
          thumbnails: ["/assets/eras/hatshepsut-thumb1.jpg"],
          desc: "A mortuary temple built into the cliffs of Deir el-Bahari for Hatshepsut, one of ancient Egypt's few female pharaohs.",
          history: "Built around 1470 BCE into the cliffs of Deir el-Bahari, this mortuary temple was commissioned by Hatshepsut, one of ancient Egypt's few female pharaohs, who ruled for roughly two decades and oversaw one of the most prosperous periods of the New Kingdom. Its terraced design, unusual for its time, was intended to echo the earlier temple of Mentuhotep II nearby. After her death, her successor Thutmose III ordered many of her images and inscriptions defaced, an act historians believe was intended to erase her unconventional claim to the throne rather than simple malice. Despite this, the temple survived largely intact and remains one of the most architecturally distinctive monuments of ancient Egypt.",
          tags: ["Temple", "New Kingdom"],
          quickFacts: {
            built: "c. 1470 BCE",
            founder: "Pharaoh Hatshepsut",
            style: "New Kingdom",
            function: "Mortuary Temple"
          },
          visitorInfo: {
            hours: "6:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "140 EGP"
          }
        },
        {
          name: "Temple of Edfu",
          location: "Edfu",
          fullLocation: "Edfu, Egypt",
          reviewCount: "156",
          image: "/assets/eras/edfu-main.jpg",
          thumbnails: ["/assets/eras/edfu-thumb1.jpg"],
          desc: "One of the best-preserved temples in Egypt, dedicated to the falcon god Horus and built during the Ptolemaic period.",
          history: "Built between 237 and 57 BCE under the Ptolemaic dynasty, the Temple of Edfu is dedicated to the falcon god Horus and stands as one of the best-preserved temples anywhere in Egypt, having spent centuries buried beneath desert sand and Nile silt that protected it from erosion and later reuse as building material. Its walls are covered in extensive inscriptions recording the mythical battle between Horus and Seth, along with detailed texts on temple rituals that have proven invaluable to modern understanding of ancient Egyptian religious practice. Excavated fully only in the 1860s, its remarkable state of preservation offers one of the clearest surviving pictures of what a functioning ancient Egyptian temple once looked like.",
          tags: ["Temple", "Ptolemaic"],
          quickFacts: {
            built: "237–57 BCE",
            founder: "Ptolemy III",
            style: "Ptolemaic",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "7:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "180 EGP"
          }
        }
      ],

      museums: [
        {
          name: "Egyptian Museum",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "612",
          image: "/assets/eras/egyptian-museum-main.jpg",
          thumbnails: ["/assets/eras/egyptian-museum-thumb1.jpg"],
          desc: "Home to one of the world's largest collections of ancient Egyptian antiquities, including treasures from Tutankhamun's tomb.",
          history: "Opened in 1902 in its current neoclassical building in downtown Cairo, the Egyptian Museum was established to house and protect Egypt's growing collection of antiquities amid growing concern over artifact smuggling in the 19th century. For over a century it served as the primary home of Tutankhamun's treasures, discovered in 1922, before many were relocated to the Grand Egyptian Museum. Its collection spans the full breadth of ancient Egyptian history, from the Predynastic period through the Greco-Roman era, and it remains one of the most significant archaeological museums in the world, even as parts of its collection continue to be transferred to newer facilities.",
          tags: ["Museum", "Antiquities"],
          quickFacts: {
            built: "1902 CE",
            founder: "Egyptian government",
            style: "Neoclassical",
            function: "Museum"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "450 EGP"
          }
        },
        {
          name: "Grand Egyptian Museum",
          location: "Giza",
          fullLocation: "Giza, Egypt",
          reviewCount: "203",
          image: "/assets/eras/gem-main.jpg",
          thumbnails: ["/assets/eras/gem-thumb1.jpg"],
          desc: "The world's largest archaeological museum dedicated to a single civilization, housing the complete Tutankhamun collection.",
          history: "Conceived in the early 2000s and officially opened in 2024, the Grand Egyptian Museum was built near the Giza pyramids as the new permanent home for Egypt's most significant antiquities, consolidating and expanding on collections previously scattered across smaller institutions. It houses the complete Tutankhamun collection, displayed together for the first time since its discovery in 1922, along with a colossal statue of Ramesses II that once stood in a Cairo square. As the largest archaeological museum in the world dedicated to a single civilization, its construction was intended to mark a new chapter in how Egypt presents and preserves its ancient heritage.",
          tags: ["Museum", "Antiquities"],
          quickFacts: {
            built: "2024 CE",
            founder: "Egyptian government",
            style: "Modern",
            function: "Museum"
          },
          visitorInfo: {
            hours: "9:00 AM – 6:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "600 EGP"
          }
        },
        {
          name: "Nubian Museum",
          location: "Aswan",
          fullLocation: "Aswan, Egypt",
          reviewCount: "112",
          image: "/assets/eras/nubian-museum-main.jpg",
          thumbnails: ["/assets/eras/nubian-museum-thumb1.jpg"],
          desc: "Dedicated to the history and culture of Nubia, with artifacts rescued during the construction of the Aswan High Dam.",
          history: "Opened in 1997 in Aswan, the Nubian Museum was established as part of a UNESCO-led international effort to document and preserve Nubian culture and history following the flooding of much of Nubia's ancestral homeland by Lake Nasser after the construction of the Aswan High Dam. Its collection includes artifacts rescued during the same UNESCO campaign that relocated the temples of Abu Simbel and Philae, alongside exhibits on Nubian daily life, crafts, and oral traditions. The museum remains one of the only major institutions dedicated specifically to Nubian heritage, a civilization that flourished for thousands of years along the Nile south of Egypt.",
          tags: ["Museum", "Nubian Heritage"],
          quickFacts: {
            built: "1997 CE",
            founder: "UNESCO & Egyptian government",
            style: "Modern",
            function: "Museum"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "140 EGP"
          }
        }
      ]
    },

    markersData: [
      {
        name: "Great Pyramid of Giza",
        coords: [29.9792, 31.1342],
        city: "giza",
        category: "Pyramids",
        location: "Giza, Egypt",
        desc: "Built around 2560 BCE for Pharaoh Khufu, this was the tallest man-made structure in the world for over 3,800 years.",
        image: "/assets/eras/great-pyramid-main.jpg"
      },
      {
        name: "Karnak Temple",
        coords: [25.7188, 32.6573],
        city: "luxor",
        category: "Temples",
        location: "Luxor, Egypt",
        desc: "The largest religious complex ever built, expanded over 2,000 years by successive pharaohs and dedicated primarily to the god Amun.",
        image: "/assets/eras/karnak-main.jpg"
      },
      {
        name: "Abu Simbel",
        coords: [22.3372, 31.6258],
        city: "aswan",
        category: "Temples",
        location: "Aswan, Egypt",
        desc: "Two massive rock-cut temples built by Ramesses II, famously relocated in the 1960s to avoid flooding from the construction of the Aswan High Dam.",
        image: "/assets/eras/abu-simbel-main.jpg"
      }
    ],

    cities: [
      { key: "giza", name: "Giza", blurb: "Home to the Great Pyramids and the Sphinx", image: "/assets/eras/giza.jpg", coords: [29.9870, 31.1313] },
      { key: "luxor", name: "Luxor", blurb: "Ancient Thebes, city of temples and tombs", image: "/assets/eras/luxor.jpg", coords: [25.6872, 32.6396] },
      { key: "aswan", name: "Aswan", blurb: "Gateway to Nubia and Abu Simbel", image: "/assets/eras/aswan.jpg", coords: [24.0889, 32.8998] },
      { key: "saqqara", name: "Saqqara", blurb: "Ancient necropolis and the Step Pyramid", image: "/assets/eras/saqqara.jpg", coords: [29.8714, 31.2164] },
      { key: "alexandria", name: "Alexandria", blurb: "Founded by Alexander the Great", image: "/assets/eras/alexandria.jpg", coords: [31.2001, 29.9187] }
    ],

    timeline: {
      intro: "Explore the major kingdoms and periods that shaped Ancient Egypt.",
      points: [
        { name: "Early Dynastic", date: "3100–2686 BCE", active: true },
        { name: "Old Kingdom", date: "2686–2181 BCE", active: false },
        { name: "Middle Kingdom", date: "2055–1650 BCE", active: false },
        { name: "New Kingdom", date: "1550–1077 BCE", active: false },
        { name: "Late Period", date: "664–332 BCE", active: false }
      ]
    },

    legacy: {
      image: "/assets/eras/ancient-egypt-legacy.jpg",
      paragraphs: [
        "Ancient Egyptian civilization began around 3100 BCE, when Upper and Lower Egypt were unified under a single ruler, traditionally remembered as Narmer. This unification marked the start of a continuous line of pharaohs that would rule Egypt for close to three thousand years.",
        "During the Old Kingdom, Egypt entered what is often called the Age of Pyramids, when rulers such as Khufu commissioned the Great Pyramid of Giza as a monument to their power and a gateway to the afterlife. The Middle Kingdom that followed brought stability and a flourishing of literature and art after a period of political fragmentation.",
        "The New Kingdom marked Egypt's height as an imperial power, with pharaohs like Ramesses II and Hatshepsut expanding its influence and constructing grand temples at Karnak and Luxor. Tutankhamun's tomb, discovered nearly intact in 1922, remains one of the most significant archaeological finds in history.",
        "By the Late Period, Egypt faced repeated foreign rule, eventually falling to Alexander the Great in 332 BCE. Yet its legacy endured — its writing system, monumental architecture, and religious beliefs continue to shape our understanding of the ancient world today."
      ]
    },

    architecture: {
      image: "/assets/eras/ancient-egypt-architecture.jpg",
      paragraph: "Ancient Egyptian architecture is defined by its monumental scale and remarkable precision, built to last for eternity. Pyramids, temples, and tombs were constructed from massive limestone and granite blocks, aligned with striking astronomical accuracy. Columns carved with hieroglyphics and papyrus motifs, along with grand pylon gateways, were designed to awe visitors and honor the gods."
    },

  },

  "greco-roman": {
    slug: "greco-roman",
    name: "Greco-Roman Egypt",
    smallLabel: "THE GRECO-ROMAN ERA",
    heroImage: "/assets/hero/greco-roman-hero.jpg",
    subtitle: "From Alexander's conquest to Roman rule,<br>a fusion of Greek, Egyptian, and Roman worlds<br>centered on the great city of Alexandria.",
    timelineRange: "332 BCE – 641 CE",
    markerColor: "#2563EB", // locked spec: Greco-Roman = blue
    mapCenter: [30.8025, 29.9], // biased toward Alexandria/Mediterranean coast
    mapZoom: 6,

    overviewText: {
      heading: "Where East<br>Met West",
      paragraph: "After Alexander the Great's conquest in 332 BCE, Egypt became a meeting point of Greek, Egyptian, and later Roman cultures. Alexandria rose as one of the ancient world's greatest cities, famed for its library, lighthouse, and scholarship.",
    },

    categories: [
      {
        key: "temples",
        label: "Temples",
        image: "/assets/eras/greco-temples-category.jpg",
        blurb: "Egyptian temples built under Greek and Roman rule"
      },
      {
        key: "theaters",
        label: "Theaters",
        image: "/assets/eras/theaters-category.jpg",
        blurb: "Grand venues for performance and public life"
      },
      {
        key: "museums",
        label: "Museums",
        image: "/assets/eras/greco-museums-category.jpg",
        blurb: "Collections preserving the Greco-Roman legacy"
      }
    ],

    categoryData: {
      temples: [
        {
          name: "Temple of Philae",
          location: "Aswan",
          fullLocation: "Aswan, Egypt",
          reviewCount: "312",
          image: "/assets/eras/philae-main.jpg",
          thumbnails: ["/assets/eras/philae-thumb1.jpg"],
          desc: "Dedicated to the goddess Isis, this temple complex was relocated to Agilkia Island in the 1970s to save it from flooding by the Aswan High Dam.",
          history: "Construction at Philae began around 380 BCE under the last native Egyptian pharaohs and continued under Ptolemaic and Roman rule, making it one of the last active centers of ancient Egyptian religion, with worship of Isis continuing there until 550 CE, well after Christianity had become Egypt's dominant faith. Its survival into the modern era was threatened by the construction of the original Aswan Dam in 1902, which left the temple partially submerged for much of the year. Between 1972 and 1980, in a major UNESCO-led rescue effort, the entire complex was dismantled stone by stone and reconstructed on the nearby, higher-elevation island of Agilkia, where it stands today.",
          tags: ["Temple", "Ptolemaic", "UNESCO Site"],
          quickFacts: {
            built: "c. 380 BCE – 117 CE",
            founder: "Ptolemaic and Roman rulers",
            style: "Ptolemaic/Roman",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "7:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "300 EGP"
          }
        },
        {
          name: "Temple of Kom Ombo",
          location: "Kom Ombo",
          fullLocation: "Kom Ombo, Egypt",
          reviewCount: "245",
          image: "/assets/eras/kom-ombo-main.jpg",
          thumbnails: ["/assets/eras/kom-ombo-thumb1.jpg"],
          desc: "A unique double temple dedicated equally to the crocodile god Sobek and the falcon god Horus, built during the Ptolemaic period.",
          history: "Built between 180 and 47 BCE under Ptolemaic rule, Kom Ombo is architecturally unique among Egyptian temples for its perfectly symmetrical double design, with two parallel entrances, halls, and sanctuaries dedicated equally to the crocodile god Sobek and the falcon god Horus. Ancient Egyptians associated the surrounding region with sacred crocodiles, believed to embody Sobek, and mummified crocodiles recovered nearby are now displayed in an adjoining museum. Positioned directly on the banks of the Nile, the temple has suffered damage over the centuries from flooding and earthquakes, yet its dual layout remains remarkably legible today.",
          tags: ["Temple", "Ptolemaic"],
          quickFacts: {
            built: "180–47 BCE",
            founder: "Ptolemy VI",
            style: "Ptolemaic",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "7:00 AM – 5:00 PM",
            bestTime: "Sunset",
            dressCode: "Casual",
            entryFee: "160 EGP"
          }
        },
        {
          name: "Temple of Dendera",
          location: "Qena",
          fullLocation: "Qena, Egypt",
          reviewCount: "198",
          image: "/assets/eras/dendera-main.jpg",
          thumbnails: ["/assets/eras/dendera-thumb1.jpg"],
          desc: "One of the best-preserved temple complexes in Egypt, dedicated to the goddess Hathor, with a famous astronomical ceiling relief.",
          history: "The current temple at Dendera was built between 54 BCE and 60 CE under the late Ptolemaic and early Roman periods, though the site itself was considered sacred to the goddess Hathor for thousands of years before, with earlier structures dating back to the Old Kingdom. Its ceiling features an elaborate astronomical relief depicting the constellations and zodiac, a copy of which is now displayed in the Louvre after the original was controversially removed in the 19th century. Because it was built relatively late in Egyptian history and buried under sand for centuries afterward, Dendera survives today as one of the most completely preserved temple complexes in the country.",
          tags: ["Temple", "Ptolemaic/Roman"],
          quickFacts: {
            built: "c. 54 BCE – 60 CE",
            founder: "Ptolemaic and Roman rulers",
            style: "Ptolemaic/Roman",
            function: "Religious Temple"
          },
          visitorInfo: {
            hours: "7:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "180 EGP"
          }
        }
      ],

      theaters: [
        {
          name: "Roman Amphitheatre of Alexandria",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          reviewCount: "167",
          image: "/assets/eras/roman-theatre-main.jpg",
          thumbnails: ["/assets/eras/roman-theatre-thumb1.jpg"],
          desc: "Egypt's only surviving Roman amphitheatre, discovered in 1960, once used for performances and public gatherings in ancient Alexandria.",
          history: "Discovered by accident in 1960 during construction work, this amphitheatre is the only structure of its kind ever found in Egypt, despite Alexandria's importance as a major Roman city. Built around the 2nd century CE, its thirteen tiers of white and gray marble seating could hold several hundred spectators and were likely used for musical and theatrical performances rather than gladiatorial combat, given its relatively modest size. Excavations at the surrounding site also uncovered sections of Roman-era Alexandria's street grid and public buildings, offering rare physical evidence of daily life in one of the ancient world's greatest cities, much of which now lies buried beneath the modern one.",
          tags: ["Theater", "Roman"],
          quickFacts: {
            built: "c. 2nd century CE",
            founder: "Roman authorities of Alexandria",
            style: "Roman",
            function: "Amphitheatre"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "80 EGP"
          }
        },
        {
          name: "Kom el-Dikka",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          reviewCount: "89",
          image: "/assets/eras/kom-el-dikka-main.jpg",
          thumbnails: ["/assets/eras/kom-el-dikka-thumb1.jpg"],
          desc: "An archaeological park containing Roman-era lecture halls and villas, offering a glimpse into daily life in Roman Alexandria.",
          history: "Excavations beginning in the 1960s revealed this archaeological park to be the remains of a Roman and Byzantine-era public district, including lecture halls believed to be part of Alexandria's ancient educational institutions, possibly linked to the famed intellectual tradition established by the Library of Alexandria centuries earlier. The lecture halls, arranged in small semicircular auditoriums, are among the only physical remains of higher education from the ancient world found anywhere. The site also includes the remains of Roman-era bath houses and residential villas, offering a rare glimpse into ordinary civic and academic life in Alexandria during its centuries under Roman and later Byzantine rule.",
          tags: ["Theater", "Roman", "Archaeological Site"],
          quickFacts: {
            built: "c. 4th–7th century CE",
            founder: "Roman/Byzantine Alexandria",
            style: "Roman/Byzantine",
            function: "Public & Educational Complex"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "80 EGP"
          }
        }
      ],

      museums: [
        {
          name: "Graeco-Roman Museum",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          reviewCount: "178",
          image: "/assets/eras/graeco-roman-museum-main.jpg",
          thumbnails: ["/assets/eras/graeco-roman-museum-thumb1.jpg"],
          desc: "Home to one of the world's most important collections of art and artifacts from Egypt's Greek and Roman periods.",
          history: "Founded in 1892, the Graeco-Roman Museum was established specifically to house the growing number of Greek and Roman-era artifacts being uncovered across Alexandria as the modern city expanded over its ancient predecessor. Its collection reflects Alexandria's unique cultural position in antiquity, blending Egyptian, Greek, and Roman artistic traditions in objects ranging from coins and sculpture to mummy portraits painted in a distinctly Hellenistic style. Many of its holdings come directly from Alexandria's own soil, making it one of the primary institutions documenting the city's transformation from Alexander the Great's new capital into a major center of the Roman world.",
          tags: ["Museum", "Antiquities"],
          quickFacts: {
            built: "1892 CE",
            founder: "Egyptian government",
            style: "Neoclassical",
            function: "Museum"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "150 EGP"
          }
        },
        {
          name: "Bibliotheca Alexandrina",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          reviewCount: "356",
          image: "/assets/eras/bibliotheca-main.jpg",
          thumbnails: ["/assets/eras/bibliotheca-thumb1.jpg"],
          desc: "A modern library and museum built near the site of the ancient Library of Alexandria, commemorating its legacy as a center of learning.",
          history: "Opened in 2002, the Bibliotheca Alexandrina was built near the estimated site of the ancient Library of Alexandria, one of the most famous and consequential libraries of the ancient world, believed to have been destroyed through a combination of fires, neglect, and political upheaval over several centuries. Rather than attempting to reconstruct the original, the modern library was conceived as a deliberate act of cultural revival, an international collaboration led by UNESCO and the Egyptian government to reestablish Alexandria as a center of learning. Its striking discshaped building and adjoining museums now host millions of books alongside exhibitions on Alexandria's ancient intellectual legacy.",
          tags: ["Museum", "Library"],
          quickFacts: {
            built: "2002 CE",
            founder: "Egyptian government & UNESCO",
            style: "Modern",
            function: "Library & Museum"
          },
          visitorInfo: {
            hours: "10:00 AM – 7:00 PM",
            bestTime: "Afternoon",
            dressCode: "Casual",
            entryFee: "70 EGP"
          }
        }
      ]
    },

    markersData: [
      {
        name: "Roman Amphitheatre of Alexandria",
        coords: [31.1990, 29.9053],
        city: "alexandria",
        category: "Theaters",
        location: "Alexandria, Egypt",
        desc: "Egypt's only surviving Roman amphitheatre, discovered in 1960, once used for performances and public gatherings in ancient Alexandria.",
        image: "/assets/eras/roman-theatre-main.jpg"
      },
      {
        name: "Temple of Philae",
        coords: [24.0257, 32.8847],
        city: "aswan",
        category: "Temples",
        location: "Aswan, Egypt",
        desc: "Dedicated to the goddess Isis, this temple complex was relocated to Agilkia Island in the 1970s to save it from flooding by the Aswan High Dam.",
        image: "/assets/eras/philae-main.jpg"
      },
      {
        name: "Temple of Kom Ombo",
        coords: [24.4519, 32.9282],
        city: "kom-ombo",
        category: "Temples",
        location: "Kom Ombo, Egypt",
        desc: "A unique double temple dedicated equally to the crocodile god Sobek and the falcon god Horus, built during the Ptolemaic period.",
        image: "/assets/eras/kom-ombo-main.jpg"
      }
    ],

    cities: [
      { key: "alexandria", name: "Alexandria", blurb: "Founded by Alexander the Great, city of the Great Library", image: "/assets/eras/alexandria.jpg", coords: [31.2001, 29.9187] },
      { key: "aswan", name: "Aswan", blurb: "Home to the relocated Temple of Philae", image: "/assets/eras/aswan.jpg", coords: [24.0889, 32.8998] },
      { key: "kom-ombo", name: "Kom Ombo", blurb: "Site of the unique double temple", image: "/assets/eras/kom-ombo.jpg", coords: [24.4519, 32.9282] },
      { key: "qena", name: "Qena", blurb: "Home to the Temple of Dendera", image: "/assets/eras/qena.jpg", coords: [26.1642, 32.7267] }
    ],

    timeline: {
      intro: "Explore the major periods of Greek and Roman rule in Egypt.",
      points: [
        { name: "Alexander's Conquest", date: "332 BCE", active: true },
        { name: "Ptolemaic Kingdom", date: "305–30 BCE", active: false },
        { name: "Roman Egypt", date: "30 BCE–284 CE", active: false },
        { name: "Byzantine Egypt", date: "284–641 CE", active: false }
      ]
    },

    legacy: {
      image: "/assets/eras/greco-roman-legacy.jpg",
      paragraphs: [
        "In 332 BCE, Alexander the Great conquered Egypt, ending centuries of Persian rule and welcoming him as a liberator. He founded the city of Alexandria on the Mediterranean coast, which would become one of the ancient world's most important centers of trade, learning, and culture.",
        "After Alexander's death, his general Ptolemy took control of Egypt, founding the Ptolemaic dynasty. Under Ptolemaic rule, Alexandria flourished, home to the legendary Library of Alexandria and the Lighthouse of Alexandria, one of the Seven Wonders of the Ancient World. Greek and Egyptian traditions blended, producing a distinctive Greco-Egyptian culture.",
        "The Ptolemaic dynasty ended in 30 BCE with the defeat of Cleopatra VII and Mark Antony, after which Egypt became a province of the Roman Empire. Rome relied heavily on Egypt's grain production, and Roman emperors adopted the traditional role of pharaoh in Egyptian temples to legitimize their rule.",
        "By the late Roman period, Christianity had begun spreading widely through Egypt, setting the stage for the Coptic era that followed. Alexandria remained a major center of early Christian theology, even as the Western Roman Empire declined and Egypt came under Byzantine control."
      ]
    },

    architecture: {
      image: "/assets/eras/greco-roman-architecture.jpg",
      paragraph: "Greco-Roman architecture in Egypt blended classical Greek and Roman styles with traditional Egyptian forms. Temples continued to be built in an Egyptian style to honor local gods, while cities like Alexandria featured colonnaded streets, theaters, and monumental public buildings in the Hellenistic and Roman tradition. This fusion produced a unique visual language found nowhere else in the ancient world."
    },

    history: "The Catacombs of Kom el Shoqafa, carved into the rock beneath Alexandria in the 2nd century CE, are among the finest surviving examples of Greco-Roman funerary architecture in Egypt. Discovered by accident in 1900, the three-tiered underground necropolis blends Egyptian, Greek, and Roman artistic styles within a single space — sphinxes and Egyptian deities appear alongside Greek columns and Roman-style burial niches. The site served as a burial ground for Alexandria's mixed population for centuries, reflecting the cultural fusion that defined the city during this period."
  },

  coptic: {
    slug: "coptic",
    name: "Coptic Egypt",
    smallLabel: "THE COPTIC ERA",
    heroImage: "/assets/hero/coptic-hero.jpg",
    subtitle: "From the arrival of Christianity to the desert monasteries,<br>a faith that took root along the Nile<br>and shaped Egypt's spiritual identity.",
    timelineRange: "42 CE – 641 CE",
    markerColor: "#7C3AED", // locked spec: Coptic = purple
    mapCenter: [27.5, 30.8],
    mapZoom: 6,

    overviewText: {
      heading: "Egypt's Christian<br>Heritage",
      paragraph: "According to tradition, Christianity arrived in Egypt with Saint Mark in 42 CE. Over the following centuries, it grew into one of the world's oldest Christian traditions, giving rise to monasticism, distinctive art, and churches that still stand today.",
    },

    categories: [
      {
        key: "churches",
        label: "Churches",
        image: "/assets/eras/churches-category.jpg",
        blurb: "Ancient places of Coptic Christian worship"
      },
      {
        key: "monasteries",
        label: "Monasteries",
        image: "/assets/eras/monasteries-category.jpg",
        blurb: "Desert communities of early Christian monks"
      },
      {
        key: "museums",
        label: "Museums",
        image: "/assets/eras/coptic-museums-category.jpg",
        blurb: "Preserving Egypt's Coptic Christian heritage"
      }
    ],

    categoryData: {
      churches: [
        {
          name: "Hanging Church",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          reviewCount: "289",
          image: "/assets/eras/hanging-church-main.jpg",
          thumbnails: ["/assets/eras/hanging-church-thumb1.jpg"],
          desc: "One of the oldest Coptic churches in Egypt, built above the gatehouse of the Roman Babylon Fortress and reached by a flight of steps.",
          history: "Built in the 3rd or 4th century CE above the gatehouse of the Roman Babylon Fortress, the Hanging Church gets its name from its unusual position suspended over the fortress's ruins, reached by a flight of steps rather than sitting at ground level. It served as the official residence of the Coptic Patriarch for extended periods between the 11th and 14th centuries, making it one of the most historically significant churches in the Coptic Orthodox tradition. Over the centuries it has been rebuilt and restored many times, yet it has remained in continuous use as a place of worship for over 1,600 years, and its interior still houses finely carved wooden screens and icons dating back centuries.",
          tags: ["Church", "Coptic Orthodox"],
          quickFacts: {
            built: "3rd–4th century CE",
            founder: "Early Coptic community",
            style: "Coptic Basilica",
            function: "Church"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Church of Saint Sergius and Bacchus",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          reviewCount: "156",
          image: "/assets/eras/abu-serga-main.jpg",
          thumbnails: ["/assets/eras/abu-serga-thumb1.jpg"],
          desc: "Traditionally believed to be built over a cave where the Holy Family sheltered during their flight into Egypt, this is one of Cairo's oldest churches.",
          history: "Built in the 4th or 5th century CE, this church is traditionally believed to stand above a cave where the Holy Family sheltered during their flight into Egypt to escape King Herod, a tradition that has made it one of the most visited pilgrimage sites in Coptic Cairo. Also known as Abu Serga, it is considered one of the oldest churches in Egypt still in active use, and it was here, according to tradition, that early Coptic patriarchs were once elected. The crypt beneath the main church, associated with the Holy Family's stay, remains accessible to visitors and pilgrims today, though it has been affected by rising groundwater over the centuries.",
          tags: ["Church", "Coptic Orthodox"],
          quickFacts: {
            built: "4th–5th century CE",
            founder: "Early Coptic community",
            style: "Coptic Basilica",
            function: "Church"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Church of Saint Barbara",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          reviewCount: "98",
          image: "/assets/eras/saint-barbara-main.jpg",
          thumbnails: ["/assets/eras/saint-barbara-thumb1.jpg"],
          desc: "A well-preserved Coptic church housing the relics of Saint Barbara, featuring finely carved wooden iconostasis screens.",
          history: "Dating to the 5th century CE, the Church of Saint Barbara was built to house the relics of Saint Barbara, an early Christian martyr venerated for her steadfast faith in the face of persecution under Roman rule. Located within the same historic complex as several of Coptic Cairo's oldest churches, it reflects the dense concentration of early Christian heritage that developed around the old Roman fortress of Babylon. Its interior retains elaborately carved wooden iconostasis screens inlaid with ivory, a hallmark of Coptic ecclesiastical craftsmanship, and the church remains an active place of worship within Cairo's Coptic community today.",
          tags: ["Church", "Coptic Orthodox"],
          quickFacts: {
            built: "5th century CE",
            founder: "Early Coptic community",
            style: "Coptic Basilica",
            function: "Church"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        }
      ],

      monasteries: [
        {
          name: "Monastery of Saint Anthony",
          location: "Red Sea",
          fullLocation: "Red Sea Governorate, Egypt",
          reviewCount: "134",
          image: "/assets/eras/st-anthony-main.jpg",
          thumbnails: ["/assets/eras/st-anthony-thumb1.jpg"],
          desc: "Considered the oldest active Christian monastery in the world, founded by followers of Saint Anthony, the father of Christian monasticism.",
          history: "Founded in the 4th century CE by followers of Saint Anthony, widely regarded as the father of Christian monasticism, this remote desert monastery is considered the oldest continuously inhabited Christian monastery in the world. Saint Anthony himself withdrew into the Egyptian desert around 270 CE seeking solitude, and the community that formed around his teachings became the model for monastic life that would later spread across the Christian world, from Europe to Ethiopia. Despite repeated raids and periods of hardship over the centuries, the monastery has never been permanently abandoned, and monks continue to live and pray there today, much as they have for over 1,600 years.",
          tags: ["Monastery", "Coptic Orthodox"],
          quickFacts: {
            built: "4th century CE",
            founder: "Followers of Saint Anthony",
            style: "Coptic Monastic",
            function: "Monastery"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Monastery of Saint Catherine",
          location: "Sinai",
          fullLocation: "South Sinai, Egypt",
          reviewCount: "267",
          image: "/assets/eras/st-catherine-main.jpg",
          thumbnails: ["/assets/eras/st-catherine-thumb1.jpg"],
          desc: "Built at the foot of Mount Sinai, this is one of the oldest working Christian monasteries in the world, home to an important collection of ancient manuscripts and icons.",
          history: "Built in the 6th century CE by order of the Byzantine Emperor Justinian I, the Monastery of Saint Catherine sits at the base of Mount Sinai, traditionally identified as the site where Moses received the Ten Commandments. Its fortified walls have protected it from destruction for nearly 1,500 years, making it one of the oldest continuously functioning monasteries anywhere in the world. The monastery's library holds one of the most significant collections of ancient manuscripts outside the Vatican, including early biblical texts, and its unique protected status has been respected across centuries of changing rulers, including an edict of protection historically attributed to the Prophet Muhammad himself.",
          tags: ["Monastery", "UNESCO Site"],
          quickFacts: {
            built: "6th century CE",
            founder: "Emperor Justinian I",
            style: "Byzantine/Coptic",
            function: "Monastery"
          },
          visitorInfo: {
            hours: "9:00 AM – 12:00 PM",
            bestTime: "Early morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "White Monastery",
          location: "Sohag",
          fullLocation: "Sohag, Egypt",
          reviewCount: "76",
          image: "/assets/eras/white-monastery-main.jpg",
          thumbnails: ["/assets/eras/white-monastery-thumb1.jpg"],
          desc: "Founded by Saint Shenouda, this monastery once housed one of the largest monastic communities in ancient Egypt, built with striking white limestone walls.",
          history: "Founded in the 4th century CE by Saint Shenouda the Archimandrite, the White Monastery once housed one of the largest and most influential monastic communities in early Christian Egypt, reportedly home to thousands of monks and nuns at its peak. Shenouda was renowned for his strict monastic rule and his fierce theological writings, which helped shape Coptic Christian identity in its formative centuries. Built from bright white limestone salvaged partly from earlier Pharaonic temples, the monastery's massive fortress-like walls reflect the turbulent times in which it was constructed, when Christian communities in Egypt's desert regions faced periodic threats from raiders.",
          tags: ["Monastery", "Coptic Orthodox"],
          quickFacts: {
            built: "4th century CE",
            founder: "Saint Shenouda",
            style: "Coptic Monastic",
            function: "Monastery"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        }
      ],

      museums: [
        {
          name: "Coptic Museum",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          reviewCount: "203",
          image: "/assets/eras/coptic-museum-main.jpg",
          thumbnails: ["/assets/eras/coptic-museum-thumb1.jpg"],
          desc: "Home to the world's largest collection of Coptic Christian artifacts, including textiles, manuscripts, and religious icons.",
          history: "Founded in 1908 by Marcus Simaika, a Coptic Christian civil servant concerned that Egypt's Christian heritage was being overlooked in favor of its Pharaonic and Islamic history, the Coptic Museum was built adjacent to the historic churches of Old Cairo. Simaika personally campaigned to gather artifacts from churches and monasteries across Egypt that were at risk of being lost, neglected, or sold abroad, assembling what would become the world's largest collection of Coptic Christian art and artifacts. Its building blends Islamic and Coptic architectural styles, reflecting the shared heritage of Old Cairo, and today it remains the primary institution documenting nearly two thousand years of Egyptian Christian history.",
          tags: ["Museum", "Coptic Heritage"],
          quickFacts: {
            built: "1908 CE",
            founder: "Marcus Simaika",
            style: "Neo-Islamic/Coptic",
            function: "Museum"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "100 EGP"
          }
        }
      ]
    },

    markersData: [
      {
        name: "Hanging Church",
        coords: [30.0056, 31.2303],
        city: "old-cairo",
        category: "Churches",
        location: "Old Cairo, Egypt",
        desc: "One of the oldest Coptic churches in Egypt, built above the gatehouse of the Roman Babylon Fortress and reached by a flight of steps.",
        image: "/assets/eras/hanging-church-main.jpg"
      },
      {
        name: "Monastery of Saint Anthony",
        coords: [28.9358, 32.3583],
        city: "red-sea",
        category: "Monasteries",
        location: "Red Sea Governorate, Egypt",
        desc: "Considered the oldest active Christian monastery in the world, founded by followers of Saint Anthony, the father of Christian monasticism.",
        image: "/assets/eras/st-anthony-main.jpg"
      },
      {
        name: "Monastery of Saint Catherine",
        coords: [28.5561, 33.9762],
        city: "sinai",
        category: "Monasteries",
        location: "South Sinai, Egypt",
        desc: "Built at the foot of Mount Sinai, this is one of the oldest working Christian monasteries in the world, home to an important collection of ancient manuscripts and icons.",
        image: "/assets/eras/st-catherine-main.jpg"
      }
    ],

    cities: [
      { key: "old-cairo", name: "Old Cairo", blurb: "Coptic Cairo, home to ancient churches", image: "/assets/eras/old-cairo.jpg", coords: [30.0056, 31.2303] },
      { key: "sohag", name: "Sohag", blurb: "Home to the White Monastery", image: "/assets/eras/sohag.jpg", coords: [26.5569, 31.6948] },
      { key: "red-sea", name: "Red Sea", blurb: "Desert home of Saint Anthony's Monastery", image: "/assets/eras/red-sea.jpg", coords: [28.9358, 32.3583] },
      { key: "sinai", name: "Sinai", blurb: "Site of Saint Catherine's Monastery", image: "/assets/eras/sinai.jpg", coords: [28.5561, 33.9762] }
    ],

    timeline: {
      intro: "Explore the key periods of Christianity's rise in Egypt.",
      points: [
        { name: "Apostolic Age", date: "42–284 CE", active: true },
        { name: "Age of Persecution", date: "284–313 CE", active: false },
        { name: "Christian Egypt", date: "313–451 CE", active: false },
        { name: "Coptic Orthodox Era", date: "451–641 CE", active: false }
      ]
    },

    legacy: {
      image: "/assets/eras/coptic-legacy.jpg",
      paragraphs: [
        "Christianity is traditionally believed to have arrived in Egypt around 42 CE, brought by Saint Mark the Evangelist to Alexandria. Despite periods of Roman persecution, the faith spread steadily, and by the 3rd and 4th centuries CE, Egypt had become a major center of Christian thought and theology.",
        "Egypt is widely regarded as the birthplace of Christian monasticism. Figures such as Saint Anthony and Saint Pachomius established the first monastic communities in the Egyptian desert during the 3rd and 4th centuries, a model that would later spread throughout the Christian world.",
        "In 451 CE, the Council of Chalcedon led to a theological split between the Coptic Orthodox Church and the wider Byzantine church, giving Egyptian Christianity a distinct identity that persists to this day. The Coptic language, descended from ancient Egyptian, became the liturgical language of the church.",
        "Coptic Egypt's legacy endures through its churches, monasteries, and manuscripts, many of which remain active religious sites today. The Coptic Orthodox Church remains one of the oldest continuously practiced Christian traditions in the world."
      ]
    },

    architecture: {
      image: "/assets/eras/coptic-architecture.jpg",
      paragraph: "Coptic architecture blended late Roman building techniques with distinctly Egyptian and early Christian artistic traditions. Churches were often built with basilica-style layouts, featuring domes, carved wooden screens, and walls decorated with frescoes depicting saints and biblical scenes. Monasteries were typically fortified complexes, built to be self-sufficient and defensible in Egypt's remote desert regions."
    },
  },

  "modern-egypt": {
    slug: "modern-egypt",
    name: "Modern Egypt",
    smallLabel: "THE MODERN ERA",
    heroImage: "/assets/hero/modern-egypt-hero.jpg",
    subtitle: "From Belle Époque palaces to a rising new capital,<br>a nation building forward<br>while carrying its history with it.",
    timelineRange: "1798 CE – Present",
    markerColor: "#64748B", // locked spec: Modern Egypt = gray
    mapCenter: [30.0444, 31.2357],
    mapZoom: 6,

    overviewText: {
      heading: "A Nation<br>Looking Forward",
      paragraph: "From Muhammad Ali's 19th-century modernization to today's futuristic New Administrative Capital, Modern Egypt tells the story of a country continually redefining itself — through royal palaces, contemporary art, and visionary urban ambition.",
    },

    categories: [
      {
        key: "royal-estates",
        label: "Royal Estates & Landmarks",
        image: "/assets/eras/royal-estates-category.jpg",
        blurb: "Aristocratic palaces and icons of 19th–20th century Egypt"
      },
      {
        key: "contemporary-art",
        label: "Contemporary Art & Culture",
        image: "/assets/eras/contemporary-art-category.jpg",
        blurb: "Curated, creative, and monumental modern spaces"
      },
      {
        key: "modern-horizons",
        label: "Modern Horizons & Leisure",
        image: "/assets/eras/modern-horizons-category.jpg",
        blurb: "Visionary skylines and luxury lifestyle destinations"
      }
    ],

    categoryData: {
      "royal-estates": [
        {
          name: "Abdeen Palace",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          reviewCount: "231",
          image: "/assets/eras/abdeen-palace-main.jpg",
          thumbnails: ["/assets/eras/abdeen-palace-thumb1.jpg"],
          desc: "Completed in 1874 under Khedive Ismail, this grand European-style palace served as Egypt's seat of royal power for nearly a century.",
          history: "Completed in 1874 under Khedive Ismail, Abdeen Palace was built to replace the Cairo Citadel as Egypt's seat of royal power, reflecting Ismail's ambition to position Egypt as a modern, European-facing nation. Designed with heavy French and Italian architectural influence, it became the primary residence of Egypt's rulers for nearly eight decades. It was here, in 1952, that King Farouk signed his abdication following the Free Officers Revolution, bringing an end to Egypt's monarchy and marking one of the most consequential moments in the country's 20th-century history. Portions of the palace remain in ceremonial presidential use today, while others have been converted into public museums.",
          tags: ["Palace", "Royal Residence"],
          quickFacts: {
            built: "1874 CE",
            founder: "Khedive Ismail",
            style: "European Neoclassical",
            function: "Former Royal Palace"
          },
          visitorInfo: {
            hours: "9:00 AM – 3:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "100 EGP"
          }
        },
        {
          name: "Baron Empain Palace",
          location: "Cairo",
          fullLocation: "Heliopolis, Cairo, Egypt",
          reviewCount: "312",
          image: "/assets/eras/baron-palace-main.jpg",
          thumbnails: ["/assets/eras/baron-palace-thumb1.jpg"],
          desc: "Built by Belgian industrialist Édouard Empain, this Hindu-inspired palace is one of Cairo's most striking architectural landmarks.",
          history: "Built in 1911 by Belgian industrialist and railway magnate Édouard Empain, this striking Hindu-inspired palace was constructed as part of Empain's broader project to develop Heliopolis, a planned suburb intended as a modern garden city on Cairo's desert outskirts. Its unconventional design, drawing on Cambodian and Indian temple architecture, made it an object of local legend for decades, with rumors and ghost stories accumulating after it fell into disrepair following Empain's death. Left abandoned for much of the late 20th century, the palace was fully restored by the Egyptian government and reopened to the public in 2020, reclaiming its status as one of Cairo's most distinctive architectural landmarks.",
          tags: ["Palace", "Hindu-Inspired Architecture"],
          quickFacts: {
            built: "1911 CE",
            founder: "Édouard Empain",
            style: "Hindu/Khmer Revival",
            function: "Former Private Residence"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Late afternoon",
            dressCode: "Casual",
            entryFee: "50 EGP"
          }
        },
        {
          name: "Manial Palace",
          location: "Cairo",
          fullLocation: "Rhoda Island, Cairo, Egypt",
          reviewCount: "178",
          image: "/assets/eras/manial-palace-main.jpg",
          thumbnails: ["/assets/eras/manial-palace-thumb1.jpg"],
          desc: "A palace complex built for Prince Muhammad Ali Tewfik, blending Ottoman, Moorish, and Persian architectural styles across landscaped gardens.",
          history: "Built between 1899 and 1929 for Prince Muhammad Ali Tewfik, a member of Egypt's royal family known for his passion for architecture and collecting, Manial Palace was designed as a showcase of Islamic art and architectural styles drawn from across the Ottoman world, blending Ottoman, Moorish, Persian, and Andalusian influences across its various pavilions. The prince personally oversaw much of its design, filling it with an extensive collection of Islamic art, manuscripts, and decorative objects rather than following the more European tastes common among Egyptian royalty at the time. After the 1952 revolution, the palace and its grounds were nationalized and later opened to the public as a museum.",
          tags: ["Palace", "Royal Residence"],
          quickFacts: {
            built: "1899–1929 CE",
            founder: "Prince Muhammad Ali Tewfik",
            style: "Ottoman/Moorish Revival",
            function: "Former Royal Residence"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "100 EGP"
          }
        },
        {
          name: "Cairo Tower",
          location: "Cairo",
          fullLocation: "Zamalek, Cairo, Egypt",
          reviewCount: "402",
          image: "/assets/eras/cairo-tower-main.jpg",
          thumbnails: ["/assets/eras/cairo-tower-thumb1.jpg"],
          desc: "A lattice tower rising above the Nile, completed in 1961 and long considered a defining symbol of modern Cairo's skyline.",
          history: "Completed in 1961, Cairo Tower was built during a period of intense Egyptian national pride following the 1952 revolution and the country's growing assertion of independence on the world stage. Popular legend holds that its construction was partly funded using money the CIA had allegedly attempted to use to bribe Egyptian President Gamal Abdel Nasser, a story that, whether entirely accurate or embellished over time, became part of the tower's cultural mythology. Standing 187 meters tall on Gezira Island, its lattice design was inspired by the shape of a lotus plant, a motif drawn from ancient Egyptian art, deliberately linking the country's modern ambitions to its Pharaonic past.",
          tags: ["Landmark", "Observation Tower"],
          quickFacts: {
            built: "1961 CE",
            founder: "Egyptian government",
            style: "Modernist",
            function: "Observation Tower"
          },
          visitorInfo: {
            hours: "9:00 AM – 12:00 AM",
            bestTime: "Sunset",
            dressCode: "Casual",
            entryFee: "220 EGP"
          }
        }
      ],

      "contemporary-art": [
        {
          name: "Museum of Modern Egyptian Art",
          location: "Cairo",
          fullLocation: "Gezira, Cairo, Egypt",
          reviewCount: "145",
          image: "/assets/eras/modern-art-museum-main.jpg",
          thumbnails: ["/assets/eras/modern-art-museum-thumb1.jpg"],
          desc: "Showcasing Egyptian art from the 19th century to today, this museum traces the evolution of modern Egyptian painting and sculpture.",
          history: "Established in 1931 and relocated to its current Gezira location in the 1990s, the Museum of Modern Egyptian Art was founded to document Egypt's artistic development from the 19th century onward, a period when Egyptian painters and sculptors began engaging with both European artistic movements and questions of national identity following centuries of Ottoman rule. Its collection traces the evolution of Egyptian modern art through colonial-era influences, the nationalist fervor of the mid-20th century, and the diverse contemporary art scene that followed. The museum remains one of the primary institutions preserving and exhibiting Egypt's modern artistic legacy, distinct from the country's more widely known ancient antiquities.",
          tags: ["Museum", "Modern Art"],
          quickFacts: {
            built: "1931 CE",
            founder: "Egyptian government",
            style: "Modernist",
            function: "Art Museum"
          },
          visitorInfo: {
            hours: "10:00 AM – 5:00 PM",
            bestTime: "Afternoon",
            dressCode: "Casual",
            entryFee: "60 EGP"
          }
        },
        {
          name: "Cairo Opera House",
          location: "Cairo",
          fullLocation: "Gezira, Cairo, Egypt",
          reviewCount: "268",
          image: "/assets/eras/cairo-opera-main.jpg",
          thumbnails: ["/assets/eras/cairo-opera-thumb1.jpg"],
          desc: "Egypt's premier performing arts venue, built with Japanese support after the original Khedivial Opera House was lost to fire.",
          history: "The current Cairo Opera House was built with Japanese government support and opened in 1988, replacing the original 19th-century Khedivial Opera House, which had been built in 1869 to celebrate the opening of the Suez Canal and was tragically destroyed by fire in 1971. Its modern design deliberately incorporates Islamic architectural motifs alongside contemporary elements, symbolizing a bridge between Egypt's heritage and its cultural ambitions on the world stage. Since opening, it has served as Egypt's premier venue for opera, ballet, and orchestral performance, hosting both major international productions and homegrown Egyptian artistic works.",
          tags: ["Culture", "Performance Venue"],
          quickFacts: {
            built: "1988 CE",
            founder: "Egyptian & Japanese governments",
            style: "Modern/Islamic Fusion",
            function: "Opera House & Cultural Center"
          },
          visitorInfo: {
            hours: "Show times vary",
            bestTime: "Evening",
            dressCode: "Smart casual",
            entryFee: "Varies by performance"
          }
        },
        {
          name: "Zamalek Art District",
          location: "Cairo",
          fullLocation: "Zamalek, Cairo, Egypt",
          reviewCount: "112",
          image: "/assets/eras/zamalek-art-main.jpg",
          thumbnails: ["/assets/eras/zamalek-art-thumb1.jpg"],
          desc: "A cluster of contemporary art galleries on Cairo's Zamalek island, showcasing leading modern Egyptian and regional artists.",
          history: "Zamalek's identity as an art hub developed gradually from the 1990s onward, as the affluent Nile island's colonial-era villas and quiet streets attracted a growing concentration of independent galleries showcasing contemporary Egyptian and regional artists. Unlike Egypt's older state-run cultural institutions, these galleries emerged largely through private initiative, reflecting a new generation of Egyptian artists and collectors engaging with global contemporary art movements. The district's proximity to Cairo's diplomatic and expatriate communities also helped establish it as a crossroads between Egyptian and international contemporary art audiences, a role it continues to play today.",
          tags: ["Culture", "Art Galleries"],
          quickFacts: {
            built: "Ongoing since the 1990s",
            founder: "Independent gallery owners",
            style: "Contemporary",
            function: "Gallery District"
          },
          visitorInfo: {
            hours: "11:00 AM – 8:00 PM",
            bestTime: "Afternoon",
            dressCode: "Casual",
            entryFee: "Free (varies by gallery)"
          }
        },
        {
          name: "Arts and Culture City",
          location: "New Capital",
          fullLocation: "New Administrative Capital, Egypt",
          reviewCount: "89",
          image: "/assets/eras/arts-culture-city-main.jpg",
          thumbnails: ["/assets/eras/arts-culture-city-thumb1.jpg"],
          desc: "A vast new cultural district in Egypt's New Administrative Capital, home to a grand Opera House and the Capital Museum.",
          history: "Developed in the 2020s as part of Egypt's New Administrative Capital project, Arts and Culture City was conceived as a purpose-built cultural district intended to give Egypt's contemporary arts institutions — including a new Opera House and the Capital Museum — a home reflecting the country's forward-looking ambitions. Its creation reflects a broader strategy of building major new cultural and civic infrastructure outside of Cairo's historic center, aiming to relieve pressure on the older city while establishing new landmarks for the 21st century. As one of the newest cultural districts in Egypt, it represents an ongoing chapter in the country's long history of monumental construction, several thousand years after the first pyramids were built.",
          tags: ["Culture", "New Capital"],
          quickFacts: {
            built: "2020s CE",
            founder: "Egyptian government",
            style: "Contemporary",
            function: "Cultural District"
          },
          visitorInfo: {
            hours: "10:00 AM – 10:00 PM",
            bestTime: "Evening",
            dressCode: "Smart casual",
            entryFee: "Varies by venue"
          }
        }
      ],

      "modern-horizons": [
        {
          name: "Iconic Tower",
          location: "New Capital",
          fullLocation: "New Administrative Capital, Egypt",
          reviewCount: "203",
          image: "/assets/eras/iconic-tower-main.jpg",
          thumbnails: ["/assets/eras/iconic-tower-thumb1.jpg"],
          desc: "Standing 394 meters tall, this is currently Africa's tallest skyscraper, anchoring the skyline of Egypt's New Administrative Capital.",
          history: "Completed in 2023, the Iconic Tower rises 394 meters above Egypt's New Administrative Capital, currently making it the tallest building in Africa. Its construction is part of a sweeping national initiative to build an entirely new capital city east of Cairo, intended to relieve congestion in the historic city and symbolize Egypt's ambitions for the 21st century. The tower's design and rapid construction reflect a broader pattern in Gulf and North African urban development, where supertall towers are often built as much for national prestige as for practical use, joining a wave of similar mega-projects reshaping skylines across the region.",
          tags: ["Skyscraper", "New Capital"],
          quickFacts: {
            built: "2023 CE",
            founder: "Egyptian government",
            style: "Contemporary",
            function: "Mixed-Use Tower"
          },
          visitorInfo: {
            hours: "Observation deck hours vary",
            bestTime: "Evening",
            dressCode: "Casual",
            entryFee: "Varies"
          }
        },
        {
          name: "District 5",
          location: "New Capital",
          fullLocation: "New Administrative Capital, Egypt",
          reviewCount: "97",
          image: "/assets/eras/district-5-main.jpg",
          thumbnails: ["/assets/eras/district-5-thumb1.jpg"],
          desc: "A premium mixed-use lifestyle destination in the New Capital, combining retail, dining, and entertainment in a modern setting.",
          history: "Developed in the 2020s as part of the broader New Administrative Capital project, District 5 was designed as a mixed-use lifestyle destination intended to give the fledgling capital an immediate sense of vibrancy and modern urban life, combining retail, dining, and public space in a single walkable district. Its development reflects a deliberate strategy by planners to attract residents and visitors to the new capital in its early years, before the surrounding government and residential districts were fully built out. As one of the New Capital's first fully operational public destinations, it has served as an early test case for how the broader city might eventually function.",
          tags: ["Lifestyle Hub", "New Capital"],
          quickFacts: {
            built: "2020s CE",
            founder: "Private development",
            style: "Contemporary",
            function: "Lifestyle & Retail Hub"
          },
          visitorInfo: {
            hours: "10:00 AM – 12:00 AM",
            bestTime: "Evening",
            dressCode: "Casual",
            entryFee: "Free entry"
          }
        },
        {
          name: "Mall of Egypt",
          location: "6th of October City",
          fullLocation: "6th of October City, Egypt",
          reviewCount: "356",
          image: "/assets/eras/mall-of-egypt-main.jpg",
          thumbnails: ["/assets/eras/mall-of-egypt-thumb1.jpg"],
          desc: "One of Egypt's largest shopping and entertainment complexes, featuring an indoor ski slope alongside retail and dining.",
          history: "Opened in 2016 by the Majid Al Futtaim Group, Mall of Egypt was built in the rapidly developing 6th of October City on Cairo's western outskirts, an area that grew substantially in the 2010s as new residential communities expanded away from the historic city center. Its most distinctive feature, an indoor ski slope using real snow, was a deliberate statement piece, part of a broader trend among Gulf and Egyptian developers building large-scale entertainment complexes designed to be destinations in their own right rather than simple shopping centers. Its success helped establish 6th of October City as a major commercial hub for western Cairo.",
          tags: ["Mall", "Entertainment"],
          quickFacts: {
            built: "2016 CE",
            founder: "Majid Al Futtaim",
            style: "Contemporary",
            function: "Shopping & Entertainment Complex"
          },
          visitorInfo: {
            hours: "10:00 AM – 12:00 AM",
            bestTime: "Evening",
            dressCode: "Casual",
            entryFee: "Free entry"
          }
        },
        {
          name: "City Stars",
          location: "Cairo",
          fullLocation: "Nasr City, Cairo, Egypt",
          reviewCount: "489",
          image: "/assets/eras/city-stars-main.jpg",
          thumbnails: ["/assets/eras/city-stars-thumb1.jpg"],
          desc: "One of the largest malls in the Middle East, combining retail, hotels, and entertainment in a single sprawling complex.",
          history: "Opened in 2004 in Nasr City, City Stars was among the first mega-malls built in Egypt, combining retail, hotels, and entertainment on a scale not previously seen in the Egyptian market. Its development reflected Egypt's economic liberalization policies of the early 2000s, which encouraged large-scale private investment in commercial real estate. At the time of its opening, it was among the largest shopping and entertainment complexes in the Middle East, and it helped establish Nasr City as a major commercial district, setting a template that later influenced the design of subsequent mega-malls built across greater Cairo in the following two decades.",
          tags: ["Mall", "Entertainment"],
          quickFacts: {
            built: "2004 CE",
            founder: "Al-Futtaim Group",
            style: "Contemporary",
            function: "Shopping & Entertainment Complex"
          },
          visitorInfo: {
            hours: "10:00 AM – 12:00 AM",
            bestTime: "Evening",
            dressCode: "Casual",
            entryFee: "Free entry"
          }
        },
        {
          name: "Arkan Mall",
          location: "Sheikh Zayed",
          fullLocation: "Sheikh Zayed City, Egypt",
          reviewCount: "134",
          image: "/assets/eras/arkan-mall-main.jpg",
          thumbnails: ["/assets/eras/arkan-mall-thumb1.jpg"],
          desc: "An open-air lifestyle mall in Sheikh Zayed City, popular for its mix of retail, cafes, and outdoor plazas.",
          history: "Opened in 2019 in Sheikh Zayed City, Arkan Mall was developed as part of the broader growth of Cairo's western satellite cities, which expanded rapidly through the 2010s as new gated communities and suburbs drew residents away from the older, denser parts of the capital. Unlike Cairo's earlier generation of enclosed mega-malls, Arkan was designed as an open-air lifestyle destination, reflecting a shift in Egyptian retail development toward more pedestrian-friendly, plaza-style commercial spaces. Its popularity helped cement Sheikh Zayed's reputation as one of Greater Cairo's fastest-growing and most affluent suburban districts.",
          tags: ["Mall", "Lifestyle"],
          quickFacts: {
            built: "2019 CE",
            founder: "Private development",
            style: "Contemporary",
            function: "Retail & Lifestyle Center"
          },
          visitorInfo: {
            hours: "10:00 AM – 11:00 PM",
            bestTime: "Evening",
            dressCode: "Casual",
            entryFee: "Free entry"
          }
        },
        {
          name: "New Alamein City",
          location: "North Coast",
          fullLocation: "El Alamein, Egypt",
          reviewCount: "212",
          image: "/assets/eras/new-alamein-main.jpg",
          thumbnails: ["/assets/eras/new-alamein-thumb1.jpg"],
          desc: "A newly developed coastal city along Egypt's Mediterranean North Coast, featuring luxury resorts, marinas, and beachfront towers.",
          history: "Development of New Alamein City began in earnest around 2018 as part of Egypt's broader push to create new urban centers along the Mediterranean coast, aiming to transform a historically seasonal resort area into a year-round city with permanent residential, commercial, and tourism infrastructure. The project sits near the site of the pivotal Second Battle of El Alamein, a major turning point of World War II, giving the area historical as well as commercial significance. Its rapid construction of towers, marinas, and resorts reflects Egypt's wider strategy of building new coastal and desert cities to accommodate a growing population and diversify the country's tourism economy beyond its historic Nile Valley sites.",
          tags: ["Coastal City", "Resort"],
          quickFacts: {
            built: "2018 CE–ongoing",
            founder: "Egyptian government",
            style: "Contemporary Coastal",
            function: "Resort City"
          },
          visitorInfo: {
            hours: "Open year-round",
            bestTime: "Summer",
            dressCode: "Casual/resort wear",
            entryFee: "Free to visit"
          }
        },
        {
          name: "Cairo Monorail",
          location: "New Capital",
          fullLocation: "Greater Cairo, Egypt",
          reviewCount: "167",
          image: "/assets/eras/monorail-main.jpg",
          thumbnails: ["/assets/eras/monorail-thumb1.jpg"],
          desc: "One of the world's longest monorail systems, connecting Greater Cairo to the New Administrative Capital and 6th of October City.",
          history: "Construction on the Cairo Monorail began in 2019 and the system entered service in 2022, built to connect central Cairo with the New Administrative Capital and 6th of October City, two rapidly growing satellite developments not well served by the city's existing metro network. At approximately 96 kilometers combined across its two lines, it ranks among the longest monorail systems in the world, reflecting the scale of Egypt's ongoing investment in transportation infrastructure to support its expanding urban footprint. Its construction was part of a broader wave of major infrastructure projects undertaken alongside the New Administrative Capital, intended to physically and symbolically link Egypt's historic capital to its planned future one.",
          tags: ["Infrastructure", "Transit"],
          quickFacts: {
            built: "2022 CE",
            founder: "Egyptian government",
            style: "Modern Infrastructure",
            function: "Public Transit System"
          },
          visitorInfo: {
            hours: "5:30 AM – 12:00 AM",
            bestTime: "Anytime",
            dressCode: "Casual",
            entryFee: "Standard fare applies"
          }
        }
      ]
    },

    markersData: [
      {
        name: "Cairo Tower",
        coords: [30.0459, 31.2243],
        city: "cairo",
        category: "Royal Estates & Landmarks",
        location: "Zamalek, Cairo, Egypt",
        desc: "A lattice tower rising above the Nile, completed in 1961 and long considered a defining symbol of modern Cairo's skyline.",
        image: "/assets/eras/cairo-tower-main.jpg"
      },
      {
        name: "Cairo Opera House",
        coords: [30.0433, 31.2243],
        city: "cairo",
        category: "Contemporary Art & Culture",
        location: "Gezira, Cairo, Egypt",
        desc: "Egypt's premier performing arts venue, built with Japanese support after the original Khedivial Opera House was lost to fire.",
        image: "/assets/eras/cairo-opera-main.jpg"
      },
      {
        name: "Iconic Tower",
        coords: [30.0138, 31.7359],
        city: "new-capital",
        category: "Modern Horizons & Leisure",
        location: "New Administrative Capital, Egypt",
        desc: "Standing 394 meters tall, this is currently Africa's tallest skyscraper, anchoring the skyline of Egypt's New Administrative Capital.",
        image: "/assets/eras/iconic-tower-main.jpg"
      },
      {
        name: "New Alamein City",
        coords: [30.8325, 28.9540],
        city: "north-coast",
        category: "Modern Horizons & Leisure",
        location: "El Alamein, Egypt",
        desc: "A newly developed coastal city along Egypt's Mediterranean North Coast, featuring luxury resorts, marinas, and beachfront towers.",
        image: "/assets/eras/new-alamein-main.jpg"
      }
    ],

    cities: [
      { key: "cairo", name: "Cairo", blurb: "Home to royal palaces and Cairo Tower", image: "/assets/eras/cairo.jpg", coords: [30.0444, 31.2357] },
      { key: "new-capital", name: "New Capital", blurb: "Egypt's futuristic new administrative capital", image: "/assets/eras/new-capital.jpg", coords: [30.0131, 31.7357] },
      { key: "north-coast", name: "North Coast", blurb: "Home to New Alamein and Sahel's resorts", image: "/assets/eras/north-coast.jpg", coords: [30.8325, 28.9540] },
      { key: "sheikh-zayed", name: "Sheikh Zayed", blurb: "Home to Arkan Mall and modern suburbs", image: "/assets/eras/sheikh-zayed.jpg", coords: [30.0270, 30.9772] }
    ],

    timeline: {
      intro: "Explore the key periods that shaped Modern Egypt.",
      points: [
        { name: "Muhammad Ali Era", date: "1805–1882", active: true },
        { name: "British Occupation", date: "1882–1952", active: false },
        { name: "Republic Era", date: "1952–1970s", active: false },
        { name: "Contemporary Egypt", date: "1970s–2010s", active: false },
        { name: "New Capital Era", date: "2015–Present", active: false }
      ]
    },

    legacy: {
      image: "/assets/eras/modern-egypt-legacy.jpg",
      paragraphs: [
        "Modern Egypt's story is often traced to Muhammad Ali Pasha, who took power in 1805 and launched sweeping reforms to modernize the country's military, economy, and infrastructure. His dynasty would rule Egypt for close to a century and a half, building grand palaces and reshaping Cairo with wide boulevards inspired by European capitals.",
        "In 1882, Egypt came under British occupation, a period that lasted until the 1952 revolution, when a group of army officers overthrew the monarchy and established Egypt as a republic. This marked a decisive break from centuries of foreign and dynastic rule, and ushered in a new era of national identity and independence.",
        "The following decades saw Egypt navigate independence, regional conflicts, and rapid urban growth, with Cairo expanding into one of the largest cities in Africa and the Middle East. Contemporary art, cinema, and culture flourished, cementing Cairo's role as a cultural capital of the Arabic-speaking world.",
        "In recent years, Egypt has looked toward the future with the construction of the New Administrative Capital east of Cairo — a vast, ultra-modern city featuring some of the tallest towers in Africa. It stands as a striking symbol of a country building forward while remaining deeply rooted in its layered history."
      ]
    },

    architecture: {
      image: "/assets/eras/modern-egypt-architecture.jpg",
      paragraph: "Modern Egyptian architecture spans a striking range of styles, from the ornate Belle Époque palaces and neo-Islamic facades of early 20th-century Cairo, to the glass-and-steel towers rising in the New Administrative Capital today. Royal residences like Abdeen and Baron Empain Palace reflect a fusion of European elegance and Egyptian and Orientalist influences, while contemporary developments favor sleek, futuristic skylines designed to signal Egypt's next chapter."
    },

  }
};