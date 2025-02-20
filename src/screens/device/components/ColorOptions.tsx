import { DeviceColorOption } from "@/types";

interface ColorOptionsProps {
    options: DeviceColorOption[];
    selectedColor: DeviceColorOption | undefined;
    onSelect: (option: DeviceColorOption) => void;
}

const ColorOptions: React.FC<ColorOptionsProps> = ({ options, selectedColor, onSelect }) => {
    return (
        <div className="mt-4" data-cy="device-info-color-options">
            <h3 className="font-semibold">color, pick your favorite color.</h3>
            <div className="flex gap-8 mt-2">
                {options.map((option) => (
                    <button
                        key={option.name}
                        onClick={() => onSelect(option)}
                        style={{ backgroundColor: option.hexCode }}
                        className={`w-8 h-8 border transition-transform transform hover:scale-105 ${selectedColor?.hexCode === option.hexCode ? 'ring-2 ring-black' : ''}`}
                        data-cy={`device-info-color-option-${option.name}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorOptions;
