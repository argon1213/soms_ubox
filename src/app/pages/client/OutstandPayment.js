import { useParams } from "react-router-dom";
import { PaymentDetail } from "./components/PaymentDetail";

export const OutstandPayment = () => {
  const { id } = useParams();

  return (
    <div className="py-[40px] h-[100%]">
      <PaymentDetail orderId={id} />
    </div>
  )
}