import { SignInPage } from "@/modules/auth/pages";
import { Suspense } from "react";

export default function SignIn() {
  return (
    <Suspense fallback={<></>}>
      <SignInPage />
    </Suspense>
  );
}
