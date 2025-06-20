"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";

export function AppProgressBar() {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        NProgress.set(0.4);
        NProgress.done();
    }, [pathname]);

    return null;
}
