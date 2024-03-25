import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import styles from './styles.module.css';
import { FaClock } from 'react-icons/fa';

const Search = ({ setSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const savedSearchHistory = localStorage.getItem('searchHistory');
        if (savedSearchHistory) {
            setSearchHistory(JSON.parse(savedSearchHistory));
        }
        if (searchText.trim() !== '') {
            setShowDropdown(true);
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [searchText]);

    const handleSearch = () => {
        const searchQuery = searchText.trim();
        setSearch(searchQuery);

        if (searchQuery && !searchHistory.includes(searchQuery)) {
            const newSearchHistory = [...searchHistory, searchQuery];
            setSearchHistory(newSearchHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
        }

        setSearchText('');
        setShowDropdown(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectHistory = (history) => {
        setSearchText(history);
        setShowDropdown(false);
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    const removeSearchHistory = (history, event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện kế thừa
        const updatedSearchHistory = searchHistory.filter(item => item !== history);
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    setShowDropdown(true);
                }}
                onKeyDown={handleKeyPress}
            />
            <button className={styles.searchButton} onClick={handleSearch}>
                <FaSearch />
            </button>

            {showDropdown && searchHistory.length > 0 && (
                <div className={styles.dropdown} ref={dropdownRef}>
                    <div className={styles.dropdownHeader}>
						

                        {!showDropdown && (
                            <button className={styles.clearButton} onClick={clearSearchHistory}>
                                <FaTimes />
                            </button>
                        )}
                    </div>
					{searchHistory.map((history, index) => (
						<div key={index} className={styles.historyItem} onClick={() => handleSelectHistory(history)}>
							<FaClock className={styles.historyIcon} />
							<span className={styles.historyText}>{history}</span>
							<button
								className={styles.removeButton}
								onClick={(event) => removeSearchHistory(history, event)}
							>
								<FaTimes />
							</button>
						</div>
					))}

                </div>
            )}
        </div>
    );
};

export default Search;
