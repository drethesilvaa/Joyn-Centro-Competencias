"use client"

import { Button, Card } from 'antd';
import { HomepageTemplate } from '../layouts/Template';
import { useSearchParams } from 'next/navigation';
import { HomepageCentros } from '../components/Centros';
import { HomepageMentores } from '../components/Mentores';
import { HomepageEventos } from '../components/Eventos';
import { HomepageJoynAcademy } from '../components/JoynAcademy';
import { JSX } from 'react';
import { useHomepageQuery } from '../hooks/useHomepageQuery';



const homePageComponents: Record<string, JSX.Element> = {
    "nossos-centros": <HomepageCentros />,
    mentores: <HomepageMentores />,
    eventos: <HomepageEventos />,
    joynAcademy: <HomepageJoynAcademy />,
};


const Homepage = () => {


    const searchParams = useSearchParams();
    const { data, isLoading, error } = useHomepageQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error || !data) return <p>Erro ao carregar dados</p>;

    const xParam = searchParams?.get('screen');
    const children = homePageComponents[xParam || ""];

    if (children) {
        return <HomepageTemplate>{children}</HomepageTemplate>
    }

    return (
        <HomepageTemplate>
            <div className="grid grid-cols-2 gap-6">
                <div className='flex flex-col gap-6 justify-center'>
                    <h1 className='heading-6xl'>{data.home?.title}</h1>
                    <p className=''>{data.home?.subtitle}</p>
                    <div>
                        <Button size='large' type="primary">{data.home?.ctaText}</Button>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <div className='grid gap-6 pt-16'>
                        <Card className='bg-primary'>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        <Card>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>

                    </div>
                    <div className='grid gap-6 pb-16'>
                        <Card className='bg-primary'>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        <Card>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </div>
                </div>
            </div>
        </HomepageTemplate>
    )
}

export default Homepage