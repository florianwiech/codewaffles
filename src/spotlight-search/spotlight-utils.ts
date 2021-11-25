export function isElementVisibleInHorizontalList(el: DOMRect, holder: DOMRect) {
  return el.top >= holder.top && el.bottom <= holder.bottom;
}

export function shouldScrollIntoViewAlignTop(el: DOMRect, holder: DOMRect) {
  return el.top < holder.top;
}
