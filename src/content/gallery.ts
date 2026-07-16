export interface GalleryItem {
  id: string;
  title: string;
  category: "flight" | "build" | "competition";
  description: string;
  imageUrl: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "flight-1",
    title: "Phoenix-V1 Cruise Phase",
    category: "flight",
    description: "Autonomous flight path validation and cruising speed test in steady wind conditions.",
    imageUrl: "/images/gallery_flight_1.png",
  },
  {
    id: "build-1",
    title: "Coaxial Motor Alignment",
    category: "build",
    description: "Aligning the coaxial brushless motors on the Ares-X8 carbon fiber arms.",
    imageUrl: "/images/gallery_build_1.png",
  },
  {
    id: "competition-1",
    title: "SAE Flight Line Setup",
    category: "competition",
    description: "Pre-flight checks and hardware diagnostic tests in the competition hangar.",
    imageUrl: "/images/gallery_competition_1.png",
  },
  {
    id: "flight-2",
    title: "Ares-X8 Hover Verification",
    category: "flight",
    description: "Verifying low-altitude PID controls and payload locking stability.",
    imageUrl: "/images/gallery_flight_2.png",
  },
  {
    id: "build-2",
    title: "Carbon Fiber Wing Spar Layup",
    category: "build",
    description: "Vacuum bagging process for the main structural wing spar assembly.",
    imageUrl: "/images/gallery_build_2.png",
  },
  {
    id: "competition-2",
    title: "Technical Presentation Panel",
    category: "competition",
    description: "Defending our structural design and flight performance prediction model before judges.",
    imageUrl: "/images/gallery_competition_2.png",
  }
];
