// ============================================
// ZACHI'S BACHELOR TRIP — DATA
// ============================================

const TRIP = {
  title: "ZACHI'S BACHELOR TRIP",
  subtitle: "AUSTRIA EDITION 🇦🇹",
  tagline: "12 Bros • 1 Epic Adventure • Infinite Beers",
  dates: "April 21–26, 2026",

  // ---- PARTICIPANTS ----
  participants: [
    { name: "Zachi Baran", nickname: "Bridezilla", emoji: "👑", role: "Another one bites the dust" },
    { name: "Ran Sasportas", nickname: "The Navigator", emoji: "🧭", role: "Chief route planner" },
    { name: "Amit Solomon", nickname: "The Wise Guy", emoji: "🧠", role: "Group philosopher" },
    { name: "Naor Ohana", nickname: "Captain Naor", emoji: "🎵", role: "Karaoke finder" },
    { name: "Eden Cohen", nickname: "Tuli Gadol", emoji: "🌿", role: "MD supplier" },
    { name: "Sagi Moskovich", nickname: "The Lawyer", emoji: "🐻", role: "The Fixer" },
    { name: "Guy Zuri", nickname: "Yolo Guy", emoji: "😎", role: "The chillest dude" },
    { name: "Yakir Osi", nickname: "Mountain Yak", emoji: "🏔️", role: "Car rental guy" },
    { name: "Tomer", nickname: "Palm Tree", emoji: "🌴", role: "Standing tall" },
    { name: "Shaked Hare", nickname: "Shaaaaked", emoji: "🐇", role: "Make everyone sleep better" },
    { name: "Aviv Shay", nickname: "Bitchez", emoji: "☀️", role: "Bring the bitchez" },
    { name: "Ori Wohl", nickname: "Football Ori", emoji: "🦁", role: "Fearless strongman" }
  ],

  // ---- FLIGHTS ----
  flights: {
    outbound: {
      from: "TLV (Ben Gurion)",
      to: "VIE (Vienna)",
      date: "April 21, 2026",
      icon: "✈️"
    },
    return: {
      from: "VIE (Vienna)",
      to: "TLV (Ben Gurion)",
      date: "April 26, 2026",
      departure: "13:15",
      arrival: "16:30",
      icon: "✈️"
    }
  },

  // ---- ACCOMMODATIONS ----
  accommodations: {
    vienna: {
      name: "The Social Hub Vienna",
      type: "Hotel",
      nights: "2 nights (Apr 21 & Apr 25)",
      features: ["Dorm-style rooms", "6 bunk beds per room", "Central location", "2 rooms for 12 people"],
      coords: [48.185, 16.378],
      icon: "🏨",
      url: "https://www.thesocialhub.co/vienna/"
    },
    obertraun: {
      name: "Dormio Resort Obertraun",
      type: "Resort Cabins",
      nights: "3 nights (Apr 22–24)",
      features: ["Wooden cabins on the lake", "Kayaks available", "Swimming pool", "Sauna", "Breakfast dining hall", "Bar & restaurant", "Hiking trails nearby", "8 bedrooms with separate beds"],
      coords: [47.556, 13.696],
      icon: "🏕️",
      url: "https://www.dormio.de/en/holiday-parks/dormio-resort-obertraun/"
    }
  },

  // ---- DAYS ----
  days: [
    // ===== DAY 0 — ARRIVAL =====
    {
      id: 0,
      date: "April 21",
      weekday: "Tuesday",
      title: "TOUCHDOWN VIENNA!",
      tagline: "The adventure begins",
      icon: "✈️",
      color: "#e53935",
      accommodation: "vienna",
      driveTime: "40–50 min from airport",
      hikeDistance: null,
      summary: "Fly from Tel Aviv to Vienna. Check in at The Social Hub. Explore the city, grab dinner, and get ready for the road trip of a lifetime!",
      route: [
        { name: "Vienna Airport (VIE)", coords: [48.110, 16.570], icon: "🛬", type: "airport" },
        { name: "The Social Hub Vienna", coords: [48.185, 16.378], icon: "🏨", type: "hotel" }
      ],
      activities: [
        { time: "Afternoon", title: "Land in Vienna", description: "Welcome to Austria! 🇦🇹 Grab your bags and get moving!", icon: "🛬", type: "travel" },
        { time: "Evening", title: "Check in & Explore", description: "Drop bags at The Social Hub, hit the streets of Vienna", icon: "🏨", type: "accommodation" },
        { time: "Night", title: "First Night Out", description: "Dinner & drinks in Vienna — the bachelor trip starts NOW!", icon: "🍻", type: "food" }
      ],
      packing: ["Passport & boarding pass", "Phone charger & power bank", "Entertainment for flight", "Light jacket for Vienna evening", "Comfortable shoes for walking"]
    },

    // ===== DAY 1 — THE GREAT DRIVE =====
    {
      id: 1,
      date: "April 22",
      weekday: "Wednesday",
      title: "THE GREAT DRIVE",
      tagline: "Vienna → Mountains → Paradise",
      icon: "🚐",
      color: "#fb8c00",
      accommodation: "obertraun",
      driveTime: "~4 hours total",
      hikeDistance: "5.5 km",
      summary: "Pick up rental cars, stock up on supplies, and embark on the epic drive through the Austrian Alps. Stop for a stunning ridge hike at Rossbrand before arriving at the lake resort.",
      route: [
        { name: "The Social Hub Vienna", coords: [48.185, 16.378], icon: "🏨", type: "start" },
        { name: "Supermarket Stop", coords: [48.155, 16.310], icon: "🛒", type: "stop" },
        { name: "St. Pölten", coords: [48.200, 15.630], icon: "🚐", type: "drive" },
        { name: "Amstetten", coords: [48.120, 14.870], icon: "🚐", type: "drive" },
        { name: "Liezen", coords: [47.570, 14.230], icon: "🚐", type: "drive" },
        { name: "Radstadt", coords: [47.383, 13.460], icon: "🚐", type: "drive" },
        { name: "Rossbrand Ridge", coords: [47.380, 13.433], icon: "🥾", type: "hike" },
        { name: "Radstädter Hütte", coords: [47.390, 13.440], icon: "🍺", type: "lunch" },
        { name: "Schladming", coords: [47.394, 13.690], icon: "🚐", type: "drive" },
        { name: "Bad Aussee", coords: [47.610, 13.780], icon: "🚐", type: "drive" },
        { name: "Dormio Resort Obertraun", coords: [47.556, 13.696], icon: "🏕️", type: "end" }
      ],
      activities: [
        { time: "Morning", title: "Pick Up Rental Cars", description: "Grab the wheels and load up the crew!", icon: "🚗", type: "logistics" },
        { time: "Morning", title: "Supermarket Raid", description: "Stock up on snacks, drinks, and cabin supplies for 3 nights", icon: "🛒", type: "logistics" },
        { time: "Midday", title: "The Great Drive", description: "Hit the A1 highway heading west through the Austrian countryside", icon: "🚐", type: "drive" },
        { time: "Afternoon", title: "Rossbrand Ridge Hike", description: "5.5 km hike on a high alpine panoramic ridge with EPIC views!", icon: "🥾", type: "hike", link: "https://www.google.com/maps/place/Rossbrand,+5550+Radstadt,+Austria/" },
        { time: "Afternoon", title: "Lunch at Radstädter Hütte", description: "Alpine hut on the Rossbrand ridge. First Austrian beers! 🍺", icon: "🍽️", type: "food", link: "https://www.google.com/maps/search/Radst%C3%A4dter+H%C3%BCtte+Rossbrand/" },
        { time: "Evening", title: "Arrive at Dormio Resort", description: "Check in to the wooden cabins on the lake. Pool, sauna, and bar await!", icon: "🏕️", type: "accommodation", link: "https://www.dormio.de/en/holiday-parks/dormio-resort-obertraun/" }
      ],
      packing: ["Hiking boots", "Water bottle", "Sunscreen", "Layered clothing", "Car snacks & road music", "Cash for hut lunch", "Camera", "Swimwear for resort pool"]
    },

    // ===== DAY 2 — GOSAU & HALLSTATT =====
    {
      id: 2,
      date: "April 23",
      weekday: "Thursday",
      title: "GOSAU & HALLSTATT",
      tagline: "Lakes, ferries & fairy tales",
      icon: "⛴️",
      color: "#1e88e5",
      accommodation: "obertraun",
      driveTime: "~1 hour total",
      hikeDistance: "6.2 km",
      summary: "A short drive to the stunning Gosausee for a lakeside hike with Dachstein glacier views. Then onward to the legendary village of Hallstatt for a ferry crossing and iconic viewpoint.",
      route: [
        { name: "Dormio Resort", coords: [47.556, 13.696], icon: "🏕️", type: "start" },
        { name: "Bad Goisern", coords: [47.590, 13.620], icon: "🚐", type: "drive" },
        { name: "Gosau Village", coords: [47.535, 13.535], icon: "🚐", type: "drive" },
        { name: "Gosausee", coords: [47.535, 13.493], icon: "🥾", type: "hike" },
        { name: "Gasthof Gosausee", coords: [47.536, 13.490], icon: "🍺", type: "lunch" },
        { name: "Back through Bad Goisern", coords: [47.590, 13.620], icon: "🚐", type: "drive" },
        { name: "Hallstatt", coords: [47.562, 13.649], icon: "📸", type: "sightseeing" },
        { name: "Hallstatt Ferry", coords: [47.561, 13.645], icon: "⛴️", type: "activity" },
        { name: "Dormio Resort", coords: [47.556, 13.696], icon: "🏕️", type: "end" }
      ],
      activities: [
        { time: "Morning", title: "Drive to Gosausee", description: "Short scenic drive to one of Austria's most beautiful lakes", icon: "🚐", type: "drive" },
        { time: "Morning", title: "Gosausee Hike", description: "6.2 km hike around the lake with jaw-dropping Dachstein glacier views", icon: "🥾", type: "hike", link: "https://www.google.com/maps/place/Vorderer+Gosausee/" },
        { time: "Midday", title: "Lunch at Gasthof Gosausee", description: "Terrace overlooking the lake with glacier views. Beer + Schnitzel! 🍺", icon: "🍽️", type: "food", link: "https://www.google.com/maps/place/Gasthof+Gosausee/" },
        { time: "Afternoon", title: "Hallstatt Village", description: "Explore the iconic fairy-tale village perched on the lake", icon: "📸", type: "sightseeing", link: "https://www.google.com/maps/place/Hallstatt,+Austria/" },
        { time: "Afternoon", title: "Ferry Crossing", description: "Take the ferry across Hallstätter See — stunning from the water!", icon: "⛴️", type: "activity", link: "https://www.google.com/maps/search/Hallstatt+Ferry+Station/" },
        { time: "Late Afternoon", title: "Hallstatt Viewpoint", description: "THE famous viewpoint — closed for renovation until June 2026, but the village views are still incredible!", icon: "📸", type: "sightseeing", link: "https://www.google.com/maps/place/Hallstatt+Skywalk/" },
        { time: "Evening", title: "Resort Evening", description: "Back to base. Kayaks, pool, sauna, and bar night! 🎉", icon: "🏕️", type: "leisure" }
      ],
      packing: ["Hiking boots", "Camera (this is THE photo day!)", "Sunscreen", "Swimwear for kayaks", "Cash for ferry", "Light rain jacket"]
    },

    // ===== DAY 3 — LAKE WOLFGANGSEE =====
    {
      id: 3,
      date: "April 24",
      weekday: "Friday",
      title: "LAKE WOLFGANGSEE",
      tagline: "Alpine vibes in St. Gilgen",
      icon: "🏔️",
      color: "#43a047",
      accommodation: "obertraun",
      driveTime: "~1h 25m each way",
      hikeDistance: "4.2 km",
      summary: "Road trip to the charming village of St. Gilgen on Lake Wolfgangsee. Hike with stunning lake views, enjoy lunch at a modern alpine hut with panoramic terrace, and soak in the Salzkammergut magic.",
      route: [
        { name: "Dormio Resort", coords: [47.556, 13.696], icon: "🏕️", type: "start" },
        { name: "Bad Ischl", coords: [47.710, 13.620], icon: "🚐", type: "drive" },
        { name: "Strobl", coords: [47.720, 13.480], icon: "🚐", type: "drive" },
        { name: "St. Gilgen", coords: [47.767, 13.367], icon: "🏔️", type: "destination" },
        { name: "Das Zwölfer", coords: [47.770, 13.365], icon: "🍺", type: "lunch" },
        { name: "Lake Wolfgangsee", coords: [47.750, 13.380], icon: "🏊", type: "activity" },
        { name: "Bad Ischl (return)", coords: [47.710, 13.620], icon: "🚐", type: "drive" },
        { name: "Dormio Resort", coords: [47.556, 13.696], icon: "🏕️", type: "end" }
      ],
      activities: [
        { time: "Morning", title: "Drive to St. Gilgen", description: "Scenic drive through the Salzkammergut lake region", icon: "🚐", type: "drive" },
        { time: "Late Morning", title: "St. Gilgen Hike", description: "4.2 km hike with stunning views over Lake Wolfgangsee", icon: "🥾", type: "hike", link: "https://www.google.com/maps/place/St.+Gilgen,+Austria/" },
        { time: "Midday", title: "Lunch at Das Zwölfer", description: "Modern alpine hut with an incredible panoramic terrace. Cold beers incoming! 🍺", icon: "🍽️", type: "food", link: "https://www.google.com/maps/place/Das+Zw%C3%B6lfer/" },
        { time: "Afternoon", title: "St. Gilgen Village", description: "Explore this charming lakeside village — Mozart's mother was born here!", icon: "📸", type: "sightseeing", link: "https://www.google.com/maps/place/St.+Gilgen,+Austria/" },
        { time: "Afternoon", title: "Lake Wolfgangsee", description: "Relax by the lake, maybe take a swim if it's warm enough! 🏊", icon: "🏊", type: "leisure", link: "https://www.google.com/maps/place/Lake+Wolfgang/" },
        { time: "Evening", title: "Last Night at the Resort", description: "Final night at Dormio. Make it legendary! 🎉", icon: "🎉", type: "leisure" }
      ],
      packing: ["Hiking boots", "Swimwear & towel", "Sunscreen", "Cash", "Camera"]
    },

    // ===== DAY 4 — LOSER MOUNTAIN & RETURN =====
    {
      id: 4,
      date: "April 25",
      weekday: "Saturday",
      title: "LOSER & RETURN",
      tagline: "One last summit before Vienna",
      icon: "⛰️",
      color: "#8e24aa",
      accommodation: "vienna",
      driveTime: "~3h 40m to Vienna",
      hikeDistance: "4.5 km",
      summary: "Final morning hike up Loser Mountain for epic panoramic views. Lunch at the famous Loser Alm (try the 'Loser beer'!). Then pack up and drive back to Vienna for one last night out together.",
      route: [
        { name: "Dormio Resort", coords: [47.556, 13.696], icon: "🏕️", type: "start" },
        { name: "Altaussee", coords: [47.630, 13.770], icon: "🚐", type: "drive" },
        { name: "Loser Mountain", coords: [47.652, 13.783], icon: "🥾", type: "hike" },
        { name: "Loser Alm", coords: [47.650, 13.780], icon: "🍺", type: "lunch" },
        { name: "Bad Aussee", coords: [47.610, 13.780], icon: "🚐", type: "drive" },
        { name: "Liezen", coords: [47.570, 14.230], icon: "🚐", type: "drive" },
        { name: "Amstetten", coords: [48.120, 14.870], icon: "🚐", type: "drive" },
        { name: "St. Pölten", coords: [48.200, 15.630], icon: "🚐", type: "drive" },
        { name: "The Social Hub Vienna", coords: [48.185, 16.378], icon: "🏨", type: "end" }
      ],
      activities: [
        { time: "Morning", title: "Loser Mountain Hike", description: "4.5 km hike up Loser Mountain. Don't let the name fool you — it's a WINNER! ⛰️", icon: "🥾", type: "hike", link: "https://www.google.com/maps/place/Loser,+Austria/" },
        { time: "Midday", title: "Lunch at Loser Alm", description: "The famous 'Loser beer' and alpine food with panoramic views", icon: "🍽️", type: "food", link: "https://www.google.com/maps/search/Loser+Alm+Altaussee/" },
        { time: "Afternoon", title: "The Drive Back", description: "3h 40m drive back to Vienna. Crank the road trip playlist!", icon: "🚐", type: "drive" },
        { time: "Evening", title: "Vienna Night Out", description: "LAST NIGHT TOGETHER! Dinner in Vienna and party! 🎉🥂", icon: "🎉", type: "leisure" }
      ],
      packing: ["Hiking boots (last time!)", "All bags packed for Vienna", "Snacks for the drive", "Party clothes for Vienna night"]
    },

    // ===== DAY 5 — FLY HOME =====
    {
      id: 5,
      date: "April 26",
      weekday: "Sunday",
      title: "FLY HOME HEROES",
      tagline: "Until the next adventure…",
      icon: "✈️",
      color: "#e53935",
      accommodation: null,
      driveTime: "40–50 min to airport",
      hikeDistance: null,
      summary: "Last morning in Vienna. Head to the airport for the 13:15 flight back to Tel Aviv. What a trip! 🇦🇹 → 🇮🇱",
      route: [
        { name: "The Social Hub Vienna", coords: [48.185, 16.378], icon: "🏨", type: "start" },
        { name: "Vienna Airport (VIE)", coords: [48.110, 16.570], icon: "✈️", type: "end" }
      ],
      activities: [
        { time: "Morning", title: "Last Vienna Morning", description: "Quick breakfast, say goodbye to Vienna ☕", icon: "🌅", type: "logistics" },
        { time: "Late Morning", title: "Drive to Airport", description: "Return rental cars and head to VIE", icon: "🚗", type: "drive" },
        { time: "13:15", title: "Flight VIE → TLV", description: "Departure 13:15 → Arrive 16:30", icon: "✈️", type: "travel" },
        { time: "16:30", title: "Welcome Home Heroes!", description: "Land back in Israel. Best. Bachelor. Trip. EVER! 🎉🇮🇱", icon: "🏠", type: "travel" }
      ],
      packing: ["Passport & boarding pass", "Check nothing left at hotel!", "Souvenirs 🎁", "All the memories 📸"]
    }
  ]
};
