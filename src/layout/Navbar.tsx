"use client";

import ThemeToggle from "@/components/ToggleTheme";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Startups", href: "/startups" },
  { label: "Pricing", href: "/pricing" },
];

import { useAuthStore } from "@/store/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { getDashboardRoute } from "@/lib/global.helper";

const Navbar = () => {
  const profile = useAuthStore((state) => state.profile);
  const isAuthenticated = !!profile;

  const dashboardPath = getDashboardRoute(profile?.role);
  const accountStatus = profile?.approval_status;

  const dashboardLink =
    accountStatus === "pending"
      ? "/pending"
      : accountStatus === "rejected"
        ? "/rejected"
        : dashboardPath;

  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? " backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            onClick={() => router.push("/")}
            className="flex w-fit items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <div className="h-4 w-4 rounded bg-primary-foreground" />
            </div>

            <span className="text-lg font-semibold tracking-tight text-foreground">
              StartupSphere
              <span className="text-primary">+</span>
            </span>
          </a>
          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  onClick={() => router.push(link.href)}
                  className="px-3.5 py-2 text-sm hover:text-black transition-colors rounded-lg hover:bg-black/[0.06]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {isAuthenticated ? (
              <Link href={dashboardLink}>
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-primary/20 transition hover:ring-primary">
                  <AvatarImage
                    src={profile?.avatar_path ?? ""}
                    alt={profile?.full_name}
                  />

                  <AvatarFallback>
                    {profile?.full_name?.charAt(0).toUpperCase() ?? (
                      <User className="h-5 w-5" />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-muted hover:text-foreground"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white origin-center"
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-px bg-white"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white origin-center"
              transition={{ duration: 0.25 }}
            />
          </button>
        </nav>
      </motion.header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-20 pb-10">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Navigation */}
              <nav className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06,
                    }}
                    className="border-b border-white/[0.05] py-3 text-2xl font-medium transition-colors hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.35,
                }}
                className="mt-auto flex flex-col gap-3"
              >
                {isAuthenticated ? (
                  <Link
                    href={dashboardLink}
                    onClick={() => setMenuOpen(false)}
                    className="w-full rounded-2xl bg-primary py-3.5 text-center font-semibold text-primary-foreground"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                      className="w-full rounded-2xl border py-3.5 text-center font-medium"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMenuOpen(false)}
                      className="w-full rounded-2xl bg-primary py-3.5 text-center font-semibold text-primary-foreground"
                    >
                      Get Started
                    </Link>
                  </>
                )}

                <a
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-2xl bg-white py-3.5 text-center font-semibold text-[#050505] transition-colors hover:bg-white/90"
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
