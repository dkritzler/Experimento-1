'use client'

import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { useState, useRef } from 'react'
import { Heart, X, Star, Clock, Users, ChefHat, Leaf, Zap } from 'lucide-react'
import { OrganicContainer } from '@/components/ui/OrganicContainer'
import { OrganicButton } from '@/components/ui/OrganicButton'


interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: number
  servings: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  benefits: string[]
  ingredients: string[]
  gutHealthScore: number
  tags: string[]
  relevanceScore: number
}

interface Probiotic {
  id: string
  name: string
  strain: string
  benefits: string[]
  dosage: string
  timing: string
  price: number
  rating: number
  relevanceScore: number
}

const mockRecipes: Recipe[] = [
  {
    id: 'recipe-1',
    title: 'Fermented Kimchi Bowl',
    description: 'Probiotic-rich Korean fermented vegetables with quinoa and avocado',
    image: '',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    benefits: ['Improves gut microbiome', 'Reduces inflammation', 'Boosts immunity'],
    ingredients: ['Kimchi', 'Quinoa', 'Avocado', 'Sesame oil', 'Scallions'],
    gutHealthScore: 95,
    tags: ['Fermented', 'Anti-inflammatory', 'Quick'],
    relevanceScore: 92
  },
  {
    id: 'recipe-2',
    title: 'Bone Broth Healing Soup',
    description: 'Collagen-rich bone broth with gut-healing herbs and vegetables',
    image: '',
    cookTime: 45,
    servings: 4,
    difficulty: 'Medium',
    benefits: ['Heals gut lining', 'Reduces leaky gut', 'Provides collagen'],
    ingredients: ['Bone broth', 'Ginger', 'Turmeric', 'Carrots', 'Celery'],
    gutHealthScore: 88,
    tags: ['Healing', 'Anti-inflammatory', 'Comfort'],
    relevanceScore: 89
  },
  {
    id: 'recipe-3',
    title: 'Prebiotic Smoothie Bowl',
    description: 'Fiber-rich smoothie bowl with banana, berries, and gut-friendly toppings',
    image: '',
    cookTime: 10,
    servings: 1,
    difficulty: 'Easy',
    benefits: ['Feeds good bacteria', 'High in fiber', 'Antioxidant-rich'],
    ingredients: ['Banana', 'Blueberries', 'Chia seeds', 'Flaxseed', 'Coconut'],
    gutHealthScore: 91,
    tags: ['Prebiotic', 'Breakfast', 'Antioxidants'],
    relevanceScore: 85
  },
  {
    id: 'recipe-4',
    title: 'Probiotic Miso Glazed Salmon',
    description: 'Omega-3 rich salmon with fermented miso glaze and steamed vegetables',
    image: '',
    cookTime: 25,
    servings: 2,
    difficulty: 'Medium',
    benefits: ['Anti-inflammatory', 'Supports brain health', 'Probiotic boost'],
    ingredients: ['Salmon fillet', 'Miso paste', 'Honey', 'Broccoli', 'Brown rice'],
    gutHealthScore: 87,
    tags: ['Omega-3', 'Fermented', 'Protein'],
    relevanceScore: 90
  },
  {
    id: 'recipe-5',
    title: 'Gut-Healing Golden Latte',
    description: 'Anti-inflammatory turmeric latte with coconut milk and healing spices',
    image: '',
    cookTime: 8,
    servings: 1,
    difficulty: 'Easy',
    benefits: ['Reduces inflammation', 'Digestive support', 'Antioxidant rich'],
    ingredients: ['Turmeric', 'Coconut milk', 'Ginger', 'Black pepper', 'Honey'],
    gutHealthScore: 84,
    tags: ['Anti-inflammatory', 'Drink', 'Healing'],
    relevanceScore: 82
  },
  {
    id: 'recipe-6',
    title: 'Fermented Vegetable Stir-fry',
    description: 'Quick stir-fry with sauerkraut, fresh vegetables, and probiotic benefits',
    image: '',
    cookTime: 12,
    servings: 3,
    difficulty: 'Easy',
    benefits: ['Probiotic rich', 'Quick cooking', 'Vegetable fiber'],
    ingredients: ['Sauerkraut', 'Bell peppers', 'Onions', 'Garlic', 'Sesame oil'],
    gutHealthScore: 89,
    tags: ['Fermented', 'Quick', 'Vegetables'],
    relevanceScore: 88
  },
  {
    id: 'recipe-7',
    title: 'Chia Seed Pudding Parfait',
    description: 'Overnight chia pudding with layers of yogurt and fresh berries',
    image: '',
    cookTime: 5,
    servings: 2,
    difficulty: 'Easy',
    benefits: ['High fiber', 'Probiotic yogurt', 'Sustained energy'],
    ingredients: ['Chia seeds', 'Greek yogurt', 'Almond milk', 'Mixed berries', 'Vanilla'],
    gutHealthScore: 93,
    tags: ['Make-ahead', 'Fiber', 'Probiotics'],
    relevanceScore: 91
  },
  {
    id: 'recipe-8',
    title: 'Prebiotic Roasted Vegetables',
    description: 'Colorful roasted vegetables rich in prebiotic fiber and nutrients',
    image: '',
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    benefits: ['Prebiotic fiber', 'Nutrient dense', 'Easy preparation'],
    ingredients: ['Sweet potato', 'Brussels sprouts', 'Carrots', 'Red onion', 'Olive oil'],
    gutHealthScore: 86,
    tags: ['Prebiotic', 'Roasted', 'Fiber'],
    relevanceScore: 84
  },
  {
    id: 'recipe-9',
    title: 'Kombucha Berry Smoothie',
    description: 'Refreshing probiotic smoothie with kombucha, berries, and spinach',
    image: '',
    cookTime: 5,
    servings: 1,
    difficulty: 'Easy',
    benefits: ['Live probiotics', 'Antioxidant boost', 'Digestive support'],
    ingredients: ['Kombucha', 'Mixed berries', 'Spinach', 'Banana', 'Greek yogurt'],
    gutHealthScore: 92,
    tags: ['Probiotic', 'Smoothie', 'Antioxidants'],
    relevanceScore: 89
  },
  {
    id: 'recipe-10',
    title: 'Gut-Soothing Ginger Carrot Soup',
    description: 'Warming soup with anti-inflammatory ginger and fiber-rich carrots',
    image: '',
    cookTime: 30,
    servings: 4,
    difficulty: 'Easy',
    benefits: ['Anti-inflammatory', 'Digestive aid', 'Immune support'],
    ingredients: ['Carrots', 'Fresh ginger', 'Vegetable broth', 'Coconut milk', 'Turmeric'],
    gutHealthScore: 88,
    tags: ['Anti-inflammatory', 'Soup', 'Warming'],
    relevanceScore: 87
  },
  {
    id: 'recipe-11',
    title: 'Probiotic Greek Yogurt Bark',
    description: 'Frozen yogurt bark with nuts, seeds, and berries for gut health',
    image: '',
    cookTime: 10,
    servings: 6,
    difficulty: 'Easy',
    benefits: ['Live cultures', 'Healthy fats', 'Prebiotic fiber'],
    ingredients: ['Greek yogurt', 'Mixed nuts', 'Pumpkin seeds', 'Berries', 'Honey'],
    gutHealthScore: 90,
    tags: ['Probiotic', 'Snack', 'Make-ahead'],
    relevanceScore: 86
  },
  {
    id: 'recipe-12',
    title: 'Fermented Beet Hummus',
    description: 'Vibrant beetroot hummus with fermented elements and tahini',
    image: '',
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    benefits: ['Digestive enzymes', 'Antioxidants', 'Healthy fats'],
    ingredients: ['Cooked beets', 'Chickpeas', 'Tahini', 'Lemon juice', 'Fermented garlic'],
    gutHealthScore: 85,
    tags: ['Fermented', 'Dip', 'Colorful'],
    relevanceScore: 83
  },
  {
    id: 'recipe-13',
    title: 'Healing Cabbage Roll Soup',
    description: 'Nutrient-dense soup with cabbage, herbs, and gut-healing ingredients',
    image: '',
    cookTime: 40,
    servings: 6,
    difficulty: 'Medium',
    benefits: ['Gut lining repair', 'Anti-inflammatory', 'Detoxifying'],
    ingredients: ['Cabbage', 'Ground turkey', 'Brown rice', 'Dill', 'Bone broth'],
    gutHealthScore: 89,
    tags: ['Healing', 'Comfort', 'Protein'],
    relevanceScore: 88
  }
]

const mockProbiotics: Probiotic[] = [
  {
    id: 'prob-1',
    name: 'Ultimate Gut Restore',
    strain: 'Lactobacillus acidophilus + 9 strains',
    benefits: ['Digestive balance', 'Immune support', 'Reduces bloating'],
    dosage: '2 capsules daily',
    timing: 'With meals',
    price: 49.99,
    rating: 4.8,
    relevanceScore: 94
  },
  {
    id: 'prob-2',
    name: 'Microbiome Reset',
    strain: 'Bifidobacterium longum + 5 strains',
    benefits: ['Gut barrier function', 'Mood support', 'Anti-inflammatory'],
    dosage: '1 capsule daily',
    timing: 'Before bed',
    price: 39.99,
    rating: 4.6,
    relevanceScore: 87
  },
  {
    id: 'prob-3',
    name: 'Daily Digestive Balance',
    strain: 'Lactobacillus rhamnosus + 7 strains',
    benefits: ['IBS relief', 'Regularity support', 'Stress response'],
    dosage: '1 capsule daily',
    timing: 'Morning with breakfast',
    price: 34.99,
    rating: 4.7,
    relevanceScore: 92
  },
  {
    id: 'prob-4',
    name: 'Women\'s Probiotic Complex',
    strain: 'Lactobacillus crispatus + 6 strains',
    benefits: ['Urinary health', 'Yeast balance', 'Digestive comfort'],
    dosage: '2 capsules daily',
    timing: 'Morning and evening',
    price: 42.99,
    rating: 4.5,
    relevanceScore: 89
  },
  {
    id: 'prob-5',
    name: 'Travel Probiotic Shield',
    strain: 'Saccharomyces boulardii + 4 strains',
    benefits: ['Travel protection', 'Diarrhea prevention', 'Immune defense'],
    dosage: '1-2 capsules daily',
    timing: 'Before travel/meals',
    price: 28.99,
    rating: 4.4,
    relevanceScore: 85
  },
  {
    id: 'prob-6',
    name: 'Senior Gut Health Formula',
    strain: 'Bifidobacterium bifidum + 8 strains',
    benefits: ['Age-related support', 'Nutrient absorption', 'Cognitive health'],
    dosage: '2 capsules daily',
    timing: 'With dinner',
    price: 55.99,
    rating: 4.6,
    relevanceScore: 88
  },
  {
    id: 'prob-7',
    name: 'Kids Probiotic Gummies',
    strain: 'Lactobacillus casei + 3 child-safe strains',
    benefits: ['Child immune support', 'Digestive comfort', 'Mood balance'],
    dosage: '2 gummies daily',
    timing: 'After breakfast',
    price: 24.99,
    rating: 4.9,
    relevanceScore: 91
  },
  {
    id: 'prob-8',
    name: 'High-Potency Repair Formula',
    strain: 'Lactobacillus plantarum + 12 strains',
    benefits: ['Post-antibiotic recovery', 'Leaky gut repair', 'Inflammation control'],
    dosage: '3 capsules daily',
    timing: '30 min before meals',
    price: 69.99,
    rating: 4.7,
    relevanceScore: 96
  }
]

function RecipeCard({ recipe, onSwipe }: { recipe: Recipe; onSwipe: (direction: 'left' | 'right') => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#00FF88'
    if (score >= 75) return '#FF8C42'
    return '#FF6B35'
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute w-[350px] h-[450px] cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      dragElastic={0.2}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        rotate: isDragging ? (Math.random() - 0.5) * 10 : 0,
        scale: isDragging ? 1.05 : 1
      }}
      exit={{
        x: 500,
        rotate: 30,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
    >
      <OrganicContainer 
        variant="organic" 
        glow 
        className="w-full h-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border-white/20"
      >
        <div className="relative h-full flex flex-col">
          {/* Header with icon and score */}
          <div className="flex items-center justify-between p-4">
            <ChefHat size={32} className="text-bio-green-400" />
            <div 
              className="px-3 py-1 rounded-full text-sm font-bold"
              style={{ backgroundColor: `${getScoreColor(recipe.gutHealthScore)}20`, color: getScoreColor(recipe.gutHealthScore) }}
            >
              {recipe.gutHealthScore}% Match
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 space-y-4">
            <div>
              <h3 className="text-xl font-clash font-bold text-white mb-2">
                {recipe.title}
              </h3>
              <p className="text-white/70 text-sm">
                {recipe.description}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/5 rounded-lg p-2">
                <Clock size={16} className="text-bio-green-400 mx-auto mb-1" />
                <div className="text-xs text-white">{recipe.cookTime}m</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <Users size={16} className="text-bio-green-400 mx-auto mb-1" />
                <div className="text-xs text-white">{recipe.servings}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <ChefHat size={16} className="text-bio-green-400 mx-auto mb-1" />
                <div className="text-xs text-white">{recipe.difficulty}</div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <div className="text-sm font-semibold text-white mb-2">Benefits:</div>
              <div className="space-y-1">
                {recipe.benefits.slice(0, 2).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-white/80">
                    <Leaf size={12} className="text-bio-green-400" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </OrganicContainer>
    </motion.div>
  )
}

function ProbioticBubble({ probiotic, index }: { probiotic: Probiotic; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Better spacing for bubbles - more separated
  const positions = [
    { left: '10%', top: '15%' },
    { left: '35%', top: '5%' },
    { left: '60%', top: '12%' },
    { left: '85%', top: '20%' },
    { left: '5%', top: '55%' },
    { left: '30%', top: '50%' },
    { left: '55%', top: '60%' },
    { left: '80%', top: '52%' },
  ]
  
  const position = positions[index % positions.length]

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={position}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Bubble - Larger and more separated */}
        <motion.div
          className="w-28 h-28 rounded-full bg-gradient-to-br from-probiotic-400 to-bio-green-400 flex items-center justify-center shadow-xl border-2 border-white/20"
          animate={{
            borderRadius: [
              '50%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '50%'
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap size={28} className="text-white" />
        </motion.div>

        {/* Rating stars */}
        <div className="absolute -top-2 -right-2 bg-black/50 rounded-full px-2 py-1 flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-white text-xs font-bold">{probiotic.rating}</span>
        </div>

        {/* Label - Better visibility */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-sm text-white font-semibold whitespace-nowrap">
            {probiotic.name}
          </div>
          <div className="text-xs text-bio-green-400 font-bold mt-1">
            ${probiotic.price}
          </div>
        </div>

        {/* Expanded info */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-64 z-20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <OrganicContainer variant="blob" size="sm">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">{probiotic.name}</h4>
                  <p className="text-xs text-white/70">{probiotic.strain}</p>
                  <div className="space-y-1">
                    {probiotic.benefits.slice(0, 2).map((benefit, i) => (
                      <div key={i} className="text-xs text-white/80 flex items-center gap-1">
                        <Leaf size={10} className="text-bio-green-400" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-white/60">
                    {probiotic.dosage} • {probiotic.timing}
                  </div>
                </div>
              </OrganicContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function PersonalizedRecommendations() {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0)
  const [likedRecipes, setLikedRecipes] = useState<string[]>([])
  const [dismissedRecipes, setDismissedRecipes] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'recipes' | 'probiotics'>('recipes')

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentRecipe = mockRecipes[currentRecipeIndex]
    
    if (direction === 'right') {
      setLikedRecipes(prev => [...prev, currentRecipe.id])
    } else {
      setDismissedRecipes(prev => [...prev, currentRecipe.id])
    }
    
    setCurrentRecipeIndex(prev => (prev + 1) % mockRecipes.length)
  }

  const currentRecipe = mockRecipes[currentRecipeIndex]

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 80, -40, 0],
            y: [0, -60, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-28 h-28 bg-probiotic-400/12 rounded-3xl filter blur-lg"
        />
        
        <motion.div
          animate={{ 
            x: [0, -70, 35, 0],
            y: [0, 50, -25, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.7, 1.3, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-3/4 left-1/4 w-24 h-24 bg-bio-green-400/10 rounded-2xl filter blur-md"
        />
        
        <motion.div
          animate={{ 
            x: [0, 50, -80, 0],
            y: [0, -40, 20, 0],
            rotate: [0, 90, 270, 360],
            scale: [1, 1.4, 0.8, 1],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 right-1/3 w-20 h-20 bg-enzyme-400/8 rounded-full filter blur-sm"
        />
      </div>
      {/* Header */}
      <motion.div
        className="mt-20 mb-8 text-center z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-creative-heading font-bold text-white mb-4">
          Recipes & Products
        </h1>
        <p className="text-white/70 font-creative-body text-lg max-w-2xl">
          Personalized recommendations based on your gut health profile
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="mb-8 z-30"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <OrganicContainer variant="organic" size="sm">
          <div className="flex gap-2">
            <OrganicButton
              variant={activeTab === 'recipes' ? 'outline' : 'ghost'}
              size="sm"
              shape="organic"
              onClick={() => setActiveTab('recipes')}
              className={activeTab === 'recipes' ? 'bg-white/10 border-white/30 text-white' : 'text-white/60'}
            >
              <ChefHat size={16} className="mr-2" />
              Recipes
            </OrganicButton>
            <OrganicButton
              variant={activeTab === 'probiotics' ? 'outline' : 'ghost'}
              size="sm"
              shape="organic"
              onClick={() => setActiveTab('probiotics')}
              className={activeTab === 'probiotics' ? 'bg-white/10 border-white/30 text-white' : 'text-white/60'}
            >
              <Zap size={16} className="mr-2" />
              Probiotics
            </OrganicButton>
          </div>
        </OrganicContainer>
      </motion.div>

      {/* Recipe Cards Section */}
      <AnimatePresence mode="wait">
        {activeTab === 'recipes' && (
          <motion.div
            key="recipes"
            className="flex-1 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative flex items-center justify-center w-full h-[500px]">
              <AnimatePresence>
                {currentRecipe && (
                  <RecipeCard 
                    key={currentRecipe.id}
                    recipe={currentRecipe}
                    onSwipe={handleSwipe}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Save/Pass buttons at the bottom */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <OrganicButton
                variant="outline"
                size="lg"
                shape="blob"
                onClick={() => handleSwipe('left')}
                className="bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
              >
                <X size={20} className="mr-2" />
                Pass
              </OrganicButton>
              
              <div className="text-white/40 text-sm px-4">
                or swipe
              </div>
              
              <OrganicButton
                variant="outline"
                size="lg"
                shape="blob"
                onClick={() => handleSwipe('right')}
                className="bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400"
              >
                <Heart size={20} className="mr-2" />
                Save
              </OrganicButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Probiotics Section */}
      <AnimatePresence mode="wait">
        {activeTab === 'probiotics' && (
          <motion.div
            key="probiotics"
            className="flex-1 flex flex-col items-center justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Centered probiotic bubbles container - Better layout */}
            <div className="relative w-full max-w-5xl h-[500px] mx-auto">
              {mockProbiotics.map((probiotic, index) => (
                <ProbioticBubble 
                  key={probiotic.id}
                  probiotic={probiotic}
                  index={index}
                />
              ))}
            </div>

            {/* Product selection hint at top */}
            <motion.div
              className="absolute top-10 left-1/2 transform -translate-x-1/2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-full px-6 py-2 border border-white/10">
                <div className="text-white/60 text-sm">
                  Click any bubble to explore • {mockProbiotics.length} products available
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="absolute top-28 right-8 z-30"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 px-4 py-3">
          <div className="text-center">
            <div className="text-white font-semibold">
              <Heart size={16} className={activeTab === 'recipes' ? 'text-bio-green-400' : 'text-probiotic-400'} /> {activeTab === 'recipes' ? likedRecipes.length : '2'} 
            </div>
            <div className="text-white/70 text-xs">
              {activeTab === 'recipes' ? 'Saved' : 'Available'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}