// Avoid moving offscreen tracks and loading their next images unnecessarily.
// Visible tracks retain the original interval and manual controls.
export function startVisibleAutoscroll(element: HTMLElement | null, move: () => void, delay: number): () => void {
  if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let visible = !window.IntersectionObserver;
  const observer = window.IntersectionObserver ? new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
  }) : null;
  observer?.observe(element);
  const timer = window.setInterval(() => {
    if (!visible || document.hidden) return;
    if (!observer) {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    }
    move();
  }, delay);
  return () => { observer?.disconnect(); window.clearInterval(timer); };
}
