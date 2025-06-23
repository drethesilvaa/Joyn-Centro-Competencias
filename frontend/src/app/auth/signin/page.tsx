"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders, ClientSafeProvider, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLoader from "@/layouts/PageLoader";

const errorMessages: Record<string, string> = {
    WrongDomain: "You must sign in with a Joyn Group email address.",
    OAuthAccountNotLinked: "To confirm your identity, sign in with the same provider you used originally.",
    AccessDenied: "Access denied. Please try again.",
    Configuration: "There was a problem with the configuration.",
    Callback: "There was a problem during sign in. Please try again.",
    Default: "Unable to sign in.",
};

export default function SignIn() {
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const { data: session, status } = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();
    const error = searchParams?.get("error");

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
            providers["google"] &&
            !error 
        ) {
            signIn("google");
        }
    }, [providers, status, error]);

    return (
        <PageLoader />
    );
}
