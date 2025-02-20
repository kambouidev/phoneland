"use client"
import { ICartDevice } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { DevicePlaceholder } from "@/components/icons/DevicePlaceholder";

interface CartDeviceProps {
    device: ICartDevice;
    handleDelete: (id: string) => void;
}

export const CartDevice: React.FC<CartDeviceProps> = ({ device, handleDelete }) => {
    const [imageError, setImageError] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'decimal',
            maximumFractionDigits: 0
        }).format(price) + ' EUR';
    };

    return (
        <div className="flex flex-row border cursor-pointer">
            <div className="flex-1 flex items-center justify-center">
                {!imageError ? (
                    <Image
                        src={device.imageUrl}
                        alt={device.name}
                        width={300}
                        height={300}
                        className="object-contain"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <DevicePlaceholder />
                )}
            </div>

            <div className="flex flex-1 flex-col p-2 justify-between">
                <div>
                    <div className="flex flex-col">
                        <span className="font-extralight text-gray-500 uppercase">{device.name}</span>
                        <span className="text-sm font-extralight truncate uppercase">{device.storage} | {device.colorName}</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-sm font-extralight uppercase">
                            {formatPrice(device.price)}
                        </span>
                    </div>
                </div>
                <div className="flex justify-start">
                    <button className="text-sm uppercase text-red-500 p-2" onClick={() => handleDelete(device.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
