import { FlatCompat } from "@eslint/eslintrc";
import boundaries from "eslint-plugin-boundaries";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: { boundaries },
    settings: {
      "boundaries/elements": [
        { type: "app", pattern: "src/app/**" },
        { type: "features", pattern: "src/features/*/**", capture: ["feature"] },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },
    rules: {
      // The one rule that keeps this a modular monolith instead of a ball of
      // mud: features never import from another feature, and shared never
      // imports from a feature. See docs/architecture.md §4.
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            { from: "app", allow: ["features", "shared"] },
            { from: "features", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
