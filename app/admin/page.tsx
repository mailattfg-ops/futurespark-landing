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
  DEFAULT_WEEKLY_PLANS,
  CurriculumPlanItem,
  AVAILABLE_PLAN_ICONS,
} from "@/lib/curriculum-plans-config";
import { PlanIcon } from "@/components/curriculum-plan-icon";
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
  Sliders,
  Layers,
  Sparkle,
  BookOpen,
  Info,
  Menu,
  X,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

interface PageOption {
  id: PageType;
  label: string;
  route: string;
  icon: any;
  color: string;
}

const PAGES_LIST: PageOption[] = [
  { id: "home", label: "Homepage", route: "/", icon: Layout, color: "text-indigo-400" },
  { id: "confirm-your-seat", label: "Confirm Your Seat", route: "/confirm-your-seat", icon: Sparkle, color: "text-amber-400" },
  { id: "claim-free-class", label: "Claim Free Class", route: "/claim-free-class", icon: Layers, color: "text-emerald-400" },
  { id: "curriculum", label: "Curriculum", route: "/curriculum", icon: BookOpen, color: "text-purple-400" },
  { id: "about-us", label: "About Us", route: "/about-us", icon: Info, color: "text-sky-400" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [sectionsState, setSectionsState] = useState<SectionState>(getDefaultSectionState());
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activePage, setActivePage] = useState<PageType>("home");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Weekly Course Plan Items State
  const [weeklyPlans, setWeeklyPlans] = useState<CurriculumPlanItem[]>(DEFAULT_WEEKLY_PLANS);
  const [isSavingPlans, setIsSavingPlans] = useState(false);
  const [plansSaveSuccess, setPlansSaveSuccess] = useState(false);

  // Modal State for Add / Edit Plan Item
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [formWeek, setFormWeek] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formIcon, setFormIcon] = useState("wallet");

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

  // 3. Fetch weekly course plan items
  useEffect(() => {
    async function loadWeeklyPlans() {
      try {
        const res = await fetch("/api/curriculum-plans");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setWeeklyPlans(json.data);
          localStorage.setItem("landing_curriculum_plans", JSON.stringify(json.data));
        }
      } catch (err) {
        console.error("Failed to load curriculum plans:", err);
      }
    }

    if (!isAuthenticating) {
      loadWeeklyPlans();
    }
  }, [isAuthenticating]);

  // Save weekly plans list to API & localStorage
  const saveWeeklyPlansApi = async (updatedPlans: CurriculumPlanItem[]) => {
    setIsSavingPlans(true);
    setPlansSaveSuccess(false);
    try {
      const res = await fetch("/api/curriculum-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPlans),
      });
      if (res.ok) {
        setWeeklyPlans(updatedPlans);
        localStorage.setItem("landing_curriculum_plans", JSON.stringify(updatedPlans));
        window.dispatchEvent(new Event("storage_curriculum_plans_updated"));
        setPlansSaveSuccess(true);
      }
    } catch (err) {
      console.error("Failed to save curriculum plans:", err);
    } finally {
      setIsSavingPlans(false);
    }
  };

  const handleMovePlanUp = (index: number) => {
    if (index <= 0) return;
    const next = [...weeklyPlans];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    saveWeeklyPlansApi(next);
  };

  const handleMovePlanDown = (index: number) => {
    if (index >= weeklyPlans.length - 1) return;
    const next = [...weeklyPlans];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    saveWeeklyPlansApi(next);
  };

  const handleDeletePlan = (id: string) => {
    if (!confirm("Are you sure you want to delete this course plan item?")) return;
    const next = weeklyPlans.filter((p) => p.id !== id);
    saveWeeklyPlansApi(next);
  };

  const handleOpenAddModal = () => {
    setEditingPlanId(null);
    setFormWeek(`Week ${weeklyPlans.length + 1}`);
    setFormTitle("");
    setFormSubtitle("");
    setFormIcon("wallet");
    setIsPlanModalOpen(true);
  };

  const handleOpenEditModal = (plan: CurriculumPlanItem) => {
    setEditingPlanId(plan.id);
    setFormWeek(plan.week);
    setFormTitle(plan.title);
    setFormSubtitle(plan.subtitle);
    setFormIcon(plan.icon || "wallet");
    setIsPlanModalOpen(true);
  };

  const handleSavePlanModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    let next: CurriculumPlanItem[];
    if (editingPlanId) {
      next = weeklyPlans.map((p) =>
        p.id === editingPlanId
          ? { ...p, week: formWeek, title: formTitle, subtitle: formSubtitle, icon: formIcon }
          : p
      );
    } else {
      const newItem: CurriculumPlanItem = {
        id: `plan-${Date.now()}`,
        week: formWeek,
        title: formTitle,
        subtitle: formSubtitle,
        icon: formIcon,
      };
      next = [...weeklyPlans, newItem];
    }

    saveWeeklyPlansApi(next);
    setIsPlanModalOpen(false);
  };

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

  const activePageInfo = PAGES_LIST.find((p) => p.id === activePage) || PAGES_LIST[0];
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* ── LEFT SIDEBAR ─────────────────────────────────────────────────── */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Sidebar Top Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shadow-inner">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-extrabold text-white tracking-tight leading-none">
                  Admin Portal
                </h1>
                <span className="text-[11px] font-medium text-slate-400 block mt-1">
                  Section Manager
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Section Title */}
          <div className="px-5 pt-6 pb-2">
            <h2 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              Pages &amp; Navigation
            </h2>
          </div>

          {/* Sidebar Page Item List */}
          <nav className="px-3 space-y-1.5 flex-1">
            {PAGES_LIST.map((page) => {
              const Icon = page.icon;
              const isActive = activePage === page.id;
              const count = DEFAULT_SECTIONS.filter((s) => s.page === page.id).length;

              return (
                <button
                  key={page.id}
                  onClick={() => {
                    setActivePage(page.id);
                    setFilterCategory("All");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-400/30"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-white" : page.color}`} />
                    <div className="truncate text-left">
                      <span className="block truncate font-bold">{page.label}</span>
                      <span className={`text-[10px] font-mono block ${isActive ? "text-indigo-200" : "text-slate-500"}`}>
                        {page.route}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${
                      isActive
                        ? "bg-indigo-700/80 text-white"
                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Footer Info */}
          <div className="p-4 m-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Status:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Active
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-500/20 hover:text-red-300 text-slate-400 text-xs font-bold transition-colors border border-slate-700/60 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* ── MAIN CONTENT AREA ────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky Top Header Bar */}
        <header className="sticky top-0 z-20 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Page Title & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-white tracking-tight">
                    {activePageInfo.label}
                  </h2>
                  <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                    {activePageInfo.route}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {enabledCount} of {totalCount} sections live for active page
                </p>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
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
            </div>
          </div>
        </header>

        {/* Main Content Body Container */}
        <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6 flex-1">
          {/* Save Success Banner */}
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

          {/* Toolbar & Category Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
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

          {/* Section Toggle Cards Grid */}
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

          {/* ── WEEKLY COURSE PLAN ITEMS MANAGER (For Curriculum Page) ── */}
          {activePage === "curriculum" && (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 mt-8 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">
                      Weekly Course Plan Items ({weeklyPlans.length})
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Add, edit, reorder, or remove weekly curriculum roadmap cards live on the{" "}
                    <span className="font-mono text-purple-400">/curriculum</span> page.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Add New Plan Item
                </button>
              </div>

              {plansSaveSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Weekly course plan items saved and updated live!</span>
                </div>
              )}

              {/* Weekly Plans Items List */}
              <div className="space-y-3">
                {weeklyPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Reorder Buttons */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleMovePlanUp(index)}
                          disabled={index === 0}
                          className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMovePlanDown(index)}
                          disabled={index === weeklyPlans.length - 1}
                          className="p-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Icon Circle */}
                      <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0">
                        <PlanIcon name={plan.icon} className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {plan.week}
                          </span>
                          <h4 className="text-sm font-extrabold text-white truncate">
                            {plan.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 truncate max-w-xl">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleOpenEditModal(plan)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700/80 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-indigo-400" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Dialog for Add / Edit Plan Item */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold text-white tracking-tight">
                {editingPlanId ? "Edit Plan Item" : "Add New Plan Item"}
              </h3>
              <button
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlanModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Week / Step Tag
                </label>
                <input
                  type="text"
                  required
                  value={formWeek}
                  onChange={(e) => setFormWeek(e.target.value)}
                  placeholder="e.g. Week 1, Module 1"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Money doesn't grow on trees..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. Understanding earning, income vs expenses..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                  Choose Card Icon
                </label>
                <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {AVAILABLE_PLAN_ICONS.map((ic) => (
                    <button
                      type="button"
                      key={ic.id}
                      onClick={() => setFormIcon(ic.id)}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        formIcon === ic.id
                          ? "bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <PlanIcon name={ic.id} className="w-4 h-4" />
                      <span className="text-[10px] truncate max-w-full">{ic.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsPlanModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPlans}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingPlans ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Plan Item"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
