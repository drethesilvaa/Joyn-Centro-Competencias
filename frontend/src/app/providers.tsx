"use client";

import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import { ReactNode, useState } from "react";
import AntThemeConfig from "../configs/AntThemeConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ConfigProvider theme={AntThemeConfig}>
          {children}
        </ConfigProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
