import React from "react";

interface ISearchBarProps {
    isFullWidth?: boolean;
}
export const SearchBar: React.FC<ISearchBarProps> = ({isFullWidth}) => {
    return (
        <div className={`flex items-center gap-[10px]`}>
        <div className="relative w-full">
            <span className="flex">
            <input placeholder='Search' className={`focus:outline-none border border-gray-300 p-1 rounded-[10px] rounded-tr-none rounded-br-none pl-[10px] ${isFullWidth ? 'w-full' : 'auto'} `} />
            <div className="bg-gray-200 p-1.5 rounded-tl-none rounded-bl-none rounded-tr-[10px] rounded-br-[10px] ml-[-2%]">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 0l6 6"
            />
            </svg>
            </div>
            </span>
        </div>
    </div>
    )
}