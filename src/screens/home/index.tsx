"use client"
import { FC } from "react";
import { useDevices } from "./hooks/useDevices";
import { usePagination } from "./hooks/usePagination";
import { useSearch } from "./hooks/useSearch";
import { SearchBar } from "./components/SearchBar";
import { DeviceCard } from "./components/DeviceCard";

const HomePage: FC = () => {
    const { offset, handleNext, handlePrevious, resetOffset } = usePagination();
    const { searchQuery, debouncedSearch, handleSearch, clearSearch } = useSearch({
        onSearch: resetOffset,
        debounceTime: 500,
        initialValue: ''
    });
    const { data, isLoading } = useDevices(debouncedSearch, offset);

    const devices = data || [];
    const totalResults = data?.length || 0;

    const handleClear = () => {
        clearSearch();
        resetOffset();
    };

    return (
        <div className="container mx-auto px-4 flex flex-col h-[calc(100vh-64px)]">
            <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                onClear={handleClear}
            />

            <div className="mb-6 flex-none">
                <p className="font-thin uppercase">
                    {isLoading ? 'Loading...' : `${totalResults} results`}
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pb-20 scrollbar-transparent">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {devices.map((device, index) => (
                        <DeviceCard
                            key={`${device.id}-${index}`}
                            {...device}
                        />
                    ))}
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t py-4">
                <div className="container mx-auto px-4 flex justify-center gap-2">
                    <button
                        onClick={handlePrevious}
                        disabled={offset === 0}
                        className="px-4 py-2 border rounded-lg bg-background text-foreground disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={devices.length < 20}
                        className="px-4 py-2 border rounded-lg bg-background text-foreground disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
