import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;

    // If user arrived via a flip from SignUp -> Login
    if (location.state?.flip === 'signupToLogin') {
      // Start rotated and hidden, rotate to 0 + fade in
      gsap.fromTo(
        formRef.current,
        { rotationY: -90, opacity: 0 },
        { duration: 0.5, rotationY: 0, opacity: 1 }
      );
    } else {
      // Normal page load: just fade in from opacity 0 to 1
      gsap.to(formRef.current, { duration: 0.5, opacity: 1 });
    }
  }, [location.state]);

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

  const handleFlipNavigate = (path: string) => {
    if (!formRef.current) return;

    // Flip out + fade out, then navigate
    gsap.to(formRef.current, {
      duration: 0.5,
      rotationY: -90,
      opacity: 0,
      onComplete: () => {
        navigate(path, { state: { flip: 'loginToSignup' } });
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#f5f5f7]">
       
        <div className="w-full max-w-md p-8 opacity-0" ref={formRef}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600">Access your photo gallery</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignIn} noValidate className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 
                           focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
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
                           focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
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
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => handleFlipNavigate('/signup')}
                className="text-[#0071e3] hover:underline"
              >
                Create one now
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
