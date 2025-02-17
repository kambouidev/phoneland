import { notFound } from 'next/navigation';

interface PhoneProps {
    params: {
        id: string;
    };
}

export default async function DeviceDetailsPage({ params }: PhoneProps) {
    if (params.id === "phone-123") notFound()
    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            device id: {params.id}
        </div>
    );

}
