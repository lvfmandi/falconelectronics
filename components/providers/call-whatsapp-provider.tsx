import { usePathname } from "next/navigation";
import { Icons } from "../icons";

export function CallWhatsAppProvider() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] p-3 font-mono text-xs text-white">
      <a href="https://web.whatsapp.com/send?phone=254722414428&text=Hey Falcon Electronics, I need some products" target="blank">
        <Icons.whatsapp color="white" size={24} />
      </a>
    </div>
  );
}
