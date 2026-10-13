"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../src/assets/images/logo.png";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuDemo } from "../menu";
import { useSession } from "../../../contexts/user-context";
import Link from "next/link";

const navLink =
  "rounded-lg px-3 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:bg-primary/10 hover:text-primary";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, avatarUrl } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 z-20 w-full border-b border-line bg-white/85 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <Image
            className="h-10 w-10 max-sm:h-9 max-sm:w-9"
            src={logo}
            alt=""
            priority
          />
          <span className="font-display text-lg font-bold tracking-tight text-ink max-sm:text-base">
            PRO Lidera Skills
          </span>
        </Link>

        <ul
          className={`list-none items-center gap-1 max-sm:absolute max-sm:left-0 max-sm:top-16 max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-1 max-sm:border-b max-sm:border-line max-sm:bg-white max-sm:p-4 max-sm:shadow-lift sm:flex ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <li>
            <Link href="/" className={`block ${navLink}`} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <a href="#about-us" className={`block ${navLink}`} onClick={closeMenu}>
              Quem somos
            </a>
          </li>
          <li>
            <a href="#footer" className={`block ${navLink}`} onClick={closeMenu}>
              Contato
            </a>
          </li>

          {user && (
            <>
              <li className="flex items-center gap-3 max-sm:px-3 max-sm:py-2 sm:ml-2">
                <Avatar>
                  <AvatarImage src={avatarUrl || ""} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <DropdownMenuDemo />
              </li>
            </>
          )}
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-2xl text-ink hover:bg-primary/10 sm:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
        </button>
      </nav>
    </header>
  );
}
