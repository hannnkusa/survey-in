"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import Cookies from "js-cookie";

export function parseNumber(
  value: string,
  locales: string | string[] = "fr-FR"
): number | undefined {
  try {
    if (value && typeof value === "string") {
      const example = Intl.NumberFormat(locales).format(1.1);
      const cleanPattern = new RegExp(`[^-+0-9${example.charAt(1)}]`, "g");
      const cleaned = value.replace(cleanPattern, "");
      const normalized = cleaned.replace(example.charAt(1), ".");
      return parseFloat(normalized);
    }
  } catch (error: any) {
    console.error("Failed To Parse");
  }
}

export function currencyFormat(
  value: number | string,
  locales: Intl.LocalesArgument = "id-ID"
) {
  try {
    const lovalValue = typeof value === "string" ? parseNumber(value) : value;
    return (lovalValue as number).toLocaleString(locales);
  } catch (e: any) {
    console.error(e);
  }
}

export function formatPhoneNumber(phoneNumber: string) {
  // Add the country code prefix if it's not already present
  if (!phoneNumber.startsWith("+62")) {
    phoneNumber = "+62" + phoneNumber.replace(/^0+/, ""); // Remove leading zeros
  }

  return phoneNumber;
}

export function handleAuthChanges() {
  const authStore = useAuthStore.getState();
  const { setCurrentUser } = authStore;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log({ user });
      setCurrentUser(user);
      Cookies.set("currentUser", btoa(JSON.stringify(user)));
    } else {
      setCurrentUser(null);
      Cookies.remove("currentUser");
    }
  });
}
