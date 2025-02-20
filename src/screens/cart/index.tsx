"use client"
import { useCart } from "../../context/CartContext";
import { CartDevice } from "./components/CartDevice";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const router = useRouter();
    const { cart, removeFromCart } = useCart();

    const total = cart.reduce((acc, device) => acc + device.price, 0);

    const handleRemoveFromCart = (id: string) => removeFromCart(id);

    return (
        <div className="w-full">
            <div className="flex-1 p-4 md:px-8 lg:px-12 h-[calc(100vh-64px)] overflow-y-auto scrollbar-transparent">
                <div className="text-xl mb-10 uppercase">cart ({cart.length})</div>

                <div className="grid grid-cols-1 pb-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {cart.map((device, index) => (
                        <CartDevice
                            key={`${device.id}-${index}`}
                            device={device}
                            handleDelete={handleRemoveFromCart}
                        />
                    ))}
                </div>
                <footer className="fixed bottom-0 left-0 right-0 bg-black p-4 md:px-8 lg:px-12">
                    {cart.length > 0 && <div className="flex flex-row gap-4 uppercase text-white justify-between sm:hidden">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">{total} EUR</span>
                    </div>}
                    <div className="flex flex-row justify-between items-center gap-2">
                        <button
                            className="px-4 py-2 border bg-white uppercase transition-transform transform hover:scale-105"
                            onClick={() => router.push("/")}
                        >
                            continue shopping
                        </button>
                        {cart.length > 0 && <div className="flex flex-row items-center gap-16">
                            <div className="flex-row gap-4 uppercase text-white hidden sm:flex">
                                <span className="text-lg font-semibold">Total</span>
                                <span className="text-lg font-semibold">{total} EUR</span>
                            </div>
                            <button
                                className="px-14 py-2 border bg-background text-white uppercase transition-transform transform hover:scale-105"
                            >
                                pay
                            </button>
                        </div>}

                    </div>
                </footer>
            </div>
        </div>
    );
};

export default CartPage;
