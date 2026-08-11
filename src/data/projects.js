/**
 * PROJECT REGISTER
 *
 * Single source of truth for the /projects route. Add or edit entries here —
 * filters, counts, categories and pagination all derive from this array.
 *
 * Fields
 *  - id        : stable slug, used as the React key
 *  - ref       : display reference shown on the card
 *  - status    : 'completed' | 'ongoing'
 *  - category  : one of CATEGORIES[].id
 *  - name      : short human label for scanning (card headline)
 *  - title     : the full official project title (expandable on the card)
 *  - states    : array of Indian state names, drives the state filter
 *  - highways  : array of NH/SH designations, drives the corridor filter
 *  - mode      : 'EPC' | 'HAM' | 'BOT' | 'DBFOT' | 'PPP' | null
 *  - lengthKm  : number | null
 *  - client    : string | null
 *  - programme : e.g. 'Bharatmala Pariyojana' | null
 *
 * NOTE ON SOURCE DATA: four entries in the supplied Completed list were exact
 * duplicates (NH-354E Abohar, NH-254 Mudaki, NH-325 Balotra, NH-154 Pathankot)
 * and have been merged — 24 supplied, 20 unique.
 */

/** The five service lines. Order here is the order shown in the filter bar. */
export const CATEGORIES = [
  { id: 'detail-design', label: 'Detail Design Services', short: 'Detail Design' },
  { id: 'pre-bid', label: 'Pre-Bid Services', short: 'Pre-Bid' },
  { id: 'proof-consulting', label: 'Proof Consulting Services', short: 'Proof Consulting' },
  { id: 'dpr', label: 'Detailed Project Report', short: 'DPR' },
  { id: 'safety-consulting', label: 'Safety Consulting Services', short: 'Safety Consulting' },
];

export const STATUSES = [
  { id: 'completed', label: 'Completed' },
  { id: 'ongoing', label: 'Ongoing' },
];

const SC = 'safety-consulting';

/* ------------------------------------------------------------------ */
/* COMPLETED                                                           */
/* ------------------------------------------------------------------ */

const completed = [
  {
    id: 'c-sh44-sh41-jamner-motala',
    ref: 'SC/C/01',
    name: 'Jamner–Motala SH-44 & Erandol–Neri Digra SH-41',
    title:
      'Construction of Jamner Motala Pimpalgaon Raja Khamgaon Road SH-44 Km 72/200 To Km 117/00 (Jamner to Motala) & Dhrangaon Erandol Mhsawad Neri Digra Rd. SH-41 Km. 24/700 to 65/700 (Erandol to Neri Digra) Total (85.80 Km)',
    states: ['Maharashtra'],
    highways: ['SH-44', 'SH-41'],
    mode: null,
    lengthKm: 85.8,
  },
  {
    id: 'c-nh354e-abohar-dabwali',
    ref: 'SC/C/02',
    name: 'Abohar–Sito Gunno–Dabwali, NH-354E',
    title:
      'Rehabilitation and up-gradation to 2 lane with paved shoulder of Abohar–Sito Gunno–Dabwali road from Km. 0.00 to Km. 50.885 of NH-354E including construction of one high level major steel bridge on EPC mode in the State of Punjab',
    states: ['Punjab'],
    highways: ['NH-354E'],
    mode: 'EPC',
    lengthKm: 50.885,
  },
  {
    id: 'c-nh254-mudaki-jawahr',
    ref: 'SC/C/03',
    name: 'Mudaki–Jawahr Singh wala, NH-254 (Pkg-1)',
    title:
      'Rehabilitation and Up-gradation of 2 Lane with Paved Shoulders of Mudaki-Jawahr Singh wala Section of NH-254 from design Km. 0.00 to 38.00 in the State of Punjab on EPC mode (Package-1)',
    states: ['Punjab'],
    highways: ['NH-254'],
    mode: 'EPC',
    lengthKm: 38,
  },
  {
    id: 'c-sh58-sh31a-jodhpur-sojat',
    ref: 'SC/C/04',
    name: 'Jodhpur–Sojat SH-58 & Bhinmal–Jeewana SH-31A',
    title:
      'Development and Maintenance of Jodhpur - Sojat Section of SH-58 (Length 75.91 Km.) and Bhinmal - Patheri - Posana - Jeewana Section of SH-31A (Length 51.58 Km.) Total Length 127.50 Km. in the State of Rajasthan on Engineering, Procurement & Construction (EPC) Mode.',
    states: ['Rajasthan'],
    highways: ['SH-58', 'SH-31A'],
    mode: 'EPC',
    lengthKm: 127.5,
  },
  {
    id: 'c-am1-package-roads',
    ref: 'SC/C/05',
    name: 'AM-1A to AM-1E package roads',
    title:
      'Construction of 2 Lanning with Paved shoulder to (Package No. AM-1A, AM-1B, AM-1C, AM-1D, AM-1E roads on Hybrid Annuity Mode',
    states: [],
    highways: [],
    mode: 'HAM',
    lengthKm: null,
  },
  {
    id: 'c-mrip-sh44-sh41',
    ref: 'SC/C/06',
    name: 'Vitva–Khamgaon SH-44 & Savkhedafata–Neri SH-41 (MRIP)',
    title:
      'Improvement of State Border Vitva Bhusawal Jamner Motala Pimpalgaon Raja Kahmgaon Road SH-44 Km 72/200 to 117/00 (Jamner to Motala) (Length 38.27 Km) and Improvement of Savkhedafata Dharangaon Erandol Mhsawad Neri Jamner (Jamner Division) Rd. SH-41 Km. 24/700 to 65/700 (Erandol to Neri Digar) Length 41.00 Km. and Project Cost Rs. 234.80 Cr. In the State of Maharashtra under MRIP on Hybrid Annuity Mode.',
    states: ['Maharashtra'],
    highways: ['SH-44', 'SH-41'],
    mode: 'HAM',
    lengthKm: 79.27,
    programme: 'MRIP',
  },
  {
    id: 'c-sh66-siwana-balesar',
    ref: 'SC/C/07',
    name: 'Siwana–Samdari–Balesar, SH-66',
    title:
      'Development and Maintenance of Siwana - Samdari - Balesar Road SH-66 Length 90.648 Km in the State of Rajasthan on Engineering, Procurement & Construction (EPC) Mode (RSHIP Package No.: RSHIP-ADB-TRANCHE-2/EPC/04)',
    states: ['Rajasthan'],
    highways: ['SH-66'],
    mode: 'EPC',
    lengthKm: 90.648,
    programme: 'RSHIP (ADB Tranche-2)',
  },
  {
    id: 'c-nh444a-ambala-saha',
    ref: 'SC/C/08',
    name: 'Ambala–Saha, NH-444(A) (Pkg-1)',
    title:
      'Construction of 4-lanning of Ambala to Saha Section from Km. 0.000 to 14.840 of NH-444(A) in the State of Haryana (Package-1)',
    states: ['Haryana'],
    highways: ['NH-444A'],
    mode: null,
    lengthKm: 14.84,
  },
  {
    id: 'c-nh68-tanot-jaisalmer',
    ref: 'SC/C/09',
    name: 'Tanot–Ramgarh–Bhadasar–Jaisalmer, NH-68',
    title:
      'Construction / Up-gradation of Four / Two lane with Paved Shoulder of NH 68 from Tanot-Ramgarh-Bhadasar-Jaisalmer (Design Ch. 0.000 to 125.573) and NH from Bhadasar (Mokal)-Sarkaritala up to Pakistan Border (Design Ch. 0.000 to 67.950) under Phase-I of Bharatmala Pariyojana (total length 193.523 km) on EPC mode in the State of Rajasthan',
    states: ['Rajasthan'],
    highways: ['NH-68'],
    mode: 'EPC',
    lengthKm: 193.523,
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'c-nh154-pathankot-nurpur',
    ref: 'SC/C/10',
    name: 'Pathankot–Nurpur, NH-154',
    title:
      'Four laning from existing 10.0 m carriageway width from Km 5.550 to Km 11.975 of NH-154 (Old NH-20) Pathankot-Nurpur section in the state of Punjab on EPC mode',
    states: ['Punjab'],
    highways: ['NH-154'],
    mode: 'EPC',
    lengthKm: 6.425,
  },
  {
    id: 'c-nh325-balotra-sanderao',
    ref: 'SC/C/11',
    name: 'Balotra–Sanderao via Jalore, NH-325 (Pkg-1)',
    title:
      'Up-gradation to Two Lane with Paved Shoulder For Section From Km 16.20 to Km. 58.00 (Excluding Km. 21+700 to Km. 24+350 and 42+700 to 50+600) Balotra to Sanderao Via Jalore Section of NH-325 in the State of Rajasthan on EPC Mode (Package-1).',
    states: ['Rajasthan'],
    highways: ['NH-325'],
    mode: 'EPC',
    lengthKm: 41.8,
  },
  {
    id: 'c-nh148n-delhi-vadodara',
    ref: 'SC/C/12',
    name: 'Delhi–Vadodara Greenfield 8-lane, NH-148N',
    title:
      'Construction of Eight Lane divided carriageway starting at Ch. 47+000 near Khanpur Ghati to Haryana-Rajasthan Border (Ch. 47+000 to 78+800) section of Delhi – Vadodara Greenfield Alignment (NH-148N) on EPC Mode under Bharatmala Pariyojana in the State of Haryana',
    states: ['Haryana'],
    highways: ['NH-148N'],
    mode: 'EPC',
    lengthKm: 31.8,
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'c-nh503-rob-nangal',
    ref: 'SC/C/13',
    name: '4-Lane ROB at LC 92-C, NH-503 (Extn.), Nangal',
    title:
      'Construction of 4-Lane ROB and its approaches in Lieu of existing Level Crossing 92-C at KM 63 on NH-503 (Extn.) In Nangal near Ajouli Mour in the State of Punjab on Engineering, Procurement & Construction (EPC).',
    states: ['Punjab'],
    highways: ['NH-503'],
    mode: 'EPC',
    lengthKm: null,
  },
  {
    id: 'c-nh66-ramanattukara-valanchery',
    ref: 'SC/C/15',
    name: 'Ramanattukara Jn–Valanchery bypass, NH-66',
    title:
      'Six laning of Ramanattukara Junction to start of Valanchery bypass section of NH-66 (old NH-17) from Design Ch. 258+818 (Ex. km 27.840 of Kozhikode bypass) to Design Chainage 298+500 (Ex. km 304.250) in the state of Kerala on Hybrid Annuity Mode under Bharatmala Pariyojana.',
    states: ['Kerala'],
    highways: ['NH-66'],
    mode: 'HAM',
    lengthKm: 39.682,
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'c-nh66-valanchery-kappirikkad',
    ref: 'SC/C/16',
    name: 'Valanchery bypass–Kappirikkad, NH-66',
    title:
      'Six laning from start of Valanchery bypass to Kappirikkad section of NH-66 (old NH-17) from Design Ch. 298+500 (Ex. km 304.250) to Design Chainage 335+850 (Ex. km 349.260) in the state of Kerala on Hybrid Annuity Mode under Bharatmala Pariyojana',
    states: ['Kerala'],
    highways: ['NH-66'],
    mode: 'HAM',
    lengthKm: 37.35,
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'c-sh23-bari-ghoti-sinnar',
    ref: 'SC/C/17',
    name: 'Bari–Ghoti Sinnar, SH-23, Igatpuri',
    title:
      'Safety Consultants services for Improvement of SH 23 Road from Bari to Ghoti Sinnar Road, Reconstruction, Widening and Strengthening of existing carriageway in the section of SH-23 from Km 191/980 to 205/300 (Length 13.32 Km) to two lanes with earthen shoulders standards in Tal. Igatpuri Dist. Nashik, Maharashtra On Engineering, Procurement & Construction (EPC) Mode.',
    states: ['Maharashtra'],
    highways: ['SH-23'],
    mode: 'EPC',
    lengthKm: 13.32,
  },
  {
    id: 'c-nh227a-chhapia-sikriganj',
    ref: 'SC/C/18',
    name: 'Chhapia–Sikriganj, NH-227A (Km 55–90)',
    title:
      'Safety Consultant for Improvement and Up-gradation to Two Lane with paved shoulder configuration from existing km. 55.000 to km. 90.000 (Design length 34.76) of NH-227A (Near Chhapia village to near Sikriganj) in the State of Uttar Pradesh on Engineering, Procurement & Construction (EPC) basis',
    states: ['Uttar Pradesh'],
    highways: ['NH-227A'],
    mode: 'EPC',
    lengthKm: 34.76,
  },
  {
    id: 'c-nh730-rob-flyovers',
    ref: 'SC/C/19',
    name: '1 ROB & 3 Flyovers, NH-730',
    title:
      'Safety Consultants services for Construction of 1 ROB & 3 Flyovers of National Highway No. 730 at the section from Km. 133+230 to Km. 134+330, Km 134+550 to Km. 135+650, Km 136+200 to Km. 137+800 in the State of Uttar Pradesh',
    states: ['Uttar Pradesh'],
    highways: ['NH-730'],
    mode: null,
    lengthKm: null,
  },
  {
    id: 'c-nh227a-chhawani-chhapia',
    ref: 'SC/C/20',
    name: 'Chhawani–Chhapia, NH-227A (Km 0–55)',
    title:
      'Safety Consultants services for Improvement and up-gradation of existing carriageway to two lane with paved shoulder from km. 0.00 (Chhawani) to km. 55.00 (Near Chhapia village) of NH-227A in the State of Uttar Pradesh on EPC mode. 2 Lane; Project Length: 55.00 Km; Project Cost: Rs. 194.91 Cr.',
    states: ['Uttar Pradesh'],
    highways: ['NH-227A'],
    mode: 'EPC',
    lengthKm: 55,
    client: 'PWD NH-Division, Lucknow',
  },
];

/* ---- DETAIL DESIGN SERVICES ---- */
const detailDesign = [
  {
    id: 'dd-nh552-sawaimadhopur-sheopur',
    ref: 'DD/C/01',
    name: 'Sawai Madhopur–Sheopur, NH-552 Extn.',
    title:
      'Detail design of Widening, Strengthening and reconstruction of NH-552 Extn. from Km. 76/600 to Km. 112/00, Sawai Madhopur to Sheopur road (Rajasthan / MP Border) in the State of Rajasthan on Engineering, Procurement and Construction (EPC) mode.',
    states: ['Rajasthan'],
    highways: ['NH-552'],
    mode: 'EPC',
    lengthKm: 35.4,
    lanes: '2 Lane',
    client: 'Atcon India Ltd.',
  },
  {
    id: 'dd-nh247-nilaj-bhandara',
    ref: 'DD/C/02',
    name: 'Nilaj Phata–Bhandara, NH-247',
    title:
      'Detail design of Rehabilitation and upgradation of National Highway No. 247 section from Nilaj Phata–Paoni–Adayal–Bhandara from existing Km 0+000 (Nilaj Phata) to Km 53+400 (Bhandara) [Design Ch. 0+000 to Km 53+260] to two lane with paved shoulders in the State of Maharashtra on Engineering, Procurement & Construction mode.',
    states: ['Maharashtra'],
    highways: ['NH-247'],
    mode: 'EPC',
    lengthKm: 53.4,
    lanes: '2 Lane',
    client: 'Atcon India Ltd.',
  },
  {
    id: 'dd-lalru-mallan-cold-insitu',
    ref: 'DD/C/03',
    name: 'Lalru–Handesra–Khelan–Mallan Road',
    title:
      'Strengthening of Lalru-Handesra-Khelan-Mallan Road by way of Cold in Situ Stabilization Technology as a Pilot Project in the State of Punjab.',
    states: ['Punjab'],
    highways: [],
    mode: null,
    lengthKm: 15.2,
    lanes: '2 Lane',
    client: 'Vishwa Samudra Engineering, Hyderabad',
  },
  {
    id: 'dd-sirhind-rajasthan-feeder-bridges',
    ref: 'DD/C/04',
    name: 'High-level bridges, Sirhind & Rajasthan Feeder',
    title:
      'Detail design of High-level bridge (single span 38 m c/c of bearing) on Sirhind Feeder and High-level bridge (single span 75 m c/c of bearing) on Rajasthan Feeder crossing Faridkot Bir Chahal Road at RD 1.55 and 1.62, including approaches, diversion road, widening of road RD 0.72 to 3.00 km (5.50 m to 7.00 m) and dismantling of existing bridges, plus 2 nos. 1.5 m wide and 75 m c/c long truss for water and irrigation supply.',
    states: ['Punjab'],
    highways: [],
    mode: null,
    lengthKm: null,
    client: 'Ganesh Kartikey Construction Pvt. Ltd.',
  },
  {
    id: 'dd-nh154-pathankot-nurpur',
    ref: 'DD/C/05',
    name: 'Pathankot–Nurpur, NH-154',
    title:
      'Four laning from existing 10.0 m carriageway width from Km. 5.550 to Km. 11.975 of NH-154 (old NH-20) Pathankot-Nurpur section in the State of Punjab on EPC mode.',
    states: ['Punjab'],
    highways: ['NH-154'],
    mode: 'EPC',
    lengthKm: 6.45,
    lanes: '4 Lane',
    client: 'M/s Royal Deep Construction Pvt. Ltd.',
  },
  {
    id: 'dd-nh105-road-safety',
    ref: 'DD/C/06',
    name: 'Road safety works, NH-21A (New NH-105)',
    title:
      'Detail design for Strengthening including Improvement of Road Safety on Km 49/0 to 66/275 — construction of retaining wall, parapets, W-beam crash barriers, edge walls and road signage on NH-21A (New NH-105) under Annual Plan 2019-20 — in the State of Himachal Pradesh on EPC mode (Package No. EPC-12/2019).',
    states: ['Himachal Pradesh'],
    highways: ['NH-105'],
    mode: 'EPC',
    lengthKm: 17.275,
    client: 'PWD (EPC Contractor: Royal Deep Construction Pvt. Ltd.)',
  },
  {
    id: 'dd-nh503a-road-safety',
    ref: 'DD/C/07',
    name: 'Road safety works, NH-503A',
    title:
      'Detail design for Strengthening including Improvement of Road Safety by construction of retaining wall, edge wall, berms and parapets at selected reaches, double W-beam crash barrier (single side), U and V shape drain, and providing/fixing of tubular type retro-reflective signage and gantries from Km 0/00 to 15/300 on NH-503A in the State of Himachal Pradesh on EPC mode (Package No. EPC-11/2019).',
    states: ['Himachal Pradesh'],
    highways: ['NH-503A'],
    mode: 'EPC',
    lengthKm: 15.3,
    client: 'PWD (EPC Contractor: Royal Deep Construction Pvt. Ltd.)',
  },
  {
    id: 'dd-nh70-jalandhar-hoshiarpur',
    ref: 'DD/C/08',
    name: 'Jalandhar–Hoshiarpur, NH-70 (New NH-3)',
    title:
      'Detail design for Four laning of Jalandhar to Hoshiarpur section of NH-70 (New NH-3) Km 11+400 to Km 49+200, including construction of Hoshiarpur bypass, in the State of Punjab.',
    states: ['Punjab'],
    highways: ['NH-70'],
    mode: null,
    lengthKm: 37.8,
    lanes: '4 Lane',
    client: 'PWD (EPC Contractor: J.S. Grover Constructions, Punjab)',
  },
];

/* ---- PRE-BID SERVICES ----
   NOTE: the firm reports roughly 50 pre-bid commissions in total; the seven
   below are the ones supplied in detail. Add the remainder here. */
const preBid = [
  {
    id: 'pb-nh8-dhaula-kuan',
    ref: 'PB/C/01',
    name: 'Dhaula Kuan T-junction, NH-8',
    title:
      'Pre-Bid Services for Improvement of T-junction near Dhaula Kuan Metro Station including widening of National Highway from Dhaula Kuan up to end of junction on NH-8, improvement of T-junction Defence area including widening up to Defence area on NH-8, and R&R Hospital Link Underpass, on EPC mode in the State of Delhi.',
    states: ['Delhi'],
    highways: ['NH-8'],
    mode: 'EPC',
    lengthKm: 6.5,
    lanes: '6 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
  {
    id: 'pb-nh11-fatehpur-jhunjhunu',
    ref: 'PB/C/02',
    name: 'Fatehpur–Jhunjhunu, NH-11',
    title:
      'Pre-Bid Services for Construction of two-lane flexible pavement with paved shoulder configuration from Km 5/975 to 19/525 (Design Ch. 7.400 to 20.925) and Km 26/825 to 41/200 (Design Ch. 27.300 to 41.625), aggregating 27.680 Km of existing road, for upgradation of the Fatehpur to Jhunjhunu section of NH-11 in the State of Rajasthan.',
    states: ['Rajasthan'],
    highways: ['NH-11'],
    mode: null,
    lengthKm: 27.68,
    lanes: '2 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
  {
    id: 'pb-nh275-bangalore-nidagatta',
    ref: 'PB/C/03',
    name: 'Bangalore–Nidagatta, NH-275',
    title:
      'Pre-Bid Services for Six laning of the Bangalore-Nidagatta section, Km. 18.000 to Km. 74.200 of NH-275, in the State of Karnataka to be executed on Hybrid Annuity mode.',
    states: ['Karnataka'],
    highways: ['NH-275'],
    mode: 'HAM',
    lengthKm: 56.2,
    lanes: '6 Lane',
    client: 'Oriental Structures Engineers Pvt. Ltd.',
  },
  {
    id: 'pb-nh552-sawaimadhopur-sheopur',
    ref: 'PB/C/04',
    name: 'Sawai Madhopur–Sheopur, NH-552 Extn.',
    title:
      'Pre-Bid Services for Widening, Strengthening and reconstruction of NH-552 Extn. from Km 76/600 to 112/00, Sawai Madhopur to Sheopur Road (Rajasthan / MP Border), in the State of Rajasthan on EPC mode.',
    states: ['Rajasthan'],
    highways: ['NH-552'],
    mode: 'EPC',
    lengthKm: 35.6,
    lanes: '2 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
  {
    id: 'pb-nh57-nayagarh-khurda',
    ref: 'PB/C/05',
    name: 'Nayagarh–Khurda, NH-57',
    title:
      'Pre-Bid Services for upgradation of the existing lane to 2 lanes with paved shoulder from Km. 239/900 to 294/300 (Nayagarh to Khurda), excluding Khurda Bypass, of NH-57 on EPC mode in the State of Odisha.',
    states: ['Odisha'],
    highways: ['NH-57'],
    mode: 'EPC',
    lengthKm: 54.4,
    lanes: '2 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
  {
    id: 'pb-nh55-cuttack-angul-1',
    ref: 'PB/C/06',
    name: 'Cuttack–Angul, NH-42 / New NH-55 (Pkg-I)',
    title:
      'Pre-Bid Services for Rehabilitation and upgradation of the Cuttack-Angul section of NH-42 (New NH-55) to four lanes (Km. 0+400 to 60+200) in the State of Odisha under NHDP Phase-III on EPC mode (Package-I).',
    states: ['Odisha'],
    highways: ['NH-55'],
    mode: 'EPC',
    lengthKm: 59.8,
    lanes: '4 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
  {
    id: 'pb-nh55-cuttack-angul-2',
    ref: 'PB/C/07',
    name: 'Cuttack–Angul, NH-42 / New NH-55 (Pkg-II)',
    title:
      'Pre-Bid Services for Rehabilitation and upgradation of the Cuttack-Angul section of NH-42 (New NH-55) to four lanes (Km. 60+200 to 112+000) in the State of Odisha under NHDP Phase-III on EPC mode (Package-II).',
    states: ['Odisha'],
    highways: ['NH-55'],
    mode: 'EPC',
    lengthKm: 51.8,
    lanes: '4 Lane',
    client: 'Supreme Infrastructure India Ltd.',
  },
];

/* ---- PROOF CONSULTING SERVICES ---- */
const proofConsulting = [
  {
    id: 'pc-nh354e-abohar-dabwali',
    ref: 'PC/C/01',
    name: 'Abohar–Sito Gunno–Dabwali, NH-354E',
    title:
      'Rehabilitation and upgradation to 2 lanes with paved shoulder of Abohar-Sito Gunno-Dabwali road from Km. 0.00 to Km. 50.885 of NH-354E, including construction of one high-level major steel bridge, on EPC mode in the State of Punjab (Job No. NH-354E-PB-2017-18-493 dated 28.03.2018).',
    states: ['Punjab'],
    highways: ['NH-354E'],
    mode: 'EPC',
    lengthKm: 50.885,
    lanes: '2 Lane',
    client: 'M/s MG Contractors Pvt. Ltd.',
  },
  {
    id: 'pc-nh154-pathankot-nurpur',
    ref: 'PC/C/02',
    name: 'Pathankot–Nurpur, NH-154',
    title:
      'Four laning from existing 10.0 m carriageway width from Km. 5.550 to Km. 11.975 of NH-154 (old NH-20) Pathankot-Nurpur section in the State of Punjab on EPC mode.',
    states: ['Punjab'],
    highways: ['NH-154'],
    mode: 'EPC',
    lengthKm: 6.425,
    lanes: '4 Lane',
    client: 'M/s Royal Deep Construction Pvt. Ltd.',
  },
];

/* ---- DETAILED PROJECT REPORT ---- */
const dpr = [
  {
    id: 'dpr-bridge-khanpur-ludhiana',
    ref: 'DPR/C/01',
    name: 'Major bridge, Khanpur — Abohar Branch Canal',
    title:
      'Consultancy Services for Preparation of Detailed Project Report for Construction of a Major Bridge at village Khanpur, Abohar Branch Canal, District Ludhiana, in the State of Punjab.',
    states: ['Punjab'],
    highways: [],
    mode: null,
    lengthKm: 0.65,
    client: 'Executive Engineer, Provincial Division, PWD B&R Ludhiana',
  },
];

/* ------------------------------------------------------------------ */
/* ONGOING                                                             */
/* ------------------------------------------------------------------ */

const ongoing = [
  {
    id: 'o-msh8-nashik',
    ref: 'SC/O/01',
    name: 'Nandurbar–Chhadavel corridor, MSH-8, Nashik',
    title:
      'Safety Consultants services for Improvement of road Nandurabar Chhadavel, Nampur-Malegaon Manmad Yevola Kopargaon Rohuri Nagar Karmala Temburni Pandharpur Malgalvedha river Bombalad to state border MSH-8 Km. 147/100 to 175/400 Dist. Nashik.',
    states: ['Maharashtra'],
    highways: ['MSH-8'],
    mode: null,
    lengthKm: 28.3,
  },
  {
    id: 'o-nh7-mirzapur-om',
    ref: 'SC/O/02',
    name: 'Varanasi–Hanumana, NH-7 (Pkg 1–3), PIU-Mirzapur',
    title:
      'Appointment of Safety Consultants for the following completed projects / under O&M Phase with PIU-Mirzapur: (i) Rehabilitation and Up-gradation from 2 lane to 4 lane of NH stretch under NHDP-IVB for Varanasi-Dagmagpur section of NH-7 on EPC Mode, Design Chainage Km 15+100 to Km 49+100 (Length 34.00 Km); (ii) Dagmagpur-Lalganj section of NH-7 (Pkg-2), Km 49.100 to Km 96.800 (Length 47.70 Km); (iii) Lalganj-Hanumana section of NH-7 (Pkg-3), Km 96.800 to Km 140.200 (Length 43.40 Km) — in the State of Uttar Pradesh under Bharatmala Pariyojana.',
    states: ['Uttar Pradesh'],
    highways: ['NH-7'],
    mode: 'EPC',
    lengthKm: 125.1,
    client: 'NHAI',
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'o-nh112-nh14-rajasthan',
    ref: 'SC/O/03',
    name: 'Bar–Bilara–Jodhpur NH-112 & Beawar–Pindwara NH-14',
    title:
      'Appointment of Safety Consultant for (i) Widening and Strengthening of Bar-Bilara-Jodhpur Section of NH-112 with four laning with paved shoulder from existing Km. 0.00 to 111.000 (Design Length 109.655 Km) under NHDP-IV in the State of Rajasthan on EPC mode; (ii) Four Laning of Beawar-Pali-Pindwara Section of NH-14 (from Km 0.000 to Km 244.120) in the State of Rajasthan under NHDP Phase III on DBFOT (Toll) basis',
    states: ['Rajasthan'],
    highways: ['NH-112', 'NH-14'],
    mode: 'DBFOT',
    lengthKm: 353.775,
    client: 'NHAI',
  },
  {
    id: 'o-varanasi-rsa-om',
    ref: 'SC/O/04',
    name: 'Road Safety Audit, NHAI PIU Varanasi (4 projects)',
    title:
      'Appointment of Road Safety Consultant for conducting Road Safety Audit for the projects under O&M stage under jurisdiction of NHAI PIU Varanasi: (i) Varanasi Ring Road Phase I Pkg I; (ii) Varanasi–Gorakhpur section of NH-29 Pkg II; (iii) Varanasi Ring Road Phase II Pkg I; and (iv) Ghaghara bridge–Varanasi section of NH-233 Pkg III',
    states: ['Uttar Pradesh'],
    highways: ['NH-29', 'NH-233'],
    mode: null,
    lengthKm: null,
    client: 'NHAI',
  },
  {
    id: 'o-nh361-maharashtra-om',
    ref: 'SC/O/05',
    name: 'Wardha–Butibori / Yavatmal / Mahagaon, NH-361',
    title:
      'Appointment of Safety Consultant for Operation & Maintenance period for (i) 4-laned Wardha-Butibori Section of NH-361 from Km. 465.500 to Km. 524.690 under NH(O) on Hybrid Annuity Mode; (ii) 4-laned Yavatmal-Wardha Section of NH-361 from Km. 400.575 to Km. 465.500 (Package-III) under NHDP Phase-IV on Hybrid Annuity Mode; (iii) 4-laned Mahagaon-Yavatmal Section of NH-361 from Km. 320.580 to Km. 400.575 (Package-II) under NHDP Phase-IV on Hybrid Annuity Mode — in the State of Maharashtra. Consultancy Package No. SC/HAM/NH-361/2022-23/NAG-01',
    states: ['Maharashtra'],
    highways: ['NH-361'],
    mode: 'HAM',
    lengthKm: 204.11,
    client: 'NHAI',
  },
  {
    id: 'o-sh102-sh59-rajasthan',
    ref: 'SC/O/06',
    name: 'Nasirabad–Padukalan SH-102 & Beawar–Alniyawas SH-59',
    title:
      'Appointment of Safety Consultant for development and Maintenance of (i) Nasirabad-Mangaliyawas-Padukalan Highway SH-102 (Length 62.96 km, Mangaliawas–Padukalan section) and (ii) Beawar – Pisagan – Tehla - Kot - Alniyawas section of SH-59 (Length 56.70 km) — Total Length 119.66 km — through Public Private Partnership under Design, Build, Operate / Maintenance & Transfer (DBOT Hybrid Annuity) basis in the State of Rajasthan. Package No. RSHIP/ADB/T-2/HAM/02T-2',
    states: ['Rajasthan'],
    highways: ['SH-102', 'SH-59'],
    mode: 'PPP',
    lengthKm: 119.66,
    programme: 'RSHIP (ADB Tranche-2)',
  },
  {
    id: 'o-nh130cd-andhra',
    ref: 'SC/O/07',
    name: 'Aluru–Sabbavaram, NH-130CD (Pkg 1–4)',
    title:
      'Appointment of Safety Consultant Services in the State of Andhra Pradesh on Hybrid Annuity Mode for (i) Development of Six Lane Aluru-Jakkuva Section of NH-130CD from Km 365+033 to Km 396+800 (Package-1); (ii) Jakkuva-Korlam Section from Km 396+800 to Km 421+100 (Package-2); (iii) Korlam-Kantakapalle Section from Km 421+000 to Km 445+100 (Package-3); (iv) Kantakapalle-Sabbavaram Section from Km 445+100 to Km 464+662 (Package-4) — under the Raipur–Visakhapatnam Economic Corridor.',
    states: ['Andhra Pradesh'],
    highways: ['NH-130CD'],
    mode: 'HAM',
    lengthKm: 99.629,
    client: 'NHAI',
    programme: 'Raipur–Visakhapatnam Economic Corridor',
  },
  {
    id: 'o-vadodara-mumbai-expressway',
    ref: 'SC/O/08',
    name: 'Vadodara–Mumbai Expressway (Pkg 1–3)',
    title:
      'Appointment of Safety Consultants for Vadodara – Mumbai Expressway from Km 292.000 to Km 378.740, Packages 1, 2 and 3 on Hybrid Annuity Mode in the State of Maharashtra',
    states: ['Maharashtra'],
    highways: ['Vadodara–Mumbai Expressway'],
    mode: 'HAM',
    lengthKm: 86.74,
    client: 'NHAI',
  },
  {
    id: 'o-nh2-nh32-barwa-adda',
    ref: 'SC/O/09',
    name: 'Barwa Adda–Panagarh NH-2 & Purulia–Chandil NH-32',
    title:
      'Appointment of Safety Consultant for 6-laning of Barwa Adda-Panagarh Section of NH-2 from Km. 398.240 to 521.120 including Panagarh Bypass under NHDP Phase V on DBFOT (Toll) pattern (Length 122.88 Km); Rehabilitation and up-gradation to 2-lane with paved shoulder in Purulia (JHR Border)-Chandil (Junction with NH-33) section of NH-32 (Length 73.281 Km); and Construction of 4-laning for Purulia Bypass from Km 84.030 to Km 94.345 of NH-32 on EPC Mode (Length 10.315 Km). Total project length 206.476 km.',
    states: ['Jharkhand', 'West Bengal'],
    highways: ['NH-2', 'NH-32'],
    mode: 'DBFOT',
    lengthKm: 206.476,
    client: 'NHAI',
  },
  {
    id: 'o-nh52-bodhre-dhule',
    ref: 'SC/O/10',
    name: 'Bodhre–Dhule, NH-52 (old NH-211)',
    title:
      'Appointment of Safety Consultant during Construction period for 4/6 laning of Bodhre to Dhule Section from Km 390.000 to Km 457.231 (Design chainage) of NH-211 (New NH-52), design length 67.231 Km, in the State of Maharashtra under Bharatmala Pariyojana on Hybrid Annuity Mode. Consultancy Package No. SC/HAM/NH-52/2023-24/NAG-11',
    states: ['Maharashtra'],
    highways: ['NH-52'],
    mode: 'HAM',
    lengthKm: 67.231,
    client: 'NHAI',
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'o-nagpur-ring-road',
    ref: 'SC/O/11',
    name: 'Nagpur City Ring Road / Bypasses (Pkg 1–2)',
    title:
      'Appointment of Safety Consultant during Construction period for (i) Four Lane Stand Alone Ring Road / Bypasses for Nagpur City, Package-1 from Km. 0+500 to Km. 34+000 (Total Length 33.500 Km) and (ii) Package-II from Km. 34+500 to Km. 62+035 (Total Length 28.035 Km) in the State of Maharashtra on BOT (Hybrid Annuity) basis. Consultancy Package No. SC/HAM/ORR/2023-24/NAG-12',
    states: ['Maharashtra'],
    highways: ['Nagpur Ring Road'],
    mode: 'HAM',
    lengthKm: 61.535,
    client: 'NHAI',
  },
  {
    id: 'o-nh544-nh79-tamilnadu',
    ref: 'SC/O/12',
    name: 'Salem–Chengapalli NH-544 & Salem–Ulundurpet NH-79',
    title:
      'Appointment of Safety Consultant for three projects: (i) Four laning of Salem to Kumarapalayam section of NH-544 from Km. 0+000 to Km. 53+525 on BOT (Toll) under NHDP Phase-II; (ii) Four laning of Kumarapalayam to Chengapalli section of NH-544 from Km. 53+525 to Km. 102+035 on BOT (Toll) under NHDP Phase-II; (iii) Four laning of Salem to Ulundurpet section from Km. 0+313 to Km. 136+670 of NH-79 under NHDP Phase-III — in the State of Tamil Nadu. (4th Call)',
    states: ['Tamil Nadu'],
    highways: ['NH-544', 'NH-79'],
    mode: 'BOT',
    lengthKm: 238.392,
    client: 'NHAI',
  },
  {
    id: 'o-bihar-nh31-nh57',
    ref: 'SC/O/13',
    name: 'Purnia–Dalkhola NH-31, Muzaffarpur–Purnia NH-57 & Kosi Bridge',
    title:
      'Appointment of Safety Consultants for the projects: (i) Purnia-Dalkhola section of NH-31 from Km. 410.700 to Km. 447.000; (ii) Muzaffarpur-Darbhanga-Purnia section of NH-57 (Km. 0.00 to Km. 148.550 and Km. 159.357 to Km. 287.860); (iii) Kosi Bridge (ER-5) Km. 148.550 to 159.185; (iv) Construction of 2nd flyover (LC-VI) in Kishanganj town from Km. 472.300 to Km. 475.480 of NH-31; and (v) Four laning of Forbesganj to Jogbani section from Km. 0.000 to Km. 9.258 (ICP Jogbani) of NH-57A in the State of Bihar. Total length 336.423 Km.',
    states: ['Bihar'],
    highways: ['NH-31', 'NH-57', 'NH-57A'],
    mode: null,
    lengthKm: 336.423,
    client: 'NHAI',
  },
  {
    id: 'o-bihar-nh722-nh28-nh85',
    ref: 'SC/O/14',
    name: 'Chhapra–Muzaffarpur NH-722, Kotwa–Muzaffarpur NH-28 & NH-85',
    title:
      'Appointment of Safety Consultants for the projects: (i) Chhapra-Rewaghat-Muzaffarpur, NH-722 (old NH-102); (ii) Kotwa-Mehsi-Muzaffarpur section of NH-28 from Km 440+000 to Km 520+000 (WB-11 & WB-12); (iii) Gopalganj-Devapur-Kotwa from Km 360+915 to Km 440+000 (WB-9 & WB-10); and (iv) Two laning with paved shoulder of Chhapra-Gopalganj section of NH-85 from Km 0.00 to Km 93.500 in the State of Bihar. Total length 325.675 Km.',
    states: ['Bihar'],
    highways: ['NH-722', 'NH-28', 'NH-85'],
    mode: null,
    lengthKm: 325.675,
    client: 'NHAI',
  },
  {
    id: 'o-jharkhand-vrk-corridor',
    ref: 'SC/O/15',
    name: 'Varanasi–Ranchi–Kolkata Pkg 12–13 & NH-320/320B',
    title:
      'Appointment of Safety Consultant for the following packages: (i) Construction of 6-lane Greenfield Varanasi-Ranchi-Kolkata Highway from junction with NH-20 in Bongabar village to junction with NH-320 in Lepo village, Km 325.500 to Km 358.500 (Package 12); (ii) from junction with NH-320 in Lepo village to Kamlapur village (JH/WB border), Km 358.500 to Km 387.200 (Package 13); (iii) Four laning with paved shoulder from Km 53.600 (Gola on NH-320B) to Km 81.446 (Ormanjhi on NH-320B); (iv) Four laning with paved shoulder from Km 21.110 (Bokaro / Jaina More on NH-320) to Km 53.600 (Gola on NH-320) — in the State of Jharkhand on Hybrid Annuity Mode under Bharatmala Pariyojana.',
    states: ['Jharkhand'],
    highways: ['NH-320', 'NH-320B'],
    mode: 'HAM',
    lengthKm: 121.536,
    client: 'NHAI',
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'o-nh344gm-shamli-ambala',
    ref: 'SC/O/16',
    name: 'Shamli–Ambala, NH-344GM (Pkg 1–3)',
    title:
      'Appointment of Safety Consultant for Development of Six-lane Access Controlled Highway from Gogwan Jalalpur (Shamli) to Ranipur Barsi (Saharanpur), Ch. 0+600 to 45+500 of Shamli-Ambala section (NH-344GM) in the State of Uttar Pradesh (Package-1, Length 46.1 Km); from Ranipur Barsi (Saharanpur) to Adhoya Musalmana (Ambala), Ch. 45+500 to 84+400 in the State of Haryana (Package-2, Length 38.9 Km); and from Adhoya Musalmana (Ambala) to Sadopur (Ambala), Ch. 84+400 to 121+786 in the State of Haryana (Package-3, Length 37.386 Km) — on EPC mode under Bharatmala Pariyojana Phase-1, part of the Bareilly–Ludhiana Economic Corridor.',
    states: ['Uttar Pradesh', 'Haryana'],
    highways: ['NH-344GM'],
    mode: 'EPC',
    lengthKm: 122.386,
    client: 'NHAI',
    programme: 'Bharatmala Pariyojana',
  },
  {
    id: 'o-bihar-nh327e-nh131a-nh20',
    ref: 'SC/O/17',
    name: 'Galgalia–Araria NH-327E, NH-131A & Bakhtiyarpur–Rajauli NH-20',
    title:
      'Appointment of Safety Consultant for Four Laning of Galgalia-Bahadurganj section of NH-327E from Km. 0.000 to Km. 49.000 (Package-I, Length 49 Km) on Hybrid Annuity Mode; Four Laning of Bahadurganj-Araria section of NH-327E from Km. 49.000 to Km. 93.983 (Package-II, Length 44.983 Km) on Hybrid Annuity Mode; New construction and up-gradation of NH-131A from Km. 34.600 to 79.970 near Purnea to 4-lane standard and from Km. 79.970 to Km. 82.000 to 2-lane with paved shoulders standard; and Four Laning of Bakhtiyarpur-Rajauli section of NH-20 from Km. 54.405 to Km. 101.630 (Package-II, Length 47.225 Km) — in the State of Bihar.',
    states: ['Bihar'],
    highways: ['NH-327E', 'NH-131A', 'NH-20'],
    mode: 'HAM',
    lengthKm: 188.608,
    client: 'NHAI',
  },
  {
    id: 'o-nh56-nh753b-gujarat',
    ref: 'SC/O/18',
    name: 'Bodeli–Vapi NH-56 & DPR Netrang–Sagbara NH-753B',
    title:
      'Appointment of Safety Consultant for 4-laning of Bodeli-Vapi Section of NH-56 from Km. 132.320 to Km. 179.780 and from Km. 208.900 to Km. 372.185, and Detailed Project Report for Widening of Netrang-Dediapada-Sagbara section of NH-753B from Km. 117.400 to Km. 175.400 in the State of Gujarat',
    states: ['Gujarat'],
    highways: ['NH-56', 'NH-753B'],
    mode: null,
    lengthKm: 210.745,
    client: 'NHAI',
  },
];

/* ------------------------------------------------------------------ */
/* EXPORTS                                                             */
/* ------------------------------------------------------------------ */

/** Normalise: every record gets the same shape and a status/category. */
const normalise = (list, status, category = SC) =>
  list.map((p) => ({
    mode: null,
    lengthKm: null,
    lanes: null,
    client: null,
    programme: null,
    states: [],
    highways: [],
    ...p,
    status,
    category: p.category ?? category,
  }));

export const projects = [
  ...normalise(completed, 'completed'),
  ...normalise(detailDesign, 'completed', 'detail-design'),
  ...normalise(preBid, 'completed', 'pre-bid'),
  ...normalise(proofConsulting, 'completed', 'proof-consulting'),
  ...normalise(dpr, 'completed', 'dpr'),
  ...normalise(ongoing, 'ongoing'),
];

/** Sorted unique values, used to build the filter dropdowns. */
const uniqueSorted = (values) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

export const allStates = uniqueSorted(projects.flatMap((p) => p.states));
export const allModes = uniqueSorted(projects.map((p) => p.mode).filter(Boolean));

/** Counts per category, split by status — powers the filter-chip badges. */
export function countsByCategory(status) {
  const scope = status ? projects.filter((p) => p.status === status) : projects;
  return CATEGORIES.reduce((acc, c) => {
    acc[c.id] = scope.filter((p) => p.category === c.id).length;
    return acc;
  }, {});
}

/** Headline figures for the projects hero. */
export const projectStats = {
  total: projects.length,
  completed: projects.filter((p) => p.status === 'completed').length,
  ongoing: projects.filter((p) => p.status === 'ongoing').length,
  totalKm: Math.round(projects.reduce((sum, p) => sum + (p.lengthKm ?? 0), 0)),
  states: allStates.length,
};

export default projects;
