import { useAppSelector } from '@/libraries/hooks/reduxHooks';
import { useCreatePaymentIntentMutation } from '@/store/services/paymentApi';
import { selectUser } from '@/store/slices/userSlice';
import { APIError } from '@/types/api';
import { Button } from '@mui/material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useState } from 'react';

interface IPaymentProps {
  prize: number;
  isDisabled: boolean;
}

const PaymentForm: React.FC<IPaymentProps> = ({ prize, isDisabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useAppSelector(selectUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const [createPaymentIntent, { isLoading, error, data }] = useCreatePaymentIntentMutation();

  const paymentHandler = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const cardDetails = elements.getElement(CardElement);

    try {
      const response = await createPaymentIntent({
        amount: prize,
        email: user.email || '000testonly@gmail.com',
      }).unwrap(); // unwrap 會直接給你 data 或 throw error

      const clientSecret = response.clientSecret;
      // 👉 在這裡做 confirmCardPayment 的 stripe 調用

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardDetails as StripeCardElement,
          billing_details: {
            name: user.name || '奇異熊怪',
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent?.status === 'succeeded') {
        alert('💰 Payment Successful!');
      } else {
        alert('⚠️ Payment status: ' + paymentResult.paymentIntent?.status);
      }
    } catch (err) {
      const error = err as APIError;
      alert(error?.data?.error ?? 'API error, 請確認後端是否正確啟動');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-fit">
      <form className="w-full" onSubmit={paymentHandler}>
        <h2>信用卡資訊</h2>
        <CardElement />
        {isProcessing || isDisabled ? (
          <Button variant="contained" fullWidth disabled color="secondary" size="large" className="mt-3">
            立刻付清
          </Button>
        ) : (
          <Button type="submit" variant="contained" fullWidth size="large" className="mt-3">
            立刻付清
          </Button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
