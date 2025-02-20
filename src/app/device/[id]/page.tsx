"use client"
import { useEffect, useState } from 'react';
import DeviceInfoPage from '@/screens/device';
import Loading from '@components/Loading';

interface PhoneProps {
    params: Promise<{ id: string }>;
}

export default function DeviceDetailsPage({ params }: PhoneProps) {
    const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        params.then((resolved) => {
            setResolvedParams(resolved);
        });
    }, [params]);

    if (!resolvedParams) {
        return <Loading />;
    }

    return <DeviceInfoPage params={resolvedParams} />;
}
