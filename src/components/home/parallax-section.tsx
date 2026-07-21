"use client";

interface ParallaxSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ParallaxSection({ left, right }: ParallaxSectionProps) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_300px] pb-16">
      <div className="max-w-[980px] min-w-0 px-4 sm:px-6 lg:px-0 lg:ml-auto lg:mr-0 lg:pr-8">
        {left}
      </div>
      <div className="hidden lg:block pr-4 sm:pr-6">
        <div
          style={{ position: "sticky", top: 100, maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}
        >
          {right}
        </div>
      </div>
    </div>
  );
}
