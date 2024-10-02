import React from 'react';

interface SortMobileProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const SortMobile = ({ activeFilter, setActiveFilter }: SortMobileProps) => {
    return (
        <div className="sort-items-mobile">
            <div
                className={`sort-option ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
            >
                All
            </div>
            <div
                className={`sort-option ${activeFilter === 'active' ? 'active' : ''}`}
                onClick={() => setActiveFilter('active')}
            >
                Active
            </div>
            <div
                className={`sort-option ${activeFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setActiveFilter('completed')}
            >
                Completed
            </div>
        </div>
    );
};

export default SortMobile;