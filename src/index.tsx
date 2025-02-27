import { createRoot } from "react-dom/client";
import { App } from "@/App";

import "@/reset.scss";
import "@/index.scss";

const root = document.getElementById("app");

if (root) {
  createRoot(root).render(<App />);
} else {
  throw new Error("Root not found!");
}
