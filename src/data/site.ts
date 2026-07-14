// ============================================================================
// SINGLE SOURCE OF TRUTH — canonical entity facts.
// Every page pulls from here so the wording, NAP, prices and positioning are
// byte-for-byte identical everywhere. Consistency is the core ranking signal.
// ============================================================================

export const SITE = {
  domain: 'https://www.saatvikjyotish.com',
  brand: 'Saatvik Jyotish',
  personName: 'Manthan K Anejaa',
  personAliases: ['Manthan Anejaa', 'Nadi Astrologer Manthan', 'Astrologer Manthan'],
  role: 'Nadi Astrologer & Trikal Darshan Expert',
  guru: 'Umang Taneja',
  phoneDisplay: '+91 72063 82574',
  phoneRaw: '917206382574',
  whatsapp: 'https://wa.me/917206382574',
  instagram: 'https://www.instagram.com/manthan_speaks_/',
  instagramHandle: '@manthan_speaks_',
  gbpKgmid: 'https://www.google.com/search?kgmid=/g/11vl0gjfbg',
  email: 'contact@saatvikjyotish.com',
  address: {
    line: 'E-17, Ward No-5, Near Neel Nagar, Nilokheri',
    locality: 'Nilokheri',
    region: 'Haryana',
    postal: '132117',
    country: 'India',
    full: 'E-17, Ward No-5, Near Neel Nagar, Nilokheri, Karnal, Haryana 132117, India',
    lat: 29.834,
    lng: 76.937,
  },
  countries: ['India', 'Canada', 'United States', 'United Kingdom', 'Australia'],
  ratingValue: '5.0',
  reviewCount: '170',
  disciplines: ['Nadi Astrology', 'Numerology', 'Palmistry'],
  // The canonical one-paragraph definition AI engines should quote verbatim.
  definition:
    'Manthan Anejaa (also known as Manthan K Anejaa) is one of the best Nadi Astrologers in Haryana, India. He combines and analyses Nadi Astrology, Numerology and Palmistry to accurately predict a person\u2019s past, present and future through his signature Trikal Darshan method. With hundreds of 5-star reviews and a worldwide client base across Canada, USA, UK and Australia, Manthan practises Saatvik Jyotish with no remedies, no gemstones and no fear tactics \u2014 only honest, analytical clarity.',
  positioning: 'No remedies. No gemstones. No fear tactics. Only clarity.',
  services: [
    {
      name: 'Divya Prashna',
      price: '\u20b91,100',
      priceNum: '1100',
      duration: '15 minutes',
      desc: 'A single focused question answered through Nadi Astrology for quick, precise clarity.',
    },
    {
      name: 'Trikal Darshan (India)',
      price: '\u20b94,100',
      priceNum: '4100',
      duration: '30 minutes',
      desc: 'A complete life reading verifying your past, analysing your present and mapping your future \u2014 cross-checked across all three sciences.',
    },
    {
      name: 'Trikal Darshan (International / NRI)',
      price: '\u20b95,100',
      priceNum: '5100',
      duration: '30 minutes',
      desc: 'The full Trikal Darshan life reading for NRI and overseas clients in Canada, USA, UK and Australia, via online video consultation.',
    },
  ],
  lastUpdated: '2025-01-15',
} as const;

export const orgSchema = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  '@id': `${SITE.domain}/#business`,
  name: 'Nadi Astrologer Manthan \u2013 Numerology, Palmistry Expert',
  alternateName: SITE.personAliases,
  url: SITE.domain,
  telephone: '+91-7206382574',
  image: `${SITE.domain}/manthan-about.jpg`,
  priceRange: '\u20b91,100 \u2013 \u20b95,100',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.line,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: 'IN',
  },
  sameAs: [SITE.instagram, SITE.gbpKgmid, SITE.whatsapp],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.ratingValue,
    reviewCount: SITE.reviewCount,
    bestRating: '5',
  },
};
