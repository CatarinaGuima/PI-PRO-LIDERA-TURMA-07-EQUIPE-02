"use client";

type TitleProps = {
  children?: React.ReactNode;
  className?: string;
};

export function Title({ children = "Teste de liderança", className = "" }: TitleProps) {
  return (
    <h1
      className={`font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl ${className}`}
    >
      {children}
    </h1>
  );
}
