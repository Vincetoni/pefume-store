export const products = [
  {
    id: 1,
    name: "Floral Essence",
    price: 500,
    oldPrice: 560,
    discount: "11% OFF",
    freeShipping: true,
    theme: "flower",
    category: "Floral",
    shortDescription: "Jasmine, rose, and white musk in a soft, elegant bloom.",
    longDescription:
      "Floral Essence is a couture bouquet rendered in liquid silk. It opens with dew-kissed jasmine, settles into a regal heart of rose absolute, and dries down to a veil of white musk that feels clean, intimate, and unmistakably refined. The trail is graceful and luminous, designed for those who prefer elegance that whispers rather than announces.",
    modelPath: "models/floral-essence.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(216, 168, 187, 0.35), transparent 60%), linear-gradient(135deg, #f6efe3, #f1e2e8)",
    colors: { accent: "#d6a0b2", bg: "#f6efe3", text: "#1c1412" },
    rating: 4.6,
    reviews: [
      { name: "Amelia", comment: "So soft and polished. It wears like silk.", rating: 5 },
      { name: "Nina", comment: "Elegant and romantic without feeling heavy.", rating: 4.5 },
      { name: "Leila", comment: "A beautiful daily signature with a luxe dry-down.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Amber Veil",
    price: 540,
    oldPrice: 610,
    discount: "11% OFF",
    freeShipping: true,
    theme: "romantic",
    category: "Warm",
    shortDescription: "Amber resin and warm vanilla with saffron glow.",
    longDescription:
      "Amber Veil wraps the skin in golden warmth. Saffron threads shimmer through amber resin and polished vanilla, creating a rich, candlelit aura. Its heart is plush and velvety, with a finish that lingers like a cashmere shawl at dusk.",
    modelPath: "models/amber-veil.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(214, 166, 89, 0.35), transparent 60%), linear-gradient(135deg, #f4eadb, #ead6b5)",
    colors: { accent: "#c18b45", bg: "#f4eadb", text: "#1b120d" },
    rating: 4.7,
    reviews: [
      { name: "Julian", comment: "Warm, inviting, and very sophisticated.", rating: 4.8 },
      { name: "Maya", comment: "A gorgeous evening scent with soft spice.", rating: 4.6 }
    ],
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Velvet Smoke",
    price: 620,
    oldPrice: 700,
    discount: "11% OFF",
    freeShipping: false,
    theme: "mystic",
    category: "Woody",
    shortDescription: "Smoked cedar, iris, and dark musk, refined and bold.",
    longDescription:
      "Velvet Smoke is a tailored blend of shadow and light. Smoked cedar and polished iris meet a deep, sensual musk that feels architectural and modern. It carries a quiet intensity, leaving a sophisticated trail that feels deliberate and unforgettable.",
    modelPath: "models/velvet-smoke.glb",
    backgroundEffect:
      "radial-gradient(circle at 30% 15%, rgba(70, 54, 49, 0.35), transparent 60%), linear-gradient(135deg, #f0e7de, #e3d1c3)",
    colors: { accent: "#6b4b3a", bg: "#f0e7de", text: "#171110" },
    rating: 4.5,
    reviews: [
      { name: "Darius", comment: "Smoky but refined. Feels very high end.", rating: 4.6 },
      { name: "Sage", comment: "Iris and cedar are perfectly balanced.", rating: 4.4 }
    ],
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Citrine Bloom",
    price: 470,
    oldPrice: 520,
    discount: "10% OFF",
    freeShipping: true,
    theme: "sunlit",
    category: "Citrus",
    shortDescription: "Bright citrus and neroli with a creamy floral heart.",
    longDescription:
      "Citrine Bloom opens with a burst of luminous citrus that melts into neroli and a soft floral heart. The finish is creamy and smooth, like sunlight on polished stone. It is radiant, effortless, and impeccably composed.",
    modelPath: "models/citrine-bloom.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(236, 184, 92, 0.35), transparent 60%), linear-gradient(135deg, #f8f1e4, #f1debb)",
    colors: { accent: "#e2b25f", bg: "#f8f1e4", text: "#1b140f" },
    rating: 4.4,
    reviews: [
      { name: "Clara", comment: "Fresh and elegant with a soft dry-down.", rating: 4.4 },
      { name: "Noah", comment: "The neroli is clean and very refined.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Midnight Azure",
    price: 590,
    oldPrice: 650,
    discount: "9% OFF",
    freeShipping: true,
    theme: "ocean",
    category: "Fresh",
    shortDescription: "Sea salt, mineral notes, and white orchid glow.",
    longDescription:
      "Midnight Azure captures the hush of a moonlit coast. Bracing sea salt and mineral notes rise first, then soften into a bouquet of white orchid and clean musk. The result is fresh, modern, and quietly magnetic.",
    modelPath: "models/midnight-azure.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(120, 170, 200, 0.35), transparent 60%), linear-gradient(135deg, #edf2f5, #dfe8ee)",
    colors: { accent: "#6e9bb6", bg: "#edf2f5", text: "#11161a" },
    rating: 4.6,
    reviews: [
      { name: "Rina", comment: "Clean, crisp, and long lasting.", rating: 4.7 },
      { name: "Omar", comment: "Feels like coastal air in a luxe bottle.", rating: 4.5 }
    ],
    image:
      "https://images.unsplash.com/photo-1595425959632-34f2822322ce?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Golden Hour",
    price: 485,
    oldPrice: 530,
    discount: "8% OFF",
    freeShipping: false,
    theme: "sunlit",
    category: "Citrus",
    shortDescription: "Bergamot and honeyed apricot in soft light.",
    longDescription:
      "Golden Hour is the last warm light of day, captured in fragrance. Sparkling bergamot and honeyed apricot glow over a smooth, creamy base. It is luminous and effortless, like a perfect silk dress at sunset.",
    modelPath: "models/golden-hour.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(231, 179, 92, 0.35), transparent 60%), linear-gradient(135deg, #f7efe4, #f1ddc3)",
    colors: { accent: "#d9a451", bg: "#f7efe4", text: "#1a140e" },
    rating: 4.3,
    reviews: [
      { name: "Elena", comment: "Warm and golden without being sweet.", rating: 4.2 },
      { name: "Theo", comment: "Beautiful summer scent, very chic.", rating: 4.4 }
    ],
    image:
      "https://images.unsplash.com/photo-1557170334-a7c3cd167c74?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Terra Antiqua",
    price: 610,
    oldPrice: 690,
    discount: "12% OFF",
    freeShipping: true,
    theme: "earth",
    category: "Woody",
    shortDescription: "Patchouli, vetiver, and antique sandalwood.",
    longDescription:
      "Terra Antiqua is grounded luxury. Earthy patchouli and vetiver meet the smooth depth of aged sandalwood, creating a textured, sculpted scent. It wears like fine leather and quiet confidence.",
    modelPath: "models/terra-antiqua.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(120, 96, 70, 0.35), transparent 60%), linear-gradient(135deg, #f1e8db, #e1d2bf)",
    colors: { accent: "#8f6a45", bg: "#f1e8db", text: "#17110b" },
    rating: 4.5,
    reviews: [
      { name: "Marco", comment: "Deep and elegant. Perfect for evenings.", rating: 4.6 },
      { name: "Ivy", comment: "Smooth woods with a modern edge.", rating: 4.4 }
    ],
    image:
      "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Silk Petal",
    price: 525,
    oldPrice: 580,
    discount: "9% OFF",
    freeShipping: true,
    theme: "flower",
    category: "Floral",
    shortDescription: "Peony and white tea in a powder-soft veil.",
    longDescription:
      "Silk Petal is a soft-focus floral with refined poise. Sheer peony and white tea create a powdery, clean signature that feels serene and modern. The finish is delicate yet persistent, like a whisper of silk.",
    modelPath: "models/silk-petal.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(222, 186, 202, 0.35), transparent 60%), linear-gradient(135deg, #f7efe7, #eddbe4)",
    colors: { accent: "#c8a1b3", bg: "#f7efe7", text: "#1a1414" },
    rating: 4.4,
    reviews: [
      { name: "Yara", comment: "Soft and airy. I love the tea note.", rating: 4.4 },
      { name: "Jules", comment: "Feels expensive and clean.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Oud Noir",
    price: 750,
    oldPrice: 820,
    discount: "9% OFF",
    freeShipping: true,
    theme: "mystic",
    category: "Woody",
    shortDescription: "Rare agarwood with leather and cardamom.",
    longDescription:
      "Oud Noir is a statement of rare materials and precise craft. Precious agarwood is framed by dark leather and cardamom, creating a sensuous, enveloping aura. It is bold, elegant, and unmistakably luxurious.",
    modelPath: "models/oud-noir.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(90, 63, 48, 0.35), transparent 60%), linear-gradient(135deg, #efe3d8, #dac6b6)",
    colors: { accent: "#7a4f3a", bg: "#efe3d8", text: "#140e0c" },
    rating: 4.8,
    reviews: [
      { name: "Hana", comment: "The oud is deep and beautifully polished.", rating: 4.9 },
      { name: "Reed", comment: "Powerful but smooth. Pure luxury.", rating: 4.7 }
    ],
    image:
      "https://images.unsplash.com/photo-1588405748347-463ac395610e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 10,
    name: "Silver Mist",
    price: 420,
    oldPrice: 480,
    discount: "12% OFF",
    freeShipping: false,
    theme: "ocean",
    category: "Fresh",
    shortDescription: "Frosted juniper and white sage, cool and clean.",
    longDescription:
      "Silver Mist is crisp and minimalist with a cool, mineral clarity. Frosted juniper berries and white sage unfold into a clean musky base. It feels like cold air and polished metal, refined and modern.",
    modelPath: "models/silver-mist.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(170, 188, 202, 0.35), transparent 60%), linear-gradient(135deg, #eef2f6, #dfe6ee)",
    colors: { accent: "#8fa8ba", bg: "#eef2f6", text: "#10161b" },
    rating: 4.2,
    reviews: [
      { name: "Kiara", comment: "Very clean and fresh, perfect for daytime.", rating: 4.1 },
      { name: "Anton", comment: "Understated and smooth.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1615037563043-022e43859bc3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "Royal Nectar",
    price: 680,
    oldPrice: 740,
    discount: "8% OFF",
    freeShipping: true,
    theme: "romantic",
    category: "Warm",
    shortDescription: "Wild honey, tonka bean, and roasted almond.",
    longDescription:
      "Royal Nectar is a gourmand that feels regal, never sweet. Wild honey and tonka bean unfold into a warm, golden base with a soft almond finish. It is indulgent, smooth, and luxuriously composed.",
    modelPath: "models/royal-nectar.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(214, 168, 85, 0.35), transparent 60%), linear-gradient(135deg, #f6eee1, #ead7bf)",
    colors: { accent: "#c79a4d", bg: "#f6eee1", text: "#1a120c" },
    rating: 4.7,
    reviews: [
      { name: "Bea", comment: "Gourmand but elegant. So well blended.", rating: 4.7 },
      { name: "Grant", comment: "Warm and luxe with a beautiful dry-down.", rating: 4.6 }
    ],
    image:
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "Desert Rose",
    price: 530,
    oldPrice: 590,
    discount: "10% OFF",
    freeShipping: false,
    theme: "romantic",
    category: "Floral",
    shortDescription: "Damask rose with dry spice and warm sands.",
    longDescription:
      "Desert Rose is a modern rose wrapped in warm air and spice. Damask petals bloom over a base of ambered sands and soft woods. It is romantic yet grounded, a rose that feels timeless and confident.",
    modelPath: "models/desert-rose.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(197, 120, 120, 0.35), transparent 60%), linear-gradient(135deg, #f4e7e1, #e8d0c9)",
    colors: { accent: "#c57a78", bg: "#f4e7e1", text: "#1a1211" },
    rating: 4.5,
    reviews: [
      { name: "Lena", comment: "Rose done right. Warm and elegant.", rating: 4.6 },
      { name: "Sol", comment: "Beautiful balance of spice and floral.", rating: 4.4 }
    ],
    image:
      "https://images.unsplash.com/photo-1616948055677-18451f28b261?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 13,
    name: "Ivory Coast",
    price: 460,
    oldPrice: 510,
    discount: "10% OFF",
    freeShipping: true,
    theme: "ocean",
    category: "Fresh",
    shortDescription: "Clean linen, coastal breeze, and green apple.",
    longDescription:
      "Ivory Coast is pure, airy sophistication. A breeze of clean linen and green apple drifts over a soft musky base. It is bright, minimalist, and refreshingly luxe.",
    modelPath: "models/ivory-coast.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(172, 210, 201, 0.35), transparent 60%), linear-gradient(135deg, #eef5f2, #dbe9e5)",
    colors: { accent: "#7fb7a8", bg: "#eef5f2", text: "#101613" },
    rating: 4.3,
    reviews: [
      { name: "Zoe", comment: "Very clean and bright. Easy to wear.", rating: 4.3 },
      { name: "Evan", comment: "Fresh linen vibe with a luxe edge.", rating: 4.2 }
    ],
    image:
      "https://images.unsplash.com/photo-1512203530485-25a2ae20993a?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 14,
    name: "Saffron Sky",
    price: 510,
    oldPrice: 570,
    discount: "11% OFF",
    freeShipping: false,
    theme: "sunlit",
    category: "Warm",
    shortDescription: "Saffron and toasted sweetness over dry cedar.",
    longDescription:
      "Saffron Sky balances spice and softness with refined ease. A delicate saffron glow folds into a toasted, creamy base and a dry cedar finish. It is warm, poised, and quietly indulgent.",
    modelPath: "models/saffron-sky.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(205, 154, 92, 0.35), transparent 60%), linear-gradient(135deg, #f6eee2, #ead5be)",
    colors: { accent: "#c5924b", bg: "#f6eee2", text: "#19120d" },
    rating: 4.4,
    reviews: [
      { name: "Aria", comment: "Smooth saffron with a creamy finish.", rating: 4.4 },
      { name: "Miles", comment: "Warm and elegant, perfect for evenings.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1592914610354-fd354ea45e48?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 15,
    name: "Botanical Zen",
    price: 440,
    oldPrice: 490,
    discount: "10% OFF",
    freeShipping: true,
    theme: "earth",
    category: "Fresh",
    shortDescription: "Bamboo leaves and matcha tea, calm and green.",
    longDescription:
      "Botanical Zen is a refined green fragrance with a meditative calm. Crushed bamboo leaves and matcha tea create a serene opening, softened by clean woods and a gentle musk. It is tranquil, polished, and modern.",
    modelPath: "models/botanical-zen.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(152, 182, 142, 0.35), transparent 60%), linear-gradient(135deg, #eef3e8, #dbe6d2)",
    colors: { accent: "#7ea07a", bg: "#eef3e8", text: "#0f140f" },
    rating: 4.2,
    reviews: [
      { name: "Sienna", comment: "Very calming and clean.", rating: 4.2 },
      { name: "Nico", comment: "Green and fresh without being sharp.", rating: 4.1 }
    ],
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 16,
    name: "Crimson Muse",
    price: 580,
    oldPrice: 640,
    discount: "9% OFF",
    freeShipping: false,
    theme: "romantic",
    category: "Warm",
    shortDescription: "Black cherry, red wine, and aged oak.",
    longDescription:
      "Crimson Muse is rich, smooth, and alluring. Dark cherry and red wine notes glide over aged oak and a soft resin base. It is velvety and seductive, crafted for nights that linger.",
    modelPath: "models/crimson-muse.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(146, 76, 82, 0.35), transparent 60%), linear-gradient(135deg, #f1e3e4, #e4c7c9)",
    colors: { accent: "#a05b60", bg: "#f1e3e4", text: "#191112" },
    rating: 4.6,
    reviews: [
      { name: "Elsa", comment: "Sensual and plush. I adore this.", rating: 4.7 },
      { name: "Zane", comment: "Cherry and oak are blended perfectly.", rating: 4.5 }
    ],
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 17,
    name: "Lush Fig",
    price: 495,
    oldPrice: 560,
    discount: "12% OFF",
    freeShipping: true,
    theme: "earth",
    category: "Fresh",
    shortDescription: "Mediterranean figs and warm earth.",
    longDescription:
      "Lush Fig is creamy and sun-warmed with a refined green edge. Ripe fig and milky sap soften into a gentle, earthy base. The mood is relaxed, elegant, and quietly sensual.",
    modelPath: "models/lush-fig.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(160, 170, 115, 0.35), transparent 60%), linear-gradient(135deg, #f2f0e1, #e2e0c9)",
    colors: { accent: "#97a064", bg: "#f2f0e1", text: "#14140f" },
    rating: 4.3,
    reviews: [
      { name: "Priya", comment: "Creamy fig with a clean finish.", rating: 4.3 },
      { name: "Jon", comment: "Warm and elegant, very wearable.", rating: 4.2 }
    ],
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888bb4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 18,
    name: "Tobacco Gold",
    price: 710,
    oldPrice: 790,
    discount: "10% OFF",
    freeShipping: true,
    theme: "mystic",
    category: "Woody",
    shortDescription: "Sweet tobacco leaf and vanilla bean.",
    longDescription:
      "Tobacco Gold is smooth, dark, and lavish. Sweet tobacco leaf is polished with vanilla bean and a whisper of fine whiskey. It is a rich, elegant statement that feels tailored and timeless.",
    modelPath: "models/tobacco-gold.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(112, 80, 56, 0.35), transparent 60%), linear-gradient(135deg, #efe3d7, #d8c1ae)",
    colors: { accent: "#8a5c3d", bg: "#efe3d7", text: "#140e0c" },
    rating: 4.7,
    reviews: [
      { name: "Rafael", comment: "Deep and smooth with perfect warmth.", rating: 4.8 },
      { name: "Mina", comment: "Luxurious and long lasting.", rating: 4.6 }
    ],
    image:
      "https://images.unsplash.com/photo-1541108564883-fa813d39578f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 19,
    name: "Violet Ray",
    price: 475,
    oldPrice: 520,
    discount: "9% OFF",
    freeShipping: false,
    theme: "flower",
    category: "Floral",
    shortDescription: "Violet petals and white suede, soft and modern.",
    longDescription:
      "Violet Ray is an ethereal floral with a modern suede finish. Powdery violet petals are balanced by a smooth, skin-like base that feels intimate and refined. It is delicate, chic, and quietly radiant.",
    modelPath: "models/violet-ray.glb",
    backgroundEffect:
      "radial-gradient(circle at 20% 20%, rgba(170, 140, 190, 0.35), transparent 60%), linear-gradient(135deg, #f2edf6, #e0d6ee)",
    colors: { accent: "#9a7bb3", bg: "#f2edf6", text: "#17121a" },
    rating: 4.4,
    reviews: [
      { name: "Isla", comment: "Soft violet with a luxe suede note.", rating: 4.4 },
      { name: "Kei", comment: "Elegant and easy to wear.", rating: 4.3 }
    ],
    image:
      "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 20,
    name: "Oceanic Drift",
    price: 550,
    oldPrice: 620,
    discount: "11% OFF",
    freeShipping: true,
    theme: "ocean",
    category: "Fresh",
    shortDescription: "Cold surf, driftwood, and aquatic musk.",
    longDescription:
      "Oceanic Drift is bold marine energy with a refined edge. Cold surf and driftwood unfold into a clean aquatic musk that feels modern and effortless. The trail is crisp, airy, and unmistakably luxurious.",
    modelPath: "models/oceanic-drift.glb",
    backgroundEffect:
      "radial-gradient(circle at 70% 20%, rgba(120, 170, 190, 0.35), transparent 60%), linear-gradient(135deg, #eaf1f4, #d7e2ea)",
    colors: { accent: "#6e9aa9", bg: "#eaf1f4", text: "#11171b" },
    rating: 4.5,
    reviews: [
      { name: "Rory", comment: "Fresh and luxurious, perfect for daily wear.", rating: 4.5 },
      { name: "Mara", comment: "Crisp marine vibe without being sharp.", rating: 4.4 }
    ],
    image:
      "https://images.unsplash.com/photo-1590735204551-5a507a216262?q=80&w=1200&auto=format&fit=crop"
  }
];
