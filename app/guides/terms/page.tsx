import { components } from "@/components/guides";
import { TermsContent } from "@/lib/queries/guides";
import { PortableText } from "@portabletext/react";

async function Terms() {
  const content = await TermsContent();
  return (
    <main className="space-y-4">
      <PortableText value={content} components={components} />
    </main>
  );
}

export default Terms;
