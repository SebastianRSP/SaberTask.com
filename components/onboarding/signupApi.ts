const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '') ||
  'https://api-dev.sabertask.com';

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  locale: string;
  timezone: string;
  country?: string;
  captchaToken: string;
};

export type SignupSuccess = { email: string; message: string };

export type SignupError =
  | { kind: 'emailTaken' }
  | { kind: 'rateLimited' }
  | { kind: 'captchaFailed' }
  | { kind: 'passwordPolicy'; rules: string[] }
  | { kind: 'network' }
  | { kind: 'unknown'; message?: string };

export async function postSignup(
  payload: SignupPayload
): Promise<{ ok: true; data: SignupSuccess } | { ok: false; error: SignupError }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/public/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, error: { kind: 'network' } };
  }

  if (res.ok) {
    const data = (await res.json()) as SignupSuccess;
    return { ok: true, data };
  }

  const body = await res.json().catch(() => ({} as Record<string, unknown>));

  if (res.status === 409) return { ok: false, error: { kind: 'emailTaken' } };
  if (res.status === 429) return { ok: false, error: { kind: 'rateLimited' } };

  if (res.status === 400) {
    const rawErrors = Array.isArray((body as { errors?: unknown }).errors)
      ? ((body as { errors: unknown[] }).errors.filter((e) => typeof e === 'string') as string[])
      : [];
    const raw = String((body as { error?: unknown }).error ?? '').toLowerCase();
    if (raw.includes('captcha')) return { ok: false, error: { kind: 'captchaFailed' } };
    if (rawErrors.length > 0 || raw.includes('password')) {
      return {
        ok: false,
        error: {
          kind: 'passwordPolicy',
          rules: rawErrors.length > 0 ? rawErrors : [String((body as { error?: unknown }).error ?? '')],
        },
      };
    }
  }

  return {
    ok: false,
    error: { kind: 'unknown', message: String((body as { error?: unknown }).error ?? '') || undefined },
  };
}

export async function postResendVerify(email: string, captchaToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/public/signup/resend-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, captchaToken }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

type TurnstileGlobal = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      size?: 'normal' | 'compact' | 'flexible';
      callback?: (token: string) => void;
      'error-callback'?: () => void;
      'expired-callback'?: () => void;
      appearance?: 'always' | 'execute' | 'interaction-only';
    }
  ) => string;
  execute: (widgetId: string) => void;
  getResponse: (widgetId: string) => string | undefined;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileGlobal;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src^="${TURNSTILE_SCRIPT}"]`);
    if (existing) {
      if (window.turnstile) return resolve();
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
      return;
    }
    const s = document.createElement('script');
    s.src = TURNSTILE_SCRIPT;
    s.async = true;
    s.defer = true;
    s.addEventListener('load', () => resolve());
    s.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function getTurnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null;
}

export async function getCaptchaToken(container: HTMLElement): Promise<string> {
  const siteKey = getTurnstileSiteKey();
  if (!siteKey) return '';
  await loadTurnstile();
  if (!window.turnstile) return '';

  return new Promise<string>((resolve) => {
    let settled = false;
    const done = (token: string) => {
      if (settled) return;
      settled = true;
      resolve(token);
    };
    try {
      const widgetId = window.turnstile!.render(container, {
        sitekey: siteKey,
        appearance: 'interaction-only',
        callback: (token) => {
          done(token);
          try { window.turnstile?.remove(widgetId); } catch {}
        },
        'error-callback': () => done(''),
        'expired-callback': () => done(''),
      });
      window.turnstile!.execute(widgetId);
      setTimeout(() => done(''), 15000);
    } catch {
      done('');
    }
  });
}
