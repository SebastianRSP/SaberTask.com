# Invoicing & Billing in SaberTask

A complete overview of every SaberTask feature for turning completed work into invoices, sending them out, tracking their status and keeping an audit trail behind every change. This document is the source of truth for the **Invoicing & Billing** page on the SaberTask website.

> **Scope note:** SaberTask has dedicated pages for **Live Dashboard**, **Employee Management**, **Task Scheduling**, **Quality Controls** and **Customer Portal**. Anything that belongs there is intentionally not covered here.

> **How to read this document:** Each section starts with a short, marketing-ready description, followed by a feature list. Every feature notes whether it lives on the **web admin** (planners and managers), the **mobile app** (frontline workers), or **both**.

---

## At a glance

Invoicing in SaberTask is built right next to the work it bills for. Tasks become invoice lines, lines become invoices, invoices become PDFs and CSV exports — all without leaving the platform, and all backed by a full audit trail.

---

## 1. The invoices list

The starting point for everything billing-related.

- **Invoices page** at `/invoices` with one row per invoice and a clear total per row. *(Web)*
- **Status tabs** — All, Draft, Sent, Error, Archived — with badges showing how many are in each state. *(Web)*
- **Search** by customer name, customer number or address (debounced for fast typing). *(Web)*
- **Pagination** for companies that bill at scale. *(Web)*
- **Per-row actions** via a 3-dots menu — Edit, Send, Archive, Revert to Draft, Un-archive — adjusted automatically to the invoice's status. *(Web)*
- **Bulk selection** with checkboxes — select multiple invoices and act on them together. *(Web)*

---

## 2. Creating an invoice

A 2-step flow that takes seconds.

- **Customer picker dialog** (Step 1) — search for the customer you want to bill. *(Web)*
- **Wide invoice edit dialog** (Step 2) — opens with the new invoice already in Draft status, ready to fill in. *(Web)*
- **Sequential invoice numbers** — every tenant gets its own continuous numbering, generated automatically. *(Web)*
- **Per-customer history** — every invoice is linked to a customer record so the relationship is always clear. *(Web)*
- **No accidental deletes** — invoices can be archived but never deleted, so the financial trail stays intact. *(Web)*

---

## 3. Invoice lines

The line items where the actual money lives.

- **Multiple lines per invoice** with description, product type, quantity and unit price. *(Web)*
- **Live total** — the footer total updates as you type. *(Web)*
- **Drag-to-reorder** lines using a drag handle — order is saved instantly, no separate "save order" step. *(Web)*
- **Per-line CRUD** — add, edit and remove lines without leaving the dialog. *(Web)*
- **Decimal-safe** — quantities and unit prices are stored with high precision so VAT and rounding never drift. *(Web)*

---

## 4. Product types

Categorise lines so reporting and accounting integrations are clean.

- **Product types** — define categories like "Consulting", "Labour", or anything specific to your business. *(Web)*
- **Tenant-scoped** — every company has its own list. *(Web)*
- **Seeded defaults** — new tenants get sensible starting categories out of the box. *(Web)*

---

## 5. Status state machine

Invoices move through clear, enforced states — no surprises.

| From | To | Notes |
|---|---|---|
| **Draft** | **Sent** | Ready to send |
| **Draft** | **Archived** | Soft-remove drafts |
| **Sent** | **Draft** | Revert if you need to edit |
| **Archived** | **Draft** | Un-archive |
| **Error** | **Sent** or **Archived** | Recover from a failed external integration |

- **Editable only in Draft or Error** — Sent and Archived invoices are read-only by design, so the figures the customer saw are what stays in the system. *(Web)*
- **Revert to Draft** — undo a "Sent" action when you spot a mistake. *(Web)*
- **Archive instead of delete** — financial records are preserved forever. *(Web)*

---

## 6. Bulk actions

For companies that bill in batches.

- **Bulk actions bar** appears as soon as you tick a checkbox. *(Web)*
- **Bulk archive** — clean up multiple drafts at once. *(Web)*
- **Bulk CSV export** — export the selection as a single file. *(Web)*

---

## 7. CSV export

For accountants, ERP imports, and the people who really love spreadsheets.

- **One-click CSV export** from the topbar or the bulk actions bar. *(Web)*
- **All key columns** — Customer Name, Customer Number, Invoice Number, Invoice Date, Total Price. *(Web)*
- **Direct download** — the file lands in your downloads folder, no email round-trip. *(Web)*

---

## 8. Audit timeline

Every invoice carries its full history with it.

- **Per-invoice audit timeline** — see who did what, when, in chronological order. *(Web)*
- **Status changes recorded** — every Draft → Sent → Archived transition is timestamped. *(Web)*
- **Edits captured** — header changes, line adds/edits/removes and reorderings are all part of the trail. *(Web)*
- **Compliant by default** — no extra setup needed; the audit trail is on for every tenant. *(Web)*

---

## 9. Auto-invoice on task finish

Stop typing the same line item over and over.

- **Auto-invoice on task finish** — when configured, completing a task can drop a line straight onto an invoice for that customer. *(Web)*
- **Configurable per task or service** — turn it on for the work where it makes sense and leave it off where it doesn't. *(Web)*
- **No double-entry** — the work that the team did becomes the line that the customer pays for, automatically. *(Web)*
- **Editable before sending** — auto-generated lines land in Draft and can be reviewed and adjusted before going out. *(Web)*

---

## 10. Multilingual & multi-currency-ready

Built for cross-border businesses and multilingual teams.

- **English and Danish out of the box**, with full localisation across the entire invoicing UI. *(Web)*
- **Per-user language** — every accountant uses the system in their own language. *(Web)*
- **Decimal-safe pricing** — quantities and prices stored with the precision needed for VAT and accurate totals. *(Web)*

---

## 11. Connected to the rest of SaberTask

Invoicing isn't an island.

- **Customer-linked** — every invoice belongs to a customer record managed elsewhere in SaberTask.
- **Task-aware** — invoices can be generated from completed tasks via auto-invoice rules.
- **Audit-trail consistent** — invoice history uses the same audit infrastructure as the rest of the platform.
- **Role-aware** — only the right roles can send, revert or archive, while everyone authorised to view can search and read.

---

## What it looks like for each role

**For a finance manager or admin:**
Search and filter invoices by status, send, revert, archive and bulk-export — all from one page. Use the audit timeline to answer "who changed what" without picking up the phone.

**For an accountant:**
Use CSV export to feed your accounting system, drag invoice lines into the right order before sending, and rely on the immutability of Sent invoices to keep the trail clean.

**For a planner or operations lead:**
Trust that completed work flows into invoices automatically when auto-invoice is configured, so you can focus on running the operation rather than chasing paperwork.

---

## Why Invoicing in SaberTask is different

- **In the same system as the work** — the line items come from the jobs your team actually did.
- **Immutable when it matters** — Sent invoices can't be edited, only reverted, so figures don't drift.
- **Fully audited** — every change is timestamped and named, automatically.
- **Drag-and-drop fast** — line ordering, status changes and bulk actions are designed for the speed of a real billing day.
- **No extra integration to start** — invoicing works the moment a customer turns it on, with CSV export to bridge into anything else.
- **Multilingual** — built for teams that work across languages.

---

*This document is maintained as the single source of truth for the Invoicing & Billing page on the SaberTask website. When new invoicing, billing or accounting-integration features ship, update the relevant section here first.*
