"use client";

interface ParallaxSectionProps {
  leftEdge: React.ReactNode;
  center: React.ReactNode;
  rightEdge: React.ReactNode;
}

export function ParallaxSection({ leftEdge, center, rightEdge }: ParallaxSectionProps) {
  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr_280px] pb-16">
      <div className="hidden lg:block pl-4 sm:pl-6">
        <div
          style={{ position: "sticky", top: 100, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          {leftEdge}
        </div>
      </div>
      <div className="min-w-0 px-4 sm:px-6 lg:px-0 lg:mx-auto lg:w-full lg:max-w-[720px]">
        {center}
      </div>
      <div className="hidden lg:block pr-4 sm:pr-6">
        <div
          style={{ position: "sticky", top: 100, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          {rightEdge}
        </div>
      </div>
    </div>
  );
}
