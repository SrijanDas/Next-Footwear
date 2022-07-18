import React from "react";
import { HiCheck } from "react-icons/hi";

function PaymentDetails({
  orderDetails,
  handlePayment,
  paymentSuccess,
  transactionDetails,
  loading,
}) {
  const packagingFee = Number(orderDetails.packaging_fees);
  const subTotal = Number(orderDetails.sub_total);
  const totalAmount = packagingFee + subTotal;
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md p-4 w-auto h-auto">
      <div className="border-b-2 border-gray-300 pb-4">
        <span className="text-xl font-semibold text-gray-500 uppercase flex gap-2 items-center">
          Payment
          {paymentSuccess && (
            <div className="badge badge-md badge-primary">
              <HiCheck />
            </div>
          )}
        </span>
      </div>
      {paymentSuccess ? (
        <div className="mt-3">
          <span>
            Amount: <strong> ₹{totalAmount}</strong>
          </span>
          <br />
          <span>
            Transaction id: <strong>{transactionDetails}</strong>
          </span>
        </div>
      ) : (
        <div>
          <table className="table w-full">
            <tbody>
              <tr>
                <td>
                  Price ({orderDetails.items.length}{" "}
                  {orderDetails.items.length > 1 ? "items" : "item"})
                </td>
                <td className="text-right">₹{subTotal}</td>
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
                  ₹{totalAmount}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end border-t-2 border-gray-300 pt-4">
            <button
              onClick={handlePayment}
              className={`btn btn-warning bg-orange-500 text-white ${
                loading && "loading"
              }`}
            >
              Proceed to Pay ₹{totalAmount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;
