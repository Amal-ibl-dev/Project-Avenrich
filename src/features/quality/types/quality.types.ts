/** One point in the Quality Trend area chart. */
export interface QualityTrendPoint {
  day: string;
  approved: number;
  rejected: number;
}

/** One row in the Blend Attribute pass rate horizontal bar chart. */
export interface AttributePassRate {
  id: string;
  label: string;
  /** 0–100 percent. */
  percent: number;
  color: string;
}

/** A slice of the Check Report Type donut. */
export interface CheckReportSlice {
  id: string;
  label: string;
  percent: number;
  colorStart: string;
  colorEnd: string;
}

export interface RejectedItem {
  id: string;
  qaCode: string;
  title: string;
  description: string;
}

export type QualityDecision = "Approved" | "Rejected";

export interface RecentQualityCheckRow {
  id: string;
  qaId: string;
  reportType: string;
  decision: QualityDecision;
  reviewDate: string;
  remark: string;
}
