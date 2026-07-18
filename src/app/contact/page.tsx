"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white py-16 sm:py-24 px-4">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase mb-6">
            Contact
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-[500px] mx-auto">
            Have a tip, feedback, or partnership inquiry? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 px-4">
        <div className="max-w-[600px] mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Message Sent</h2>
              <p className="text-gray-500">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Report a Bug</option>
                  <option>Add an RSS Source</option>
                  <option>Partnership</option>
                  <option>Press / Media</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#111215] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-black transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Direct Contact */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-[600px] mx-auto text-center">
          <Mail className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">
            Or email us directly at{" "}
            <a href="mailto:hello@info-infect.com" className="text-red-600 font-semibold hover:underline">
              hello@info-infect.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
