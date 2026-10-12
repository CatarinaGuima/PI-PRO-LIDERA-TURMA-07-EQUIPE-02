import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "cancel";

type CustomButtonProps = {
  type?: "button" | "submit" | "reset";
  /** primary: ação principal · outline: ação secundária · ghost: ação discreta */
  variant?: Variant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  /** Quando informado, renderiza um link com aparência de botão. */
  href?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[0.95rem] font-semibold leading-tight transition-colors duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  outline:
    "border border-input bg-white text-ink hover:border-primary hover:text-primary",
  ghost: "text-primary hover:bg-primary/10",
  cancel: "text-ink-soft hover:bg-ink/5",
};

export const CustomButton = ({
  type = "button",
  variant = "primary",
  children,
  onClick,
  className,
  disabled = false,
  href,
}: CustomButtonProps) => {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
};
