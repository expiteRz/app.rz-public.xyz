import { RouteSectionProps } from "@solidjs/router";
import { Suspense } from "solid-js";
import Nav from "./Nav";

export default function Root(props: RouteSectionProps<unknown>) {
  return (
    <>
      <Nav />
      <Suspense>{props.children}</Suspense>
    </>
  );
}
