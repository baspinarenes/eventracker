import { RefObject, useEffect, useRef } from "react";

export const useSeenObserver = ({
  ref,
  options = { threshold: 1, rootMargin: "-50px 0px 0px 0px" },
  handler,
  enabled = true,
}: {
  ref: RefObject<HTMLElement>;
  options?: Record<string, any>;
  enabled?: boolean;
  handler: () => void;
}) => {
  const isAlreadySeen = useRef(false);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!ref.current || isAlreadySeen.current || !enabled) return;

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handler();
          isAlreadySeen.current = true;
          observer.current?.unobserve(entry.target);
        }
      });
    }, options);

    observer.current.observe(ref.current);

    return () => {
      ref.current && observer.current?.unobserve(ref.current);
    };
  }, [ref, handler]);

  useEffect(() => {
    if (!enabled && ref.current) {
      isAlreadySeen.current = false;
      observer.current?.unobserve(ref.current);
    }
  }, [enabled]);
};
