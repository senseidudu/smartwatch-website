import type { Img } from './types'

/**
 * The client's own imagery (from smartwatchsolutions.com), converted to WebP in public/images.
 * Dimensions are the real file dimensions so the browser reserves space before load.
 */
export const img = {
  products: {
    src: '/images/products.webp',
    alt: 'Wall of Smartwatch GPS tracking and telematics units',
    width: 876,
    height: 459,
  },
  device: {
    src: '/images/device-1.webp',
    alt: 'Smartwatch telematics tracking device',
    width: 700,
    height: 440,
  },
  laptop: {
    src: '/images/laptop.webp',
    alt: 'Smartwatch FM fleet dashboard on a laptop',
    width: 700,
    height: 440,
  },
  mrm: {
    src: '/images/mrm-b1-1024x498.webp',
    alt: 'Smartwatch FM on phone, tablet and desktop showing a live fleet map',
    width: 1024,
    height: 498,
  },
  dashcams: {
    src: '/images/dash-cams.webp',
    alt: 'In-cab dash camera view through a truck windscreen',
    width: 700,
    height: 440,
  },
  ngo: {
    src: '/images/ngo.webp',
    alt: 'Fleet of white NGO Land Cruisers',
    width: 700,
    height: 440,
  },
  vans: {
    src: '/images/bluetruct.webp',
    alt: 'Row of white light commercial delivery vans',
    width: 1200,
    height: 1056,
  },
  charging: {
    src: '/images/charging.webp',
    alt: 'Electric vehicle charging bay',
    width: 1200,
    height: 1056,
  },
  cargo: {
    src: '/images/cargo-Large.webp',
    alt: 'Articulated truck carrying a container on an open road',
    width: 700,
    height: 440,
  },
  food: {
    src: '/images/newfood.webp',
    alt: 'Refrigerated truck being loaded with pallets',
    width: 700,
    height: 440,
  },
  kpmg: {
    src: '/images/KPMG-AWARD-01.webp',
    alt: 'KPMG Top 100 Mid-Sized Companies award badge',
    width: 835,
    height: 665,
  },
  routeMap: {
    src: '/images/route-map.webp',
    alt: 'Fleet routes and delivery stops plotted across a map',
    width: 735,
    height: 367,
  },
  fleetDashboard: {
    src: '/images/fleet-dashboard.webp',
    alt: 'Fleet manager reviewing vehicle analytics on a tablet in front of a truck fleet',
    width: 736,
    height: 407,
  },
  tmsDashboard: {
    src: '/images/tms-dashboard.webp',
    alt: 'Transport management dashboard on a monitor in a warehouse',
    width: 734,
    height: 418,
  },
  inCabDevice: {
    src: '/images/in-cab-device.webp',
    alt: 'Driver using an in-cab navigation and telematics device',
    width: 1200,
    height: 800,
  },
  fleetManager: {
    src: '/images/fleet-manager.webp',
    alt: 'Fleet supervisor with an inspection clipboard in front of parked trucks',
    width: 735,
    height: 490,
  },
  truckRefrigerated: {
    src: '/images/truck-refrigerated.webp',
    alt: 'Refrigerated box truck for temperature-controlled cargo',
    width: 628,
    height: 397,
    fit: 'contain',
  },
  truckTipper: {
    src: '/images/truck-tipper.webp',
    alt: 'Light commercial cargo truck',
    width: 665,
    height: 375,
    fit: 'contain',
  },
  deliveryTruck3d: {
    src: '/images/delivery-truck-3d.webp',
    alt: 'Illustration of a delivery truck loaded with parcels',
    width: 500,
    height: 500,
    fit: 'contain',
  },
  fieldSupervisor: {
    src: '/images/field-supervisor.webp',
    alt: 'Supervisor in a hard hat checking a tablet beside trucks on a highway',
    width: 458,
    height: 670,
  },
  yardMonitoring: {
    src: '/images/yard-monitoring.webp',
    alt: 'Manager reviewing a fleet yard from a tablet at dusk',
    width: 654,
    height: 468,
  },
  highwayAerial: {
    src: '/images/highway-aerial.webp',
    alt: 'Container truck tracked along a highway from above',
    width: 736,
    height: 552,
  },
  highwayPair: {
    src: '/images/highway-pair.webp',
    alt: 'Two haulage trucks travelling a highway at sunset',
    width: 600,
    height: 400,
  },
  freightHaul: {
    src: '/images/freight-haul.webp',
    alt: 'Container truck on a motorway seen from above',
    width: 1200,
    height: 800,
  },
  fleetSunset: {
    src: '/images/fleet-sunset.webp',
    alt: 'Row of haulage trucks parked at sunset',
    width: 736,
    height: 414,
  },
  portDusk: {
    src: '/images/port-dusk.webp',
    alt: 'Container trucks leaving a port terminal at dusk',
    width: 735,
    height: 420,
  },
  portContainerTruck: {
    src: '/images/port-container-truck.webp',
    alt: 'Container truck at a port beneath loading cranes',
    width: 540,
    height: 360,
  },
  fuelNozzle: {
    src: '/images/fuel-nozzle.webp',
    alt: 'Fuel nozzle with a drop of diesel',
    width: 300,
    height: 300,
    fit: 'contain',
  },
  gpsHandheld: {
    src: '/images/gps-handheld.webp',
    alt: 'Handheld GPS navigation unit showing a street map',
    width: 736,
    height: 736,
    fit: 'contain',
  },
  laptopTracking: {
    src: '/images/laptop-tracking.webp',
    alt: 'Laptop showing a tracked vehicle on a live map',
    width: 500,
    height: 500,
    fit: 'contain',
  },
  routePlanning: {
    src: '/images/route-planning.webp',
    alt: 'Model truck and parcels laid out on a route map',
    width: 667,
    height: 1000,
  },
} satisfies Record<string, Img>

export type ImgKey = keyof typeof img

export const video = {
  corporate: {
    src: '/video/Smartvideo.mp4',
    poster: '/images/laptop.webp',
    title: 'Smartwatch Solutions corporate video',
  },
}
