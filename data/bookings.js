// data/bookings.js
// Mock event bookings data for the Admin Dashboard UI (Frontend-only).

module.exports = [
  {
    id: "#BK1258",
    eventTitle: "Cairo International Film Festival",
    eventImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=300&q=80",
    bookedBy: "Omar Khaled",
    email: "omar.khaled@example.com",
    date: "May 18, 2025",
    status: "open",        // open | reserved | full
    tickets: 2,
    totalPrice: "$40.00"
  },
  {
    id: "#BK1257",
    eventTitle: "Al-Muizz Street Festival",
    eventImage: "https://images.unsplash.com/photo-1544830791-38d426839352?auto=format&fit=crop&w=300&q=80",
    bookedBy: "Sarah Ahmed",
    email: "sarah.a@example.com",
    date: "May 18, 2025",
    status: "reserved",
    tickets: 4,
    totalPrice: "$80.00"
  },
  {
    id: "#BK1256",
    eventTitle: "Nile Heritage Concert",
    eventImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
    bookedBy: "Youssef Ali",
    email: "youssef.ali@example.com",
    date: "May 17, 2025",
    status: "open",
    tickets: 1,
    totalPrice: "$25.00"
  },
  {
    id: "#BK1255",
    eventTitle: "Sound & Light Show — Pyramids of Giza",
    eventImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=300&q=80",
    bookedBy: "Nour El-Din",
    email: "nour.din@example.com",
    date: "May 14, 2025",
    status: "full",
    tickets: 6,
    totalPrice: "$180.00"
  },
  {
    id: "#BK1254",
    eventTitle: "Cairo Opera: Aida",
    eventImage: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=300&q=80",
    bookedBy: "Dina Mahmoud",
    email: "dina.m@example.com",
    date: "May 12, 2025",
    status: "reserved",
    tickets: 2,
    totalPrice: "$110.00"
  }
];
