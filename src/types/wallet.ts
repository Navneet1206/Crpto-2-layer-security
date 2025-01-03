export interface Account {
  publicKey: string;
  privateKey: string;
  superKeyHash: string;
}

export interface WalletState {
  account: Account | null;
  isAuthenticated: boolean;
  error: string | null;
}