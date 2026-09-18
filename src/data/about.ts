import { img } from './images'
import { site } from './site'
import type { DetailPage } from './types'

/**
 * About page. Copy transcribed from the live smartwatchsolutions.com/about/ page:
 * hero, business strategy, vision and mission, heritage, the three tabs and the KPMG award.
 */
export const about: DetailPage = {
  slug: 'about',
  kind: 'page',
  name: 'About us',
  short: "Pioneering Africa's telematics industry since 2011.",
  hero: {
    eyebrow: 'About us',
    title: 'A decade of connecting fleets across industries.',
    intro:
      "With strategic partners across six countries in Africa and Europe, Smartwatch Solutions is pioneering Africa's telematics industry, achieving the highest quality standards for fleet management.",
    tone: 'dark',
    media: img.ngo,
    ctas: [
      { label: 'Learn about our platforms', to: '/platforms' },
      { label: 'Contact us', to: '/contact', variant: 'outline-light' },
    ],
  },
  sections: [
    {
      kind: 'stats',
      id: 'stats',
      items: [
        { value: 20, suffix: 'K+', label: 'Active devices' },
        { value: 10, suffix: '+', label: 'Years of excellence' },
        { value: 6, label: 'Countries across Africa and Europe' },
      ],
    },
    {
      kind: 'cards',
      id: 'vision',
      eyebrow: 'Our business strategy',
      title: 'Drawing on our deep knowledge of telematics and information technology.',
      intro:
        'Providing cost-effective and customised mobile resource management solutions that are designed to meet and improve business processes, with strong customer support.',
      columns: 2,
      items: [
        {
          title: 'Our vision',
          body: 'To be the leading telematics Software-as-a-Service (SaaS) company in Africa and the regional mobile resource management solutions provider of choice.',
        },
        {
          title: 'Our mission',
          body: "To enhance the productivity of mobile assets, human resources and cost savings in our customers' operations by rolling out innovative, tailor-made, end-to-end mobile resource management and vehicle security products through a wide range of strategic alliances, partnerships and delivery channels, supported by state-of-the-art technology.",
        },
      ],
    },
    {
      kind: 'split',
      id: 'heritage',
      eyebrow: 'Heritage',
      title: "East Africa's leading provider of fleet and mobile asset management solutions.",
      body: [
        'Smartwatch Solutions, established in Uganda and Kenya in 2011, is a leading provider of mobile asset management and fleet management software and services in the East and Horn of Africa region, including Ethiopia and Djibouti. Our expertise in delivering successful Software-as-a-Service (SaaS) fleet management solutions and end-to-end IoT smart solutions has positioned us as a reputable player in the industry.',
        'We offer a comprehensive package of mobile asset and fleet management solutions, catering to various sectors including motorised fleets (commercial vehicles), remote generators, and smart metering for energy and water. Our team combines industry expertise in information technology and mobile resource management with extensive hands-on experience in their respective fields.',
        'Serving sectors such as transport, energy and utilities, we support commercial fleets, remote generators and smart metering, with a strong client base of oil and gas firms, telecoms, NGOs and government institutions. Our mobile and web-based platforms improve asset utilisation, driver performance and overall operational efficiency.',
        'Our esteemed client portfolio boasts renowned organisations, prominent telecommunication companies, NGOs and government entities across the East and Horn of Africa region, underscoring our proven track record of delivering exceptional value and service. By consistently exceeding industry benchmarks, we have forged a reputation for unparalleled customer satisfaction and success.',
        'Our solutions include mobile and web application platforms that collect data from on-board computers to analyse vehicle usage and driver behaviour. We provide individual and group feedback based on comprehensive reports, aiming to drive permanent behavioural change and improve driver performance. Our customisable solution integrates with existing fleet systems, and our efficient business practices have garnered success across the transport industry.',
        'With a strong commitment to excellence, Smartwatch Solutions continues to deliver cutting-edge fleet management solutions, enabling organisations to optimise their mobile assets and enhance operational efficiency.',
      ],
      points: ['Schlumberger', 'Baker Hughes', 'Total Energies', 'British Gas Group', 'CNOOC', 'MTN'],
      media: img.mrm,
      cta: { label: 'View our products and services', to: '/products' },
    },
    {
      kind: 'tabs',
      id: 'why-us',
      eyebrow: 'Why Smartwatch',
      title: 'Our trade, our promise and our support.',
      tabs: [
        {
          label: 'Our trade',
          title: 'Information is a vital tool that drives strategic thinking.',
          body: [
            'Our trade is guided by the belief that information is a vital tool that drives strategic thinking, which spurs strategic decisions that result in maximum cost savings and growth. Ours is to offer the link between strategic planning, design and implementation of policies, with a touch of technical knowledge and a holistic approach with our clients and partners. The target is to provide links between research, expert-led decisions and practical policy implications through an advisory and practical approach.',
            "At Smartwatch Solutions Ltd, we foster long-term relationships with our partners and stakeholders through our core competencies in consultative services and the individual professional expertise of our staff, developed over time. We design programmes to mitigate our clients' costs, develop value-added solutions customised to fit client-specific needs, promote personal attention and efficiency, and create an environment that promotes teamwork, job satisfaction, personal growth and value for all our stakeholders.",
            'We are committed to the provision of affordable, quality products offered with excellent service delivery, and strive to develop worldwide partnerships that leave a lasting impression in mobile resource management and information technology in the emerging economies.',
          ],
        },
        {
          label: 'Why us',
          title: 'Why clients choose Smartwatch.',
          body: "Smartwatch Solutions is East Africa's leading provider of fleet and mobile asset management solutions. We develop and implement connected fleet and mobile asset management solutions for customers across the East and Horn of Africa.",
          points: [
            'Proven technology and functionality',
            'A long-term partner for business management solutions',
            'Continuous product development',
            'Affordable and user-friendly solutions',
            'Professional project management',
            'A fully integrated Smartwatch business solution to increase operational efficiency',
            'Customised solutions based on client requirements',
          ],
        },
        {
          label: 'Customer support',
          title: 'World-class customer support, throughout the day.',
          body: [
            'Our policy is to provide world-class customer support, helping our clients to continually meet their service goals of reliability and quality. Whether faced with a routine inquiry or an emergency, we make it our duty to provide prompt, relevant expertise by phone or email, via remote log-in or in person. With service that runs throughout the day, we provide further assurance that you will get the best out of Smartwatch Solutions Ltd.',
            "Smartwatch Solutions' clear, efficient processes for service inquiries and case management ensure rapid diagnosis and resolution of any problems.",
            'This knowledge is the basis for providing cost-effective and customised mobile resource management solutions that are designed to meet and improve business processes. Smartwatch Solutions Ltd is committed to continuously improving customer support, building a strong foundation for long-term business relationships.',
          ],
          points: [`Call ${site.phone}`, `Email ${site.email}`],
        },
      ],
    },
    {
      kind: 'split',
      id: 'awards',
      eyebrow: 'Awards',
      title: 'Recognised by KPMG',
      body: 'Smartwatch Solutions has been recognised among the KPMG Top 100 Mid-Sized Companies. It is an acknowledgement of the quality standards we hold ourselves to in fleet management, and of the trust our clients and partners across Africa and Europe place in us.',
      media: img.kpmg,
      reverse: true,
    },
  ],
  cta: {
    title: 'Total peace of mind, since 2011.',
    body: 'Affordable, user-friendly fleet and asset management solutions that enhance efficiency and support long-term business growth.',
    ctas: [
      { label: 'Get a demo', to: '/contact' },
      { label: 'View our products', to: '/products', variant: 'outline-light' },
    ],
  },
  meta: {
    title: 'About us',
    description:
      "With strategic partners across six countries in Africa and Europe, Smartwatch Solutions is pioneering Africa's telematics industry.",
  },
}
