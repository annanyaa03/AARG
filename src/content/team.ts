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
      name: "[TEAM CAPTAIN NAME]",
      role: "Team Captain / President",
      subteam: "Leadership",
      linkedinUrl: "https://linkedin.com/in/[CAPTAIN_LINKEDIN]",
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
      name: "[FACULTY ADVISOR NAME]",
      role: "Faculty Advisor",
      subteam: "Faculty Advisor",
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
      { name: "[MEMBER NAME 1]", role: "Aerodynamicist", subteam: "Aerodynamics & Design" },
      { name: "[MEMBER NAME 2]", role: "CAD Modeler", subteam: "Aerodynamics & Design" },
      { name: "[MEMBER NAME 3]", role: "CFD Analyst", subteam: "Aerodynamics & Design" }
    ],
    "Structures & Fabrication": [
      { name: "[MEMBER NAME 4]", role: "Structural Engineer", subteam: "Structures & Fabrication" },
      { name: "[MEMBER NAME 5]", role: "Composite Specialist", subteam: "Structures & Fabrication" },
      { name: "[MEMBER NAME 6]", role: "Fabrication Technician", subteam: "Structures & Fabrication" }
    ],
    "Avionics & Controls": [
      { name: "[MEMBER NAME 7]", role: "Hardware-in-the-Loop Developer", subteam: "Avionics & Controls" },
      { name: "[MEMBER NAME 8]", role: "Control Laws Engineer", subteam: "Avionics & Controls" },
      { name: "[MEMBER NAME 9]", role: "Embedded Systems Specialist", subteam: "Avionics & Controls" }
    ],
    "Manufacturing & Propulsion": [
      { name: "[MEMBER NAME 10]", role: "Propulsion Specialist", subteam: "Manufacturing & Propulsion" },
      { name: "[MEMBER NAME 11]", role: "CNC Machinist", subteam: "Manufacturing & Propulsion" },
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
