import { HomepageDataProvider } from "@/providers/HomepageDataProvider";
import Homepage from "../modules/homepage/page";

export default function Home() {
  return <HomepageDataProvider><Homepage /></HomepageDataProvider>;
}
