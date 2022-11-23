import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // use stripe.createToken to get a unique token for the card
        const { error, token } = await stripe.createToken(cardElement);

        props.onCallbackHandler(error, token);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ hidePostalCode: true }} />
        </form>
    );
};

export default PaymentForm;