"use client"

import { PagesLayout } from "@/layouts/PagesLayout";
import { useCentrosCompetenciaQuery } from "../hooks/useCentrosCompetenciaQuery";
import { Anchor } from "antd";
import { useEffect, useRef, useState } from "react";
import { Objectives } from "../components/Objectives";
import { CentroDeCompetencia } from "../components/CentroDeCompetencia";

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

    if (query.isLoading) return <p>Loading</p>

    return (
        <PagesLayout
            pageTitle={query.data?.header?.title || ""}
            pageDescription={query.data?.header?.description || ""}
            pageImage={query.data?.header?.imageToSwapForVideo || ""}
            pageImageAlt=""
        >
            <div className="grid grid-cols-12 mt-14 gap-6">
                <div className="xl:hidden col-span-12 mb-6 ">
                    <Anchor
                        className="body-xl overflow-x-auto bg-gradient-to-bl from-[#FCFCFC] to-[#F4F4F6] pt-5"
                        replace
                        direction="horizontal"
                        items={anchorItems}
                    />
                </div>
                <div className="col-span-12 xl:col-span-10 grid gap-20">
                    <div id="objetivos">
                        <Objectives content={query.data?.objectives} />
                    </div>
                    {query.data?.centrosDeCompetencia?.map((centro, index) => {
                        const id = createId(centro?.title || '', index);
                        return (
                            <div key={index} id={id}>
                                <CentroDeCompetencia content={centro} />
                            </div>
                        );
                    })}
                </div>
                <div className="hidden xl:block xl:col-span-2">
                    <Anchor
                        className="body-xl sticky top-10"
                        replace
                        direction="vertical"
                        items={anchorItems}
                    />
                </div>
            </div>
        </PagesLayout>
    );
}