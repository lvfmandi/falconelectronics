import { defineField, defineType } from "sanity";

export const aboveTheFoldContentImage = defineType({
  name: "aboveTheFoldContentImage",
  title: "Above the fold [content, image]",
  type: "object",
  description:
    "This object contains content on one side and an image on the other. If it contains a background image, the background color won't be applied",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "This will be the title that appears on the top of the page on the left side",
    }),
    defineField({
      name: "paragraph",
      title: "Paragraph",
      type: "string",
      description:
        "This paragraph will be below the title above. It will expound more on the product",
    }),
    defineField({
      name: "primaryButton",
      title: "Primary Button",
      type: "object",
      description:
        "This is the button that will appear first on the page and it will be the main page. Use it for the main thing you want people to click on it",
      fields: [
        defineField({
          name: "name",
          title: "Button Name",
          type: "string",
          description: "The name to appear in the button",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "reference",
          to: [{ type: "page" }],
          description:
            "The link you'll be redirected to when you click the button",
        }),
      ],
    }),
    defineField({
      name: "secondaryButton",
      title: "Secondary Button",
      type: "object",
      description:
        "This will be the second button. It will be the first if the first button is not present. Use it for secondary options where you a re promoting something",
      fields: [
        defineField({
          name: "name",
          title: "Button Name",
          type: "string",
          description: "The name to appear in the button",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "reference",
          to: [{ type: "page" }],
          description:
            "The link you'll be redirected to when you click the button",
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description:
        "🖼️ This image will be on the left or right side of the section",
    }),
    defineField({
      name: "color",
      title: "Backgorund Color",
      type: "color",
      description:
        "This will be the backgruond of the section if the image is absent",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "🖼️ This image will be in the background of the section",
    }),
  ],
});
