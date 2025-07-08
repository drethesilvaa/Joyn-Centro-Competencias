"use client"

import { Button, Card } from 'antd';
import { HomepageTemplate } from '../layouts/Template';
import { useRouter, useSearchParams } from 'next/navigation';
import { HomepageCentros } from '../components/Centros';
import { HomepageMentores } from '../components/Mentores';
import { HomepageEventos } from '../components/Eventos';
import { HomepageJoynAcademy } from '../components/JoynAcademy';
import { JSX } from 'react';
import Image from 'next/image';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useHomepageData } from '@/providers/HomepageDataProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProgressBar } from '@/components/AppProgressBar';

const homePageComponents: Record<string, JSX.Element> = {
    "nossos-centros": (
        <motion.div
            key="nossos-centros"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <HomepageCentros />
        </motion.div>
    ),
    lideres: (
        <motion.div
            key="lideres"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <HomepageMentores />
        </motion.div>
    ),
    eventos: (
        <motion.div
            key="eventos"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <HomepageEventos />
        </motion.div>
    ),
    "joyn-academy": (
        <motion.div
            key="joyn-academy"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <HomepageJoynAcademy />
        </motion.div>
    ),
};


const Homepage = () => {


    const router = useRouter()
    const searchParams = useSearchParams();
    const { data, isLoading, error } = useHomepageData();

    if (isLoading) return <AppProgressBar />;
    if (error || !data) return <p>Erro ao carregar dados</p>;

    const xParam = searchParams?.get('screen');
    const children = homePageComponents[xParam || ""];

    if (children) {
        return (<HomepageTemplate>
            <AnimatePresence mode="wait">{children}</AnimatePresence>
        </HomepageTemplate>)
    }


    return (
        <HomepageTemplate>
            <AnimatePresence mode="wait">
                <div className="grid lg:grid-cols-2 custom-gap-6">
                    <div className='flex flex-col custom-gap-6 justify-center'>
                        <motion.span initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.01, ease: "easeOut" }}
                            className='heading-6xl'>
                            <MarkdownRenderer content={data.home?.title || ""} />
                        </motion.span>
                        <motion.p initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.02, ease: "easeOut" }}>
                            {data.home?.subtitle}
                        </motion.p>
                        <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.03, ease: "easeOut" }}>
                            <Button onClick={() => router.push("?screen=nossos-centros")} size='large' type="primary">{data.home?.ctaText}</Button>
                        </motion.div>
                    </div>
                    <div className='grid grid-cols-2 custom-gap-6'>
                        <div className='grid grid-rows-9 custom-gap-6 pt-16'>
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.04, ease: "easeOut" }}
                                className='row-span-5 p-0  rounded-2xl overflow-hidden '
                            >
                                <Card className='h-full'>
                                    <Image fill={true} className="object-cover" src={data.home?.card1 || ""} alt='card image' />
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
                                className='row-span-4 p-0  rounded-2xl overflow-hidden '
                            >
                                <Card className='bg-primary flex items-end p-6 h-full'>
                                    <p className='text-white heading-5xl'>{data.home?.card2?.split(" ")[0]}</p>
                                    <p className='text-white heading-xl'>{data.home?.card2?.split(" ")[1]}</p>
                                </Card>
                            </motion.div>

                        </div>
                        <div className='grid grid-rows-9 custom-gap-6 pb-16'>
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
                                className='row-span-4 p-0 rounded-2xl overflow-hidden '
                            >
                                <Card className='h-full bg-secondary flex items-end p-6 '>
                                    <p className='text-white heading-5xl'>{data.home?.card3?.split(" ")[0]}</p>
                                    <p className='text-white heading-xl'>{data.home?.card3?.split(" ")[1]}</p>
                                </Card>
                            </motion.div>
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 0.07, ease: "easeOut" }}
                                className='row-span-5 p-0 rounded-2xl overflow-hidden '
                            >
                                <Card className='h-full bg-accent flex items-end p-6 text-white heading-2xl font-light'>
                                    <MarkdownRenderer content={data.home?.card4 || ""} />
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </AnimatePresence>
        </HomepageTemplate>
    )
}

export default Homepage