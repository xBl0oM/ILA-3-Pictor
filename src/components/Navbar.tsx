import { Link } from 'react-router-dom';




const Navbar = () => {

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Pictor-Logo.jpg" alt="Pictor Logo" className="h-8 w-8 object-contain"/> 
            <span className="text-xl font-semibold text-gray-900">Pictor</span> 
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;