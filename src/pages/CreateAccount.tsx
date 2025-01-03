import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { generatePrivateKey, generatePublicKey, hashSuperKey } from '../utils/crypto';
import { useWallet } from '../hooks/useWallet';

export const CreateAccount = () => {
  const navigate = useNavigate();
  const { createAccount } = useWallet();
  const [superKey, setSuperKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!superKey) {
      setError('Please enter a superkey');
      return;
    }

    setIsLoading(true);
    try {
      const privateKey = generatePrivateKey();
      const publicKey = generatePublicKey(privateKey);
      const superKeyHash = hashSuperKey(superKey);

      await createAccount({ privateKey, publicKey, superKeyHash });
      navigate('/account');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Set up your secure wallet with a superkey</p>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900">Security Note</h3>
              <p className="text-sm text-blue-700">
                Your superkey is used to protect your private key. Make sure to remember it
                and keep it secure. It cannot be recovered if lost.
              </p>
            </div>
          </div>

          <Input
            label="Enter your superkey"
            type="password"
            value={superKey}
            onChange={(e) => setSuperKey(e.target.value)}
            error={error}
            placeholder="Enter a secure passphrase"
          />

          <div className="space-y-4">
            <Button
              onClick={handleCreate}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};