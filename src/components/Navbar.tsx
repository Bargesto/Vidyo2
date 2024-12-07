import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Search, ShieldCheck, X } from 'lucide-react';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="bg-gray-800 shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">SüperDers</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSearchClick}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link 
              to="/admin" 
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-0 bg-gray-800 z-50 p-4 border-b border-gray-700">
          <form onSubmit={handleSearchSubmit} className="container mx-auto flex items-center">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Video ara..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
            />
            <button
              type="button"
              onClick={handleCloseSearch}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
