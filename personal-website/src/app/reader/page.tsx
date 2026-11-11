"use client";
import React, { useState } from "react";
import { READING } from "./reading";

export default function Reader() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <main className="flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        {READING.map((section) => {
          const open = !collapsed[section.key];
          return (
            <section key={section.key} className="reader-section">
              <h2>
                <button
                  type="button"
                  className="reader-toggle"
                  onClick={() => toggleSection(section.key)}
                  aria-expanded={open}
                >
                  <span className="reader-sign" aria-hidden="true">
                    [{open ? "–" : "+"}]
                  </span>
                  {section.label}
                  <span className="reader-count">({section.items.length})</span>
                </button>
              </h2>
              {open && (
                <ol className="reader-list">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <span className="reader-date">{item.date}</span>
                      <a
                        href={item.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
