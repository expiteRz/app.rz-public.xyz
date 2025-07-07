import { MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { Title } from "~/components/SEO";
import NotFound from "~/routes/[...404]";
import "./app.css";
import { AppListInterface } from "./global";
import Home from "./routes";
import KclFlagCalculator from "./routes/mario-kart-wii/kcl-flag-calculator";

export const AppList: AppListInterface[] = [
  {
    name: "KCL Flag Calculator",
    path: "/mario-kart-wii/kcl-flag-calculator",
    component: KclFlagCalculator,
  },
];

export default function App() {
  return (
    <MetaProvider>
      <Title />
      <Router
        root={(props) => (
          <>
            <Nav />
            <Suspense>{props.children}</Suspense>
          </>
        )}>
        <Route path="/" component={Home} />
        <For each={AppList}>{(v) => <Route path={v.path} component={v.component} />}</For>
        <Route path="*404" component={NotFound} />
      </Router>
    </MetaProvider>
  );
}
