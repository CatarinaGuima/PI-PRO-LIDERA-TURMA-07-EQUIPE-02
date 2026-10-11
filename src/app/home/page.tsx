import { ArrowDown, ArrowRight, Compass, Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import illustration from "@/assets/images/rb_76463.png";

export default function HomePage() {
  return (
    <main className="bg-[#f5f4ed] text-[#172b2a]">
      <section className="relative isolate flex min-h-[calc(100svh-12rem)] items-center overflow-hidden bg-[#103c38] px-6 pb-8 pt-16 text-white sm:px-10 sm:pb-16 sm:pt-24 lg:px-16 lg:pb-20 lg:pt-20">
        <div className="absolute inset-0 -z-10 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="relative z-10 max-w-2xl py-2 sm:py-4">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f6b84b] sm:text-sm">
              <span className="h-px w-8 bg-[#f6b84b]" />
              PRO Lidera Skills
            </p>
            <h1 className="max-w-[12ch] text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Liderar começa por <span className="text-[#f6b84b]">se conhecer.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#d6e5df] sm:mt-6 sm:text-lg sm:leading-8">
              Descubra suas habilidades, reconheça seus pontos fortes e encontre
              caminhos práticos para crescer como líder.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <Link
                href="/cadastro"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#f6b84b] px-6 py-3 font-bold text-[#172b2a] transition-colors hover:bg-[#ffd27c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Começar avaliação <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center px-6 py-3 font-semibold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Já tenho uma conta
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#d6e5df] sm:mt-7">
              Uma jornada de autoconhecimento, no seu ritmo.
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-[200px] items-center justify-center sm:max-w-xl lg:justify-end">
            <div className="absolute bottom-[12%] left-[8%] h-20 w-20 border border-[#f6b84b]/70 sm:h-28 sm:w-28" />
            <Image
              src={illustration}
              alt="Duas pessoas analisam juntas uma avaliação de habilidades"
              priority
              className="relative z-10 h-auto w-full max-w-[200px] drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)] sm:max-w-[380px] lg:max-w-[440px]"
              sizes="(max-width: 768px) 82vw, 440px"
            />
            <div className="absolute right-0 top-[10%] hidden h-14 w-14 border-r-2 border-t-2 border-[#f6b84b] sm:block" />
          </div>
        </div>
        <a
          href="#about-us"
          aria-label="Conheça a plataforma"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/75 transition-colors hover:text-white sm:block"
        >
          <ArrowDown size={20} aria-hidden="true" />
        </a>
      </section>

      <section id="about-us" className="px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 border-b border-[#172b2a]/20 pb-8 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#23766b] sm:text-sm">
              Autoconhecimento em movimento
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
              Mais clareza para liderar do seu jeito.
            </h2>
          </div>
          <div className="grid gap-8 pt-8 sm:grid-cols-3 sm:gap-10">
            <article className="border-t-2 border-[#23766b] pt-5">
              <Compass className="mb-5 text-[#23766b]" size={25} strokeWidth={1.8} aria-hidden="true" />
              <h3 className="text-xl font-bold">Entenda seu perfil</h3>
              <p className="mt-3 max-w-sm leading-7 text-[#52615d]">
                Veja como suas atitudes e competências aparecem na sua forma de liderar.
              </p>
            </article>
            <article className="border-t-2 border-[#e98742] pt-5">
              <Target className="mb-5 text-[#c5662c]" size={25} strokeWidth={1.8} aria-hidden="true" />
              <h3 className="text-xl font-bold">Reconheça prioridades</h3>
              <p className="mt-3 max-w-sm leading-7 text-[#52615d]">
                Identifique pontos fortes e oportunidades para orientar seus próximos passos.
              </p>
            </article>
            <article className="border-t-2 border-[#d6aa35] pt-5">
              <TrendingUp className="mb-5 text-[#a47c13]" size={25} strokeWidth={1.8} aria-hidden="true" />
              <h3 className="text-xl font-bold">Evolua continuamente</h3>
              <p className="mt-3 max-w-sm leading-7 text-[#52615d]">
                Transforme percepções em ações concretas para desenvolver sua liderança.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
