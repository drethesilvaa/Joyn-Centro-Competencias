"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders, ClientSafeProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";

export default function SignIn() {
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    useEffect(() => {
        getProviders().then((prov) => setProviders(prov));
    }, []);

    useEffect(() => {
        if (
            status === "unauthenticated" &&
            providers &&
            providers["google"]
        ) {
            signIn("google");
        }
    }, [providers, status]);

    return (
        <PageLoader />
    );
}
