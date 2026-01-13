import React, { useEffect } from "react";
import "./Notification.css";

export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lux-notif-container">
      <div className="lux-notif">
        <span className="lux-notif-message">{message}</span>
      </div>
    </div>
  );
}
