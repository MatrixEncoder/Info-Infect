import type { ArticleCategory } from "./types";

export const SITE_NAME = "INFO//INFECT";
export const SITE_DESCRIPTION = "Premium Cybersecurity & Tech Intelligence Feed";
export const SITE_URL = "https://info-infect.com";

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "cloud-security": "Cloud Security",
  "ai-innovation": "AI Innovation",
  "zero-day": "Zero-Day",
  malware: "Malware",
  "data-breach": "Data Breach",
  vulnerability: "Vulnerability",
  infosec: "InfoSec",
  "cyber-policy": "Cyber Policy",
  research: "Research",
  industry: "Industry",
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  "cloud-security": "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
  "ai-innovation": "text-purple-700 border-purple-200 bg-purple-50",
  "zero-day": "text-red-accent border-red-accent/20 bg-red-50",
  malware: "text-orange-700 border-orange-200 bg-orange-50",
  "data-breach": "text-red-accent border-red-accent/20 bg-red-50",
  vulnerability: "text-gold-dark border-gold/20 bg-gold/5",
  infosec: "text-green-700 border-green-200 bg-green-50",
  "cyber-policy": "text-accent-blue border-accent-blue/20 bg-accent-blue/5",
  research: "text-indigo-700 border-indigo-200 bg-indigo-50",
  industry: "text-muted border-border-default bg-gray-50",
};

export const MOCK_CVE_DATA = [
  {
    id: "cve-1",
    cve_id: "CVE-2026-3841",
    description: "Remote code execution in OpenSSH server (regreSSHion variant)",
    cvss_score: 9.8,
    severity: "critical" as const,
    affected_software: "OpenSSH > 9.5",
    published_at: "2026-07-14T10:00:00Z",
  },
  {
    id: "cve-2",
    cve_id: "CVE-2026-2912",
    description: "Privilege escalation via kernel NULL pointer dereference in Linux < 6.8",
    cvss_score: 8.4,
    severity: "high" as const,
    affected_software: "Linux Kernel < 6.8",
    published_at: "2026-07-14T09:00:00Z",
  },
  {
    id: "cve-3",
    cve_id: "CVE-2026-1722",
    description: "Use-after-free in V8 JavaScript engine — active exploitation detected",
    cvss_score: 9.4,
    severity: "critical" as const,
    affected_software: "Chrome V8 < 128.0",
    published_at: "2026-07-14T08:00:00Z",
  },
  {
    id: "cve-4",
    cve_id: "CVE-2026-0588",
    description: "SQL injection in popular CMS plugin affecting 2M+ sites",
    cvss_score: 7.5,
    severity: "high" as const,
    affected_software: "WordPress Plugin: LiteSpeed Cache",
    published_at: "2026-07-14T06:00:00Z",
  },
  {
    id: "cve-5",
    cve_id: "CVE-2026-4129",
    description: "Authentication bypass in VPN appliance — PoC published",
    cvss_score: 9.1,
    severity: "critical" as const,
    affected_software: "Palo Alto PAN-OS < 11.2",
    published_at: "2026-07-14T04:00:00Z",
  },
];

export const MOCK_ARTICLES = [
  {
    id: "1",
    slug: "critical-openssh-rce-vulnerability-cve-2026-3841-active-exploitation",
    title: "Critical OpenSSH RCE Vulnerability (CVE-2026-3841) Under Active Exploitation — Patch Immediately",
    excerpt:
      "A newly discovered remote code execution vulnerability in OpenSSH server is being actively exploited in the wild. Security teams urged to patch within 24 hours as exploit code spreads in underground forums.",
    content: [
      "## Executive Summary",
      "",
      "A critical remote code execution vulnerability identified as **CVE-2026-3841** has been discovered in OpenSSH server versions 9.5 and above. With a CVSS score of 9.8, this vulnerability is being actively exploited in targeted attacks against enterprise infrastructure.",
      "",
      "## Technical Analysis",
      "",
      "The vulnerability resides in the signal handler registration mechanism within the SSH protocol implementation. An unauthenticated attacker can trigger a race condition in the async signal safety of the `sshkey_sign()` function, leading to arbitrary code execution with the privileges of the SSH daemon (typically root).",
      "",
      "```bash",
      "# Affected versions check",
      "ssh -V",
      "# OpenSSH_9.6p1, OpenSSL 3.0.13 — VULNERABLE",
      "# OpenSSH_8.9p1, OpenSSL 1.1.1w — NOT VULNERABLE",
      "```",
      "",
      "### Attack Vector",
      "",
      "The exploit chain requires:",
      "1. A reachable SSH service on TCP port 22",
      "2. Authentication is NOT required — pre-auth RCE",
      "3. The attack exploits async-signal-unsafe operations in the SSH packet handler",
      "",
      "### Detection Indicators",
      "",
      "Security teams should monitor for:",
      "- Unusual SSH connection attempts with specific packet sequences",
      "- Unexpected child process creation from sshd",
      "- Modified SSH daemon binaries or configuration files",
      "",
      "## Mitigation Recommendations",
      "",
      "Organizations should prioritize patching as follows:",
      "",
      "1. **Immediate (24 hours)**: Apply vendor patches for all internet-facing SSH servers",
      "2. **Short-term (72 hours)**: Internal SSH server patching and credential rotation",
      "3. **Ongoing**: Implement network-level SSH access controls and monitoring",
      "",
      "```bash",
      "# Ubuntu/Debian",
      "sudo apt update && sudo apt upgrade openssh-server",
      "",
      "# RHEL/CentOS",
      "sudo yum update openssh-server",
      "",
      "# Verify patch",
      'ssh -V | grep -i "openssh"',
      "```",
      "",
      "## Affected Versions",
      "",
      "| Vendor | Affected Version | Fixed Version |",
      "|--------|-----------------|---------------|",
      "| OpenSSH | ≥ 9.5 | 9.7p1 |",
      "| Ubuntu 24.04 | 9.6p1 | 9.7p1-1ubuntu1 |",
      "| RHEL 9 | 9.6p1 | 9.6p1-5.el9 |",
      "| Debian 13 | 9.7p1 | 9.7p1-2 |",
      "",
      "This vulnerability represents one of the most significant SSH-related security issues in recent years and demands immediate attention from all security teams.",
    ].join("\n"),
    category: "vulnerability" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/openssh-rce",
    source_name: "Info-Infect Research",
    author: "Security Analysis Team",
    published_at: "2026-07-14T12:00:00Z",
    created_at: "2026-07-14T12:00:00Z",
    is_featured: true,
    cves: ["CVE-2026-3841"],
    tags: ["openssh", "rce", "critical", "patch-now"],
  },
  {
    id: "2",
    slug: "anthropic-claude-4-reasoning-benchmarks-enterprise-ai-2026",
    title: "Anthropic Unveils Claude 4: Revolutionary Reasoning Capabilities Reshape Enterprise AI Landscape",
    excerpt:
      "Claude 4 achieves unprecedented scores on reasoning benchmarks, outperforming GPT-5 and Gemini 3 in complex code generation and multi-step analysis tasks.",
    content: `## Overview

Anthropic has released Claude 4, their most advanced AI model to date, featuring breakthrough reasoning capabilities that significantly outperform previous generation models across virtually all benchmarks.

## Key Capabilities

The model demonstrates exceptional performance in:

- **Complex code generation**: 40% improvement on competitive programming benchmarks
- **Multi-step reasoning**: 35% improvement on GSM-8K and MATH benchmarks
- **Context understanding**: 200K token context window with near-perfect recall

## Enterprise Implications

For security and engineering teams, Claude 4 offers:
- Automated vulnerability detection in code reviews
- Advanced threat intelligence analysis
- Natural language querying of security telemetry`,
    category: "ai-innovation" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/claude-4",
    source_name: "TechCrunch",
    author: "AI Desk",
    published_at: "2026-07-14T11:00:00Z",
    created_at: "2026-07-14T11:00:00Z",
    is_featured: false,
    cves: [],
    tags: ["anthropic", "claude", "ai", "reasoning"],
  },
  {
    id: "3",
    slug: "aws-s3-bucket-misconfiguration-exposes-50m-user-records-major-enterprise",
    title: "AWS S3 Bucket Misconfiguration Exposes 50M+ User Records — Major Enterprise Breach",
    excerpt:
      "A Fortune 500 company exposed 50 million user records through a misconfigured AWS S3 bucket. The breach includes PII, authentication hashes, and financial data.",
    content: `## Incident Details

A Fortune 500 technology company has confirmed a massive data exposure after security researchers discovered an unsecured AWS S3 bucket containing over 50 million user records.

### Exposed Data Types

- Full names and email addresses
- Password hashes (bcrypt)
- Partial payment information
- Account activity logs

### Root Cause

The breach resulted from a misconfigured bucket policy that granted public read access to all objects. The bucket had been exposed for approximately 47 days before discovery.`,
    category: "data-breach" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/s3-breach",
    source_name: "The Register",
    author: "Security Desk",
    published_at: "2026-07-14T10:00:00Z",
    created_at: "2026-07-14T10:00:00Z",
    is_featured: false,
    cves: [],
    tags: ["aws", "s3", "data-breach", "cloud-security"],
  },
  {
    id: "4",
    slug: "google-project-zero-windows-kernel-privilege-escalation-analysis",
    title: "Google Project Zero Discloses Windows Kernel Privilege Escalation Chain",
    excerpt:
      "Project Zero researchers detail a 3-bug chain in the Windows kernel that allows sandbox escape and full system compromise. Microsoft releases out-of-band patch.",
    content: `## Disclosure Timeline

Google Project Zero has disclosed a chain of three vulnerabilities in the Windows kernel that, when combined, allow complete sandbox escape and system compromise.

### Vulnerability Chain

1. **CVE-2026-2912**: Information disclosure in kernel memory management
2. **CVE-2026-2913**: NULL pointer dereference in the graphical subsystem
3. **CVE-2026-2914**: Use-after-free in the object manager

All three bugs were chained together in a working exploit demonstrated by Project Zero researchers.`,
    category: "vulnerability" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/project-zero-windows",
    source_name: "Google Project Zero",
    author: "Research Team",
    published_at: "2026-07-14T08:00:00Z",
    created_at: "2026-07-14T08:00:00Z",
    is_featured: false,
    cves: ["CVE-2026-2912", "CVE-2026-2913", "CVE-2026-2914"],
    tags: ["windows", "kernel", "privilege-escalation", "project-zero"],
  },
  {
    id: "5",
    slug: "supply-chain-attack-npm-package-cryptominer-100k-downloads",
    title: "Supply Chain Attack: Compromised npm Package with 100k+ Weekly Downloads Found Cryptomining",
    excerpt:
      "A popular npm package with over 100,000 weekly downloads was found secretly cryptomining. The incident highlights growing risks in the open-source software supply chain.",
    content: `## Incident Report

Security researchers have discovered a sophisticated supply chain attack targeting the npm ecosystem. A popular utility package with over 100,000 weekly downloads was found to contain cryptomining malware.

### Attack Methodology

The attacker gained access to the package maintainer's account through credential theft and published a malicious update that included:

- A base64-encoded cryptominer payload
- Process hiding mechanisms
- Persistence through npm postinstall scripts`,
    category: "malware" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/npm-supply-chain",
    source_name: "Bleeping Computer",
    author: "Malware Desk",
    published_at: "2026-07-14T07:00:00Z",
    created_at: "2026-07-14T07:00:00Z",
    is_featured: false,
    cves: [],
    tags: ["supply-chain", "npm", "cryptominer", "open-source"],
  },
  {
    id: "6",
    slug: "cloudflare-ai-gateway-zero-trust-security-enterprise",
    title: "Cloudflare Launches AI Gateway Security Suite with Zero-Trust Architecture",
    excerpt:
      "New AI Gateway provides enterprises with observability, security controls, and rate limiting for LLM API usage across the organization.",
    content: `## Product Launch

Cloudflare has announced the general availability of their AI Gateway security suite, designed to provide enterprise-grade security and observability for AI/LLM API usage.

### Key Features

- **Zero-trust AI access**: Enforce authentication for all LLM API calls
- **Prompt injection detection**: ML-based detection of prompt injection attempts
- **Rate limiting & cost controls**: Per-user and per-model usage quotas
- **Audit logging**: Complete trail of all AI API interactions`,
    category: "cloud-security" as ArticleCategory,
    thumbnail_url: null,
    source_url: "https://example.com/cloudflare-ai-gateway",
    source_name: "Cloudflare Blog",
    author: "Product Team",
    published_at: "2026-07-14T06:00:00Z",
    created_at: "2026-07-14T06:00:00Z",
    is_featured: false,
    cves: [],
    tags: ["cloudflare", "ai", "zero-trust", "gateway"],
  },
];

export const MOCK_ADMIN_STATS = {
  totalFeeds: 24,
  articlesProcessed24h: 1_847,
  aiTokenEfficiency: 94.2,
  totalSubscribers: 12_430,
  activeCves: 47,
  lastSync: "2026-07-14T12:00:00Z",
};
