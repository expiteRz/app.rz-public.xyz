import { Meta, MetaProvider } from "@solidjs/meta";
import { Route, Router } from "@solidjs/router";
import { For } from "solid-js";
import { Title } from "~/components/SEO";
import NotFound from "~/routes/[...404]";
import "./app.css";
import Root from "./components/Root";
import { AppListInterface } from "./global";
import Home from "./routes";
import KclFlagCalculator from "./routes/mario-kart-wii/kcl-flag-calculator";
import ObjFlowBinEditor from "./routes/mario-kart-wii/objflowbin-editor";
import Counter from "./routes/test/counter";

export const AppList: AppListInterface[] = [
  {
    category: "mkw",
    name: "KCL Flag Calculator",
    url: "/mario-kart-wii/kcl-flag-calculator",
    component: KclFlagCalculator,
  },
  {
    category: "mkw",
    name: "ObjFlow.bin Editor",
    url: "/mario-kart-wii/objflowbin-editor",
    component: ObjFlowBinEditor,
    indev: true,
  },
  {
    name: "Just a Counter",
    url: "/misc/counter",
    component: Counter,
    indev: true,
  },
  {
    category: "mkw",
    type: "redirect",
    name: "Koten",
    url: "https://beta.koten.rz-public.xyz/",
  },
];

export default function App() {
  return (
    <MetaProvider>
      <Title />
      <Meta name="versionParent" content="0.1.0-2" />
      <Router root={Root}>
        <Route path="/" component={Home} />
        <For each={AppList}>{(v) => <Route path={v.url} component={v.component} />}</For>
        <Route path="*404" component={NotFound} />
      </Router>
    </MetaProvider>
  );
}
