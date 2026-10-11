import { cloneElement, ReactElement } from "react";
import { CustomButton } from "@/components/button/custom-button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  icon: ReactElement;
  message?: string;
  title?: string;
  confirmButtonLabel: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  message,
  confirmButtonLabel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lift">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#FBEFC9] text-[#8A5A00]">
          {cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        <h2
          id="confirm-dialog-title"
          className="font-display text-xl font-bold text-ink"
        >
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-2 text-ink-soft">
          {message}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <CustomButton type="button" variant="outline" onClick={onClose}>
            Voltar
          </CustomButton>
          <CustomButton type="button" onClick={onConfirm}>
            {confirmButtonLabel}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
