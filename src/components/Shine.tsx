import type { JSX } from "react";

export default function Shine(): JSX.Element {
  return (
    <div className="w-full flex items-center justify-center mb-20">
      <div className="w-[90%] h-15 bg-blue blur-3xl fixed -top-10 lg:bg-red-600"></div>
    </div>
  );
}
