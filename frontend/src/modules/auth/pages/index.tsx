"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";
import toast from "react-hot-toast";

export const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const search = useSearchParams();

  const target = search.get("callbackUrl") || "/";
  const error = search.get("error") || null;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(target);
    }
  }, [status, router, target]);

  useEffect(() => {
    if (status === "unauthenticated" && !error) {
      const safeTarget = target.startsWith("/") ? target : "/";
      signIn("google", { callbackUrl: safeTarget, redirect: true });
    } else {
      console.log(error)
      router.replace("/");
      toast.error("Ocorreu um erro ao iniciar sessão, tente novamente");
    }
  }, [status, target]);

  return <PageLoader />;
};
