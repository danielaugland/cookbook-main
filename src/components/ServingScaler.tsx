import { useState } from 'preact/hooks';

interface Ingredient {
  amount?:  number;
  unit?:    'g' | 'kg' | 'ml' | 'L' | 'count';
  weightG?: number;
  item:     string;
  scalable: boolean;
}

interface Props {
  ingredients: Ingredient[];
  baseYield:   number;
  yieldUnit:   string;
}

function formatWeight(g: number): string {
  if (g >= 1000) {
    const kg = g / 1000;
    return `${+kg.toFixed(2)}kg`;
  }
  return `${Math.round(g)}g`;
}

function formatVolume(ml: number): string {
  if (ml >= 1000) {
    const l = ml / 1000;
    return `${+l.toFixed(2)}L`;
  }
  return `${Math.round(ml)}ml`;
}

function scaleAmount(ing: Ingredient, multiplier: number): string {
  if (ing.amount === undefined) return '';

  if (!ing.scalable) {
    const raw = ing.unit === 'count' ? String(ing.amount) : `${ing.amount}${ing.unit ?? ''}`;
    return raw;
  }

  const scaled = ing.amount * multiplier;

  if (ing.unit === 'ml' || ing.unit === 'L') {
    const baseML  = ing.unit === 'L' ? ing.amount * 1000 : ing.amount;
    const scaledML = baseML * multiplier;
    const vol = formatVolume(scaledML);
    if (ing.weightG !== undefined) {
      const scaledG = ing.weightG * multiplier;
      return `${vol} (${formatWeight(scaledG)})`;
    }
    return vol;
  }

  if (ing.unit === 'g' || ing.unit === 'kg') {
    const baseG = ing.unit === 'kg' ? ing.amount * 1000 : ing.amount;
    return formatWeight(baseG * multiplier);
  }

  if (ing.unit === 'count') {
    // Round to nearest 0.5 for count items
    return String(Math.round(scaled * 2) / 2);
  }

  return String(scaled);
}

export default function ServingScaler({ ingredients, baseYield, yieldUnit }: Props) {
  const [servings, setServings] = useState(baseYield);
  const multiplier = servings / baseYield;

  return (
    <section class="scaler">
      <div class="scaler-header">
        <h2>Ingredients</h2>
        <div class="scaler-control">
          <button
            onClick={() => setServings(s => Math.max(1, s - 1))}
            aria-label="Fewer servings"
          >−</button>
          <span>{servings} {yieldUnit}</span>
          <button
            onClick={() => setServings(s => s + 1)}
            aria-label="More servings"
          >+</button>
        </div>
      </div>
      <ul class="ingredient-list">
        {ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount !== undefined && (
              <span class="amount">{scaleAmount(ing, multiplier)}</span>
            )}
            <span>{ing.item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
