import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-5xl font-bold">NFootwear</h1>
      <progress className="progress w-56"></progress>
    </div>
  );
}

export default Loading;
