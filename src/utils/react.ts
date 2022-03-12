import { useLayoutEffect } from "react";

export const useAsyncEffect = (
  effect: (unmounted: () => boolean) => unknown,
  deps: unknown[],
  destroy?: () => unknown
) => {
  useLayoutEffect(() => {
    let unmounted = false;
    effect(() => unmounted);

    return () => {
      unmounted = true;
      destroy?.();
    };
  }, deps);
};
