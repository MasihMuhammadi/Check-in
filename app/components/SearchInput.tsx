"use client";

import React from 'react';
import Buttons from './buttons';
import SearchIcon from '../../public/smallIcons/searchIcon';

const SearchInput = ({ searchValue, setSearchValue, searchCourse }: { searchValue: any, setSearchValue: any, searchCourse: any }) => {
    return (
        <>
            <div className='flex items-center justify-center mb-4 '>
                <input
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    type="text" className='w-full max-w-[500px] px-4 border border-r-transparent focus-within::border-r-transparent border-black  py-4 rounded-tl-xl rounded-bl-xl' placeholder="Search course name..." />
                <button className='border border-black border-l-transparent rounded-tr-xl rounded-br-xl px-5 bg-gray-200 items-center text-center w-auto h-[58px] -ml-1'
                    onClick={searchCourse}
                >
                    <SearchIcon />
                </button>
            </div>
        </>
    );
};

export default SearchInput;