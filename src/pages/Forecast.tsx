import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { TrendingUp, Shield, BrainCircuit } from "lucide-react";
import {
  MOCK_FORECAST_CONFIGS,
  MOCK_GOLD_PRICE,
  MOCK_SHAP_DRIVERS,
} from "@/lib/mockData";

const horizonOptions = [
  { key: "1m", label: "1M Forecast" },
  { key: "3m", label: "3M Forecast" },
  { key: "6m", label: "6M Forecast" },
] as const;

export default function ForecastPage() {
  const [activeHorizon, setActiveHorizon] = useState<"1m" | "3m" | "6m">("1m");

  const forecast = useMemo(
    () => MOCK_FORECAST_CONFIGS[activeHorizon],
    [activeHorizon]
  );

  const predictedChangePct = useMemo(() => {
    return (
      ((forecast.predictedPrice - MOCK_GOLD_PRICE.current) /
        MOCK_GOLD_PRICE.current) *
      100
    );
  }, [forecast]);

  const shapChartData = useMemo(() => {
    return MOCK_SHAP_DRIVERS.map((item) => ({
      factor: item.factor,
      impact: Number((item.impact * 100).toFixed(1)),
      direction: item.direction,
      description: item.description,
    }));
  }, []);

  const yMin = Math.floor(
    Math.min(...forecast.chartData.map((d) => d.lower)) - 10
  );
  const yMax = Math.ceil(
    Math.max(...forecast.chartData.map((d) => d.upper)) + 10
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-6">
            <h1 className="text-3xl font-display font-bold tracking-tight">
              Forecast & Explainability
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
              Compare gold price forecast horizons, review prediction ranges,
              and inspect the major macroeconomic drivers contributing to the
              model output.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {horizonOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setActiveHorizon(option.key)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeHorizon === option.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-4 gap-4 mb-6">
            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Current Price
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                ${MOCK_GOLD_PRICE.current.toLocaleString()}
              </p>
            </div>

            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Predicted Price
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                ${forecast.predictedPrice.toLocaleString()}
              </p>
              <p
                className={`text-xs mt-1 ${
                  predictedChangePct >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {predictedChangePct >= 0 ? "+" : ""}
                {predictedChangePct.toFixed(2)}% vs current
              </p>
            </div>

            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Confidence
              </p>
              <p className="text-2xl font-display font-bold mt-1">
                {forecast.confidence}%
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full gold-gradient"
                  style={{ width: `${forecast.confidence}%` }}
                />
              </div>
            </div>

            <div className="card-premium p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Forecast Range
              </p>
              <p className="text-lg font-display font-bold mt-1">
                ${forecast.rangeLow.toLocaleString()} – $
                {forecast.rangeHigh.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card-premium p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display font-semibold text-base">
                  Forecast Trend
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {forecast.summary}
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <ComposedChart
                data={forecast.chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="forecastBand" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(43 72% 42%)"
                      stopOpacity={0.18}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(43 72% 42%)"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(220 14% 92%)"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                  tickLine={false}
                  axisLine={{ stroke: "hsl(220 14% 89%)" }}
                />

                <YAxis
                  domain={[yMin, yMax]}
                  tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `$${v.toLocaleString()}`}
                  width={72}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid hsl(220 14% 89%)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    fontSize: 13,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="transparent"
                  fill="url(#forecastBand)"
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="transparent"
                  fill="white"
                  activeDot={false}
                />

                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(220 10% 20%)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(43 72% 42%)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card-premium p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <BrainCircuit className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-base">
                    Feature Impact Drivers
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Approximate contribution strength of major macro variables in
                    the forecast model.
                  </p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={shapChartData}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 24, bottom: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(220 14% 92%)"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    width={130}
                    tick={{ fontSize: 11, fill: "hsl(220 10% 46%)" }}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Impact"]}
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid hsl(220 14% 89%)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="impact" radius={[0, 6, 6, 0]}>
                    {shapChartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          entry.direction === "positive"
                            ? "hsl(142 60% 55%)"
                            : "hsl(0 72% 62%)"
                        }
                        fillOpacity={0.75}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card-premium p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg gold-gradient flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-base">
                    Model Notes
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Key factors shaping this forecast.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {MOCK_SHAP_DRIVERS.map((item) => (
                  <div
                    key={item.factor}
                    className="border border-border rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{item.factor}</p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                          item.direction === "positive"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.direction === "positive" ? "Positive" : "Negative"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}