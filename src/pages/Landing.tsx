import { Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Secure Crypto Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Create or import your secure wallet with advanced encryption
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/create')}
            className="flex-1 max-w-xs mx-auto sm:mx-0"
          >
            Create Account
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/import')}
            className="flex-1 max-w-xs mx-auto sm:mx-0"
          >
            Import Account
          </Button>
        </div>
      </div>
    </div>
  );
};