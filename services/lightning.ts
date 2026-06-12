/**
 * Mock Lightning Network service.
 * Generates realistic-looking BOLT11-style invoices and simulated settlement.
 * No real payment processing happens anywhere in this prototype.
 */

const CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
export const MAX_MOCK_FEE_SATS = 3;

function randomBech32(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return out;
}

export interface MockInvoice {
  bolt11: string;
  sats: number;
  memo: string;
  createdAt: string;
  expirySec: number;
}

export function createInvoice(sats: number, memo: string): MockInvoice {
  const amountPart = sats >= 1000 ? `${Math.round(sats / 1000)}u` : `${sats * 10}n`;
  return {
    bolt11: `lnbc${amountPart}1p${randomBech32(8)}pp5${randomBech32(52)}`,
    sats,
    memo,
    createdAt: new Date().toISOString(),
    expirySec: 600,
  };
}

/** Simulate routing + settlement latency. */
export function settle(): Promise<{ feeSats: number; preimage: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ feeSats: Math.max(1, Math.floor(Math.random() * (MAX_MOCK_FEE_SATS + 1))), preimage: randomBech32(32) });
    }, 1200 + Math.random() * 800);
  });
}
