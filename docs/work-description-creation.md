# Work Description Creation — How It Works

## What is a Work Description?

A **Work Description** defines the cleaning/service tasks for a specific **department** at a specific **location**. There is exactly one work description per department per location (enforced by a unique database constraint on `LocationId + DepartmentId`).

The hierarchy is:

```
Location
 └── Work Description (scoped to one department)
      └── Work Area (a physical space, e.g. "Kitchen", "Lobby")
           └── Work Frequency (a schedule, e.g. "Every week, 2 hours")
                ├── Checklist Items (tasks to perform)
                └── Attachments (images/documents)
```

## Data Model

| Entity | Key Fields | Purpose |
|---|---|---|
| **WorkDescription** | LocationId, DepartmentId, IsActive | Container — one per department per location |
| **WorkArea** | Name, Notes, Price, SortOrder, AreaTypeId | A physical zone (e.g. "Reception") |
| **WorkFrequency** | ScheduleType, TimesPerPeriod, HoursPerInstance, DateRange | How often work happens in that area |
| **WorkChecklistItem** | ChecklistTaskId, SortOrder | A specific task within a frequency |
| **WorkFrequencyAttachment** | FileName, DataUrl | Supporting files attached to a frequency |

**Schedule types** include: EveryWeek, EvenWeeks, OddWeeks, Monthly 1st–4th week, and CustomMonthlyWeek (with comma-separated week numbers 1–52).

## Two Creation Paths

### Path 1: Manual Creation

1. User opens a **Location Popup** and navigates to the Work Descriptions tab
2. Clicks **"+ Create"** and selects a department
3. The system calls `POST /api/locations/{locationId}/work-descriptions` with the department ID
4. An empty, active work description is created
5. The **Work Description Builder Sidebar** opens — a full-screen overlay where the user manually adds areas, frequencies, checklist items, and attachments
6. All edits auto-save with a status indicator (saving/saved)

### Path 2: AI-Powered Document Import

1. User clicks **"Upload File"** (marked with an AI badge and cost tooltip)
2. Opens a **4-step dialog** (`CreateFromDocumentDialog`):
   - **Step 1** — Select department
   - **Step 2** — Upload a `.docx` or `.pdf` file (drag-drop, max 10 MB)
   - **Step 3** — Processing (backend extracts structure using Claude API)
   - **Step 4** — Review extracted preview, select which areas to import, commit
3. Backend flow:
   - `POST /api/locations/{locationId}/work-descriptions/from-document` creates an **inactive** work description and a `WorkDescriptionImportJob` (status: Pending)
   - A **Hangfire background job** (`DocumentExtractionJob`) picks it up:
     - Sets status to **Processing**
     - Calls the Claude API to extract structured data from the document
     - Performs **fuzzy matching** on area types and checklist tasks against existing database records (creating new checklist tasks if needed)
     - Stores the enriched JSON and sets status to **Completed** (or **Failed** with error)
   - Frontend polls for status, then fetches the preview via `GET /work-descriptions/{id}/import-job/preview`
4. User reviews the extracted data, selects which areas to keep, and clicks commit
5. `POST /work-descriptions/{id}/import` bulk-creates all WorkArea/WorkFrequency/WorkChecklistItem entities and activates the work description

**Import job retries**: Failed jobs can be retried up to 3 times before requiring a fresh upload.

## The Builder Sidebar

The `WorkDescriptionBuilderSidebar` is where all manual editing happens. It renders at the `MainLayout` level (above dialogs) and is opened via the `WorkDescriptionSidebarService`. Key features:

- **Add areas** inline with a text input
- **Drag-to-reorder** areas and frequencies (up/down buttons)
- **Collapsible area cards** showing name, notes, price, and frequency list
- **Frequency form** with schedule type, times per period, hours, optional date range, checklist items, and attachments
- **Copy frequency** to other areas within the same work description
- **Archive/unarchive** areas (soft delete)

## Relationships to Other Entities

- **Customer** owns **Locations**, which own **Work Descriptions**
- **Departments** are referenced by work descriptions (restrict delete — you can't delete a department that has work descriptions)
- **ChecklistTasks** are shared, department-scoped entities reused across work descriptions
- **AreaTypes** optionally categorize work areas
- **PlanEntries** can reference a work description (nullable FK) for scheduling
- All changes are logged as **LocationEvents** (`WorkDescriptionUpdated`) for audit trail

## API Endpoint Summary

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/locations/{id}/work-descriptions` | Create empty work description |
| POST | `/api/locations/{id}/work-descriptions/from-document` | Upload document for AI extraction |
| GET | `/api/locations/{id}/work-descriptions` | List work descriptions for a location |
| PUT | `/api/work-descriptions/{id}` | Toggle IsActive |
| GET | `/api/work-descriptions/{id}/areas` | Get full builder data |
| POST/PUT/DELETE | `.../areas`, `.../frequencies`, `.../checklist-items` | CRUD on nested entities |
| POST | `.../areas/reorder`, `.../frequencies/reorder` | Reorder operations |
| GET | `/api/work-descriptions/{id}/import-job/preview` | Get extracted import preview |
| POST | `/api/work-descriptions/{id}/import-job/retry` | Retry failed import |
| POST | `/api/work-descriptions/{id}/import` | Commit imported data |

All write endpoints require **Admin** or **Planner** roles. Everything is tenant-scoped for multi-tenancy.
