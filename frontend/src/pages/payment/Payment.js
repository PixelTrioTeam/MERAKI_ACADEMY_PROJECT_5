import React, { useState } from "react";
import "./payment.css";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "$3.99/month",

    features: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 1 supported device at a time",
      "Watch in 720p (HD)",
      "Download on 1 supported device at a time",
    ],
    buttonText: "Get started",
  },
  {
    name: "Standard",
    price: "$7.99/month",

    features: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 2 supported devices at a time",
      "Watch in 1080p (Full HD)",
      "Download on 2 supported devices at a time",
    ],
    buttonText: "Get started",
    popular: true,
  },
  {
    name: "Premium",
    price: "$9.99/month",

    features: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 4 supported devices at a time",
      "Watch in 4K (Ultra HD) + HDR",
      "Download on 6 supported devices at a time",
    ],
    buttonText: "Get started",
  },
];

const PlanCard = ({ plan }) => {
  const [openModal, setOpenModal] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Card Information Submitted:", cardInfo);
    setOpenModal(false); // Close the modal after submission
  };

  return (
    <>
      <div className="plan-card">
        <h2 className="name-plan">{plan.name}</h2>
        
        <h3 className="price-plan">{plan.price}</h3>
        <button
          className="payment-plan"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {plan.buttonText}
        </button>
        <ul>
          {plan.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {plan.popular && <span className="popular-badge">Popular</span>}
      </div>
      {openModal && (
        <>
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                ✖
              </button>
              <h2 className="modal-title">Enter Credit Card Details</h2>
              <form onSubmit={handleSubmit} className="modal-form">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardInfo.cardNumber}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="Cardholder Name"
                  value={cardInfo.cardHolder}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <div className="input-row">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardInfo.expiryDate}
                    onChange={handleChange}
                    className="input-field half-width"
                    required
                  />
                  <input
                    type="password"
                    name="cvv"
                    placeholder="CVV"
                    value={cardInfo.cvv}
                    onChange={handleChange}
                    className="input-field half-width"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Payment = () => {
  return (
    <>
      <div className="pricing-plans">
        <h1 className="choose">Choose your plan</h1>
        <p className="look-p">Unlock Endless Possibilities.</p>
        <div className="plans-container">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
        <button className="return_home">
          Return To Home Page?{" "}
          <span style={{ fontFamily: "arial" }}>
            <Link className="back_navbar-payment" to={"/main"}>
              Home
            </Link>
          </span>
        </button>
      </div>
    </>
  );
};
export default Payment;
