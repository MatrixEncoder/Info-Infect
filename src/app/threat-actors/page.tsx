import { Metadata } from "next";
import { THREAT_ACTORS } from "@/lib/threat-actors";
import { Globe, Crosshair, Wrench, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Threat Actors | Info-Infect",
  description: "Comprehensive profiles of active threat actors — nation-states, criminal groups, and hacktivists.",
};

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "nation-state": { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  criminal: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  hacktivist: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  unknown: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
};

export default function ThreatActorsPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Threat Actors
        </h1>
        <p className="text-[15px] text-gray-500 max-w-[600px]">
          Profiles of active threat groups — attribution, TTPs, tools, and recent activity. Data sourced from public intelligence.
        </p>
        <div className="flex items-center gap-4 mt-4 text-[12px] text-gray-500">
          <span>{THREAT_ACTORS.length} actors tracked</span>
          <span>·</span>
          <span>{THREAT_ACTORS.filter((a) => a.active).length} currently active</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <span className="px-3 py-1.5 bg-gray-900 text-white text-[11px] font-bold rounded-sm">
          ALL ({THREAT_ACTORS.length})
        </span>
        {(["nation-state", "criminal", "hacktivist"] as const).map((type) => {
          const count = THREAT_ACTORS.filter((a) => a.type === type).length;
          return (
            <span
              key={type}
              className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[11px] font-bold rounded-sm cursor-pointer hover:bg-gray-200 transition-colors"
            >
              {type.toUpperCase().replace("-", " ")} ({count})
            </span>
          );
        })}
      </div>

      {/* Actor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {THREAT_ACTORS.map((actor) => {
          const colors = TYPE_COLORS[actor.type];
          return (
            <div
              key={actor.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2
                        className="text-xl font-black text-gray-900"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {actor.name}
                      </h2>
                      {actor.active && (
                        <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {actor.type.replace("-", " ")}
                      </span>
                      {actor.aliases.slice(0, 2).map((alias) => (
                        <span
                          key={alias}
                          className="text-[11px] text-gray-400 font-mono"
                        >
                          {alias}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {actor.origin}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Since {actor.firstSeen}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {actor.description}
                </p>

                {/* Targets */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Targets
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {actor.targets.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-semibold rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Known Tools
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {actor.tools.slice(0, 4).map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-mono font-semibold rounded-sm border border-red-100"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TTPs */}
                <div className="mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    MITRE ATT&CK
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {actor.ttps.map((ttp) => (
                      <a
                        key={ttp}
                        href={`https://attack.mitre.org/techniques/${ttp.replace(".", "/")}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-mono font-semibold rounded-sm border border-amber-100 hover:bg-amber-100 transition-colors"
                      >
                        {ttp}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-blue-50 border border-blue-100 rounded-sm p-3 mt-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    Recent Activity
                  </span>
                  <p className="text-[12px] text-gray-700 leading-snug">
                    {actor.recentActivity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
