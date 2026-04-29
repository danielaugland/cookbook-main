# Liquid Density Table

Used during ingest to convert volume measurements to weight. All densities are at ~20°C (room temperature).

Format in recipes: `[volume] ([weight])` — e.g. `250ml (250g) water`

## Water & Broths

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Water | 1.000 | 100g | 500g | 1kg |
| Chicken / beef / vegetable stock | ~1.000 | 100g | 500g | 1kg |
| Beer | 1.010 | 101g | 505g | 1.01kg |

## Dairy

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Whole milk | 1.030 | 103g | 515g | 1.03kg |
| Half-and-half (~10% fat) | 1.020 | 102g | 510g | 1.02kg |
| Skimmed milk | 1.035 | 104g | 518g | 1.035kg |
| Buttermilk | 1.030 | 103g | 515g | 1.03kg |
| Heavy cream (35%+) | 0.990 | 99g | 495g | 990g |
| Light cream (18%) | 1.010 | 101g | 505g | 1.01kg |
| Sour cream (liquid) | 1.060 | 106g | 530g | 1.06kg |
| Yogurt (pourable) | 1.060 | 106g | 530g | 1.06kg |
| Butter, melted | 0.910 | 91g | 455g | 910g |

## Oils & Fats

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Olive oil | 0.910 | 91g | 455g | 910g |
| Vegetable / sunflower / canola oil | 0.920 | 92g | 460g | 920g |
| Coconut oil, melted | 0.910 | 91g | 455g | 910g |
| Sesame oil | 0.920 | 92g | 460g | 920g |

## Alcohols & Vinegars

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| White / red wine | 0.990 | 99g | 495g | 990g |
| White wine vinegar | 1.005 | 101g | 503g | 1.005kg |
| Apple cider vinegar | 1.005 | 101g | 503g | 1.005kg |
| Balsamic vinegar | 1.200 | 120g | 600g | 1.2kg |
| Rice vinegar | 1.010 | 101g | 505g | 1.01kg |

## Sauces & Condiments

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Soy sauce | 1.050 | 105g | 525g | 1.05kg |
| Fish sauce | 1.060 | 106g | 530g | 1.06kg |
| Worcestershire sauce | 1.070 | 107g | 535g | 1.07kg |
| Tomato passata | 1.050 | 105g | 525g | 1.05kg |
| Coconut milk (canned) | 1.000 | 100g | 500g | 1kg |
| Coconut cream (canned) | 1.060 | 106g | 530g | 1.06kg |

## Sweeteners

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Honey | 1.400 | 140g | 700g | 1.4kg |
| Maple syrup | 1.320 | 132g | 660g | 1.32kg |
| Golden syrup / corn syrup | 1.400 | 140g | 700g | 1.4kg |
| Molasses | 1.460 | 146g | 730g | 1.46kg |

## Citrus & Other Juices

| Liquid | Density (g/ml) | 100ml | 500ml | 1L |
|--------|---------------|-------|-------|-----|
| Lemon juice | 1.030 | 103g | 515g | 1.03kg |
| Lime juice | 1.030 | 103g | 515g | 1.03kg |
| Orange juice | 1.045 | 105g | 523g | 1.045kg |

---

## How to Calculate

If a liquid is not in this table, use the formula:

```
weight (g) = volume (ml) × density (g/ml)
```

When sourcing a new density, prefer food-science references or manufacturer data over general chemistry tables (concentration and temperature affect density). Add new entries to this table during ingest if the recipe introduces a liquid not listed here.
