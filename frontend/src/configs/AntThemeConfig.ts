import { ThemeConfig } from "antd";

const AntThemeConfig: ThemeConfig = {
  token: {
    fontFamily: "Lato, sans-serif",
    // @ts-expect-error: fontFamilyHeading is supported but not typed
    fontFamilyHeading: "Karla, serif",
    colorPrimary: "#56566c",
    colorPrimaryHover: "#4d4d61",
  },
};

export default AntThemeConfig;
