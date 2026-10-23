"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CurrentTime from "./time";

const LINKS = [
  { href: "/about", label: "about" },
  { href: "/reader", label: "reader" },
  { href: "/blog", label: "blog" },
  { href: "/contact", label: "contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="site-mark">
        Atharva Patil
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {LINKS.map((link, index) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <span key={link.href}>
              {index > 0 && (
                <span className="nav-sep" aria-hidden="true">
                  {" // "}
                </span>
              )}
              <Link
                href={link.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </span>
          );
        })}
      </nav>
      <CurrentTime />
    </header>
  );
}
