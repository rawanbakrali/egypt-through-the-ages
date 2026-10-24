# Egypt Through the Ages

**An interactive historical atlas of Egypt, organised by era and combining maps, monument records, visitor reviews, and a public events calendar.**

---

## Abstract

Egypt keeps its past in layers: pharaonic stone beneath Hellenistic marble, Coptic stone beneath the minarets of medieval Cairo, and above them all the glass towers of the modern city. *Egypt Through the Ages* is a web application that lets a reader travel through those layers in order. It presents five historical eras, each with its own monuments, timeline, and editorial essays, and it grounds them in practical tools for the contemporary traveller: interactive maps, visitor reviews, personal lists, and a calendar of living events.

The project is also a full-stack software engineering study. It is built on Node.js and Express following the model–view–controller pattern, and it stores its data in MongoDB. It implements token-based authentication with role-based authorisation, server-side validation, cloud-hosted media, and a monochrome editorial interface in which historical photography supplies the only colour.

---

## Table of Contents

1. [Features](#1-features)
2. [Historical Eras](#2-historical-eras)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Installation and Setup](#5-installation-and-setup)
6. [Environment Configuration](#6-environment-configuration)
7. [Principal Routes](#7-principal-routes)
8. [Security Considerations](#8-security-considerations)
9. [Design Principles](#9-design-principles)
10. [Future Work](#10-future-work)
11. [Contributors](#11-contributors)
12. [Acknowledgements](#12-acknowledgements)

---

## 1. Features

### Era Exploration
Each era page opens with a full-width hero and proceeds through an overview, a timeline of its dynasties or periods, an essay on its legacy, a study of its architecture, and an interactive map of its places.

### Monument Drawer
Selecting a monument opens a side panel with four sections:
- **Overview:** quick facts, visitor information, a live map of the location, and, where one exists, an embedded 3D tour.
- **History:** a narrative account specific to that monument.
- **Gallery:** photographs contributed by visitors through their reviews.
- **Reviews:** ratings and written accounts from other visitors.

### Reviews and Personal Lists
Authenticated users may rate a place from one to five stars, add written commentary, tags, and photographs, and mark it as a **Favourite**, **Wishlist** item, or **Visited**. Each user may review a given place only once, a constraint enforced by a unique compound index at the database level. Displayed averages are computed from stored reviews.

### Events Calendar
The events page brings together official, business, and community events. Members of the public may submit events, which remain hidden until an administrator approves them. On an event's page, users may mark themselves as *Interested*, *Attending*, and, after the event date, *Attended*.

### Administrative Dashboard
Administrators manage the platform from a dedicated interface covering:
- **Historical places:** creation, editing, deletion, image upload, map-based positioning, and a draft/published state that governs public visibility. Deleting a place also removes the reviews and list entries that reference it.
- **Events:** official events and the submission review queue (approve, reject, edit).
- **Bookings:** an overview of user participation in events.
- **Users:** role and account management.

### User Profile
Each member has a profile page presenting their statistics, recent activity, reviews, and lists, together with the means to update their own account details.

### Supporting Functions
- Password recovery through a single-use, time-limited link sent by email.
- Custom 404 and error pages.
- An in-site conversational assistant.

### Conversational Place Assistant

An in-site chatbot that helps visitors discover Egypt's historical sites by answering brief questions about monuments, their history, and their cultural significance. It provides a conversational way to explore places without interrupting the browsing experience.

### Cloud-Based Image Storage

Place images and visitor-uploaded photographs are stored using **Supabase Storage**, with Multer handling incoming file uploads on the server. This separates media storage from the application's database and allows uploaded images to be accessed through their storage URLs.
---

## 2. Historical Eras

| Era | Period | Map Marker | Categories |
|---|---|---|---|
| **Ancient Egypt** | c. 3100 – 332 BCE | Amber `#F59E0B` | Pyramids · Temples · Museums |
| **Greco-Roman Egypt** | 332 BCE – 641 CE | Blue `#2563EB` | Temples · Theaters · Museums |
| **Coptic Egypt** | 42 – 641 CE | Violet `#7C3AED` | Churches · Monasteries · Museums |
| **Islamic Egypt** | 641 – 1798 CE | Green `#16A34A` | Mosques · Citadels · Art & Culture |
| **Modern Egypt** | 1798 CE – present | Slate `#64748B` | Royal Estates & Landmarks · Contemporary Art & Culture · Modern Horizons & Leisure |

---

## 3. System Architecture

The application follows the model–view–controller pattern. The entry point, `app.js`, only assembles the application: it registers middleware and mounts routers. All substantive logic lives in dedicated modules.

```
egypt-through-the-ages/
├── app.js                  # Application entry point (setup only)
├── controllers/            # Request-handling logic
├── models/                 # Mongoose schemas and data helpers
├── routes/                 # URL-to-controller mappings, by feature
├── middleware/             # Authentication, uploads, error handling
│   └── validators/         # Input validation rules, by feature
├── data/eras.js            # Editorial content for each era
├── utils/                  # Mailer, storage client, era context helper
├── views/                  # EJS templates
│   └── partials/           # Reusable fragments (navbar, modals, rows)
└── public/
    ├── css/                # Stylesheets
    └── js/                 # Client-side scripts
```

### Request Lifecycle
1. A request enters `app.js`, where cookies are parsed and the user's authentication state is attached to the response context.
2. The request is routed to the matching feature router.
3. Validators inspect the input; a failure is answered immediately.
4. The controller consults the models and either renders an EJS view or returns JSON.
5. Unanticipated errors are forwarded to a single global error handler, which responds appropriately for page or API requests.

### Division of Content
Editorial material belonging to an era as a whole (timeline, legacy, architecture, category labels) resides in `data/eras.js`. Individual places and events are stored in MongoDB and joined to their era at render time. A place added by an administrator therefore appears in the correct era without any change to templates.

### Data Models
`User` · `Place` · `Event` · `Reviews` · `UserPlaceStatus` (favourite, wishlist, visited) · `Booking`

---

## 4. Technology Stack

| Concern | Technology |
|---|---|
| Runtime and server | Node.js, Express |
| Templating | EJS |
| Database | MongoDB Atlas, via Mongoose |
| Authentication | JSON Web Tokens in cookies (`jsonwebtoken`, `cookie-parser`); password hashing with `bcrypt` |
| Validation | `express-validator` |
| Media storage | `multer` (in-memory) with Supabase Storage |
| Email | Nodemailer (Gmail SMTP) |
| Maps | Leaflet.js; embedded Google Maps for monument locations |
| 3D tours | Sketchfab embeds |
| Typography | Playfair Display, Inter |
| Front end | Vanilla JavaScript, HTML5, CSS3 |

---

## 5. Installation and Setup

### Prerequisites
- A current release of Node.js
- A MongoDB Atlas cluster
- A Supabase project with a storage bucket
- A Gmail account with an App Password (required only for password-recovery email)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/rawanbakrali/egypt-through-the-ages.git
cd egypt-through-the-ages

# 2. Install dependencies
npm install

# 3. Create a .env file (see Section 6), then start the server
node app.js
```

The application will be available at `http://localhost:3000`.

### Creating the First Administrator
Register an account through the interface, then set its `role` field to `admin` directly in the `users` collection of the database. Administrators may subsequently manage roles from the Users section of the dashboard.

---

## 6. Environment Configuration

Create a `.env` file in the project root. This file contains secrets and must never be committed; confirm that it is listed in `.gitignore`.

```dotenv
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/egyptThroughTheAges
JWT_SECRET=<a long, random string>
GMAIL_USER=<address@gmail.com>
GMAIL_APP_PASSWORD=<sixteen-character app password>
SUPABASE_URL=<your project URL>
SUPABASE_KEY=<your service key>
SUPABASE_BUCKET=<your bucket name>
```

---

## 7. Principal Routes

| Route | Purpose |
|---|---|
| `GET /` | Home page: hero, era navigation, overview map |
| `GET /era/:slug` | Era page (`ancient-egypt`, `greco-roman`, `coptic`, `islamic`, `modern-egypt`) |
| `GET /events`, `GET /event/:slug` | Events calendar and individual event |
| `GET /profile` | User profile (administrators are redirected to `/admin`) |
| `GET /admin` | Administrative dashboard (administrators only) |
| `POST /login`, `/register`, `/logout` | Authentication |
| `POST /forgot-password`, `POST /reset-password/:token` | Password recovery |
| `POST /reviews`, `DELETE /reviews/:id`, `GET /reviews/place/:placeId` | Reviews |
| `POST /status/:type/toggle` | Favourite, wishlist, and visited lists |
| `POST /bookings` | Event participation (interested, attending, attended) |

The complete set of routes is defined in the `routes/` directory, one file per feature.

---

## 8. Security Considerations

- **Credentials:** Passwords are hashed with bcrypt before storage and are never saved or compared in plain text.
- **Authorisation:** Access is enforced by `requireAuth` and `requireAdmin` guards at the route level, independently of what the interface displays.
- **Validation:** Every route that writes data validates its input on the server, independently of any browser-side checks.
- **Data integrity:** Uniqueness rules (one review per user per place, one list entry per user per place per type, one booking per user per event) are enforced by database indices as well as application logic.
- **Account enumeration:** The response to a password-recovery request is identical whether or not the email address is registered.
- **Secrets:** Credentials and keys are held in environment variables, outside version control.

---

## 9. Design Principles

The interface is deliberately monochrome. Backgrounds are near-black (`#050505`), text is off-white, and colour is introduced only by historical photography and by the five era markers. Headings are set in Playfair Display and all other text in Inter. Interactive surfaces, namely drawers, modals, and dropdowns, are rendered on a white background, which distinguishes the places where users act from the places where they read.

---

## 10. Future Work

- Refinement of the responsive layout for phones and tablets
- Pagination of administrative tables
- Localisation into additional languages
- Reviews for events (currently limited to places)
- Deployment with a domain name and HTTPS

---

## 11. Contributors

| Contributor | Contribution |
|---|---|
| **Rawan Bakr** | Landing page and era pages |
| **Malak Waleed** | Events page |
| **Engy Elkotb** | Profile page |
| **Belal Azim** | Administrative dashboard |
---

## 12. Acknowledgements

The project makes use of [Leaflet](https://leafletjs.com/) and the data of [OpenStreetMap](https://www.openstreetmap.org/) for mapping, and of [Sketchfab](https://sketchfab.com/) for embedded 3D models. Thanks are due to the creators and photographers whose work gives each era its character.

---

*A river through eternity, a civilisation between the pages of time.*
