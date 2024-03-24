"use client"

import React, { useEffect, useState } from "react"
import ThemeIcon from "../ThemeIcon"
import { IoSunny } from "react-icons/io5"
import { IoMoon } from "react-icons/io5"

function getHtml() {
  return document.getElementsByTagName("html")[0]
}

// If in dark mode, just put "dark" in html class list; else, remove "dark"
// Note that when using light theme, there's no "light" in html class list

const ThemeToggler = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (document.cookie.includes(`theme=light`)) return "light"
    if (document.cookie.includes(`theme=dark`)) return "dark"
    // look for theme in cookie

    const html = getHtml()
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark")
      document.cookie = `theme=dark`
      return "dark"
    }
    html.classList.remove("dark")
    document.cookie = `theme=light`
    return "light"
  })

  function handleToggle() {
    const html = getHtml()

    setTheme((prev) => {
      if (prev === "dark") {
        document.cookie = `theme=light`
        html.classList.remove("dark")
        return "light"
      }

      document.cookie = `theme=dark`
      html.classList.add("dark")
      return "dark"
    })
  }

  return (
    <div onClick={handleToggle}>
      {theme === "light" ? (
        <ThemeIcon
          Icon={IoSunny}
          className="fill-amber-300"
          title="light mode"
        />
      ) : (
        <ThemeIcon
          Icon={IoMoon}
          className="fill-zinc-400"
          title="dark mode"
        />
      )}
    </div>
  )
}

export default ThemeToggler
