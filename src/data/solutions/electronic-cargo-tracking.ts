import { img } from '../images'
import { routes } from '../site'
import type { DetailPage } from '../types'

export const page: DetailPage = {
  slug: 'electronic-cargo-tracking',
  kind: 'solution',
  name: 'Electronic Cargo Tracking',
  short: 'Heavy-duty e-lock for secure cargo transit.',
  icon: 'cargo',
  hero: {
    eyebrow: 'Solutions · Electronic Cargo Tracking',
    title: 'Giving cargo transporters and government authorities visibility.',
    intro:
      'A heavy-duty electromagnetic lock integrated with comprehensive commercial vehicle operation services to enable seamless automation of cargo, security, carrier and support operations.',
    tone: 'photo',
    media: img.cargoConvoyTracking,
  },
  sections: [
    {
      kind: 'cards',
      id: 'benefits',
      title: 'Features & benefits',
      columns: 3,
      items: [
        {
          title: 'Increased cargo security',
          points: [
            'Cargo is fully secured during transit',
            'Full accountability',
            'The container door can only open at the right destination, with the right electronic key and within the right period of time',
          ],
        },
        {
          title: 'Improved service quality',
          points: [
            'Improve reliability',
            'Increase operational flexibility',
            'Improve user and customer confidence',
          ],
        },
        {
          title: 'Increased operational efficiency & productivity',
          points: [
            'Reduce errors, wasted effort, and re-work',
            'Optimize assignment of equipment and people',
            'Optimize across functional areas',
            'Reduce slack capacity and inventory',
          ],
        },
      ],
    },
    {
      kind: 'split',
      id: 'features',
      title: 'Smartwatch empowers management through technology',
      body: [
        'Smartwatch ECTS gives cargo transporters and government authorities visibility by providing the real-time location and status of the cargo, and expedites the clearance of goods at border posts, warehouses and along trading corridors.',
        'Cargo transporters and revenue authorities use ECTS to monitor the movement of goods in transit from neighbouring states while en route to other neighbouring states, and those movements from border entry points to inland bonded warehouses. The ECTS system facilitates quick inspection and clearance of cargo by providing real-time data on the movement and location of the cargo.',
      ],
      points: [
        'Real-time location and status of cargo',
        'Faster clearance at border posts, warehouses and along trading corridors',
        'Goods monitored from border entry points to inland bonded warehouses',
      ],
      mediaLabel: 'live map of cargo in transit along a trading corridor',
      media: img.portContainerYard,
    },
    {
      kind: 'cards',
      id: 'use-cases',
      title: 'Use cases',
      columns: 3,
      items: [
        {
          title: 'Container transportation',
          body: 'ECTS greatly improves security and reduces the expense and transit times for international and domestic shipments.',
        },
        {
          title: 'Fuel tanker compartment monitoring',
          body: 'The truck tanker monitoring system provides precise fuel level and volume measurement in each compartment of the cistern.',
        },
        {
          title: 'Logistics vehicle cargo management',
          body: 'Keep cargo safe and reduce theft by staying alert, knowing common trends, and keeping cargo locked up securely.',
        },
        {
          title: 'High-value goods tracking',
          body: 'Closely monitor your high-value transports and securely share tracking data with your clients through ECTS. Increase customer satisfaction and optimise your transport operations.',
        },
        {
          title: 'Law enforcement goods monitoring',
          body: 'Track where items are located from your PC, whether in equipment rooms, weapons lockers, vehicles or repair shops, or permanently assigned to officers.',
        },
      ],
    },
    {
      kind: 'split',
      title: 'Actively and significantly safeguard cargo in transit',
      body: [
        'The e-Lock is an intelligent tracking and positioning lock for securing logistics and freight assets. It consists of a primary e-Lock and ancillary secondary e-Locks.',
        'The secondary e-Locks are controlled via the primary e-Lock over Bluetooth communication: if the primary e-Lock is unlocked, the secondary e-Locks will unlock too. The primary e-Lock can accommodate up to seven (7) secondary e-Locks.',
      ],
      points: [
        'Primary e-Lock plus ancillary secondary e-Locks',
        'Secondary e-Locks controlled from the primary over Bluetooth',
        'Up to seven secondary e-Locks per primary e-Lock',
      ],
      reverse: true,
      mediaLabel: 'e-lock fitted to a cargo trailer door',
      media: img.cargoElockTrailer,
    },
    {
      kind: 'related',
      id: 'related',
      slugs: [
        routes.solution('trucking-and-logistics'),
        routes.solution('government'),
        routes.product('tracking-and-telematics'),
        routes.hardware,
      ],
    },
  ],
  meta: {
    title: 'Electronic Cargo Tracking',
    description:
      'A heavy-duty electromagnetic lock integrated with commercial vehicle operation services to automate cargo, security, carrier and support operations.',
  },
}
