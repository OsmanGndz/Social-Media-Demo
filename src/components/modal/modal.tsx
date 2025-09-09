import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // dışa tıklayınca kapansın
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-[80%] max-w-sm max-h-72 overflow-y-scroll p-6"
        onClick={(e) => e.stopPropagation()} // içerik tıklanınca kapanmasın
      >
        {children}
      </div>
    </div>
  );
}
