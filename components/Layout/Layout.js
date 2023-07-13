import React from "react";

import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      {/* <header className="lg:sticky lg:top-0 z-40">
        <Header />
      </header> */}

      <main>{children}</main>


    </>
  );
}
