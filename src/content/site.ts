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
  description: "Advanced Aerial Robotics Group (AARG) is a student-led engineering team dedicated to autonomous aviation, bringing together students across disciplines to design, manufacture, program, and fly competitive UAVs.",
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
  email: "[CONTACT EMAIL]",
  phone: "[CONTACT PHONE]",
  recruitmentFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfRecruitmentMock/viewform",
  sponsorshipDeckUrl: "#", // Direct download or internal static file path
  socials: {
    instagram: "https://instagram.com/[INSTAGRAM_HANDLE]",
    linkedin: "https://linkedin.com/company/[LINKEDIN_COMPANY]",
    youtube: "https://youtube.com/c/[YOUTUBE_CHANNEL]",
    github: "https://github.com/[GITHUB_ORGANIZATION]"
  }
};
