// RedeemPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RedeemPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedAmount && paymentMethod && phone) {
      setSubmitted(true);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">🎁 Redeem Points</h2>

        {!submitted ? (
          <>
            <div className="mb-4">
              <p className="font-medium mb-2">Select Redeem Amount:</p>
              <div className="flex justify-between gap-2">
                {[{ coins: 50, rupees: 10 }, { coins: 500, rupees: 50 }, { coins: 1000, rupees: 100 }].map((item) => (
                  <button
                    key={item.coins}
                    className={`flex-1 py-2 rounded-lg font-semibold ${
                      selectedAmount === item.coins ? "bg-yellow-500 text-white" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    }`}
                    onClick={() => setSelectedAmount(item.coins)}
                  >
                    {item.coins} Coins = ₹{item.rupees}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-2">Choose Payment Method:</p>
              <select
                className="w-full border border-yellow-400 p-2 rounded"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="gpay">Google Pay</option>
                <option value="phonepe">PhonePe</option>
                <option value="paytm">Paytm</option>
              </select>
            </div>

            <div className="mb-4">
              <p className="font-medium mb-2">Enter Phone Number:</p>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-yellow-400 p-2 rounded"
                placeholder="Enter mobile number"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-2 bg-yellow-500 text-white font-bold rounded hover:bg-yellow-600"
            >
              Redeem
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              ✅ Your amount will be credited to your account within 3 days!
            </h3>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemPage;
