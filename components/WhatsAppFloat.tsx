import Image from "next/image";
import Link from "next/link";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
  chatbotUrl?: string;
}

export default function WhatsAppFloat({
  phoneNumber = "+971585821533", // Default to your company number
  message = "Hello! I'm interested in your services.",
  chatbotUrl = "https://ai-assist.intelligencecloudsphere.com/", // Default chatbot URL - replace with your actual chatbot link
}: WhatsAppFloatProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(
    /[^0-9]/g,
    ""
  )}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-12 z-50 flex flex-col items-center gap-8">
      {/* Chatbot Icon - positioned left */}
      <Link
        href={chatbotUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group hover:scale-110"
        aria-label="Chat with our AI assistant"
      >
        <div className="relative">
          {/* Chatbot Logo */}
          <Image
            src="/chatBot.png" // Replace with your actual chatbot PNG path
            alt="Chatbot"
            width={60}
            height={60}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 object-contain rounded-md"
          />

          {/* Pulse animation ring for chatbot */}
          {/* <div className="absolute -inset-2 rounded-full bg-blue-500 opacity-20 animate-ping group-hover:animate-none"></div> */}

          {/* Chatbot Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with AI Assistant
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </Link>

      {/* WhatsApp Icon - positioned right */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group hover:scale-110 transition-transform duration-300 ease-in-out"
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
          {/* <div className="absolute -inset-3 rounded-full bg-green-500 opacity-20 animate-ping group-hover:animate-none"></div> */}

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
