import { useEffect, useRef } from "react";

type Props = {
  onEnter: () => void;
};

export default function IntersectionObsrvr({ onEnter }: Props) {
  const observer = useRef<IntersectionObserver | null>(null);
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        onEnter();
      }
    });
    if (el.current) observer.current.observe(el.current);

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div ref={el}>
      <div className="message">Loading...</div>
    </div>
  );
}
