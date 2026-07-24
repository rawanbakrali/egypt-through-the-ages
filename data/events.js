// data/events.js
// Mock event data for the current UI-only phase (Section 19).
// Shape mirrors the planned Event schema (Section 11) plus a few
// UI-only fields (type, category, status, featured, image) that will
// map cleanly onto real fields once the backend/admin workflow exists.

module.exports = [
  {
    slug: "cairo-opera-aida",
    title: "Cairo Opera: Aida",
    type: "official",          // official | business | community
    category: "Opera",
    era: "modern-egypt",
    placeSlug: null,
    date: "2026-08-14",
    time: "20:00",
    location: "Cairo Opera House, Zamalek",
    coordinates: { lat: 30.0423613, lng: 31.2236682 },
    description:
      "The Cairo Opera House presents a full staging of Verdi's Aida, performed by the Cairo Opera Company Orchestra and Choir on the main hall stage.",
    image: "/assets/events/opera-aida.jpg",
    booking: "reserved",       // reserved | open
    ticketUrl: "https://www.cairoopera.org/",
    featured: true,
    status: "approved"
  },
  {
    slug: "sound-and-light-giza",
    title: "Sound & Light Show — Pyramids of Giza",
    type: "official",
    category: "Sound & Light",
    era: "ancient-egypt",
    placeSlug: "pyramids-of-giza",
    date: "2026-08-02",
    time: "21:00",
    location: "Giza Plateau, Giza",
    coordinates: { lat: 29.9792368, lng: 31.1342008 },
    description:
      "An evening narration of Ancient Egyptian history projected across the Great Pyramids and Sphinx, told through light, sound and music.",
    image: "/assets/events/sound-light-giza.jpg",
    booking: "reserved",
    ticketUrl: "https://www.soundandlight.com.eg/",
    featured: true,
    status: "approved"
  },
  {
    slug: "cairo-international-book-fair",
    title: "Cairo International Book Fair",
    type: "official",
    category: "Book Fair",
    era: null,
    placeSlug: null,
    date: "2026-01-28",
    time: "10:00",
    location: "Egypt International Exhibition Center, New Cairo",
    coordinates: { lat: 30.0135508, lng: 31.3849682 },
    description:
      "One of the largest book fairs in the Arab world, hosting publishers, authors and cultural panels across ten days.",
    image: "/assets/events/book-fair.jpg",
    booking: "open",
    ticketUrl: null,
    featured: false,
    status: "approved"
  },
  {
    slug: "karnak-sound-and-light",
    title: "Sound & Light Show — Karnak Temple",
    type: "official",
    category: "Sound & Light",
    era: "ancient-egypt",
    placeSlug: "karnak-temple",
    date: "2026-08-09",
    time: "20:30",
    location: "Karnak Temple Complex, Luxor",
    coordinates: { lat: 25.7188346, lng: 32.6572703 },
    description:
      "A guided walk through the hypostyle hall and sacred lake, narrated against a backdrop of illuminated columns.",
    image: "/assets/events/sound-light-karnak.jpg",
    booking: "reserved",
    ticketUrl: "https://www.soundandlight.com.eg/",
    featured: false,
    status: "approved"
  },
  {
    slug: "khan-el-khalili-night-market",
    title: "Khan El Khalili Night Market",
    type: "business",
    category: "Bazaar / Turathna",
    era: "islamic",
    placeSlug: "al-azhar-mosque",
    date: "2026-08-06",
    time: "18:00",
    location: "Khan El Khalili, Islamic Cairo",
    coordinates: { lat: 30.0477386, lng: 31.2622538 },
    description:
      "Local merchants extend their stalls into the evening with handmade crafts, brassware and live oud music through the old souq lanes.",
    image: "/assets/events/khan-el-khalili.jpg",
    booking: "open",
    ticketUrl: null,
    featured: true,
    status: "approved"
  },
  {
    slug: "nile-view-rooftop-tasting",
    title: "Nile View Rooftop Tasting Night",
    type: "business",
    category: "Bazaara / Turathna",
    era: "modern-egypt",
    placeSlug: null,
    date: "2026-08-20",
    time: "19:30",
    location: "Zamalek, Cairo",
    coordinates: { lat: 30.0571, lng: 31.2243 },
    description:
      "A local restaurant's seasonal tasting menu evening overlooking the Nile, submitted directly by the business owner.",
    image: "/assets/events/nile-rooftop.jpg",
    booking: "reserved",
    ticketUrl: "https://example-restaurant.com/reserve",
    featured: false,
    status: "approved"
  },
  {
    slug: "alexandria-history-book-club",
    title: "Alexandria History Book Club",
    type: "community",
    category: "Book Club",
    era: "greco-roman",
    placeSlug: null,
    date: "2026-08-11",
    time: "17:00",
    location: "Bibliotheca Alexandrina, Alexandria",
    coordinates: { lat: 31.2089032, lng: 29.9091587 },
    description:
      "A monthly reading circle this session discussing the destruction and legacy of the Great Library of Alexandria.",
    image: "/assets/events/book-club.jpg",
    booking: "open",
    ticketUrl: null,
    featured: false,
    status: "approved"
  },
  {
    slug: "coptic-cairo-history-talk",
    title: "Coptic Cairo Walking History Talk",
    type: "community",
    category: "History Talk",
    era: "coptic",
    placeSlug: "hanging-church",
    date: "2026-08-16",
    time: "16:00",
    location: "Hanging Church, Old Cairo",
    coordinates: { lat: 30.0052389, lng: 31.2301689 },
    description:
      "A community-led walking talk through Old Cairo's churches, hosted by a local heritage enthusiast group.",
    image: "/assets/events/history-talk.jpg",
    booking: "open",
    ticketUrl: null,
    featured: false,
    status: "approved"
  },
  {
    slug: "hieroglyph-workshop",
    title: "Beginner Hieroglyph Reading Workshop",
    type: "community",
    category: "Workshop",
    era: "ancient-egypt",
    placeSlug: "valley-of-the-kings",
    date: "2026-07-05",
    time: "15:00",
    location: "Egyptian Museum, Tahrir Square",
    coordinates: { lat: 30.0483167, lng: 31.2336674 },
    description:
      "A hands-on workshop teaching the basics of reading cartouches and common hieroglyphic symbols. Already took place — shown here as an example of a past/attendable event.",
    image: "/assets/events/hieroglyph-workshop.jpg",
    booking: "open",
    ticketUrl: null,
    featured: false,
    status: "approved"
  }
];
