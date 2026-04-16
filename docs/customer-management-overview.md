# Customer Management in SaberTask

A complete overview of every SaberTask feature for managing the *customer side* of your business — from the first time you add a customer record, to the locations they own, the contacts who work there, the documents you exchange, the services you've agreed to deliver, and the precise scope of work at every site. This document is the source of truth for the **Customer Management** page on the SaberTask website.

> **Scope note:** SaberTask has dedicated pages for **Live Dashboard**, **Employee Management**, **Task Scheduling**, **Quality Controls**, **Invoicing & Billing** and **Customer Portal**. This page covers the *internal* CRM features. The **Customer Portal** page describes what your customers see when *they* log in.

> **How to read this document:** Each section starts with a short, marketing-ready description, followed by a feature list. Every feature notes whether it lives on the **web admin** (planners and managers), the **mobile app** (frontline workers), or **both**.

---

## At a glance

Customer Management in SaberTask is the structured backbone of your service business: every customer, every location they own, every contact you talk to, every document you exchange, every service agreement you've signed and every detail of the work you've promised — all in one place, all linked to the operational data that runs the day.

---

## 1. The customer database

Every customer in one searchable place, no spreadsheets.

- **Customers list** — search, filter and open every customer record from a single page. *(Web)*
- **Customer numbers** — unique, sequential numbering per tenant. *(Web)*
- **Customer detail page** with tabs for Contacts, Locations, Service Agreements, Files and more. *(Web)*
- **Multi-tab organisation** — every facet of a customer is one click away from any other. *(Web)*
- **Tenant-scoped** — every company gets their own customer database, completely isolated. *(Web)*

---

## 2. Locations

A customer is rarely just one address. SaberTask treats locations as first-class.

- **Multiple locations per customer** — track every site you service for the same customer. *(Web)*
- **Address & metadata** — full address, contact details and any notes that matter to the team on the ground. *(Web)*
- **Locations tab** on every customer page — list, add, edit and open. *(Web)*
- **Used everywhere** — locations are referenced by tasks, plans, work descriptions, quality reports and invoices, so the data is always consistent. *(Both)*

---

## 3. Contacts

Real people, on the customer side, who you actually talk to.

- **Multiple contacts per customer** — sales, ops, finance and the people on site. *(Web)*
- **Contact details** — name, email, phone, role. *(Web)*
- **Dashboard access toggle** — flag a contact as a portal user with one click and grant them self-service access to their own data. *(Web)*
- **Send dashboard invite** — email the invite directly from the contact row. *(Web)*
- **Visibility into who has access** — every contact row shows whether portal access is currently on or off. *(Web)*

> *The portal experience itself is described on the **Customer Portal** page.*

---

## 4. Work descriptions per location

The most detailed level of "what we do for this customer" — site by site.

- **Work Description Builder dialog** — open it from any location row to define the entire scope of work for that site. *(Web)*
- **Three-level hierarchy** — Areas (physical spaces) → Frequencies (schedules) → Checklist Items (individual tasks). *(Web)*
- **Eight scheduling frequencies** — every week, even/odd weeks, monthly 1st–4th, custom monthly, with optional annual date ranges. *(Web)*
- **Hours per visit and times per period** — drives realistic estimates and accurate billing. *(Web)*
- **Shared task library with fuzzy search** — reuse common checklist items across customers, with inline create. *(Web)*
- **Image and drawing attachments** — pin photos or sketches to a frequency so workers see exactly what's expected. *(Web)*
- **Drag-and-drop reorder** at every level. *(Web)*
- **Copy frequency to another area** — duplicate a frequency (with all checklist items) to another area in the same location. *(Web)*

> Work descriptions are the data that **Task Scheduling** uses to generate the right work on the right day. One source of truth, used everywhere.

---

## 5. Service agreements

The contracts behind the recurring work.

- **Service agreements tab** on every customer page — every agreed-on service in one place. *(Web)*
- **Per-customer agreements list** — agreement number, scope, frequency and status at a glance. *(Web)*
- **Drives recurring task generation** — agreements feed the recurring task pipeline so the right tasks land on the right day automatically. *(Web)*
- **Linked to locations and work descriptions** — the agreement, the site and the scope are all connected. *(Web)*
- **Agreement number visible to customers** — appears on the customer portal task detail so the customer can match it to their own records. *(Both)*

---

## 6. Customer file storage

A document vault per customer, with AI-powered search.

- **Files tab** on every customer page — drag and drop files to upload. *(Web)*
- **Multi-file upload** with per-file progress, tags and an AI extraction notice. *(Web)*
- **Tag-based filtering & autocomplete** — reusable tenant-level tags applied at upload or edit. *(Web)*
- **Full-text search** across filename, tags, and the *contents* of every uploaded document. *(Web)*
- **AI content extraction** — PDFs are extracted with PdfPig, images are described automatically using Claude Haiku, so even photos become searchable. *(Web)*
- **Match snippets** — search results show 150-character snippets of where the term was found. *(Web)*
- **Editable metadata** — update display names and tags any time. *(Web)*
- **Secure download links** — every download uses a short-lived (5-minute) signed URL. *(Web)*
- **Live processing status** — files show a "Processing" badge while extraction runs, automatically clearing once it finishes. *(Web)*
- **Audit history timeline** — view every upload and delete event for a customer in one place. *(Web)*
- **Tenant-isolated storage** — files live in per-tenant private cloud storage, never shared between companies. *(Web)*
- **Worker view** — workers can view and download files they need for the job, but uploads, edits and deletes are restricted to admins, planners and department heads. *(Both)*

---

## 7. Audit & history

Customer data is precious. SaberTask treats it that way.

- **Per-customer file timeline** — see who uploaded, edited or deleted what, in chronological order. *(Web)*
- **Tenant-scoped query filters** — every read of every customer record is filtered by tenant in the database, not the application code. *(Web)*
- **Soft-delete defaults** — important records are archived rather than removed, so the history is preserved. *(Web)*

---

## 8. One source of truth, used everywhere

Customer data isn't a silo — it's the spine of the rest of SaberTask.

- **Tasks** are linked to a customer and a location. *(Both)*
- **Plans and work descriptions** drive the recurring task generator. *(Both)*
- **Quality reports** are filled against locations. *(Both)*
- **Invoices** are billed to a customer record. *(Web)*
- **The Customer Portal** projects exactly the slice of this data that the customer is allowed to see. *(Both)*

---

## 9. Roles & permissions

Customer data is some of the most sensitive in the platform — and is protected accordingly.

- **Role-aware editing** — admins, planners and department heads can manage customers, locations, contacts and files. *(Web)*
- **Read-only for workers** — workers can see what they need for the job, without the ability to change customer records. *(Both)*
- **Customer-role exclusion** — the Customer role (used for the portal) is explicitly denied access to every internal customer endpoint. *(Web)*
- **Multi-tenant isolation** — every record is scoped to its owning company; one customer of yours can never see the data of another customer of yours. *(Web)*

---

## 10. Multilingual

Customer Management speaks every language your team does.

- **English and Danish out of the box**, with more languages on the roadmap. *(Web)*
- **Per-user language preference** — every team member uses the customer database in their own language. *(Web)*

---

## What it looks like for each role

**For an account manager:**
Open a customer, see all their locations, contacts and active service agreements at a glance. Grant a contact portal access in one click, upload a contract to the files tab, and search across every document you've ever exchanged with that customer.

**For an operations lead:**
Define the scope of work for a new location once in the Work Description Builder, link it to a service agreement, and trust that the rest of SaberTask will generate the right tasks on the right day from that point onwards.

**For a planner:**
Use customer locations and work descriptions as the source of truth that drives weekly plans, recurring tasks, mobile calendars and route drafts.

**For a frontline worker:**
See the customer name, location and address on every task, and download any reference files attached to the customer when you need them on site.

---

## Why Customer Management in SaberTask is different

- **Customers, locations and work scope as one model** — not three loosely-connected apps.
- **Work descriptions are first-class** — the scope of work isn't a PDF in a folder; it's structured data that drives scheduling, estimates and billing.
- **AI-searchable file storage** — even handwritten notes and contract photos become searchable text without extra setup.
- **Built for multi-location customers** — every feature understands that one customer can have many sites.
- **Secure by design** — tenant isolation, signed downloads, role-aware access, customer-role exclusion.
- **The spine of the platform** — every other SaberTask page (Tasks, Quality, Invoices, Live Dashboard, Customer Portal) reads from the same customer data, so nothing ever drifts out of sync.

---

*This document is maintained as the single source of truth for the Customer Management page on the SaberTask website. When new CRM, location, work-description, agreement or file-storage features ship, update the relevant section here first. Customer-facing portal features go in the Customer Portal page document.*
