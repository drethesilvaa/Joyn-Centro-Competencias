"use client"

import { PagesLayout } from "@/layouts/PagesLayout";
import { useCentrosCompetenciaQuery } from "../hooks/useCentrosCompetenciaQuery";
import { Anchor } from "antd";
import { useEffect, useRef, useState } from "react";
import { Objectives } from "../components/Objectives";
import { CentroDeCompetencia } from "../components/CentroDeCompetencia";
import { AppProgressBar } from "@/components/AppProgressBar";

export const CentrosDeCompetenciaPage = () => {

    const query = useCentrosCompetenciaQuery();

    const topRef = useRef<HTMLDivElement>(null);
    const [targetOffset, setTargetOffset] = useState<number>();

    useEffect(() => {
        setTargetOffset(topRef.current?.clientHeight);
    }, []);

    const createId = (title: string, index: number) => {
        if (!title) return `centro-${index}`;
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const anchorItems = [
        { key: 'objetivos', href: '#objetivos', title: 'Objetivos' },
        ...(query.data?.centrosDeCompetencia?.map((centro, index) => {
            const id = createId(centro?.title || '', index);
            return {
                key: id,
                href: `#${id}`,
                title: centro?.title || `Centro ${index + 1}`
            };
        }) || [])
    ];

    if (query.isLoading) return <AppProgressBar />


    return (
        <PagesLayout
            pageTitle={query.data?.header?.title || ""}
            pageDescription={query.data?.header?.description || ""}
            pageImage={query.data?.header?.imageToSwapForVideo || ""}
            pageImageAlt=""
        >
            <div className="grid grid-cols-12 mt-14 gap-6">
                <div className="col-span-12 xl:col-span-10 grid gap-20">
                    <div id="objetivos">
                        <Objectives content={query.data?.objectives} />
                    </div>
                </div>
            
            </div>
        </PagesLayout>
    );
}