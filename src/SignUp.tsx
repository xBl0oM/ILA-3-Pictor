import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { createUserWithEmailAndPassword, updateProfile, AuthError } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);

  // On mount, if coming via a flip switch, animate flip-in; otherwise, do a simple fade in.
  useEffect(() => {
    if (formRef.current) {
      if (location.state && location.state.flip === 'loginToSignup') {
        // Coming from Login → SignUp: start at 90° so it rotates in to 0.
        gsap.fromTo(
          formRef.current,
          { rotationY: 90, opacity: 0 },
          { duration: 0.5, rotationY: 0, opacity: 1 }
        );
      } else {
        // Normal fade in.
        gsap.from(formRef.current, { duration: 0.5, opacity: 0 });
      }
    }
  }, [location.state]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate('/dashboard');
    } catch (err) {
      const error = err as AuthError;
      setError(error.message);
      setIsLoading(false);
    }
  };

  // On click, flip out (rotate to 90° and fade out), then navigate to Login.
  const handleFlipNavigate = (path: string) => {
    if (!formRef.current) return;
    gsap.to(formRef.current, {
      duration: 0.5,
      rotationY: 90,
      opacity: 0,
      onComplete: () => {
        // Pass a flag so the destination knows to animate a flip in.
        navigate(path, { state: { flip: 'signupToLogin' } });
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16 flex items-center justify-center bg-[#f5f5f7]">
        <div className="w-full max-w-md p-8" ref={formRef}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900">Create Account</h1>
            <p className="mt-2 text-sm text-gray-600">Join our photo gallery community</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {/* Use noValidate to disable built-in validation tooltips */}
          <form onSubmit={handleSignUp} noValidate className="space-y-6">
            <div className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:border-gray-400 placeholder-gray-400 text-gray-900"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0071e3] text-white rounded-lg py-3 px-4 hover:bg-[#0077ed] transition-colors duration-200 font-medium text-sm disabled:opacity-50"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => handleFlipNavigate('/login')}
                className="text-[#0071e3] hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
