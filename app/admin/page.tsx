"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  DEFAULT_SECTIONS,
  LandingSection,
  SectionState,
  PageType,
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
  Layers,
  Sparkle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [sectionsState, setSectionsState] = useState<SectionState>(getDefaultSectionState());
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activePage, setActivePage] = useState<PageType>("home");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // 1. Check authentication status
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/login");
        const data = await res.json();
        if (!data.authenticated) {
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
          setSectionsState((prev) => ({ ...prev, ...data.data }));
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

  // Bulk enable all for active page
  const handleEnableAll = () => {
    setSectionsState((prev) => {
      const next = { ...prev };
      DEFAULT_SECTIONS.filter((s) => s.page === activePage).forEach((s) => (next[s.id] = true));
      return next;
    });
    setSaveSuccess(false);
  };

  // Bulk disable all for active page
  const handleDisableAll = () => {
    setSectionsState((prev) => {
      const next = { ...prev };
      DEFAULT_SECTIONS.filter((s) => s.page === activePage).forEach((s) => (next[s.id] = false));
      return next;
    });
    setSaveSuccess(false);
  };

  // Reset active page to defaults
  const handleResetDefault = () => {
    setSectionsState((prev) => {
      const next = { ...prev };
      DEFAULT_SECTIONS.filter((s) => s.page === activePage).forEach((s) => (next[s.id] = s.enabled));
      return next;
    });
    setSaveSuccess(false);
  };

  // Save changes to API & localStorage
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sectionsState),
      });

      if (res.ok) {
        localStorage.setItem("landing_sections_config", JSON.stringify(sectionsState));
        window.dispatchEvent(new Event("storage_sections_updated"));
        setSaveSuccess(true);
      }
    } catch (err) {
      console.error("Failed to save sections config:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    localStorage.removeItem("landing_admin_auth");
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => {});
    router.push("/admin/login");
  };

  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="flex items-center gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  const activePageSections = DEFAULT_SECTIONS.filter((s) => s.page === activePage);
  const enabledCount = activePageSections.filter((s) => sectionsState[s.id] !== false).length;
  const totalCount = activePageSections.length;

  const categories = ["All", ...Array.from(new Set(activePageSections.map((s) => s.category)))];

  const filteredSections = activePageSections.filter((section) => {
    if (filterCategory === "All") return true;
    return section.category === filterCategory;
  });

  const getPageUrl = (page: PageType) => {
    if (page === "home") return "/";
    return `/${page}`;
  };

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
                  Section Visibility Manager
                </h1>
                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {enabledCount} of {totalCount} sections live for active page
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href={getPageUrl(activePage)}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Preview Page
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
                  <Save className="w-3.5 h-3.5" /> Save All Changes
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

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
              <span>Section configuration saved successfully! Your live page is updated.</span>
            </div>
            <Link
              href={getPageUrl(activePage)}
              target="_blank"
              className="underline text-emerald-300 font-bold hover:text-white text-xs"
            >
              View Changes →
            </Link>
          </div>
        )}

        {/* Page Switcher Tabs */}
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActivePage("home");
              setFilterCategory("All");
            }}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === "home"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>Homepage (/)</span>
            <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-extrabold text-slate-300">
              19 Sections
            </span>
          </button>

          <button
            onClick={() => {
              setActivePage("confirm-your-seat");
              setFilterCategory("All");
            }}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === "confirm-your-seat"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Sparkle className="w-4 h-4 text-amber-400" />
            <span>Confirm Your Seat (/confirm-your-seat)</span>
            <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-extrabold text-slate-300">
              6 Sections
            </span>
          </button>

          <button
            onClick={() => {
              setActivePage("claim-free-class");
              setFilterCategory("All");
            }}
            className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePage === "claim-free-class"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Claim Free Class (/claim-free-class)</span>
            <span className="ml-auto text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-extrabold text-slate-300">
              6 Sections
            </span>
          </button>
        </div>

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
          <div className="py-20 text-center text-slate-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-500" />
            <p className="text-sm">Loading page section configuration...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSections.map((section) => {
              const isEnabled = sectionsState[section.id] !== false;

              return (
                <div
                  key={section.id}
                  className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    isEnabled
                      ? "bg-slate-900/90 border-slate-700/80 shadow-xl shadow-indigo-950/20"
                      : "bg-slate-950/60 border-slate-850 opacity-60 grayscale-[40%]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {section.category}
                      </span>

                      {/* Custom Toggle Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEnabled}
                        onClick={() => handleToggle(section.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isEnabled ? "bg-indigo-600" : "bg-slate-800"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {section.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">id: {section.id}</span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isEnabled ? "text-emerald-400" : "text-slate-500"
                      }`}
                    >
                      {isEnabled ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Visible
                        </>
                      ) : (
                        <>
                          <Power className="w-3.5 h-3.5 text-slate-600" /> Hidden
                        </>
                      )}
                    </span>
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
