import SHA256 from 'crypto-js/sha256';
import Hex from 'crypto-js/enc-hex';

export const generatePrivateKey = (): string => {
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const generatePublicKey = (privateKey: string): string => {
  return SHA256(privateKey).toString(Hex);
};

export const hashSuperKey = (superKey: string): string => {
  return SHA256(superKey).toString(Hex);
};

export const validateSuperKey = (inputSuperKey: string, storedHash: string): boolean => {
  const inputHash = hashSuperKey(inputSuperKey);
  return inputHash === storedHash;
};