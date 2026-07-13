// Known exchange/whale addresses -> display label.
// Keys must be lowercase; lookups normalize to lowercase before matching.
const KNOWN_WALLETS = {
  "0x3f5ce5fbfe3e9af3971dd833d26ba9b5c936f0be": "Binance",
  "0xf977814e90da44bfa03b6295a0616a897441acec": "Binance",
  "0x742d35cc6634c0532925a3b844bc454e4438f44e": "Bitfinex",
  "0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0": "Kraken",
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": "Vitalik Buterin",
};

export function getWalletLabel(address) {
  if (!address) return null;
  return KNOWN_WALLETS[address.toLowerCase()] ?? null;
}