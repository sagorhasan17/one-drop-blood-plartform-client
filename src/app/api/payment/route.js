import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { stripe } from "../../../lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const user = await getSession();
    const formData = await req.formData();
    const price = formData.get("price");

    //meta data
    const metadata = {
      userId: user?.id,
      userName: user?.name,
      userEmail: user?.email,
    };

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: "One Drop Blood",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/funding/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
