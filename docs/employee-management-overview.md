# Employee Management in SaberTask

A complete overview of every SaberTask feature that helps you run your team — from the moment a new hire is invited, through every shift, sick day, message and pay slip. This document is the source of truth for the **Employee Management** page on the SaberTask website.

> **Scope note:** SaberTask has dedicated pages for **Live Dashboard**, **Task Scheduling**, **Quality Controls**, **Invoicing & Billing** and **Customer Portal**. Anything that belongs on those pages (route navigation, task assignment, quality reports, invoicing, customer-facing features) is intentionally not covered here.

> **How to read this document:** Each section starts with a short, marketing-ready description, followed by a feature list. Every feature notes whether it lives on the **web admin** (planners and managers), the **mobile app** (frontline workers), or **both**.

---

## At a glance

SaberTask gives you a single place to onboard employees, organise them into departments and teams, plan their shifts, track their hours, run payroll, manage sick leave and keep everyone in the loop through built-in messaging. The web app is built for the back office; the mobile app is built for the people on the road and on the floor — and they share the same live data in real time.

---

## 1. Onboarding & accounts

Get new employees from "hired" to "working" in minutes — without paper forms, shared logins, or IT tickets.

| Feature | What it does | Where |
|---|---|---|
| **Email invites** | Admins invite employees by email. The recipient clicks a secure link, sets their password and lands on their first day already logged in. | Both |
| **Multi-tenant login** | Workers who help out across multiple companies sign in once and pick which organisation to enter. | Both |
| **Password change & reset** | Employees can change their password from the app, or reset it themselves through email if they forget. | Both |
| **Email change with verification** | Workers can update the email on their account, with a verification step to keep the account safe. | Both |
| **Language preferences** | Each employee picks their own UI language (English, Danish, and more). Notifications follow the same preference. | Both |
| **Active / inactive status** | Deactivated employees can no longer clock in or be scheduled — without losing any of their history. | Web |
| **Roles & permissions** | Built-in roles for Admin, Planner, Department Head, Worker-with-Planning and Worker, each with the right level of access. | Both |

---

## 2. Employee profiles

Every employee has a single profile that follows them across the platform.

- **Self-service profile editing** — workers update their own name, phone number, photo and language from the mobile app. *(Mobile)*
- **Admin employee directory** — search, filter and manage the full team from the web. Filter by role, status, department or team. *(Web)*
- **Profile photos** — upload from the phone camera or from a file, instantly visible everywhere the employee appears. *(Both)*
- **Role badges** — clear visual indication of who can do what across the system. *(Both)*

---

## 3. Departments & teams

Organise your workforce the way your business actually runs.

- **Departments** — create organisational units, assign a department head, give each one a colour and product type. *(Web)*
- **Teams** — group workers into teams underneath each department for rostering and communication. *(Web for setup, Mobile for viewing)*
- **Team members & memberships** — workers can belong to multiple teams; admins manage memberships inline under each department. *(Web)*
- **Faktor minutes (piece-rate teams)** — configure a team for piece-rate / accord work and let SaberTask handle the maths. *(Both)*

---

## 4. Shifts & rostering

The shift scheduler is the heart of SaberTask for any business that runs on rosters.

### For planners (web)

- **Shift Scheduler page** — week-at-a-glance view of every employee's shifts. Drag, drop, edit and bulk-update.
- **Create shift dialog** — fast shift creation with date, time, type and assignee.
- **Shift templates** — save recurring shift patterns once and apply them in one click.
- **Bulk actions** — select multiple shifts and edit, delete or reassign them at once.
- **Shift overview popup** — see everything about an employee's shift on hover, including history.
- **Shift detail dialog** — full audit history for any shift, including edits, approvals and clock data.
- **Shift types** — define your own shift types (Regular, Overtime, Night, Sick Leave, etc.) with their own pay rules.
- **Shift approval workflow** — review clock-in/out times, location data, comments and audit history before approving a shift for payroll.

### For workers (mobile)

- **My shifts on the home screen** — every upcoming shift with one-tap clock in.
- **Shift comments** — add a note to a shift before, during or after it.
- **Shift history** — review past shifts and the hours that will land on the next pay slip.

---

## 5. Time tracking (clock in / clock out)

Reliable, location-aware time tracking — from any phone.

- **One-tap clock in / clock out** from the mobile home screen. *(Mobile)*
- **Optional location capture** — record where each clock event happened, configurable per tenant. *(Mobile)*
- **"Clock in without location" allowance** — for sites with poor GPS, admins can let workers clock in anyway. *(Both)*
- **Comments on clock events** — workers can explain a late start or an early finish when they clock in or out. *(Mobile)*
- **Automatic break deductions** — pause rules deduct unpaid breaks based on shift length and shift type so payroll is right the first time. *(Web for setup)*
- **Audit trail** — every clock event is logged with timestamp, location and any comment, ready for review and approval. *(Both)*

---

## 6. Sick leave

Make absence reporting honest, fast and stress-free for everyone.

### Workers register from their phone

- **Self-service sick leave** — workers report sick from the mobile app in seconds, with optional notes and end date. *(Mobile)*
- **Active sick leave card** — see and manage the current sick leave from the home screen. *(Mobile)*
- **History** — every past sick spell, fully transparent. *(Mobile)*
- **End sick leave** — close an active sick leave the moment the worker is back. *(Mobile)*

### Admins stay in control

- **Manage sick leave for any employee** — create, edit or end sick leave on behalf of a worker. *(Web)*
- **Automatic shift conversion** — shifts that fall inside a sick leave period are automatically converted to the configured "Sick Leave" shift type, so payroll stays correct. *(Both)*
- **Sick leave analytics** — sick leave percentage, total sick hours, occurrences, calendar days and the longest sick spell, per employee or company-wide, with date range filters. *(Web)*

---

## 7. Salary & payroll visibility

Workers can see exactly what they will be paid, the moment they clock out.

- **Earnings summary** on the mobile salary screen — gross hours, break deductions, net payable hours, and the resulting amount per shift type. *(Mobile)*
- **Period navigation** — flip through past, current and upcoming pay periods. *(Mobile)*
- **Accord / commission earnings** — piece-rate work is calculated and shown alongside regular hours. *(Mobile)*
- **Accord approvals** — managers approve or adjust commission/piece-rate payments before they're paid out. *(Web)*
- **Salary period configuration** — admins set the company's pay periods and rules once, and they apply everywhere. *(Web)*

---

## 8. Messages & team chat

A modern messaging experience purpose-built for shift workers, so you don't need a separate chat app for work.

- **Direct messages** between any two employees. *(Both)*
- **Group chats** for ad-hoc conversations. *(Both)*
- **Team chats** that follow your team structure. *(Both)*
- **File attachments** — share photos and documents in any conversation. *(Both)*
- **Unread counts & read receipts** — workers always know what's new. *(Both)*
- **User search** — find any colleague in the company to start a new conversation. *(Both)*
- **Message history** — searchable, persistent, and synced between web and mobile. *(Both)*

---

## 9. Notifications

Make sure the right people get the right information at the right time.

- **Push notifications** to the mobile app for new messages, shift assignments, sick leave updates, and more. *(Mobile)*
- **In-app notifications** with a notification history that workers can mark as read. *(Both)*
- **Notification rules** — admins decide which events trigger notifications, for which roles, and on which channels. *(Web)*
- **Per-employee preferences** — workers can adjust their own notification settings and language. *(Both)*

---

## 10. Workforce settings

The configuration that makes SaberTask fit your company's HR and payroll rules.

- **Pause rules** — define when breaks are deducted automatically, by shift length and shift type. *(Web)*
- **Shift type configuration** — name them, colour them, set their pay behaviour. *(Web)*
- **Salary periods** — set the company's pay cycle once, and the rest of the platform follows. *(Web)*
- **Sick leave shift type** — pick the shift type that absence hours convert to. *(Web)*
- **Clocking rules** — decide whether location is required to clock in, and configure exceptions. *(Web)*

---

## What it looks like for each role

**For an admin or HR manager (web):**
Onboard new employees, organise them into departments and teams, build the shift roster, configure pay periods and break rules, approve sick leave and accord payments, and run sick-leave analytics — all from a single dashboard.

**For a department head (web + mobile):**
Approve shifts and commissions for your team, register sick leave on a worker's behalf, and stay in the loop through messages.

**For a frontline worker (mobile):**
Open the app, see today's shifts, clock in with one tap, message the office, report sick if needed, and check exactly what you'll be paid this period — all from a phone.

---

## Why employees actually use it

- **One app for the working day** — shifts, time tracking, payroll visibility, sick leave and messaging in a single place.
- **Honest pay** — workers can see their hours and earnings live, building trust in payroll.
- **Designed for the field** — big tap targets, fast clock-in, works with intermittent connectivity.
- **Multilingual** — every employee uses the app in their preferred language.
- **Transparent absence flow** — sick leave is reported in seconds and converted to the right shift type automatically.
- **Real-time sync** — anything a planner changes on the web is on the worker's phone instantly, and vice versa.

---

*This document is maintained as the single source of truth for the Employee Management page on the SaberTask website. When new employee-facing features ship, update the relevant section here first. Features that belong to Live Dashboard, Task Scheduling, Quality Controls, Invoicing & Billing or Customer Portal go in their own page documents.*
