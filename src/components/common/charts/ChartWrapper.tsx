"use client";

import { useEffect, useRef, useState } from "react";

interface ChartWrapperProps {
  height?: number;
  children: (size: {
    width: number;
    height: number;
  }) => React.ReactNode;
}

const ChartWrapper = ({
  height = 320,
  children,
}: ChartWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const resize = () => {
      setWidth(ref.current?.clientWidth ?? 0);
    };

    resize();

    const observer = new ResizeObserver(resize);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full"
      style={{
        height,
      }}
    >
      {width > 0 &&
        children({
          width,
          height,
        })}
    </div>
  );
};

export default ChartWrapper;