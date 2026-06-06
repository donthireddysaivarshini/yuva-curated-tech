// src/types/product.ts
// Single source of truth for product types across all components.
// Variants are the ONLY canonical source for processor/ram/storage.
// Product-level spec fields (processor/ram/storage) are intentionally
// ignored in all display helpers — variants[] is the single source of truth.

export interface ProductVariant {
  id: number;
  processor: string;   // empty string '' when not applicable
  ram: string;
  storage: string;
  stock: number;
  final_price: number;
  final_original_price: number | null;
  price_override?: number;
}

export interface UsageTag {
  id: number;
  name: string;
  slug: string;
  icon?: string;
}

export interface ProductImage {
  id: number;
  image: string;
  is_primary: boolean;
  order?: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  slug: string;
  sku: string;

  price: string | number;
  original_price?: string | number;
  discount_percentage?: number;

  condition: string;
  condition_display?: string;

  brand_name: string;
  category_name: string;

  // NOTE: processor/ram/storage are present in the API response for backward
  // compat (search, detail page specs table) but must NEVER be used for card
  // display or filter logic. Use variants[] exclusively for those purposes.
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;

  usage_tags?: UsageTag[];
  images?: ProductImage[];
  variants?: ProductVariant[];

  average_rating?: number;
  review_count?: number;

  is_new_arrival?: boolean;
  is_best_seller?: boolean;
  is_trending?: boolean;
  is_best_deal?: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the first in-stock variant, or the first variant if all are OOS,
 * or null if there are no variants.
 */
export function getPrimaryVariant(product: ApiProduct): ProductVariant | null {
  const variants = product.variants;
  if (!variants || variants.length === 0) return null;
  return variants.find((v) => v.stock > 0) ?? variants[0];
}

/**
 * Builds a single human-readable combination string for one variant.
 * Omits empty parts (e.g. processor = '' for non-processor products).
 * Example outputs:
 *   "Core i7 | 16GB | 512GB SSD"
 *   "8GB | 256GB SSD"   (no processor)
 */
export function formatVariantLabel(v: ProductVariant): string {
  return [v.processor, v.ram, v.storage].filter((s) => s && s.trim()).join(" | ");
}

/**
 * Builds the variant summary string shown on product cards.
 *
 * Rules:
 *  - Shows up to MAX_SHOWN variant combination labels
 *  - Appends "+N more" if variants exceed MAX_SHOWN
 *  - Deduplicates labels (two variants with same label collapse into one)
 *  - Returns [] if there are no variants (caller should hide the section)
 *
 * Example return value (array of strings to render as pills):
 *   ["Core i7 | 16GB | 512GB", "Core i5 | 8GB | 256GB", "+3 more"]
 */
const MAX_SHOWN = 2;

export function getVariantSummary(product: ApiProduct): string[] {
  const variants = product.variants;
  if (!variants || variants.length === 0) return [];

  // Deduplicate by label text
  const seen = new Set<string>();
  const labels: string[] = [];
  for (const v of variants) {
    const label = formatVariantLabel(v);
    if (label && !seen.has(label)) {
      seen.add(label);
      labels.push(label);
    }
  }

  if (labels.length === 0) return [];

  const shown = labels.slice(0, MAX_SHOWN);
  const remaining = labels.length - MAX_SHOWN;
  if (remaining > 0) {
    shown.push(`+${remaining} more`);
  }
  return shown;
}

/**
 * Returns spec badges for the primary (cheapest in-stock) variant ONLY.
 * No fallback to product-level fields — variants are the single source of truth.
 * Returns [] for products with no variants (caller handles gracefully).
 */
export function getSpecBadges(product: ApiProduct): string[] {
  const v = getPrimaryVariant(product);
  if (!v) return [];
  return [v.processor, v.ram, v.storage].filter(Boolean) as string[];
}

/**
 * Returns the display price for a product card (no variant selected yet).
 * Uses the lowest-priced in-stock variant, or falls back to base product price
 * only when there are genuinely no variants.
 */
export function getCardPrice(product: ApiProduct): { price: number; originalPrice: number | null } {
  const variants = product.variants;
  if (variants && variants.length > 0) {
    const inStock = variants.filter((v) => v.stock > 0);
    const pool = inStock.length > 0 ? inStock : variants;
    const cheapest = pool.reduce(
      (min, v) => (v.final_price < min.final_price ? v : min),
      pool[0]
    );
    return {
      price: cheapest.final_price,
      originalPrice: cheapest.final_original_price,
    };
  }
  // True fallback: product has no variants at all (edge case)
  return {
    price: Number(product.price),
    originalPrice: product.original_price ? Number(product.original_price) : null,
  };
}

/**
 * Collect unique non-empty values from variants across all products.
 * Used for building filter options on the products page.
 * Source is always variants[] — never product-level fields.
 */
export function collectVariantValues(
  products: ApiProduct[],
  field: keyof Pick<ProductVariant, "processor" | "ram" | "storage">
): string[] {
  const set = new Set<string>();
  products.forEach((p) => {
    (p.variants || []).forEach((v) => {
      const val = v[field];
      if (val && val.trim()) set.add(val.trim());
    });
  });
  return Array.from(set).sort();
}