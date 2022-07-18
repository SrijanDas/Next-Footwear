import Image from "next/image";
import React from "react";
import { HiCheck } from "react-icons/hi";

function OrderSummary({
  items,
  totalAmount,
  totalItems,
  confirmOrder,
  orderConfirmed,
  loading,
  setLoading,
}) {
  return (
    <div className="orderSummary bg-white rounded-lg border border-gray-200 shadow-md p-4">
      <div className="border-b-2 border-gray-300 pb-2">
        <span className="text-xl font-semibold text-gray-500 uppercase flex gap-2 items-center">
          Order Summary
          {orderConfirmed && (
            <div className="badge badge-md badge-primary">
              <HiCheck />
            </div>
          )}
        </span>
      </div>
      {orderConfirmed ? (
        <div className="mt-3">
          <span>{totalItems} items</span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <Image
                              src={item.imageUrl}
                              alt="image"
                              layout="fill"
                            />
                          </div>
                        </div>
                        <div>
                          {item.name}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            Color: {item.color} | Size: {item.size}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-end mt-4">
            <span className="text-gray-600 mb-2 font-semibold text-2xl">
              Sub Total:{totalAmount}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setLoading(true);
                confirmOrder();
              }}
              className={`btn ${loading && "loading"}`}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
