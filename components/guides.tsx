import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    // Ex. 1: customizing common block types
    h1: ({ children }) => <h1 className="text-5xl font-light">{children}</h1>,
    h2: ({ children }) => <h2 className="text-4xl font-light">{children}</h2>,
    h3: ({ children }) => <h3 className="text-3xl font-light">{children}</h3>,
    h4: ({ children }) => <h4 className="text-2xl font-light">{children}</h4>,
    h5: ({ children }) => <h5 className="text-xl font-light">{children}</h5>,
    h6: ({ children }) => <h6 className="text-lg font-light">{children}</h6>,
    p: ({ children }) => <p className="">{children}</p>,
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul className="mt-xl list-disc pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-lg list-decimal pl-4">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a href={value?.href} target={target} className="text-primary capitalize">
          {children}
        </a>
      );
    },
  },
};
