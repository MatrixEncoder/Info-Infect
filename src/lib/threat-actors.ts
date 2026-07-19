// ─── Threat Actors Database ───────────────────────────────────────

export interface ThreatActor {
  id: string;
  name: string;
  aliases: string[];
  origin: string;
  type: "nation-state" | "criminal" | "hacktivist" | "unknown";
  active: boolean;
  firstSeen: string;
  description: string;
  targets: string[];
  tools: string[];
  ttps: string[]; // MITRE ATT&CK technique IDs
  recentActivity: string;
  image?: string;
}

export const THREAT_ACTORS: ThreatActor[] = [
  {
    id: "lazarus-group",
    name: "Lazarus Group",
    aliases: ["Hidden Cobra", "Zinc", "Labyrinth Chollima"],
    origin: "North Korea (DPRK)",
    type: "nation-state",
    active: true,
    firstSeen: "2009",
    description: "A multi-faceted threat actor attributed to North Korea's Reconnaissance General Bureau (RGB). Known for financial theft, espionage, and destructive attacks. Responsible for the WannaCry ransomware, Bangladesh Bank heist, and multiple cryptocurrency exchange hacks totaling over $2B in losses.",
    targets: ["Financial Services", "Cryptocurrency", "Defense", "Healthcare", "Technology"],
    tools: ["AppleJeus", "Fallchill", "Manuscrypt", "DTrack", "Operation DreamJob"],
    ttps: ["T1566", "T1059", "T1071", "T1105", "T1486", "T1027"],
    recentActivity: "June 2026 — Targeted cryptocurrency firms with fake job offer malware campaigns via LinkedIn.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80",
  },
  {
    id: "apt29",
    name: "APT29",
    aliases: ["Cozy Bear", "The Dukes", "NOBELIUM", "Midnight Blizzard"],
    origin: "Russia (SVR)",
    type: "nation-state",
    active: true,
    firstSeen: "2008",
    description: "A sophisticated threat actor attributed to Russia's Foreign Intelligence Service (SVR). Known for long-term persistent access, supply chain attacks, and targeting government and diplomatic organizations. Notable for SolarWinds supply chain compromise.",
    targets: ["Government", "Diplomatic", "Think Tanks", "Healthcare", "IT Service Providers"],
    tools: ["WellMess", "WellMail", "BerryRope", "CozyDuke", "SUNBURST"],
    ttps: ["T1195", "T1078", "T1557", "T1053", "T1098", "T1550"],
    recentActivity: "May 2026 — Exploited Microsoft Azure vulnerabilities for persistent cloud access in European government networks.",
  },
  {
    id: "lockbit",
    name: "LockBit",
    aliases: ["LockBit 3.0", "LockBit Black", "ABCD"],
    origin: "Russia",
    type: "criminal",
    active: true,
    firstSeen: "2019",
    description: "The most prolific ransomware-as-a-service (RaaS) operation globally. Known for aggressive double-extortion tactics, targeting organizations of all sizes. Despite law enforcement disruption in Feb 2024, affiliates continue operations.",
    targets: ["Manufacturing", "Healthcare", "Government", "Education", "Critical Infrastructure"],
    tools: ["LockBit Black", "StealBit", "BitLocker", "Group Policy Modification"],
    ttps: ["T1486", "T1490", "T1489", "T1482", "T1021", "T1059"],
    recentActivity: "July 2026 — LockBit affiliates launched attacks against 3 European pharmaceutical companies using new encryptor variant.",
  },
  {
    id: "kimsuky",
    name: "Kimsuky",
    aliases: ["Velvet Chollima", "AppleWorm", "Black Banshee"],
    origin: "North Korea (RGB)",
    type: "nation-state",
    active: true,
    firstSeen: "2012",
    description: "A North Korean threat actor focused on intelligence gathering against South Korea, Japan, and the United States. Specializes in social engineering, spear-phishing, and credential harvesting.",
    targets: ["Government", "Think Tanks", "Education", "Media", "Nuclear Policy"],
    tools: ["Kunspy", "BabyShark", "AppleSeed", "GoGoogle", "ScatterBee"],
    ttps: ["T1566", "T1059", "T1071", "T1105", "T1056", "T1003"],
    recentActivity: "July 2026 — Spear-phishing campaign targeting nuclear policy researchers with fake conference invitations.",
  },
  {
    id: "scattered-spider",
    name: "Scattered Spider",
    aliases: ["Scatterhun", "UNC3944", "Octo Tempest"],
    origin: "International",
    type: "criminal",
    active: true,
    firstSeen: "2022",
    description: "A social engineering-focused threat actor group known for SIM swapping, help desk impersonation, and MFA bypass. Responsible for high-profile breaches of MGM Resorts, Caesars, and Okta.",
    targets: ["Hospitality", "Technology", "Telecommunications", "Critical Infrastructure"],
    tools: ["Social Engineering", "SIM Swapping", "Alcatraz", "Cobalt Strike", "Nighthawk"],
    ttps: ["T1566", "T1539", "T1556", "T1078", "T1133", "T1021"],
    recentActivity: "June 2026 — Breached a major US telecom provider through help desk social engineering.",
  },
  {
    id: "apt41",
    name: "APT41",
    aliases: ["Double Dragon", "Winnti", "Barium", "Wicked Panda"],
    origin: "China (MSS)",
    type: "nation-state",
    active: true,
    firstSeen: "2012",
    description: "A Chinese threat actor that conducts both state-sponsored espionage and financially motivated operations. Unique for targeting gaming industry alongside government entities.",
    targets: ["Healthcare", "Telecommunications", "Technology", "Gaming", "Education"],
    tools: ["ShadowPad", "Deadeye", "CrossWalk", "HIGHNOON", "PlugX"],
    ttps: ["T1195", "T1059", "T1071", "T1105", "T1560", "T1027"],
    recentActivity: "April 2026 — Supply chain attack through compromised software update mechanism in healthcare sector.",
  },
];

export function getThreatActor(id: string): ThreatActor | undefined {
  return THREAT_ACTORS.find((a) => a.id === id);
}

export function getThreatActorsByType(type: ThreatActor["type"]): ThreatActor[] {
  return THREAT_ACTORS.filter((a) => a.type === type);
}
