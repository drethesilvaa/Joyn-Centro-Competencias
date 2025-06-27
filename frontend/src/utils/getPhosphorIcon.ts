import * as PhosphorIcons from "phosphor-react";

export const getPhosphorIcon = (
  iconName?: string
): React.ComponentType<any> => {
  if (!iconName || typeof iconName !== "string") {
    return PhosphorIcons.Question;
  }

  if (iconName in PhosphorIcons) {
    return (PhosphorIcons as any)[iconName];
  }

  return PhosphorIcons.Question;
};
