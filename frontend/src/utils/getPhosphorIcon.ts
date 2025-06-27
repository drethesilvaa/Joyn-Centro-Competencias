// import * as PhosphorIcons from "phosphor-react";
import * as PhosphorIcons from "@phosphor-icons/react/dist/ssr";

export const getPhosphorIcon = (
  iconName?: string
): React.ComponentType<any> => {
  if (!iconName || typeof iconName !== "string") {
    return PhosphorIcons.QuestionIcon;
  }

  if (iconName in PhosphorIcons) {
    return (PhosphorIcons as any)[`${iconName}Icon`];
  }

  return PhosphorIcons.QuestionIcon;
};
