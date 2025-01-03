import { Copy, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Account } from '../types/wallet';

interface PrivateKeySectionProps {
  account: Account;
  showPrivateKey: boolean;
  superKeyInput: string;
  error: string;
  onSuperKeyChange: (value: string) => void;
  onVerify: () => void;
  onCopy: (text: string) => void;
}

export const PrivateKeySection = ({
  account,
  showPrivateKey,
  superKeyInput,
  error,
  onSuperKeyChange,
  onVerify,
  onCopy,
}: PrivateKeySectionProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Private Key
      </label>
      {showPrivateKey ? (
        <div className="flex items-center space-x-2">
          <code className="flex-1 bg-white p-3 rounded border font-mono text-sm">
            {account.privateKey}
          </code>
          <button
            onClick={() => onCopy(account.privateKey)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            type="password"
            value={superKeyInput}
            onChange={(e) => onSuperKeyChange(e.target.value)}
            placeholder="Enter your superkey to view"
            error={error}
          />
          <Button onClick={onVerify} className="flex items-center space-x-2">
            {showPrivateKey ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Private Key</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>View Private Key</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};