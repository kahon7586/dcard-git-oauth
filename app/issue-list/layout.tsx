import React, { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const layout = ({ children }: LayoutProps) => {
  return (
    <main className="absolute-center mt-4">
      <div className="container flex justify-center bg-primary dark:bg-primary-d p-4 rounded-lg border border-secondary shadow-md">
        {children}
      </div>
    </main>
  )
}

export default layout
