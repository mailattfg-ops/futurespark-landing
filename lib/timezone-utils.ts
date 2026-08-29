export interface TimezoneOption {
  value: string;
  label: string;
  countryKeywords: string[];
}

export const timezones: TimezoneOption[] = [
  // India & South Asia
  { value: "Asia/Kolkata", label: "🇮🇳 India (IST, UTC+5:30)", countryKeywords: ["india", "ind", "in"] },
  { value: "Asia/Karachi", label: "🇵🇰 Pakistan (PKT, UTC+5:00)", countryKeywords: ["pakistan", "pk"] },
  { value: "Asia/Dhaka", label: "🇧🇩 Bangladesh (BST, UTC+6:00)", countryKeywords: ["bangladesh", "bd"] },
  { value: "Asia/Colombo", label: "🇱🇱 Sri Lanka (SLST, UTC+5:30)", countryKeywords: ["sri lanka", "lk"] },
  { value: "Asia/Kathmandu", label: "🇳🇵 Nepal (NPT, UTC+5:45)", countryKeywords: ["nepal", "np"] },

  // Middle East & Gulf
  { value: "Asia/Dubai", label: "🇦🇪 UAE / Oman (GST, UTC+4:00)", countryKeywords: ["united arab emirates", "uae", "dubai", "abu dhabi", "oman", "muscat"] },
  { value: "Asia/Riyadh", label: "🇸🇦 Saudi Arabia / Qatar / Kuwait / Bahrain (AST, UTC+3:00)", countryKeywords: ["saudi arabia", "saudi", "qatar", "doha", "kuwait", "bahrain", "riyadh", "jeddah"] },
  { value: "Asia/Tehran", label: "🇮🇷 Iran (IRST, UTC+3:30)", countryKeywords: ["iran", "tehran"] },
  { value: "Asia/Amman", label: "🇯🇴 Jordan / Lebanon / Palestine (EEST, UTC+3:00)", countryKeywords: ["jordan", "lebanon", "palestine", "beirut", "amman"] },

  // North America
  { value: "America/New_York", label: "🇺🇸/🇨🇦 US & Canada Eastern (EDT, UTC-4:00)", countryKeywords: ["united states", "usa", "us", "america", "canada", "new york", "toronto", "florida", "georgia", "virginia", "boston", "washington"] },
  { value: "America/Chicago", label: "🇺🇸/🇨🇦 US & Canada Central (CDT, UTC-5:00)", countryKeywords: ["texas", "chicago", "illinois", "minnesota", "wisconsin", "missouri"] },
  { value: "America/Denver", label: "🇺🇸/🇨🇦 US & Canada Mountain (MDT, UTC-6:00)", countryKeywords: ["colorado", "denver", "utah", "arizona", "alberta", "calgary"] },
  { value: "America/Los_Angeles", label: "🇺🇸/🇨🇦 US & Canada Pacific (PDT, UTC-7:00)", countryKeywords: ["california", "los angeles", "san francisco", "seattle", "washington state", "vancouver", "british columbia"] },
  { value: "America/Anchorage", label: "🇺🇸 US Alaska (AKDT, UTC-8:00)", countryKeywords: ["alaska"] },
  { value: "Pacific/Honolulu", label: "🇺🇸 US Hawaii (HST, UTC-10:00)", countryKeywords: ["hawaii", "honolulu"] },

  // Europe & UK
  { value: "Europe/London", label: "🇬🇧 UK & Ireland (BST/GMT, UTC+1:00)", countryKeywords: ["united kingdom", "uk", "great britain", "england", "scotland", "wales", "ireland", "london", "dublin"] },
  { value: "Europe/Paris", label: "🇫🇷 Western Europe - France / Spain / Netherlands (CEST, UTC+2:00)", countryKeywords: ["france", "spain", "netherlands", "belgium", "paris", "madrid", "amsterdam", "brussels"] },
  { value: "Europe/Berlin", label: "🇩🇪 Central Europe - Germany / Italy / Switzerland / Sweden (CEST, UTC+2:00)", countryKeywords: ["germany", "italy", "switzerland", "sweden", "norway", "denmark", "austria", "poland", "czech republic", "berlin", "rome", "zurich", "vienna"] },
  { value: "Europe/Athens", label: "🇬🇷 Eastern Europe - Greece / Turkey / Romania / Ukraine (EEST, UTC+3:00)", countryKeywords: ["greece", "turkey", "romania", "ukraine", "bulgaria", "athens", "istanbul"] },
  { value: "Europe/Moscow", label: "🇷🇺 Russia - Moscow (MSK, UTC+3:00)", countryKeywords: ["russia", "moscow"] },

  // East & Southeast Asia
  { value: "Asia/Singapore", label: "🇸🇬 Singapore & Malaysia (SGT/MYT, UTC+8:00)", countryKeywords: ["singapore", "malaysia", "kuala lumpur", "sg", "my"] },
  { value: "Asia/Hong_Kong", label: "🇭🇰 Hong Kong & Taiwan & China (HKT/CST, UTC+8:00)", countryKeywords: ["hong kong", "taiwan", "china", "beijing", "shanghai", "taipei"] },
  { value: "Asia/Tokyo", label: "🇯🇵 Japan & South Korea (JST/KST, UTC+9:00)", countryKeywords: ["japan", "south korea", "tokyo", "seoul", "jp", "kr"] },
  { value: "Asia/Jakarta", label: "🇮🇩 Indonesia Western (WIB, UTC+7:00)", countryKeywords: ["indonesia", "jakarta", "id"] },
  { value: "Asia/Bangkok", label: "🇹🇭 Thailand & Vietnam & Cambodia (ICT, UTC+7:00)", countryKeywords: ["thailand", "vietnam", "cambodia", "laos", "bangkok", "hanoi"] },
  { value: "Asia/Manila", label: "🇵🇭 Philippines (PHT, UTC+8:00)", countryKeywords: ["philippines", "manila", "ph"] },

  // Australia & Pacific
  { value: "Australia/Sydney", label: "🇦🇺 Australia Eastern (AEST, UTC+10:00)", countryKeywords: ["australia", "sydney", "melbourne", "brisbane", "canberra", "au"] },
  { value: "Australia/Adelaide", label: "🇦🇺 Australia Central (ACST, UTC+9:30)", countryKeywords: ["adelaide", "south australia"] },
  { value: "Australia/Perth", label: "🇦🇺 Australia Western (AWST, UTC+8:00)", countryKeywords: ["perth", "western australia"] },
  { value: "Pacific/Auckland", label: "🇳🇿 New Zealand (NZST, UTC+12:00)", countryKeywords: ["new zealand", "auckland", "wellington", "nz"] },

  // Africa
  { value: "Africa/Cairo", label: "🇪🇬 Egypt (EEST, UTC+3:00)", countryKeywords: ["egypt", "cairo"] },
  { value: "Africa/Johannesburg", label: "🇿🇦 South Africa (SAST, UTC+2:00)", countryKeywords: ["south africa", "johannesburg", "cape town", "za"] },
  { value: "Africa/Lagos", label: "🇳🇬 Nigeria & West Africa (WAT, UTC+1:00)", countryKeywords: ["nigeria", "ghana", "lagos", "accra"] },
  { value: "Africa/Nairobi", label: "🇰🇪 Kenya & East Africa (EAT, UTC+3:00)", countryKeywords: ["kenya", "tanzania", "ethiopia", "uganda", "nairobi"] },

  // South America
  { value: "America/Sao_Paulo", label: "🇧🇷 Brazil (BRT, UTC-3:00)", countryKeywords: ["brazil", "sao paulo", "rio de janeiro", "br"] },
  { value: "America/Argentina/Buenos_Aires", label: "🇦🇷 Argentina (ART, UTC-3:00)", countryKeywords: ["argentina", "buenos aires", "ar"] },
  { value: "America/Santiago", label: "🇨🇱 Chile (CLT, UTC-4:00)", countryKeywords: ["chile", "santiago"] },
  { value: "America/Bogota", label: "🇨🇴 Colombia / Peru / Ecuador (COT, UTC-5:00)", countryKeywords: ["colombia", "peru", "ecuador", "bogota", "lima"] },
];

export const allCountriesList: string[] = [
  "India",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "Qatar",
  "Saudi Arabia",
  "Oman",
  "Kuwait",
  "Bahrain",
  "Singapore",
  "Australia",
  "New Zealand",
  "Germany",
  "France",
  "Malaysia",
  "Indonesia",
  "Pakistan",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
  "Japan",
  "South Korea",
  "Hong Kong",
  "Thailand",
  "Philippines",
  "Vietnam",
  "Egypt",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Brazil",
  "Argentina",
  "Ireland",
  "Switzerland",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Italy",
  "Spain",
  "Portugal",
  "Greece",
  "Turkey",
  "Russia",
  "Mexico",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "Georgia",
  "Ghana",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "Iran",
  "Iraq",
  "Israel",
  "Jamaica",
  "Jordan",
  "Kazakhstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritius",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nicaragua",
  "Niger",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Romania",
  "Rwanda",
  "Senegal",
  "Serbia",
  "Sierra Leone",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "Sudan",
  "Suriname",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkmenistan",
  "Uganda",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

export function getMatchingTimezone(countryStr: string, countryCodeStr?: string): string {
  const c = (countryStr || "").trim().toLowerCase();
  const code = (countryCodeStr || "").trim();

  if (c) {
    for (const tz of timezones) {
      if (tz.countryKeywords.some((keyword) => c.includes(keyword) || keyword.includes(c))) {
        return tz.value;
      }
    }
  }

  if (code === "+91") return "Asia/Kolkata";
  if (code === "+971") return "Asia/Dubai";
  if (code === "+1") return "America/New_York";
  if (code === "+44") return "Europe/London";
  if (code === "+65") return "Asia/Singapore";
  if (code === "+61") return "Australia/Sydney";

  return "Asia/Kolkata";
}

export interface SlotOption {
  id: string;
  time: string;
  mentor: string;
  scheduleType?: "DEMO";
  available?: boolean;
}

export const defaultTimeSlots: SlotOption[] = [
  { id: "slot-1", time: "10:00 AM", mentor: "" },
  { id: "slot-2", time: "11:00 AM", mentor: "" },
  { id: "slot-3", time: "12:00 PM", mentor: "" },
  { id: "slot-4", time: "01:00 PM", mentor: "" },
  { id: "slot-5", time: "02:00 PM", mentor: "" },
  { id: "slot-6", time: "03:00 PM", mentor: "" },
  { id: "slot-7", time: "04:00 PM", mentor: "" },
  { id: "slot-8", time: "05:00 PM", mentor: "" },
  { id: "slot-9", time: "06:00 PM", mentor: "" },
  { id: "slot-10", time: "07:00 PM", mentor: "" },
  { id: "slot-11", time: "08:00 PM", mentor: "" },
  { id: "slot-12", time: "09:00 PM", mentor: "" },
];

export interface DateOption {
  id: string;
  dayName: string;
  dayDate: string;
  fullDateStr: string;
  weekdayName: string;
  rawDate: Date;
  isCustom?: boolean;
}

export function isUSALocation(presentCountry?: string, countryCode?: string, timezone?: string): boolean {
  const c = (presentCountry || "").trim().toLowerCase();
  if (c === "united states" || c === "usa" || c === "us" || c.includes("united states") || c.includes("usa")) {
    return true;
  }
  if (countryCode === "+1" && (c.includes("states") || c.includes("usa") || c === "us" || !c)) {
    return true;
  }
  if (timezone && (
    timezone.startsWith("America/New_York") ||
    timezone.startsWith("America/Chicago") ||
    timezone.startsWith("America/Denver") ||
    timezone.startsWith("America/Los_Angeles") ||
    timezone.startsWith("America/Anchorage") ||
    timezone.startsWith("Pacific/Honolulu")
  )) {
    return true;
  }
  return false;
}

export function generateQuickDates(isUSA = false): DateOption[] {
  const dates: DateOption[] = [];
  const today = new Date();
  const startOffset = isUSA ? 1 : 0;

  for (let i = 0; i < 4; i++) {
    const offset = startOffset + i;
    const d = new Date(today);
    d.setDate(today.getDate() + offset);

    let dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    if (offset === 0) dayName = "Today";
    else if (offset === 1) dayName = "Tomorrow";

    const dayDate = `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}`;
    const fullDateStr = `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
    }/${d.getFullYear()}`;
    const weekdayName = d.toLocaleDateString("en-US", { weekday: "long" });

    dates.push({
      id: `date-${i}`,
      dayName,
      dayDate,
      fullDateStr,
      weekdayName,
      rawDate: d,
    });
  }

  return dates;
}

export function getCurrentDateTimeInTimezone(timezone: string): Date {
  const now = new Date();
  try {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(now);
    let year = 0, month = 0, day = 0, hour = 0, minute = 0, second = 0;
    for (const part of parts) {
      if (part.type === "year") year = parseInt(part.value, 10);
      if (part.type === "month") month = parseInt(part.value, 10) - 1;
      if (part.type === "day") day = parseInt(part.value, 10);
      if (part.type === "hour") {
        const val = parseInt(part.value, 10);
        hour = val === 24 ? 0 : val;
      }
      if (part.type === "minute") minute = parseInt(part.value, 10);
      if (part.type === "second") second = parseInt(part.value, 10);
    }
    return new Date(year, month, day, hour, minute, second);
  } catch {
    return now;
  }
}

export function parseTimeToMinutes(timeStr: string): number {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hour < 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour * 60 + minute;
}

export function getAvailableSlotsForDate(
  targetDate: Date,
  timezone: string,
  isUSA = false
): SlotOption[] {
  const nowInTz = getCurrentDateTimeInTimezone(timezone);
  const isToday =
    targetDate.getFullYear() === nowInTz.getFullYear() &&
    targetDate.getMonth() === nowInTz.getMonth() &&
    targetDate.getDate() === nowInTz.getDate();

  if (!isToday) {
    return defaultTimeSlots;
  }

  if (isUSA) {
    return [];
  }

  const currentHour = nowInTz.getHours();
  if (currentHour >= 16) {
    return [];
  }

  const currentMinute = nowInTz.getMinutes();
  const gapMinutes = currentHour * 60 + currentMinute + 120;

  // Round off to next full hour (:00)
  const rem = gapMinutes % 60;
  const earliestSlotMinute = rem === 0 ? gapMinutes : gapMinutes + (60 - rem);

  return defaultTimeSlots.filter((slot) => {
    const slotMinutes = parseTimeToMinutes(slot.time);
    return slotMinutes >= earliestSlotMinute;
  });
}

