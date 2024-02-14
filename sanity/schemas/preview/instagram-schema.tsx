import { InstagramEmbed } from "react-social-media-embed";

import { FaInstagram } from "react-icons/fa";
import { PreviewProps, defineType } from "sanity";

interface InstagramPreviewProps extends PreviewProps {
  url?: string;
}

function InstagramPreview(props: InstagramPreviewProps) {
  const { url } = props;
  if (!url)
    return <span>Double click to add a URL from an instagram post </span>;
  return <InstagramEmbed url={url} />;
}

export const instagram = defineType({
  name: "instagram",
  title: "Instagram Post",
  type: "object",
  description: "📷 Visit an Instagram post in a browser and copy the URL.",
  icon: FaInstagram,
  fields: [
    {
      name: "url",
      title: "Instagram URL",
      type: "url",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    preview: InstagramPreview,
  },
});
