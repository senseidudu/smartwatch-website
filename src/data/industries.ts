export const industriesA = [
  'Oil and Gas',
  'Trucking & Logistics',
  'Bus & Public Transport',
  'Fleet Management for Government',
  'Field Service and Marketplace',
  'Food, Manufacturing and Processing',
  'Mobile Resource Management',
]

export const industriesB = [
  'Satellite Tracking for NGOs',
  'Commercial Vehicle Tracking',
  'EV Fleet Management',
  'Eco-Drive Solution',
  'Site Management',
  'Communications Technology',
  'Electronic Cargo Tracking',
]

const industryBodies: Record<string, string> = {
  'Oil and Gas':
    'Intelligent IVMS that connects the vehicle, protects the operator and gives fleet managers actionable insight.',
  'Trucking & Logistics': 'Total visibility from safety and tracking to compliance and fuel costs.',
  'Bus & Public Transport':
    'Passenger information, people counting, dispatch and ticketing on one platform.',
  'Fleet Management for Government':
    'Accountability, utilization and cost control for public fleets.',
  'Field Service and Marketplace': 'Dispatch, tracking and proof of service for mobile teams.',
  'Food, Manufacturing and Processing': 'Temperature-sensitive deliveries tracked door to door.',
  'Mobile Resource Management': 'Vehicles, assets, drivers and equipment managed together.',
  'Satellite Tracking for NGOs': 'Stay connected in remote areas beyond cellular coverage.',
  'Commercial Vehicle Tracking': 'Light commercial fleets tracked and protected at low cost.',
  'EV Fleet Management': 'Charge status, range and utilization for electric fleets.',
  'Eco-Drive Solution': 'Coach driver behavior to cut fuel use and emissions.',
  'Site Management': 'Monitor equipment and access on construction and industrial sites.',
}

export type Industry = { name: string; body: string; image: string }

/** The twelve industry cards on the Solutions page, in design order. */
export const industries: Industry[] = industriesA.concat(industriesB.slice(0, 5)).map((name) => ({
  name,
  body: industryBodies[name] ?? '',
  image: `${name.toLowerCase()} photo`,
}))

export const homeIndustries = [
  'Oil and Gas',
  'Trucking & Logistics',
  'Bus & Public Transport',
  'Government',
  'Field Service',
  'Food & Manufacturing',
  'NGOs',
  'EV Fleets',
]
