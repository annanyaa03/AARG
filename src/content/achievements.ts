export interface Award {
  id: string;
  title: string;
  rank: string;
  competition: string;
  year: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface SpotlightStory {
  title: string;
  subtitle: string;
  narrative: string[];
  metrics: { label: string; value: string }[];
}

export interface AchievementsData {
  awards: Award[];
  spotlight: SpotlightStory;
}

export const achievementsData: AchievementsData = {
  awards: [
    {
      id: "mahahackathon-2025",
      title: "Winners — Mahahackathon Challenge 1.0",
      rank: "Winners",
      competition: "Mahahackathon Challenge 1.0 (MeitY, Bhashini & Govt. of Maharashtra)",
      year: "2025",
      location: "Maharashtra, India",
      description: "Won the Mahahackathon Challenge 1.0 organized under MeitY, Bhashini and the Government of Maharashtra in the Problem Statement of Use of Drones in Disaster Management.",
      imageUrl: "/images/maha hackathon.png",
    },
    {
      id: "nidar-2025",
      title: "AIR 24 — NIDAR 2025",
      rank: "AIR 24 (Ignite)",
      competition: "National Innovation Challenge for Drone Application & Research (NIDAR-2025)",
      year: "2025",
      location: "India",
      description: "Secured All India Rank 24 in the Ignite category out of 300+ student drone teams from across the nation in the 2025 edition of NIDAR, a premier national-level drone innovation challenge.",
      imageUrl: "/images/nidar.png",
    },
    {
      id: "isro-iroc-u",
      title: "ISRO IROC-U — Prelims Shortlisted",
      rank: "Shortlisted",
      competition: "ISRO IROC-U (ISRO Robotics Challenge — University)",
      year: "2025",
      location: "India",
      description: "Shortlisted from the Prelims stage of the ISRO Robotics Challenge for universities, demonstrating the team's capability in space robotics and rover system design.",
      imageUrl: "/images/isro iroc.png",
    },
  ],
  spotlight: {
    title: "Flagship Achievement: Mahahackathon Challenge 1.0 Winners",
    subtitle: "Drones for Disaster Management — solving real-world problems under MeitY, Bhashini & Govt. of Maharashtra.",
    narrative: [
      "AARG emerged as the winners of the Mahahackathon Challenge 1.0, a prestigious national-level hackathon organized under the Ministry of Electronics and Information Technology (MeitY), Bhashini, and the Government of Maharashtra.",
      "Our team tackled the critical problem statement of Use of Drones in Disaster Management, developing an innovative drone-based solution designed to enhance rapid response, aerial reconnaissance, and resource delivery during natural disasters.",
      "This victory underscores AARG's commitment to applying aerial robotics technology to high-impact, real-world challenges — bridging the gap between academic innovation and national-scale problem solving.",
    ],
    metrics: [
      { label: "Competition", value: "Mahahackathon 1.0" },
      { label: "Organized By", value: "MeitY / Bhashini" },
      { label: "Problem Statement", value: "Drones in Disaster Mgmt" },
      { label: "Result", value: "Winners" },
    ],
  },
};
