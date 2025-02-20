import React from 'react';

interface FooterProps {
    handlePrevious: () => void;
    handleNext: () => void;
    isPreviousDisabled: boolean;
    isNextDisabled: boolean;
}

const HomeFooter: React.FC<FooterProps> = ({ handlePrevious, handleNext, isPreviousDisabled, isNextDisabled }) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-background border-t py-4">
            <div className="container mx-auto px-4 flex justify-center gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={isPreviousDisabled}
                    className={`px-4 py-2 border bg-background text-foreground disabled:opacity-50 transition-transform transform ${isPreviousDisabled ? '' : 'hover:scale-105'}`}
                    data-cy="pagination-home-previous-button"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className={`px-4 py-2 border bg-background text-foreground disabled:opacity-50 transition-transform transform ${isNextDisabled ? '' : 'hover:scale-105'}`}
                    data-cy="pagination-home-next-button"
                >
                    Next
                </button>
            </div>
        </footer>
    );
};

export default HomeFooter;
