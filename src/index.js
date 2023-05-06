// this is the bridge between the components in App.js and the browser!

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client"; // this is what talks to the web browsers
import "./styles.css"; // imports styles for components

import App from "./App"; // imports styles for component created in App.js

// this bring all pieces together and injects the final product into the index.html in the public folder. 
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
