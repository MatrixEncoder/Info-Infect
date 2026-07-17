"use client";

interface ParallaxSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ParallaxSection({ left, right }: ParallaxSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 pb-16">
      <div className="min-w-0">
        {left}
      </div>

      <div className="hidden lg:block">
        <div
          style={{ position: "sticky", top: 100, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          {right}
        </div>
      </div>
    </div>
  );
}
