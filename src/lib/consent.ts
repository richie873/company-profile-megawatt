// src/lib/consent.ts
import { useSyncExternalStore } from "react";
// Menyimpan pilihan cookie pengunjung dan memberi tahu komponen lain saat berubah.

export type ConsentChoices = {
  functional: boolean;
  analytics: boolean;
};

export type Consent = ConsentChoices & {
  necessary: true; // selalu aktif
  updatedAt: string;
};

// Naikkan versi key ini jika kategori cookie atau kebijakan privasi berubah,
// supaya semua pengunjung ditanya ulang.
const KEY = "mp-cookie-consent-v1";

export const CONSENT_EVENT = "mp-cookie-consent-change";
export const OPEN_SETTINGS_EVENT = "mp-cookie-settings-open";

let current: Consent | null = null;
let loaded = false;

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    current = raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    current = null;
  }
  loaded = true;
}

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  if (!loaded) load();
  return current;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      load();
      onChange();
    }
  };
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onStorage); // sinkron antar-tab
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Pilihan cookie saat ini.
 * `undefined` = belum ter-hydrate (render server), `null` = belum memilih.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getConsent, () => undefined);
}

export function saveConsent(choices: ConsentChoices): Consent {
  const value: Consent = {
    necessary: true,
    ...choices,
    updatedAt: new Date().toISOString(),
  };
  current = value;
  loaded = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // storage tidak tersedia — pilihan tetap berlaku untuk sesi ini
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

/** Buka panel pengaturan cookie dari mana saja (mis. tautan di footer). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
