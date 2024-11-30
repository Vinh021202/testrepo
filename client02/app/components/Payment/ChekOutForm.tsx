import { Style } from "@/app/style/stylelogin";
import { useLoadUserQuery } from "@/redux/features/api/apiSilce";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  setOpen: any;
  data: any;
};

const ChekOutForm = ({ setOpen, data }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder, {data:orderData, error}] = useCreateOrderMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!stripe || !elements) {
        toast.error("da co du lieu");
        return;
    }
    setIsLoading(true);
    const {error , paymentIntent} = await stripe.confirmPayment({
        elements,
        redirect:"if_required",
    });
    if(error) {
        setMessage(error.message);
        setIsLoading(false); 
    }else if(paymentIntent && paymentIntent.status === "succeeded"){
        setIsLoading(false);
        createOrder({courseId: data._id , paymet_info:paymentIntent});
    }
  };

  console.log( "data Paynow", data._id);

  useEffect(() => {
    if(orderData){
        setLoadUser(true);
        redirect(`/course-access/${data._id}`)
    }
    if(error){
        if("data" in error){
            const errorMessage = error as any;
            toast.error(errorMessage.data.message)
        }
    }
  },[orderData,error])

  console.log("orderData" , orderData);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${Style.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[red]">
          {message}
        </div>
      )}
    </form>
  );
};

export default ChekOutForm;
