AARG — Advanced Aerial Robotics Group

Official website of the Advanced Aerial Robotics Group (AARG), a student-led engineering team dedicated to autonomous aviation. AARG brings together students across disciplines to design, manufacture, program, and fly competitive unmanned aerial vehicles (UAVs).

This repository contains the source code for the team's public website, built with Next.js.

About AARG

The Advanced Aerial Robotics Group (AARG) is a student-led engineering team focused on autonomous aviation. The team designs, manufactures, programs, and flies competitive unmanned aerial vehicles (UAVs), bringing together students from multiple engineering disciplines under one program. AARG is based out of Pune, Maharashtra, India.

The team operates across five core technical domains, each responsible for a distinct part of the UAV development pipeline:

DomainFocusRepresentative ToolsAerodynamics & DesignAirfoil optimization, stability analysis, CFD simulation, and flight envelope estimationANSYS Fluent, XFLR5, OpenFOAM, MATLABStructures & FabricationAirframe engineering, FEA, composite layups, and weight/CG trackingSolidWorks, ANSYS Mechanical, Fusion 360, Autodesk InventorAvionics & ControlsFlight computer firmware, sensor integration, custom PCB design, and HIL/SIL simulationAltium Designer, QGroundControl, Mission Planner, ROS, C++, PythonPropulsion & PowerMotor/propeller characterization, battery management, and ESC thermal performanceRCbenchmark, eCalc, thermal imagers, data loggersBusiness & SponsorshipCorporate outreach, budgeting, media, and competition logisticsAdobe Creative Suite, Slack, Excel, Trello, Figma

Vehicles

AARG designs and builds multiple UAV platforms for different competition classes, including:


Phoenix-V1 — a modular fixed-wing cargo UAV built for SAE Aero Design East (Micro Class), featuring quick-lock wings that pack into a compact transit box and a high-lift composite airframe for heavy-payload autonomous flight.
Ares-X8 — a coaxial heavy-lift octocopter built for the SAE India Drone Design Challenge, designed for autonomous package delivery with a full carbon-fiber frame, redundant GPS, obstacle avoidance, and a custom payload-drop mechanism.


Achievements


Winners, Mahahackathon Challenge 1.0 (2025) — organized under MeitY, Bhashini, and the Government of Maharashtra, addressing the use of drones in disaster management.
All India Rank 24 (Ignite category), NIDAR 2025 — the National Innovation Challenge for Drone Application & Research, competing against 300+ student teams nationwide.
Shortlisted, ISRO IROC-U Prelims — the Indian Rover Operations Challenge for universities.


Team Structure

The team is organized into a Leadership tier (Team Captain/President, Vice-Captain/Systems Engineer), a Faculty Advisor, domain Leads, domain Members, and an Alumni network spanning past graduating cohorts.

Overview

The site showcases AARG's mission, technical domains, vehicles, achievements, gallery, and sponsorship information, and provides a channel for recruitment and contact inquiries. It is a static, statically-exported marketing and information site rather than an application with a backend.

Tech Stack


Framework: Next.js 16 (App Router)
Language: TypeScript
UI Library: React 19
Styling: Tailwind CSS 4
Animation: Framer Motion
Icons: lucide-react
Linting: ESLint (Next.js config)


Project Structure

AARG-main/
├── src/
│   ├── app/                 # App Router pages (home, about, team, projects, gallery, etc.)
│   ├── components/          # Reusable UI and animation components
│   └── content/             # Structured content and configuration (site info, team, domains, etc.)
├── public/                  # Static assets (images, icons)
├── .github/workflows/       # CI workflows
├── next.config.ts           # Next.js configuration (static export)
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint configuration
└── package.json

Key Pages

RouteDescription/Landing page/aboutAbout the team/teamTeam members/projectsOngoing and past projects/achievementsCompetition results and milestones/galleryPhoto gallery/sponsorsSponsorship information/joinRecruitment/contactContact details

Getting Started

Prerequisites


Node.js 18.18 or later
npm (or an equivalent package manager: yarn, pnpm, bun)


Installation

bashgit clone https://github.com/<your-organization>/AARG.git
cd AARG
npm install

Development

Start the local development server:

bashnpm run dev

Open http://localhost:3000 in your browser to view the site. The page auto-updates as you edit files under src/app.

Linting

bashnpm run lint

Production Build

This project is configured for static export (output: "export" in next.config.ts). To build the site:

bashnpm run build

The static output will be generated in the out/ directory, ready to be deployed to any static hosting provider.

Configuration

All editable content lives in src/content/ as typed TypeScript data files, so the site can be updated without touching page markup:

FileContentssite.tsOrganization name, tagline, description, contact details, location, social links, and headline statisticsdomains.tsTechnical domain descriptions, responsibilities, and toolsteam.tsLeadership, faculty advisor, domain leads, members, and alumnivehicles.tsUAV platform names, categories, competitions, features, and specificationsachievements.tsCompetition awards and the flagship achievement spotlightgallery.tsPhoto gallery entries, categorized as flight, build, or competition

Some fields in site.ts (college name, department, lab room, city, state, pincode, social handles, recruitment form URL, sponsorship deck URL) are currently placeholders and should be replaced with accurate, up-to-date information before the site is deployed publicly.

Contributing


Create a new branch for your feature or fix.
Make your changes and ensure npm run lint passes.
Verify the site builds successfully with npm run build.
Open a pull request describing your changes.


License

This project is proprietary to the Advanced Aerial Robotics Group. All rights reserved unless otherwise stated.

Contact

For questions regarding this project or the team, refer to the contact details listed on the /contact page of the site.
