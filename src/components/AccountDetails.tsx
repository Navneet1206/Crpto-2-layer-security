import { Copy } from 'lucide-react';
import { Account } from '../types/wallet';

interface AccountDetailsProps {
  account: Account;
  onCopy: (text: string) => void;
}

export const AccountDetails = ({ account, onCopy }: AccountDetailsProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Public Key
      </label>
      <div className="flex items-center space-x-2">
        <code className="flex-1 bg-white p-3 rounded border font-mono text-sm">
          {account.publicKey}
        </code>
        <button
          onClick={() => onCopy(account.publicKey)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Copy className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};