"use client"
import { IDevice } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DevicePlaceholder } from "@/components/icons/DevicePlaceholder";

export const DeviceCard = ({ id, basePrice, brand, imageUrl, name }: IDevice) => {
    const [imageError, setImageError] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/device/${id}`);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(price) + ' EUR';
    };

    return (
        <div
            onClick={handleClick}
            className="flex flex-col h-full border relative group overflow-hidden cursor-pointer"
            data-cy={`device-card-${id}`}
        >
            <div className="absolute inset-0 md:bg-black md:transform md:translate-y-full md:transition-transform md:duration-300 md:ease-in-out md:group-hover:translate-y-0 -z-10" />

            <div className="flex-1 flex items-center justify-center p-2 relative">
                {!imageError ? (
                    <div className="relative w-[150px] h-[150px]">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            priority
                            sizes="(max-width: 768px) 100px, 150px"
                            className="object-contain"
                            onError={() => setImageError(true)}
                        />
                    </div>
                ) : (
                    <DevicePlaceholder />
                )}
            </div>

            <div className="flex items-end justify-between p-2 relative">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-gray-500 uppercase transition-colors md:group-hover:text-white">{brand}</span>
                    <span className="text-xs font-bold truncate uppercase transition-colors md:group-hover:text-white">{name}</span>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase transition-colors md:group-hover:text-white">
                        {formatPrice(basePrice)}
                    </span>
                </div>
            </div>
        </div>
    );
};
