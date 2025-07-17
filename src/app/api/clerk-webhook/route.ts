import { db } from "@/server/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { type NextRequest } from "next/server";

/**
 * Handles incoming webhook POST requests, verifies the event, and creates a new user record if a "user.created" event is received.
 *
 * Returns an HTTP 200 response on success or an HTTP 400 response if verification or processing fails.
 */
export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created") {
      const { created_at , first_name, last_name, email_addresses, id } = evt.data;
      // console.log('created_at', created_at)
      const email = email_addresses[0]?.email_address;
      if (!email) throw new Error("Error: Email could not be found!");

      await db.user.create({
        data: {
          id : id,
          email: email,
          fullname: `${first_name} ${last_name}`,
          createdAt : new Date(created_at)
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
