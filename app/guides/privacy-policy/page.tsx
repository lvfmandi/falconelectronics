import { components } from "@/components/guides";
import { PrivacyContent } from "@/lib/queries/guides";
import { PortableText } from "@portabletext/react";

async function PrivacyPolicy() {
  const content = await PrivacyContent();
  return (
    <main className="space-y-4">
      <PortableText value={content} components={components} />
    </main>
  );
}

export default PrivacyPolicy;
