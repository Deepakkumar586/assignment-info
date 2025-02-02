import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    paymentDetails: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // all value is null
    if (
      formData.fullName === "" ||
      formData.address === "" ||
      formData.paymentDetails === ""
    ) {
      toast.error("All fields are required!");
      return;
    }

    navigate("/");
    toast.success("🎉 Order Placed Successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Progress Bar */}
      <div className="flex justify-between mb-6">
        <span className={`step ${step >= 1 ? "active" : ""}`}>📝 Billing</span>
        <span className={`step ${step >= 2 ? "active" : ""}`}>📦 Shipping</span>
        <span className={`step ${step >= 3 ? "active" : ""}`}>💳 Payment</span>
        <span className={`step ${step >= 4 ? "active" : ""}`}>✅ Review</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Billing Information */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
            />
            <button type="button" onClick={nextStep} className="btn">
              Next ➡️
            </button>
          </>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                ⬅️ Back
              </button>
              <button type="button" onClick={nextStep} className="btn">
                Next ➡️
              </button>
            </div>
          </>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold">Payment Details</h2>
            <input
              type="text"
              name="paymentDetails"
              placeholder="Card Number / UPI"
              value={formData.paymentDetails}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                ⬅️ Back
              </button>
              <button type="button" onClick={nextStep} className="btn">
                Next ➡️
              </button>
            </div>
          </>
        )}

        {/* Step 4: Order Review */}
        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold">Review Order</h2>
            <div className="border p-3 rounded-md">
              <p>
                <strong>Full Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Shipping Address:</strong> {formData.address}
              </p>
              <p>
                <strong>Payment Method:</strong> {formData.paymentDetails}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary"
              >
                ⬅️ Back
              </button>
              <button type="submit" className="btn-primary">
                🛒 Place Order
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Checkout;
