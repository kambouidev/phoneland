import { DeviceSpecs } from "@/types";

interface DeviceSpecificationsProps {
    specs: DeviceSpecs;
}

const DeviceSpecifications: React.FC<DeviceSpecificationsProps> = ({ specs }) => {
    return (
        <div className="mt-8 px-10 sm:px-20" data-cy="device-info-specifications">
            <h2 className="text-2xl font-semibold uppercase">specifications</h2>
            <div className="grid grid-cols-1 border-t mt-2">
                {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="border-b p-2 flex">
                        <h4 className="text-gray-500 uppercase text-sm flex-1">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                        <p className="flex-1">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceSpecifications;
