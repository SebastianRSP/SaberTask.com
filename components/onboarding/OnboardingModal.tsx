'use client';

import { useCallback, useEffect, useMemo, useRef, useState, forwardRef, ReactNode, InputHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { useLocale, useTranslations } from 'next-intl';
import { DIAL_CODES, FALLBACK_LOCALE_DEFAULTS, LANGUAGES, LOCALE_DEFAULTS, getFlag } from './onboardingData';
import {
  detectTimezone,
  getCaptchaToken,
  postResendVerify,
  postSignup,
  type SignupError,
} from './signupApi';
import s from './onboarding.module.css';

export type OnboardingData = {
  firstName: string;
  lastName: string;
  email: string;
  dial: string;
  phone: string;
  password: string;
  confirmPassword: string;
  language: string;
};

type Errors = Partial<Record<keyof OnboardingData, string>>;

function emptyFor(locale: string): OnboardingData {
  const def = LOCALE_DEFAULTS[locale] ?? FALLBACK_LOCALE_DEFAULTS;
  return {
    firstName: '', lastName: '', email: '',
    dial: def.dial, phone: '',
    password: '', confirmPassword: '',
    language: def.language,
  };
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: OnboardingData) => void | Promise<void>;
};

type View =
  | { kind: 'form' }
  | { kind: 'sent'; email: string };

type Translator = (key: string) => string;

function mapError(error: SignupError, t: Translator): { fieldErrors: Errors; banner?: string } {
  switch (error.kind) {
    case 'emailTaken':
      return { fieldErrors: { email: t('errEmailTaken') } };
    case 'passwordPolicy':
      return {
        fieldErrors: {
          password: error.rules[0] || t('errPasswordPolicy'),
        },
      };
    case 'captchaFailed':
      return { fieldErrors: {}, banner: t('bannerCaptcha') };
    case 'rateLimited':
      return { fieldErrors: {}, banner: t('bannerRateLimited') };
    case 'network':
      return { fieldErrors: {}, banner: t('bannerNetwork') };
    case 'unknown':
    default:
      return { fieldErrors: {}, banner: t('bannerUnknown') };
  }
}

export default function OnboardingModal({ open, onClose, onSubmit }: Props) {
  const locale = useLocale();
  const t = useTranslations('onboarding');
  const [data, setData] = useState<OnboardingData>(() => emptyFor(locale));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [view, setView] = useState<View>({ kind: 'form' });
  const [resendState, setResendState] = useState<{ cooldown: number; sending: boolean }>({
    cooldown: 0,
    sending: false,
  });
  const captchaHostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setData(emptyFor(locale));
      setErrors({});
      setBanner(null);
      setView({ kind: 'form' });
      setResendState({ cooldown: 0, sending: false });
    }
  }, [open, locale]);

  useEffect(() => {
    if (resendState.cooldown <= 0) return;
    const id = window.setTimeout(() => {
      setResendState((r) => ({ ...r, cooldown: r.cooldown - 1 }));
    }, 1000);
    return () => window.clearTimeout(id);
  }, [resendState.cooldown]);

  const update = useCallback((patch: Partial<OnboardingData>) => {
    setData((d) => ({ ...d, ...patch }));
    setBanner(null);
  }, []);

  const submit = async () => {
    const err = validate(data, t);
    setErrors(err);
    setBanner(null);
    if (Object.keys(err).length > 0) return;
    setSubmitting(true);
    try {
      const host = captchaHostRef.current;
      const captchaToken = host ? await getCaptchaToken(host) : '';
      const res = await postSignup({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
        locale: data.language || 'en',
        timezone: detectTimezone(),
        country: data.dial || undefined,
        captchaToken,
      });

      if (res.ok) {
        onSubmit?.(data);
        setView({ kind: 'sent', email: res.data.email });
        return;
      }

      const { fieldErrors, banner: bannerMsg } = mapError(res.error, t);
      if (Object.keys(fieldErrors).length > 0) setErrors(fieldErrors);
      if (bannerMsg) setBanner(bannerMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    if (view.kind !== 'sent' || resendState.cooldown > 0 || resendState.sending) return;
    setResendState({ cooldown: 0, sending: true });
    const host = captchaHostRef.current;
    const captchaToken = host ? await getCaptchaToken(host) : '';
    await postResendVerify(view.email, captchaToken);
    setResendState({ cooldown: 30, sending: false });
  };

  if (!open) return null;

  return (
    <>
      <div className={s.overlay} onClick={onClose} />
      <div className={s.stage} role="dialog" aria-modal="true" aria-labelledby="onboarding-title">
        <div className={s.modal} onClick={(e) => e.stopPropagation()}>
          <button className={s.close} aria-label={t('close')} onClick={onClose} type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className={s.head}>
            <h2 id="onboarding-title" className={s.title}>
              {view.kind === 'sent' ? t('titleSent') : t('titleForm')}
            </h2>
          </div>

          {view.kind === 'sent' ? (
            <>
              <div className={s.body}>
                <div className={s.sentIcon} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <p className={s.sentLead}>
                  {t.rich('sentBody', {
                    email: view.email,
                    b: (chunks) => <strong>{chunks}</strong>,
                  })}
                </p>
                <p className={s.sentMeta}>
                  {t('sentResendPrefix')}{' '}
                  <button
                    type="button"
                    className={s.linkBtn}
                    onClick={resend}
                    disabled={resendState.cooldown > 0 || resendState.sending}
                  >
                    {resendState.sending
                      ? t('sentResending')
                      : resendState.cooldown > 0
                      ? t('sentResendCooldown', { seconds: resendState.cooldown })
                      : t('sentResend')}
                  </button>.
                </p>
                <p className={s.sentMeta}>
                  {t('sentWrongEmailPrefix')}{' '}
                  <button
                    type="button"
                    className={s.linkBtn}
                    onClick={() => setView({ kind: 'form' })}
                  >
                    {t('sentGoBack')}
                  </button>.
                </p>
              </div>
              <div className={s.footer}>
                <div className={s.footerMeta}>
                  {t('signinPrompt')} <a href="https://app2.sabertask.com">{t('signin')}</a>
                </div>
                <button type="button" className={s.btnPrimary} onClick={onClose}>
                  {t('done')}
                </button>
              </div>
              <div ref={captchaHostRef} className={s.captchaHost} aria-hidden />
            </>
          ) : (
          <>
          <div className={s.body}>
            {banner && <div className={s.banner}>{banner}</div>}
            <div className={s.row2}>
              <Field label={t('firstName')} required error={errors.firstName}>
                <TextInput
                  value={data.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  invalid={!!errors.firstName}
                  placeholder={t('firstNamePlaceholder')}
                  autoComplete="given-name"
                />
              </Field>
              <Field label={t('lastName')} required error={errors.lastName}>
                <TextInput
                  value={data.lastName}
                  onChange={(e) => update({ lastName: e.target.value })}
                  invalid={!!errors.lastName}
                  placeholder={t('lastNamePlaceholder')}
                  autoComplete="family-name"
                />
              </Field>
            </div>

            <Field label={t('email')} required error={errors.email}>
              <TextInput
                type="email"
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                invalid={!!errors.email}
                placeholder={t('emailPlaceholder')}
                autoComplete="email"
              />
            </Field>

            <Field label={t('password')} required error={errors.password}>
              <PasswordInput
                value={data.password}
                onChange={(v) => update({ password: v })}
                placeholder={t('passwordPlaceholder')}
                invalid={!!errors.password}
                showLabel={t('passwordShow')}
                hideLabel={t('passwordHide')}
              />
              <PasswordRules value={data.password} t={t} />
            </Field>

            <Field
              label={t('confirmPassword')}
              required
              error={
                data.confirmPassword && data.password !== data.confirmPassword
                  ? t('errPasswordMismatch')
                  : errors.confirmPassword
              }
            >
              <PasswordInput
                value={data.confirmPassword}
                onChange={(v) => update({ confirmPassword: v })}
                placeholder={t('confirmPasswordPlaceholder')}
                invalid={
                  !!(data.confirmPassword && data.password !== data.confirmPassword) ||
                  !!errors.confirmPassword
                }
                showLabel={t('passwordShow')}
                hideLabel={t('passwordHide')}
              />
            </Field>

            <div className={s.phoneRow}>
              <Field label={t('country')}>
                <Select
                  value={data.dial}
                  onChange={(v) => update({ dial: v })}
                  options={DIAL_CODES.map((c) => ({ value: c.value, label: c.name, code: c.code }))}
                  searchable
                  searchPlaceholder={t('countrySearch')}
                  emptyLabel={t('selectNoMatches')}
                  filterOption={(o, q) =>
                    ((o.label + ' ' + (o.code || '')).toLowerCase()).includes(q.toLowerCase())
                  }
                  renderValue={(o) => (
                    <span className={s.dialValue}>
                      <Flag code={o.value} />
                      <span className={s.dialName}>{o.label}</span>
                      {o.code && <span className={s.dialCode}>{o.code}</span>}
                    </span>
                  )}
                />
              </Field>
              <Field label={t('phone')} labelRight={t('optional')}>
                <TextInput
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder={t('phonePlaceholder')}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </Field>
            </div>

            <Field label={t('language')} labelRight={t('optional')}>
              <Select
                value={data.language}
                onChange={(v) => update({ language: v })}
                options={LANGUAGES}
                searchPlaceholder={t('selectSearch')}
                emptyLabel={t('selectNoMatches')}
              />
            </Field>
          </div>

          <div className={s.footer}>
            <div className={s.footerMeta}>
              {t('signinPrompt')} <a href="https://app2.sabertask.com">{t('signin')}</a>
            </div>
            <button
              type="button"
              className={s.btnPrimary}
              onClick={submit}
              disabled={submitting}
            >
              {submitting ? t('submitting') : t('submit')}
              {!submitting && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>
          </div>

          <div className={s.legal}>
            {t.rich('legal', {
              privacy: (chunks) => (
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">{chunks}</a>
              ),
              terms: (chunks) => (
                <a href="/terms" target="_blank" rel="noopener noreferrer">{chunks}</a>
              ),
            })}
          </div>
          <div ref={captchaHostRef} className={s.captchaHost} aria-hidden />
          </>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- primitives ---------- */

type FieldProps = {
  label?: string;
  labelRight?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
};

function Field({ label, labelRight, hint, error, required, children }: FieldProps) {
  return (
    <div className={s.field}>
      {(label || labelRight) && (
        <div className={s.labelRow}>
          {label && (
            <label className={s.label}>
              {label}
              {required && <span className={s.req}> *</span>}
            </label>
          )}
          {labelRight && <span className={s.labelRight}>{labelRight}</span>}
        </div>
      )}
      {children}
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { invalid, ...props },
  ref
) {
  return (
    <div className={`${s.inputWrap} ${invalid ? s.invalid : ''}`}>
      <input ref={ref} className={s.input} {...props} />
    </div>
  );
});

function PasswordInput({
  value,
  onChange,
  placeholder,
  invalid,
  showLabel,
  hideLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  invalid?: boolean;
  showLabel?: string;
  hideLabel?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className={`${s.inputWrap} ${invalid ? s.invalid : ''}`}>
      <input
        className={s.input}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="new-password"
      />
      <button
        type="button"
        className={s.eyeBtn}
        onClick={() => setShow((v) => !v)}
        aria-label={show ? hideLabel || 'Hide password' : showLabel || 'Show password'}
      >
        {show ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21 21 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21 21 0 0 1-3.22 4.44M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

function PasswordRules({ value, t }: { value: string; t: Translator }) {
  const rules = [
    { id: 'len', label: t('pwRuleLen'), ok: value.length >= 10 },
    { id: 'upper', label: t('pwRuleUpper'), ok: /[A-Z]/.test(value) },
    { id: 'lower', label: t('pwRuleLower'), ok: /[a-z]/.test(value) },
    { id: 'digit', label: t('pwRuleDigit'), ok: /\d/.test(value) },
    { id: 'spec', label: t('pwRuleSpecial'), ok: /[^A-Za-z0-9]/.test(value) },
  ];
  return (
    <div className={s.pwRules}>
      {rules.map((r) => {
        const cls = r.ok ? s.pwRuleOk : value ? s.pwRuleErr : '';
        return (
          <span key={r.id} className={`${s.pwRule} ${cls}`}>
            {r.ok ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            )}
            {r.label}
          </span>
        );
      })}
    </div>
  );
}

type SelectOption = { value: string; label: string; code?: string };

type SelectProps<T extends SelectOption> = {
  value: string;
  onChange: (v: string) => void;
  options: T[];
  invalid?: boolean;
  placeholder?: string;
  renderValue?: (o: T) => ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: string;
  filterOption?: (o: T, q: string) => boolean;
};

function Select<T extends SelectOption>({
  value,
  onChange,
  options,
  invalid,
  placeholder,
  renderValue,
  searchable,
  searchPlaceholder,
  emptyLabel,
  filterOption,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuRect, setMenuRect] = useState<{
    left: number; width: number; top: number | null; bottom: number | null; maxHeight: number;
  } | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
      setQuery('');
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const menuH = 290;
      const dropUp = spaceBelow < menuH && spaceAbove > spaceBelow;
      setMenuRect({
        left: rect.left,
        width: rect.width,
        top: dropUp ? null : rect.bottom + 6,
        bottom: dropUp ? window.innerHeight - rect.top + 6 : null,
        maxHeight: Math.min(280, (dropUp ? spaceAbove : spaceBelow) - 12),
      });
    };
    reposition();
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [open]);

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const filtered = useMemo(() => {
    if (!searchable || !query) return options;
    const q = query.toLowerCase();
    return options.filter((o) =>
      filterOption ? filterOption(o, query) : (o.label || '').toLowerCase().includes(q)
    );
  }, [options, query, searchable, filterOption]);

  const classes = [s.select, invalid && s.selectInvalid, open && s.selectOpen]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} ref={triggerRef}>
      <button
        type="button"
        className={s.selectTrigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={s.selectValue}>
          {selected
            ? renderValue
              ? renderValue(selected)
              : selected.label
            : <span style={{ color: '#94A3B8' }}>{placeholder}</span>}
        </span>
        <svg className={s.caret} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && mounted && menuRect && createPortal(
        <div
          ref={menuRef}
          className={s.selectMenu}
          style={{
            position: 'fixed',
            left: menuRect.left,
            width: menuRect.width,
            top: menuRect.top ?? 'auto',
            bottom: menuRect.bottom ?? 'auto',
            maxHeight: menuRect.maxHeight,
          }}
          role="listbox"
        >
          {searchable && (
            <div className={s.selectSearch}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder || 'Search'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filtered[0]) {
                    onChange(filtered[0].value);
                    setOpen(false);
                    setQuery('');
                  }
                  if (e.key === 'Escape') {
                    setOpen(false);
                    setQuery('');
                  }
                }}
              />
            </div>
          )}
          <div className={s.selectList}>
            {filtered.length === 0 && <div className={s.selectEmpty}>{emptyLabel || 'No matches'}</div>}
            {filtered.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`${s.selectOpt} ${o.value === value ? s.selectOptSelected : ''}`}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                  setQuery('');
                }}
                role="option"
                aria-selected={o.value === value}
              >
                {renderValue ? renderValue(o) : o.label}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function Flag({ code }: { code: string }) {
  const f = getFlag(code);
  if (f[2] === 'cross') {
    return (
      <span className={s.flag} style={{ background: f[0] }}>
        <span className={s.flagCrossV} style={{ background: f[1] }} />
        <span className={s.flagCrossH} style={{ background: f[1] }} />
      </span>
    );
  }
  return (
    <span className={`${s.flag} ${s.flagTri}`}>
      <span style={{ background: f[0] }} />
      <span style={{ background: f[1] }} />
      <span style={{ background: f[2] }} />
    </span>
  );
}

/* ---------- validation ---------- */

function validate(d: OnboardingData, t: Translator): Errors {
  const e: Errors = {};
  if (!d.firstName) e.firstName = t('errRequired');
  if (!d.lastName) e.lastName = t('errRequired');
  if (!d.email) e.email = t('errRequired');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = t('errEmail');
  if (!d.password) e.password = t('errRequired');
  else if (
    d.password.length < 10 ||
    !/[A-Z]/.test(d.password) ||
    !/[a-z]/.test(d.password) ||
    !/\d/.test(d.password) ||
    !/[^A-Za-z0-9]/.test(d.password)
  ) {
    e.password = t('errPasswordPolicy');
  }
  if (!d.confirmPassword) e.confirmPassword = t('errRequired');
  else if (d.password && d.confirmPassword !== d.password) e.confirmPassword = t('errPasswordMismatch');
  return e;
}
