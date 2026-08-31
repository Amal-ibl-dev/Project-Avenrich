/** Formats a number as USD currency, e.g. 384780.67 -> "$384,780.67". */
export function formatCurrency(value: number, fractionDigits = 2): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** Formats a number as USD currency with no decimals, e.g. 560870 -> "$560,870". */
export function formatCurrencyWhole(value: number): string {
  return formatCurrency(value, 0);
}

/** Compact currency for legend labels, e.g. 142700 -> "$142.7K". */
export function formatCurrencyCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Formats a signed percentage delta, e.g. 8.7 -> "+ 8.7%". */
export function formatSignedPercent(value: number): string {
  const sign = value >= 0 ? "+" : "−";
  return `${sign} ${Math.abs(value).toFixed(1)}%`;
}
