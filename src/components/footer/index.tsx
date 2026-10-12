"use client";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import logo from "../../../src/assets/images/logo.png";

const contactLink =
  "inline-flex items-center gap-2.5 text-[0.95rem] text-white/85 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div
        id="footer"
        className="mx-auto flex max-w-[1240px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between"
      >
        <div className="flex max-w-xs flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white">
              <Image className="h-8 w-8" src={logo} alt="" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              PRO Lidera Skills
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Avaliação de liderança para quem quer entender onde está e para
            onde pode crescer.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-base font-semibold">Contato</h2>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a href="https://wa.me/+1234567890" className={contactLink}>
                <FaWhatsapp className="text-xl" aria-hidden />
                +55 81 xxxxx-xxxx
              </a>
            </li>
            <li>
              <a href="mailto:info@example.com" className={contactLink}>
                <MdOutlineEmail className="text-xl" aria-hidden />
                info@example.com
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5 text-[0.95rem] text-white/85">
              <CiLocationOn className="text-xl" aria-hidden />
              Recife
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <small className="mx-auto block max-w-[1240px] px-4 py-4 text-xs text-white/60 sm:px-6">
          Copyright © 2024 PRO Lidera Skills. Todos os direitos reservados.
        </small>
      </div>
    </footer>
  );
}
