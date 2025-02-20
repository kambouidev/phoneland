import { DeviceStorageOption } from "@/types";

interface StorageOptionsProps {
    options: DeviceStorageOption[];
    selectedStorage: string | undefined;
    onSelect: (option: DeviceStorageOption) => void;
}

const StorageOptions: React.FC<StorageOptionsProps> = ({ options, selectedStorage, onSelect }) => {
    return (
        <div className="mt-4" data-cy="device-info-storage-options">
            <h3 className="font-semibold uppercase">storage, how much space do you need?</h3>
            <div className="flex mt-2">
                {options.map((option) => (
                    <button
                        key={option.capacity}
                        onClick={() => onSelect(option)}
                        className={`border p-4 transition-transform transform hover:scale-105 ${selectedStorage === option.capacity ? 'ring-2 ring-black' : ''}`}
                        data-cy={`device-info-storage-option-${option.capacity}`}
                    >
                        {option.capacity}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StorageOptions;
