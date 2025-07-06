"use client";

import Link from "next/link";
import type { FC } from "react";

const Navigation: FC = () => {
  return (
    <header className="fixed top-0 flex w-full justify-center">
      <nav className="underline">
        <ul className="flex items-center justify-center gap-12 p-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#stacks">Stacks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
