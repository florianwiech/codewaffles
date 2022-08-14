import { useLayoutEffect, useRef } from "react";

export function isElementVisibleInHorizontalList(el: DOMRect, holder: DOMRect) {
  return el.top >= holder.top && el.bottom <= holder.bottom;
}

export function shouldScrollIntoViewAlignTop(el: DOMRect, holder: DOMRect) {
  return el.top < holder.top;
}

export function useScrollIntoView<T extends HTMLElement>(
  shouldScrollIntoView: boolean,
  holder = document.body.getBoundingClientRect(),
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (shouldScrollIntoView && rect && holder) {
      if (!isElementVisibleInHorizontalList(rect, holder)) {
        const shouldAlignTop = shouldScrollIntoViewAlignTop(rect, holder);
        ref.current.scrollIntoView(shouldAlignTop);
      }
    }
  }, [shouldScrollIntoView, holder]);

  return ref;
}
