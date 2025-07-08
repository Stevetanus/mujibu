/*
loadStripe(...) 做的是：

初始化 Stripe.js 的 SDK

根據你的 publishable key 建立前端與 Stripe 之間的連線
*/
import { loadStripe } from '@stripe/stripe-js';
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
