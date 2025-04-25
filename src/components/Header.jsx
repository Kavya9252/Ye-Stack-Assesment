import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Post Manager</Link>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </header>
  );
}

export default Header;