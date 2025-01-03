import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { CreateAccount } from './pages/CreateAccount';
import { ImportAccount } from './pages/ImportAccount';
import { Account } from './pages/Account';
import { useWallet } from './hooks/useWallet';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useWallet();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/import" element={<ImportAccount />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;