export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: string;
  competition: string;
  description: string;
  features: string[];
  specs: VehicleSpec[];
}

export const vehicles: Vehicle[] = [
  {
    id: "fixed-wing-micro",
    name: "Phoenix-V1 (Fixed-Wing)",
    category: "Cargo UAV",
    competition: "SAE Aero Design East – Micro Class",
    description: "Phoenix-V1 is a modular cargo aircraft engineered to pack into a compact transit box and assemble in under 3 minutes. It features an optimized high-lift airfoil and composite spar layout for autonomous heavy-payload flight operations.",
    features: [
      "Modular quick-lock wings and tail joints",
      "Packs completely into a custom 24x12x12 inch transit box",
      "Custom carbon fiber composite landing gear",
      "Autonomous flight path tracking with telemetry fail-safes"
    ],
    specs: [
      { label: "Wingspan", value: "1.25 m" },
      { label: "Empty Weight", value: "1.8 kg" },
      { label: "MTOW (Max Takeoff Weight)", value: "5.5 kg" },
      { label: "Max Payload Capacity", value: "3.7 kg" },
      { label: "Cruising Speed", value: "14.5 m/s" },
      { label: "Propulsion System", value: "Custom Brushless Outrunner Electric Motor" },
      { label: "Battery Specification", value: "3S 2200mAh 45C LiPo" }
    ]
  },
  {
    id: "heavy-lift-octocopter",
    name: "Ares-X8 (Coaxial Multirotor)",
    category: "Heavy-Lift Octocopter",
    competition: "SAE India Drone Design Challenge",
    description: "Ares-X8 is an autonomous package-delivery octocopter with coaxial motor configurations, built on a robust full carbon fiber frame. It is tailored for logistics operations, including automated payload locking, cargo delivery, and return-to-home algorithms.",
    features: [
      "Coaxial motor mountings for high thrust-to-volume ratio",
      "Carbon fiber plate and tube structural frame",
      "Custom-designed mechanical payload drop system",
      "Obstacle avoidance sensors and dual redundant GPS receivers"
    ],
    specs: [
      { label: "Frame Size (Diagonal)", value: "850 mm" },
      { label: "Empty Weight", value: "4.5 kg" },
      { label: "MTOW (Max Takeoff Weight)", value: "12.0 kg" },
      { label: "Max Payload Capacity", value: "7.5 kg" },
      { label: "Flight Time (Empty)", value: "32 mins" },
      { label: "Flight Time (Max Payload)", value: "15 mins" },
      { label: "Flight Controller", value: "Pixhawk 6X (PX4 Autopilot Firmware)" }
    ]
  }
];
