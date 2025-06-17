"use client"

import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from 'next/navigation';

const items: MenuProps['items'] = [
    { key: 'home', label: 'Home' },
    { key: 'artigos', label: 'Artigos' },
    { key: 'cc', label: 'Centros de Competência' },
    { key: 'mentores', label: 'Mentores' },
    { key: 'eventos', label: 'Eventos' },
    { key: 'politicas', label: 'Políticas' },
    {
        key: 'login',
        icon: <SignInIcon size={18} weight="bold" />,
    },
];

const pathToMenuKey: Record<string, string> = {
    '/': 'home',
    '/artigos': 'artigos',
    '/centros-de-competencia': 'cc',
    '/mentores': 'mentores',
    '/eventos': 'eventos',
    '/politicas': 'politicas',
    '/login': 'login',
};

const Navbar: React.FC = () => {


    const router = useRouter();
    const pathname = usePathname();

    const selectedKey = pathToMenuKey[pathname || "home"] || 'home';

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const keyToPath: Record<string, string> = {
            home: '/',
            artigos: '/artigos',
            cc: '/centros-de-competencia',
            mentores: '/mentores',
            eventos: '/eventos',
            politicas: '/politicas',
            login: '/login',
        };

        const destination = keyToPath[e.key];
        if (destination) {
            router.push(destination);
        }
    };


    return (
        <nav
            style={{
                padding: "0 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="/logo.png" // replace with your logo path
                    alt="JOY'N"
                    style={{ height: 40 }}
                />
            </div>

            {/* Menu */}
            <Menu
                mode="horizontal"
                onClick={handleMenuClick}
                selectedKeys={[selectedKey]}
                items={items}
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    borderBottom: "none",
                    background: "transparent",
                }}
            />
        </nav>

    );
};

export default Navbar;
