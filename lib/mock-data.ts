// All mock data lives here, separated from UI so a real API can replace it later.
// Each exported object mirrors an expected API response shape.

export type Trend = "up" | "down" | "flat"

export interface QuickStat {
  id: string
  label: string
  value: string
  trend: Trend
  changeLabel: string
}

export interface AssessmentRecord {
  id: string
  businessName: string
  category: string
  location: string
  score: number
  status: "Viable" | "Viable with modifications" | "Not recommended"
  date: string
}

export interface SavedReport {
  id: string
  title: string
  location: string
  createdOn: string
  pages: number
}

export const dashboardStats: QuickStat[] = [
  { id: "assessments", label: "Assessments run", value: "6", trend: "up", changeLabel: "+2 this month" },
  { id: "avgScore", label: "Average viability", value: "74", trend: "up", changeLabel: "+5 pts" },
  { id: "schemes", label: "Matched schemes", value: "4", trend: "flat", changeLabel: "no change" },
  { id: "savings", label: "Est. loan optimized", value: "₹1.2L", trend: "up", changeLabel: "vs. requested" },
]

export const recentAssessments: AssessmentRecord[] = [
  {
    id: "a1",
    businessName: "Amrit Dairy Unit",
    category: "Dairy",
    location: "Rampur, Barabanki, UP",
    score: 78,
    status: "Viable with modifications",
    date: "12 Sep 2026",
  },
  {
    id: "a2",
    businessName: "Sujata Tailoring",
    category: "Tailoring",
    location: "Rampur, Barabanki, UP",
    score: 82,
    status: "Viable",
    date: "05 Sep 2026",
  },
  {
    id: "a3",
    businessName: "Ganesh Mobile Repair",
    category: "Mobile Repair",
    location: "Haidergarh, Barabanki, UP",
    score: 76,
    status: "Viable with modifications",
    date: "28 Aug 2026",
  },
  {
    id: "a4",
    businessName: "Village Kirana Store",
    category: "Grocery",
    location: "Rampur, Barabanki, UP",
    score: 64,
    status: "Not recommended",
    date: "20 Aug 2026",
  },
]

export const savedReports: SavedReport[] = [
  { id: "r1", title: "Dairy Unit Feasibility Report", location: "Rampur, Barabanki", createdOn: "12 Sep 2026", pages: 11 },
  { id: "r2", title: "Tailoring Business Report", location: "Rampur, Barabanki", createdOn: "05 Sep 2026", pages: 9 },
]

export const recommendedActions: { id: string; title: string; desc: string; cta: string; href: string }[] = [
  {
    id: "act1",
    title: "Reduce your loan by ₹40,000",
    desc: "Your projected surplus supports a smaller loan. This lowers monthly EMI stress.",
    cta: "Review financial plan",
    href: "/financial",
  },
  {
    id: "act2",
    title: "Apply to PMEGP scheme",
    desc: "You are eligible with up to 35% subsidy for your dairy unit.",
    cta: "View scheme",
    href: "/schemes",
  },
  {
    id: "act3",
    title: "Consider Tailoring (82/100)",
    desc: "A higher-scoring alternative for your location and capital.",
    cta: "See alternatives",
    href: "/alternatives",
  },
]

// ---- Assessment form option data ----
export const states = ["Uttar Pradesh", "Bihar", "Madhya Pradesh", "Rajasthan", "Maharashtra", "Karnataka"]
export const districtsByState: Record<string, string[]> = {
  "Uttar Pradesh": ["Barabanki", "Lucknow", "Sitapur", "Unnao"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Rewa"],
  Rajasthan: ["Jaipur", "Ajmer", "Kota"],
  Maharashtra: ["Pune", "Nashik", "Nagpur"],
  Karnataka: ["Mysuru", "Belagavi", "Tumakuru"],
}
export const blocks = ["Haidergarh", "Ramnagar", "Fatehpur", "Nindura"]
export const villages = ["Rampur", "Semri", "Mohammadpur", "Bhitauli"]

export const businessCategories = [
  "Dairy",
  "Tailoring",
  "Mobile Repair",
  "Grocery / Kirana",
  "Poultry",
  "Food Processing",
  "Handicrafts",
  "Beauty & Wellness",
  "Agri Inputs",
]

export const experienceLevels = ["No experience", "Less than 1 year", "1-3 years", "3+ years"]
export const infrastructureOptions = ["Own land / shop", "Rented space", "Electricity connection", "Water source", "Storage / cold chain", "Two-wheeler / transport"]
export const customerOptions = ["Local villagers", "Nearby markets / mandis", "Shops / retailers", "Institutions (schools, offices)", "Online / app orders"]

// ---- AI Analysis ----
export interface ScoreFactor {
  id: string
  label: string
  score: number // 0-100
  note: string
}

export const analysisSummary = {
  overallScore: 78,
  confidence: 74,
  recommendation: "Viable with modifications",
  businessName: "Amrit Dairy Unit",
  category: "Dairy",
  location: "Rampur, Barabanki, Uttar Pradesh",
}

export const scoreFactors: ScoreFactor[] = [
  { id: "demand", label: "Demand", score: 82, note: "Strong daily milk demand in 5 km radius; low cold-chain gap." },
  { id: "competition", label: "Competition", score: 68, note: "3 existing dairy suppliers; room for a quality-focused entrant." },
  { id: "pricing", label: "Pricing Power", score: 71, note: "Prices stable; limited ability to charge premium." },
  { id: "supply", label: "Supply", score: 84, note: "Reliable fodder and veterinary support available locally." },
  { id: "accessibility", label: "Accessibility", score: 79, note: "All-weather road; 8 km to nearest collection center." },
  { id: "financial", label: "Financial Fit", score: 73, note: "Loan affordable with recommended ₹40k reduction." },
  { id: "risk", label: "Risk", score: 66, note: "Seasonal yield dips and feed price volatility are key risks." },
]

export const whyThisScore: { id: string; factor: string; impact: "positive" | "negative" | "neutral"; text: string }[] = [
  { id: "w1", factor: "Local demand", impact: "positive", text: "Milk consumption in the block exceeds current local supply by ~18%." },
  { id: "w2", factor: "Supply chain", impact: "positive", text: "Fodder availability and vet services reduce operational risk." },
  { id: "w3", factor: "Competition", impact: "neutral", text: "Established suppliers exist but none offer chilled delivery." },
  { id: "w4", factor: "Feed price volatility", impact: "negative", text: "Feed costs rose 9% YoY, compressing margins in lean months." },
  { id: "w5", factor: "Loan size", impact: "negative", text: "Requested loan is 12% higher than projected cash flow supports." },
]

export const dataSources: { id: string; source: string; detail: string }[] = [
  { id: "d1", source: "District Census & population grid", detail: "Household density within 5 km used to estimate demand." },
  { id: "d2", source: "NDDB / State dairy federation data", detail: "Procurement prices and consumption benchmarks." },
  { id: "d3", source: "Agri-market (eNAM) feed prices", detail: "Fodder and feed cost trends over 24 months." },
  { id: "d4", source: "OpenStreetMap POIs", detail: "Competitor and infrastructure locations near the site." },
]

export const assumptions: string[] = [
  "Herd of 4 crossbred cows producing ~40 litres/day at steady state.",
  "Average realized price of ₹42/litre after collection deductions.",
  "Operating costs include feed, labour, veterinary and utilities.",
  "Demand estimated from population within a 5 km catchment.",
]

// ---- Market Intelligence ----
export interface Competitor {
  id: string
  name: string
  type: string
  distanceKm: number
  rating: number
}

export const competitors: Competitor[] = [
  { id: "c1", name: "Shivam Dairy", type: "Dairy supplier", distanceKm: 1.2, rating: 3.8 },
  { id: "c2", name: "Gramin Milk Point", type: "Collection center", distanceKm: 2.6, rating: 4.1 },
  { id: "c3", name: "Local Doodh Bhandar", type: "Retail dairy", distanceKm: 3.4, rating: 3.5 },
]

export const marketMetrics = {
  competitorCount: 3,
  customerRadiusKm: 5,
  demandEstimate: "1,150 litres/day",
  priceRangeMin: 38,
  priceRangeMax: 48,
  confidence: 72,
}

export const competitionByDistance = [
  { label: "0-2 km", value: 1 },
  { label: "2-4 km", value: 2 },
  { label: "4-6 km", value: 1 },
  { label: "6-8 km", value: 0 },
]

export const demandTrend = [
  { label: "Apr", value: 62 },
  { label: "May", value: 65 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 74 },
  { label: "Aug", value: 78 },
  { label: "Sep", value: 82 },
]

export const nearbyInfrastructure: { id: string; label: string; distance: string; available: boolean }[] = [
  { id: "i1", label: "All-weather road", distance: "On site", available: true },
  { id: "i2", label: "Milk collection center", distance: "8 km", available: true },
  { id: "i3", label: "Veterinary clinic", distance: "6 km", available: true },
  { id: "i4", label: "Cold storage", distance: "22 km", available: false },
  { id: "i5", label: "Weekly market (mandi)", distance: "9 km", available: true },
]

// ---- Financial Plan ----
export const financialPlan = {
  ownContribution: 60000,
  projectCost: 260000,
  requiredLoan: 200000,
  interestRate: 10.5,
  tenureMonths: 60,
  moratoriumMonths: 6,
  estimatedEmi: 4299,
}

export const costBreakdown = [
  { label: "Cattle purchase", value: 140000 },
  { label: "Shed & fittings", value: 55000 },
  { label: "Equipment", value: 35000 },
  { label: "Working capital", value: 30000 },
]

export const cashFlow = {
  monthlyRevenue: 50400,
  monthlyOperatingCost: 34500,
  monthlySurplus: 15900,
  monthlyRepayment: 4299,
  repaymentCoverage: 3.7, // surplus / repayment
}

export const cashFlowSeries = [
  { label: "Q1", revenue: 132000, cost: 98000, surplus: 34000 },
  { label: "Q2", revenue: 151200, cost: 103500, surplus: 47700 },
  { label: "Q3", revenue: 158000, cost: 106000, surplus: 52000 },
  { label: "Q4", revenue: 162000, cost: 108000, surplus: 54000 },
]

// ---- Government Schemes ----
export interface Scheme {
  id: string
  name: string
  eligible: boolean
  maxLoan: string
  interestRate: string
  tenure: string
  moratorium: string
  match: string
  documents: string[]
}

export const schemes: Scheme[] = [
  {
    id: "pmegp",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    eligible: true,
    maxLoan: "₹25,00,000",
    interestRate: "As per bank (subsidy 15-35%)",
    tenure: "3-7 years",
    moratorium: "6 months",
    match: "Manufacturing/service unit under ₹25L with rural margin subsidy up to 35%.",
    documents: ["Aadhaar card", "Project report", "Caste certificate (if applicable)", "Bank passbook"],
  },
  {
    id: "mudra",
    name: "PM MUDRA Loan (Kishor)",
    eligible: true,
    maxLoan: "₹5,00,000",
    interestRate: "8.5% - 12%",
    tenure: "Up to 5 years",
    moratorium: "Up to 6 months",
    match: "Your loan of ₹2,00,000 fits the Kishor category for growing micro-units.",
    documents: ["Aadhaar card", "Business proof", "Quotations", "Bank statement (6 months)"],
  },
  {
    id: "nrlm",
    name: "DAY-NRLM Community Investment",
    eligible: false,
    maxLoan: "₹1,00,000 (via SHG)",
    interestRate: "7% (with prompt repayment)",
    tenure: "Up to 3 years",
    moratorium: "3 months",
    match: "Requires active Self Help Group membership, which is not yet on record.",
    documents: ["SHG membership proof", "Aadhaar card", "Bank passbook"],
  },
  {
    id: "dairy",
    name: "Dairy Entrepreneurship Development Scheme",
    eligible: true,
    maxLoan: "₹7,00,000",
    interestRate: "As per NABARD",
    tenure: "Up to 7 years",
    moratorium: "6 months",
    match: "Directly supports small dairy units with capital subsidy for cattle and equipment.",
    documents: ["Aadhaar card", "Land/lease document", "Project report", "Training certificate"],
  },
]

// ---- Business Alternatives ----
export interface AlternativeFactor {
  demand: number
  competition: number
  capitalFit: number
  risk: number
}

export interface Alternative {
  id: string
  name: string
  score: number
  summary: string
  factors: AlternativeFactor
}

export const alternatives: Alternative[] = [
  {
    id: "tailoring",
    name: "Tailoring",
    score: 82,
    summary: "Low capital, steady local demand and minimal spoilage risk.",
    factors: { demand: 80, competition: 74, capitalFit: 90, risk: 82 },
  },
  {
    id: "dairy",
    name: "Dairy",
    score: 78,
    summary: "Strong demand but sensitive to feed prices and seasonality.",
    factors: { demand: 82, competition: 68, capitalFit: 73, risk: 66 },
  },
  {
    id: "mobile",
    name: "Mobile Repair",
    score: 76,
    summary: "Rising device penetration; needs skill and steady footfall.",
    factors: { demand: 78, competition: 70, capitalFit: 84, risk: 72 },
  },
  {
    id: "grocery",
    name: "Grocery",
    score: 64,
    summary: "Saturated market nearby; thin margins limit viability.",
    factors: { demand: 66, competition: 52, capitalFit: 76, risk: 62 },
  },
]

// ---- Report ----
export const reportData = {
  title: "Business Feasibility Report",
  business: "Amrit Dairy Unit",
  applicant: "Ramesh Verma",
  location: "Rampur, Haidergarh Block, Barabanki, Uttar Pradesh",
  date: "12 September 2026",
  confidence: 74,
  executiveSummary:
    "A 4-cow crossbred dairy unit at Rampur is viable with modifications. Local demand exceeds supply, infrastructure is adequate, and the venture generates a healthy monthly surplus. We recommend reducing the loan by ₹40,000 and applying under the Dairy Entrepreneurship Development Scheme to lower the effective cost of capital.",
  swot: {
    strengths: ["Unmet local milk demand", "Reliable fodder & vet support", "All-weather road access"],
    weaknesses: ["Limited applicant experience", "No cold storage on site"],
    opportunities: ["Chilled delivery differentiation", "Subsidy-linked scheme support"],
    threats: ["Feed price volatility", "Seasonal yield variation"],
  },
}
