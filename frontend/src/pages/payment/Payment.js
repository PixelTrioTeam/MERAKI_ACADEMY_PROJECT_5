import React from "react";
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

const PlanCard = ({ plan }) => (
  <div className="plan-card">
    <h2 className="name-plan">{plan.name}</h2>
    <p>{plan.description}</p>
    <h3 className="price-plan">{plan.price}</h3>
    <button className="payment-plan">{plan.buttonText}</button>
    <ul>
      {plan.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    {plan.popular && <span className="popular-badge">Popular</span>}
  </div>
);

const Payment = () => (
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
);

export default Payment;
