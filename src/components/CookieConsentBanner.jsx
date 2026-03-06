import { useEffect, useState } from "react";
import { useCookieConsent } from "../context/CookieConsentContext";

const CookieConsentBanner = () => {
  const {
    consent,
    hasConsent,
    isPreferencesOpen,
    openPreferences,
    closePreferences,
    acceptAll,
    rejectOptional,
    savePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState({
    preferences: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!isPreferencesOpen) return;

    setDraft({
      preferences: Boolean(consent?.preferences),
      analytics: Boolean(consent?.analytics),
      marketing: Boolean(consent?.marketing),
    });
  }, [consent, isPreferencesOpen]);

  const showFirstVisitBanner = !hasConsent;

  return (
    <>
      {showFirstVisitBanner && (
        <div className="fixed inset-x-3 bottom-4 z-50 mx-auto max-w-[1320px] border rounded-4xl border-[#f4f0e8]/20 bg-[#0d0d0d]/95 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:px-6 sm:py-5">
          <p className="text-[11px] uppercase tracking-[0.33em] text-[#c9a96e]">
            Cookie Preferences
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#f4f0e8]/78">
            We use essential cookies for core site functionality.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={acceptAll}
              className="border border-[#c9a96e] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8] transition hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
            >
              Accept All
            </button>
            <button
              onClick={rejectOptional}
              className="border border-[#f4f0e8]/30 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8]/85 transition hover:border-[#f4f0e8]/60"
            >
              Necessary Only
            </button>
            <button
              onClick={openPreferences}
              className="border border-[#f4f0e8]/30 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8]/85 transition hover:border-[#f4f0e8]/60"
            >
              Customize
            </button>
          </div>
        </div>
      )}

      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/70 p-4 rounded-4xl">
          <div className="w-full max-w-xl border border-[#f4f0e8]/20 bg-[#0e0e0e] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.33em] text-[#c9a96e]">
                  Manage Cookies
                </p>
                <h2 className="mt-3 font-display text-3xl text-[#f4f0e8]">
                  Choose Your Preferences
                </h2>
              </div>
              <button
                onClick={closePreferences}
                className="h-8 w-8 border border-[#f4f0e8]/25 text-[#f4f0e8]/70 transition hover:border-[#f4f0e8]/55"
                aria-label="Close cookie preferences"
              >
                X
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="border border-[#f4f0e8]/15 px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#f4f0e8]">
                  Necessary
                </p>
                <p className="mt-1 text-sm text-[#f4f0e8]/62">
                  Required for cart, routing, and core functionality.
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#c9a96e]">
                  Always active
                </p>
              </div>

              {[
                {
                  key: "preferences",
                  label: "Preferences",
                  desc: "Remember display settings and user choices.",
                },
                {
                  key: "analytics",
                  label: "Analytics",
                  desc: "Help us understand usage and improve performance.",
                },
                {
                  key: "marketing",
                  label: "Marketing",
                  desc: "Personalized campaigns and attribution tracking.",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex cursor-pointer items-center justify-between gap-4 border border-[#f4f0e8]/15 px-4 py-3"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-[#f4f0e8]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-[#f4f0e8]/62">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={draft[item.key]}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        [item.key]: event.target.checked,
                      }))
                    }
                    className="h-4 w-4 accent-[#c9a96e]"
                  />
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => savePreferences(draft)}
                className="border border-[#c9a96e] px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8] transition hover:bg-[#c9a96e] hover:text-[#0a0a0a]"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="border border-[#f4f0e8]/30 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8]/85 transition hover:border-[#f4f0e8]/60"
              >
                Accept All
              </button>
              <button
                onClick={rejectOptional}
                className="border border-[#f4f0e8]/30 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-[#f4f0e8]/85 transition hover:border-[#f4f0e8]/60"
              >
                Necessary Only
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
