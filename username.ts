export const RESERVED_USERNAMES = new Set([
  "api", "auth", "login", "register", "dashboard", "onboarding", "admin",
  "about", "contact", "pricing", "explore", "settings", "privacy", "terms",
  "robots.txt", "sitemap.xml", "favicon.ico"
]);

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

export function isValidUsername(value: string) {
  const username = normalizeUsername(value);
  return /^[a-z0-9][a-z0-9._-]{2,29}$/.test(username) && !RESERVED_USERNAMES.has(username);
}
