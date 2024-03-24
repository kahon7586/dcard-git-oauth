"use client"

import React, { useEffect, useState } from "react"

const ThemeToggler = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const html = document.getElementsByTagName("html")[0]
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark")
      document.cookie = `theme=dark`
      return "dark"
    }
    html.classList.remove("dark")
    document.cookie = `theme=light`
    return "light"
  })

  useEffect(() => {
    const html = document.getElementsByTagName("html")[0]
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark")
    }
  }, [])

  function handleToggle() {
    const html = document.getElementsByTagName("html")[0]

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

  return <div onClick={handleToggle}>{theme === "light" ? "light" : "dark"}</div>
}

export default ThemeToggler
