import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { getJsonCookie, setJsonCookie } from "../utils/cookies";

export const COOKIE_CONSENT_KEY = "ebazaar_cookie_consent_v1";

const CookieConsentContext = createContext(null);

const normalizeConsent = (value) => ({
  necessary: true,
  preferences: Boolean(value?.preferences),
  analytics: Boolean(value?.analytics),
  marketing: Boolean(value?.marketing),
});

const readConsentCookie = () => {
  const storedConsent = getJsonCookie(COOKIE_CONSENT_KEY);
  return storedConsent ? normalizeConsent(storedConsent) : null;
};

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent] = useState(readConsentCookie);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const persistConsent = useCallback((nextConsent) => {
    const normalized = normalizeConsent(nextConsent);
    setConsent(normalized);
    setJsonCookie(
      COOKIE_CONSENT_KEY,
      {
        ...normalized,
        updatedAt: new Date().toISOString(),
      },
      { days: 180 }
    );
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
    });
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const rejectOptional = useCallback(() => {
    persistConsent({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
    });
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const savePreferences = useCallback(
    (preferences) => {
      persistConsent({
        necessary: true,
        preferences: Boolean(preferences?.preferences),
        analytics: Boolean(preferences?.analytics),
        marketing: Boolean(preferences?.marketing),
      });
      setIsPreferencesOpen(false);
    },
    [persistConsent]
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const canUse = useCallback(
    (category) => {
      if (category === "necessary") return true;
      return Boolean(consent?.[category]);
    },
    [consent]
  );

  const value = useMemo(
    () => ({
      consent,
      hasConsent: Boolean(consent),
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      canUse,
    }),
    [
      consent,
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
      canUse,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
};
