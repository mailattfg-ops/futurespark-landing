export interface TimezoneOption {
  value: string;
  label: string;
}

export const timezones: TimezoneOption[] = [
  { value: "Asia/Kolkata", label: "🇮🇳 India (IST, UTC+5:30)" },
  { value: "Asia/Dubai", label: "🇦🇪 UAE / Gulf (GST, UTC+4:00)" },
  { value: "America/New_York", label: "🇺🇸 USA Eastern (EDT, UTC-4:00)" },
  { value: "America/Los_Angeles", label: "🇺🇸 USA Pacific (PDT, UTC-7:00)" },
  { value: "Europe/London", label: "🇬🇧 UK (BST, UTC+1:00)" },
  { value: "Asia/Singapore", label: "🇸🇬 Singapore (SGT, UTC+8:00)" },
  { value: "Australia/Sydney", label: "🇦🇺 Australia (AEST, UTC+10:00)" },
  { value: "Asia/Riyadh", label: "🇸🇦 Saudi Arabia / Qatar (AST, UTC+3:00)" },
  { value: "Asia/Tokyo", label: "🇯🇵 Japan (JST, UTC+9:00)" },
  { value: "Europe/Paris", label: "🇫🇷 Europe Central (CET, UTC+1:00)" },
  { value: "Canada/Eastern", label: "🇨🇦 Canada Eastern (EDT, UTC-4:00)" },
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
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
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
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "South Korea",
  "Laos",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Rwanda",
  "Senegal",
  "Serbia",
  "Sierra Leone",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

export function getMatchingTimezone(countryStr: string, countryCodeStr?: string): string {
  const c = (countryStr || "").trim().toLowerCase();
  const code = (countryCodeStr || "").trim();

  if (c) {
    if (c.includes("india") || c.includes("ind") || c === "in") return "Asia/Kolkata";
    if (c.includes("uae") || c.includes("dubai") || c.includes("emirates") || c.includes("abudhabi") || c.includes("abu dhabi")) return "Asia/Dubai";
    if (c.includes("qatar") || c.includes("doha") || c.includes("saudi") || c.includes("riyadh") || c.includes("kuwait") || c.includes("oman") || c.includes("muscat") || c.includes("bahrain")) return "Asia/Riyadh";
    if (c.includes("usa") || c.includes("united states") || c.includes("america") || c.includes("us") || c.includes("new york") || c.includes("california") || c.includes("texas")) {
      if (c.includes("california") || c.includes("pacific") || c.includes("la") || c.includes("los angeles")) {
        return "America/Los_Angeles";
      }
      return "America/New_York";
    }
    if (c.includes("uk") || c.includes("united kingdom") || c.includes("london") || c.includes("britain") || c.includes("england") || c.includes("scotland")) return "Europe/London";
    if (c.includes("singapore") || c.includes("sg")) return "Asia/Singapore";
    if (c.includes("australia") || c.includes("sydney") || c.includes("melbourne") || c.includes("brisbane") || c.includes("au")) return "Australia/Sydney";
    if (c.includes("japan") || c.includes("tokyo") || c.includes("jp")) return "Asia/Tokyo";
    if (c.includes("canada") || c.includes("toronto") || c.includes("vancouver") || c.includes("ca")) return "Canada/Eastern";
    if (c.includes("france") || c.includes("germany") || c.includes("europe") || c.includes("paris") || c.includes("berlin")) return "Europe/Paris";
  }

  if (code === "+91") return "Asia/Kolkata";
  if (code === "+971") return "Asia/Dubai";
  if (code === "+1") return "America/New_York";
  if (code === "+44") return "Europe/London";
  if (code === "+65") return "Asia/Singapore";
  if (code === "+61") return "Australia/Sydney";

  return "Asia/Kolkata";
}
