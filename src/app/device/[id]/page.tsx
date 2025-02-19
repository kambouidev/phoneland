import DeviceInfoPage from '@/screens/device';

interface PhoneProps {
    params: {
        id: string;
    };
}

export default function DeviceDetailsPage({ params }: PhoneProps) {
    return <DeviceInfoPage id={params.id} />;
}
