// DOCI Perfume Product Data (English Version)
const perfumeData = [
  // --- MEN'S COLLECTION ---
  {
    id: "men-ves-sir",
    name: "DOCI YES SIR",
    inspiredBy: "YSL Y EDP",
    gender: "men",
    category: "Fresh & Crisp",
    price: 319000,
    originalPrice: 450000,
    stock: 50,
    rating: 4.9,
    reviewsCount: 310,
    image:
      "assets/images/1783734467461_7983307016412442049_g2758941255649715778_3225eab47b7f0c8a09b1b9593a06cc85.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Summer, Autumn",
    occasion: "Office, Meetings, Date Nights, Evening Events",
    description:
      "DOCI YES SIR represents the modern, confident, and ambitious man. A bold fusion of crisp green apple, refreshing sage, and warm, magnetic cedarwood.",
    notes: {
      top: "Green Apple, Ginger, Bergamot",
      middle: "Sage, Juniper Berries, Geranium",
      base: "Amberwood, Tonka Bean, Cedarwood, Olibanum",
    },
    tag: "Best Seller",
  },
  {
    id: "men-nice-navy",
    name: "DOCI NICE NAVY",
    inspiredBy: "Bleu de Chanel",
    gender: "men",
    category: "Luxury & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 45,
    rating: 4.9,
    reviewsCount: 450,
    image:
      "assets/images/1783734467465_7983307016412442049_g2758941255649715778_04822642e5e316fe53c2df7ead3066bb.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Business Meetings, Daily Office, Formal Events",
    description:
      "Defines the refined elegance of a high-class gentleman. DOCI Nice Navy combines zesty grapefruit with rich cedarwood and mysterious incense.",
    notes: {
      top: "Grapefruit, Lemon, Mint, Pink Pepper",
      middle: "Ginger, Nutmeg, Jasmine",
      base: "Incense, Cedarwood, Sandalwood, Amber",
    },
    tag: "Best Seller",
  },
  {
    id: "men-old-king",
    name: "DOCI OLD KING",
    inspiredBy: "Creed Aventus",
    gender: "men",
    category: "Luxury & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 30,
    rating: 4.9,
    reviewsCount: 220,
    image:
      "assets/images/1783734467471_7983307016412442049_g2758941255649715778_14a3b6ba4f2ad5fdd9c4bc0359afbcaa.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Summer, Autumn",
    occasion: "VVIP Events, Executive Meetings, Luxury Dinners",
    description:
      "Inspired by the proud legacy of Emperor Napoleon, DOCI Old King celebrates power and success with rich royal pineapple interwoven with smoky birchwood.",
    notes: {
      top: "Pineapple, Bergamot, Blackcurrant, Apple",
      middle: "Birch, Patchouli, Jasmine, Rose",
      base: "Musk, Oakmoss, Ambergris, Vanilla",
    },
    tag: "Best Seller",
  },
  {
    id: "men-trap-boy",
    name: "DOCI BAD BOY",
    inspiredBy: "Dior Sauvage EDT",
    gender: "men",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 40,
    rating: 4.9,
    reviewsCount: 380,
    image:
      "assets/images/1783734467457_7983307016412442049_g2758941255649715778_2f9b5043317c37e7fb2db3625954fdfa.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Nightlife, Date Nights, Clubs & Pubs, Evening Out",
    description:
      "A touch of wild, rebellious charm. DOCI BAD BOY captivates with a burst of spicy pepper that settles into endless magnetic ambroxan and patchouli.",
    notes: {
      top: "Calabrian Bergamot, Pepper",
      middle: "Sichuan Pepper, Lavender, Pink Pepper, Vetiver",
      base: "Ambroxan, Cedarwood, Labdanum",
    },
    tag: "Trending",
  },
  {
    id: "men-sexy-god",
    name: "DOCI SEXY KING",
    inspiredBy: "Versace Eros",
    gender: "men",
    category: "Sensual & Sweet",
    price: 319000,
    originalPrice: 450000,
    stock: 35,
    rating: 4.9,
    reviewsCount: 280,
    image:
      "assets/images/1783734467446_7983307016412442049_g2758941255649715778_0cc0a3a0a92d66d0fd217314ea260560.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Autumn, Winter",
    occasion: "Romantic Dates, Night Walks, Parties",
    description:
      "Named after the Greek god of love, DOCI SEXY KING sparks passion with crisp mint giving way to sweet Tonka bean and powerful cedarwood.",
    notes: {
      top: "Mint, Green Apple, Lemon",
      middle: "Tonka Bean, Ambroxan, Geranium",
      base: "Madagascan Vanilla, Virginian Cedar, Vetiver",
    },
    tag: "Hot",
  },
  {
    id: "men-mat",
    name: "DOCI M.A.T",
    inspiredBy: "Acqua Di Giò",
    gender: "men",
    category: "Fresh & Crisp",
    price: 319000,
    originalPrice: 450000,
    stock: 60,
    rating: 4.8,
    reviewsCount: 142,
    image:
      "assets/images/1783734467477_7983307016412442049_g2758941255649715778_261b76f3de08cf3652d33d0d9a4c3fdf.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Summer",
    occasion: "Daily Office, Casual Outings, Sports, Travel",
    description:
      "DOCI M.A.T evokes fresh sea breezes blended with zesty citrus. The hallmark scent of the free-spirited, elegant, and minimalist man.",
    notes: {
      top: "Lemon, Bergamot, Jasmine, Mandarin",
      middle: "Sea Notes, Freesia, Rosemary, Coriander",
      base: "White Musk, Cedarwood, Patchouli, Amber",
    },
  },
  {
    id: "men-dynamic-sea",
    name: "DOCI DYNAMIC SEA",
    inspiredBy: "Bvlgari AQVA",
    gender: "men",
    category: "Fresh & Crisp",
    price: 319000,
    originalPrice: 450000,
    stock: 55,
    rating: 4.7,
    reviewsCount: 98,
    image:
      "assets/images/1783734467474_7983307016412442049_g2758941255649715778_133ecf0a8dc8b438565aa6b5fd012d97.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Summer",
    occasion: "Outdoor Sports, Beach, Casual Wear",
    description:
      "A deep oceanic fragrance combining seaweed, fresh mandarin, and warm amber to ignite an active and energetic spirit.",
    notes: {
      top: "Mandarin, Orange, Petitgrain",
      middle: "Seaweed, Lavender, Cotton Flower",
      base: "Patchouli, Virginia Cedar, Amber, Sage",
    },
  },
  {
    id: "men-play-bad-prince",
    name: "DOCI PLAY PRINCE",
    inspiredBy: "JPG Ultra Male",
    gender: "men",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 25,
    rating: 4.8,
    reviewsCount: 195,
    image:
      "assets/images/1783734467469_7983307016412442049_g2758941255649715778_fc1be05a8b7bb35a0837615065994e7a.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Autumn, Winter",
    occasion: "Nightlife, Clubbing, Pubs, Romantic Dates",
    description:
      "The bold prince of night parties. Irresistibly sweet ripe pear, warm cinnamon, and rich vanilla make you the center of attention.",
    notes: {
      top: "Pear, Lavender, Mint, Bergamot",
      middle: "Cinnamon, Cumin, Sage",
      base: "Black Vanilla Husk, Amber, Patchouli, Cedar",
    },
  },
  {
    id: "men-king-rome",
    name: "DOCI KING ROME",
    inspiredBy: "Valentino Uomo Intense",
    gender: "men",
    category: "Sensual & Sweet",
    price: 319000,
    originalPrice: 450000,
    stock: 20,
    rating: 4.8,
    reviewsCount: 95,
    image:
      "assets/images/1783734467452_7983307016412442049_g2758941255649715778_ebec25022d02ea881a882c86bcda9447.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Autumn, Winter",
    occasion: "Night Out, Private Dates, Year-end Parties",
    description:
      "Rich Italian romance. DOCI King Rome exudes classical yet daring seductive charm with velvety iris, strong leather, and warm vanilla.",
    notes: {
      top: "Mandarin, Sage",
      middle: "Iris, Tonka Bean",
      base: "Leather, Vanilla",
    },
  },
  {
    id: "men-doci-13",
    name: "DOCI 13",
    inspiredBy: "Le Labo Another 13",
    gender: "men",
    category: "Luxury & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 40,
    rating: 4.8,
    reviewsCount: 165,
    image:
      "assets/images/1783734467479_7983307016412442049_g2758941255649715778_6e4a428e8de6ed252a3a40d4583cbfbd.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Creative Spaces, Work, Minimalist Dates",
    description:
      "A unique scent like pure white paper yet hypnotically alluring. Ambroxan creates a natural second-skin aura that is irresistibly magnetic.",
    notes: {
      top: "Pear, Bergamot",
      middle: "Ambrette, Jasmine",
      base: "Ambroxan, Musk, Cedarwood",
    },
  },

  // --- WOMEN'S COLLECTION ---
  {
    id: "women-slay-queen",
    name: "DOCI SLAY QUEEN",
    inspiredBy: "Good Girl",
    gender: "women",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 50,
    rating: 4.9,
    reviewsCount: 340,
    image:
      "assets/images/1783734471142_7983307016412442049_g2758941255649715778_b8d42bec3e3ae33de4fdae80d066a4a1.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Luxury Dinners, Romantic Dates, Night Out",
    description:
      "DOCI Slay Queen is a powerful statement of attraction for confident and captivating women. A contrast between bitter almond, rich coffee, and delicate tuberose.",
    notes: {
      top: "Almond, Coffee, Bergamot, Lemon",
      middle: "Tuberose, Jasmine Sambac, Orris, Orange Blossom",
      base: "Tonka Bean, Cacao, Vanilla, Praline, Amber, Sandalwood",
    },
    tag: "Best Seller",
  },
  {
    id: "women-madam-co",
    name: "DOCI MADAM CO",
    inspiredBy: "Coco Chanel",
    gender: "women",
    category: "Chic & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 65,
    rating: 4.9,
    reviewsCount: 410,
    image:
      "assets/images/1783734471165_7983307016412442049_g2758941255649715778_3ffd0583d861e7e4dcbdba4afd79c2bc.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Executive Work, Business Meetings, Fine Dining",
    description:
      "The scent defining the independent, glamorous woman with French chic elegance. Fresh citrus balanced with proud rose and sophisticated patchouli.",
    notes: {
      top: "Orange, Mandarin, Orange Blossom, Bergamot",
      middle: "Mimosa, Jasmine, Turkish Rose, Ylang-Ylang",
      base: "Patchouli, White Musk, Vanilla, Vetiver",
    },
    tag: "Best Seller",
  },
  {
    id: "women-so-cute",
    name: "DOCI SO CUTE",
    inspiredBy: "Burberry Her",
    gender: "women",
    category: "Chic & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 45,
    rating: 4.8,
    reviewsCount: 185,
    image:
      "assets/images/1783734471167_7983307016412442049_g2758941255649715778_4f3d13cb753c57c06e5fc8041bef6f41.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Summer",
    occasion: "Daily Office, School, Gentle Dates, Casual Walks",
    description:
      "A basket of sweet berries as bright as a youthful smile. DOCI So Cute transports you to a romantic London garden filled with jasmine and musk.",
    notes: {
      top: "Strawberry, Raspberry, Blackcurrant, Cherry",
      middle: "Jasmine, Violet",
      base: "Musk, Amber, Cashmeran, Vanilla",
    },
    tag: "Trending",
  },
  {
    id: "women-lady-rose",
    name: "DOCI LADY ROSE",
    inspiredBy: "Parfums de Marly Delina",
    gender: "women",
    category: "Chic & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 35,
    rating: 4.9,
    reviewsCount: 230,
    image:
      "assets/images/1783734471152_7983307016412442049_g2758941255649715778_8b07fb4151c322a6d1f29e1f071e86c6.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Autumn",
    occasion: "Afternoon Tea, Garden Parties, Special Occasions",
    description:
      "Embodying royal French classic grace. DOCI Lady Rose opens with fresh lychee and rhubarb, celebrating Turkish rose blooming in morning dew.",
    notes: {
      top: "Lychee, Rhubarb, Bergamot, Nutmeg",
      middle: "Turkish Rose, Peony, Musk",
      base: "Cashmeran, Cedar, Incense, Vetiver",
    },
    tag: "Luxury",
  },
  {
    id: "women-deep-lovely",
    name: "DOCI DEEP LOVELY",
    inspiredBy: "YSL Black Opium",
    gender: "women",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 40,
    rating: 4.9,
    reviewsCount: 360,
    image:
      "assets/images/1783734471159_7983307016412442049_g2758941255649715778_540e65f8f3ccc0feec1f31fd13bb194a.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Autumn, Winter",
    occasion: "Evening Dates, Clubs & Pubs, Cozy Dinners",
    description:
      "An intoxicating night nectar. An addictive dose of black coffee blended with warm vanilla and white florals, turning you into an absolute magnet.",
    notes: {
      top: "Pear, Orange Blossom, Pink Pepper",
      middle: "Coffee, Jasmine, Bitter Almond, Licorice",
      base: "Vanilla, Patchouli, Cedar, Cashmere Wood",
    },
    tag: "Hot",
  },
  {
    id: "women-vie-dep",
    name: "DOCI VIE BEAUTY",
    inspiredBy: "La Vie Est Belle",
    gender: "women",
    category: "Chic & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 50,
    rating: 4.8,
    reviewsCount: 290,
    image:
      "assets/images/1783734471162_7983307016412442049_g2758941255649715778_989da18f85a8cfec8241939f52142a46.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Autumn, Winter",
    occasion: "Office, Friendly Gatherings, Warm Dates",
    description:
      "A celebration of life's beauty. Overflowing sweet praline harmonized with pure iris and poetic blackcurrant.",
    notes: {
      top: "Blackcurrant, Pear",
      middle: "Iris, Jasmine, Orange Blossom",
      base: "Praline, Vanilla, Patchouli, Tonka Bean",
    },
  },
  {
    id: "women-baby-lady",
    name: "DOCI BABY LADY",
    inspiredBy: "Versace Bright Crystal",
    gender: "women",
    category: "Chic & Elegant",
    price: 319000,
    originalPrice: 450000,
    stock: 30,
    rating: 4.7,
    reviewsCount: 154,
    image:
      "assets/images/1783734471156_7983307016412442049_g2758941255649715778_0c146dbdb1db136820efc2c5acd0f26a.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Summer",
    occasion: "School, Office, Summer Walks",
    description:
      "Pure, refreshing, and immensely crystal clear. DOCI Baby Lady glimmers like sparkling crystals reflecting juicy pomegranate and shy peonies in dawn dew.",
    notes: {
      top: "Yuzu, Pomegranate, Water Notes",
      middle: "Peony, Lotus, Magnolia",
      base: "Musk, Amber, Mahogany",
    },
  },
  {
    id: "women-luxury-kiss",
    name: "DOCI LUXURY KISS",
    inspiredBy: "So Scandal",
    gender: "women",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 25,
    rating: 4.8,
    reviewsCount: 168,
    image:
      "assets/images/1783734471170_7983307016412442049_g2758941255649715778_69a3c7d203ee02ae693fc5050ae4f6f4.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Night Out, Glamorous Dates, Evening Parties",
    description:
      "A scandalously sweet and daring essence. Provocative ripe raspberry dipped in creamy milk and sensual blooming tuberose.",
    notes: {
      top: "Raspberry, Blood Orange",
      middle: "Tuberose, Jasmine Sambac, Milk",
      base: "Sandalwood, Honey",
    },
  },
  {
    id: "women-dream-night",
    name: "DOCI DREAMY NIGHT",
    inspiredBy: "Scandal By Night",
    gender: "women",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 30,
    rating: 4.8,
    reviewsCount: 125,
    image:
      "assets/images/1783734471136_7983307016412442049_g2758941255649715778_95ab66f7c5510c7b87bc6d179a12c3ef.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Autumn, Winter",
    occasion: "Romantic Dates, Night Events, Clubbing",
    description:
      "Rich honeyed sweetness entwined with luscious Tonka bean and bewitching warm cedarwood.",
    notes: {
      top: "Honey, Citrus",
      middle: "Tuberose, Cherry, Prickly Pear",
      base: "Tonka Bean, Sandalwood, Patchouli, Vanilla",
    },
  },
  {
    id: "women-sexy-babe",
    name: "DOCI SEXY BABE",
    inspiredBy: "Azzaro Wanted Girl",
    gender: "women",
    category: "Seductive & Warm",
    price: 319000,
    originalPrice: 450000,
    stock: 40,
    rating: 4.8,
    reviewsCount: 88,
    image:
      "assets/images/1783734471148_7983307016412442049_g2758941255649715778_1798b8c46f176e31bc4dc955da2fad50.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "Spring, Autumn, Winter",
    occasion: "Party, Evening Stroll, Dating",
    description:
      "For the bold and glamorous girl. DOCI Sexy Babe entices with tangy pomegranate, creamy caramel, and vibrant ginger flower.",
    notes: {
      top: "Ginger Flower, Pomegranate, Pink Pepper, Orange Blossom",
      middle: "Caramel (Dulce de leche), Datura",
      base: "Haitian Vetiver, Patchouli, Tonka Bean",
    },
  },
  {
    id: "tester-box",
    name: "ULTRA SLIDE TESTER BOX",
    inspiredBy: "10 Best-Selling Scents",
    gender: "unisex",
    category: "Discovery Set",
    price: 149000,
    originalPrice: 250000,
    stock: 100,
    rating: 4.9,
    reviewsCount: 520,
    image: "assets/images/z7848112674236_edbc0b7d8f24edf2d4038c60a55297e1.jpg",
    longevity: "6 - 8 Hours",
    projection: "1 - 2 Meters",
    season: "All Seasons",
    occasion: "Gift Set, Daily Scent Testing",
    description:
      "Premium Ultra Slide discovery tray containing 10 mini sprays (2ml) of DOCI Perfume's most popular fragrances for Men & Women.",
    notes: {
      top: "10 x 2ml Spray Vials",
      middle: "Floral, Woody, Oceanic Notes",
      base: "100% French Imported Essence",
    },
  },
];

// Helper functions to manage products across Admin and Storefront
window.getAppProducts = function() {
  try {
    const stored = localStorage.getItem("doci_perfume_products");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading stored products:", e);
  }
  return perfumeData;
};

window.saveAppProducts = function(products) {
  try {
    localStorage.setItem("doci_perfume_products", JSON.stringify(products));
    window.perfumeData = products;
  } catch (e) {
    console.error("Error saving products to storage:", e);
  }
};

// Auto-initialize if not yet stored
if (!localStorage.getItem("doci_perfume_products")) {
  window.saveAppProducts(perfumeData);
} else {
  window.perfumeData = window.getAppProducts();
}
