"use client";

import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TemplateProps {}

export const HomepageCentros = ({}: TemplateProps) => {
  const { data, isLoading, error } = useHomepageData();
  const { data: session, status } = useSession();
  const router = useRouter();

  const ctaButton = (
    <Button
      onClick={() => {
        status === "authenticated" && session?.user
          ? router.push("/centros-de-competencia")
          : router.push("/auth/signin");
      }}
      size="large"
      type="primary"
    >
      {data?.centros?.ctaText}
    </Button>
  );

  return (
    <>
      <div className="grid lg:grid-cols-2 items-center custom-gap-6 h-full">
        <div>
          <h2 className="heading-6xl italic">Os Nossos Centros</h2>
          <div className="mt-4">
            <MarkdownRenderer content={data?.centros?.text || ""} />
          </div>
          <div className="hidden lg:block mt-4">{ctaButton}</div>
        </div>
        <div className="text-foreground heading-4xl uppercase lg:text-right">
          <MarkdownRenderer content={data?.centros?.quote || ""} />
        </div>
        <div className="block lg:hidden mt-4">{ctaButton}</div>
      </div>
    </>
  );
};
