"use client";

import { useState } from "react";

const EXTENDED_PROFILE_ROWS = [
  { metric: "1.1", parameter: "Number of students year wise during the last five years", url: "http://tjsec.in/wp-content/uploads/2024/04/1.1-Claim.pdf" },
  { metric: "2.1 & 2.2", parameter: "Number of full time teachers during the last five years (Without repeat count)", url: "http://tjsec.in/wp-content/uploads/2024/04/2.2-Claim.pdf" },
  { metric: "3.1", parameter: "Expenditure excluding salary component year wise during the last five years (INR in lakhs)", url: null },
];

const CRITERION_1_SECTIONS = [
  {
    heading: "Key Indicator 1.1 – Curricular Planning and Implementation (20)",
    rows: [
      { metric: "1.1.1", type: "QlM", weight: 20, desc: "Curriculum planning and delivery, including the academic calendar and continuous internal assessment.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.1.1-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 1.2 – Academic Flexibility (30)",
    rows: [
      { metric: "1.2.1", type: "QnM", weight: 15, desc: "Number of add-on, certificate, and value-added programs offered in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.2.1-CLAIMM.pdf" },
      { metric: "1.2.2", type: "QnM", weight: 15, desc: "Percentage of students enrolled in certificate, add-on, or value-added programs over the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.2.2-CLAIMM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 1.3 – Curriculum Enrichment (30)",
    rows: [
      { metric: "1.3.1", type: "QlM", weight: 10, desc: "Integration of cross-cutting issues (professional ethics, gender, human values, environment, sustainability) into the curriculum.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.3.1-CLAIM.pdf" },
      { metric: "1.3.2", type: "QnM", weight: 20, desc: "Percentage of students undertaking project work, field work, or internships in the latest completed academic year.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.3.2-CLAIM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 1.4 – Feedback System (20)",
    rows: [
      { metric: "1.4.1", type: "QnM", weight: 20, desc: "Whether feedback is obtained from stakeholders (students, teachers, employers, alumni, etc.) and whether the action-taken report is published on the website.", url: "http://tjsec.in/wp-content/uploads/2024/04/1.4.1-CLAIM.pdf" },
    ],
  },
];

const CRITERION_2_SECTIONS = [
  {
    heading: "Key Indicator 2.1 – Student Enrolment and Profile (40)",
    rows: [
      { metric: "2.1.1", type: "QnM", weight: 20, desc: "Enrolment percentage of students for the latest completed academic year.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.1.1-claim.pdf" },
      { metric: "2.1.2", type: "QnM", weight: 20, desc: "Percentage of first-year seats filled by reserved-category students over the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.1.2-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.2 – Student Teacher Ratio (40)",
    rows: [
      { metric: "2.2.1", type: "QnM", weight: 40, desc: "Student to full-time teacher ratio for the latest completed academic year.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.2.1-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.3 – Teaching-Learning Process (40)",
    rows: [
      { metric: "2.3.1", type: "QlM", weight: 40, desc: "Student-centric methods and ICT-enabled teaching.", url: "https://tjsec.in/wp-content/uploads/2024/04/2.3.1-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.4 – Teacher Profile and Quality (40)",
    rows: [
      { metric: "2.4.1", type: "QnM", weight: 15, desc: "Percentage of full-time teachers against sanctioned posts over the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.4.1-claim.pdf" },
      { metric: "2.4.2", type: "QnM", weight: 25, desc: "Percentage of full-time teachers holding NET/SET/SLET/PhD/D.Sc/D.Litt/LL.D over the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.4.2-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.5 – Evaluation Process and Reforms (40)",
    rows: [
      { metric: "2.5.1", type: "QlM", weight: 40, desc: "Transparency of internal/external assessment and timely, efficient grievance redressal.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.5.1-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.6 – Student Performance and Learning Outcome (90)",
    rows: [
      { metric: "2.6.1", type: "QlM", weight: 25, desc: "Programme Outcomes and Course Outcomes stated and displayed on the website.", url: "https://tjsec.in/wp-content/uploads/2024/04/2.6.1-CLAIM.pdf" },
      { metric: "2.6.2", type: "QlM", weight: 20, desc: "Evaluation of PO and CO attainment with evidence.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.6.2-CLAIM.pdf" },
      { metric: "2.6.3", type: "QnM", weight: 45, desc: "Pass percentage over the last five years, excluding backlog students.", url: "http://tjsec.in/wp-content/uploads/2024/04/2.6.3-CLAIM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 2.7 – Student Satisfaction Survey (60)",
    rows: [
      { metric: "2.7.1", type: "QnM", weight: 60, desc: "Online student satisfaction survey on the teaching-learning process.", url: null },
    ],
  },
];

const CRITERION_3_SECTIONS = [
  {
    heading: "Key Indicator 3.1 – Resource Mobilization for Research (10)",
    rows: [
      { metric: "3.1.1", type: "QnM", weight: 10, desc: "Research grants and endowments received from government and non-governmental agencies in the last five years (INR lakhs).", url: "http://tjsec.in/wp-content/uploads/2024/04/3.1.1-Clamin-Sheet-4-4-24.pdf" },
    ],
  },
  {
    heading: "Key Indicator 3.2 – Innovation Ecosystem (15)",
    rows: [
      { metric: "3.2.1", type: "QlM", weight: 10, desc: "Innovation ecosystem, IKS, IPR awareness, IPR cell, incubation centre, and outcomes.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.2.1-CLAIM.pdf" },
      { metric: "3.2.2", type: "QnM", weight: 5, desc: "Workshops, seminars, and conferences on research methodology, IPR, and entrepreneurship in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.2.2-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 3.3 – Research Publication and Awards (25)",
    rows: [
      { metric: "3.3.1", type: "QnM", weight: 10, desc: "Research papers per teacher in UGC CARE-listed journals in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.3.1-CLAIM.pdf" },
      { metric: "3.3.2", type: "QnM", weight: 15, desc: "Books, chapters in edited volumes, and national/international conference papers per teacher in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.3.2-CLAIM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 3.4 – Extension Activities (40)",
    rows: [
      { metric: "3.4.1", type: "QlM", weight: 10, desc: "Impact of extension activities on the neighbouring community and student social awareness.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.4.1-CLAIM.pdf" },
      { metric: "3.4.2", type: "QlM", weight: 10, desc: "Awards and recognitions for extension activities from government or government-recognised bodies.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.4.2-CLAIM.pdf" },
      { metric: "3.4.3", type: "QnM", weight: 20, desc: "Extension and outreach programmes through NSS/NCC and other forums with community involvement in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.4.3-Claim-sheet..pdf" },
    ],
  },
  {
    heading: "Key Indicator 3.5 – Collaboration (20)",
    rows: [
      { metric: "3.5.1", type: "QnM", weight: 20, desc: "Functional MoUs and linkages with Indian and foreign institutions/industries for internships, training, projects, exchanges, and research in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/3.5.1-CLAIM.pdf" },
    ],
  },
];

const CRITERION_4_SECTIONS = [
  {
    heading: "Key Indicator 4.1 – Physical Facilities (30)",
    rows: [
      { metric: "4.1.1", type: "QlM", weight: 20, desc: "Adequacy of teaching-learning facilities, ICT-enabled facilities, and cultural, sports, and yoga facilities.", url: "http://tjsec.in/wp-content/uploads/2024/04/4.1.1-Claim.pdf" },
      { metric: "4.1.2", type: "QnM", weight: 10, desc: "Percentage of infrastructure augmentation expenditure, excluding salary, over the last five years (INR lakhs).", url: "http://tjsec.in/wp-content/uploads/2024/04/4.1.2-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 4.2 – Library as a Learning Resource (20)",
    rows: [
      { metric: "4.2.1", type: "QlM", weight: 20, desc: "Library automation through an Integrated Library Management System, e-resource and journal subscriptions, and library usage.", url: "http://tjsec.in/wp-content/uploads/2024/04/4.2.1-Claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 4.3 – IT Infrastructure (30)",
    rows: [
      { metric: "4.3.1", type: "QlM", weight: 20, desc: "Frequency of IT facility updates, including Wi-Fi, with dates and nature of updates, and available internet bandwidth.", url: "http://tjsec.in/wp-content/uploads/2024/04/4.3.1-Claim-Final.pdf" },
      { metric: "4.3.2", type: "QnM", weight: 10, desc: "Student–computer ratio for the latest completed academic year, including the number of computers available for student use.", url: "http://tjsec.in/wp-content/uploads/2024/04/4.3.2-Claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 4.4 – Maintenance of Campus Infrastructure (20)",
    rows: [
      { metric: "4.4.1", type: "QnM", weight: 20, desc: "Percentage of maintenance expenditure on physical and academic support facilities, excluding salary, over the last five years (INR lakhs).", url: "http://tjsec.in/wp-content/uploads/2024/04/4.4.1-claim.pdf" },
    ],
  },
];

const CRITERION_5_SECTIONS = [
  {
    heading: "Key Indicator 5.1 – Student Support (50)",
    rows: [
      { metric: "5.1.1", type: "QnM", weight: 20, desc: "Percentage of students benefited by government and non-government scholarships and freeships in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.1.1-claim.pdf" },
      { metric: "5.1.2", type: "QnM", weight: 10, desc: "Capacity building and skills enhancement initiatives, including soft skills, language and communication, life skills, and awareness of technology trends.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.1.2-claim.pdf" },
      { metric: "5.1.3", type: "QnM", weight: 10, desc: "Percentage of students benefitted by guidance for competitive examinations and career counselling.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.1.3-CLAIM.pdf" },
      { metric: "5.1.4", type: "QnM", weight: 10, desc: "Transparent mechanism for timely redressal of student grievances, including sexual harassment and ragging cases.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.1.4-CLAIM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 5.2 – Student Progression (30)",
    rows: [
      { metric: "5.2.1", type: "QnM", weight: 20, desc: "Percentage of placement of outgoing students and students progressing to higher education in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.2.1-claim.pdf" },
      { metric: "5.2.2", type: "QnM", weight: 10, desc: "Percentage of students qualifying in state, national, or international level examinations (e.g., JAM, GATE, CAT, GRE, Civil Services).", url: "http://tjsec.in/wp-content/uploads/2024/04/5.2.2.-Claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 5.3 – Student Participation and Activities (50)",
    rows: [
      { metric: "5.3.1", type: "QnM", weight: 25, desc: "Number of awards/medals for outstanding performance in sports or cultural activities at university, state, national, or international level.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.3.1-CLAIM1.pdf" },
      { metric: "5.3.2", type: "QnM", weight: 25, desc: "Average number of sports and cultural programs in which institution students participated in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.3.2-CLAIM.pdf" },
    ],
  },
  {
    heading: "Key Indicator 5.4 – Alumni Engagement (10)",
    rows: [
      { metric: "5.4.1", type: "QlM", weight: 10, desc: "Registered Alumni Association contributing to institutional development through financial and/or other support.", url: "http://tjsec.in/wp-content/uploads/2024/04/5.4.1-claim-template.pdf" },
    ],
  },
];

const CRITERION_6_SECTIONS = [
  {
    heading: "Key Indicator 6.1 – Institutional Vision and Leadership (10)",
    rows: [
      { metric: "6.1.1", type: "QlM", weight: 10, desc: "Governance and leadership aligned with vision and mission (NEP implementation, growth, decentralization, participation, perspective plans).", url: "http://tjsec.in/wp-content/uploads/2024/04/CLAIM-PAGE-1-6.1.1-FIRSAT-PAGE..pdf" },
    ],
  },
  {
    heading: "Key Indicator 6.2 – Strategy Development and Deployment (10)",
    rows: [
      { metric: "6.2.1", type: "QlM", weight: 6, desc: "Effective deployment of the perspective plan and functioning of institutional bodies (policies, administration, appointments, service rules).", url: "http://tjsec.in/wp-content/uploads/2024/04/6.2.1-CLAIM.pdf" },
      { metric: "6.2.2", type: "QnM", weight: 4, desc: "E-governance in administration (including complaints), finance and accounts, student admission and support, and examinations.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.2.2-Claim-Sheet-1.pdf" },
    ],
  },
  {
    heading: "Key Indicator 6.3 – Faculty Empowerment Strategies (35)",
    rows: [
      { metric: "6.3.1", type: "QlM", weight: 8, desc: "Performance appraisal system, welfare measures for teaching and non-teaching staff, and career development avenues.", url: "http://tjsec.in/wp-content/uploads/2024/04/claim-6.3.1.pdf" },
      { metric: "6.3.2", type: "QnM", weight: 12, desc: "Percentage of teachers given financial support for conferences/workshops and professional body memberships in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.3.2-Claim.pdf" },
      { metric: "6.3.3", type: "QnM", weight: 15, desc: "Percentage of teaching and non-teaching staff in FDPs, MDPs, and professional/administrative training in the last five years.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.3.3-Claim-sheet-17-4-24.pdf" },
    ],
  },
  {
    heading: "Key Indicator 6.4 – Financial Management and Resource Mobilization (15)",
    rows: [
      { metric: "6.4.1", type: "QlM", weight: 15, desc: "Strategies for resource mobilization and optimal utilization from government and non-government sources, and regular internal and external financial audits.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.4.1.-Claim-sheet..pdf" },
    ],
  },
  {
    heading: "Key Indicator 6.5 – Internal Quality Assurance System (30)",
    rows: [
      { metric: "6.5.1", type: "QlM", weight: 15, desc: "IQAC's contribution to institutionalizing quality assurance, reviewing teaching-learning, operations, and learning outcomes, and recording improvements.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.5.1-claim-4-4-24.pdf" },
      { metric: "6.5.2", type: "QnM", weight: 15, desc: "Quality initiatives: regular IQAC meetings, Academic and Administrative Audit (AAA), collaborative initiatives, NIRF and other rankings, and other recognized quality audits/accreditations.", url: "http://tjsec.in/wp-content/uploads/2024/04/6.5.2-Claim-sheet..pdf" },
    ],
  },
];

const CRITERION_7_SECTIONS = [
  {
    heading: "Key Indicator 7.1 – Institutional Values and Social Responsibilities (50)",
    rows: [
      { metric: "7.1.1", type: "QIM", weight: 10, desc: "Gender audit and gender equity measures over the last five years, including curricular and co-curricular activities and women's facilities.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.1.1-CLAIM.pdf" },
      { metric: "7.1.2", type: "QnM", weight: 20, desc: "Facilities and initiatives for alternate energy, energy conservation, waste management, water conservation, green campus, and barrier-free access.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.1.2CLAIM.pdf" },
      { metric: "7.1.3", type: "QnM", weight: 10, desc: "Regular environment and energy quality audits, including green/environment audits, energy audits, and beyond-campus environmental activities.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.1.3-CLAIM.pdf" },
      { metric: "7.1.4", type: "QIM", weight: 10, desc: "Efforts toward an inclusive environment (cultural, regional, linguistic, communal, socioeconomic) and sensitizing students and staff to citizens' constitutional values and duties.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.1.4-claim.pdf" },
    ],
  },
  {
    heading: "Key Indicator 7.2 – Best Practices (30)",
    rows: [
      { metric: "7.2.1", type: "QIM", weight: 30, desc: "Two best practices implemented by the institution, in the NAAC format.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.2.1-CLAIM-new.pdf" },
    ],
  },
  {
    heading: "Key Indicator 7.3 – Institutional Distinctiveness (20)",
    rows: [
      { metric: "7.3.1", type: "QIM", weight: 20, desc: "Performance in one area distinctive to the institution's priorities and thrust.", url: "http://tjsec.in/wp-content/uploads/2024/04/7.3.1-claim.pdf" },
    ],
  },
];

const DVV_ROWS = [
  { metric: "1.1", parameter: "Student numbers, year-wise, over the last five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-1.1-1.pdf" },
  { metric: "2.1", parameter: "Teaching staff/full-time teachers over five years (no repeat counting)", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.1.pdf" },
  { metric: "2.2", parameter: "Teaching staff/full-time teachers, year-wise, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.2.pdf" },
  { metric: "3.1", parameter: "Expenditure excluding salary, year-wise, over five years (INR lakhs)", url: "http://tjsec.in/wp-content/uploads/2024/05/3.1dvv-index-1-1.pdf" },
  { metric: "1.2.1", parameter: "Certificate/value-added and MOOC (SWAYAM, NPTEL) courses completed by students", url: "http://tjsec.in/wp-content/uploads/2024/05/1.2.1-DVV.pdf" },
  { metric: "1.2.2", parameter: "Percentage of students enrolled in and completing certificate/value-added and MOOC courses", url: "http://tjsec.in/wp-content/uploads/2024/05/1.2.2-DVV.pdf" },
  { metric: "1.3.2", parameter: "Percentage of students undertaking project, field work, or internships (latest year)", url: "http://tjsec.in/wp-content/uploads/2024/05/1.3.2-DVV-INDEX.pdf" },
  { metric: "1.4.1", parameter: "Stakeholder feedback on academics and ambience, with action taken reports published online", url: "http://tjsec.in/wp-content/uploads/2024/05/1.4.2-INDEX.pdf" },
  { metric: "2.1.1", parameter: "Enrolment percentage: first-year seats filled versus sanctioned, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.1.1.pdf" },
  { metric: "2.1.2", parameter: "Percentage of first-year seats filled by reserved categories, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.1.2.pdf" },
  { metric: "2.2.1", parameter: "Student to full-time teacher ratio (latest year)", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.2.1.pdf" },
  { metric: "2.4.1", parameter: "Percentage of full-time teachers against sanctioned posts, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.4.1.pdf" },
  { metric: "2.4.2", parameter: "Percentage of full-time teachers with NET/SET/SLET/PhD or higher, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.4.2.pdf" },
  { metric: "2.6.3", parameter: "Pass percentage of final-year students, excluding backlogs, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/DVV-2.6.3.pdf" },
  { metric: "3.1.1", parameter: "Research grants from government and non-government agencies, over five years (INR lakhs)", url: "https://tjsec.in/wp-content/uploads/2024/05/3.1.1.-DVV-1.2-Front-Page-13.05.2024.pdf" },
  { metric: "3.2.2", parameter: "Workshops, seminars, and conferences on research methodology, IPR, and entrepreneurship", url: "http://tjsec.in/wp-content/uploads/2024/05/3.2.2-MAIN-PAGE.pdf" },
  { metric: "3.3.1", parameter: "Research papers per teacher in UGC CARE-listed journals, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/3.3.1-DVV.pdf" },
  { metric: "3.3.2", parameter: "Books, chapters, and conference papers per teacher, over five years", url: "http://tjsec.in/wp-content/uploads/2024/05/3.3.2-DVV.pdf" },
  { metric: "3.4.3", parameter: "Extension and outreach programmes through NSS/NCC with community involvement", url: "http://tjsec.in/wp-content/uploads/2024/05/3.4.3-DVV-1.pdf" },
  { metric: "3.5.1", parameter: "Functional MoUs and linkages with institutions and industries", url: "http://tjsec.in/wp-content/uploads/2024/05/3.5.1-DVV-INDEX.pdf" },
  { metric: "4.1.2", parameter: "Percentage of expenditure on infrastructure development, excluding salary", url: "http://tjsec.in/wp-content/uploads/2024/05/4.1.2-dvv-index-1-6_.pdf" },
  { metric: "4.3.2", parameter: "Student to computer ratio (latest year)", url: "http://tjsec.in/wp-content/uploads/2024/05/4.3.2-DVV.pdf" },
  { metric: "4.4.1", parameter: "Percentage of expenditure on maintaining facilities, excluding salary", url: "http://tjsec.in/wp-content/uploads/2024/05/4.4.1-dvv-index-1-6_.pdf" },
  { metric: "5.1.1", parameter: "Percentage of students benefiting from scholarships and freeships", url: "http://tjsec.in/wp-content/uploads/2024/05/5.1.1-DVV-clarification.pdf" },
  { metric: "5.1.2", parameter: "Capacity development activities: soft skills, language, life skills, ICT", url: "http://tjsec.in/wp-content/uploads/2024/05/5.1.2-DVV-.pdf" },
  { metric: "5.1.3", parameter: "Students benefiting from competitive exam guidance and career counselling", url: "http://tjsec.in/wp-content/uploads/2024/05/5.1.3-DVV.pdf" },
  { metric: "5.1.4", parameter: "Mechanisms for redressing student grievances, including harassment and ragging", url: "http://tjsec.in/wp-content/uploads/2024/05/5.1.4-DVV-FRENT-PAGE.pdf" },
  { metric: "5.2.1", parameter: "Placement and higher-education progression of outgoing students", url: "http://tjsec.in/wp-content/uploads/2024/05/Placement-5.2.1-NAAC-DVV-CLARIFICATIONS.pdf" },
  { metric: "5.2.2", parameter: "Students qualifying in state, national, and international exams", url: "http://tjsec.in/wp-content/uploads/2024/05/5.2.2-DVV-.pdf" },
  { metric: "5.3.1", parameter: "Awards and medals in sports and cultural activities", url: "http://tjsec.in/wp-content/uploads/2024/05/5.3.1-dvv-clarifications.pdf" },
  { metric: "5.3.2", parameter: "Average sports and cultural programmes students participated in", url: "http://tjsec.in/wp-content/uploads/2024/05/5.3.2-dvv-clarifications.pdf" },
  { metric: "6.2.2", parameter: "E-governance in administration, finance, admissions, and examinations", url: "http://tjsec.in/wp-content/uploads/2024/05/6.2.2-dvv-index.pdf" },
  { metric: "6.3.2", parameter: "Teachers financially supported for conferences, workshops, and professional memberships", url: "http://tjsec.in/wp-content/uploads/2024/05/6.3.2-dvv-index.pdf" },
  { metric: "6.3.3", parameter: "Staff participating in FDPs, MDPs, and administrative training", url: "http://tjsec.in/wp-content/uploads/2024/05/6.3.3-DVV-Front-Page-13.05.2024.pdf" },
  { metric: "6.5.2", parameter: "Quality assurance initiatives: IQAC meetings, audits, collaborations, rankings", url: "http://tjsec.in/wp-content/uploads/2024/05/6.5.2-DVV.pdf" },
  { metric: "7.1.2", parameter: "Energy, waste management, water conservation, green campus, and accessibility facilities", url: "http://tjsec.in/wp-content/uploads/2024/05/7.1.2-DVV-INDEX.pdf" },
  { metric: "7.1.3", parameter: "Green, energy, and environment audits and environmental promotion activities", url: "http://tjsec.in/wp-content/uploads/2024/05/7.1.3-DVV-INDEX.pdf" },
];

const RE_DVV_ROWS = [
  { metric: "3.1.1", parameter: "Grants received from Government and non-governmental agencies for research projects / endowments over the last five years (INR lakhs).", url: "http://tjsec.in/wp-content/uploads/2025/02/3.1.1.pdf" },
  { metric: "3.5.1", parameter: "Number of functional MoUs and linkages with institutions and industries in India and abroad over the last five years.", url: "http://tjsec.in/wp-content/uploads/2025/02/3.5.1-claim-redvv.pdf" },
  { metric: "5.3.2", parameter: "Average number of sports and cultural programs students participated in over the last five years.", url: "http://tjsec.in/wp-content/uploads/2025/02/5.3.2.pdf" },
];

const DATA_TEMPLATE_ROWS = [
  { metric: "3.1.1", parameter: "Research grants and endowments received from government and non-government agencies over the last five years (INR lakhs).", url: "https://tjsec.in/wp-content/uploads/2024/12/3.1.1.xlsx" },
  { metric: "3.5.1", parameter: "Number of functional MoUs or linkages with institutions and industries in India and abroad over the last five years.", url: "https://tjsec.in/wp-content/uploads/2024/12/3.5.1.xlsx" },
  { metric: "5.3.2", parameter: "Number of sports and cultural events or competitions the institution's students took part in during the year.", url: "https://tjsec.in/wp-content/uploads/2024/12/5.3.2.xlsx" },
  { metric: "6.3.2", parameter: "Percentage of teachers given financial support for conferences, workshops, and professional body memberships over the last five years.", url: "https://tjsec.in/wp-content/uploads/2024/12/6.3.2.xlsx" },
];

const CAPACITY_BUILDING_GROUPS = [
  {
    heading: "Soft Skills",
    items: [
      { title: "Inter and Intra Personal Skills", date: "12-09-2022" },
      { title: "Self-Development", date: "05-10-2022" },
      { title: "Interview Skills", date: "07-02-2023" },
      { title: "Leadership and Productivity", date: "21-02-2023" },
      { title: "Critical Thinking and Problem Solving", date: "28-02-2023" },
    ],
  },
  {
    heading: "Language and Communication Skills",
    items: [
      { title: "Development of Communication Skills", date: "15-09-2022" },
      { title: "Professionalism (Group Discussion)", date: "20-10-2022" },
      { title: "Language Development", date: "06-02-2023" },
      { title: "Public Speaking and Writing Skills", date: "13-02-2023" },
      { title: "Vocabulary Building", date: "14-02-2023" },
    ],
  },
  {
    heading: "Life Skills",
    items: [
      { title: "Entrepreneurial Skills and Start-Up", date: "09-09-2022" },
      { title: "Life Skills Today", date: "27-10-2022" },
      { title: "Yoga for Beginners", date: "27-03-2023" },
      { title: "Meditation in Daily Life", date: "03-05-2023" },
    ],
  },
  {
    heading: "Awareness of Trends in Technology",
    items: [
      { title: "Data Structure and Algorithm", date: "14-09-2022" },
      { title: "Coding and Decoding", date: "19-09-2022" },
      { title: "Artificial Intelligence", date: "27-02-2023" },
      { title: "Cyber Issues", date: "22-02-2023" },
    ],
  },
];

const STAKEHOLDER_FORMS = [
  { label: "Students Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSdM0ctP0YngIiKHXweBnbBbrVnGlz6POQyASgPOiofxMf4tig/viewform" },
  { label: "Alumni Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSe9WenIygFB-EkgM9-TC4fMmpp9MqGSqVYWOXJNJfWi7qxaAw/viewform" },
  { label: "Teachers Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSe7XUBI476BffmxnhnzKHvds22YIsoaKMSVnA_gfvBKuZVgQQ/viewform" },
  { label: "Employers Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSc2MxAeN1ZIYoXpebO8wBOpzDnbPB85N1RQ1aXmvE1Lx0sDJA/viewform" },
];

const STAKEHOLDER_DOCS = [
  { label: "Stakeholders Feedback Analysis Report", url: "http://tjsec.in/wp-content/uploads/2024/04/1.4.1_INDEX-4.pdf" },
  { label: "Action Taken Report", url: "http://tjsec.in/wp-content/uploads/2024/04/1.4.1_FEEDBACK_action-taken.pdf" },
  { label: "Questionnaire", url: "http://tjsec.in/wp-content/uploads/2024/04/1.4.1_FEEDBACK-questionaries.pdf" },
  { label: "University Communication", url: "http://tjsec.in/wp-content/uploads/2024/04/UNIV-COMM.pdf" },
];

const CERTIFICATE_CYCLES = [
  { label: "Cycle I", url: "http://tjsec.in/wp-content/uploads/2025/10/NAAC-Certificate-of-Accreditation-rotated-1.pdf" },
  { label: "Cycle II", url: "http://tjsec.in/wp-content/uploads/2025/10/NAAC-CERTIFICATE.pdf" },
];

const SSR_CYCLES = [
  { label: "Cycle I", url: "http://tjsec.in/wp-content/uploads/2025/03/SSR-Cycle-I.pdf" },
  { label: "Cycle II", url: "http://tjsec.in/wp-content/uploads/2025/03/SSR-Cycle-II.pdf" },
];

const CATEGORIES = [
  { id: "certificate", label: "Certificate of Accreditation", title: "Certificate of Accreditation", type: "cycle-pdf", cycles: CERTIFICATE_CYCLES },
  { id: "extended-profile", label: "Extended Profile", title: "Extended Profile", type: "table", rows: EXTENDED_PROFILE_ROWS },
  { id: "criterion-1", label: "Criterion 1", title: "Criterion 1 – Curricular Aspects (100)", type: "sections", sections: CRITERION_1_SECTIONS },
  { id: "criterion-2", label: "Criterion 2", title: "Criterion 2 – Teaching-Learning and Evaluation (350)", type: "sections", sections: CRITERION_2_SECTIONS },
  { id: "criterion-3", label: "Criterion 3", title: "Criterion 3 – Research, Innovations and Extension (110)", type: "sections", sections: CRITERION_3_SECTIONS },
  { id: "criterion-4", label: "Criterion 4", title: "Criterion 4 – Infrastructure and Learning Resources (100)", type: "sections", sections: CRITERION_4_SECTIONS },
  { id: "criterion-5", label: "Criterion 5", title: "Criterion 5 – Student Support and Progression (140)", type: "sections", sections: CRITERION_5_SECTIONS },
  { id: "criterion-6", label: "Criterion 6", title: "Criterion 6 – Governance, Leadership and Management (100)", type: "sections", sections: CRITERION_6_SECTIONS },
  { id: "criterion-7", label: "Criterion 7", title: "Criterion 7 – Institutional Values and Best Practices (100)", type: "sections", sections: CRITERION_7_SECTIONS },
  { id: "ssr", label: "SSR", title: "Self Study Report (SSR)", type: "cycle-pdf", cycles: SSR_CYCLES },
  { id: "dvv", label: "DVV Clarification", title: "DVV Clarification", type: "table", rows: DVV_ROWS },
  { id: "re-dvv", label: "RE-DVV Clarification", title: "RE-DVV Clarification", type: "table", rows: RE_DVV_ROWS },
  { id: "best-practices", label: "Best Practices", title: "Best Practices", type: "pdf", url: "http://tjsec.in/wp-content/uploads/2024/04/7.2.1-CLAIM-new.pdf" },
  { id: "distinctiveness", label: "Institutional Distinctiveness", title: "Institutional Distinctiveness", type: "pdf", url: "http://tjsec.in/wp-content/uploads/2024/04/Institutional-Distinctiveness.pdf" },
  { id: "code-of-conduct", label: "Code of Conduct", title: "Code of Conduct", type: "code-of-conduct" },
  { id: "hr-policy", label: "HR Policy", title: "HR Policy", type: "pdf", url: "http://tjsec.in/wp-content/uploads/2024/04/HR-Policy-tjsec.pdf" },
  { id: "capacity-building", label: "Capacity Building and Skill Enhancement", title: "Capacity Building and Skill Enhancement", type: "capacity-building", groups: CAPACITY_BUILDING_GROUPS },
  { id: "stakeholders-feedback", label: "Stakeholders Feedback", title: "Stakeholders Feedback", type: "stakeholders-feedback" },
  { id: "annual-report", label: "Annual Report", title: "Annual Report", type: "pdf", url: "http://tjsec.in/wp-content/uploads/2024/04/Annual-report-INDEX.pdf" },
  { id: "data-template", label: "Data Template", title: "Data Template", type: "table", rows: DATA_TEMPLATE_ROWS },
  { id: "peer-visit", label: "NAAC Peer Team Visit", title: "NAAC Peer Team Visit", type: "peer-visit" },
];

function MetricTable({ rows }) {
  return (
    <div className="tjs-dept-table-wrap">
      <table className="tjs-dept-table">
        <thead>
          <tr>
            <th>Metric No.</th>
            <th>Parameter</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.parameter}</td>
              <td>
                {row.url ? (
                  <a href={row.url} target="_blank" rel="noopener" style={{ color: "var(--rs-theme-blue)", fontWeight: 600 }}>
                    VIEW
                  </a>
                ) : (
                  "VIEW"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionTables({ sections }) {
  return (
    <>
      {sections.map((section) => (
        <div key={section.heading} style={{ marginBottom: 28 }}>
          <h4>{section.heading}</h4>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Description</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.metric}>
                    <td>{row.metric}</td>
                    <td>{row.type}</td>
                    <td>{row.weight}</td>
                    <td>{row.desc}</td>
                    <td>
                      {row.url ? (
                        <a href={row.url} target="_blank" rel="noopener" style={{ color: "var(--rs-theme-blue)", fontWeight: 600 }}>
                          VIEW
                        </a>
                      ) : (
                        "VIEW"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

export default function NAACPage() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [activeCycle, setActiveCycle] = useState(null);

  const category = CATEGORIES.find((c) => c.id === activeCat);
  const cycleDoc =
    category.type === "cycle-pdf" ? category.cycles.find((c) => c.label === activeCycle) || category.cycles[category.cycles.length - 1] : null;

  function selectCategory(cat) {
    setActiveCat(cat.id);
    setActiveCycle(null);
  }

  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>IQAC</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>NAAC</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            NAAC &ndash; Self Study Report (Cycle II)
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => selectCategory(cat)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              <h3>{category.title}</h3>

              {category.type === "pdf" && (
                <div className="tjs-approvals-viewer">
                  <iframe key={category.url} src={category.url} title={category.title} />
                </div>
              )}

              {category.type === "cycle-pdf" && (
                <>
                  <div className="tjs-approvals-year-tabs-row">
                    <div className="tjs-approvals-year-tabs">
                      {category.cycles.map((cycle) => (
                        <button
                          key={cycle.label}
                          type="button"
                          className={"tjs-approvals-year" + (cycleDoc.label === cycle.label ? " active" : "")}
                          onClick={() => setActiveCycle(cycle.label)}
                        >
                          {cycle.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="tjs-approvals-viewer">
                    <iframe key={cycleDoc.url} src={cycleDoc.url} title={category.title + " " + cycleDoc.label} />
                  </div>
                </>
              )}

              {category.type === "table" && <MetricTable rows={category.rows} />}

              {category.type === "sections" && <SectionTables sections={category.sections} />}

              {category.type === "code-of-conduct" && (
                <div className="tjs-committee-body">
                  <h4>Working Hours</h4>
                  <div className="tjs-dept-table-wrap">
                    <table className="tjs-dept-table">
                      <thead>
                        <tr>
                          <th>Section</th>
                          <th>Days</th>
                          <th>Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>College</td>
                          <td>Monday to Saturday</td>
                          <td>9.00 am – 3.15 pm</td>
                        </tr>
                        <tr>
                          <td>Office</td>
                          <td>Monday to Saturday</td>
                          <td>9.00 am – 4.30 pm</td>
                        </tr>
                        <tr>
                          <td>Library</td>
                          <td>Monday to Saturday</td>
                          <td>9.00 am – 4.30 pm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4>General Student Rules</h4>
                  <ul>
                    <li>Maintain cleanliness on campus and treat staff and fellow students with respect; ragging in any form is strictly prohibited.</li>
                    <li>Be punctual to classes and maintain a minimum of 75% attendance as required for Anna University examinations.</li>
                    <li>Wear the prescribed uniform during laboratory sessions.</li>
                    <li>Maintain discipline and conduct during examinations.</li>
                    <li>Usage of mobile phones is strictly prohibited inside the classroom.</li>
                  </ul>

                  <h4>Hostel Student Rules</h4>
                  <ul>
                    <li>Students must remain under warden supervision and follow restrictions on leaving the hostel premises.</li>
                    <li>Smoking and consumption of alcohol are strictly banned.</li>
                    <li>Ragging in any form is strictly prohibited.</li>
                  </ul>

                  <h4>Teaching and Non-Teaching Staff Rules</h4>
                  <ul>
                    <li>Perform assigned duties with sincerity and professionalism.</li>
                    <li>Maintain impartiality in assessment and evaluation of students.</li>
                    <li>Uphold non-discrimination in all interactions with students and colleagues.</li>
                    <li>Carry a valid institutional identity card at all times on campus.</li>
                  </ul>
                </div>
              )}

              {category.type === "capacity-building" && (
                <div className="tjs-committee-body">
                  {category.groups.map((group) => (
                    <div key={group.heading} style={{ marginBottom: 24 }}>
                      <h4>{group.heading}</h4>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.title}>
                            {item.title} &ndash; {item.date}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {category.type === "stakeholders-feedback" && (
                <div className="tjs-committee-body">
                  <h4>Feedback Forms</h4>
                  <div className="tjs-dept-link-list">
                    {STAKEHOLDER_FORMS.map((f) => (
                      <a href={f.url} target="_blank" rel="noopener" key={f.label}>
                        <span>{f.label}</span>
                        <span className="tjs-dept-link-arrow">
                          <i className="ri-external-link-line"></i>
                        </span>
                      </a>
                    ))}
                  </div>

                  <h4 style={{ marginTop: 24 }}>Feedback Documents</h4>
                  <div className="tjs-dept-link-list">
                    {STAKEHOLDER_DOCS.map((d) => (
                      <a href={d.url} target="_blank" rel="noopener" key={d.label}>
                        <span>{d.label}</span>
                        <span className="tjs-dept-link-arrow">
                          <i className="ri-file-pdf-2-line"></i>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {category.type === "peer-visit" && (
                <div className="tjs-committee-body">
                  <p>The NAAC Peer Team visited T.J.S Engineering College on 30th September and 1st October 2024 as part of the 2nd Cycle of Accreditation.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
