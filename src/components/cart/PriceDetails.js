import React from "react";

function PriceDetails({ totalItems, totalAmount, handleCheckout }) {
  const packagingFee = 58;
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 w-auto h-auto">
      <div className="border-b-2 border-gray-300 pb-4">
        <span className="text-xl font-semibold text-gray-500 uppercase">
          Price Details
        </span>
      </div>
      <div>
        <table className="table w-full">
          <tbody>
            <tr>
              <td>Price ({totalItems} items)</td>
              <td className="text-right">₹{totalAmount}</td>
            </tr>

            <tr>
              <td>Delivery Charges</td>
              <td className="text-right text-lime-600">FREE</td>
            </tr>
            <tr>
              <td>Secured Packaging Fee</td>
              <td className="text-right">₹{packagingFee}</td>
            </tr>
            <tr>
              <td className="text-2xl font-semibold">Total Amount</td>
              <td className="text-2xl font-semibold text-right">
                ₹{packagingFee + totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end border-t-2 border-gray-300 pt-4">
          <button
            onClick={handleCheckout}
            className="btn btn-warning bg-orange-500 text-white"
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
