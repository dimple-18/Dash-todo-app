import React, { useRef, useEffect } from "react";

function Modal({ children, onClose }) {
  const backdropRef = useRef(null);

  // Close on ESC only when open
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Close when clicking outside the dialog
  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      className="Modal"
      ref={backdropRef}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="container" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;