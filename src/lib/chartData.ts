export type ChartPoint = {
  time: string;
  price: number;
  volume: number;
};

export const RANGE_LABELS = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "All"] as const;

export const RANGE_DATA: Record<string, ChartPoint[]> = {
  "1D": [
    { time: "09:30", price: 2932, volume: 12000 },
    { time: "10:00", price: 2938, volume: 14600 },
    { time: "10:30", price: 2942, volume: 15800 },
    { time: "11:00", price: 2940, volume: 13200 },
    { time: "11:30", price: 2946, volume: 17100 },
    { time: "12:00", price: 2948, volume: 18500 },
    { time: "12:30", price: 2951, volume: 17700 },
    { time: "13:00", price: 2947, volume: 16400 },
  ],
  "5D": [
    { time: "Mon", price: 2915, volume: 152000 },
    { time: "Tue", price: 2928, volume: 168000 },
    { time: "Wed", price: 2939, volume: 171500 },
    { time: "Thu", price: 2952, volume: 179200 },
    { time: "Fri", price: 2948, volume: 182340 },
  ],
  "1M": [
    { time: "Week 1", price: 2868, volume: 145000 },
    { time: "Week 2", price: 2894, volume: 151000 },
    { time: "Week 3", price: 2922, volume: 162000 },
    { time: "Week 4", price: 2948, volume: 182340 },
  ],
  "6M": [
    { time: "Sep", price: 2620, volume: 138000 },
    { time: "Oct", price: 2688, volume: 144000 },
    { time: "Nov", price: 2740, volume: 149000 },
    { time: "Dec", price: 2805, volume: 153500 },
    { time: "Jan", price: 2878, volume: 162200 },
    { time: "Feb", price: 2948, volume: 182340 },
  ],
  YTD: [
    { time: "Jan", price: 2878, volume: 162200 },
    { time: "Feb", price: 2948, volume: 182340 },
    { time: "Mar", price: 2976, volume: 188000 },
    { time: "Apr", price: 3013, volume: 191500 },
  ],
  "1Y": [
    { time: "Q2", price: 2410, volume: 122000 },
    { time: "Q3", price: 2528, volume: 129000 },
    { time: "Q4", price: 2724, volume: 140500 },
    { time: "Q1", price: 2948, volume: 182340 },
  ],
  "5Y": [
    { time: "2021", price: 1798, volume: 98000 },
    { time: "2022", price: 1812, volume: 102000 },
    { time: "2023", price: 1946, volume: 115000 },
    { time: "2024", price: 2340, volume: 148000 },
    { time: "2025", price: 2948, volume: 182340 },
  ],
  All: [
    { time: "2020", price: 1675, volume: 91000 },
    { time: "2021", price: 1798, volume: 98000 },
    { time: "2022", price: 1812, volume: 102000 },
    { time: "2023", price: 1946, volume: 115000 },
    { time: "2024", price: 2340, volume: 148000 },
    { time: "2025", price: 2948, volume: 182340 },
  ],
};