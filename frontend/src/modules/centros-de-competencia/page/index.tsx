"use client"

import { PagesLayout } from "@/layouts/PagesLayout";
import { useCentrosCompetenciaQuery } from "../hooks/useCentrosCompetenciaQuery";
import { Anchor } from "antd";
import { useEffect, useRef, useState } from "react";

export const CentrosDeCompetenciaPage = () => {

    const query = useCentrosCompetenciaQuery();

    const topRef = useRef<HTMLDivElement>(null);
    const [targetOffset, setTargetOffset] = useState<number>();

    useEffect(() => {
        setTargetOffset(topRef.current?.clientHeight);
    }, []);


    if (query.isLoading) return <p>Loading</p>

    return <PagesLayout
        pageTitle={query.data?.header?.title || ""}
        pageDescription={query.data?.header?.description || ""}
        pageImage={query.data?.header?.imageToSwapForVideo || ""}
        pageImageAlt="">

        <div className="grid grid-cols-12">
            <div className="col-span-10">
                <div
                    id="part-1"
                    style={{ height: '100vh', background: 'rgba(255,0,0,0.02)', marginTop: '30vh' }}
                >
                    Part 1
                </div>
                <div id="part-2" style={{ height: '100vh', background: 'rgba(0,255,0,0.02)' }}>
                    Part 2
                </div>
                <div id="part-3" style={{ height: '100vh', background: 'rgba(0,0,255,0.02)' }}>
                    Part 3
                </div>
            </div>
            <Anchor
                className="col-span-2"
                replace
                items={[
                    { key: 'part-1', href: '#part-1', title: 'Part 1' },
                    { key: 'part-2', href: '#part-2', title: 'Part 2' },
                    { key: 'part-3', href: '#part-3', title: 'Part 3' },
                ]}
            />
        </div>

    </PagesLayout>
}