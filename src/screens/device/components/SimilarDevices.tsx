import { IDevice } from "@/types";
import { DeviceCard } from "../../home/components/DeviceCard";

interface SimilarDevicesProps {
    devices: IDevice[];
}

const SimilarDevices: React.FC<SimilarDevicesProps> = ({ devices }) => {
    return (
        <div className="mt-8 pl-10 sm:pl-20">
            <h2 className="text-2xl font-semibold uppercase">similar items</h2>
            <div className="flex overflow-x-auto mt-4 scrollbar-custom pb-12">
                {devices.map((product, index) => (
                    <div key={`${product.id}-${index}`} className="w-72 h-72 flex-shrink-0">
                        <DeviceCard {...product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarDevices;
