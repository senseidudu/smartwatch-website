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
} satisfies Record<string, Img>

export type ImgKey = keyof typeof img

export const video = {
  corporate: {
    src: '/video/Smartvideo.mp4',
    poster: '/images/laptop.webp',
    title: 'Smartwatch Solutions corporate video',
  },
}
