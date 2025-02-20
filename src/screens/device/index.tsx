"use client"
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useGetDeviceDetails } from "./hooks/useGetDeviceDetails";
import { DevicePlaceholder } from "@components/icons/DevicePlaceholder";
import Image from "next/image";
import { DeviceStorageOption, DeviceColorOption } from "@/types";
import { useCart } from "@context/CartContext";
import Loading from "@components/Loading";
import DeviceSpecifications from "./components/DeviceSpecifications";
import SimilarDevices from "./components/SimilarDevices";
import ColorOptions from "./components/ColorOptions";
import StorageOptions from "./components/StorageOptions";
import BackButton from "./components/BackButton";

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
    const [imageError, setImageError] = useState(false);
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



    const isAddToCartDisabled = !selectedStorage || !selectedColor;

    if (isLoading) {
        return <Loading />;
    }

    if (error || !device) {
        notFound();
    }
    return (
        <div className="w-full" data-cy="device-info-page">
            <div className="flex-1 overflow-y-auto pb-12 h-[calc(100vh-64px)] scrollbar-transparent">
                <div className="p-4 md:px-8 lg:px-12">
                    <BackButton />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 sm:px-20">
                    <div className="flex justify-center" data-cy="device-info-image-container">
                        {selectedColor && !imageError ? (

                            <div className="relative w-[400px] h-[400px]">
                                <Image
                                    src={selectedColor.imageUrl}
                                    alt={device.name}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100px, 150px"
                                    className="object-contain"
                                    onError={() => setImageError(true)}
                                    data-cy="device-info-image"
                                />
                            </div>
                        ) : (
                            <DevicePlaceholder />
                        )}
                    </div>
                    <div>
                        <div>
                            <span className="font-normal uppercase" data-cy="device-info-brand">{device.brand}</span>
                            <h1 className="text-3xl font-bold uppercase" data-cy="device-info-name">{device.name}</h1>
                            <p className="text-lg text-gray-600 uppercase" data-cy="device-info-price">from {price} EUR</p>
                        </div>

                        <StorageOptions options={device.storageOptions} selectedStorage={selectedStorage} onSelect={handleStorageSelect} />
                        <ColorOptions options={device.colorOptions} selectedColor={selectedColor} onSelect={handleColorSelect} />

                        <button
                            className={`mt-6 w-full py-2 uppercase text-white transition-transform transform ${isAddToCartDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:scale-105'}`}
                            disabled={isAddToCartDisabled}
                            onClick={handleAddToCart}
                            data-cy="device-info-add-to-cart-button"
                        >
                            add to cart
                        </button>
                    </div>
                </div>

                <DeviceSpecifications specs={device.specs} />
                {device && <SimilarDevices devices={device.similarProducts} />}
            </div>
        </div>
    );
};

export default DeviceInfoPage;
