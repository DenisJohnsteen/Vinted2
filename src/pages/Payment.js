import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;

  const protectionPrice = price * 0.1;
  const shippingPrice = price * 0.2;
  const totalPrice = price + protectionPrice + shippingPrice;

  return token ? (
    <div>
      <h2>Résumé de la commande</h2>
      <ul>
        <li>
          <span>Commande</span>
          <span>{price.toFixed(2)}€</span>
        </li>
        <li>
          <span>Frais protection acheteurs</span>
          <span>{protectionPrice.toFixed(2)}€</span>
        </li>
        <li>
          <span>Frais de port</span>
          <span>{shippingPrice.toFixed(2)}</span>
        </li>
      </ul>
      <div>
        <span>Total</span>
        <span>{totalPrice.toFixed(2)}€</span>
      </div>
      <div>
        `il ne vous reste plus qu'une étape pour vous offrir {title}. Vous allez
        payer {totalPrice}€ (frais de protection et frais de port inclus)`
      </div>

      <Elements stripe={stripePromise}>
        <CheckoutForm title={title} totalPrice={totalPrice} />
      </Elements>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
