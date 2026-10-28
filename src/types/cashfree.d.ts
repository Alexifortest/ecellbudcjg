declare module '@cashfreepayments/cashfree-js' {
  interface CashfreeCheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: string;
  }

  interface CashfreeInstance {
    checkout(options: CashfreeCheckoutOptions): Promise<any>;
  }

  interface LoadOptions {
    mode: 'sandbox' | 'production';
  }

  export function load(options: LoadOptions): Promise<CashfreeInstance>;
}
