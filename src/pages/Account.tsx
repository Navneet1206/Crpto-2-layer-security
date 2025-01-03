import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '../components/Button';
import { AccountDetails } from '../components/AccountDetails';
import { PrivateKeySection } from '../components/PrivateKeySection';
import { useWallet } from '../hooks/useWallet';
import { validateSuperKey } from '../utils/crypto';

export const Account = () => {
  const navigate = useNavigate();
  const { account, logout } = useWallet();
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [superKeyInput, setSuperKeyInput] = useState('');
  const [error, setError] = useState('');

  if (!account) {
    navigate('/');
    return null;
  }

  const handleVerifySuperKey = () => {
    if (validateSuperKey(superKeyInput, account.superKeyHash)) {
      setShowPrivateKey(true);
      setError('');
    } else {
      setError('Invalid superkey');
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">Account Details</h2>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>

          <div className="space-y-6">
            <AccountDetails account={account} onCopy={handleCopy} />
            <PrivateKeySection
              account={account}
              showPrivateKey={showPrivateKey}
              superKeyInput={superKeyInput}
              error={error}
              onSuperKeyChange={setSuperKeyInput}
              onVerify={handleVerifySuperKey}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};