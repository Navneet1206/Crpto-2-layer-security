import { Account } from '../types/wallet';

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new ApiError(error.error || 'An error occurred', response.status);
  }
  return response.json();
}

export const accountService = {
  async createAccount(data: Account) {
    try {
      const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      return handleResponse<Account>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Failed to create account');
    }
  },

  async verifyAccount(data: { privateKey: string; publicKey: string; superKeyHash: string }) {
    try {
      const response = await fetch('/api/accounts/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      return handleResponse<Account>(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error('Invalid credentials');
    }
  }
};