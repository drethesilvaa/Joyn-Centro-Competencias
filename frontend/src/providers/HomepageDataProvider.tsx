// HomepageDataContext.tsx
"use client";
import PageLoader from "@/layouts/PageLoader";
import { useHomepageQuery } from "@/modules/homepage/hooks/useHomepageQuery";
import React, { createContext, useContext } from "react";

type HomepageDataContextType = ReturnType<typeof useHomepageQuery>;

const HomepageDataContext = createContext<HomepageDataContextType | undefined>(undefined);

export const HomepageDataProvider = ({ children }: { children: React.ReactNode }) => {
    const query = useHomepageQuery();

    return (
        <HomepageDataContext.Provider value={query}>
            {children}
        </HomepageDataContext.Provider>
    );
};

export const useHomepageData = () => {
    const ctx = useContext(HomepageDataContext);
    if (!ctx) {
        throw new Error("useHomepageData must be used within a HomepageDataProvider");
    }
    return ctx;
};
