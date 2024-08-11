"use client";

import { Main } from "./main";
import { ThirdwebProvider } from "thirdweb/react";

export default function Home() {
  return (
    <ThirdwebProvider>
      <Main />
    </ThirdwebProvider>
  );
}
