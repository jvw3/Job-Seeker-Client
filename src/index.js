import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { JobSeeker } from "./JobSeeker";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
      <JobSeeker />
  </BrowserRouter>
);
