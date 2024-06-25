// components/TabHeader.tsx
import React from 'react';

interface TabHeaderProps {
    tabs: string[];
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const AllTabs: React.FC<TabHeaderProps> = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div className="flex justify-center mb-5 border-b border-gray-300">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`p-4 ${activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default AllTabs;
