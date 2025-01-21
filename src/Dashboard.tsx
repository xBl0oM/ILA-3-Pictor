import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Upload from './components/Upload';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get first name from the displayName
  const firstName = user?.displayName?.split(' ')[0] || 'User';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar user={user} />
      <div className="min-h-screen pt-16 bg-[#f5f5f7] p-8 mt-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-medium text-gray-900">
                Welcome back, {firstName}!
              </h1>
              <p className="text-gray-600 mt-2">
                Signed in as: {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-[#0071e3] text-white rounded-lg hover:bg-[#0077ed] text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <p className="text-gray-600">
              You're successfully logged in to your account. Your photos will appear here soon!
            </p>
          </div>
          {/* Upload Component */}
          <Upload user={user} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
