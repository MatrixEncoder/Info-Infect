// ─── CISA Known Exploited Vulnerabilities Catalog ────────────────
// https://www.cisa.gov/known-exploited-vulnerabilities-catalog

export interface KevEntry {
  cveId: string;
  vendor: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: string;
  notes: string;
}

// Static seed data — refreshed via /api/cron or background fetch
export const KEV_SEED: KevEntry[] = [
  {
    cveId: "CVE-2024-3400",
    vendor: "Palo Alto Networks",
    product: "PAN-OS",
    vulnerabilityName: "Palo Alto Networks PAN-OS Command Injection Vulnerability",
    dateAdded: "2024-04-12",
    shortDescription: "A command injection vulnerability in the GlobalProtect gateway of Palo Alto Networks PAN-OS software allows an unauthenticated attacker to execute arbitrary code with root privileges on the firewall.",
    requiredAction: "Apply patches per vendor instructions.",
    dueDate: "2024-04-19",
    knownRansomwareCampaignUse: "Known",
    notes: "Active exploitation observed in the wild.",
  },
  {
    cveId: "CVE-2024-21762",
    vendor: "Fortinet",
    product: "FortiOS",
    vulnerabilityName: "Fortinet FortiOS Out-of-Bound Write Vulnerability",
    dateAdded: "2024-02-09",
    shortDescription: "An out-of-bound write vulnerability in FortiOS may allow a remote unauthenticated attacker to execute arbitrary code or command via specially crafted HTTP requests.",
    requiredAction: "Apply patches or disable SSL VPN.",
    dueDate: "2024-03-01",
    knownRansomwareCampaignUse: "Known",
    notes: "Widely exploited by ransomware groups.",
  },
  {
    cveId: "CVE-2023-46805",
    vendor: "Ivanti",
    product: "Connect Secure",
    vulnerabilityName: "Ivanti Connect Secure Authentication Bypass Vulnerability",
    dateAdded: "2024-01-12",
    shortDescription: "An authentication bypass vulnerability in Ivanti Connect Secure allows a remote attacker to access restricted resources.",
    requiredAction: "Apply vendor-supplied patches.",
    dueDate: "2024-02-01",
    knownRansomwareCampaignUse: "Known",
    notes: "Chained with CVE-2024-21887 for full RCE.",
  },
  {
    cveId: "CVE-2023-4966",
    vendor: "Citrix",
    product: "NetScaler ADC and Gateway",
    vulnerabilityName: "Citrix NetScaler ADC and Gateway Sensitive Information Disclosure Vulnerability",
    dateAdded: "2023-10-10",
    shortDescription: "A sensitive information disclosure vulnerability related to session tokens in NetScaler ADC and NetScaler Gateway.",
    requiredAction: "Apply patches immediately.",
    dueDate: "2023-10-24",
    knownRansomwareCampaignUse: "Known",
    notes: "Exploited in the wild for session hijacking.",
  },
  {
    cveId: "CVE-2023-20198",
    vendor: "Cisco",
    product: "IOS XE Software",
    vulnerabilityName: "Cisco IOS XE Web UI Privilege Escalation Vulnerability",
    dateAdded: "2023-10-16",
    shortDescription: "A privilege escalation vulnerability in the web UI feature of Cisco IOS XE Software allows an unauthenticated remote attacker to create an administrative account.",
    requiredAction: "Disable the HTTP Server feature.",
    dueDate: "2023-11-01",
    knownRansomwareCampaignUse: "Known",
    notes: "Mass exploitation observed, 10k+ devices compromised.",
  },
  {
    cveId: "CVE-2026-3841",
    vendor: "OpenSSH",
    product: "OpenSSH",
    vulnerabilityName: "OpenSSH Remote Code Execution Vulnerability",
    dateAdded: "2026-07-15",
    shortDescription: "A critical RCE vulnerability in OpenSSH allows unauthenticated attackers to execute arbitrary code via a crafted SSH handshake.",
    requiredAction: "Update to OpenSSH 9.8p2 or later immediately.",
    dueDate: "2026-07-22",
    knownRansomwareCampaignUse: "Under Investigation",
    notes: "Actively exploited in the wild. CVSS 9.8.",
  },
];

let kevCache: KevEntry[] = [...KEV_SEED];
let kevLastFetch = 0;
const KEV_CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function fetchKevCatalog(): Promise<KevEntry[]> {
  const now = Date.now();
  if (kevCache.length > 0 && now - kevLastFetch < KEV_CACHE_TTL) {
    return kevCache;
  }

  try {
    const res = await fetch(
      "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
      { cache: "no-store", signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) throw new Error(`CISA API ${res.status}`);

    const data = await res.json();
    const catalog = data?.vulnerabilities ?? [];

    kevCache = catalog.map((v: Record<string, string>) => ({
      cveId: v.cveID || "",
      vendor: v.vendorProject || "",
      product: v.product || "",
      vulnerabilityName: v.vulnerabilityName || "",
      dateAdded: v.dateAdded || "",
      shortDescription: v.shortDescription || "",
      requiredAction: v.requiredAction || "",
      dueDate: v.dueDate || "",
      knownRansomwareCampaignUse: v.knownRansomwareCampaignUse || "Unknown",
      notes: v.notes || "",
    }));

    kevLastFetch = now;
    console.log(`[kev] Fetched ${kevCache.length} known exploited vulnerabilities from CISA`);
  } catch (err) {
    console.log(`[kev] CISA fetch failed, using seed data (${kevCache.length} entries)`);
  }

  return kevCache;
}
