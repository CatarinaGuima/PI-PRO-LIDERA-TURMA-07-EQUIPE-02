import { cn } from "@/lib/utils";

/**
 * A "escada da liderança": os três níveis possíveis do resultado, do mais
 * baixo ao mais alto. É o elemento visual central do site — aparece na home
 * (sem destaque) e na tela de resultado (destacando o degrau do usuário).
 *
 * As faixas de pontos espelham as regras de classificação do questionário.
 */
export const LEVELS = [
  {
    name: "Liderança frágil e pouco trabalhada",
    range: "18 a 35 pontos",
    surface: "bg-leaf text-ink",
    width: "w-[64%] sm:w-auto",
    height: "sm:h-[46%]",
  },
  {
    name: "Liderança em desenvolvimento",
    range: "36 a 53 pontos",
    surface: "bg-[#2A7E9E] text-white",
    width: "w-[82%] sm:w-auto",
    height: "sm:h-[72%]",
  },
  {
    name: "Líder de alta performance",
    range: "54 a 72 pontos",
    surface: "bg-violet-600 text-white",
    width: "w-full sm:w-auto",
    height: "sm:h-full",
  },
] as const;

/** Converte o nome da categoria do resultado no índice do degrau (ou -1). */
export function levelIndex(category: string): number {
  return LEVELS.findIndex((level) => level.name === category);
}

type LadderProps = {
  /** Índice do degrau a destacar. Sem valor, todos aparecem em igualdade. */
  active?: number;
  /** Sobe os degraus um a um quando a página abre. */
  animated?: boolean;
  className?: string;
};

export function Ladder({ active, animated = false, className }: LadderProps) {
  const hasActive = typeof active === "number" && active >= 0;

  return (
    <ol
      aria-label="Níveis de liderança, do menor para o maior"
      className={cn(
        "flex flex-col gap-2 border-l-2 border-ink/20 sm:h-[26rem] sm:flex-row sm:items-end sm:gap-3 sm:border-b-2 sm:border-l-0",
        className
      )}
    >
      {LEVELS.map((level, index) => {
        const isActive = hasActive && index === active;
        const isDimmed = hasActive && !isActive;

        return (
          <li
            key={level.name}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "min-w-0 overflow-hidden rounded-r-2xl transition-opacity sm:flex-1 sm:rounded-b-none sm:rounded-t-2xl",
              level.width,
              level.height,
              isDimmed && "opacity-50"
            )}
          >
            <div
              className={cn(
                "flex h-full flex-col justify-between gap-3 p-4 sm:p-3.5 lg:p-5",
                level.surface,
                animated && "motion-safe:animate-rise"
              )}
              style={animated ? { animationDelay: `${index * 150}ms` } : undefined}
            >
              <p className="hyphens-auto break-words font-display text-base font-semibold leading-snug sm:text-[0.9rem] lg:text-[1.05rem] xl:text-lg">
                {level.name}
              </p>
              <div className="flex flex-col items-start gap-2">
                {isActive && (
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-ink">
                    Seu resultado
                  </span>
                )}
                <span className="text-sm font-medium opacity-90">
                  {level.range}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
