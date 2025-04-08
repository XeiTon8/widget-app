import React from 'react';
import {Search, Bell, ChevronDownIcon} from 'lucide-react';
import UKFlag from '../../assets/uk-flag.png';
import GERFlag from '../../assets/ger-flag.png';

export const Header = () => {
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(UKFlag);

    const handleSelect = (language: string) => {
        setSelectedLanguage(language);
        setDropdownOpen(false);
    };

    return (
        <div className="flex justify-between pb-6">
            <div className="relative" style={{ width: "360px", height: "40px" }}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2"  size={20} />
                <input
                    type="text"
                    placeholder="Search anything"
                    className="pl-10 pr-4 w-full h-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none border-none rounded-[10px] shadow-sm"
                />
            </div>
            <div className='flex gap-5 items-center'>
                <div className="w-px h-5 bg-gray-300">
                </div>
                <div>
                    <Bell size={20} />
                </div>
                <div className="w-px h-5 bg-gray-300">
                </div>
                <div className="relative">
                    <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center cursor-pointer pl-2 pr-4 py-2 w-full bg-white text-gray-800 rounded-[15px] focus:outline-none shadow-sm"
                    >
                    <img
                    src={selectedLanguage}
                    alt="Selected Language"
                    width={25}
                    height={25}
                    />
                    <ChevronDownIcon className="ml-2 w-4 h-4 text-gray-500" />
                    </div>

                {dropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-[10px] shadow-lg z-100">
                    <div
                        onClick={() => handleSelect(UKFlag)}
                        className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-100 z-100"
                    >
                        <img
                        src={UKFlag}
                        alt="English"
                        width={25}
                        height={25}
                        />
                    </div>
                    <div
                        onClick={() => handleSelect(GERFlag)}
                        className="flex items-center justify-center p-2 cursor-pointer hover:bg-gray-100 z-100"
                    >
                        <img
                        src={GERFlag}
                        alt="German"
                        width={25}
                        height={25}
                        />
                    </div>
                </div>
            )}
                </div>
            </div>
        </div>
        
    )
}