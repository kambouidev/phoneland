"use client"
import Image from "next/image";
import { useState } from "react";
import { IDevice } from "@/types";
import { DevicePlaceholder } from "@/components/icons/DevicePlaceholder";

export const DeviceCard = ({ basePrice, brand, imageUrl, name }: IDevice) => {
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(price) + ' EUR';
    };

    return (
        <div className="flex flex-col h-full border relative group overflow-hidden">
            <div className="absolute inset-0 bg-black transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 -z-10" />

            <div className="flex-1 flex items-center justify-center p-2 relative">
                {!imageError ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={150}
                        height={150}
                        className="object-contain max-h-[150px]"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <DevicePlaceholder />
                )}
            </div>

            <div className="flex items-end justify-between p-2 relative">
                <div className="flex flex-col">
                    <span className="text-xs  font-extralight text-gray-500 uppercase transition-colors group-hover:text-white">{brand}</span>
                    <span className="text-xs  font-extralight truncate uppercase transition-colors group-hover:text-white">{name}</span>
                </div>
                <div>
                    <span className="text-xs font-extralight uppercase transition-colors group-hover:text-white">
                        {formatPrice(basePrice)}
                    </span>
                </div>
            </div>
        </div>
    );
};
