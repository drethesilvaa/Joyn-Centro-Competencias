import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";

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

const Navbar: React.FC = () => {
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
