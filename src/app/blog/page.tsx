import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Blog | Info-Infect",
  description: "Cybersecurity news, analysis, and threat intelligence from Info-Infect.",
};

export default function BlogPage() {
  redirect("/");
}
