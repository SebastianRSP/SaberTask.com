# Task Scheduling in SaberTask

A complete overview of every SaberTask feature that helps you plan, schedule, route and complete the work — from a high-level weekly plan all the way down to a single worker driving to their next stop. This document is the source of truth for the **Task Scheduling** page on the SaberTask website.

> **Scope note:** SaberTask has dedicated pages for **Live Dashboard**, **Employee Management**, **Quality Controls**, **Invoicing & Billing** and **Customer Portal**. Anything that belongs there (live monitoring, rosters, inspection forms, billing, customer self-service) is intentionally not covered here.

> **How to read this document:** Each section starts with a short, marketing-ready description, followed by a feature list. Every feature notes whether it lives on the **web admin** (planners and managers), the **mobile app** (frontline workers), or **both**.

---

## At a glance

Task Scheduling in SaberTask spans the whole journey of a job: defining what needs to happen at a customer's location, building a reusable weekly plan, generating today's tasks for the right team, drafting an optimised route, navigating it from a phone, capturing the proof of work, and signing it off — all in one platform.

---

## 1. Work descriptions (defining the work)

Before anything can be scheduled, SaberTask lets you describe exactly what needs to happen at each customer location.

- **Three-level work hierarchy** — Areas (physical spaces) → Frequencies (how often) → Checklist Items (individual tasks). *(Web)*
- **Work Description Builder dialog** — open it from any location row on a customer page, build the whole work scope in one place. *(Web)*
- **Eight scheduling frequencies** — every week, even weeks, odd weeks, monthly 1st–4th week, or a custom monthly week, with optional annual date ranges. *(Web)*
- **Hours and minutes per visit** — set times-per-period and hours-per-instance so estimates and billing can be calculated automatically. *(Web)*
- **Shared task library with fuzzy search** — reuse common checklist items across customers, with inline create-on-the-fly. *(Web)*
- **Image and drawing attachments** — pin photos or sketches to a frequency so workers see exactly what's expected. *(Web)*
- **Drag-and-drop reordering** at every level — areas, frequencies and checklist items. *(Web)*
- **Copy-to-area** — duplicate a frequency (with all its checklist items) to another area in the same location. *(Web)*

---

## 2. Weekly plans (the recurring template)

Once the work is defined, planners build a weekly plan that says *who* does *what* on *which day*.

- **Planning page** at `/planning` — a 7-column grid (Sun–Sat) per team card. *(Web)*
- **Plan lifecycle** — Draft → Scheduled → Active → Archived. Only one plan is Active per department. *(Web)*
- **Auto-activation** — schedule a plan to go live on a future date and SaberTask flips it on automatically overnight. *(Web)*
- **Copy from existing plan** — start a new plan from an existing one and adjust. *(Web)*
- **3-step add-entry modal** — search a work description, pick the work areas, choose team and day. *(Web)*
- **Drag-and-drop entries** within and between days, and between teams. *(Web)*
- **Bulk actions** — select multiple entries and move them to another team, day, or remove them all at once. *(Web)*
- **Frequency filter** — toggle the view by All / Even / Odd / Monthly week so totals reflect the right scheduling rule. *(Web)*
- **Live hours and DKK totals** per team and per day, so the plan stays balanced and profitable. *(Web)*
- **Search** to filter visible entries; team cards with no matches collapse out of the way. *(Web)*

---

## 3. Tasks (the day-of-work units)

Plans turn into actual tasks that workers can pick up.

- **Task list and assignment** — planners create tasks with title, description, location, customer, scheduled date, estimated time and price type, and assign them to workers or teams. *(Web)*
- **Recurring task generation** — tasks are generated automatically from service agreements and work descriptions on the right schedule (daily, weekly, monthly, custom). *(Web)*
- **Status lifecycle** — Draft → Scheduled → In Progress → Completed → Cancelled, with full history. *(Web)*
- **Task detail view** — full information for the job: customer contact, location, attachments, manager and worker notes, signatures and audit history. *(Both)*
- **Quick reassignment** — drag a task to a different team or day from the planning grid. *(Web)*

---

## 4. Mobile calendar

Workers don't need to wait for a printed schedule — they see their work on a calendar in their pocket.

- **Worker calendar** with month and week views on the mobile app. *(Mobile)*
- **Tasks and shifts together** — a single calendar view shows everything that's scheduled. *(Mobile)*
- **Team calendar** — see what the rest of your team is doing alongside your own day. *(Mobile)*
- **Per-day summary** — counts of scheduled, draft and completed work at a glance. *(Mobile)*
- **Live data** — anything a planner changes on the web is reflected on the worker's calendar instantly. *(Mobile)*

---

## 5. Smart route-optimised scheduling

For field teams, SaberTask drafts schedules that respect distance, daily work hours and capacity — not just a list of jobs.

- **Schedule drafts** — generate optimised draft schedules for a team across the days ahead. *(Both)*
- **Multi-stop optimisation** — order tasks by location to minimise drive time. *(Both)*
- **Daily capacity & blocked dates** — drafts respect each day's working hours and any blocked dates. *(Both)*
- **Estimates per task** — drafts use the time estimates from the work description so the day stays realistic. *(Both)*
- **Faktor minutes (piece-rate / akkord)** — drafts can be built around piece-rate work, not just hourly. *(Both)*
- **Re-optimise on demand** — change a parameter and re-run the optimisation. *(Both)*
- **Confirm and publish** — once a draft looks right, confirm it and the tasks land on the team. *(Both)*

---

## 6. Draw-route planning

Sometimes a planner just wants to draw the route on a map.

- **Draw routes on a map** — define a route by drawing it directly in the web app. *(Web)*
- **Save and reuse drawings** — drawn routes are stored and can be re-applied. *(Web)*
- **Hand off to mobile** — drawn routes feed straight into the worker's route navigation. *(Both)*

---

## 7. Mobile route navigation

Workers run their day from a single mobile screen.

- **Today's route overview** — every stop in order, with addresses, customers and estimates. *(Mobile)*
- **Turn-by-turn navigation** — start the route and SaberTask guides you stop to stop. *(Mobile)*
- **Live GPS tracking** — distance driven, completion percentage, and time on route updated in real time. *(Mobile)*
- **Pause / resume / end route** — full control of the session from the field, with reasons captured. *(Mobile)*
- **Drawn-route awareness** — when a planner drew the route, the same shape shows up on the worker's map. *(Mobile)*
- **Offline-tolerant** — the app keeps working through patchy coverage and syncs once back online. *(Mobile)*

> *Live route monitoring for managers lives on the **Live Dashboard** page.*

---

## 8. On-site task work

When the worker arrives at the job, the task screen is their workspace.

- **Mobile task detail page** — the full job, ready to work on, with one-tap actions. *(Mobile)*
- **Check in / check out** at the location, with optional GPS capture. *(Mobile)*
- **Worker notes** — add context that the office should see. *(Mobile)*
- **License plate / vehicle capture** — quick fields for fleet-related jobs. *(Mobile)*
- **Photo and document attachments** — upload from the camera or files in seconds. *(Mobile)*
- **Customer signature capture** — the customer signs on the phone screen and the signature is attached to the task. *(Mobile)*
- **Mark complete** — finish the task and move on to the next one. *(Mobile)*

---

## 9. Akkord (piece-rate) planning

For businesses that pay per job rather than per hour.

- **Akkord-aware planning** — schedule tasks so each worker's piece-rate earnings are visible while the day is built. *(Both)*
- **Faktor minutes** at the team level — configure a team for piece-rate work and SaberTask handles the maths. *(Both)*
- **Live earnings preview** for workers as the day's tasks are completed. *(Mobile)*

> *Approval of akkord payments by managers lives on the **Employee Management** page.*

---

## 10. Connected to the rest of SaberTask

Task Scheduling doesn't live in a silo.

- **Auto-invoice on task finish** — when configured, completing a task can drop straight into invoicing as a line item. *(Web)*
- **Quality reports on completion** — workers can finalise an inspection report against the same task in the mobile app.
- **Customer-visible scheduling** — customers with portal access see the upcoming tasks for their locations on the Customer Portal.
- **Live monitoring** — every task and route session feeds the Live Dashboard.

---

## What it looks like for each role

**For a planner:**
Build the work description for each location once, draft a weekly plan for each team, let recurring task generation do the rest, and intervene only when something changes. Use the planning grid to balance hours and revenue across days.

**For a department head:**
Watch your teams' progress on the dashboard, reassign tasks via drag-and-drop when reality diverges from the plan, and re-optimise drafts when needed.

**For a frontline worker:**
Open the mobile app, see today's stops in optimised order, start navigation, check in at each location, capture proof of work, get the customer's signature, and mark the task complete.

---

## Why Task Scheduling in SaberTask is different

- **One platform, end to end** — work descriptions, plans, tasks, routes, navigation, on-site work and proof of work in one product.
- **Built for routes** — the scheduler understands distance and capacity, not just a list of jobs.
- **Recurring is first-class** — service agreements and work descriptions generate the right tasks on the right day automatically.
- **Akkord-ready** — piece-rate pay isn't bolted on; it's a first-class concept across planning, scheduling and salary.
- **Mobile is real** — field workers run their entire day from the phone, not a printout.

---

*This document is maintained as the single source of truth for the Task Scheduling page on the SaberTask website. When new scheduling, planning, routing or on-site features ship, update the relevant section here first.*
