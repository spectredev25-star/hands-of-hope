"use client";

import Link from "next/link";
import { ArrowUpRight, HandHeart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 bg-[#172524]"
    >
      <nav className="container-shell flex h-20 items-center justify-between border-b border-white/10">
        <Link
          href="/"
          aria-label="Hands of Hope home"
          className="group flex items-center gap-2.5"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300 transition-colors group-hover:bg-teal-400/25">
            <HandHeart className="size-6" />
          </span>

          <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
            Hands of <span className="text-teal-300">Hope</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-teal-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />

          <Button
            variant="outline"
            className="rounded-full border-white/25 bg-white/5 px-5 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/signup">Sign Up</Link>
          </Button>

          <Button
            className="rounded-full bg-teal-500 px-5 text-slate-950 hover:bg-teal-400"
            asChild
          >
            <Link href="/login">
              Log In 
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            {menuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="container-shell md:hidden">
          <div className="mt-2 space-y-1 rounded-2xl border border-white/10 bg-[#071B1A]/95 p-4 shadow-2xl backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-teal-300"
              >
                {link.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-3">
              <Button
                variant="outline"
                asChild
                className="rounded-full border-white/20 text-white hover:text-white"
              >
                <Link href="/login">Log in</Link>
              </Button>

              <Button
                asChild
                className="rounded-full bg-teal-500 text-slate-950 hover:bg-teal-400"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}