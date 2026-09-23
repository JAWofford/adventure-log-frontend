

# Adventure Log

Adventure Log is a place for RV and camper owners to keep a running scrapbook of their trips. Instead of scattered notes and photos across a phone, every trip gets logged as a single record — the route you took, the legs along the way, and the campgrounds you stayed at — so future-you (or your next trip's planning self) has something real to look back on. Users can log full trip logs broken down leg-by-leg, review campgrounds with multiple stays logged over time, and mark any entry public or private to control what's just for their own record versus shareable with others.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Wireframes](#wireframes)
- [ER Diagram](#er-diagram)
- [Unsolved Problems & Future Features](#unsolved-problems--future-features)

---

## Features

- **User registration & authentication** — session-based login via Spring Security, with protected routes for logged-in users only.
- **Trip Logs** — full CRUD. Create a trip with a name, dates, description, and privacy setting, then break it down into **route legs**: individual stretches of the journey, each with a title and notes. Legs can be added, edited, and the whole trip deleted (with cascading deletion of its legs).
- **Campground Reviews** — create and view campgrounds with a name, location, state, and notes, with multiple **stays** logged against a single campground over time (date, site number, and notes per visit). *(Editing and deleting reviews is a deferred feature — see below.)*
- **Dashboard** — a tabbed view of "My Trips" and "My Reviews," with the last-viewed tab remembered when navigating back from a detail page.
- **Sticker Collection** — a lighthearted, decal-collecting feature where users can create and place a virtual sticker for places they've been, browser-stored.
- **Responsive design** — a hamburger-menu navigation on smaller screens, with a fixed top nav and sticky-to-the-bottom footer.
- **About page** — explains the app for visitors browsing the portfolio piece itself.

---

## Technologies Used

**Frontend**
- React (with React Router for client-side routing)
- Vite
- Plain CSS (custom design system, no framework)

**Backend**
- Java / Spring Boot
- Spring Security (session-based authentication)
- Spring Data JPA / Hibernate
- MySQL

**Other**
- RESTful API architecture connecting the two

---

## Installation



### Prerequisites
- Java [version] and Maven (or your build tool of choice)
- Node.js and npm
- MySQL, running locally or accessible remotely

### Backend Setup
1. The backend for this application (Spring Boot) lives in a separate repository:
https://github.com/JAWofford/adventure-log-backend.git
2. Download this repository and see the ReadMe.md there for instructions.

### Frontend Setup
1. Navigate to the frontend project folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Confirm the frontend's `BASE_URL` (in `src/utils/baseURL.js`) points to your running backend.
4. Start the development server:
   ```
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

## Wireframes

> https://miro.com/app/board/uXjVHxlODMM=/?share_link_id=257963369353

---

## ER Diagram

This can be found in the backend repositories ReadMe file

---

## Unsolved Problems & Future Features

- **Campground Review editing and deletion** — trip logs support full editing (including individual route legs) and deletion, but this was intentionally scoped out for campground reviews given project time constraints. The backend endpoints already exist; only the frontend wiring is missing.
- **Route leg reordering and individual deletion** — a user can add and edit legs on an existing trip, but cannot currently reorder them or delete a single leg from the middle of a trip without deleting the whole trip.
- **Explore page** — a planned feature to browse all trip logs and campground reviews marked public, across all users, not just one's own. This requires new backend endpoints, ownership checks on the frontend for edit/delete visibility, and was deferred to keep focus on the core CRUD features for the first-pass deadline.
- **Protected route handling** — pages that require login currently guard against rendering with no logged-in user, but don't yet redirect automatically; a `ProtectedRoute` wrapper component is a planned improvement for a more polished experience when an unauthenticated user navigates directly to a protected URL.
- **Sticker collection persistence** — currently stored in the browser's local storage rather than the backend, meaning stickers don't sync across devices or persist if local storage is cleared.
