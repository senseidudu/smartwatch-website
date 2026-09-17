export type Pillar = {
  name: string
  short: string
  headline: string
  body: string
  points: string[]
  image: string
}

export const pillars: Pillar[] = [
  {
    name: 'Compliance',
    short: 'Automated compliance management and driver scoring.',
    headline: 'Smartwatch gives you the power to manage compliance better.',
    body: 'Optimize drive time, minimize violations, and improve driver scores with automated compliance management. Resolve unidentified trips faster with automated trip and driver matching.',
    points: [
      'Real-time violation email alerts',
      'Automated trip and driver matching',
      'Driver app for inspections and reports',
    ],
    image: 'compliance dashboard screenshot',
  },
  {
    name: 'Driver Safety Dash Cameras',
    short: 'AI video, people counting, instant alerts.',
    headline: 'Protect your fleet and profits with an all-in-one safety solution.',
    body: 'Video surveillance, passenger information, AI analytics and people counting, dispatch system and terminal with ticket system.',
    points: [
      '70% fewer accidents with instant alerts on violations',
      'Self-coaching tools and custom safety definitions',
      'Sound buzzer warns drivers before exceeding speed limits',
    ],
    image: 'dash camera + in-cab footage',
  },
  {
    name: 'Tracking & Telematics',
    short: 'Real-time location, utilization and health.',
    headline:
      'Real-time visibility into the location, utilization, and health of vehicles, equipment, and assets.',
    body: 'Manage your vehicles, assets, drivers, and equipment with Smartwatch’s integrated fleet management system.',
    points: [
      'Full fleet visibility on one map',
      'Geofence alerts and accurate GPS tracking to prevent theft',
      'Constant maintenance and performance reporting',
    ],
    image: 'live map with vehicle pins',
  },
  {
    name: 'Maintenance',
    short: 'Preventive maintenance with electronic inspections.',
    headline: 'Maximize productivity and cut costs through preventive fleet maintenance.',
    body: 'Automate service records and stay on top of vehicle and asset health with electronic inspection records.',
    points: [
      'Automated fleet maintenance schedules',
      'Real-time fault alerts',
      'Thorough inspections increase driver accountability',
    ],
    image: 'maintenance schedule view',
  },
  {
    name: 'Electronic Cargo Tracking',
    short: 'Heavy-duty e-lock for secure cargo transit.',
    headline:
      'Heavy-duty electromagnetic lock enabling seamless automation of cargo, security, and carrier operations.',
    body: 'Container access restricted to the correct location, authorized key, and set time.',
    points: [
      'Increased cargo security and accountability',
      'Fewer errors, better resource allocation',
      'Less paperwork, safeguarded information',
    ],
    image: 'e-lock on shipping container',
  },
  {
    name: 'Sustainability',
    short: 'Fuel management that cuts cost and emissions.',
    headline: 'Save on fuel and reduce your environmental impact with fleet fuel management.',
    body: 'Get detailed fuel performance data and pinpoint specific areas for improvement at driver and vehicle level.',
    points: [
      'Benchmark against similar fleets',
      'Identify top and bottom performers',
      'Reduce fuel waste and environmental impact',
    ],
    image: 'fuel performance chart',
  },
  {
    name: 'Insurance',
    short: 'Theft prevention, recovery and safer driving.',
    headline: 'Enhance operational efficiency and prevent fleet theft.',
    body: 'Maintenance tools, driver controls, and GPS tracking that lower both insurance and fuel costs for fleet owners.',
    points: [
      'Recovery of stolen vehicles',
      'Driver behavior coaching',
      'Most efficient routes reduce wear and tear',
    ],
    image: 'vehicle recovery map',
  },
]
