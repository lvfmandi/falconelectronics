import { components } from "@/components/guides";
import { ShippingContent } from "@/lib/queries/guides";
import { PortableText } from "@portabletext/react";

async function ShippingPolicy() {
  const content = await ShippingContent();
  return (
    <main className="space-y-4">
      <PortableText value={content} components={components} />
    </main>
  );
}

export default ShippingPolicy;
