

This project uses Cashfree Payment Gateway for the ₹249 ticket purchase flow. Configure the Supabase edge
function `create-cashfree-order` with the following environment variables:

**Required**
- `CASHFREE_APP_ID` — your Cashfree App ID.
- `CASHFREE_SECRET_KEY` — your Cashfree Secret Key.


**Optional**
- `CASHFREE_ENV` — `sandbox` (default) or `production`.
- `APP_BASE_URL` — base URL for return links (defaults to the current Lovable preview URL).
- `CASHFREE_NOTIFY_URL` — webhook URL for Cashfree to notify payment events (defaults to the existing Supabase function URL).

After setting these values, redeploy the Supabase function and the app will redirect users to the correct
Cashfree payment page based on `CASHFREE_ENV`.
