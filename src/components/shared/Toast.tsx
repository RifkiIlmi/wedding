"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({
  message,
  type = "info",
  isVisible,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-sm pointer-events-auto"
        >
          <div className="bg-white/95 backdrop-blur-xl border border-gold/20 shadow-2xl rounded-2xl p-4 flex items-start gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gold/50" />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gold/10 rounded-full blur-xl" />
            
            <div className="mt-0.5 shrink-0">
              {type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-gold" />
              )}
              {type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
              {type === "info" && (
                <div className="w-5 h-5 rounded-full border border-gold/50 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                </div>
              )}
            </div>
            
            <div className="flex-1 pr-6">
              <p className="font-sans text-sm text-dark/80 leading-relaxed">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-dark/40 hover:text-dark/80 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("info");

  const showToast = useCallback((msg: string, t: ToastType = "info") => {
    setMessage(msg);
    setType(t);
    setIsVisible(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  const ToastComponent = useCallback(
    () => (
      <Toast
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={hideToast}
      />
    ),
    [message, type, isVisible, hideToast]
  );

  return { showToast, ToastComponent };
};
