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
                  validate: (val) => val?.length > 4 && "Max 4 images allowed",
                },
              },
            ],
          },
        ],
      },
    ],
  },
});
