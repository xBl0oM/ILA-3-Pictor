import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import Navbar from './components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar user={null} />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#f5f5f7]">
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">
              Access your photo gallery
            </p>
          </div>
          
          <form onSubmit={handleSignIn} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 
                           focus:outline-none focus:border-gray-400
                           placeholder-gray-400 text-gray-900"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 
                           focus:outline-none focus:border-gray-400
                           placeholder-gray-400 text-gray-900"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0071e3] text-white rounded-lg py-3 px-4
                           hover:bg-[#0077ed] transition-colors duration-200
                           font-medium text-sm disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : 'Sign In'}
              </button>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-sm text-[#0071e3] hover:underline">
                Forgot password?
              </a>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[#0071e3] hover:underline"
                >
                  Create one now
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;