# SaberTask Marketing-Site Signup Integration

> Copy this file into the **marketing-site repo** (rename to `CLAUDE.md` at the repo root so Claude Code auto-loads it). This describes the contract between the Vercel-hosted marketing site and the SaberTask platform API.

---

## What the marketing site owns

**One job: collect `{firstName, lastName, email, password}` and hand off to the platform.**

The marketing site does **not**:
- Collect business settings (company name, currency, timezone, logo, etc.)
- Collect a credit card
- Talk to Stripe
- Hold any database state
- Store a JWT

Business settings and card capture happen **inside the authenticated app** (`app.sabertask.com`) via a blocking onboarding modal that the platform renders after the user verifies their email. This keeps the marketing site tiny and keeps the sensitive surface (Stripe keys, DB, auth state) inside the platform.

## The flow, end-to-end

```
[marketing site]                    [platform API]                    [email]              [app.sabertask.com]
     │                                    │                              │                          │
  Step 1 ─ user fills form ───────────────│                              │                          │
     │   POST /api/public/signup         │                              │                          │
     │   {firstName,lastName,email,      │                              │                          │
     │    password,locale,timezone,      │                              │                          │
     │    country,captchaToken}          │                              │                          │
     │ ──────────────────────────────── ▶│                              │                          │
     │                                    │── writes PendingSignup ─────▶│                          │
     │                                    │   (no tenant, no user yet)   │                          │
     │                                    │── sends verify email ───────▶│                          │
     │◀ 200 {email, message}             │                              │                          │
     │                                    │                              │                          │
  Step 2 ─ "Check your email" screen     │                              │                          │
     │                                    │                              │                          │
     │                                    │                              │── user clicks link ────▶│
     │                                    │                              │                        │
     │                                    │◀── POST /api/public/signup/verify ─────────────────── │
     │                                    │   {token}                                             │
     │                                    │                                                       │
     │                                    │── materializes Tenant + admin User ──                 │
     │                                    │── deletes PendingSignup ──                            │
     │                                    │── mint JWT + refresh ──                               │
     │                                    │──────── AuthResponse ──────────────────────────────▶  │
     │                                    │                                                       │
     │                                    │                                            store JWT, redirect to /
     │                                    │                                            app sees OnboardingCompleted=false
     │                                    │                                            renders onboarding modal
     │                                    │                                            (Step 2: business, Step 3: card)
```

The marketing site's scope ends when it shows the "Check your email" screen. Everything after that happens on `app.sabertask.com` and is handled by the platform team.

## Environments

| Env | Marketing domain (you) | Platform API | App domain |
|---|---|---|---|
| dev | e.g. `localhost:3000` or a Vercel preview | `https://api-dev.sabertask.com` | `https://app2.sabertask.com` |
| prod | `https://www.sabertask.com` | `https://api.sabertask.com` | `https://app.sabertask.com` |

Wire these as `NEXT_PUBLIC_API_BASE_URL` (or similar) in Vercel — **never** hardcode.

**Confirm the exact dev API URL with the platform team before shipping** — the value above is a placeholder. Both marketing domains are already in the platform's CORS allowlist.

## Endpoints

All endpoints are `[AllowAnonymous]`, JSON request + JSON response, and CORS-allowed for the marketing domain.

### `POST {API_BASE}/api/public/signup/check-email`

Called on **blur** of the email field on Step 1 so the form can show a "this email already exists" error before the user continues. Rate-limited to 10/min per IP.

**Request:**
```json
{
  "email": "anna@example.com",
  "captchaToken": "<cloudflare-turnstile-token>"
}
```

**Response 200:**
```json
{ "available": true }
```

**Response 400:** `{ "error": "..." }` (bad email or failed captcha).

### `POST {API_BASE}/api/public/signup`

Called on Step 1 submit. Creates the tenant + admin user and sends a verification email. Rate-limited to 3/min per IP.

**Request:**
```json
{
  "firstName": "Anna",
  "lastName": "Jensen",
  "email": "anna@example.com",
  "password": "CorrectHorseBatteryStaple!",
  "locale": "da",
  "timezone": "Europe/Copenhagen",
  "country": "DK",
  "captchaToken": "<cloudflare-turnstile-token>"
}
```

Field notes:
- `locale` — use `navigator.language` → first 2 chars (e.g. `"da"`). Platform supports `en`/`da`/`sv`; unknown values default to `en`.
- `timezone` — use `Intl.DateTimeFormat().resolvedOptions().timeZone`.
- `country` — optional. If omitted, the platform reads Cloudflare's `CF-IPCountry` header instead. Pass an ISO alpha-2 code (e.g. `"DK"`, `"SE"`, `"US"`) if you have one.
- `password` — must meet platform policy: **10+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special**. Show the rules inline; the API returns the exact failing rule(s) on 400.
- `captchaToken` — Cloudflare Turnstile response token (see below).

**Response 200:**
```json
{
  "email": "anna@example.com",
  "message": "Check your email to verify your account."
}
```

**Response 400:** `{ "error": "..." }` or `{ "errors": ["Password must be at least 10 characters.", ...] }`.

**Response 409:** `{ "error": "An account with this email already exists." }` — a user slipped past the blur check (race condition or they disabled JS).

### `POST {API_BASE}/api/public/signup/resend-verify`

Optional. Called from the "Check your email" screen if the user clicks "Didn't get it? Resend". Rate-limited to 10/min per IP.

**Request:** same shape as `check-email`.

**Response 200:** always returns a generic message — the API intentionally doesn't reveal whether the email has a pending signup, to avoid leaking enumeration info.

## Cloudflare Turnstile (captcha)

The API verifies the token server-side against Cloudflare's siteverify endpoint.

**Marketing-site setup:**
1. Ask the platform team for the **site key** (safe to ship in browser bundle).
2. Add the Turnstile widget to the signup form:
   ```html
   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
   <div class="cf-turnstile" data-sitekey="{SITE_KEY}" data-callback="onCaptcha"></div>
   ```
3. On submit, grab the token: `turnstile.getResponse(widgetId)` (or read from the callback).
4. Pass it as `captchaToken` on every request to the API.

The API fails closed — if Turnstile's siteverify is down, the request is rejected. Don't build a fallback; that's what the rate limiter is for.

**Local dev tip:** if the API is running without `Turnstile:SecretKey` configured, captcha verification is skipped (tokens are accepted even if empty). You still have to render the widget so the marketing-site code path works, but you can pass any string.

## Recommended form UX

**Step 1 — single screen:**
- First name
- Last name
- Email — validate on blur (`/check-email`), show red border + "An account with this email already exists. [Log in instead](https://app.sabertask.com/login)" if taken
- Password — with a rules panel that lights up as each rule is met
- Turnstile widget (invisible is fine)
- Submit button, disabled until all valid + captcha ready

**After submit:**
- Show a "Check your email" screen: big checkmark, "We sent a verification link to **anna@example.com**. Click it to continue."
- Include a "Didn't get it? Resend" button (calls `/resend-verify`, disabled for 30s after click)
- Include a "Wrong email? Go back" link (returns to form, prefilled)

**Don't** try to poll the API to detect verification. The user will click the email link on whatever device they open their email on; the redirect lands them on `app.sabertask.com` directly. The marketing site's job is done at "Check your email."

## Accessibility + i18n notes

- Match the marketing site's language switcher to the `locale` value you send.
- Error copy from the API is in English. For shipped-to-users errors (password policy, email taken), translate client-side using a static mapping, not by showing the raw API error.

## What NOT to build

- **No login page on the marketing site.** Link to `https://app.sabertask.com/login` for existing users.
- **No dashboard / logged-in surface.** Once the user verifies, they live on the app domain forever; the marketing site stays anonymous-only.
- **No Stripe integration.** The platform handles card capture inside the app's onboarding modal.
- **No direct DB access, no backend-for-frontend, no API routes that proxy to the platform.** The marketing site calls the platform API directly over HTTPS from the browser.
- **No storing of the JWT or email.** If the signup request succeeds, the marketing site's state ends there — the verify link in the email is the only handoff.

## Failure modes the marketing site must handle

| Case | Response | UI |
|---|---|---|
| Captcha token missing/invalid | 400 `Captcha verification failed.` | "Please complete the captcha and try again." Re-render widget. |
| Email already exists | 409 on signup, or `available: false` on check | Inline: "Already registered. **Log in instead.**" |
| Weak password | 400 with `errors: [...]` | Show the returned rule(s) inline under the password field. |
| Rate-limited | 429 | "Too many attempts. Please wait a minute and try again." |
| API unreachable / 5xx | network error | "Something went wrong on our end. Please try again." |

Never show raw API error text to the user — always map to friendly copy.

## Questions for the platform team

- Dev API base URL (the placeholder above needs confirming)
- Turnstile site key (platform-team provides, you ship in bundle)
- Which subdomain do new users land on after verifying? (`app.sabertask.com` is the prod target; confirm for staging)
- Is the marketing-site domain already in the CORS allowlist? (yes for `sabertask.com` + `www.sabertask.com`; add preview domains if needed)
