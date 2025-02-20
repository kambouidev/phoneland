"use client"
import { FC } from "react";
import { useDevices } from "./hooks/useDevices";
import { usePagination } from "./hooks/usePagination";
import { useSearch } from "./hooks/useSearch";
import { SearchBar } from "./components/SearchBar";
import DeviceGrid from "./components/DeviceGrid";
import HomeFooter from "./components/HomeFooter";

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

    const isPreviousDisabled = offset === 0;
    const isNextDisabled = devices.length < 20;

    return (
        <div className="p-4 md:px-8 lg:px-12 flex flex-col h-[calc(100vh-20vh)] md:h-[calc(100vh-64px)]">
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

            <div className="flex-1 overflow-y-auto mb-20 scrollbar-transparent">
                <DeviceGrid devices={devices} />
            </div>

            <HomeFooter
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                isPreviousDisabled={isPreviousDisabled}
                isNextDisabled={isNextDisabled}
            />
        </div>
    );
};

export default HomePage;
