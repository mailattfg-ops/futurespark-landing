"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Globe, ChevronDown, Search, Check, Clock } from "lucide-react";
import { timezones, TimezoneOption } from "@/lib/timezone-utils";

interface TimezoneSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TimezoneSelect({ value, onChange, className = "" }: TimezoneSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo<TimezoneOption>(() => {
    return timezones.find((tz) => tz.value === value) || timezones[0];
  }, [value]);

  const filteredTimezones = useMemo(() => {
    if (!searchQuery.trim()) return timezones;
    const q = searchQuery.toLowerCase().trim();
    return timezones.filter(
      (tz) =>
        tz.label.toLowerCase().includes(q) ||
        tz.value.toLowerCase().includes(q) ||
        tz.countryKeywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 bg-indigo-50/90 hover:bg-indigo-100/90 border border-indigo-200/80 rounded-xl px-3 py-2 text-xs font-bold text-indigo-900 transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-indigo-600 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Customized Floating Dropdown Popover */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-200/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header & Search Bar */}
          <div className="p-2.5 bg-gray-50/80 border-b border-gray-100 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 font-sans">
                <Clock className="w-3 h-3 text-indigo-600" /> Select Timezone
              </span>
              <span className="text-[10px] font-semibold text-gray-400">
                {filteredTimezones.length} zones
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or timezone..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium"
              />
            </div>
          </div>

          {/* Timezone List Items */}
          <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
            {filteredTimezones.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-400 font-medium">
                No matching timezone found.
              </div>
            ) : (
              filteredTimezones.map((tz) => {
                const isSelected = tz.value === value;
                return (
                  <button
                    key={tz.value}
                    type="button"
                    onClick={() => {
                      onChange(tz.value);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-700 font-extrabold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="truncate pr-2">{tz.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
