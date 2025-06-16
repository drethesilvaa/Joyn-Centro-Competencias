"use client";

import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import AntThemeConfig from "../configs/AntThemeConfig";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ConfigProvider theme={AntThemeConfig}>
        {children}
      </ConfigProvider>
    </SessionProvider>
  );
}
