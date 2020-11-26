// @flow
import { BASE } from "beinformed/constants/Constants";

type CookieOptions = {
  days?: number,
  sameSite?: "None" | "Lax" | "Strict",
  secure?: boolean,
};

const getCookie = (name: string) => {
  if (typeof document !== "undefined") {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }

  return null;
};

const setCookie = (
  name: string,
  value: any,
  { days, sameSite = "Strict", secure }: CookieOptions = {}
) => {
  if (typeof document !== "undefined") {
    const valuePart = `${name}=${value || ""}`;

    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    let sameSitePart = "";
    if (sameSite) {
      sameSitePart = `; SameSite=${sameSite}`;
    }
    const securePart = secure ? "Secure" : "";

    document.cookie = `${valuePart}${expires}${sameSitePart}${securePart}; path=${BASE}`;
  }
};

const clearCookie = (name: string) => {
  if (typeof document !== "undefined") {
    document.cookie = `${name}=; Max-Age=-99999999;`;
  }
};

export { getCookie, setCookie, clearCookie };
