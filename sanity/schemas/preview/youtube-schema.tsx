import { YouTubeEmbed } from "react-social-media-embed";

import { FaYoutube } from "react-icons/fa";
import { PreviewProps, defineType } from "sanity";

interface YoutubePreviewProps extends PreviewProps {
  url?: string;
}

function YoutubePreview(props: YoutubePreviewProps) {
  const { url } = props;
  if (!url)
    return <span>Double click to add a URL from an instagram post </span>;
  return <YouTubeEmbed url={url} />;
}

export const youtube = defineType({
  name: "youtube",
  title: "Youtube Post",
  type: "object",
  description: "🎥 Visit an Instagram post in a browser and copy the URL.",
  icon: FaYoutube,
  fields: [
    {
      name: "url",
      title: "Youtube URL",
      type: "url",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: {
    preview: YoutubePreview,
  },
});
