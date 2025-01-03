import { create } from 'zustand';
import { Account, WalletState } from '../types/wallet';
import { generatePublicKey, hashSuperKey } from '../utils/crypto';
import { accountService } from '../utils/api';

interface WalletStore extends WalletState {
  createAccount: (account: Account) => Promise<void>;
  importAccount: (privateKey: string, superKey: string) => Promise<void>;
  logout: () => void;
}

export const useWallet = create<WalletStore>((set) => ({
  account: null,
  isAuthenticated: false,
  error: null,
  createAccount: async (account: Account) => {
    try {
      const result = await accountService.createAccount(account);
      set({ account: result, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: 'Failed to create account' });
      throw error;
    }
  },
  importAccount: async (privateKey: string, superKey: string) => {
    try {
      const publicKey = generatePublicKey(privateKey);
      const superKeyHash = hashSuperKey(superKey);

      const account = await accountService.verifyAccount({
        privateKey,
        publicKey,
        superKeyHash,
      });

      set({ account, isAuthenticated: true, error: null });
    } catch (error) {
      set({ error: 'Invalid credentials' });
      throw error;
    }
  },
  logout: () => {
    set({ account: null, isAuthenticated: false, error: null });
  },
}));