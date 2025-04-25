// Enhance the SearchBar component
// src/components/SearchBar.jsx
function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="search-clear-btn"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    );
  }
  
  export default SearchBar;
  
  