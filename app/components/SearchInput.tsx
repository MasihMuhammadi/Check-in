"use client";

import React from 'react';

const SearchInput = () => {
    return (
        <>
            <div className='flex items-center justify-center mb-4'>
                <input type="search" className='px-2 border border-black w-80 py-4 rounded-xl' placeholder="Search course name..." />
            </div>
        </>
    );
};

export default SearchInput;