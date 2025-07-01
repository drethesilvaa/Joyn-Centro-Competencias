import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "content/homepage",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }, // optional, disable creating/deleting
        },
        fields: [
          {
            type: "object",
            name: "home",
            label: "Home",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                ui: { component: "textarea" },
              },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "ctaText", label: "CTA Text" },
              { type: "image", name: "card1", label: "Card 1 (Image)" },
              { type: "string", name: "card2", label: "Card 2" },
              { type: "string", name: "card3", label: "Card 3" },
              {
                type: "string",
                name: "card4",
                label: "Card 4",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "centros",
            label: "Centros",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Text",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaText", label: "CTA Text" },
              {
                type: "string",
                name: "quote",
                label: "Quote",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "joynAcademy",
            label: "Joyn Academy",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Text",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaText", label: "CTA Text" },
              {
                type: "object",
                name: "topics",
                label: "Topics",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.text || "Topic" }),
                },
                fields: [
                  { type: "string", name: "iconName", label: "Icon Name" },
                  { type: "string", name: "text", label: "Text" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "mentores",
            label: "Mentores",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Text",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaText", label: "CTA Text" },
              {
                type: "object",
                name: "mentors",
                label: "Mentors",
                list: true,
                ui: {
                  itemProps: (item) => ({ label: item?.text || "Mentor" }),
                },
                fields: [
                  { type: "image", name: "image", label: "Image" },
                  { type: "string", name: "text", label: "Text" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "eventos",
            label: "Eventos",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Text",
                ui: { component: "textarea" },
              },
              { type: "string", name: "ctaText", label: "CTA Text" },
              {
                type: "object",
                name: "images",
                label: "Images (Max 4)",
                list: true,
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
                ui: {
                  validate: (val) =>
                    val?.length > 4 ? "Max 4 images allowed" : undefined,
                },
              },
            ],
          },
        ],
      },
      {
        name: "centrosDeCompetencia",
        label: "Centros de Competencia",
        path: "content/centrosDeCompetencia",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false }, // optional, disable creating/deleting
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Video URL",
              },
              {
                type: "image",
                name: "imageToSwapForVideo",
                label: "Image to Swap for Video",
              },
            ],
          },
          {
            type: "object",
            name: "objectives",
            label: "Objetivos",
            fields: [
              {
                type: "object",
                name: "topics",
                label: "Tópicos",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.description || "" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "iconName",
                    label: "Icon Name",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "centrosDeCompetencia",
            label: "Centros de Competencia",
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "" };
              },
            },
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              // Charts Array
              {
                type: "object",
                name: "charts",
                label: "Charts",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title || "New Chart" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "chartType",
                    label: "Chart Type",
                    required: true,
                    options: [
                      { value: "bar", label: "Bar Chart" },
                      { value: "line", label: "Line Chart" },
                      { value: "pie", label: "Pie Chart" },
                    ],
                  },
                  {
                    type: "object",
                    name: "values",
                    label: "Values",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.name || "" };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Name",
                        required: true,
                      },
                      {
                        type: "number",
                        name: "value",
                        label: "Value",
                        required: true,
                      },
                    ],
                  },
                ],
              },
              // Learning Array
              {
                type: "object",
                name: "learning",
                label: "Learning",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title || "" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  // Topics Array
                  {
                    type: "object",
                    name: "topics",
                    label: "Topics",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.topicTitle || "" };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "topicTitle",
                        label: "Topic Title",
                        required: true,
                      },
                      {
                        type: "object",
                        name: "topicDetails",
                        label: "Topic Details",
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item?.description || "" };
                          },
                        },
                        fields: [
                          {
                            type: "string",
                            name: "iconName",
                            label: "Icon Name",
                            required: true,
                          },
                          {
                            type: "string",
                            name: "description",
                            label: "Description",
                            ui: {
                              component: "textarea",
                            },
                          },
                          {
                            type: "string",
                            name: "url",
                            label: "URL",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Feedback Object
              {
                type: "object",
                name: "feedback",
                label: "Feedback",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.description || "" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "object",
                    name: "topics",
                    label: "Topics",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title || "" };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "iconName",
                        label: "Icon Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                        required: true,
                      },
                    ],
                  },
                ],
              },
              // Incentivos Object
              {
                type: "object",
                name: "incentivos",
                label: "Incentivos",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.description || "" };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "object",
                    name: "topics",
                    label: "Topics",
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title || "" };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "iconName",
                        label: "Icon Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Title",
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "pageArtigos",
        label: "Pagina Artigos",
        path: "content/pageArtigos",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL",
          },
          {
            type: "image",
            name: "imageToSwapForVideo",
            label: "Image to Swap for Video",
          },
        ],
      },
      {
        name: "artigos",
        label: "Artigos",
        path: "content/artigos",
        ui: {
          itemProps: (item) => {
            return { label: item?.title || "New Article" };
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "subTitle",
            label: "Sub Title",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true,
          },
          {
            type: "string",
            name: "authorRole",
            label: "Author Role",
          },
          {
            type: "image",
            name: "authorPic",
            label: "Author Picture",
          },
          {
            type: "image",
            name: "articleImage",
            label: "Article Image",
          },
          {
            type: "string",
            name: "content",
            label: "Content",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
