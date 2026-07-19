import { Metadata } from "next";
import { ExternalLink, Wrench, BookOpen, Shield, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Tooling & Research | Info-Infect",
  description: "Essential cybersecurity tools, research papers, and open-source intelligence resources.",
};

const toolCategories = [
  {
    title: "Network Analysis",
    icon: <Radio className="h-4 w-4" />,
    tools: [
      { name: "Wireshark", url: "https://www.wireshark.org/", desc: "Network protocol analyzer for deep packet inspection" },
      { name: "Zeek (Bro)", url: "https://zeek.org/", desc: "Network security monitoring and traffic analysis" },
      { name: "NetworkMiner", url: "https://www.netresec.com/?page=NetworkMiner", desc: "Network forensic analysis tool" },
      { name: "tcpdump", url: "https://www.tcpdump.org/", desc: "Command-line packet capture tool" },
    ],
  },
  {
    title: "Vulnerability Scanning",
    icon: <Shield className="h-4 w-4" />,
    tools: [
      { name: "Nessus", url: "https://www.tenable.com/products/nessus", desc: "Comprehensive vulnerability scanner" },
      { name: "OpenVAS", url: "https://www.openvas.org/", desc: "Open-source vulnerability assessment scanner" },
      { name: "Nuclei", url: "https://nuclei.projectdiscovery.io/", desc: "Fast template-based vulnerability scanner" },
      { name: "Nmap", url: "https://nmap.org/", desc: "Network discovery and security auditing" },
    ],
  },
  {
    title: "Penetration Testing",
    icon: <Wrench className="h-4 w-4" />,
    tools: [
      { name: "Metasploit", url: "https://www.metasploit.com/", desc: "World's most used penetration testing framework" },
      { name: "Burp Suite", url: "https://portswigger.net/burp", desc: "Web vulnerability scanner and testing platform" },
      { name: "Cobalt Strike", url: "https://www.cobaltstrike.com/", desc: "Adversary simulation and red team operations" },
      { name: "BloodHound", url: "https://bloodhoundenterprise.io/", desc: "Active Directory attack path analysis" },
    ],
  },
  {
    title: "Malware Analysis",
    icon: <BookOpen className="h-4 w-4" />,
    tools: [
      { name: "Ghidra", url: "https://ghidra-sre.org/", desc: "NSA's software reverse engineering framework" },
      { name: "YARA", url: "https://virustotal.github.io/yara/", desc: "Pattern matching for malware researchers" },
      { name: "Cuckoo Sandbox", url: "https://cuckoosandbox.org/", desc: "Automated malware analysis system" },
      { name: "Any.Run", url: "https://any.run/", desc: "Interactive online malware analysis sandbox" },
    ],
  },
  {
    title: "Threat Intelligence",
    icon: <Shield className="h-4 w-4" />,
    tools: [
      { name: "MITRE ATT&CK", url: "https://attack.mitre.org/", desc: "Globally accessible knowledge base of adversary tactics" },
      { name: "AlienVault OTX", url: "https://otx.alienvault.com/", desc: "Open threat intelligence community" },
      { name: "MISP", url: "https://www.misp-project.org/", desc: "Open-source threat intelligence platform" },
      { name: "VirusTotal", url: "https://www.virustotal.com/", desc: "File, URL, and IP analysis service" },
    ],
  },
  {
    title: "OSINT & Recon",
    icon: <ExternalLink className="h-4 w-4" />,
    tools: [
      { name: "Shodan", url: "https://www.shodan.io/", desc: "Search engine for internet-connected devices" },
      { name: "Censys", url: "https://censys.io/", desc: "Internet-wide scanning and certificate transparency" },
      { name: "Maltego", url: "https://www.maltego.com/", desc: "Interactive data mining and link analysis" },
      { name: "theHarvester", url: "https://github.com/laramies/theHarvester", desc: "Email, subdomain, and name harvester" },
    ],
  },
];

const researchPapers = [
  { title: "SoK: Decentralized Finance (DeFi) Security", source: "IEEE S&P 2025", url: "#" },
  { title: "Adversarial Machine Learning in Cybersecurity", source: "ACM Computing Surveys", url: "#" },
  { title: "A Comprehensive Study of Ransomware Evolution", source: "NDSS 2025", url: "#" },
  { title: "Supply Chain Attacks: Patterns and Defenses", source: "USENIX Security 2025", url: "#" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tooling & Research
        </h1>
        <p className="text-[15px] text-gray-500 max-w-[600px]">
          Essential cybersecurity tools, frameworks, and research papers curated by the Info-Infect team.
        </p>
      </div>

      {/* Tool categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {toolCategories.map((cat) => (
          <div
            key={cat.title}
            className="bg-white border border-gray-200 rounded-lg p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded bg-gray-900 flex items-center justify-center text-white">
                {cat.icon}
              </div>
              <h2
                className="text-[14px] font-black text-gray-900 uppercase tracking-wide"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {cat.title}
              </h2>
            </div>
            <div className="space-y-3">
              {cat.tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {tool.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-gray-300 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <p className="text-[11.5px] text-gray-500 leading-snug mt-0.5">
                    {tool.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Research papers */}
      <section>
        <h2 className="section-header">Research Papers</h2>
        <div className="space-y-3">
          {researchPapers.map((paper) => (
            <a
              key={paper.title}
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg px-5 py-4 hover:border-amber-200 transition-colors"
            >
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {paper.title}
                </h3>
                <span className="text-[11px] text-gray-400">{paper.source}</span>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-amber-600 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
