import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE_DEFAULT } from "@/lib/constants";

export const WhatsAppButton = () => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE_DEFAULT)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-xl bg-[#25D366] animate-ping opacity-20" />
        {/* Button — square with slight rotation for personality */}
        <div className="relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-xl bg-[#25D366] text-white shadow-ink-lg group-hover:shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all">
          <MessageCircle className="h-6 w-6" />
        </div>
      </div>
    </a>
  );
};
