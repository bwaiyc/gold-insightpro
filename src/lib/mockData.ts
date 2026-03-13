export type GoldPriceSnapshot = {
  current: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
};

export type HistoricalRow = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type MarketSummaryItem = {
  label: string;
  value: string;
};

export type ExplainabilityItem = {
  factor: string;
  impact: number;
  direction: "positive" | "negative";
  description: string;
};

export type ForecastChartPoint = {
  month: string;
  actual?: number;
  predicted: number;
  lower: number;
  upper: number;
};

export type ForecastConfig = {
  predictedPrice: number;
  confidence: number;
  rangeLow: number;
  rangeHigh: number;
  summary: string;
  chartData: ForecastChartPoint[];
};

export const MOCK_GOLD_PRICE: GoldPriceSnapshot = {
  current: 2947.8,
  change: 12.4,
  changePercent: 0.42,
  high: 2961.3,
  low: 2928.6,
  open: 2935.2,
};

export const MOCK_PREDICTED_PRICE = 3012.5;
export const MOCK_CONFIDENCE = 87;
export const MOCK_SIGNAL: "Bullish" | "Bearish" | "Neutral" = "Bullish";

export const MOCK_HISTORICAL: HistoricalRow[] = [
  { date: "2025-02-21", open: 2921.4, high: 2935.8, low: 2910.2, close: 2928.6, volume: 168520 },
  { date: "2025-02-24", open: 2929.0, high: 2942.5, low: 2920.1, close: 2938.2, volume: 172410 },
  { date: "2025-02-25", open: 2938.4, high: 2950.7, low: 2931.6, close: 2944.1, volume: 177300 },
  { date: "2025-02-26", open: 2944.0, high: 2958.2, low: 2938.9, close: 2951.6, volume: 181240 },
  { date: "2025-02-27", open: 2951.0, high: 2961.3, low: 2940.8, close: 2947.8, volume: 182340 },
];

export const HISTORICAL_TABLE_DATA: HistoricalRow[] = [
  { date: "2025-02-27", open: 2951.0, high: 2961.3, low: 2940.8, close: 2947.8, volume: 182340 },
  { date: "2025-02-26", open: 2944.0, high: 2958.2, low: 2938.9, close: 2951.6, volume: 181240 },
  { date: "2025-02-25", open: 2938.4, high: 2950.7, low: 2931.6, close: 2944.1, volume: 177300 },
  { date: "2025-02-24", open: 2929.0, high: 2942.5, low: 2920.1, close: 2938.2, volume: 172410 },
  { date: "2025-02-21", open: 2921.4, high: 2935.8, low: 2910.2, close: 2928.6, volume: 168520 },
];

export const MOCK_MARKET_SUMMARY: MarketSummaryItem[] = [
  { label: "Previous Close", value: "$2,340.10" },
  { label: "Open", value: "$2,340.10" },
  { label: "Day's Range", value: "$2,332.80 – $2,355.40" },
  { label: "52 Week Range", value: "$1,984.20 – $2,355.40" },
  { label: "Volume", value: "182,340" },
  { label: "Avg. Volume", value: "168,520" },
  { label: "Market Sentiment", value: "Bullish" },
  { label: "USD Trend", value: "Weakening" },
];

export const MOCK_EXPLAINABILITY: ExplainabilityItem[] = [
  {
    factor: "US Dollar Index",
    impact: 0.31,
    direction: "negative",
    description: "A weaker USD tends to support gold prices by improving relative affordability.",
  },
  {
    factor: "Inflation Expectation",
    impact: 0.27,
    direction: "positive",
    description: "Persistent inflation supports gold as an inflation hedge.",
  },
  {
    factor: "10Y Treasury Yield",
    impact: 0.22,
    direction: "negative",
    description: "Higher real yields reduce the relative appeal of non-yielding assets like gold.",
  },
  {
    factor: "Central Bank Demand",
    impact: 0.18,
    direction: "positive",
    description: "Sustained official sector buying provides structural demand support.",
  },
  {
    factor: "Geopolitical Risk",
    impact: 0.16,
    direction: "positive",
    description: "Risk-off market conditions strengthen safe-haven demand for gold.",
  },
];

export const MOCK_SHAP_DRIVERS: ExplainabilityItem[] = [
  {
    factor: "Inflation Outlook",
    impact: 0.34,
    direction: "positive",
    description: "Sticky inflation keeps demand for gold elevated as a hedge.",
  },
  {
    factor: "US Dollar Trend",
    impact: 0.29,
    direction: "negative",
    description: "A weaker dollar supports gold, while dollar strength limits upside.",
  },
  {
    factor: "10Y Bond Yield",
    impact: 0.24,
    direction: "negative",
    description: "Rising yields act as a headwind for gold by raising opportunity cost.",
  },
  {
    factor: "Central Bank Purchases",
    impact: 0.22,
    direction: "positive",
    description: "Official sector demand continues to add structural support.",
  },
  {
    factor: "Geopolitical Uncertainty",
    impact: 0.19,
    direction: "positive",
    description: "Risk aversion increases safe-haven flows into gold.",
  },
  {
    factor: "Equity Market Volatility",
    impact: 0.14,
    direction: "positive",
    description: "Higher market volatility can shift capital toward defensive assets.",
  },
];

export const MOCK_FORECAST_CONFIGS: Record<"1m" | "3m" | "6m", ForecastConfig> = {
  "1m": {
    predictedPrice: 3012.5,
    confidence: 87,
    rangeLow: 2978.0,
    rangeHigh: 3046.0,
    summary:
      "The 1-month outlook remains constructive. Persistent inflation concerns, resilient safe-haven demand, and continued central bank buying support further upside in gold prices.",
    chartData: [
      { month: "Jan", actual: 2878, predicted: 2878, lower: 2860, upper: 2895 },
      { month: "Feb", actual: 2948, predicted: 2948, lower: 2930, upper: 2962 },
      { month: "Mar", predicted: 2976, lower: 2950, upper: 3001 },
      { month: "Apr", predicted: 3013, lower: 2978, upper: 3046 },
    ],
  },
  "3m": {
    predictedPrice: 3089.4,
    confidence: 81,
    rangeLow: 3015.0,
    rangeHigh: 3162.0,
    summary:
      "The 3-month projection points to a continued upward trend, though with moderately wider uncertainty bands as macro and rate expectations remain fluid.",
    chartData: [
      { month: "Jan", actual: 2878, predicted: 2878, lower: 2860, upper: 2895 },
      { month: "Feb", actual: 2948, predicted: 2948, lower: 2930, upper: 2962 },
      { month: "Mar", predicted: 2976, lower: 2950, upper: 3001 },
      { month: "Apr", predicted: 3013, lower: 2978, upper: 3046 },
      { month: "May", predicted: 3051, lower: 2996, upper: 3108 },
      { month: "Jun", predicted: 3089, lower: 3015, upper: 3162 },
    ],
  },
  "6m": {
    predictedPrice: 3168.2,
    confidence: 74,
    rangeLow: 3048.0,
    rangeHigh: 3285.0,
    summary:
      "The 6-month horizon still indicates upside, but confidence is lower because longer-range forecasts are more sensitive to policy shifts, yield changes, and regime transitions.",
    chartData: [
      { month: "Jan", actual: 2878, predicted: 2878, lower: 2860, upper: 2895 },
      { month: "Feb", actual: 2948, predicted: 2948, lower: 2930, upper: 2962 },
      { month: "Mar", predicted: 2976, lower: 2950, upper: 3001 },
      { month: "Apr", predicted: 3013, lower: 2978, upper: 3046 },
      { month: "May", predicted: 3051, lower: 2996, upper: 3108 },
      { month: "Jun", predicted: 3089, lower: 3015, upper: 3162 },
      { month: "Jul", predicted: 3117, lower: 3032, upper: 3203 },
      { month: "Aug", predicted: 3142, lower: 3041, upper: 3240 },
      { month: "Sep", predicted: 3168, lower: 3048, upper: 3285 },
    ],
  },
};