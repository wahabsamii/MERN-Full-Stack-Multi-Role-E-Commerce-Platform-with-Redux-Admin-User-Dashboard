import { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {toast} from "react-toastify";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { BASE_URL } from "../config";


//published key
const stripePromise = loadStripe("pk_test_51SLF6EBmxKczH0AGtJe48NzN4nJPTSWS9ZXvEWjs5UqIGHf6M980NxTWw962SembA3kC4UGtdULbA5tL4EAgh4gB00sEh70pGa");

// ✅ Stripe Card Form (frontend only)
const StripeForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { cartItems } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    try {
      // Call backend to create payment intent
      const res = await axios.post(`${BASE_URL}/api/checkout/create-payment-intent`, {
        amount: total * 100,
      });

      const clientSecret = res.data.clientSecret;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
         await axios.post(`${BASE_URL}/api/orders/create`, {
          items: cartItems,
          total,
          paymentMethod: "stripe",
          user,
          status: "pending",
            name: user.name || "name not added",
            email: user.email || "not add",
          
        });
        toast.success("✅ Payment successful!");

      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="border border-gray-300 rounded-md p-3 bg-white">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-black text-white w-full py-3 rounded hover:bg-gray-800"
      >
        {loading ? "Processing..." : `Pay $${total}`}
      </button>
    </form>
  );
};



const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartItems } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.replace("$", "")),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  
const handleCODOrder = async () => {
  try {
    await axios.post(`${BASE_URL}/api/orders/create`, {
      items: cartItems,
      total,
      paymentMethod: "COD",
      user,
      status: "pending",
        name: user.name || "name not added",
        email: user.email || "not add",
      
    });
    toast.success("Order placed successfully (Cash on Delivery)");
  } catch (err) {
    console.error(err);
    toast.error("❌ Failed to place order");
  }
};

  return (
    <div className="px-10 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        Account / My Account / Product / View Cart /{" "}
        <span className="text-black font-semibold">Checkout</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Billing Details</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="save-info" className="accent-red-500" />
              <label htmlFor="save-info" className="text-sm text-gray-600">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="space-y-4 border border-gray-200 p-5 rounded-md">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-100 pb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover"
                  />
                  <p>{item.name}</p>
                </div>
                <p className="font-medium">{item.price}</p>
              </div>
            ))}

            <div className="flex justify-between text-gray-600 pt-2">
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>

            <div className="flex justify-between text-gray-600">
              <p>Shipping:</p>
              <p>{shipping === 0 ? "Free" : `$${shipping}`}</p>
            </div>

            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <p>Total:</p>
              <p>${total}</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-5 space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              <span>Pay with Card (Stripe)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* Payment Field (Dynamic) */}
          {paymentMethod === "card" ? (
            <Elements stripe={stripePromise}>
              <StripeForm total={total} />
            </Elements>
          ) : (
            <button onClick={handleCODOrder} className="bg-red-500 text-white w-full py-3 mt-5 rounded hover:bg-red-600">
              Place Order (Cash on Delivery)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
