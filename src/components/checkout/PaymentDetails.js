import React, { useState } from "react";
import { HiCheck } from "react-icons/hi";

function PaymentDetails({
  orderDetails,
  handlePayment,
  paymentSuccess,
  loading,
}) {
  const packagingFee = Number(orderDetails.packaging_fees);
  const subTotal = Number(orderDetails.sub_total);
  const totalAmount = Number(orderDetails.total_amount);

  const [paymentOption, setPaymentOption] = useState("");

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
          {orderDetails.transactionDetails && (
            <span>
              Transaction id: <strong>{transactionDetails}</strong>
            </span>
          )}
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
          <div className="border-t-2 border-gray-300 p-4 ">
            <span className="text-lg font-semibold">Select Payment Option</span>
            <div className="my-4">
              <label className="flex gap-4 items-center cursor-pointer">
                <input
                  type="radio"
                  name="cod"
                  className="radio radio-primary"
                  onChange={(e) => setPaymentOption(e.target.name)}
                  checked={paymentOption === "cod"}
                />

                <span>Cash on Delivery</span>
              </label>
              {paymentOption === "cod" && (
                <button
                  onClick={(e) => handlePayment(e, "cod")}
                  className={`btn mt-2 ml-10 btn-warning bg-orange-500 text-white ${
                    loading && "loading"
                  }`}
                >
                  Place Order
                </button>
              )}
            </div>
            <div className="my-4">
              <label className="flex gap-4 items-center cursor-pointer">
                <input
                  type="radio"
                  name="online"
                  className="radio radio-primary"
                  onChange={(e) => setPaymentOption(e.target.name)}
                  checked={paymentOption === "online"}
                />

                <span>UPI/Net Banking/Card</span>
              </label>
              {paymentOption === "online" && (
                <button
                  onClick={(e) => handlePayment(e, "online")}
                  className={`btn mt-2 ml-10 btn-warning bg-orange-500 text-white ${
                    loading && "loading"
                  }`}
                >
                  Proceed to Pay ₹{totalAmount}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentDetails;

{
  /* <button
              onClick={handlePayment}
              className={`btn btn-warning bg-orange-500 text-white ${
                loading && "loading"
              }`}
            >
              Proceed to Pay ₹{totalAmount}
            </button> */
}
