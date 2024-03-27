import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  return (
    <main className="absolute-center mt-4">
      <div className="container flex justify-center rounded-lg border border-secondary bg-primary p-4 shadow-md dark:bg-primary-d">
        {children}
      </div>
    </main>
  );
};

export default layout;
