import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const links = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "Instructors", to: "/instructors" },
  { label: "Schedules", to: "/schedules" },
  { label: "Contact Us", to: "/contact" },
];

export function TopNav() {
  const location = useLocation();
  const path = location.pathname;
  const isLogin = path === "/login";
  const isRegister = path === "/register";

  // toggel search
  const [openSearch, setOpenSearch] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openSearch && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [openSearch]);

  //   tutup saat klik diluar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpenSearch(false);
        setOpenMobileNav(false);
      }
    }
    if (openSearch || openMobileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openSearch, openMobileNav]);

  useEffect(() => {
    setOpenMobileNav(false);
  }, [path]);

  function handleSearchClick() {
    setOpenSearch(!openSearch);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50">
      <div
        ref={containerRef}
        className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="relative flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl">
          WiSchool
        </Link>

        <NavigationMenu className="hidden flex-1 justify-center md:flex">
          <NavigationMenuList className="flex gap-6 text-sm font-medium text-muted-foreground">
            {links.map((item) => (
              <NavigationMenuItem key={item.to}>
                <NavigationMenuLink asChild active={false}>
                  <Link
                    to={item.to}
                    className="transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="relative flex items-center gap-2">
            {openSearch && (
              <form
                role="search"
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500">
                <SearchIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search courses"
                  className="w-40 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground"
                  aria-label="Search WiSchool"
                />
              </form>
            )}

            {!openSearch && (
              <button
                type="button"
                onClick={handleSearchClick}
                aria-label="Toggle search"
                className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
                <SearchIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            asChild
            className={`hidden rounded-full px-6 transition md:inline-flex ${
              isLogin
                ? "bg-emerald-500 text-white hover:bg-emerald-500/90"
                : "bg-white text-emerald-500   hover:bg-emerald-50"
            }`}>
            <Link to="/login">Login</Link>
          </Button>

          <Button
            asChild
            className={`hidden rounded-full px-6 transition md:inline-flex ${
              isRegister
                ? "bg-emerald-500 text-white hover:bg-emerald-500/90"
                : "bg-white text-emerald-500   hover:bg-emerald-50"
            }`}>
            <Link to="/register">Register</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpenMobileNav((prev) => !prev)}
            aria-label={
              openMobileNav ? "Close navigation menu" : "Open navigation menu"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden">
            {openMobileNav ? (
              <XIcon className="h-4 w-4" />
            ) : (
              <MenuIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        {openMobileNav && (
          <div className="absolute left-0 right-0 top-full z-50 mx-4 mt-3 rounded-2xl border border-border bg-background p-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-foreground">
              {links.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-full px-3 py-2 transition-colors hover:bg-emerald-50 hover:text-emerald-600">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                asChild
                className={`w-full justify-center rounded-full px-6 transition ${
                  isLogin
                    ? "bg-emerald-500 text-white hover:bg-emerald-500/90"
                    : "bg-white text-emerald-500 hover:bg-emerald-50"
                }`}>
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className={`w-full justify-center rounded-full px-6 transition ${
                  isRegister
                    ? "bg-emerald-500 text-white hover:bg-emerald-500/90"
                    : "bg-white text-emerald-500 hover:bg-emerald-50"
                }`}>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
