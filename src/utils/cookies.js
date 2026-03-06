const isBrowser = typeof document !== "undefined";

export const getCookie = (name) => {
  if (!isBrowser || !name) return null;

  const encodedName = encodeURIComponent(name);
  const parts = document.cookie ? document.cookie.split("; ") : [];
  const matchedPart = parts.find((part) => part.startsWith(`${encodedName}=`));

  if (!matchedPart) return null;

  return decodeURIComponent(matchedPart.substring(encodedName.length + 1));
};

export const setCookie = (name, value, options = {}) => {
  if (!isBrowser || !name) return;

  const {
    days = 180,
    path = "/",
    sameSite = "Lax",
    secure = window.location.protocol === "https:",
  } = options;

  const maxAge = Math.max(1, Math.floor(days * 24 * 60 * 60));
  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);
  const secureDirective = secure ? "; Secure" : "";

  document.cookie = `${encodedName}=${encodedValue}; Max-Age=${maxAge}; Path=${path}; SameSite=${sameSite}${secureDirective}`;
};

export const getJsonCookie = (name) => {
  const rawValue = getCookie(name);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
};

export const setJsonCookie = (name, value, options = {}) => {
  setCookie(name, JSON.stringify(value), options);
};
