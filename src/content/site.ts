export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  foundingYear: string;
  memberCount: string;
  yearsActive: string;
  competitionsWon: string;
  college: string;
  department: string;
  labRoom: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  phone: string;
  recruitmentFormUrl: string;
  sponsorshipDeckUrl: string;
  socials: {
    instagram: string;
    linkedin: string;
    youtube: string;
    github?: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "AARG",
  tagline: "Designing, building, and flying next-generation UAVs for student competitions",
  description: "AARG is a student-led engineering team within AISSMS IOIT's Drone club dedicated to autonomous aviation, building high-performance fixed-wing aircraft and heavy-lift multirotor drones for prestigious competitions.",
  foundingYear: "[FOUNDING YEAR]",
  memberCount: "40+",
  yearsActive: "5+",
  competitionsWon: "6+",
  college: "[COLLEGE NAME]",
  department: "[DEPARTMENT NAME]",
  labRoom: "[LAB ROOM OR WORKSPACE ID]",
  city: "[CITY]",
  state: "[STATE]",
  pincode: "[PINCODE]",
  email: "aryanbasnet2005@gmail.com",
  phone: "8218397502",
  recruitmentFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfRecruitmentMock/viewform",
  sponsorshipDeckUrl: "#", // Direct download or internal static file path
  socials: {
    instagram: "https://instagram.com/[INSTAGRAM_HANDLE]",
    linkedin: "https://linkedin.com/company/[LINKEDIN_COMPANY]",
    youtube: "https://youtube.com/c/[YOUTUBE_CHANNEL]",
    github: "https://github.com/[GITHUB_ORGANIZATION]"
  }
};
