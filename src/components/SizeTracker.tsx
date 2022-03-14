import { ComponentType, ReactNode, useEffect, useState } from "react";

export const SizeTracker = <T extends unknown>(props: {
  component: ComponentType<T>;
  props?: Partial<T>;
  children?(height: number): ReactNode;
}) => {
  const [el, setEl] = useState<HTMLElement>();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!el) return;

    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  return (
    <props.component ref={setEl} {...(props.props as T)}>
      {props.children?.(height)}
    </props.component>
  );
};
