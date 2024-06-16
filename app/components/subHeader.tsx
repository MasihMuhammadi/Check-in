
import { AnyMxRecord } from 'dns';
import Link from 'next/link';
import React from 'react';

const SubHeader = ({ href, tab, setTab, renderTabContent }: { href: any, tab: any, setTab: any, renderTabContent: any }) => {

    return (
        <>
            <nav className='flex items-center justify-center'>
                <ul className='flex gap-x-4'>
                    <li>
                        <span onClick={() => setTab("account")}>
                            <Link href={href} >account
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span onClick={() => setTab("password")}>
                            <Link href={href} >Password
                            </Link>
                        </span>
                    </li>
                    <li>
                        <span onClick={() => setTab("classes")}>
                            <Link href={href} >Classes
                            </Link>
                        </span>
                    </li>
                </ul>
            </nav>
            {renderTabContent()}
        </>
    );
};

export default SubHeader;