"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";

export const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const search = useSearchParams();

  const target = search.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(target);
    }
  }, [status, router, target]);

  useEffect(() => {
    if (status === "unauthenticated") {
      const safeTarget = target.startsWith("/") ? target : "/"; 
      signIn("google", { callbackUrl: safeTarget, redirect: true });
    }
  }, [status, target]);

  return <PageLoader />;
};
