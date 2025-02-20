"use client"
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useGetDeviceDetails } from "./hooks/useGetDeviceDetails";
import { DevicePlaceholder } from "@components/icons/DevicePlaceholder";
import Image from "next/image";
import { DeviceCard } from "../home/components/DeviceCard";
import { DeviceStorageOption, DeviceColorOption } from "@/types";
import { useCart } from "@context/CartContext";
import Loading from "@components/Loading";

interface DeviceInfoPageProps {
    params: {
        id: string;
    };
}

const DeviceInfoPage: FC<DeviceInfoPageProps> = ({ params }) => {
    const { id } = params;
    const { data: device, isLoading, error } = useGetDeviceDetails(id);
    const { addToCart } = useCart();

    const router = useRouter();

    const [price, setPrice] = useState<number>();
    const [selectedStorage, setSelectedStorage] = useState<string>();
    const [selectedColor, setSelectedColor] = useState<DeviceColorOption>();

    useEffect(() => {
        if (device) {
            setPrice(device.basePrice);
            setSelectedColor(device.colorOptions[0]);
        }
    }, [device]);

    const handleStorageSelect = (option: DeviceStorageOption) => {
        setSelectedStorage(option.capacity);
        setPrice(option.price);
    };

    const handleColorSelect = (option: DeviceColorOption) => {
        setSelectedColor(option);
    };

    const handleAddToCart = () => {
        if (!device || !selectedColor || !selectedStorage || price === undefined) return;
        addToCart({
            brand: device.brand,
            colorName: selectedColor.name,
            id: `${device.id}-${Date.now()}`,
            imageUrl: selectedColor.imageUrl,
            name: device.name,
            price,
            storage: selectedStorage
        });
        router.push('/cart');
    }

    if (isLoading) {
        return <Loading />;
    }

    if (error || !device) {
        notFound();
    }

    const isAddToCartDisabled = !selectedStorage || !selectedColor;

    return (
        <div className="w-full">
            <div className="flex-1 overflow-y-auto pb-12 h-[calc(100vh-64px)] scrollbar-transparent">
                <div className="p-4 md:px-8 lg:px-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-black hover:text-gray-400"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                        Back
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 sm:px-20">
                    <div className="flex justify-center">
                        {selectedColor ? (
                            <Image
                                src={selectedColor.imageUrl}
                                alt={device.name}
                                width={400}
                                height={400}
                                className="object-contain"
                            />
                        ) : (
                            <DevicePlaceholder />
                        )}
                    </div>

                    <div>
                        <div>
                            <h1 className="text-3xl font-bold uppercase">{device.name}</h1>
                            <p className="text-lg text-gray-600 uppercase">from {price} EUR</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold uppercase">storage, how much space do you need?</h3>
                            <div className="flex mt-2">
                                {device.storageOptions.map((option) => (
                                    <button
                                        key={option.capacity}
                                        onClick={() => handleStorageSelect(option)}
                                        className={`border p-4 transition-transform transform hover:scale-105 ${selectedStorage === option.capacity ? 'ring-2 ring-black' : ''}`}
                                    >
                                        {option.capacity}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-semibold">color, pick your favorite color.</h3>
                            <div className="flex gap-8 mt-2">
                                {device.colorOptions.map((option) => (
                                    <button
                                        key={option.name}
                                        onClick={() => handleColorSelect(option)}
                                        style={{ backgroundColor: option.hexCode }}
                                        className={`w-8 h-8 border transition-transform transform hover:scale-105 ${selectedColor?.hexCode === option.hexCode ? 'ring-2 ring-black' : ''}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            className={`mt-6 w-full py-2 uppercase text-white transition-transform transform ${isAddToCartDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:scale-105'}`}
                            disabled={isAddToCartDisabled}
                            onClick={handleAddToCart}
                        >
                            add to cart
                        </button>
                    </div>
                </div>

                <div className="mt-8 px-10 sm:px-20">
                    <h2 className="text-2xl font-semibold uppercase">specifications</h2>
                    <div className="grid grid-cols-1 border-t mt-2">
                        {Object.entries(device.specs).map(([key, value]) => (
                            <div key={key} className="border-b p-2 flex">
                                <h4 className="text-gray-500 uppercase text-sm flex-1">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                                <p className="flex-1">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pl-10 sm:pl-20">
                    <h2 className="text-2xl font-semibold uppercase">similar items</h2>
                    <div className="flex overflow-x-auto mt-4 scrollbar-custom pb-12">
                        {device.similarProducts.map((product, index) => (
                            <div key={`${device.id}-${index}`} className="w-72 h-72 flex-shrink-0">
                                <DeviceCard {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeviceInfoPage;
