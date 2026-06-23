"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

const preloadAssets = [
  "/founders-boxlogo.png",
  "/playbold-logo.png?v=20260623",
  "/hero-slide-game-day.jpg",
  "/hero-slide-practice.jpg",
  "/hero-slide-team-spirit.jpg",
  "/player-placeholder.png",
  "/partner-fund-logo.png",
  "/buyerx-logo.png",
];

function waitForImage(src: string, onSettled: () => void) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      onSettled();
      resolve();
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finish();
    }
  });
}

function waitForWindowLoad() {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

export function SitePreloader() {
  const [progress, setProgress] = useState(8);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    document.body.classList.add("sitePreloading");

    const updateProgress = () => {
      loaded += 1;
      const nextProgress = Math.round(8 + (loaded / preloadAssets.length) * 82);
      setProgress(Math.min(nextProgress, 90));
    };

    const preload = Promise.all([
      waitForWindowLoad(),
      ...preloadAssets.map((src) => waitForImage(src, updateProgress)),
    ]);

    const minimumDisplay = new Promise((resolve) => {
      window.setTimeout(resolve, 950);
    });

    const safetyTimeout = new Promise((resolve) => {
      window.setTimeout(resolve, 3200);
    });

    Promise.all([Promise.race([preload, safetyTimeout]), minimumDisplay]).then(() => {
      if (cancelled) return;
      setProgress(100);
      window.setTimeout(() => {
        if (cancelled) return;
        setIsLeaving(true);
        document.body.classList.remove("sitePreloading");
      }, 180);
      window.setTimeout(() => {
        if (cancelled) return;
        setIsVisible(false);
      }, 780);
    });

    return () => {
      cancelled = true;
      document.body.classList.remove("sitePreloading");
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`sitePreloader${isLeaving ? " isLeaving" : ""}`} role="status" aria-live="polite">
      <div className="preloaderInner">
        <img src="/founders-boxlogo.png" alt="FOUNDERS" className="preloaderLogo" />
        <div className="preloaderCopy">
          <span>FOUNDERS BASEBALL CLUB</span>
          <strong>PLAY BOLD</strong>
        </div>
        <div className="preloaderTrack" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p>{progress < 100 ? "Loading" : "Ready"}</p>
      </div>
    </div>
  );
}
