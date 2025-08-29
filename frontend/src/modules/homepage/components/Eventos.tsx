import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useHomepageData } from "@/providers/HomepageDataProvider";
import { Button } from "antd";
import Image from "next/image";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
interface TemplateProps {}

export const HomepageEventos = ({}: TemplateProps) => {
  const { data, isLoading, error } = useHomepageData();
  const { data: session, status } = useSession();
  const router = useRouter();

  const imagesConfig = [
    {
      width: 5456,
      height: 3637,
      className: "flex justify-end items-end",
    },
    {
      width: 5280,
      height: 3520,
      className: "flex items-end",
    },
    {
      width: 5472,
      height: 3648,
      className: "flex justify-end items-start",
    },
    {
      width: 5456,
      height: 3637,
      className: "",
    },
  ];

  const ctaButton = (
    <Button
      onClick={() => {
        status === "authenticated" && session?.user
          ? router.push("/eventos")
          : router.push("/auth/signin");
      }}
      className="uppercase"
      size="large"
      type="primary"
    >
      {data?.eventos?.ctaText}
    </Button>
  );

  return (
    <>
      <div className="grid lg:grid-cols-2 items-center custom-gap-6  ">
        <div>
          <h2 className="heading-6xl italic">Os Eventos</h2>
          <div className="mt-4">
            <MarkdownRenderer content={data?.eventos?.text || ""} />
          </div>
          <div className="hidden lg:block mt-4">{ctaButton}</div>
        </div>
        <div className="grid grid-cols-2 custom-gap-6">
          {data?.eventos?.images?.map((img, k) => (
            <div className={`${imagesConfig[k].className}`} key={k}>
              <Image
                width={imagesConfig[k].width}
                height={imagesConfig[k].height}
                className={`object-cover rounded-2xl max-h-5/6`}
                src={img?.src || ""}
                alt={`${img?.alt} photo`}
              />
            </div>
          ))}
        </div>
        <div className="block lg:hidden mt-4">{ctaButton}</div>
      </div>
    </>
  );
};
