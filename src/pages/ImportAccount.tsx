import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useWallet } from '../hooks/useWallet';

export const ImportAccount = () => {
  const navigate = useNavigate();
  const { importAccount } = useWallet();
  const [privateKey, setPrivateKey] = useState('');
  const [superKey, setSuperKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    if (!privateKey || !superKey) {
      setError('Please enter both private key and superkey');
      return;
    }

    setIsLoading(true);
    try {
      await importAccount(privateKey, superKey);
      navigate('/account');
    } catch (err) {
      setError('Invalid credentials. Please check your private key and superkey.');
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
          <h2 className="text-3xl font-bold text-gray-900">Import Account</h2>
          <p className="mt-2 text-gray-600">Access your existing wallet</p>
        </div>

        <div className="space-y-6">
          <Input
            label="Private Key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Enter your private key"
          />

          <Input
            label="Superkey"
            type="password"
            value={superKey}
            onChange={(e) => setSuperKey(e.target.value)}
            error={error}
            placeholder="Enter your superkey"
          />

          <div className="space-y-4">
            <Button
              onClick={handleImport}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Importing Account...' : 'Import Account'}
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