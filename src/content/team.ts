export interface TeamMember {
  name: string;
  role: string;
  subteam: Subteam;
  photoUrl?: string; // Optional: if missing, initials-avatar is generated
  linkedinUrl?: string;
}

export type Subteam = 
  | "Leadership"
  | "Faculty Advisor"
  | "Aerodynamics & Design"
  | "Structures & Fabrication"
  | "Avionics & Controls"
  | "Manufacturing & Propulsion"
  | "Business & Sponsorship"
  | "Alumni";

export interface TeamData {
  leadership: TeamMember[];
  faculty: TeamMember[];
  leads: TeamMember[];
  members: Record<string, TeamMember[]>;
  alumni: {
    name: string;
    role: string;
    classYear: string;
    linkedinUrl?: string;
  }[];
}

export const teamData: TeamData = {
  leadership: [
    {
      name: "Aryan Basnet",
      role: "Team Captain / President",
      subteam: "Leadership",
      linkedinUrl: "https://www.linkedin.com/in/aryan-basnet-446973235/",
    },
    {
      name: "[SYSTEMS ENGINEER NAME]",
      role: "Vice-Captain / Systems Engineer",
      subteam: "Leadership",
      linkedinUrl: "https://linkedin.com/in/[SYSTEMS_LINKEDIN]",
    }
  ],
  faculty: [
    {
      name: "Mr Rahul Jadhav",
      role: "Faculty Advisor",
      subteam: "Faculty Advisor",
      linkedinUrl: "https://www.linkedin.com/in/rahul-jadhav-9571641b3/",
    }
  ],
  leads: [
    {
      name: "[AERODYNAMICS LEAD NAME]",
      role: "Aerodynamics & Design Lead",
      subteam: "Aerodynamics & Design",
      linkedinUrl: "https://linkedin.com/in/[AERO_LEAD_LINKEDIN]",
    },
    {
      name: "[STRUCTURES LEAD NAME]",
      role: "Structures & Fabrication Lead",
      subteam: "Structures & Fabrication",
      linkedinUrl: "https://linkedin.com/in/[STRUCT_LEAD_LINKEDIN]",
    },
    {
      name: "[AVIONICS LEAD NAME]",
      role: "Avionics & Controls Lead",
      subteam: "Avionics & Controls",
      linkedinUrl: "https://linkedin.com/in/[AVIONICS_LEAD_LINKEDIN]",
    },
    {
      name: "[PROPULSION LEAD NAME]",
      role: "Manufacturing & Propulsion Lead",
      subteam: "Manufacturing & Propulsion",
      linkedinUrl: "https://linkedin.com/in/[PROP_LEAD_LINKEDIN]",
    },
    {
      name: "[BUSINESS LEAD NAME]",
      role: "Business & Sponsorship Lead",
      subteam: "Business & Sponsorship",
      linkedinUrl: "https://linkedin.com/in/[BUSINESS_LEAD_LINKEDIN]",
    }
  ],
  members: {
    "Aerodynamics & Design": [
      { name: "Siddhesh Kavitkar", role: "Aerodynamicist", subteam: "Aerodynamics & Design", linkedinUrl: "https://www.linkedin.com/in/siddhesh-kavitkar-1a3469339/" },
      { name: "Hitesh Patil", role: "CAD Modeler", subteam: "Aerodynamics & Design", linkedinUrl: "https://www.linkedin.com/in/hitesh-patil07/" },
      { name: "Pushkar Lokhande", role: "CFD Analyst", subteam: "Aerodynamics & Design", linkedinUrl: "https://www.linkedin.com/in/pushkar-lokhande-246b11311/" }
    ],
    "Structures & Fabrication": [
      { name: "Shreyas Kharade", role: "Structural Engineer", subteam: "Structures & Fabrication" },
      { name: "Somshekhar Hunasimarad", role: "Composite Specialist", subteam: "Structures & Fabrication", linkedinUrl: "https://www.linkedin.com/in/somshekhar-hunasimarad/" },
      { name: "Vishwank Ramji", role: "Fabrication Technician", subteam: "Structures & Fabrication", linkedinUrl: "https://www.linkedin.com/in/vishwank-ramji-6031a0359/" }
    ],
    "Avionics & Controls": [
      { name: "HArshvardhan Karkera", role: "Hardware-in-the-Loop Developer", subteam: "Avionics & Controls", linkedinUrl: "https://www.linkedin.com/in/harshvardhan-karkera-70479b386/" },
      { name: "Sarthak Chikte", role: "Control Laws Engineer", subteam: "Avionics & Controls", linkedinUrl: "https://www.linkedin.com/in/sarthak-chikte-ba8780291/" },
      { name: "Sharal Vishvakarma", role: "Embedded Systems Specialist", subteam: "Avionics & Controls", linkedinUrl: "https://www.linkedin.com/in/sharal-vishvkarma-b194792bb/" }
    ],
    "Manufacturing & Propulsion": [
      { name: "Aaron Mobby", role: "Propulsion Specialist", subteam: "Manufacturing & Propulsion", linkedinUrl: "https://www.linkedin.com/in/aaron-mobby-5819a0289/" },
      { name: "Nandini Gheware", role: "CNC Machinist", subteam: "Manufacturing & Propulsion", linkedinUrl: "https://www.linkedin.com/in/nandini-gheware-287400386/" },
      { name: "[MEMBER NAME 12]", role: "Quality Engineer", subteam: "Manufacturing & Propulsion" }
    ],
    "Business & Sponsorship": [
      { name: "[MEMBER NAME 13]", role: "Media & PR Head", subteam: "Business & Sponsorship" },
      { name: "[MEMBER NAME 14]", role: "Financial Operations Head", subteam: "Business & Sponsorship" },
      { name: "[MEMBER NAME 15]", role: "Logistics Manager", subteam: "Business & Sponsorship" }
    ]
  },
  alumni: [
    {
      name: "[ALUMNI NAME 1]",
      role: "Former Team Captain",
      classYear: "Class of 2025",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_1_LINKEDIN]",
    },
    {
      name: "[ALUMNI NAME 2]",
      role: "Former Avionics Lead",
      classYear: "Class of 2024",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_2_LINKEDIN]",
    },
    {
      name: "[ALUMNI NAME 3]",
      role: "Former Aerodynamics Lead",
      classYear: "Class of 2023",
      linkedinUrl: "https://linkedin.com/in/[ALUMNI_3_LINKEDIN]",
    }
  ]
};
