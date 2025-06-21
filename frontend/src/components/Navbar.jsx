import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';

const Navbar = ({setQuery}) => {
    const {user,logout} =useAuth();
   
  return (
    <nav className="bg-gray-900 p-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-semibold text-green-400 tracking-wide">
          <Link to="/">NoteApp</Link>
        </div>

        {/* Search Input */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="Search Notes..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=> setQuery(e.target.value)}
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          
          {!user ?(
            <>
                <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 transition-colors px-4 py-2 rounded-md"
          >
            Signup
          </Link>
            </>
          ):(
          
          <>
            <span className="text-gray-300">{user.name}</span>
            <button className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md"
            onClick={logout}
            >
            Logout
          </button>
          </>
)}     
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
