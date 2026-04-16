# Customer Portal in SaberTask

A complete overview of every SaberTask feature your customers see when they log in to track their own services. The portal is a clean, self-service window into the work you do for them — without exposing any of your internal pricing, notes, team structure or operational data. This document is the source of truth for the **Customer Portal** page on the SaberTask website.

> **Scope note:** SaberTask has dedicated pages for **Live Dashboard**, **Employee Management**, **Task Scheduling**, **Quality Controls** and **Invoicing & Billing**. The **internal** management of customers, locations, contacts, files and service agreements is described on a separate **Customer Management** page. This document covers only what *the customer themselves* experiences.

> **How to read this document:** Each section starts with a short, marketing-ready description, followed by a feature list. Every feature notes whether it lives on the **web admin** (planners and managers), the **mobile app** (frontline workers), or **both** — but for the Customer Portal, the relevant view is **customer web**.

---

## At a glance

The Customer Portal gives your customers a secure, self-service login where they can see exactly what's scheduled, what's been done, and how the quality of the work is tracking — all scoped to their locations only. There's no internal nav, no internal data, and no chance of one customer ever seeing another's information.

---

## 1. Secure customer login

A separate login experience built specifically for your customers — not your staff.

- **Customer-only role** — customers sign in with their own role; they can never access your internal app, even if they try the URL. *(Customer web)*
- **Email invites from your customer record** — grant a contact "Dashboard Access" from the customer page, click "Send Dashboard Invite", and the contact gets a secure link to set their own password. *(Customer web + your web app)*
- **Standard password flow** — password reset and change work the same as the rest of SaberTask. *(Customer web)*
- **Multi-customer contacts** — a contact who represents multiple customer entities can see each one they're authorised for. *(Customer web)*

---

## 2. A clean customer-only experience

Customers see a portal designed for them, not a stripped-down version of your dashboard.

- **Minimal customer layout** — just your tenant logo, the customer name, the user's email and a logout button. No internal sidebar, no extra menus. *(Customer web)*
- **Branded with your logo** — the portal carries your company's identity, not SaberTask's. *(Customer web)*
- **No data leaks** — internal fields like manager notes, worker notes, team names, pricing and responsible-user names are stripped out at the API layer, not the UI layer. Customers cannot see them under any circumstances. *(Customer web)*
- **Hard role separation** — every internal API endpoint explicitly excludes the Customer role, so a determined customer can't reach internal data even by guessing URLs. *(Customer web)*

---

## 3. 14-day activity calendar

The first thing a customer sees when they log in.

- **14-day forward calendar** showing every day at a glance. *(Customer web)*
- **Per-day counts** — number of scheduled and projected tasks for each day. *(Customer web)*
- **Click any day** to open a day-detail dialog with the list of tasks scheduled for that day. *(Customer web)*
- **Recurring services projected** — recurring service agreements project forward into the calendar so the customer can see what's coming, not just what's already in the schedule. *(Customer web)*
- **Scoped to their locations only** — customers never see anything happening at other customers' sites. *(Customer web)*

---

## 4. Upcoming tasks

Every job that's scheduled or in progress for the customer.

- **Upcoming tasks table** — Scheduled and In Progress tasks listed cleanly. *(Customer web)*
- **Service type, location and date** for each task. *(Customer web)*
- **Click to open the task detail dialog** — see the full record. *(Customer web)*

---

## 5. Completed tasks

Proof that the work was done.

- **Completed tasks table** — newest first, paginated for customers with long histories. *(Customer web)*
- **Status visible** — every task is clearly marked as completed. *(Customer web)*
- **Click any row** to open the full task detail with the proof of work. *(Customer web)*

---

## 6. Task detail with proof of work

Each task opens into a focused detail dialog.

- **Location and address** — where the work was done. *(Customer web)*
- **Date and status** — when it was done and where it currently sits. *(Customer web)*
- **Service type and agreement number** — what service it relates to. *(Customer web)*
- **Worker photos** — the images the team uploaded from the field. *(Customer web)*
- **Customer signature** — the signature captured on site at the time of completion. *(Customer web)*
- **License plate** — for fleet-related jobs, the vehicle that did the work. *(Customer web)*
- **No internal notes** — manager notes, worker notes and completion notes are intentionally excluded. *(Customer web)*

---

## 7. Quality reports

Customers can see the inspection reports for their own locations.

- **Quality reports list** — every finalised report for the customer's locations. *(Customer web)*
- **Full report view** — sections, answers, photos, ratings and signatures, exactly as the worker filled them. *(Customer web)*
- **No manager notes** — internal notes are stripped from the customer view of every report. *(Customer web)*
- **Always in sync** — the moment a worker finalises a report, it's available in the portal. *(Customer web)*

---

## 8. You stay in control

The portal is designed so you decide who sees what — and you can change your mind any time.

- **Per-contact dashboard access** — turn portal access on or off for each customer contact individually. *(Your web app)*
- **Send-invite button** on the customer contact row — one click to invite a contact. *(Your web app)*
- **Audit visible from your side** — every contact's portal access status is visible at a glance from the customer view. *(Your web app)*
- **No portal? No exposure** — if a customer has no contacts with portal access enabled, no one sees anything. The default is private. *(Your web app)*

---

## 9. Privacy by design

Customer data scoping is enforced in the system, not in the UI.

- **Per-customer scoping** — every customer contact only sees data for the customer record(s) they're attached to. *(Customer web)*
- **Email-based identity** — the portal resolves which customer the user belongs to from their authenticated email at request time, so there's no way to "trick" the system into showing someone else's data. *(Customer web)*
- **Slim DTOs** — the API responses sent to customers are deliberately limited; internal fields aren't even loaded into the response object. *(Customer web)*
- **Internal endpoints locked** — every internal API explicitly denies the Customer role, so even if a customer guesses a URL, they get a 403. *(Customer web)*

---

## 10. Multilingual & branded

The portal speaks your customer's language.

- **English and Danish out of the box**, with more languages on the roadmap. *(Customer web)*
- **Per-customer-contact language preference** — each customer user picks their own language. *(Customer web)*
- **Your branding everywhere** — tenant logo on the layout and on PDF exports your customer downloads. *(Customer web)*

---

## What it looks like for each role

**For your customer's facility manager:**
Log in, see a 14-day calendar of every service planned at your buildings, click into any day to see the details, browse completed tasks with photos and signatures, and download quality inspection reports — all without ever seeing pricing, internal notes or anyone else's data.

**For your account manager (your side):**
Grant portal access to a customer contact in two clicks, send the invite from the same screen, and trust that the customer only sees what they're allowed to see.

**For your operations team (your side):**
Keep working in your normal app — there's nothing extra to do. Anything you finalise (a task, a quality report, a signature) is automatically available to the customer's portal users in real time.

---

## Why customers love the SaberTask portal

- **Self-service transparency** — they don't have to call you for an update on what's been done.
- **Photo and signature proof** — the work is visible, not just claimed.
- **Quality reports they can read themselves** — no more "we'll send the report tomorrow".
- **Their data, only their data** — clear, secure, scoped.
- **Branded as your company** — the portal feels like an extension of your service, not a third-party tool.

## Why companies turn the portal on

- **Fewer support calls** — customers answer their own "did you come yesterday?" questions.
- **Trust from the first login** — visible photos, signatures and reports build confidence faster than any sales pitch.
- **No extra work** — everything in the portal is generated automatically from the work you're already doing in SaberTask.
- **You stay in control** — turn it on per contact, turn it off any time, and never expose anything you don't want to.

---

*This document is maintained as the single source of truth for the Customer Portal page on the SaberTask website. When new customer-facing features ship, update the relevant section here first. Internal customer management features go in the Customer Management page document.*
