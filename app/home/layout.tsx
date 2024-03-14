import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="absolute-center mt-4">
        <div className="container flex justify-center bg-slate-400 px-4 py-2">{children}</div>
      </main>
    </>
  )
}

export default layout
