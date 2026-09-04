export interface TimezoneOption {
  value: string;
  label: string;
  countryKeywords: string[];
}

export const timezones: TimezoneOption[] = [
  // India
  { value: "Asia/Kolkata", label: "🇮🇳 India (IST, UTC+5:30)", countryKeywords: ["india", "ind", "in"] },

  // United Arab Emirates & Oman
  { value: "Asia/Dubai", label: "🇦🇪 UAE / Oman (GST, UTC+4:00)", countryKeywords: ["united arab emirates", "uae", "dubai", "abu dhabi", "oman", "muscat"] },

  // United States & Canada
  { value: "America/New_York", label: "🇺🇸/🇨🇦 US & Canada Eastern (EDT, UTC-4:00)", countryKeywords: ["united states", "usa", "us", "america", "canada", "new york", "toronto", "florida", "georgia", "virginia", "boston", "washington"] },
  { value: "America/Chicago", label: "🇺🇸/🇨🇦 US & Canada Central (CDT, UTC-5:00)", countryKeywords: ["texas", "chicago", "illinois", "minnesota", "wisconsin", "missouri"] },
  { value: "America/Denver", label: "🇺🇸/🇨🇦 US & Canada Mountain (MDT, UTC-6:00)", countryKeywords: ["colorado", "denver", "utah", "arizona", "alberta", "calgary"] },
  { value: "America/Los_Angeles", label: "🇺🇸/🇨🇦 US & Canada Pacific (PDT, UTC-7:00)", countryKeywords: ["california", "los angeles", "san francisco", "seattle", "washington state", "vancouver", "british columbia"] },
  { value: "America/Anchorage", label: "🇺🇸 US Alaska (AKDT, UTC-8:00)", countryKeywords: ["alaska"] },
  { value: "Pacific/Honolulu", label: "🇺🇸 US Hawaii (HST, UTC-10:00)", countryKeywords: ["hawaii", "honolulu"] },

  // United Kingdom & Ireland
  { value: "Europe/London", label: "🇬🇧 UK & Ireland (BST/GMT, UTC+1:00)", countryKeywords: ["united kingdom", "uk", "great britain", "england", "scotland", "wales", "ireland", "london", "dublin"] },

  // Qatar, Saudi Arabia, Kuwait, Bahrain
  { value: "Asia/Riyadh", label: "🇸🇦 Saudi Arabia / Qatar / Kuwait / Bahrain (AST, UTC+3:00)", countryKeywords: ["saudi arabia", "saudi", "qatar", "doha", "kuwait", "bahrain", "riyadh", "jeddah"] },

  // Singapore & Malaysia
  { value: "Asia/Singapore", label: "🇸🇬 Singapore & Malaysia (SGT/MYT, UTC+8:00)", countryKeywords: ["singapore", "malaysia", "kuala lumpur", "sg", "my"] },

  // Australia
  { value: "Australia/Sydney", label: "🇦🇺 Australia Eastern (AEST, UTC+10:00)", countryKeywords: ["australia", "sydney", "melbourne", "brisbane", "canberra", "au"] },
  { value: "Australia/Adelaide", label: "🇦🇺 Australia Central (ACST, UTC+9:30)", countryKeywords: ["adelaide", "south australia"] },
  { value: "Australia/Perth", label: "🇦🇺 Australia Western (AWST, UTC+8:00)", countryKeywords: ["perth", "western australia"] },

  // Argentina
  { value: "America/Argentina/Buenos_Aires", label: "🇦🇷 Argentina (ART, UTC-3:00)", countryKeywords: ["argentina", "buenos aires", "ar"] },

  // Bangladesh
  { value: "Asia/Dhaka", label: "🇧🇩 Bangladesh (BST, UTC+6:00)", countryKeywords: ["bangladesh", "bd"] },

  // Brazil
  { value: "America/Sao_Paulo", label: "🇧🇷 Brazil (BRT, UTC-3:00)", countryKeywords: ["brazil", "sao paulo", "rio de janeiro", "br"] },

  // Chile
  { value: "America/Santiago", label: "🇨🇱 Chile (CLT, UTC-4:00)", countryKeywords: ["chile", "santiago"] },

  // China / Hong Kong / Taiwan
  { value: "Asia/Hong_Kong", label: "🇭🇰 Hong Kong & Taiwan & China (HKT/CST, UTC+8:00)", countryKeywords: ["hong kong", "taiwan", "china", "beijing", "shanghai", "taipei"] },

  // Colombia / Peru / Ecuador
  { value: "America/Bogota", label: "🇨🇴 Colombia / Peru / Ecuador (COT, UTC-5:00)", countryKeywords: ["colombia", "peru", "ecuador", "bogota", "lima"] },

  // Egypt
  { value: "Africa/Cairo", label: "🇪🇬 Egypt (EEST, UTC+3:00)", countryKeywords: ["egypt", "cairo"] },

  // France & Western Europe
  { value: "Europe/Paris", label: "🇫🇷 Western Europe - France / Spain / Netherlands (CEST, UTC+2:00)", countryKeywords: ["france", "spain", "netherlands", "belgium", "paris", "madrid", "amsterdam", "brussels"] },

  // Germany & Central Europe
  { value: "Europe/Berlin", label: "🇩🇪 Central Europe - Germany / Italy / Switzerland / Sweden (CEST, UTC+2:00)", countryKeywords: ["germany", "italy", "switzerland", "sweden", "norway", "denmark", "austria", "poland", "czech republic", "berlin", "rome", "zurich", "vienna"] },

  // Greece & Eastern Europe
  { value: "Europe/Athens", label: "🇬🇷 Eastern Europe - Greece / Turkey / Romania / Ukraine (EEST, UTC+3:00)", countryKeywords: ["greece", "turkey", "romania", "ukraine", "bulgaria", "athens", "istanbul"] },

  // Indonesia
  { value: "Asia/Jakarta", label: "🇮🇩 Indonesia Western (WIB, UTC+7:00)", countryKeywords: ["indonesia", "jakarta", "id"] },

  // Iran
  { value: "Asia/Tehran", label: "🇮🇷 Iran (IRST, UTC+3:30)", countryKeywords: ["iran", "tehran"] },

  // Japan & South Korea
  { value: "Asia/Tokyo", label: "🇯🇵 Japan & South Korea (JST/KST, UTC+9:00)", countryKeywords: ["japan", "south korea", "tokyo", "seoul", "jp", "kr"] },

  // Jordan / Lebanon / Palestine
  { value: "Asia/Amman", label: "🇯🇴 Jordan / Lebanon / Palestine (EEST, UTC+3:00)", countryKeywords: ["jordan", "lebanon", "palestine", "beirut", "amman"] },

  // Kenya & East Africa
  { value: "Africa/Nairobi", label: "🇰🇪 Kenya & East Africa (EAT, UTC+3:00)", countryKeywords: ["kenya", "tanzania", "ethiopia", "uganda", "nairobi"] },

  // Nepal
  { value: "Asia/Kathmandu", label: "🇳🇵 Nepal (NPT, UTC+5:45)", countryKeywords: ["nepal", "np"] },

  // New Zealand
  { value: "Pacific/Auckland", label: "🇳🇿 New Zealand (NZST, UTC+12:00)", countryKeywords: ["new zealand", "auckland", "wellington", "nz"] },

  // Nigeria & West Africa
  { value: "Africa/Lagos", label: "🇳🇬 Nigeria & West Africa (WAT, UTC+1:00)", countryKeywords: ["nigeria", "ghana", "lagos", "accra"] },

  // Pakistan
  { value: "Asia/Karachi", label: "🇵🇰 Pakistan (PKT, UTC+5:00)", countryKeywords: ["pakistan", "pk"] },

  // Philippines
  { value: "Asia/Manila", label: "🇵🇭 Philippines (PHT, UTC+8:00)", countryKeywords: ["philippines", "manila", "ph"] },

  // Russia
  { value: "Europe/Moscow", label: "🇷🇺 Russia - Moscow (MSK, UTC+3:00)", countryKeywords: ["russia", "moscow"] },

  // South Africa
  { value: "Africa/Johannesburg", label: "🇿🇦 South Africa (SAST, UTC+2:00)", countryKeywords: ["south africa", "johannesburg", "cape town", "za"] },

  // Sri Lanka
  { value: "Asia/Colombo", label: "🇱🇰 Sri Lanka (SLST, UTC+5:30)", countryKeywords: ["sri lanka", "lk"] },

  // Thailand & Vietnam & Cambodia
  { value: "Asia/Bangkok", label: "🇹🇭 Thailand & Vietnam & Cambodia (ICT, UTC+7:00)", countryKeywords: ["thailand", "vietnam", "cambodia", "laos", "bangkok", "hanoi"] },
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
  "Philippines",
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
  "South Korea",
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
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

export const allCountryCodesList = [
  { code: "+91", flag: "🇮🇳", label: "India (+91)", country: "India" },
  { code: "+971", flag: "🇦🇪", label: "UAE (+971)", country: "United Arab Emirates" },
  { code: "+1", flag: "🇺🇸", label: "USA (+1)", country: "United States" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)", country: "United Kingdom" },
  { code: "+1", flag: "🇨🇦", label: "Canada (+1)", country: "Canada" },
  { code: "+974", flag: "🇶🇦", label: "Qatar (+974)", country: "Qatar" },
  { code: "+966", flag: "🇸🇦", label: "Saudi Arabia (+966)", country: "Saudi Arabia" },
  { code: "+968", flag: "🇴🇲", label: "Oman (+968)", country: "Oman" },
  { code: "+965", flag: "🇰🇼", label: "Kuwait (+965)", country: "Kuwait" },
  { code: "+973", flag: "🇧🇭", label: "Bahrain (+973)", country: "Bahrain" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)", country: "Singapore" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)", country: "Australia" },
  { code: "+93", flag: "🇦🇫", label: "Afghanistan (+93)", country: "Afghanistan" },
  { code: "+355", flag: "🇦🇱", label: "Albania (+355)", country: "Albania" },
  { code: "+213", flag: "🇩🇿", label: "Algeria (+213)", country: "Algeria" },
  { code: "+376", flag: "🇦🇩", label: "Andorra (+376)", country: "Andorra" },
  { code: "+244", flag: "🇦🇴", label: "Angola (+244)", country: "Angola" },
  { code: "+54", flag: "🇦🇷", label: "Argentina (+54)", country: "Argentina" },
  { code: "+374", flag: "🇦🇲", label: "Armenia (+374)", country: "Armenia" },
  { code: "+43", flag: "🇦🇹", label: "Austria (+43)", country: "Austria" },
  { code: "+994", flag: "🇦🇿", label: "Azerbaijan (+994)", country: "Azerbaijan" },
  { code: "+1-242", flag: "🇧🇸", label: "Bahamas (+1-242)", country: "Bahamas" },
  { code: "+880", flag: "🇧🇩", label: "Bangladesh (+880)", country: "Bangladesh" },
  { code: "+1-246", flag: "🇧🇧", label: "Barbados (+1-246)", country: "Barbados" },
  { code: "+375", flag: "🇧🇾", label: "Belarus (+375)", country: "Belarus" },
  { code: "+32", flag: "🇧🇪", label: "Belgium (+32)", country: "Belgium" },
  { code: "+501", flag: "🇧🇿", label: "Belize (+501)", country: "Belize" },
  { code: "+229", flag: "🇧🇯", label: "Benin (+229)", country: "Benin" },
  { code: "+975", flag: "🇧🇹", label: "Bhutan (+975)", country: "Bhutan" },
  { code: "+591", flag: "🇧🇴", label: "Bolivia (+591)", country: "Bolivia" },
  { code: "+387", flag: "🇧🇦", label: "Bosnia & Herzegovina (+387)", country: "Bosnia and Herzegovina" },
  { code: "+267", flag: "🇧🇼", label: "Botswana (+267)", country: "Botswana" },
  { code: "+55", flag: "🇧🇷", label: "Brazil (+55)", country: "Brazil" },
  { code: "+673", flag: "🇧🇳", label: "Brunei (+673)", country: "Brunei" },
  { code: "+359", flag: "🇧🇬", label: "Bulgaria (+359)", country: "Bulgaria" },
  { code: "+226", flag: "🇧🇫", label: "Burkina Faso (+226)", country: "Burkina Faso" },
  { code: "+257", flag: "🇧🇮", label: "Burundi (+257)", country: "Burundi" },
  { code: "+855", flag: "🇰🇭", label: "Cambodia (+855)", country: "Cambodia" },
  { code: "+237", flag: "🇨🇲", label: "Cameroon (+237)", country: "Cameroon" },
  { code: "+56", flag: "🇨🇱", label: "Chile (+56)", country: "Chile" },
  { code: "+86", flag: "🇨🇳", label: "China (+86)", country: "China" },
  { code: "+57", flag: "🇨🇴", label: "Colombia (+57)", country: "Colombia" },
  { code: "+506", flag: "🇨🇷", label: "Costa Rica (+506)", country: "Costa Rica" },
  { code: "+385", flag: "🇭🇷", label: "Croatia (+385)", country: "Croatia" },
  { code: "+53", flag: "🇨🇺", label: "Cuba (+53)", country: "Cuba" },
  { code: "+357", flag: "🇨🇾", label: "Cyprus (+357)", country: "Cyprus" },
  { code: "+420", flag: "🇨🇿", label: "Czech Republic (+420)", country: "Czech Republic" },
  { code: "+45", flag: "🇩🇰", label: "Denmark (+45)", country: "Denmark" },
  { code: "+253", flag: "🇩🇯", label: "Djibouti (+253)", country: "Djibouti" },
  { code: "+1-809", flag: "🇩🇴", label: "Dominican Republic (+1-809)", country: "Dominican Republic" },
  { code: "+593", flag: "🇪🇨", label: "Ecuador (+593)", country: "Ecuador" },
  { code: "+20", flag: "🇪🇬", label: "Egypt (+20)", country: "Egypt" },
  { code: "+503", flag: "🇸🇻", label: "El Salvador (+503)", country: "El Salvador" },
  { code: "+372", flag: "🇪🇪", label: "Estonia (+372)", country: "Estonia" },
  { code: "+251", flag: "🇪🇹", label: "Ethiopia (+251)", country: "Ethiopia" },
  { code: "+679", flag: "🇫🇯", label: "Fiji (+679)", country: "Fiji" },
  { code: "+358", flag: "🇫🇮", label: "Finland (+358)", country: "Finland" },
  { code: "+33", flag: "🇫🇷", label: "France (+33)", country: "France" },
  { code: "+995", flag: "🇬🇪", label: "Georgia (+995)", country: "Georgia" },
  { code: "+49", flag: "🇩🇪", label: "Germany (+49)", country: "Germany" },
  { code: "+233", flag: "🇬🇭", label: "Ghana (+233)", country: "Ghana" },
  { code: "+30", flag: "🇬🇷", label: "Greece (+30)", country: "Greece" },
  { code: "+502", flag: "🇬🇹", label: "Guatemala (+502)", country: "Guatemala" },
  { code: "+592", flag: "🇬🇾", label: "Guyana (+592)", country: "Guyana" },
  { code: "+509", flag: "🇭🇹", label: "Haiti (+509)", country: "Haiti" },
  { code: "+504", flag: "🇭🇳", label: "Honduras (+504)", country: "Honduras" },
  { code: "+852", flag: "🇭🇰", label: "Hong Kong (+852)", country: "Hong Kong" },
  { code: "+36", flag: "🇭🇺", label: "Hungary (+36)", country: "Hungary" },
  { code: "+354", flag: "🇮🇸", label: "Iceland (+354)", country: "Iceland" },
  { code: "+62", flag: "🇮🇩", label: "Indonesia (+62)", country: "Indonesia" },
  { code: "+98", flag: "🇮🇷", label: "Iran (+98)", country: "Iran" },
  { code: "+964", flag: "🇮🇶", label: "Iraq (+964)", country: "Iraq" },
  { code: "+353", flag: "🇮🇪", label: "Ireland (+353)", country: "Ireland" },
  { code: "+972", flag: "🇮🇱", label: "Israel (+972)", country: "Israel" },
  { code: "+39", flag: "🇮🇹", label: "Italy (+39)", country: "Italy" },
  { code: "+1-876", flag: "🇯🇲", label: "Jamaica (+1-876)", country: "Jamaica" },
  { code: "+81", flag: "🇯🇵", label: "Japan (+81)", country: "Japan" },
  { code: "+962", flag: "🇯🇴", label: "Jordan (+962)", country: "Jordan" },
  { code: "+7", flag: "🇰🇿", label: "Kazakhstan (+7)", country: "Kazakhstan" },
  { code: "+254", flag: "🇰🇪", label: "Kenya (+254)", country: "Kenya" },
  { code: "+856", flag: "🇱🇦", label: "Laos (+856)", country: "Laos" },
  { code: "+371", flag: "🇱🇻", label: "Latvia (+371)", country: "Latvia" },
  { code: "+961", flag: "🇱🇧", label: "Lebanon (+961)", country: "Lebanon" },
  { code: "+231", flag: "🇱🇷", label: "Liberia (+231)", country: "Liberia" },
  { code: "+218", flag: "🇱🇾", label: "Libya (+218)", country: "Libya" },
  { code: "+423", flag: "🇱🇮", label: "Liechtenstein (+423)", country: "Liechtenstein" },
  { code: "+370", flag: "🇱🇹", label: "Lithuania (+370)", country: "Lithuania" },
  { code: "+352", flag: "🇱🇺", label: "Luxembourg (+352)", country: "Luxembourg" },
  { code: "+261", flag: "🇲🇬", label: "Madagascar (+261)", country: "Madagascar" },
  { code: "+60", flag: "🇲🇾", label: "Malaysia (+60)", country: "Malaysia" },
  { code: "+960", flag: "🇲🇻", label: "Maldives (+960)", country: "Maldives" },
  { code: "+223", flag: "🇲🇱", label: "Mali (+223)", country: "Mali" },
  { code: "+356", flag: "🇲🇹", label: "Malta (+356)", country: "Malta" },
  { code: "+230", flag: "🇲🇺", label: "Mauritius (+230)", country: "Mauritius" },
  { code: "+52", flag: "🇲🇽", label: "Mexico (+52)", country: "Mexico" },
  { code: "+373", flag: "🇲🇩", label: "Moldova (+373)", country: "Moldova" },
  { code: "+377", flag: "🇲🇨", label: "Monaco (+377)", country: "Monaco" },
  { code: "+976", flag: "🇲🇳", label: "Mongolia (+976)", country: "Mongolia" },
  { code: "+382", flag: "🇲🇪", label: "Montenegro (+382)", country: "Montenegro" },
  { code: "+212", flag: "🇲🇦", label: "Morocco (+212)", country: "Morocco" },
  { code: "+258", flag: "🇲🇿", label: "Mozambique (+258)", country: "Mozambique" },
  { code: "+95", flag: "🇲🇲", label: "Myanmar (+95)", country: "Myanmar" },
  { code: "+264", flag: "🇳🇦", label: "Namibia (+264)", country: "Namibia" },
  { code: "+977", flag: "🇳🇵", label: "Nepal (+977)", country: "Nepal" },
  { code: "+31", flag: "🇳🇱", label: "Netherlands (+31)", country: "Netherlands" },
  { code: "+64", flag: "🇳🇿", label: "New Zealand (+64)", country: "New Zealand" },
  { code: "+505", flag: "🇳🇮", label: "Nicaragua (+505)", country: "Nicaragua" },
  { code: "+227", flag: "🇳🇪", label: "Niger (+227)", country: "Niger" },
  { code: "+234", flag: "🇳🇬", label: "Nigeria (+234)", country: "Nigeria" },
  { code: "+47", flag: "🇳🇴", label: "Norway (+47)", country: "Norway" },
  { code: "+92", flag: "🇵🇰", label: "Pakistan (+92)", country: "Pakistan" },
  { code: "+970", flag: "🇵🇸", label: "Palestine (+970)", country: "Palestine" },
  { code: "+507", flag: "🇵🇦", label: "Panama (+507)", country: "Panama" },
  { code: "+675", flag: "🇵🇬", label: "Papua New Guinea (+675)", country: "Papua New Guinea" },
  { code: "+595", flag: "🇵🇾", label: "Paraguay (+595)", country: "Paraguay" },
  { code: "+63", flag: "🇵🇭", label: "Philippines (+63)", country: "Philippines" },
  { code: "+351", flag: "🇵🇹", label: "Portugal (+351)", country: "Portugal" },
  { code: "+40", flag: "🇷🇴", label: "Romania (+40)", country: "Romania" },
  { code: "+7", flag: "🇷🇺", label: "Russia (+7)", country: "Russia" },
  { code: "+250", flag: "🇷🇼", label: "Rwanda (+250)", country: "Rwanda" },
  { code: "+221", flag: "🇸🇳", label: "Senegal (+221)", country: "Senegal" },
  { code: "+381", flag: "🇷🇸", label: "Serbia (+381)", country: "Serbia" },
  { code: "+232", flag: "🇸🇱", label: "Sierra Leone (+232)", country: "Sierra Leone" },
  { code: "+421", flag: "🇸🇰", label: "Slovakia (+421)", country: "Slovakia" },
  { code: "+386", flag: "🇸🇮", label: "Slovenia (+386)", country: "Slovenia" },
  { code: "+252", flag: "🇸🇴", label: "Somalia (+252)", country: "Somalia" },
  { code: "+27", flag: "🇿🇦", label: "South Africa (+27)", country: "South Africa" },
  { code: "+82", flag: "🇰🇷", label: "South Korea (+82)", country: "South Korea" },
  { code: "+34", flag: "🇪🇸", label: "Spain (+34)", country: "Spain" },
  { code: "+94", flag: "🇱🇰", label: "Sri Lanka (+94)", country: "Sri Lanka" },
  { code: "+249", flag: "🇸🇩", label: "Sudan (+249)", country: "Sudan" },
  { code: "+597", flag: "🇸🇷", label: "Suriname (+597)", country: "Suriname" },
  { code: "+46", flag: "🇸🇪", label: "Sweden (+46)", country: "Sweden" },
  { code: "+41", flag: "🇨🇭", label: "Switzerland (+41)", country: "Switzerland" },
  { code: "+963", flag: "🇸🇾", label: "Syria (+963)", country: "Syria" },
  { code: "+886", flag: "🇹🇼", label: "Taiwan (+886)", country: "Taiwan" },
  { code: "+992", flag: "🇹🇯", label: "Tajikistan (+992)", country: "Tajikistan" },
  { code: "+255", flag: "🇹🇿", label: "Tanzania (+255)", country: "Tanzania" },
  { code: "+66", flag: "🇹🇭", label: "Thailand (+66)", country: "Thailand" },
  { code: "+228", flag: "🇹🇬", label: "Togo (+228)", country: "Togo" },
  { code: "+1-868", flag: "🇹🇹", label: "Trinidad and Tobago (+1-868)", country: "Trinidad and Tobago" },
  { code: "+216", flag: "🇹🇳", label: "Tunisia (+216)", country: "Tunisia" },
  { code: "+90", flag: "🇹🇷", label: "Turkey (+90)", country: "Turkey" },
  { code: "+993", flag: "🇹🇲", label: "Turkmenistan (+993)", country: "Turkmenistan" },
  { code: "+256", flag: "🇺🇬", label: "Uganda (+256)", country: "Uganda" },
  { code: "+598", flag: "🇺🇾", label: "Uruguay (+598)", country: "Uruguay" },
  { code: "+998", flag: "🇺🇿", label: "Uzbekistan (+998)", country: "Uzbekistan" },
  { code: "+379", flag: "🇻🇦", label: "Vatican City (+379)", country: "Vatican City" },
  { code: "+58", flag: "🇻🇪", label: "Venezuela (+58)", country: "Venezuela" },
  { code: "+84", flag: "🇻🇳", label: "Vietnam (+84)", country: "Vietnam" },
  { code: "+967", flag: "🇾🇪", label: "Yemen (+967)", country: "Yemen" },
  { code: "+260", flag: "🇿🇲", label: "Zambia (+260)", country: "Zambia" },
  { code: "+263", flag: "🇿🇼", label: "Zimbabwe (+263)", country: "Zimbabwe" },
];

export function detectUserTimezone(): string {
  try {
    if (typeof window !== "undefined" && typeof Intl !== "undefined") {
      const deviceTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (deviceTz) {
        const exact = timezones.find((t) => t.value.toLowerCase() === deviceTz.toLowerCase());
        if (exact) return exact.value;

        const city = deviceTz.split("/")[1]?.replace("_", " ").toLowerCase();
        if (city) {
          const matchCity = timezones.find((t) =>
            t.countryKeywords.some((k) => k.includes(city) || city.includes(k)) ||
            t.value.toLowerCase().includes(city)
          );
          if (matchCity) return matchCity.value;
        }

        const region = deviceTz.split("/")[0];
        const matchRegion = timezones.find((t) => t.value.startsWith(region));
        if (matchRegion) return matchRegion.value;
      }
    }
  } catch {
    // Ignore error
  }
  return "Asia/Kolkata";
}

export function getCountryCodeFromTimezone(tz: string): string {
  if (!tz) return "+91";
  const lower = tz.toLowerCase();
  if (lower.includes("kolkata") || lower.includes("india")) return "+91";
  if (lower.includes("dubai") || lower.includes("riyadh") || lower.includes("abudhabi") || lower.includes("muscat")) return "+971";
  if (lower.startsWith("america/") || lower.includes("new_york") || lower.includes("chicago") || lower.includes("los_angeles")) return "+1";
  if (lower.includes("london") || lower.includes("uk") || lower.includes("europe")) return "+44";
  if (lower.includes("singapore")) return "+65";
  if (lower.startsWith("australia/")) return "+61";
  return "+91";
}

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

  return detectUserTimezone();
}

export interface SlotOption {
  id: string;
  time: string;
  mentor: string;
  scheduleType?: "DEMO";
  available?: boolean;
  bookedCount?: number;
  maxCapacity?: number;
  remainingSeats?: number;
  isBookedOut?: boolean;
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

export function generateQuickDates(isUSA = false, timezone = "Asia/Kolkata"): DateOption[] {
  const dates: DateOption[] = [];
  const today = new Date();

  // Check if Today has any available slots
  const todaySlots = getAvailableSlotsForDate(today, timezone, isUSA);
  const isTodayAvailable = !isUSA && todaySlots.length > 0;

  const startOffset = isTodayAvailable ? 0 : 1;

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
  isUSA = false,
  customCutoffHour?: number
): SlotOption[] {
  // ponytail: cutoff clock runs on IST for everyone except USA (USA keeps its original viewer-clock behavior)
  const nowInTz = getCurrentDateTimeInTimezone(isUSA ? timezone : "Asia/Kolkata");
  const isToday =
    targetDate.getFullYear() === nowInTz.getFullYear() &&
    targetDate.getMonth() === nowInTz.getMonth() &&
    targetDate.getDate() === nowInTz.getDate();

  if (!isToday) {
    const t = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
    const n = new Date(nowInTz.getFullYear(), nowInTz.getMonth(), nowInTz.getDate()).getTime();
    return t < n ? [] : defaultTimeSlots; // past IST dates: nothing; future: all
  }

  if (isUSA) {
    return [];
  }

  const currentHour = nowInTz.getHours();
  const cutoffHour = typeof customCutoffHour === "number" ? customCutoffHour : 16;
  if (currentHour >= cutoffHour) {
    return [];
  }

  // Earliest slot calculation:
  // For any time in hour H (e.g. 9:00 AM - 9:59 AM), the earliest slot shown is (H + 2):00 (e.g. 11:00 AM).
  // Only when time reaches H + 1 (10:00 AM) does the earliest slot change to 12:00 PM.
  const earliestSlotMinute = (currentHour + 2) * 60;

  return defaultTimeSlots.filter((slot) => {
    const slotMinutes = parseTimeToMinutes(slot.time);
    return slotMinutes >= earliestSlotMinute;
  });
}


// Slot times are canonical IST everywhere (state, capacity keys, submitted payloads) — mentors are India-side.
// This converts an IST slot label to the viewer's local wall time for DISPLAY only.
const IST_UTC_OFFSET_MIN = 330; // IST is UTC+5:30, no DST

export function istSlotToLocalLabel(istTime: string, timezone: string, onDate?: Date): string {
  if (!timezone || timezone === "Asia/Kolkata") return istTime;
  try {
    const d = onDate ?? new Date();
    const utcMs = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, parseTimeToMinutes(istTime) - IST_UTC_OFFSET_MIN);
    // ponytail: zones at UTC-4:30 or lower (non-US Americas) can land on the previous local day; add a day marker if those markets matter
    return new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(utcMs));
  } catch {
    return istTime;
  }
}
