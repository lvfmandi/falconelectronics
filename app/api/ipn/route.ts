import { sanityClient } from "@/lib/sanity";

export async function POST(req: Request) {
    const body = await req.json();
    const { OrderTrackingId, OrderNotificationType, OrderMerchantReference } = body;

    const authURL = process.env.NEXT_PUBLIC_AUTH_URL as string;
    const consumerKey = process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY;
    const secretKey = process.env.NEXT_PUBLIC_PESAPAL_SECRET_KEY;
    const transactionStatusURL = process.env.NEXT_TRANSACTION_STATUS + OrderTrackingId as string;

    // getting authentication rights from PESAPAL
    const authentication = await fetch(authURL, {
        method: "POST",
        body: JSON.stringify({
            consumer_key: consumerKey,
            consumer_secret: secretKey
        }),
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    });

    const authData = await authentication.json();

    const paymentStatusResponse = await fetch(transactionStatusURL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${authData.token}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json',
        }
    });

    const paymentStatus = await paymentStatusResponse.json();
    const { amount, created_date, payment_status_description } = paymentStatus;

    try {
        sanityClient
            .patch(OrderTrackingId) // Document ID to patch
            .set({
                amount,
                paymentDate: new Intl.DateTimeFormat('en', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                    timeZone: 'EAT',
                }).format(new Date(created_date)),
                paymentStatus: payment_status_description
            })
            .commit()

        return Response.json({ OrderTrackingId, OrderNotificationType, OrderMerchantReference, status: 200 }, { status: 200 })
    } catch (error) {
        return Response.json({ OrderTrackingId, OrderNotificationType, OrderMerchantReference, status: 500 }, { status: 500 })
    }
}