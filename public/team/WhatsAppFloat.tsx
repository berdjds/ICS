import Image from "next/image";
import Link from "next/link";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloat({
  phoneNumber = "+971585821533", // Default to your company number
  message = "Hello! I'm interested in your services.",
}: WhatsAppFloatProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-2 z-50 group hover:scale-110 transition-transform duration-300 ease-in-out"
      aria-label="Contact us on WhatsApp"
    >
      <div className="relative">
        {/* WhatsApp Logo */}
        <Image
          src="/wp2.png"
          alt="WhatsApp"
          width={80}
          height={80}
          className="shadow-lg hover:shadow-xl transition-shadow duration-300 object-contain"
        />

        {/* Pulse animation ring */}
        <div className="absolute -inset-3 rounded-full bg-green-500 opacity-20 animate-ping group-hover:animate-none"></div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </Link>
  );
}
