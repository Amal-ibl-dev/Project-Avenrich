/**
 * Shared because both `features/quality` and `features/blend` render a
 * "Top Raw Material Allocated" style bar list from this shape (see
 * shared/components/ui/TopRawMaterialCard.tsx).
 */
export interface RawMaterialAllocation {
  id: string;
  label: string;
  percent: number;
}
