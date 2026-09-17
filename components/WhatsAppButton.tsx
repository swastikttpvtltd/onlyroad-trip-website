const whatsappNumber = "919211796168";
const whatsappMessage = "Hello Only Road Trip, I would like to plan a trip.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Only Road Trip on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed right-5 top-1/2 z-[9999] -translate-y-1/2 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 md:right-6 md:h-16 md:w-16"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8 md:h-9 md:w-9" fill="currentColor" aria-hidden="true">
        <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.56 1.74 6.56L3.1 29l6.63-1.59A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.7c-2.1 0-4.15-.56-5.94-1.63l-.43-.26-3.94.95.96-3.84-.28-.45A10.72 10.72 0 1 1 16 26.7Zm5.87-8.02c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.33-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.87-1.75-2.19-.18-.32-.02-.5.14-.66.15-.15.32-.38.48-.57.16-.19.22-.33.32-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.79-1.01-2.45-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71 0 1.6 1.17 3.14 1.33 3.36.16.22 2.3 3.52 5.57 4.93.78.34 1.39.54 1.87.69.79.25 1.5.21 2.06.13.63-.09 1.9-.78 2.17-1.53.27-.76.27-1.41.19-1.54-.08-.14-.3-.22-.62-.38Z" />
      </svg>
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
