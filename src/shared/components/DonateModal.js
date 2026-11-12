"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export default function DonateModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coffee-title"
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-black/10 bg-surface shadow-2xl dark:border-white/10"
      >
        <div className="flex items-center justify-between border-b border-black/5 p-4 dark:border-white/5">
          <h2 id="coffee-title" className="flex items-center gap-2 text-lg font-semibold text-text-main">
            <span className="material-symbols-outlined text-pink-500">coffee</span>
            Buy Me a Coffee
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 p-6">
          <p className="text-center text-sm text-text-muted">Scan this QR code to support CMCU AI Gateway.</p>
          <img
            src="/donate.jpg"
            alt="Buy Me a Coffee payment QR code"
            width="756"
            height="796"
            className="h-auto w-full max-w-[320px] rounded-lg bg-white object-contain"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

DonateModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
