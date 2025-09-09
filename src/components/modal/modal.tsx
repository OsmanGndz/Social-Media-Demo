import type { ReactNode } from "react";
import { MdCancel } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  scrollable?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  scrollable = false,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-lg w-[80%] max-w-md flex flex-col gap-4 ${
          scrollable
            ? "max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
            : "max-h-fit"
        } p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="cursor-pointer">
            <MdCancel size={24} />
          </button>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
}
