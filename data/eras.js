// data/eras.js

module.exports = {
  islamic: {
    slug: "islamic",
    name: "Islamic Egypt",

    // ---- HERO ----
    smallLabel: "THE ISLAMIC ERA",
    heroImage: "/assets/eras/islamic-hero.jpg",
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
      ctaText: "DISCOVER THE STORY"
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
          rating: "4.8",
          reviewCount: "124",
          image: "/assets/eras/al-azhar-main.jpg",
          thumbnails: [
            "/assets/eras/al-azhar-thumb1.jpg",
            "/assets/eras/al-azhar-thumb2.jpg",
            "/assets/eras/al-azhar-thumb3.jpg",
            "/assets/eras/al-azhar-thumb4.jpg"
          ],
          desc: "Founded in 970 CE, Al-Azhar Mosque is one of the most important landmarks of Islamic Cairo and the center of learning for over a thousand years.",
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
          rating: "4.7",
          reviewCount: "98",
          image: "/assets/eras/hassan-main.jpg",
          thumbnails: [
            "/assets/eras/hassan-thumb1.jpg",
            "/assets/eras/hassan-thumb2.jpg",
            "/assets/eras/hassan-thumb3.jpg"
          ],
          desc: "A massive Mamluk-era mosque and madrasa near the Citadel. Its incredible scale makes it one of the most iconic monuments in the Islamic world.",
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
          name: "Al-Rifa'i Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          rating: "4.6",
          reviewCount: "76",
          image: "/assets/eras/rifai-main.jpg",
          thumbnails: ["/assets/eras/rifai-thumb1.jpg", "/assets/eras/rifai-thumb2.jpg"],
          desc: "Built near Sultan Hassan Mosque, Al-Rifa'i Mosque is the burial place of several members of Egypt's royal family.",
          tags: ["Mosque", "Royal Burial Site"],
          quickFacts: {
            built: "1912 CE",
            founder: "Khushyar Hanim",
            style: "Neo-Mamluk",
            function: "Mosque & Mausoleum"
          },
          visitorInfo: {
            hours: "9:00 AM – 5:00 PM",
            bestTime: "Morning",
            dressCode: "Modest clothing required",
            entryFee: "100 EGP"
          }
        },
        {
          name: "Ibn Tulun Mosque",
          location: "Cairo",
          fullLocation: "Cairo, Egypt",
          rating: "4.6",
          reviewCount: "89",
          image: "/assets/eras/tulun-main.jpg",
          thumbnails: ["/assets/eras/tulun-thumb1.jpg", "/assets/eras/tulun-thumb2.jpg"],
          desc: "One of the oldest mosques in Egypt still standing in its original form, known for its unique spiral minaret.",
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
          name: "Al-Mursi Abu Al-Abbas Mosque",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          rating: "4.6",
          reviewCount: "65",
          image: "/assets/eras/abbas-main.jpg",
          thumbnails: ["/assets/eras/abbas-thumb1.jpg"],
          desc: "A beautiful mosque overlooking the Mediterranean, dedicated to a revered 13th-century Sufi saint.",
          tags: ["Mosque", "Sufi Shrine"],
          quickFacts: {
            built: "1775 CE",
            founder: "Various patrons",
            style: "Andalusian Revival",
            function: "Mosque & Shrine"
          },
          visitorInfo: {
            hours: "8:00 AM – 6:00 PM",
            bestTime: "Sunset",
            dressCode: "Modest clothing required",
            entryFee: "Free"
          }
        },
        {
          name: "Qaitbay Citadel Mosque",
          location: "Alexandria",
          fullLocation: "Alexandria, Egypt",
          rating: "4.5",
          reviewCount: "112",
          image: "/assets/eras/qaitbay-main.jpg",
          thumbnails: ["/assets/eras/qaitbay-thumb1.jpg"],
          desc: "Built in 1477 by Sultan Al-Ashraf Sayf al-Din Qa'it Bay, this defensive fortress sits directly on the Mediterranean coast.",
          tags: ["Citadel", "Coastal Fortress"],
          quickFacts: {
            built: "1477 CE",
            founder: "Sultan Qaitbay",
            style: "Mamluk Military",
            function: "Fortress & Mosque"
          },
          visitorInfo: {
            hours: "9:00 AM – 4:00 PM",
            bestTime: "Morning",
            dressCode: "Casual",
            entryFee: "80 EGP"
          }
        },
        {
          name: "Amr ibn Al-Aas Mosque",
          location: "Old Cairo",
          fullLocation: "Old Cairo, Egypt",
          rating: "4.4",
          reviewCount: "54",
          image: "/assets/eras/amr-main.jpg",
          thumbnails: ["/assets/eras/amr-thumb1.jpg"],
          desc: "The first mosque ever built in Egypt and Africa, founded in 642 CE by the Muslim general Amr ibn Al-Aas.",
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
          rating: "4.3",
          reviewCount: "47",
          image: "/assets/eras/hakim-main.jpg",
          thumbnails: ["/assets/eras/hakim-thumb1.jpg"],
          desc: "A major Fatimid-era mosque known for its massive minarets and open courtyard, recently restored.",
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
          rating: "4.7",
          reviewCount: "203",
          image: "/assets/eras/cairo-citadel-main.jpg",
          thumbnails: ["/assets/eras/cairo-citadel-thumb1.jpg"],
          desc: "Built by Salah al-Din in 1176 CE to defend Cairo against Crusader attacks, this hilltop fortress remained the seat of Egypt's rulers for nearly 700 years.",
          tags: ["Citadel", "Fortress", "Ayyubid"],
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
          rating: "4.6",
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
          rating: "4.7",
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
            rating: "4.9",
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
          rating: "4.5",
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

    // ---- DEFAULT DRAWER HISTORY TEXT (seeds the drawer's History tab before dynamic per-place data exists) ----
    history: "Al-Azhar Mosque was founded in 970 CE by the Fatimid dynasty, shortly after they established Cairo as their new capital. It was built to serve both as a place of worship and as a center of Islamic scholarship, and just two years later it began functioning as a teaching institution — eventually growing into Al-Azhar University, one of the oldest continuously operating universities in the world. Over the following centuries, successive rulers — Ayyubid, Mamluk, and Ottoman alike — expanded and restored the mosque, adding new gates, minarets, and study halls, each leaving their own architectural mark. Despite occasional periods of neglect and even attempted destruction, Al-Azhar survived largely intact, and today remains one of the most important religious and educational institutions in the Sunni Muslim world."
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
      ctaText: "DISCOVER THE STORY"
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
          rating: "4.9",
          reviewCount: "412",
          image: "/assets/eras/great-pyramid-main.jpg",
          thumbnails: ["/assets/eras/great-pyramid-thumb1.jpg", "/assets/eras/great-pyramid-thumb2.jpg"],
          desc: "Built around 2560 BCE for Pharaoh Khufu, this was the tallest man-made structure in the world for over 3,800 years.",
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
          rating: "4.7",
          reviewCount: "289",
          image: "/assets/eras/khafre-main.jpg",
          thumbnails: ["/assets/eras/khafre-thumb1.jpg"],
          desc: "The second-largest pyramid at Giza, built for Khufu's son Khafre, and still retains some of its original limestone casing near the summit.",
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
          rating: "4.8",
          reviewCount: "356",
          image: "/assets/eras/sphinx-main.jpg",
          thumbnails: ["/assets/eras/sphinx-thumb1.jpg"],
          desc: "A limestone statue with the body of a lion and the head of a pharaoh, believed to represent Khafre, guarding the Giza plateau for over 4,500 years.",
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
          rating: "4.7",
          reviewCount: "178",
          image: "/assets/eras/djoser-main.jpg",
          thumbnails: ["/assets/eras/djoser-thumb1.jpg"],
          desc: "Egypt's earliest large-scale stone monument, designed by the architect Imhotep, and considered the world's oldest colossal stone building.",
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
          rating: "4.6",
          reviewCount: "94",
          image: "/assets/eras/red-pyramid-main.jpg",
          thumbnails: ["/assets/eras/red-pyramid-thumb1.jpg"],
          desc: "Egypt's first successful true smooth-sided pyramid, named for the reddish hue of its limestone in sunlight.",
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
          rating: "4.9",
          reviewCount: "521",
          image: "/assets/eras/karnak-main.jpg",
          thumbnails: ["/assets/eras/karnak-thumb1.jpg", "/assets/eras/karnak-thumb2.jpg"],
          desc: "The largest religious complex ever built, expanded over 2,000 years by successive pharaohs and dedicated primarily to the god Amun.",
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
          rating: "4.8",
          reviewCount: "398",
          image: "/assets/eras/luxor-temple-main.jpg",
          thumbnails: ["/assets/eras/luxor-temple-thumb1.jpg"],
          desc: "Built largely by Amenhotep III and Ramesses II, this temple was dedicated to the rejuvenation of kingship and connected to Karnak by a grand avenue of sphinxes.",
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
          rating: "4.9",
          reviewCount: "467",
          image: "/assets/eras/abu-simbel-main.jpg",
          thumbnails: ["/assets/eras/abu-simbel-thumb1.jpg"],
          desc: "Two massive rock-cut temples built by Ramesses II, famously relocated in the 1960s to avoid flooding from the construction of the Aswan High Dam.",
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
          rating: "4.7",
          reviewCount: "245",
          image: "/assets/eras/hatshepsut-main.jpg",
          thumbnails: ["/assets/eras/hatshepsut-thumb1.jpg"],
          desc: "A mortuary temple built into the cliffs of Deir el-Bahari for Hatshepsut, one of ancient Egypt's few female pharaohs.",
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
          rating: "4.7",
          reviewCount: "156",
          image: "/assets/eras/edfu-main.jpg",
          thumbnails: ["/assets/eras/edfu-thumb1.jpg"],
          desc: "One of the best-preserved temples in Egypt, dedicated to the falcon god Horus and built during the Ptolemaic period.",
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
          rating: "4.7",
          reviewCount: "612",
          image: "/assets/eras/egyptian-museum-main.jpg",
          thumbnails: ["/assets/eras/egyptian-museum-thumb1.jpg"],
          desc: "Home to one of the world's largest collections of ancient Egyptian antiquities, including treasures from Tutankhamun's tomb.",
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
          rating: "4.9",
          reviewCount: "203",
          image: "/assets/eras/gem-main.jpg",
          thumbnails: ["/assets/eras/gem-thumb1.jpg"],
          desc: "The world's largest archaeological museum dedicated to a single civilization, housing the complete Tutankhamun collection.",
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
          rating: "4.6",
          reviewCount: "112",
          image: "/assets/eras/nubian-museum-main.jpg",
          thumbnails: ["/assets/eras/nubian-museum-thumb1.jpg"],
          desc: "Dedicated to the history and culture of Nubia, with artifacts rescued during the construction of the Aswan High Dam.",
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

    history: "The Great Pyramid of Giza was built around 2560 BCE during the reign of Pharaoh Khufu, as the centerpiece of a vast royal necropolis. Standing at approximately 146 meters when completed, it held the record as the tallest man-made structure in the world for over 3,800 years. Constructed from an estimated 2.3 million limestone blocks, the pyramid was designed to guide the pharaoh's journey into the afterlife, aligned with remarkable precision to the cardinal directions. Alongside it stand two smaller pyramids built for Khufu's successors, Khafre and Menkaure, together with the Great Sphinx — forming one of the most iconic and enduring monuments of the ancient world."
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
      ctaText: "DISCOVER THE STORY"
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
          rating: "4.8",
          reviewCount: "312",
          image: "/assets/eras/philae-main.jpg",
          thumbnails: ["/assets/eras/philae-thumb1.jpg"],
          desc: "Dedicated to the goddess Isis, this temple complex was relocated to Agilkia Island in the 1970s to save it from flooding by the Aswan High Dam.",
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
          rating: "4.7",
          reviewCount: "245",
          image: "/assets/eras/kom-ombo-main.jpg",
          thumbnails: ["/assets/eras/kom-ombo-thumb1.jpg"],
          desc: "A unique double temple dedicated equally to the crocodile god Sobek and the falcon god Horus, built during the Ptolemaic period.",
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
          rating: "4.8",
          reviewCount: "198",
          image: "/assets/eras/dendera-main.jpg",
          thumbnails: ["/assets/eras/dendera-thumb1.jpg"],
          desc: "One of the best-preserved temple complexes in Egypt, dedicated to the goddess Hathor, with a famous astronomical ceiling relief.",
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
          rating: "4.5",
          reviewCount: "167",
          image: "/assets/eras/roman-theatre-main.jpg",
          thumbnails: ["/assets/eras/roman-theatre-thumb1.jpg"],
          desc: "Egypt's only surviving Roman amphitheatre, discovered in 1960, once used for performances and public gatherings in ancient Alexandria.",
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
          rating: "4.4",
          reviewCount: "89",
          image: "/assets/eras/kom-el-dikka-main.jpg",
          thumbnails: ["/assets/eras/kom-el-dikka-thumb1.jpg"],
          desc: "An archaeological park containing Roman-era lecture halls and villas, offering a glimpse into daily life in Roman Alexandria.",
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
          rating: "4.6",
          reviewCount: "178",
          image: "/assets/eras/graeco-roman-museum-main.jpg",
          thumbnails: ["/assets/eras/graeco-roman-museum-thumb1.jpg"],
          desc: "Home to one of the world's most important collections of art and artifacts from Egypt's Greek and Roman periods.",
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
          rating: "4.8",
          reviewCount: "356",
          image: "/assets/eras/bibliotheca-main.jpg",
          thumbnails: ["/assets/eras/bibliotheca-thumb1.jpg"],
          desc: "A modern library and museum built near the site of the ancient Library of Alexandria, commemorating its legacy as a center of learning.",
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
      ctaText: "DISCOVER THE STORY"
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
          rating: "4.8",
          reviewCount: "289",
          image: "/assets/eras/hanging-church-main.jpg",
          thumbnails: ["/assets/eras/hanging-church-thumb1.jpg"],
          desc: "One of the oldest Coptic churches in Egypt, built above the gatehouse of the Roman Babylon Fortress and reached by a flight of steps.",
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
          rating: "4.6",
          reviewCount: "156",
          image: "/assets/eras/abu-serga-main.jpg",
          thumbnails: ["/assets/eras/abu-serga-thumb1.jpg"],
          desc: "Traditionally believed to be built over a cave where the Holy Family sheltered during their flight into Egypt, this is one of Cairo's oldest churches.",
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
          rating: "4.5",
          reviewCount: "98",
          image: "/assets/eras/saint-barbara-main.jpg",
          thumbnails: ["/assets/eras/saint-barbara-thumb1.jpg"],
          desc: "A well-preserved Coptic church housing the relics of Saint Barbara, featuring finely carved wooden iconostasis screens.",
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
          rating: "4.7",
          reviewCount: "134",
          image: "/assets/eras/st-anthony-main.jpg",
          thumbnails: ["/assets/eras/st-anthony-thumb1.jpg"],
          desc: "Considered the oldest active Christian monastery in the world, founded by followers of Saint Anthony, the father of Christian monasticism.",
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
          rating: "4.9",
          reviewCount: "267",
          image: "/assets/eras/st-catherine-main.jpg",
          thumbnails: ["/assets/eras/st-catherine-thumb1.jpg"],
          desc: "Built at the foot of Mount Sinai, this is one of the oldest working Christian monasteries in the world, home to an important collection of ancient manuscripts and icons.",
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
          rating: "4.5",
          reviewCount: "76",
          image: "/assets/eras/white-monastery-main.jpg",
          thumbnails: ["/assets/eras/white-monastery-thumb1.jpg"],
          desc: "Founded by Saint Shenouda, this monastery once housed one of the largest monastic communities in ancient Egypt, built with striking white limestone walls.",
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
          rating: "4.6",
          reviewCount: "203",
          image: "/assets/eras/coptic-museum-main.jpg",
          thumbnails: ["/assets/eras/coptic-museum-thumb1.jpg"],
          desc: "Home to the world's largest collection of Coptic Christian artifacts, including textiles, manuscripts, and religious icons.",
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

    history: "The Hanging Church in Old Cairo, built in the 3rd or 4th century CE, is one of the oldest Coptic churches in Egypt, named for its construction above the gatehouse of a Roman fortress. Suspended above what was once the Babylon Fortress, the church is reached by a set of steps leading up from street level. Its interior features finely carved wooden screens inlaid with ivory, marble columns, and icons depicting Coptic saints. For centuries, it served as the residence of the Coptic Patriarch and remains an active place of worship and pilgrimage today."
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
      ctaText: "DISCOVER THE STORY"
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
          rating: "4.6",
          reviewCount: "231",
          image: "/assets/eras/abdeen-palace-main.jpg",
          thumbnails: ["/assets/eras/abdeen-palace-thumb1.jpg"],
          desc: "Completed in 1874 under Khedive Ismail, this grand European-style palace served as Egypt's seat of royal power for nearly a century.",
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
          rating: "4.5",
          reviewCount: "312",
          image: "/assets/eras/baron-palace-main.jpg",
          thumbnails: ["/assets/eras/baron-palace-thumb1.jpg"],
          desc: "Built by Belgian industrialist Édouard Empain, this Hindu-inspired palace is one of Cairo's most striking architectural landmarks.",
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
          rating: "4.5",
          reviewCount: "178",
          image: "/assets/eras/manial-palace-main.jpg",
          thumbnails: ["/assets/eras/manial-palace-thumb1.jpg"],
          desc: "A palace complex built for Prince Muhammad Ali Tewfik, blending Ottoman, Moorish, and Persian architectural styles across landscaped gardens.",
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
          rating: "4.6",
          reviewCount: "402",
          image: "/assets/eras/cairo-tower-main.jpg",
          thumbnails: ["/assets/eras/cairo-tower-thumb1.jpg"],
          desc: "A lattice tower rising above the Nile, completed in 1961 and long considered a defining symbol of modern Cairo's skyline.",
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
          rating: "4.5",
          reviewCount: "145",
          image: "/assets/eras/modern-art-museum-main.jpg",
          thumbnails: ["/assets/eras/modern-art-museum-thumb1.jpg"],
          desc: "Showcasing Egyptian art from the 19th century to today, this museum traces the evolution of modern Egyptian painting and sculpture.",
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
          rating: "4.7",
          reviewCount: "268",
          image: "/assets/eras/cairo-opera-main.jpg",
          thumbnails: ["/assets/eras/cairo-opera-thumb1.jpg"],
          desc: "Egypt's premier performing arts venue, built with Japanese support after the original Khedivial Opera House was lost to fire.",
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
          rating: "4.4",
          reviewCount: "112",
          image: "/assets/eras/zamalek-art-main.jpg",
          thumbnails: ["/assets/eras/zamalek-art-thumb1.jpg"],
          desc: "A cluster of contemporary art galleries on Cairo's Zamalek island, showcasing leading modern Egyptian and regional artists.",
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
          rating: "4.6",
          reviewCount: "89",
          image: "/assets/eras/arts-culture-city-main.jpg",
          thumbnails: ["/assets/eras/arts-culture-city-thumb1.jpg"],
          desc: "A vast new cultural district in Egypt's New Administrative Capital, home to a grand Opera House and the Capital Museum.",
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
          rating: "4.7",
          reviewCount: "203",
          image: "/assets/eras/iconic-tower-main.jpg",
          thumbnails: ["/assets/eras/iconic-tower-thumb1.jpg"],
          desc: "Standing 394 meters tall, this is currently Africa's tallest skyscraper, anchoring the skyline of Egypt's New Administrative Capital.",
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
          rating: "4.5",
          reviewCount: "97",
          image: "/assets/eras/district-5-main.jpg",
          thumbnails: ["/assets/eras/district-5-thumb1.jpg"],
          desc: "A premium mixed-use lifestyle destination in the New Capital, combining retail, dining, and entertainment in a modern setting.",
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
          rating: "4.5",
          reviewCount: "356",
          image: "/assets/eras/mall-of-egypt-main.jpg",
          thumbnails: ["/assets/eras/mall-of-egypt-thumb1.jpg"],
          desc: "One of Egypt's largest shopping and entertainment complexes, featuring an indoor ski slope alongside retail and dining.",
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
          rating: "4.5",
          reviewCount: "489",
          image: "/assets/eras/city-stars-main.jpg",
          thumbnails: ["/assets/eras/city-stars-thumb1.jpg"],
          desc: "One of the largest malls in the Middle East, combining retail, hotels, and entertainment in a single sprawling complex.",
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
          rating: "4.4",
          reviewCount: "134",
          image: "/assets/eras/arkan-mall-main.jpg",
          thumbnails: ["/assets/eras/arkan-mall-thumb1.jpg"],
          desc: "An open-air lifestyle mall in Sheikh Zayed City, popular for its mix of retail, cafes, and outdoor plazas.",
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
          rating: "4.6",
          reviewCount: "212",
          image: "/assets/eras/new-alamein-main.jpg",
          thumbnails: ["/assets/eras/new-alamein-thumb1.jpg"],
          desc: "A newly developed coastal city along Egypt's Mediterranean North Coast, featuring luxury resorts, marinas, and beachfront towers.",
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
          rating: "4.3",
          reviewCount: "167",
          image: "/assets/eras/monorail-main.jpg",
          thumbnails: ["/assets/eras/monorail-thumb1.jpg"],
          desc: "One of the world's longest monorail systems, connecting Greater Cairo to the New Administrative Capital and 6th of October City.",
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

    history: "Abdeen Palace, completed in 1874 under Khedive Ismail, served as the official residence of Egypt's rulers for nearly a century, replacing the Cairo Citadel as the seat of power. Built in a grand European style influenced by French and Italian palace design, it was intended to showcase Egypt as a modern, cosmopolitan nation on par with the great powers of Europe. The palace played a central role in Egypt's 20th-century history, including the abdication of King Farouk in 1952 following the revolution that ended the monarchy. Today, part of the palace houses museums open to the public, while sections remain in ceremonial use by the Egyptian presidency."
  }

  // Full content for each era is built out individually in the upcoming
  // Stage 2 era-page work — this stub only proves the routing/template works.
};