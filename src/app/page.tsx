import React from "react";
// import { ScrollComp } from "@/components";
import { ScrollCompAsync } from "@/components/scrollCompAsync/scrollCompAsync.component";
// import { CallbackHookCheck } from "@/components/concepts";

export default function Home() {
  return (
    <div className="link">
      {/* <div className="link_div">Hello world</div> */}
      {/* <Header /> */}
      {/* <Link href="photo-feed">Go to photo-feed page</Link> */}
      {/* <ScrollComp /> */}
      <ScrollCompAsync />
    </div>
  );
}
