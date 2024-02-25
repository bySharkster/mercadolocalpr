"use client";
import React from "react";
import { hasCookie, setCookie } from "cookies-next";

export const CookieConcent = () => {
  const [showConsent, setShowConsent] = React.useState(true);

  React.useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  if (showConsent) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-70">
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 py-8 bg-gray-100">
        <span className="mr-16 text-base text-dark">
          This website uses cookies to improve user experience. By using our
          website you consent to all cookies in accordance with our Cookie
          Policy.
        </span>
        <button
          className="px-8 py-2 text-white bg-green-500 rounded"
          onClick={() => acceptCookie()}
        >
          Accept
        </button>
      </div>
    </div>
  );
};
