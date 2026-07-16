export interface Sponsor {
  name: string;
  logoUrl?: string; // Optional: fallback to named text logo if logo image is missing
  websiteUrl: string;
  tier?: "Title" | "Platinum" | "Gold" | "Associate";
}

export interface SponsorsData {
  valueProposition: string;
  sponsorshipDeckUrl: string;
  tiers: {
    title: Sponsor[];
    platinum: Sponsor[];
    gold: Sponsor[];
    associate: Sponsor[];
  };
}

export const sponsorsData: SponsorsData = {
  valueProposition: "Sponsoring AARG offers companies a unique opportunity to connect with high-caliber engineering talent, feature branding on cutting-edge UAV test aircraft, and support research in autonomous flight technology. Our partners play an integral role in our competitive success.",
  sponsorshipDeckUrl: "/documents/AARG_Sponsorship_Deck_Placeholder.pdf",
  tiers: {
    title: [
      {
        name: "[TITLE SPONSOR]",
        websiteUrl: "https://example.com/title-sponsor",
      }
    ],
    platinum: [
      {
        name: "[PLATINUM SPONSOR 1]",
        websiteUrl: "https://example.com/platinum-1",
      },
      {
        name: "[PLATINUM SPONSOR 2]",
        websiteUrl: "https://example.com/platinum-2",
      }
    ],
    gold: [
      {
        name: "[GOLD SPONSOR 1]",
        websiteUrl: "https://example.com/gold-1",
      },
      {
        name: "[GOLD SPONSOR 2]",
        websiteUrl: "https://example.com/gold-2",
      },
      {
        name: "[GOLD SPONSOR 3]",
        websiteUrl: "https://example.com/gold-3",
      }
    ],
    associate: [
      {
        name: "[ASSOCIATE SPONSOR 1]",
        websiteUrl: "https://example.com/associate-1",
      },
      {
        name: "[ASSOCIATE SPONSOR 2]",
        websiteUrl: "https://example.com/associate-2",
      }
    ]
  }
};
