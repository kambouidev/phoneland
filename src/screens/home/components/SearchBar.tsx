import { ChangeEvent } from 'react';

interface SearchBarProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
}

export const SearchBar = ({ value, onChange, onClear }: SearchBarProps) => (
    <div className="w-full mb-4 relative flex-none">
        <input
            type="text"
            placeholder="Search for a smartphone..."
            value={value}
            onChange={onChange}
            className="w-full transition-all bg-foreground py-2 border-b border-black focus:outline-none pr-10"
            data-cy="search-home-input"
        />
        {value && (
            <button
                onClick={onClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                data-cy="search-home-clear-button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </button>
        )}
    </div>
);
