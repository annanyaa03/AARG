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
      id: "best-design-2025",
      title: "Best Design Award",
      rank: "1st Place",
      competition: "SAE India Drone Design Challenge",
      year: "2025",
      location: "[COMPETITION LOCATION]",
      description: "Recognized for structural efficiency and fluid dynamic modeling of our heavy-lift coaxial quadcopter, Ares-X8, highlighting our carbon fiber structural spar design.",
    },
    {
      id: "overall-performance-2024",
      title: "Overall Performance Ranking",
      rank: "3rd Place Overall",
      competition: "SAE Aero Design East – Micro Class",
      year: "2024",
      location: "[COMPETITION LOCATION]",
      description: "Scored high marks for combined payload weight lifted, speed efficiency ratios, and accurate flight prediction analytics during physical flight rounds.",
    },
    {
      id: "innovative-payload-2024",
      title: "Innovative Payload Mechanism Award",
      rank: "Special Recognition",
      competition: "SAE India Drone Design Challenge",
      year: "2024",
      location: "[COMPETITION LOCATION]",
      description: "Awarded for a custom-built mechanical servo latch and sliding rails system that allows autonomous payload delivery without manual intervention.",
    },
    {
      id: "tech-report-2023",
      title: "Technical Report Excellence",
      rank: "2nd Place",
      competition: "SAE Aero Design East – Micro Class",
      year: "2023",
      location: "[COMPETITION LOCATION]",
      description: "Evaluated by industry aerospace reviewers for the depth of our Finite Element Analysis (FEA), wing structural testing logs, and mathematical flight simulators.",
    }
  ],
  spotlight: {
    title: "Flagship Achievement: The 2024 SAE Flight Campaign",
    subtitle: "How our modular Phoenix-V1 UAV conquered the heavy payload challenge in competitive wind conditions.",
    narrative: [
      "The 2024 flight rounds presented a grueling challenge: high, gusty crosswinds exceeding 18 knots, and a strict requirement to lift a heavy cargo payload and execute a full autonomous flight path within a tight 3-minute window.",
      "Our team deployed Phoenix-V1. Thanks to its modular design, the aircraft was assembled and systems checked in just 1 minute and 45 seconds. Utilizing dynamic autopilot tuning adjusted on the flight line for the wind conditions, the UAV executed a flawless autonomous takeoff, completed the cargo route, and landed within the boundary lines.",
      "The successful flight rounds secured us a spot on the international podium, proving that our predictive aerodynamic and structural CFD models matched the actual flight dynamics within a 3% error margin."
    ],
    metrics: [
      { label: "Cargo Weight Lifted", value: "3.7 kg" },
      { label: "Assembly Time Logged", value: "1m 45s" },
      { label: "Autopilot Flight Accuracy", value: "98.8%" },
      { label: "Predictive Model Margin of Error", value: "< 3.0%" }
    ]
  }
};
