import { IDevice } from './IDevice.interface';

interface DeviceColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

interface DeviceStorageOption {
  capacity: string;
  price: number;
}

interface DeviceSpecs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

interface IDeviceDetails {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: DeviceSpecs;
  colorOptions: DeviceColorOption[];
  storageOptions: DeviceStorageOption[];
  similarProducts: IDevice[];
}

export type { IDeviceDetails, DeviceSpecs, DeviceColorOption, DeviceStorageOption };
