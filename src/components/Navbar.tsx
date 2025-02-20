"use client"
import Link from 'next/link'
import { useCart } from '@context/CartContext'

export default function Navbar() {
    const { cart } = useCart();
    return (
        <nav className="fixed top-0 left-0 right-0 bg-background z-50">
            <div className="px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center transition-transform transform hover:scale-105">
                        <span className="text-2xl font-bold text-foreground">
                            PhoneLand
                        </span>
                    </Link>

                    <Link href="/cart" className="flex items-center transition-transform transform hover:scale-105">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                {cart.length}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
