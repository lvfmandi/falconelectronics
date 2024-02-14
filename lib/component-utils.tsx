// components
import { Icons } from "@/components/icons";

export const icons = [
    {
      icon: (
        <Icons.bestPrices size={24} strokeWidth={0.1} className="text-primary" />
      ),
      heading: "Best Prices",
      content: "We offer the best prices",
    },
    {
      icon: (
        <Icons.delivery size={24} strokeWidth={0.1} className="text-primary" />
      ),
      heading: "Deliveries",
      content: "We deliver products all over Kenya within two business days",
    },
    {
      icon: <Icons.money size={24} strokeWidth={0.1} className="text-primary" />,
      heading: "Pay on delivery",
      content: "We accept payment on delivery",
    },
  ];