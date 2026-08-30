"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DEFAULT_SECTIONS,
  LandingSection,
  SectionState,
  getDefaultSectionState,
} from "@/lib/section-config";
import {
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Layout,
  Loader2,
  LogOut,
  Power,
  RotateCcw,
  Save,
  Shield,
  Sliders,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [sectionsState, setSectionsState] = useState<SectionState>(getDefaultSectionState());
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // 1. Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/login");
        const data = await res.json();
        if (!data.authenticated) {
          // Check client fallback
          const localAuth = localStorage.getItem("landing_admin_auth");
          if (localAuth !== "true") {
            router.push("/admin/login");
            return;
          }
        }
        setIsAuthenticating(false);
      } catch {
        router.push("/admin/login");
      }
    }

    checkAuth();
  }, [router]);

  // 2. Fetch current section toggle states
  useEffect(() => {
    async function loadSections() {
      try {
        const res = await fetch("/api/sections");
        const data = await res.json();
        if (data.success && data.data) {
          setSectionsState(data.data);
          // Sync with local storage
          localStorage.setItem("landing_sections_config", JSON.stringify(data.data));
        }
      } catch (err) {
        console.error("Failed to load sections config:", err);
      } finally {
        setIsLoadingConfig(false);
      }
    }

    if (!isAuthenticating) {
      loadSections();
    }
  }, [isAuthenticating]);

  // Toggle individual section
  const handleToggle = (id: string) => {
    setSectionsState((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      return updated;
    });
    setSaveSuccess(false);
  };

  // Bulk enable all
  const handleEnableAll = () => {
    const next: SectionState = {};
    DEFAULT_SECTIONS.forEach((s) => (next[s.id] = true));
    setSectionsState(next);
    setSaveSuccess(false);
  };

  // Bulk disable all
  const handleDisableAll = () => {
    const next: SectionState = {};
    DEFAULT_SECTIONS.forEach((s) => (next[s.id] = false));
    setSectionsState(next);
    setSaveSuccess(false);
  };

  // Reset to default (all enabled)
  const handleResetDefault = () => {
    setSectionsState(getDefaultSectionState());
    setSaveSuccess(false);
  };

  // Save changes to API & local storage
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionsState),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("landing_sections_config", JSON.stringify(sectionsState));
        // Broadcast custom event so active browser tabs re-render
        window.dispatchEvent(new Event("storage_sections_updated"));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      localStorage.removeItem("landing_admin_auth");
    } catch {}
    router.push("/admin/login");
  };

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 font-sans">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  const enabledCount = Object.values(sectionsState).filter(Boolean).length;
  const totalCount = DEFAULT_SECTIONS.length;
  const categories = ["All", "Hero & Intro", "Curriculum & Value", "Social Proof & Media", "Footer"];

  const filteredSections = DEFAULT_SECTIONS.filter((section) => {
    if (filterCategory === "All") return true;
    return section.category === filterCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white tracking-tight">
                  Landing Page Section Manager
                </h1>
                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {enabledCount} of {totalCount} sections live on site
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Preview Live Site
            </Link>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> Saved!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 hover:text-red-300 text-slate-400 text-xs font-semibold transition-colors border border-slate-700/60 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        {/* Toast Alert Banner */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <span>Section configuration saved successfully! Your live landing page is updated.</span>
            </div>
            <Link
              href="/"
              target="_blank"
              className="underline text-emerald-300 font-bold hover:text-white text-xs"
            >
              View Changes →
            </Link>
          </div>
        )}

        {/* Toolbar & Category Filters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Bulk Actions */}
          <div className="flex items-center gap-2 text-xs font-medium w-full md:w-auto justify-end">
            <button
              onClick={handleEnableAll}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> Enable All
            </button>

            <button
              onClick={handleDisableAll}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" /> Disable All
            </button>

            <button
              onClick={handleResetDefault}
              className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Section Cards Grid */}
        {isLoadingConfig ? (
          <div className="py-20 text-center text-slate-500 flex items-center justify-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <span>Loading section status...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSections.map((section) => {
              const isEnabled = !!sectionsState[section.id];

              return (
                <div
                  key={section.id}
                  onClick={() => handleToggle(section.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                    isEnabled
                      ? "bg-slate-900/90 border-slate-800 hover:border-indigo-500/50 shadow-md"
                      : "bg-slate-950/60 border-slate-900/80 opacity-60 hover:opacity-80"
                  }`}
                >
                  {/* Top Row: Title & Badge */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700/60">
                          {section.category}
                        </span>
                      </div>

                      {/* Status Pill Badge */}
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isEnabled
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-slate-800 text-slate-500 border border-slate-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isEnabled ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                          }`}
                        />
                        {isEnabled ? "LIVE" : "DISABLED"}
                      </span>
                    </div>

                    {/* Section Name */}
                    <h3 className="text-base font-extrabold text-white tracking-tight mb-1 font-sans">
                      {section.name}
                    </h3>

                    {/* Section Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Bottom Row: Toggle Switch Control */}
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      {isEnabled ? "Visible on page" : "Hidden from page"}
                    </span>

                    {/* Interactive Custom iOS-Style Toggle Switch */}
                    <div
                      className={`w-12 h-6.5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center ${
                        isEnabled ? "bg-indigo-600 justify-end" : "bg-slate-800 justify-start"
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
