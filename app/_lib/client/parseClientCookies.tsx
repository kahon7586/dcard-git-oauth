"use client";

function clientCookiesParser() {
  const cookieString = document.cookie;
  const cookiePairs = cookieString.split(";");

  const cookies = {} as { [key: string]: string | undefined };

  cookiePairs.forEach((pair) => {
    const [key, value] = pair.trim().split("=");

    cookies[key] = value;
  });

  return cookies;
}

export function getClientCookie(key: string) {
  const cookies = clientCookiesParser();
  return cookies[key];
}
