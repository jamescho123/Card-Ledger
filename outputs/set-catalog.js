(() => {
  "use strict";

  const programs = {
    Topps: [
      "Topps", "Series 1", "Series 2", "Update Series", "Chrome", "Chrome Update", "Chrome Black", "Chrome Platinum Anniversary",
      "Chrome Sapphire", "Chrome Logofractor", "Cosmic Chrome", "Finest", "Finest Flashbacks", "Heritage", "Heritage High Number",
      "Archives", "Archives Signature Series", "Allen & Ginter", "Allen & Ginter Chrome", "Big League", "Stadium Club", "Stadium Club Chrome",
      "Museum Collection", "Inception", "Tier One", "Tribute", "Triple Threads", "Definitive Collection", "Diamond Icons", "Dynasty",
      "Luminaries", "Pristine", "Sterling", "Five Star", "Gold Label", "Gallery", "Fire", "High Tek", "Clearly Authentic", "Brooklyn Collection",
      "Transcendent Collection", "Topps Now", "Living Set", "Holiday", "Pro Debut", "Opening Day", "Total", "Factory Set",
      "Chrome UEFA Club Competitions", "Chrome UEFA Euro", "Chrome Bundesliga", "Chrome MLS", "Chrome Formula 1", "Chrome UFC", "Chrome WWE",
      "Finest UEFA", "Finest Bundesliga", "Finest MLS", "Finest Formula 1", "Merlin Chrome UEFA", "Museum Collection UEFA",
      "Inception UEFA", "Match Attax", "Match Attax Chrome", "Topps Premier League", "Topps Bundesliga", "Topps Formula 1",
      "Topps Basketball", "Chrome Basketball", "Cosmic Chrome Basketball", "Finest Basketball", "Inception Basketball", "Midnight Basketball",
      "Motif Basketball", "Royalty Basketball", "Topps Three Basketball", "Chrome Football", "Composite Football", "Finest Football",
      "Inception Football", "Resurgence Football", "Signature Class Football", "Topps Football"
    ],
    Bowman: [
      "Bowman", "Bowman Chrome", "Bowman Draft", "Bowman's Best", "Bowman Sterling", "Bowman Platinum", "Bowman Sapphire",
      "Bowman Chrome Sapphire", "Bowman Draft Sapphire", "Bowman Mega Box", "Bowman Chrome Mega Box", "Bowman Inception",
      "Bowman University Chrome", "Bowman University Best", "Bowman University Inception"
    ],
    Panini: [
      "Prizm", "Prizm Draft Picks", "Prizm Choice", "Select", "Mosaic", "Donruss", "Donruss Optic", "Donruss Elite",
      "Contenders", "Contenders Optic", "Chronicles", "National Treasures", "Immaculate Collection", "Flawless", "Noir",
      "Spectra", "Obsidian", "Origins", "Revolution", "Court Kings", "Crown Royale", "One and One", "Eminence",
      "Encased", "Opulence", "Dominion", "Cornerstones", "Absolute Memorabilia", "Certified", "Totally Certified",
      "Gold Standard", "Limited", "Phoenix", "Prestige", "Score", "Playoff", "Rookies & Stars", "Illusions",
      "Elements", "Black", "XR", "Zenith", "Legacy", "Luminance", "Recon", "Flux", "Status", "Essentials",
      "Threads", "Marquee", "Studio", "Titanium", "Hoops", "NBA Hoops Premium Stock", "Instant",
      "Prizm FIFA World Cup", "Prizm Premier League", "Prizm Copa America", "Prizm EuroLeague", "Select FIFA",
      "Select Premier League", "Mosaic FIFA World Cup", "Mosaic Premier League", "Donruss Soccer", "Donruss Optic Soccer",
      "Chronicles Soccer", "National Treasures Soccer", "Immaculate Soccer", "Nobility Soccer", "Adrenalyn XL",
      "Prizm WNBA", "Select WNBA", "Origins WNBA", "Chronicles WNBA", "Donruss WNBA"
    ],
    "Upper Deck": [
      "Upper Deck", "Series 1", "Series 2", "Extended Series", "Young Guns", "SP Authentic", "SP Game Used",
      "SPx", "Ultimate Collection", "The Cup", "Artifacts", "Allure", "Black Diamond", "Clear Cut", "Credentials",
      "Ice", "MVP", "O-Pee-Chee", "O-Pee-Chee Platinum", "Parkhurst", "Skybox Metal Universe", "Synergy",
      "Trilogy", "AHL", "Team Canada Juniors", "Goodwin Champions"
    ],
    Fleer: ["Fleer", "Fleer Tradition", "Fleer Ultra", "Fleer Showcase", "Fleer Mystique", "Fleer Focus", "Fleer Genuine", "Fleer Authentix", "Fleer Platinum"],
    SkyBox: ["SkyBox", "SkyBox Premium", "SkyBox Metal", "Metal Universe", "E-X", "E-X Century", "Z-Force", "Hoops", "Autographics"],
    Leaf: ["Leaf", "Leaf Metal", "Leaf Metal Draft", "Leaf Valiant", "Leaf Trinity", "Leaf Ultimate Draft", "Leaf Pro Set", "Leaf Signature Series", "Leaf Pop Century"],
    "Press Pass": ["Press Pass", "Press Pass Legends", "Press Pass Premium", "Press Pass Showcase", "Press Pass Signings"],
    Sage: ["SAGE", "SAGE HIT", "SAGE Aspire", "SAGE Autographed"],
    WildCard: ["Wild Card", "Wild Card Alumination", "Wild Card Matte", "Wild Card Auto Mania"],
    Futera: ["Futera", "Futera Unique", "Futera World Football", "Futera Arsenal", "Futera Liverpool"],
    Merlin: ["Merlin", "Merlin Premier League", "Merlin Bundesliga", "Merlin UEFA", "Merlin Chrome"],
    Pokemon: [
      "Base Set", "Jungle", "Fossil", "Base Set 2", "Team Rocket", "Gym Heroes", "Gym Challenge", "Neo Genesis",
      "Neo Discovery", "Neo Revelation", "Neo Destiny", "Legendary Collection", "Expedition Base Set", "Aquapolis", "Skyridge",
      "EX Ruby & Sapphire", "EX Sandstorm", "EX Dragon", "EX Team Magma vs Team Aqua", "EX Hidden Legends", "EX FireRed & LeafGreen",
      "EX Team Rocket Returns", "EX Deoxys", "EX Emerald", "EX Unseen Forces", "EX Delta Species", "EX Legend Maker",
      "EX Holon Phantoms", "EX Crystal Guardians", "EX Dragon Frontiers", "EX Power Keepers", "Diamond & Pearl",
      "Mysterious Treasures", "Secret Wonders", "Great Encounters", "Majestic Dawn", "Legends Awakened", "Stormfront",
      "Platinum", "Rising Rivals", "Supreme Victors", "Arceus", "HeartGold & SoulSilver", "Unleashed", "Undaunted",
      "Triumphant", "Call of Legends", "Black & White", "Emerging Powers", "Noble Victories", "Next Destinies",
      "Dark Explorers", "Dragons Exalted", "Boundaries Crossed", "Plasma Storm", "Plasma Freeze", "Plasma Blast",
      "Legendary Treasures", "XY", "Flashfire", "Furious Fists", "Phantom Forces", "Primal Clash", "Roaring Skies",
      "Ancient Origins", "BREAKthrough", "BREAKpoint", "Generations", "Fates Collide", "Steam Siege", "Evolutions",
      "Sun & Moon", "Guardians Rising", "Burning Shadows", "Shining Legends", "Crimson Invasion", "Ultra Prism",
      "Forbidden Light", "Celestial Storm", "Dragon Majesty", "Lost Thunder", "Team Up", "Detective Pikachu",
      "Unbroken Bonds", "Unified Minds", "Hidden Fates", "Cosmic Eclipse", "Sword & Shield", "Rebel Clash",
      "Darkness Ablaze", "Champion's Path", "Vivid Voltage", "Shining Fates", "Battle Styles", "Chilling Reign",
      "Evolving Skies", "Celebrations", "Fusion Strike", "Brilliant Stars", "Astral Radiance", "Pokemon GO",
      "Lost Origin", "Silver Tempest", "Crown Zenith", "Scarlet & Violet", "Paldea Evolved", "Obsidian Flames",
      "151", "Paradox Rift", "Paldean Fates", "Temporal Forces", "Twilight Masquerade", "Shrouded Fable",
      "Stellar Crown", "Surging Sparks", "Prismatic Evolutions", "Journey Together", "Destined Rivals", "Black Bolt", "White Flare"
    ]
  };

  const sourceByBrand = {
    Topps: "Topps official checklist archive",
    Bowman: "Topps official checklist archive",
    Panini: "Panini America official checklist catalog",
    Pokemon: "Pokemon official expansion archive",
    default: "Hobby Card Index catalog and manufacturer checklist families"
  };

  const sourceUrlByBrand = {
    Topps: "https://www.topps.com/pages/checklists",
    Bowman: "https://www.topps.com/pages/checklists",
    Panini: "https://www.paniniamerica.net/checklist.html",
    Pokemon: "https://www.pokemon.com/uk/pokemon-tcg/trading-card-expansions",
    default: "https://hobbycardindex.com/sets"
  };

  const broadSportsByBrand = {
    Bowman: ["Baseball", "Football", "Basketball"],
    Fleer: ["Basketball", "Baseball", "Hockey"],
    SkyBox: ["Basketball", "Football", "Baseball"],
    Leaf: ["Baseball", "Football", "Basketball", "Soccer"],
    "Press Pass": ["Football", "Basketball", "Racing"],
    Sage: ["Football", "Basketball"],
    WildCard: ["Football", "Basketball"],
    Futera: ["Soccer"],
    Merlin: ["Soccer"]
  };

  function catalogSports(brand, setName) {
    const name = String(setName || "");
    if (brand === "Pokemon") return ["PTCG"];
    if (brand === "Upper Deck") return ["Hockey", "Basketball", "Baseball"];
    if (brand === "Topps") {
      if (/UEFA|Euro|Bundesliga|MLS|Premier League/i.test(name)) return ["Soccer"];
      if (/Formula 1/i.test(name)) return ["Racing"];
      if (/Basketball/i.test(name)) return ["Basketball"];
      if (/Football/i.test(name)) return ["Football"];
      if (/UFC|WWE/i.test(name)) return ["Other"];
      return ["Baseball"];
    }
    if (brand === "Panini") {
      if (/FIFA|World Cup|Premier League|Copa America|Soccer|Adrenalyn|Nobility/i.test(name)) return ["Soccer"];
      if (/WNBA|Hoops|Court Kings|Revolution|One and One|Eminence|Opulence|Dominion|Cornerstones|Recon|Flux|Status|Essentials|Threads|Marquee|Studio/i.test(name)) return ["Basketball"];
      return ["Basketball", "Football"];
    }
    return broadSportsByBrand[brand] || ["Other"];
  }

  window.CARD_PLAYER_DIRECTORY = {
    Baseball: [
      "Aaron Judge", "Babe Ruth", "Bobby Witt Jr.", "Bryce Harper", "Corbin Carroll", "Derek Jeter", "Elly De La Cruz", "Fernando Tatis Jr.",
      "Gunnar Henderson", "Jackie Robinson", "Ken Griffey Jr.", "Mickey Mantle", "Mike Trout", "Mookie Betts", "Ronald Acuna Jr.", "Shohei Ohtani"
    ],
    Basketball: [
      "Anthony Edwards", "Cade Cunningham", "Damian Lillard", "Giannis Antetokounmpo", "Jalen Brunson", "Jayson Tatum", "Kevin Durant", "Kobe Bryant",
      "LeBron James", "Luka Doncic", "Michael Jordan", "Nikola Jokic", "Shai Gilgeous-Alexander", "Stephen Curry", "Trae Young", "Victor Wembanyama"
    ],
    Football: [
      "Aaron Rodgers", "Caleb Williams", "C.J. Stroud", "Dan Marino", "Joe Burrow", "Josh Allen", "Justin Jefferson", "Lamar Jackson",
      "Patrick Mahomes II", "Peyton Manning", "Tom Brady", "Trevor Lawrence"
    ],
    Hockey: [
      "Alex Ovechkin", "Auston Matthews", "Bobby Orr", "Cale Makar", "Connor Bedard", "Connor McDavid", "Mario Lemieux", "Nathan MacKinnon", "Sidney Crosby", "Wayne Gretzky"
    ],
    Soccer: [
      "Cristiano Ronaldo", "Erling Haaland", "Jude Bellingham", "Kylian Mbappe", "Lamine Yamal", "Lionel Messi", "Neymar Jr.", "Pedri", "Ronaldinho", "Vinicius Junior"
    ],
    PTCG: [
      "Blastoise", "Charizard", "Charizard ex", "Eevee", "Gengar", "Greninja", "Lugia", "Mew", "Mewtwo", "Pikachu", "Rayquaza", "Umbreon"
    ],
    Racing: ["Ayrton Senna", "Charles Leclerc", "Dale Earnhardt", "Lewis Hamilton", "Lando Norris", "Max Verstappen", "Michael Schumacher"],
    Golf: ["Arnold Palmer", "Jack Nicklaus", "Jon Rahm", "Rory McIlroy", "Scottie Scheffler", "Tiger Woods"],
    Other: []
  };

  window.CARD_SET_CATALOG = Object.entries(programs).flatMap(([brand, sets]) =>
    sets.map((setName) => ({
      brand,
      setName,
      sports: catalogSports(brand, setName),
      source: sourceByBrand[brand] || sourceByBrand.default,
      sourceUrl: sourceUrlByBrand[brand] || sourceUrlByBrand.default
    }))
  );
})();
