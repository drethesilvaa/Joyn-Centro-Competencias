"use client"

import { ReactNode } from "react"
import { BrainIcon, ArrowRightIcon, LecternIcon, ChalkboardIcon, CalendarDotsIcon } from '@phosphor-icons/react/dist/ssr';
import { Button, Card } from 'antd';
import { useRouter } from "next/navigation";
import { homePageScreens } from "../data/homepage-screens";
import { useSearchParams } from "next/navigation";

interface TemplateProps {
    children: ReactNode
}

const cardData = [
    {
        key: "centros",
        icon: <BrainIcon size={32} />,
        title: "Os Nossos Centros",
    },
    {
        key: "joynAcademy",
        icon: <LecternIcon size={32} />,
        title: "JOYN ACADEMY",
    },
    {
        key: "mentores",
        icon: <ChalkboardIcon size={32} />,
        title: "OS MENTORES",
    },
    {
        key: "eventos",
        icon: <CalendarDotsIcon size={32} />,
        title: "OS EVENTOS",
    },
];

export const HomepageTemplate = ({ children }: TemplateProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const xParam = searchParams?.get('screen');

    return (
        <div className='grid grid-flow-row auto-rows-max gap-24 py-16'>
            <div className="grid row-span-6 2xl:row-span-8">
                {children}
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {cardData.map(card => {
                    const isActive = xParam === homePageScreens[card.key];
                    return (
                        <Card
                            key={card.key}
                            className={`
                                w-full group p-4 transition-all duration-300 rounded-sm
                                ${isActive ? "bg-secondary text-white shadow-lg" : ""}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                {card.icon}
                                <h1 className="uppercase font-semibold">{card.title}</h1>
                            </div>
                            <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300">
                                Card content
                                <div className='flex justify-end'>
                                    <Button
                                        icon={<ArrowRightIcon />}
                                        onClick={() => router.push(`/?screen=${homePageScreens[card.key]}`)}
                                    />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}
