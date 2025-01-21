import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Pictor-Logo.jpg" alt="Pictor Logo" className="h-8 w-8 object-contain"/> 
            <span className="text-xl font-semibold text-gray-900">Pictor</span> 
          </Link>

          {/* Spacer for flex layout */}
          <div className="flex-1"></div>

          {/* Hamburger Menu - Only shown when logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <Link
                    to="/gallery"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Gallery
                  </Link>
                  <Link
                    to="/albums"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Albums
                  </Link>
                  <Link
                    to="/sharing"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Shared with Me
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
