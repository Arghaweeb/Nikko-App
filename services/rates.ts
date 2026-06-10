/**
 * Exchange reference rates (demo values, fixed for the prototype).
 * Swap this module for a live price API in production.
 */
export const RATES = {
  /** Japanese Yen per 1 BTC */
  jpyPerBtc: 16_400_000,
  /** Nikko Coin earned per 1,000 sats spent over Lightning */
  coinPerKsat: 1,
  /** Yen value of 1 Nikko Coin when redeemed */
  jpyPerCoin: 5,
};

export const SATS_PER_BTC = 100_000_000;

export function satsToJpy(sats: number): number {
  return Math.round((sats / SATS_PER_BTC) * RATES.jpyPerBtc);
}

export function satsToCoin(sats: number): number {
  return Math.floor((sats / 1000) * RATES.coinPerKsat);
}

export function coinToJpy(coin: number): number {
  return coin * RATES.jpyPerCoin;
}

export function fmt(n: number): string {
  return n.toLocaleString("en-US");
}
