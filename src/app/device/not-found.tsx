import Link from 'next/link'

export default function DeviceNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Device not found</h2>
            <p className="mb-4">{"We couldn't find the device you're looking for"}</p>
            <Link
                href="/"
                className="text-blue-500 hover:text-blue-700 underline"
            >
                View all devices
            </Link>
        </div>
    )
}
