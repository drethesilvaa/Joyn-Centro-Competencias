import { HomepageDataProvider } from "@/providers/HomepageDataProvider";
import Homepage from "../modules/homepage/page";
import { Suspense } from "react";

export default function Home() {
  return <HomepageDataProvider>
    <Suspense fallback={<></>}>
      <Homepage />
    </Suspense>
  </HomepageDataProvider>;
}
