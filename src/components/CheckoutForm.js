import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ title, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // étape 1 : envoi du numéro de carte à stripe
    //Récupérer les données de cb
    const cardElements = elements.getElement(CardElement);
    console.log(cardElements);

    // étape 2 : Envoyer ces données à l'api de stripe
    const stripeResponse = await stripe.createToken(cardElements);
    console.log(stripeResponse);

    const stripToken = stripeResponse.token.id;
    // étape 3 : envoie du token à mon serveur
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripToken,

        title: title,
        amount: totalPrice,
      }
    );
    console.log(response.data);

    if (response.data.status === "succeded") {
      console.log("Payment succeded");
    }
  };
  console.log(title, totalPrice);

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
