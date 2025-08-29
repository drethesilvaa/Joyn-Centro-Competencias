"use client";

import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { SignInIcon } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const pathToMenuKey: Record<string, string> = {
  "/": "home",
  "/artigos": "artigos",
  "/centros-de-competencia": "cc",
  "/centros-de-competencia/NET": "ccNET",
  "/centros-de-competencia/Dados": "ccDados",
  "/centros-de-competencia/Cloud": "ccCloud",
  "/centros-de-competencia/Human-Evolution": "ccHuman",
  "/mentores": "mentores",
  "/eventos": "eventos",
  "/politicas": "politicas",
  "/gamification": "gamification",
  "/auth/signin": "login",
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const selectedKey = pathToMenuKey[pathname || "home"] || "home";

  const { data: session, status } = useSession();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const keyToPath: Record<string, string> = {
      home: "/",
      artigos: "/artigos",
      cc: "/centros-de-competencia",
      ccNET: "/centros-de-competencia/NET",
      ccDados: "/centros-de-competencia/Dados",
      ccHuman: "/centros-de-competencia/Human-Evolution",
      ccCloud: "/centros-de-competencia/Cloud",
      mentores: "/mentores",
      eventos: "/eventos",
      politicas: "/politicas",
      gamification: "/gamification",
      login: "/auth/signin",
    };

    const destination = keyToPath[e.key];
    if (destination) {
      router.push(destination);
    }
  };

  const items: MenuProps["items"] = [{ key: "home", label: "Home" }];

  if (status === "unauthenticated" || status === "loading") {
    items.push({
      key: "login",
      icon: <SignInIcon size={18} weight="bold" />,
      label: "Entrar",
    });
  }

  if (status === "authenticated" && session?.user) {
    items.push(
      { key: "artigos", label: "Artigos" },
      {
        key: "ccbase",
        label: "Centros de Competência",
        children: [
          {
            label: "Objetivos",
            key: "cc",
          },
          {
            label: ".NET",
            key: "ccNET",
          },
          {
            label: "Dados",
            key: "ccDados",
          },
          {
            label: "Human Evolution",
            key: "ccHuman",
          },
          {
            label: "Cloud Transformation",
            key: "ccCloud",
          },
        ],
      },
      { key: "mentores", label: "Mentores" },
      { key: "gamification", label: "Gamification" },
      { key: "eventos", label: "Eventos" },
      { key: "politicas", label: "Políticas" },
      {
        key: "user",
        label: session.user.name,
        children: [
          {
            label: (
              <span
                className="block"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sair
              </span>
            ),
            key: "LogOut",
          },
        ],
      }
    );
  }

  return (
    <nav className="grid grid-cols-3">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          height={329}
          width={934}
          src="/joynLogo.png"
          alt="JOYN Logo"
          className="hover:cursor-pointer object-cover h-[31px] w-[90px]"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>

      <div
        className="col-span-2"
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <Menu
          className="basis-full"
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
      </div>
    </nav>
  );
};

export default Navbar;
