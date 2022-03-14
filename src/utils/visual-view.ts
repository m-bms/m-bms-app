import { proxy } from "valtio";

export const visualView = proxy({
  height: 0,
});

const setVisualViewSize = () => {
  visualView.height = visualViewport.height;
};

visualViewport.addEventListener("resize", setVisualViewSize);
setVisualViewSize();
