import React, { useEffect } from "react";
import "./LuxeToast.css";

export default function LuxeToast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="luxe-toast">
      <span className="luxe-toast-msg">{message}</span>
    </div>
  );
}
