import React from "react";

function Card({
  title = null,
  titleBorderBottom = true,
  children,
  isLoading = false,
  marginBottom = 0,
  marginTop = 0,
  padding = 4,
}) {
  return (
    <div
      className={`${marginTop && `mt-${marginTop}`} ${
        marginBottom && `mb-${marginBottom}`
      } bg-base-100 shadow-md border border-gray-200 ${
        padding && `p-${padding}`
      } rounded-xl`}
    >
      {title && (
        <>
          <h1 className="text-black text-2xl font-semibold">{title}</h1>
          {titleBorderBottom && <hr className="my-4" />}
        </>
      )}

      {children}
    </div>
  );
}

export default Card;
