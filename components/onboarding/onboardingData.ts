export type DialCode = { value: string; code: string; name: string };
export type Language = { value: string; label: string };

export const DIAL_CODES: DialCode[] = [
  { value: 'DK', code: '+45', name: 'Denmark' },
  { value: 'SE', code: '+46', name: 'Sweden' },
  { value: 'NO', code: '+47', name: 'Norway' },
  { value: 'DE', code: '+49', name: 'Germany' },
  { value: 'GB', code: '+44', name: 'United Kingdom' },
  { value: 'US', code: '+1', name: 'United States' },
  { value: 'FI', code: '+358', name: 'Finland' },
  { value: 'IS', code: '+354', name: 'Iceland' },
  { value: 'FR', code: '+33', name: 'France' },
  { value: 'NL', code: '+31', name: 'Netherlands' },
  { value: 'BE', code: '+32', name: 'Belgium' },
  { value: 'ES', code: '+34', name: 'Spain' },
  { value: 'IT', code: '+39', name: 'Italy' },
  { value: 'PL', code: '+48', name: 'Poland' },
  { value: 'PT', code: '+351', name: 'Portugal' },
];

export const LANGUAGES: Language[] = [
  { value: 'en', label: 'English' },
  { value: 'da', label: 'Dansk' },
  { value: 'sv', label: 'Svenska' },
];

// Defaults for the onboarding form per site locale.
// The keys here are the site's locale codes (see i18n.ts: 'en', 'da', 'se').
// Values map to:
//   - dial: ISO alpha-2 country code for the phone-country / region picker
//   - language: the onboarding "Preferred language" value (see LANGUAGES above)
// NOTE: site locale 'se' (Sweden) maps to language code 'sv' (Swedish).
// When adding a new site locale, add a matching entry here.
export const LOCALE_DEFAULTS: Record<string, { dial: string; language: string }> = {
  en: { dial: 'DK', language: 'en' },
  da: { dial: 'DK', language: 'da' },
  se: { dial: 'SE', language: 'sv' },
};

export const FALLBACK_LOCALE_DEFAULTS = LOCALE_DEFAULTS.en;

type FlagSpec = [string, string, string];
const FLAGS: Record<string, FlagSpec> = {
  DK: ['#C8102E', '#FFFFFF', 'cross'],
  SE: ['#006AA7', '#FECC00', 'cross'],
  NO: ['#EF2B2D', '#FFFFFF', 'cross'],
  FI: ['#FFFFFF', '#003580', 'cross'],
  IS: ['#02529C', '#FFFFFF', 'cross'],
  DE: ['#000000', '#DD0000', '#FFCE00'],
  GB: ['#012169', '#FFFFFF', '#C8102E'],
  US: ['#B22234', '#FFFFFF', '#3C3B6E'],
  FR: ['#002395', '#FFFFFF', '#ED2939'],
  NL: ['#AE1C28', '#FFFFFF', '#21468B'],
  BE: ['#000000', '#FDDA24', '#EF3340'],
  ES: ['#AA151B', '#F1BF00', '#AA151B'],
  IT: ['#008C45', '#F4F5F0', '#CD212A'],
  PL: ['#FFFFFF', '#DC143C', 'stripe'],
  PT: ['#006600', '#FF0000', 'stripe'],
};

export function getFlag(code: string): FlagSpec {
  return FLAGS[code] || ['#94A3B8', '#E8EDF5', '#94A3B8'];
}
