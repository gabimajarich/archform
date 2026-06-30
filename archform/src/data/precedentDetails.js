// Rich detail for precedent projects.
// `DETAILS[id]` holds authored content for the curated core. Everything else is
// covered by getPrecedentDetail()'s graceful fallback (image portrait + ArchDaily
// link + materials inferred from tags + influences from the card reason).
//
// Schema:
//   link       official or ArchDaily page
//   image      remote photo (Wikimedia Special:FilePath); falls back to SVG on error
//   year       completion year (string)
//   location   city, country
//   materials  string[] — the material palette
//   lessons    { topic, text }[] — circulation / structure / light / etc.
//   influences string — the ideas the project is a touchstone for

const WM = (file) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=640`;
const AD = (q) => `https://www.archdaily.com/search/all?q=${encodeURIComponent(q)}`;
const GOOGLE = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const DETAILS = {
  fuji: {
    link: "https://www.archdaily.com/489728/fuji-kindergarten-tezuka-architects",
    image: WM("Fuji Kindergarten.jpg"),
    year: "2007", location: "Tachikawa, Tokyo, Japan",
    materials: ["Exposed timber structure", "Steel railings", "Glass sliding walls", "Continuous timber-decked roof"],
    lessons: [
      { topic: "Circulation", text: "The oval roof is the circulation — an endless loop with no dead ends lets children run continuously, dissolving the line between corridor and play." },
      { topic: "Structure", text: "A light steel-and-timber frame keeps the deck thin and the ground floor almost fully openable to the courtyard." },
      { topic: "Accessibility", text: "A single continuous level and gentle roof access make the whole building navigable; existing trees pierce the deck with safety nets." },
      { topic: "Ventilation", text: "Full-width sliding glass walls open the classrooms to the central court, erasing the indoor–outdoor boundary for cross-breeze." },
    ],
    influences: "A global benchmark for play-centred, child-scaled learning where the building's form is itself the pedagogy — movement, freedom and supervision designed as one gesture.",
  },
  greenSchoolBali: {
    link: "https://www.archdaily.com/406843/green-school-pt-bambu",
    image: WM("Green School Bali.jpg"),
    year: "2007", location: "Sibang Kaja, Bali, Indonesia",
    materials: ["Engineered bamboo", "Bamboo shingle roofing", "Rammed earth", "Local volcanic stone", "Compacted earth floors"],
    lessons: [
      { topic: "Structure", text: "Whole-culm bamboo arches and gridshells show a renewable grass can span large, expressive, fully structural volumes." },
      { topic: "Sustainability", text: "Near-zero embodied carbon, a micro-hydro vortex and natural materials make the campus a living curriculum in regenerative building." },
      { topic: "Ventilation", text: "Open-air, roof-only enclosure relies on deep eaves and cross-ventilation — no air conditioning in a humid tropical climate." },
      { topic: "Materiality", text: "Treated bamboo, replanted on site, demonstrates a fast-cycling local material can replace timber and steel." },
    ],
    influences: "The reference point for connection-to-nature, low-carbon construction and the architectural potential of bamboo.",
  },
  thermeVals: {
    link: "https://www.archdaily.com/13358/the-therme-vals",
    image: WM("Therme Vals.jpg"),
    year: "1996", location: "Vals, Switzerland",
    materials: ["Locally quarried Valser quartzite", "Exposed concrete", "Brass and bronze fittings", "Leather curtains"],
    lessons: [
      { topic: "Materiality", text: "60,000 slabs of local quartzite laid in thin courses make the building feel quarried from the mountain rather than placed on it." },
      { topic: "Lighting", text: "Narrow slots between roof blocks drop blades of light into the dim bathing hall, choreographing a slow, sensory descent." },
      { topic: "Circulation", text: "There is no prescribed route — visitors wander between monolithic blocks, discovering hot, cold and sounding pools by feel." },
    ],
    influences: "The touchstone for atmospheric, phenomenological architecture — material, light and temperature as the primary design media.",
  },
  bruderKlaus: {
    link: "https://www.archdaily.com/106352/bruder-klaus-field-chapel-peter-zumthor",
    image: WM("Bruder Klaus Kapelle.jpg"),
    year: "2007", location: "Mechernich, Germany",
    materials: ["Rammed concrete (24 daily layers)", "Charred spruce log formwork", "Lead-tin cast floor", "Oculus glass"],
    lessons: [
      { topic: "Structure", text: "112 spruce trunks were tented up as formwork, concrete rammed around them daily, then the timber was burnt out — leaving a charred, fluted interior." },
      { topic: "Lighting", text: "A single open oculus and dozens of fibre-optic points in the tie holes make a constellation in the dark cavity." },
      { topic: "Materiality", text: "The blackened interior and tear-drop plan turn a tiny field chapel into a primal, elemental experience of fire, earth and sky." },
    ],
    influences: "A masterclass in how process and material can carry the entire meaning of a sacred, landscape-rooted space.",
  },
  teshima: {
    link: "https://www.archdaily.com/789028/teshima-art-museum-ryue-nishizawa",
    image: WM("Teshima Art Museum.jpg"),
    year: "2010", location: "Teshima, Japan",
    materials: ["Site-cast white concrete shell (250mm)", "No columns", "Polished concrete floor"],
    lessons: [
      { topic: "Structure", text: "A 40m, column-free concrete shell just 25cm thick was cast over a moulded earth mound, then the earth was dug out from beneath." },
      { topic: "Lighting", text: "Two large oval openings leave the interior open to sky, rain and wind — weather becomes the exhibition." },
      { topic: "Ventilation", text: "The building is literally open to the elements; water beads rise from the floor and the breeze moves freely through." },
    ],
    influences: "Wonder and calm reduced to a single seamless gesture — architecture as a vessel for sky, water and silence.",
  },
  sendai: {
    link: "https://www.archdaily.com/118627/ad-classics-sendai-mediatheque-toyo-ito",
    image: WM("Sendai Mediatheque 2007.jpg"),
    year: "2001", location: "Sendai, Japan",
    materials: ["Steel lattice tube-columns", "Steel honeycomb floor plates", "Full-height glass façade", "Acrylic and timber fit-out"],
    lessons: [
      { topic: "Structure", text: "Thirteen seaweed-like lattice tubes carry the floors and hold stairs, lifts and services, freeing every plate of internal columns." },
      { topic: "Circulation", text: "The tubes become vertical light-wells and movement cores; floors differ in fit-out, read as a transparent stack of civic rooms." },
      { topic: "Accessibility", text: "Open, column-free plates and glass skin make program and movement legible from the street — a radically transparent public building." },
    ],
    influences: "Redefined the library/media building as flexible, transparent civic infrastructure rather than a container of rooms.",
  },
  salk: {
    link: "https://www.archdaily.com/61288/ad-classics-salk-institute-louis-kahn",
    image: WM("Salk Institute.jpg"),
    year: "1965", location: "La Jolla, California, USA",
    materials: ["Pozzolanic 'Roman' concrete", "Teak wall panels", "Travertine plaza", "Lead-coated copper"],
    lessons: [
      { topic: "Materiality", text: "A warm, ash-tinted concrete and silvered teak were specified to weather gracefully; the plaza travertine glows at sunset." },
      { topic: "Lighting", text: "The empty travertine court with its thin water channel aims the eye at the Pacific horizon — the 'façade to the sky'." },
      { topic: "Structure", text: "Vierendeel trusses create full-height service floors between labs, so research space stays column-free and endlessly adaptable." },
    ],
    influences: "The definitive marriage of monumental ceremony, served/servant planning and timeless material — a temple to science.",
  },
  kanagawa: {
    link: "https://www.archdaily.com/64769/kait-workshop-junya-ishigami-associates",
    image: WM("KAIT Workshop.jpg"),
    year: "2008", location: "Atsugi, Japan",
    materials: ["305 slender steel flat-bar columns", "White-painted steel", "Full glass perimeter", "Polished concrete floor"],
    lessons: [
      { topic: "Structure", text: "Columns vary in size and angle — some carry vertical load, some resist sway — scattered like a forest so no two bays repeat." },
      { topic: "Circulation", text: "There are no rooms; students read density and orientation of the columns to find loose 'clearings' for each activity." },
      { topic: "Lighting", text: "A fully glazed, frameless perimeter dissolves the wall, so the steel forest seems to stand in open daylight." },
    ],
    influences: "An icon of freedom, indeterminacy and atmosphere — structure used to suggest, not divide, space.",
  },
  sydneyOpera: {
    link: "https://www.archdaily.com/65218/ad-classics-sydney-opera-house-jorn-utzon",
    image: WM("Sydney Opera House Sails.jpg"),
    year: "1973", location: "Sydney, Australia",
    materials: ["Precast concrete shell ribs", "Glazed off-white & matte ceramic tiles", "Pink granite podium", "Brush-box and white-birch interiors"],
    lessons: [
      { topic: "Structure", text: "The famous shells were only buildable once Utzon derived them all from the surface of a single sphere — one geometry, many vaults." },
      { topic: "Materiality", text: "Over a million self-cleaning Swedish tiles in two finishes make the sails shimmer differently in changing light." },
      { topic: "Circulation", text: "A vast granite podium and ceremonial stair lift visitors above the harbour before the halls — arrival as procession." },
    ],
    influences: "The 20th century's defining civic landmark — sculptural wonder, arrival and place-making at the scale of a city.",
  },
  pompidou: {
    link: "https://www.archdaily.com/64028/ad-classics-centre-georges-pompidou-renzo-piano-and-richard-rogers",
    image: WM("Centre Georges Pompidou.jpg"),
    year: "1977", location: "Paris, France",
    materials: ["Exposed steel superstructure", "Cast-steel 'gerberette' brackets", "Colour-coded services", "Glazed external escalator tube"],
    lessons: [
      { topic: "Structure", text: "Gerberette cantilever brackets push structure and the escalator to the façade, leaving 50m column-free floors inside." },
      { topic: "Circulation", text: "The escalator climbs the outside as a public event, turning movement and the city view into the building's front." },
      { topic: "Flexibility", text: "With services colour-coded on the exterior, the interior is pure loose-fit space — the original 'flexible shed' icon." },
    ],
    influences: "The radical statement of 'served and servant' flexibility — infrastructure expressed so space can stay free.",
  },
  farnsworth: {
    link: "https://www.archdaily.com/59719/ad-classics-the-farnsworth-house-mies-van-der-rohe",
    image: WM("Farnsworth House.jpg"),
    year: "1951", location: "Plano, Illinois, USA",
    materials: ["White-painted steel frame", "Full-height plate glass", "Travertine floors and deck", "Primavera wood core"],
    lessons: [
      { topic: "Structure", text: "Eight steel I-columns are welded to the edge of the floor and roof planes, so the slabs appear to float clear of the ground." },
      { topic: "Materiality", text: "A single travertine plane runs from terrace to interior; a freestanding wood core holds all services, leaving one open room." },
      { topic: "Connection", text: "Raised above the floodplain, the glass box reduces dwelling to a calm platform for watching the landscape and river." },
    ],
    influences: "The purest statement of universal space and dwelling-as-view — 'almost nothing' between inhabitant and nature.",
  },
  fallingwater: {
    link: "https://www.archdaily.com/60022/ad-classics-fallingwater-frank-lloyd-wright",
    image: WM("Fallingwater.jpg"),
    year: "1937", location: "Mill Run, Pennsylvania, USA",
    materials: ["Reinforced concrete cantilever terraces", "Local sandstone masonry", "Steel-framed glass", "Cherokee-red painted steel"],
    lessons: [
      { topic: "Structure", text: "Bold concrete cantilevers reach out over the waterfall — daring for 1937, and later steel-reinforced to arrest their sag." },
      { topic: "Connection", text: "The house is anchored to its boulders; the living-room hearth sits on the natural rock and a stair descends straight to the stream." },
      { topic: "Materiality", text: "Rough local stone piers contrast smooth horizontal slabs, knitting the building into its forest ledge." },
    ],
    influences: "The supreme example of organic architecture — building and landscape made physically and experientially continuous.",
  },
  kimbell: {
    link: "https://www.archdaily.com/101342/ad-classics-kimbell-art-museum-louis-kahn",
    image: WM("Kimbell Art Museum.jpg"),
    year: "1972", location: "Fort Worth, Texas, USA",
    materials: ["Cycloid post-tensioned concrete vaults", "Travertine", "White oak", "Perforated aluminium reflectors"],
    lessons: [
      { topic: "Lighting", text: "A slot at the crown of each cycloid vault drops daylight onto a perforated reflector that washes the curved ceiling in soft silver light." },
      { topic: "Structure", text: "Each 30m vault carries only on four corner columns, so galleries open freely beneath the repeated bays." },
      { topic: "Materiality", text: "Travertine, oak and concrete in a calm, repeating module make a serene, timeless room for looking at art." },
    ],
    influences: "The benchmark for daylit gallery design — natural light controlled as the museum's primary material.",
  },
  seattleLibrary: {
    link: "https://www.archdaily.com/11651/seattle-central-library-oma-lmn",
    image: WM("Seattle Central Library.jpg"),
    year: "2004", location: "Seattle, Washington, USA",
    materials: ["Steel-and-glass diagrid skin", "Exposed structural steel", "Aluminium mesh", "Bold coloured fit-out"],
    lessons: [
      { topic: "Circulation", text: "A continuous 'Books Spiral' ramps the entire Dewey collection in one unbroken run, so it never breaks across floors as it grows." },
      { topic: "Structure", text: "Program is sorted into stable platforms; the in-between 'social' floors are flexible, wrapped in a faceted diagrid envelope." },
      { topic: "Accessibility", text: "Stacking program by need and threading clear public 'living rooms' between them makes a huge library legible and navigable." },
    ],
    influences: "Reimagined the library as a sorted stack of public platforms — flexibility and transparency as civic generosity.",
  },
  highline: {
    link: "https://www.archdaily.com/24362/the-high-line-james-corner-field-operations-diller-scofidio-renfro",
    image: WM("High Line 20th Street looking downtown.jpg"),
    year: "2009", location: "New York City, USA",
    materials: ["Salvaged rail tracks", "Precast concrete planks", "Self-seeding planting", "Cor-ten and steel details"],
    lessons: [
      { topic: "Circulation", text: "A linear elevated promenade stitches 1.5 miles through the city; 'peel-up' planks blur path and planting so movement slows to a stroll." },
      { topic: "Sustainability", text: "Adaptive reuse of a derelict viaduct and a self-sustaining wild planting palette turn infrastructure into resilient public landscape." },
      { topic: "Connection", text: "Framed views, sun-decks and a sunken amphitheatre over the traffic re-connect the city to itself from above." },
    ],
    influences: "The model for infrastructural reuse and the 'found' landscape — exploration and ecology threaded through dense city.",
  },
  churchLight: {
    link: "https://www.archdaily.com/101260/ad-classics-church-of-the-light-tadao-ando",
    image: WM("Church of the light.jpg"),
    year: "1989", location: "Ibaraki, Osaka, Japan",
    materials: ["Board-formed exposed concrete", "Steel cruciform glazing", "Dark timber pews and floor"],
    lessons: [
      { topic: "Lighting", text: "A full cruciform slot is cut through the altar wall; the cross is made entirely of light, intensifying as the room is kept dark." },
      { topic: "Materiality", text: "Silky board-marked concrete and a sloping dark floor strip the space to silence — light is the only ornament." },
      { topic: "Circulation", text: "A wall slices the box at an angle; you enter by turning through the gap, a compressed threshold before the luminous nave." },
    ],
    influences: "The essential lesson in light, silence and sequence — sacred atmosphere from the barest concrete means.",
  },
  copenhill: {
    link: "https://www.archdaily.com/925776/copenhill-energy-plant-and-urban-recreation-center-big",
    image: WM("Amager Bakke 2019.jpg"),
    year: "2019", location: "Copenhagen, Denmark",
    materials: ["Stacked aluminium-brick façade", "Green synthetic ski slope", "Steel waste-to-energy plant", "Planted roofscape"],
    lessons: [
      { topic: "Sustainability", text: "A clean waste-to-energy plant powers the city while its roof becomes a year-round dry-ski slope, hiking trail and climbing wall." },
      { topic: "Structure", text: "The sloping public roof is hung on the industrial volumes inside; the plant's height profile literally shapes the ski run." },
      { topic: "Materiality", text: "A façade of stacked aluminium 'bricks' with glazed gaps lets daylight into the plant and gardens climb the wall." },
    ],
    influences: "The flagship of 'hedonistic sustainability' — infrastructure reimagined as civic play and landscape.",
  },
  tjibaou: {
    link: "https://www.archdaily.com/600641/ad-classics-centre-culturel-jean-marie-tjibaou-renzo-piano",
    image: WM("Centre culturel Tjibaou.jpg"),
    year: "1998", location: "Nouméa, New Caledonia",
    materials: ["Iroko timber ribs", "Stainless steel ties", "Glass and timber louvres", "Coral-aggregate paths"],
    lessons: [
      { topic: "Ventilation", text: "The curved 'cases' are double-skinned timber shells whose adjustable louvres open to the trade winds — passive cooling drawn from Kanak hut form." },
      { topic: "Materiality", text: "Iroko ribs reference traditional construction while resisting the marine climate; the buildings read as woven baskets." },
      { topic: "Connection", text: "Ten pavilions are threaded along a ridge path through gardens, rooting the centre in Kanak landscape and ceremony." },
    ],
    influences: "The benchmark for culturally-rooted, climate-tuned architecture — belonging expressed through place and craft.",
  },
  magney: {
    link: AD("Magney House Glenn Murcutt"),
    image: WM("Magney House.jpg"),
    year: "1984", location: "Bingie Bingie, NSW, Australia",
    materials: ["Corrugated steel roof and walls", "Glass louvres", "Steel frame", "Concrete block and slab"],
    lessons: [
      { topic: "Sustainability", text: "A single curved roof harvests rainwater to tanks and shapes the section for sun and breeze — 'touch the earth lightly'." },
      { topic: "Ventilation", text: "Banks of glass louvres and a thin plan give every room cross-ventilation on an exposed coastal site." },
      { topic: "Lighting", text: "The roof's two-way curve drops north light into living spaces and shelters the southern, service side." },
    ],
    influences: "The defining Australian lesson in lightweight, climate-responsive, low-impact dwelling.",
  },
  menil: {
    link: "https://www.archdaily.com/783041/ad-classics-the-menil-collection-renzo-piano",
    image: WM("The Menil Collection.jpg"),
    year: "1987", location: "Houston, Texas, USA",
    materials: ["Ferro-cement light 'leaves'", "Ductile-iron trusses", "Cypress cladding", "Steel and glass roof"],
    lessons: [
      { topic: "Lighting", text: "Curved ferro-cement 'leaves' slung below a glass roof block direct sun but bounce soft, even daylight into every gallery." },
      { topic: "Structure", text: "Slim ductile-iron trusses integrate the leaves, structure and servicing into one repeating roof element." },
      { topic: "Materiality", text: "Grey cypress cladding ties the museum to its bungalow neighbourhood — institutional calm at a domestic scale." },
    ],
    influences: "The reference for restrained, daylit gallery space and the museum woven quietly into its neighbourhood.",
  },
  bagsvaerd: {
    link: AD("Bagsvaerd Church Jorn Utzon"),
    image: WM("Bagsværd Kirke.jpg"),
    year: "1976", location: "Bagsværd, Denmark",
    materials: ["Precast concrete frame", "Site-cast curved concrete shells", "Glazed ceramic tile", "Pine and glass"],
    lessons: [
      { topic: "Lighting", text: "A plain industrial shell hides billowing in-situ concrete vaults that scoop concealed daylight down onto the congregation like a cloud." },
      { topic: "Materiality", text: "The contrast of mass-produced exterior and hand-cast luminous interior dramatises the move from everyday to sacred." },
      { topic: "Structure", text: "Standard precast components frame the box; only the meaningful ceiling is bespoke — economy directed where it matters." },
    ],
    influences: "A lesson in lifting the ordinary to the sacred and in concentrating craft where experience demands it.",
  },
  bullitt: {
    link: "https://www.archdaily.com/396067/the-bullitt-center-the-miller-hull-partnership",
    image: WM("Bullitt Center.jpg"),
    year: "2013", location: "Seattle, Washington, USA",
    materials: ["Exposed FSC glulam and heavy timber", "Rooftop PV array", "Triple-glazed timber windows", "Composting systems"],
    lessons: [
      { topic: "Sustainability", text: "Designed to the Living Building Challenge — net-positive energy and water, composting toilets, and a 250-year structural life." },
      { topic: "Structure", text: "An exposed heavy-timber frame stores carbon and is detailed for disassembly and very long service." },
      { topic: "Ventilation", text: "Operable windows, an 'irresistible stair' and a smart skin cut energy demand before the big PV roof even meets it." },
    ],
    influences: "Proof that radical sustainability can be an ordinary, lettable, long-life workplace.",
  },
  ningbo: {
    link: "https://www.archdaily.com/156344/ningbo-historic-museum-wang-shu",
    image: WM("Ningbo Museum.jpg"),
    year: "2008", location: "Ningbo, China",
    materials: ["'Wapan' recycled tile & brick walls", "Board-formed concrete", "Bamboo-formed concrete", "Salvaged roof tiles"],
    lessons: [
      { topic: "Materiality", text: "Walls are built from millions of tiles and bricks salvaged from demolished villages, using the local 'wapan' technique — memory made structural." },
      { topic: "Sustainability", text: "Reusing demolition waste as cladding turns thrift and craft into a monumental, low-impact façade." },
      { topic: "Circulation", text: "The cracked, mountain-like mass invites a wandering ascent through fissures and terraces rather than a single route." },
    ],
    influences: "A landmark for material reuse, craft and the carrying of cultural memory in contemporary architecture.",
  },
  habitat67: {
    link: "https://www.archdaily.com/404803/ad-classics-habitat-67-safdie-architects",
    image: WM("Habitat 67.jpg"),
    year: "1967", location: "Montreal, Canada",
    materials: ["Precast concrete modules (354 boxes)", "Post-tensioned connections", "Steel cables", "Concrete decks"],
    lessons: [
      { topic: "Structure", text: "354 identical precast 'boxes' stack and step so each roof becomes the terrace of the home above — mass production with individuality." },
      { topic: "Circulation", text: "Pedestrian 'streets in the air' and bridges connect the clusters, giving dense housing the feel of a hillside village." },
      { topic: "Accessibility", text: "Every unit gets light on multiple sides and a private garden, challenging the anonymity of the slab block." },
    ],
    influences: "The enduring experiment in giving every dwelling in dense housing a garden, identity and outlook.",
  },
  quintaMonroy: {
    link: "https://www.archdaily.com/10775/quinta-monroy-elemental",
    image: WM("Quinta Monroy.jpg"),
    year: "2004", location: "Iquique, Chile",
    materials: ["Reinforced concrete frame", "Concrete block", "Owner-built timber & block infill", "Render"],
    lessons: [
      { topic: "Flexibility", text: "The state builds 'half of a good house' — the structured, hard half — and families self-build the rest into the planned voids over time." },
      { topic: "Structure", text: "A robust frame and party walls define safe expansion zones, so incremental growth never compromises the building." },
      { topic: "Budget", text: "Spending the limited subsidy on what residents can't do themselves (structure, services) doubles eventual floor area." },
    ],
    influences: "The paradigm of incremental social housing — design as an open framework for residents to complete.",
  },
  louisiana: {
    link: AD("Louisiana Museum of Modern Art"),
    image: WM("Louisiana Museum of Modern Art.jpg"),
    year: "1958", location: "Humlebæk, Denmark",
    materials: ["White-painted brick", "Timber post-and-beam", "Full-height glass corridors", "Tiled and timber floors"],
    lessons: [
      { topic: "Circulation", text: "Glazed low corridors zig-zag through the park linking pavilions, so the walk between galleries is half the experience." },
      { topic: "Connection", text: "Continuous glass walls keep the sculpture park, sea and sky present, dissolving the museum into its landscape." },
      { topic: "Lighting", text: "Modest scale and abundant daylight make an intimate, humane art experience rather than a monumental one." },
    ],
    influences: "The model for the landscape museum — art, architecture and nature experienced as one meandering sequence.",
  },
  maggies: {
    link: AD("Maggie's Centre cancer care"),
    image: WM("Maggie's Centre Dundee.jpg"),
    year: "1996–", location: "Various, UK",
    materials: ["Warm timber", "Domestic-scale brick and render", "Generous glazing", "Garden-linked thresholds"],
    lessons: [
      { topic: "Connection", text: "Every centre is tied to a garden and daylight; thresholds are soft and there is always a kitchen table at the heart." },
      { topic: "Accessibility", text: "Non-institutional, home-scaled plans with no reception desk reduce anxiety and put visitors in control." },
      { topic: "Materiality", text: "Warm, tactile materials and intimate rooms make spaces of belonging, safety and calm for people in crisis." },
    ],
    influences: "The brief that proved domestic scale, daylight and garden can be therapeutic — architecture as care.",
  },
  thoncho: {
    link: "https://www.archdaily.com/783518/ad-classics-thorncrown-chapel-e-fay-jones",
    image: WM("Thorncrown Chapel.jpg"),
    year: "1980", location: "Eureka Springs, Arkansas, USA",
    materials: ["Southern pine lattice frame", "Steel cross-bracing joints", "425 windows of glass", "Native flagstone floor"],
    lessons: [
      { topic: "Structure", text: "A trussed timber lattice carries all loads with members small enough for two people to carry through the woods — no heavy machinery." },
      { topic: "Materiality", text: "Built with a near-zero footprint to protect the forest, the chapel almost disappears into its setting." },
      { topic: "Lighting", text: "The dense lattice and 6,000 sq ft of glass dapple the interior like a clearing in the trees." },
    ],
    influences: "A lesson in lightness, low-impact building and wonder drawn directly from the woodland.",
  },
  edenProject: {
    link: AD("Eden Project Grimshaw"),
    image: WM("Eden Project geodesic domes panorama.jpg"),
    year: "2001", location: "Cornwall, UK",
    materials: ["Galvanised steel hex-tri-hex geodesic frame", "ETFE pillow cladding", "Reclaimed quarry landform"],
    lessons: [
      { topic: "Structure", text: "Lightweight steel geodesic 'biomes' span vast climates with minimal material; ETFE pillows weigh a fraction of glass." },
      { topic: "Sustainability", text: "Built in a worked-out clay pit, the project regenerates a derelict site and houses living lessons in ecology." },
      { topic: "Ventilation", text: "The bubble skin and biome geometry manage huge humid internal climates passively wherever possible." },
    ],
    influences: "A popular benchmark for lightweight long-span enclosure and architecture as environmental education.",
  },
  guggenheimNY: {
    link: "https://www.archdaily.com/590664/ad-classics-solomon-r-guggenheim-museum-frank-lloyd-wright",
    image: WM("Guggenheim museum exterior.jpg"),
    year: "1959", location: "New York City, USA",
    materials: ["Site-cast concrete (gunite) spiral", "Painted render", "Glass dome skylight"],
    lessons: [
      { topic: "Circulation", text: "A single continuous spiral ramp lets visitors take a lift to the top and drift down past the art in one unbroken promenade." },
      { topic: "Lighting", text: "A great glazed oculus floods the central void with daylight, unifying the whole coil of galleries." },
      { topic: "Structure", text: "The expanding concrete helix is itself the building — circulation, structure and form are one move." },
    ],
    influences: "The archetype of the museum-as-promenade — movement and viewing fused into a single spatial gesture.",
  },
};

// ---- Fallback for everything not in the curated core ----------------------

const TAG_MATERIALS = {
  stone: "Stone", naturalMaterials: "Timber", sustainability: "Low-carbon assemblies",
  durability: "Robust masonry", minimal: "Exposed concrete", lowCarbon: "Mass timber",
  budget: "Economical standard materials",
};

function inferMaterials(tags = []) {
  const out = [];
  for (const t of tags) if (TAG_MATERIALS[t]) out.push(TAG_MATERIALS[t]);
  if (out.length === 0) out.push("Concrete", "Glass", "Steel");
  return [...new Set(out)];
}

// Wikipedia article titles — used to resolve a real photo at runtime via the
// REST summary API (see wikiImage.js). Reliable, follows redirects.
const WIKI = {
  fuji: "Fuji Kindergarten",
  greenSchoolBali: "Green School (Bali)",
  thermeVals: "Therme Vals",
  bruderKlaus: "Bruder Klaus Field Chapel",
  teshima: "Teshima Art Museum",
  sendai: "Sendai Mediatheque",
  salk: "Salk Institute",
  kanagawa: "Kanagawa Institute of Technology",
  sydneyOpera: "Sydney Opera House",
  pompidou: "Centre Pompidou",
  farnsworth: "Farnsworth House",
  fallingwater: "Fallingwater",
  kimbell: "Kimbell Art Museum",
  seattleLibrary: "Seattle Central Library",
  highline: "High Line",
  churchLight: "Church of the Light",
  copenhill: "Copenhill",
  tjibaou: "Jean-Marie Tjibaou Cultural Centre",
  magney: "Magney House",
  menil: "The Menil Collection",
  bagsvaerd: "Bagsværd Church",
  bullitt: "Bullitt Center",
  ningbo: "Ningbo Museum",
  habitat67: "Habitat 67",
  quintaMonroy: "Quinta Monroy",
  louisiana: "Louisiana Museum of Modern Art",
  maggies: "Maggie's Centres",
  thoncho: "Thorncrown Chapel",
  edenProject: "Eden Project",
  guggenheimNY: "Solomon R. Guggenheim Museum",
};

export function getPrecedentDetail(precedent) {
  const authored = DETAILS[precedent.id];
  if (authored) {
    return {
      ...authored,
      // Link always opens a Google search for the project (name + architect).
      link: GOOGLE(`${precedent.name} ${precedent.architect}`),
      image: null, // resolved at runtime from `wiki`, SVG portrait as fallback
      wiki: WIKI[precedent.id] ?? precedent.name,
      authored: true,
    };
  }

  // Graceful fallback: resolves a real photo from the project name, a Google
  // search link, a sensible material guess, and influences from the reason.
  return {
    authored: false,
    link: GOOGLE(`${precedent.name} ${precedent.architect}`),
    image: null,
    wiki: precedent.name,
    materials: inferMaterials(precedent.tags),
    lessons: [],
    influences: precedent.reason,
  };
}
