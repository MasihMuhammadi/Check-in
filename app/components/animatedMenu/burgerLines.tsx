"use client"
import React, { useState } from 'react';
import NavMenu from './navMenu';

const BurgerLines = ({ crossBurger, setCrossBurger }: { crossBurger: any, setCrossBurger: any }) => {
    const openMenu = () => {
        setCrossBurger(!crossBurger)

    }

    return (
        <>
            <div className='h-8 w-8 flex flex-col relative cursor-pointer' onClick={openMenu}>
                <div className={` rounded-sm bg-primary w-6 h-1 mt-1  transition-all duration-300 ${crossBurger ? "rotate-45 " : ""}`}> </div>
                <div className={` rounded-sm  h-1 mt-1 bg-primary transition-all duration-300 ${crossBurger ? "-rotate-45 absolute top-0 w-6 " : "w-5"}`}> </div>
                <div className={` rounded-sm bg-primary w-4 h-1 mt-1 transition-all duration-300 ${crossBurger ? "hidden " : ""}`}> </div>
            </div>

        </>
    );
};

export default BurgerLines;