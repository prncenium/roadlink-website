/**
 * Organisation-wide content. Edit here to rebrand the portal.
 */
export const site = {
  shortName: 'RLCS',
  name: 'Road Link Consultancy Services',
  tagline: 'Road safety, design and inspection consultancy',
  department: 'Road Safety, Design & Inspection Consultants',

  contact: {
    phone: '+91 81789 47588',
    phoneHref: 'tel:+918178947588',
    phoneAlt: '+91 97295 27178',
    phoneAltHref: 'tel:+919729527178',
    helpline: 'Toll-free, 09:00–18:00 IST (Mon–Fri)',
    email: 'info@roadlinkconsultancy.in',
    emailHref: 'mailto:info@roadlinkconsultancy.in',
    emailAlt: 'roadlinkconsultancyservices@gmail.com',
    emailAltHref: 'mailto:roadlinkconsultancyservices@gmail.com',
    hrEmail: 'roadlinkc@gmail.com',
    hrEmailHref: 'mailto:roadlinkc@gmail.com',
    address: {
      line1: 'Office of Primary School, Sector-37',
      line2: 'One City (On Jind – Gohana Approach Road)',
      city: 'Rohtak',
      postcode: '124001',
      country: 'Haryana, India',
    },
    hours: [
      { day: 'Monday – Friday', time: '09:00 – 18:00' },
      { day: 'Saturday', time: '10:00 – 14:00' },
      { day: 'Sunday & public holidays', time: 'Closed' },
    ],
  },

  /* Query string used by the Google Maps embeds. */
  mapQuery: 'Sector 37, One City, Rohtak, Haryana 124001, India',

  /* Correspondence and registered addresses. `current` is the working office;
     the other two are retained for record and tender documentation. */
  offices: [
    {
      id: 'current',
      label: 'Current correspondence address',
      status: 'current',
      organisation: 'Road Link Consultancy Services',
      lines: [
        'Office of Primary School, Sector-37',
        'One City, Rohtak-124001',
        'On Jind – Gohana Approach Road',
        'Haryana',
      ],
    },
    {
      id: 'previous',
      label: 'Previous correspondence address',
      status: 'previous',
      organisation: null,
      lines: ['D12, Suncity Market', 'Sector-36, Rohtak-124001', 'Haryana'],
    },
    {
      id: 'registered',
      label: 'Registered address',
      status: 'registered',
      organisation: null,
      lines: ['H. No. 878, 13 Main Bazaar', 'Kalanor, Rohtak', 'Haryana'],
    },
  ],

  /* Small official chips shown in the header / hero / footer */
  credentials: [
    { label: 'Govt. Approved', detail: 'Registration No. MRTPW/INS/2019/0442' },
    { label: 'ISO 9001:2015', detail: 'Quality Management Systems' },
    { label: 'ISO/IEC 17025', detail: 'Testing & Calibration Laboratories' },
    { label: 'NABL Accredited', detail: 'Materials Testing Laboratory' },
  ],
};

export default site;
