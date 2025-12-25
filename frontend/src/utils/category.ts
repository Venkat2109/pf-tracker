// frontend/src/utils/category.ts

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: [
    "food",
    "grocery",
    "groceries",
    "restaurant",
    "hotel",
    "mess",
    "canteen",
    "snacks",
    "dinner",
    "lunch",
    "breakfast",
    "pizza",
    "burger",
    "tea",
    "coffee"
  ],

  Transport: [
    "uber",
    "ola",
    "bus",
    "train",
    "metro",
    "auto",
    "cab",
    "fuel",
    "petrol",
    "diesel",
    "travel"
  ],

  Housing: [
    "rent",
    "house",
    "apartment",
    "electricity",
    "water",
    "maintenance",
    "wifi",
    "broadband"
  ],

  Education: [
    "college",
    "school",
    "fee",
    "fees",
    "course",
    "tuition",
    "exam",
    "books",
    "notebook"
  ],

  Entertainment: [
    "movie",
    "cinema",
    "netflix",
    "prime",
    "spotify",
    "game",
    "concert"
  ]
}

export function categorize(note?: string): string {
  if (!note) return "Others"

  const text = note.toLowerCase()

  let bestCategory = "Others"
  let maxMatches = 0

  for (const category in CATEGORY_KEYWORDS) {
    const keywords = CATEGORY_KEYWORDS[category]
    const matches = keywords.filter(word => text.includes(word)).length

    if (matches > maxMatches) {
      maxMatches = matches
      bestCategory = category
    }
  }

  return bestCategory
}
