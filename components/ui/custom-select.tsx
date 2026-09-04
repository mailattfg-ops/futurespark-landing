"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Search, Check } from "lucide-react";

export interface CustomSelectOption {
  value: string;
  label: string;
  displayValue?: string;
  flag?: string;
  icon?: React.ReactNode;
  country?: string;
}

interface CustomSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | CustomSelectOption)[];
  placeholder?: string;
  leftIcon?: React.ReactNode;
  searchable?: boolean;
  placement?: "top" | "bottom" | "auto";
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-label"?: string;
}

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  leftIcon,
  searchable = false,
  placement = "auto",
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  disabled = false,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openUpward, setOpenUpward] = useState(placement === "top");
  const [coords, setCoords] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Normalize options to object format
  const normalizedOptions = useMemo<CustomSelectOption[]>(() => {
    return options.map((opt) => {
      if (typeof opt === "string") {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => opt.value === value);
  }, [normalizedOptions, value]);

  // Filter options if searchable
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) return normalizedOptions;
    const q = searchQuery.toLowerCase().trim();
    return normalizedOptions.filter((opt) =>
      opt.label.toLowerCase().includes(q) ||
      opt.value.toLowerCase().includes(q) ||
      (opt.country && opt.country.toLowerCase().includes(q))
    );
  }, [normalizedOptions, searchQuery, searchable]);

  // Update fixed portal coordinates and direction
  const updateCoords = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let isUp = placement === "top";
    if (placement === "auto") {
      isUp = spaceBelow < 250 && spaceAbove > 200;
    }
    setOpenUpward(isUp);

    setCoords({
      left: rect.left,
      width: rect.width,
      top: isUp ? rect.top : rect.bottom,
    });
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener("scroll", updateCoords, true);
      window.addEventListener("resize", updateCoords);
    }
    return () => {
      window.removeEventListener("scroll", updateCoords, true);
      window.removeEventListener("resize", updateCoords);
    };
  }, [isOpen, placement]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Auto focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  const popoverWidth = searchable ? Math.max(coords.width, 240) : coords.width;
  const popoverLeft = typeof window !== "undefined"
    ? Math.max(10, Math.min(coords.left, window.innerWidth - popoverWidth - 12))
    : coords.left;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs flex items-center justify-between gap-2 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium cursor-pointer ${
          !selectedOption ? "text-gray-400" : "text-gray-900"
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-2 truncate min-w-0">
          {leftIcon && <span className="flex-shrink-0 text-gray-400">{leftIcon}</span>}
          <span className="truncate">
            {selectedOption ? (
              <span className="flex items-center gap-1.5 truncate">
                {selectedOption.flag && <span className="flex-shrink-0">{selectedOption.flag}</span>}
                {selectedOption.icon}
                <span className="truncate">{selectedOption.displayValue || selectedOption.label}</span>
              </span>
            ) : (
              placeholder
            )}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180 text-indigo-600" : ""
          }`}
        />
      </button>

      {/* Floating Popover Modal via Body Portal */}
      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            left: `${popoverLeft}px`,
            width: `${popoverWidth}px`,
            ...(openUpward
              ? { bottom: `${window.innerHeight - coords.top + 6}px` }
              : { top: `${coords.top + 6}px` }),
            zIndex: 99999,
          }}
          className={`bg-white rounded-2xl shadow-2xl border border-gray-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${dropdownClassName}`}
        >
          {/* Search Input for searchable dropdowns */}
          {searchable && (
            <div className="p-2 bg-gray-50/80 border-b border-gray-100 relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium"
              />
            </div>
          )}

          {/* Options List */}
          <div className="max-h-48 overflow-y-auto p-1.5 space-y-0.5">
            {filteredOptions.length === 0 ? (
              <div className="py-3 px-3 text-center text-xs text-gray-400 font-medium">
                No matching options found.
              </div>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={`${opt.value}-${opt.country || opt.label}-${idx}`}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50 text-indigo-600 font-bold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate pr-2">
                      {opt.flag && <span>{opt.flag}</span>}
                      {opt.icon}
                      <span className="truncate">{opt.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
