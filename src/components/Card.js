import React from "react";

function Card({
  title = null,
  titleBorderBottom = true,
  children,
  isLoading = false,
}) {
  return (
    <div className="my-2 bg-base-100 shadow-md border border-gray-200 p-4 flex flex-col justify-around gap-2 rounded-xl">
      {title && (
        <>
          <h1 className="text-black text-2xl font-semibold">{title}</h1>
          {titleBorderBottom && <hr />}
        </>
      )}

      {children}
    </div>
  );
}

export default Card;
