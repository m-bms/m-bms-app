import { proxy } from "valtio";

export const viewport = proxy({
  windowHeight: 0,
  visualHeight: 0,
});

const setWindowHeight = () => (viewport.windowHeight = window.innerHeight);
const setVisualHeight = () => (viewport.visualHeight = visualViewport.height);

setWindowHeight();
setVisualHeight();

window.addEventListener("resize", setWindowHeight);
visualViewport.addEventListener("resize", setVisualHeight);
