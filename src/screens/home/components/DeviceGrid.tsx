import React from 'react';
import { IDevice } from '@/types';
import { DeviceCard } from './DeviceCard';

interface DeviceGridProps {
    devices: IDevice[];
}

const DeviceGrid: React.FC<DeviceGridProps> = ({ devices }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" data-cy="device-home-grid">
            {devices.map((device, index) => (
                <DeviceCard
                    key={`${device.id}-${index}`}
                    {...device}
                />
            ))}
        </div>
    );
};

export default DeviceGrid;
