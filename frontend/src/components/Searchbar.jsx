import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Searchbar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      const param = new URLSearchParams({query: searchInput});
      navigate(`search?${param.toString()}`)
    }
  }

  return (
    <div>
        <form onSubmit={handleSearchInput}>
          <input  onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                type="text"
                placeholder="What are you looking for?"
                className="w-64 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
        </form>
    </div>
  )
}

export default Searchbar