
"use client";

export function Tubelight() {
  return (
    <div className="relative flex justify-center items-center mb-8 h-20">
      <div 
        className="w-96 h-full tubelight-flicker"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--primary)) 1px, hsla(var(--primary) / 0.5) 30%, transparent 100%)'
        }}
      ></div>
    </div>
  );
}
