import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Apple, Banana, Beer, Beef, Cake, CircleAlert, Carrot, Cherry, Coffee, Cookie, Croissant, Droplet,
  Drumstick, Egg, Fish, IceCream, Milk, Pizza, Salad, Sandwich, Wine, Box, Trash,
  ChevronDown, Filter, Flask, Lemon, Grape, Orange, Bread as BreadIcon, Salt as SaltIcon, Pepper as PepperIcon, 
  Martini, Bowl as BowlIcon, Baby, Axe, BookOpen, FlameKindling, Bookmark, BookPlus, Cactus as CactusIcon, Calculator, 
  Calendar, Candlestick, Candy, Candy as CakeIcon, Candy as IceCreamIcon, Bus, Package,
  QrCode as CerealIcon, Cat, Chef, ChevronRight, Eye as ChocolateIcon, Gift as CherryIcon, Heart as ChiliIcon, 
  CircleEllipsis, CircleDot, CirclePlus, Clock as CinnamonIcon, ClipboardList, Clock, ClockIcon, CloudFog, CloudIcon, Cookie as CookieIcon,
  Cloud, Cloud as CloudRainIcon, Coffee as CoffeeIcon, CupSoda as CoffeeIcon2, Cog, Command, Compass, Contact, Container,
  Soup as CookingPotIcon, Copy, Copyright, Wheat as CornIcon, Sandwich as CrackerIcon, Crop, CreditCard, Crown, Map as DessertIcon,
  Diamond, Dice1, Donut, Droplets, EggFried, Eye, Factory, BurgerMenu as FastFoodIcon, Film, FilterX as MintIcon,
  Fish as SalmonIcon, Fish as TunaIcon, Fish as FishIcon, Sailboat as FishingRodIcon, 
  Flour as FlourIcon, Flower, Folder, FolderArchive, FolderDown, Folder,
  FolderLock, Footprints, Footprints, Utensils as ForkIcon, UtensilsCrossed as FriesIcon, 
  Snowflake as FrozenIcon, Apple as FruitIcon, Fuel, Gas,
  Sprout as GardenIcon, Sprout, Garlic as GarlicIcon, Gift, Gift as GiftIcon, 
  Flower as GingerIcon, FlowerIcon, Cookie as GingerbreadIcon, 
  Glass, Glasses as GlassWaterIcon, Wine as GlassWineIcon, Globe, GlobeIcon, Wheat as GrainIcon, 
  Grape as GrapeClusterIcon, Citrus as GrapefruitIcon, Beans as GreenBeansIcon, Leaf as GreenOnionIcon,
  Flame as GrilledIcon, Cat as HatIcon, Chef as ChefHatIcon,
  Heart as HerbIcon, Leaf as HerbsIcon, Bell as HotelBellIcon, Flame as HotIcon, Sandwich as HotDogIcon,
  IceCream as IceCreamScoopIcon, Martini as IceCreamShakeIcon, Image, Inbox, IndentDecrease, IndianRupee, Pumpkin as PumpkinIcon,
  Jar as JamJarIcon, Car as JarIcon, Soup as JelloBowlIcon, Coffee as JugIcon, 
  UtensilsCrossed as KebabIcon, Ketchup as KetchupIcon, Cherry as KiwiIcon, Knife as KnifeIcon, Scissors as KnifeIcon2,
  Layers as LayerIcon, Layers, LemonIcon as LemonSliceIcon, Salad as LettuceIcon, Timer as LimeIcon, 
  Soap as LiquidsoapIcon, Fish as LobsterIcon,
  Lock as LockedIcon, Cookie as MacaronIcon, User as ManIcon, Orange as MandarinIcon, Mango as MangoIcon, Store as MarketIcon, 
  Store as GroceryIcon, Planet as MarsIcon, Candy as MarshmallowIcon,
  Maximize, Medal, Watermelon as MelonIcon, Menu, MessageCircle, Mic, Milk as MilkBottleIcon, Minimize, 
  FlowerIcon as MintLeafIcon, UtensiliCrossed as MixingBowlIcon,
  Moon as MoonIcon, Moon, MoreHorizontal, MousePointer, Mushroom as MushroomIcon, Dumbbell, Music, Navigation, Egg as NestingDollsIcon, Network,
  Newspaper, FileText as NotepadTextIcon, Notebook, Nut as NutIcon, Beef as NutritionIcon, Wheat as OatsIcon, Octagon, Oil as OliveOilIcon, 
  Citrus as OliveIcon, CircleDot as OnionIcon,
  Onion as OnionIcon2, Orange as OrangeSliceIcon, Oven as OvenIcon, Box as OvenIcon2, Package, PaintBucket, Paintbrush, Palette, Pizza as PancakeIcon, 
  Layers as PancakesIcon,
  FlowerIcon as PaprikaIcon, Pasta as PastaIcon, Sandwich as PastaIcon2, Peach as PeachIcon, Pear as PearIcon, PearIcon as PearIcon2, 
  Pen, PepperIcon as PepperShakerIcon, Flower as PeppermintIcon, Percent,
  Phone, PictureInPicture, Pie as PieIcon, PieChart, PieChart as PieIcon2, Pill, Pin, Package as PickleJarIcon, Pineapple as PineappleIcon, 
  Pizza as PizzaSliceIcon,
  Loader as PlaceholderIcon, Plane, CalendarDays as PlanningIcon, Sprout as PlantIcon, Plant2 as Plant2Icon, FlowerIcon as PlantPotIcon, 
  Play, Cherry as PlumIcon, Plus, Pocket,
  Popcorn as PopcornIcon, Popsicle as PopsicleIcon, Soup as PotIcon, PotIcon as PotIcon2, Flower as PotFlowerIcon, CircleDot as PotatoIcon, 
  CircleDot as PotatoesIcon, PoundSterling, Shrimp as PrawnIcon, Pretzel as PretzelIcon,
  Printer, Projector, Dumbbell as ProteinIcon, Martini as ProteinShakeIcon, 
  Pumpkin as CannedPumpkinIcon, PumpkinIcon as PumpkinIcon2, Puzzle, QrCode, Quote, Rabbit as RabbitIcon,
  Radio, CircleDot as RadishIcon, Radio as RadioIcon, Receipt, Dumbbell as RecipeBoxIcon, 
  Recycle, Redo, RefreshCw, Regex, Repeat,
  Reply, UtensilsCrossed as RestaurantIcon, Rewind, Ribbon, Wheat as RiceIcon, Sandwich as RiceBallIcon, 
  Soup as RiceBowlIcon, Rocket, RotateCw, Route,
  Router, Rss, Ruler, Running as RunningIcon, Martini as RumIcon, FlowerIcon as SageIcon, 
  SaltIcon as SaltShakerIcon, Scale, Scissors, ScreenShare,
  Search, Shield as SecurityIcon, Send, Server, Settings, Share, Shield, ShoppingBag, ShoppingCart, Shovel,
  Shrimp as ShrimpIcon, Shrink, Shuffle, Sidebar, Sigma, Signal, SkipBack, SkipForward, Skull,
  Pizza as SliceIcon, SlidersHorizontal, Smartphone, SmilePlus as SmileIcon, Smile as SmilieIcon, 
  IceCream as SnowconeIcon, Snowflake, Sofa, SortAsc, SortDesc,
  Soup as SoupBowlIcon, Bean as SoyIcon, Milk as SoyMilkIcon, Flower as SpaIcon, Speaker, SpellCheck, 
  Pepper as SpiceIcon, Salt as SpiceRackIcon, Salad as SpinachIcon,
  UtensilsCrossed as SpoonIcon, UtensilsCrossed as SpoonKnifeIcon, Square, Users as StaffIcon, Star, 
  Star as StarfruitIcon, Beef as StirFryIcon, Footprints as StoolIcon, StopCircle, Store,
  Cherry as StrawberryIcon, Store as StuffedIcon, Suitcase, Sun, Flower as SunflowerIcon, 
  HeadphonesIcon as SupportIcon, Sushi as SushiIcon, 
  Sushi as SushiRollIcon, Table, LampFloor as TableLampIcon,
  Table as DiningTableIcon, Tag, Target, Coffee as TeaIcon, CupSoda as TeaCupIcon, Soup as KettleIcon, 
  Text, FileText as TextIcon, Thermometer,
  ThumbsDown, ThumbsUp, Ticket, Timer, TimerIcon, TimerOff, TimerReset, ToggleLeft, ToggleRight, Cherry as TomatoIcon,
  Tool, TomatoIcon as TomatoSliceIcon, Tooth as ToothIcon, Toothbrush, Hat as TopHatIcon, Trophy, Truck, Tv, Twitch, Twitter,
  Umbrella, Underline, Undo, Unlink, Upload, User, Users, UtensilsCrossed, UtensilsCrossed as UtensilsIcon, Salad as VeganIcon,
  Salad as VegetableIcon, Video, Video as VideoIcon, Eye as ViewIcon, Voicemail, Volume, Wallet, Nut as WalnutIcon, 
  Droplets as WashIcon, WashingMachine,
  Watch, Bottle as WaterBottleIcon, Droplet as WaterDropIcon, Glass as WaterGlassIcon, Watermelon as WatermelonIcon, 
  Wave, WaveSine, Wave as WaveSawtoothIcon, 
  Square as WaveSquareIcon, Triangle as WaveTriangleIcon,
  Webcam, Wheat as WheatIcon, Whiskey as WhiskeyIcon, Bread as WhiteBreadIcon, Cookie as WhiteChocolateIcon, 
  Wifi, Wind, Wine as WineGlassIcon, Wrench, X,
  Dumbbell as YogaIcon, Soup as YogurtIcon, Youtube, Zap, ZoomIn, ZoomOut
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons - sorted alphabetically
export const ALL_ICONS: Record<string, IconOption> = {
  apple: { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" />, shelfLife: 14 },
  avocado: { value: 'avocado', label: 'Avocado', icon: <FruitIcon className="h-5 w-5" />, shelfLife: 5 },
  bacon: { value: 'bacon', label: 'Bacon', icon: <Beef className="h-5 w-5" />, shelfLife: 7 },
  baguette: { value: 'baguette', label: 'Baguette', icon: <BreadIcon className="h-5 w-5" />, shelfLife: 3 },
  banana: { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  bean: { value: 'bean', label: 'Beans', icon: <SoyIcon className="h-5 w-5" />, shelfLife: 5 },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  beer: { value: 'beer', label: 'Beer', icon: <Beer className="h-5 w-5" />, shelfLife: 30 },
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  bread: { value: 'bread', label: 'Bread', icon: <BreadIcon className="h-5 w-5" />, shelfLife: 5 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  cake2: { value: 'cake2', label: 'Birthday Cake', icon: <CakeIcon className="h-5 w-5" />, shelfLife: 4 },
  candy: { value: 'candy', label: 'Candy', icon: <Candy className="h-5 w-5" />, shelfLife: 180 },
  cardboardBox: { value: 'cardboardBox', label: 'Cardboard Box', icon: <Package className="h-5 w-5" />, shelfLife: 365 },
  carrot: { value: 'carrot', label: 'Carrot', icon: <Carrot className="h-5 w-5" />, shelfLife: 14 },
  cannedPumpkin: { value: 'cannedPumpkin', label: 'Canned Pumpkin', icon: <CannedPumpkinIcon className="h-5 w-5" />, shelfLife: 365 },
  cereal: { value: 'cereal', label: 'Cereal', icon: <CerealIcon className="h-5 w-5" />, shelfLife: 180 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <ChevronDown className="h-5 w-5" />, shelfLife: 14 },
  chefHat: { value: 'chefHat', label: 'Chef Hat', icon: <Chef className="h-5 w-5" />, shelfLife: 7 },
  chefHat2: { value: 'chefHat2', label: 'Chef Hat (Alt)', icon: <ChefHatIcon className="h-5 w-5" />, shelfLife: 7 },
  cherry: { value: 'cherry', label: 'Cherry', icon: <Cherry className="h-5 w-5" />, shelfLife: 7 },
  cherrySymbol: { value: 'cherrySymbol', label: 'Cherry Symbol', icon: <CherryIcon className="h-5 w-5" />, shelfLife: 7 },
  chili: { value: 'chili', label: 'Chili', icon: <ChiliIcon className="h-5 w-5" />, shelfLife: 7 },
  chocolateIcon: { value: 'chocolateIcon', label: 'Chocolate', icon: <ChocolateIcon className="h-5 w-5" />, shelfLife: 180 },
  cinnamon: { value: 'cinnamon', label: 'Cinnamon', icon: <CinnamonIcon className="h-5 w-5" />, shelfLife: 365 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  coffeeBag: { value: 'coffeeBag', label: 'Coffee Bag', icon: <CoffeeIcon className="h-5 w-5" />, shelfLife: 30 },
  coffeeIcon: { value: 'coffeeIcon', label: 'Coffee Cup', icon: <CoffeeIcon2 className="h-5 w-5" />, shelfLife: 1 },
  container: { value: 'container', label: 'Container', icon: <Container className="h-5 w-5" />, shelfLife: 7 },
  cookieJar: { value: 'cookieJar', label: 'Cookie Jar', icon: <Compass className="h-5 w-5" />, shelfLife: 14 },
  cookie: { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" />, shelfLife: 7 },
  cloudCookie: { value: 'cloudCookie', label: 'Cloud Cookie', icon: <CookieIcon className="h-5 w-5" />, shelfLife: 7 },
  cookingPot: { value: 'cookingPot', label: 'Cooking Pot', icon: <CookingPotIcon className="h-5 w-5" />, shelfLife: 5 },
  corn: { value: 'corn', label: 'Corn', icon: <CornIcon className="h-5 w-5" />, shelfLife: 5 },
  cracker: { value: 'cracker', label: 'Cracker', icon: <CrackerIcon className="h-5 w-5" />, shelfLife: 30 },
  croissant: { value: 'croissant', label: 'Croissant', icon: <Croissant className="h-5 w-5" />, shelfLife: 3 },
  cupSoda: { value: 'cupSoda', label: 'Cup Soda', icon: <Droplet className="h-5 w-5" />, shelfLife: 1 },
  custard: { value: 'custard', label: 'Custard', icon: <Bookmark className="h-5 w-5" />, shelfLife: 5 },
  desertIcon: { value: 'desertIcon', label: 'Dessert', icon: <DessertIcon className="h-5 w-5" />, shelfLife: 5 },
  diningTable: { value: 'diningTable', label: 'Dining Table', icon: <DiningTableIcon className="h-5 w-5" />, shelfLife: 7 },
  donutIcon: { value: 'donutIcon', label: 'Donut', icon: <Donut className="h-5 w-5" />, shelfLife: 3 },
  drumstick: { value: 'drumstick', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  egg: { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" />, shelfLife: 30 },
  eggFried: { value: 'eggFried', label: 'Fried Egg', icon: <EggFried className="h-5 w-5" />, shelfLife: 1 },
  filter: { value: 'filter', label: 'Filter', icon: <Filter className="h-5 w-5" />, shelfLife: 30 },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  fishIcon: { value: 'fishIcon', label: 'Fish Icon', icon: <FishIcon className="h-5 w-5" />, shelfLife: 2 },
  flame: { value: 'flame', label: 'Flame', icon: <FlameKindling className="h-5 w-5" />, shelfLife: 7 },
  flaskConical: { value: 'flaskConical', label: 'Flask', icon: <Flask className="h-5 w-5" />, shelfLife: 7 },
  flour: { value: 'flour', label: 'Flour', icon: <FlourIcon className="h-5 w-5" />, shelfLife: 180 },
  fork: { value: 'fork', label: 'Fork', icon: <ForkIcon className="h-5 w-5" />, shelfLife: 7 },
  fries: { value: 'fries', label: 'French Fries', icon: <FriesIcon className="h-5 w-5" />, shelfLife: 1 },
  frozenIcon: { value: 'frozenIcon', label: 'Frozen Food', icon: <FrozenIcon className="h-5 w-5" />, shelfLife: 90 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <GarlicIcon className="h-5 w-5" />, shelfLife: 90 },
  ginger: { value: 'ginger', label: 'Ginger', icon: <GingerIcon className="h-5 w-5" />, shelfLife: 14 },
  gingerbreadCookie: { value: 'gingerbreadCookie', label: 'Gingerbread Cookie', icon: <GingerbreadIcon className="h-5 w-5" />, shelfLife: 14 },
  glassWater: { value: 'glassWater', label: 'Glass Water', icon: <GlassWaterIcon className="h-5 w-5" />, shelfLife: 1 },
  glassWine: { value: 'glassWine', label: 'Glass Wine', icon: <GlassWineIcon className="h-5 w-5" />, shelfLife: 5 },
  grape: { value: 'grape', label: 'Grape', icon: <Grape className="h-5 w-5" />, shelfLife: 7 },
  grapeCluster: { value: 'grapeCluster', label: 'Grape Cluster', icon: <GrapeClusterIcon className="h-5 w-5" />, shelfLife: 7 },
  grapefruit: { value: 'grapefruit', label: 'Grapefruit', icon: <GrapefruitIcon className="h-5 w-5" />, shelfLife: 14 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <GreenBeansIcon className="h-5 w-5" />, shelfLife: 7 },
  greenOnion: { value: 'greenOnion', label: 'Green Onion', icon: <GreenOnionIcon className="h-5 w-5" />, shelfLife: 7 },
  grocery: { value: 'grocery', label: 'Grocery', icon: <GroceryIcon className="h-5 w-5" />, shelfLife: 7 },
  hamburger: { value: 'hamburger', label: 'Hamburger', icon: <FastFoodIcon className="h-5 w-5" />, shelfLife: 1 },
  ham: { value: 'ham', label: 'Ham', icon: <Beef className="h-5 w-5" />, shelfLife: 7 },
  herbIcon: { value: 'herbIcon', label: 'Herb', icon: <HerbIcon className="h-5 w-5" />, shelfLife: 7 },
  herbs: { value: 'herbs', label: 'Herbs', icon: <HerbsIcon className="h-5 w-5" />, shelfLife: 7 },
  honey: { value: 'honey', label: 'Honey', icon: <Heart className="h-5 w-5" />, shelfLife: 365 },
  hotDog: { value: 'hotDog', label: 'Hot Dog', icon: <HotDogIcon className="h-5 w-5" />, shelfLife: 1 },
  hotIcon: { value: 'hotIcon', label: 'Hot', icon: <HotIcon className="h-5 w-5" />, shelfLife: 7 },
  hotSauce: { value: 'hotSauce', label: 'Hot Sauce', icon: <Heart className="h-5 w-5" />, shelfLife: 180 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 14 },
  iceCreamCone: { value: 'iceCreamCone', label: 'Ice Cream Cone', icon: <IceCreamIcon className="h-5 w-5" />, shelfLife: 1 },
  iceCreamScoop: { value: 'iceCreamScoop', label: 'Ice Cream Scoop', icon: <IceCreamScoopIcon className="h-5 w-5" />, shelfLife: 14 },
  iceCreamShake: { value: 'iceCreamShake', label: 'Ice Cream Shake', icon: <IceCreamShakeIcon className="h-5 w-5" />, shelfLife: 1 },
  icePop: { value: 'icePop', label: 'Ice Pop', icon: <IceCreamIcon className="h-5 w-5" />, shelfLife: 180 },
  jam: { value: 'jam', label: 'Jam', icon: <JamJarIcon className="h-5 w-5" />, shelfLife: 30 },
  jarIcon: { value: 'jarIcon', label: 'Jar', icon: <JarIcon className="h-5 w-5" />, shelfLife: 30 },
  jello: { value: 'jello', label: 'Jello', icon: <JelloBowlIcon className="h-5 w-5" />, shelfLife: 7 },
  jug: { value: 'jug', label: 'Jug', icon: <JugIcon className="h-5 w-5" />, shelfLife: 7 },
  kebab: { value: 'kebab', label: 'Kebab', icon: <KebabIcon className="h-5 w-5" />, shelfLife: 1 },
  kettle: { value: 'kettle', label: 'Kettle', icon: <KettleIcon className="h-5 w-5" />, shelfLife: 7 },
  ketchup: { value: 'ketchup', label: 'Ketchup', icon: <KetchupIcon className="h-5 w-5" />, shelfLife: 180 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <KiwiIcon className="h-5 w-5" />, shelfLife: 7 },
  knife: { value: 'knife', label: 'Knife', icon: <KnifeIcon className="h-5 w-5" />, shelfLife: 7 },
  lemon: { value: 'lemon', label: 'Lemon', icon: <Lemon className="h-5 w-5" />, shelfLife: 14 },
  lemonSlice: { value: 'lemonSlice', label: 'Lemon Slice', icon: <LemonSliceIcon className="h-5 w-5" />, shelfLife: 3 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <LettuceIcon className="h-5 w-5" />, shelfLife: 7 },
  lime: { value: 'lime', label: 'Lime', icon: <LimeIcon className="h-5 w-5" />, shelfLife: 14 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <LobsterIcon className="h-5 w-5" />, shelfLife: 1 },
  macaron: { value: 'macaron', label: 'Macaron', icon: <MacaronIcon className="h-5 w-5" />, shelfLife: 5 },
  mandarin: { value: 'mandarin', label: 'Mandarin', icon: <MandarinIcon className="h-5 w-5" />, shelfLife: 14 },
  mango: { value: 'mango', label: 'Mango', icon: <MangoIcon className="h-5 w-5" />, shelfLife: 5 },
  market: { value: 'market', label: 'Market', icon: <MarketIcon className="h-5 w-5" />, shelfLife: 7 },
  marshmallow: { value: 'marshmallow', label: 'Marshmallow', icon: <MarshmallowIcon className="h-5 w-5" />, shelfLife: 180 },
  melon: { value: 'melon', label: 'Melon', icon: <MelonIcon className="h-5 w-5" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  milkBottle: { value: 'milkBottle', label: 'Milk Bottle', icon: <MilkBottleIcon className="h-5 w-5" />, shelfLife: 7 },
  mint: { value: 'mint', label: 'Mint', icon: <MintIcon className="h-5 w-5" />, shelfLife: 5 },
  mintLeaf: { value: 'mintLeaf', label: 'Mint Leaf', icon: <MintLeafIcon className="h-5 w-5" />, shelfLife: 5 },
  mixingBowl: { value: 'mixingBowl', label: 'Mixing Bowl', icon: <MixingBowlIcon className="h-5 w-5" />, shelfLife: 7 },
  muffin: { value: 'muffin', label: 'Muffin', icon: <Candy className="h-5 w-5" />, shelfLife: 5 },
  mushroom: { value: 'mushroom', label: 'Mushroom', icon: <MushroomIcon className="h-5 w-5" />, shelfLife: 7 },
  nut: { value: 'nut', label: 'Nut', icon: <NutIcon className="h-5 w-5" />, shelfLife: 180 },
  oats: { value: 'oats', label: 'Oats', icon: <OatsIcon className="h-5 w-5" />, shelfLife: 365 },
  oil: { value: 'oil', label: 'Oil', icon: <PepperIcon className="h-5 w-5" />, shelfLife: 365 },
  olive: { value: 'olive', label: 'Olive', icon: <OliveIcon className="h-5 w-5" />, shelfLife: 14 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <OliveOilIcon className="h-5 w-5" />, shelfLife: 365 },
  onion: { value: 'onion', label: 'Onion', icon: <OnionIcon className="h-5 w-5" />, shelfLife: 30 },
  orange: { value: 'orange', label: 'Orange', icon: <Orange className="h-5 w-5" />, shelfLife: 14 },
  orangeSlice: { value: 'orangeSlice', label: 'Orange Slice', icon: <OrangeSliceIcon className="h-5 w-5" />, shelfLife: 3 },
  pancake: { value: 'pancake', label: 'Pancake', icon: <PancakeIcon className="h-5 w-5" />, shelfLife: 1 },
  pancakes: { value: 'pancakes', label: 'Pancakes Stack', icon: <PancakesIcon className="h-5 w-5" />, shelfLife: 1 },
  paprika: { value: 'paprika', label: 'Paprika', icon: <PaprikaIcon className="h-5 w-5" />, shelfLife: 365 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <PastaIcon className="h-5 w-5" />, shelfLife: 365 },
  pastaIcon: { value: 'pastaIcon', label: 'Pasta Icon', icon: <PastaIcon2 className="h-5 w-5" />, shelfLife: 365 },
  peach: { value: 'peach', label: 'Peach', icon: <PeachIcon className="h-5 w-5" />, shelfLife: 5 },
  pear: { value: 'pear', label: 'Pear', icon: <PearIcon className="h-5 w-5" />, shelfLife: 7 },
  pearIcon: { value: 'pearIcon', label: 'Pear Icon', icon: <PearIcon2 className="h-5 w-5" />, shelfLife: 7 },
  pepper: { value: 'pepper', label: 'Pepper', icon: <PepperIcon className="h-5 w-5" />, shelfLife: 365 },
  pepperShaker: { value: 'pepperShaker', label: 'Pepper Shaker', icon: <PepperShakerIcon className="h-5 w-5" />, shelfLife: 365 },
  peppermint: { value: 'peppermint', label: 'Peppermint', icon: <PeppermintIcon className="h-5 w-5" />, shelfLife: 7 },
  pickleJar: { value: 'pickleJar', label: 'Pickle Jar', icon: <PickleJarIcon className="h-5 w-5" />, shelfLife: 30 },
  pie: { value: 'pie', label: 'Pie', icon: <PieIcon className="h-5 w-5" />, shelfLife: 5 },
  pieIcon: { value: 'pieIcon', label: 'Pie Icon', icon: <PieIcon2 className="h-5 w-5" />, shelfLife: 5 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <PineappleIcon className="h-5 w-5" />, shelfLife: 7 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  pizzaSlice: { value: 'pizzaSlice', label: 'Pizza Slice', icon: <PizzaSliceIcon className="h-5 w-5" />, shelfLife: 3 },
  plant: { value: 'plant', label: 'Plant', icon: <PlantIcon className="h-5 w-5" />, shelfLife: 7 },
  plant2: { value: 'plant2', label: 'Plant 2', icon: <Plant2Icon className="h-5 w-5" />, shelfLife: 7 },
  plantPot: { value: 'plantPot', label: 'Plant Pot', icon: <PlantPotIcon className="h-5 w-5" />, shelfLife: 7 },
  plum: { value: 'plum', label: 'Plum', icon: <PlumIcon className="h-5 w-5" />, shelfLife: 5 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <PopcornIcon className="h-5 w-5" />, shelfLife: 7 },
  popsicle: { value: 'popsicle', label: 'Popsicle', icon: <PopsicleIcon className="h-5 w-5" />, shelfLife: 7 },
  pot: { value: 'pot', label: 'Pot', icon: <PotIcon className="h-5 w-5" />, shelfLife: 7 },
  potIcon: { value: 'potIcon', label: 'Pot Icon', icon: <PotIcon2 className="h-5 w-5" />, shelfLife: 7 },
  potato: { value: 'potato', label: 'Potato', icon: <PotatoIcon className="h-5 w-5" />, shelfLife: 30 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <PotatoesIcon className="h-5 w-5" />, shelfLife: 30 },
  prawn: { value: 'prawn', label: 'Prawn', icon: <PrawnIcon className="h-5 w-5" />, shelfLife: 2 },
  pretzel: { value: 'pretzel', label: 'Pretzel', icon: <PretzelIcon className="h-5 w-5" />, shelfLife: 5 },
  protein: { value: 'protein', label: 'Protein', icon: <ProteinIcon className="h-5 w-5" />, shelfLife: 30 },
  proteinShake: { value: 'proteinShake', label: 'Protein Shake', icon: <ProteinShakeIcon className="h-5 w-5" />, shelfLife: 1 },
  pumpkin: { value: 'pumpkin', label: 'Pumpkin', icon: <PumpkinIcon className="h-5 w-5" />, shelfLife: 30 },
  pumpkinIcon: { value: 'pumpkinIcon', label: 'Pumpkin Icon', icon: <PumpkinIcon2 className="h-5 w-5" />, shelfLife: 30 },
  radish: { value: 'radish', label: 'Radish', icon: <RadishIcon className="h-5 w-5" />, shelfLife: 14 },
  recipeBox: { value: 'recipeBox', label: 'Recipe Box', icon: <RecipeBoxIcon className="h-5 w-5" />, shelfLife: 7 },
  restaurant: { value: 'restaurant', label: 'Restaurant', icon: <RestaurantIcon className="h-5 w-5" />, shelfLife: 7 },
  rice: { value: 'rice', label: 'Rice', icon: <RiceIcon className="h-5 w-5" />, shelfLife: 365 },
  riceBall: { value: 'riceBall', label: 'Rice Ball', icon: <RiceBallIcon className="h-5 w-5" />, shelfLife: 1 },
  riceBowl: { value: 'riceBowl', label: 'Rice Bowl', icon: <RiceBowlIcon className="h-5 w-5" />, shelfLife: 1 },
  rum: { value: 'rum', label: 'Rum', icon: <RumIcon className="h-5 w-5" />, shelfLife: 365 },
  sage: { value: 'sage', label: 'Sage', icon: <SageIcon className="h-5 w-5" />, shelfLife: 7 },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  salt: { value: 'salt', label: 'Salt', icon: <SaltIcon className="h-5 w-5" />, shelfLife: 1825 },
  saltShaker: { value: 'saltShaker', label: 'Salt Shaker', icon: <SaltShakerIcon className="h-5 w-5" />, shelfLife: 1825 },
  salmon: { value: 'salmon', label: 'Salmon', icon: <SalmonIcon className="h-5 w-5" />, shelfLife: 3 },
  sandwich: { value: 'sandwich', label: 'Sandwich', icon: <Sandwich className="h-5 w-5" />, shelfLife: 3 },
  shoppingBag: { value: 'shoppingBag', label: 'Shopping Bag', icon: <ShoppingBag className="h-5 w-5" />, shelfLife: 7 },
  shoppingCart: { value: 'shoppingCart', label: 'Shopping Cart', icon: <ShoppingCart className="h-5 w-5" />, shelfLife: 7 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <ShrimpIcon className="h-5 w-5" />, shelfLife: 2 },
  soap: { value: 'soap', label: 'Soap', icon: <LiquidsoapIcon className="h-5 w-5" />, shelfLife: 365 },
  soupBowl: { value: 'soupBowl', label: 'Soup Bowl', icon: <SoupBowlIcon className="h-5 w-5" />, shelfLife: 3 },
  soy: { value: 'soy', label: 'Soy', icon: <SoyIcon className="h-5 w-5" />, shelfLife: 365 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <SoyMilkIcon className="h-5 w-5" />, shelfLife: 10 },
  spice: { value: 'spice', label: 'Spice', icon: <SpiceIcon className="h-5 w-5" />, shelfLife: 365 },
  spiceRack: { value: 'spiceRack', label: 'Spice Rack', icon: <SpiceRackIcon className="h-5 w-5" />, shelfLife: 365 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <SpinachIcon className="h-5 w-5" />, shelfLife: 5 },
  spoon: { value: 'spoon', label: 'Spoon', icon: <SpoonIcon className="h-5 w-5" />, shelfLife: 7 },
  starfruit: { value: 'starfruit', label: 'Starfruit', icon: <StarfruitIcon className="h-5 w-5" />, shelfLife: 5 },
  stirFry: { value: 'stirFry', label: 'Stir Fry', icon: <StirFryIcon className="h-5 w-5" />, shelfLife: 3 },
  strawberry: { value: 'strawberry', label: 'Strawberry', icon: <StrawberryIcon className="h-5 w-5" />, shelfLife: 5 },
  stuffed: { value: 'stuffed', label: 'Stuffed', icon: <StuffedIcon className="h-5 w-5" />, shelfLife: 3 },
  sunflower: { value: 'sunflower', label: 'Sunflower', icon: <SunflowerIcon className="h-5 w-5" />, shelfLife: 7 },
  sushi: { value: 'sushi', label: 'Sushi', icon: <SushiIcon className="h-5 w-5" />, shelfLife: 1 },
  sushiRoll: { value: 'sushiRoll', label: 'Sushi Roll', icon: <SushiRollIcon className="h-5 w-5" />, shelfLife: 1 },
  tea: { value: 'tea', label: 'Tea', icon: <TeaIcon className="h-5 w-5" />, shelfLife: 180 },
  teaCup: { value: 'teaCup', label: 'Tea Cup', icon: <TeaCupIcon className="h-5 w-5" />, shelfLife: 1 },
  tomatoSauce: { value: 'tomatoSauce', label: 'Tomato Sauce', icon: <CircleAlert className="h-5 w-5" />, shelfLife: 14 },
  tomato: { value: 'tomato', label: 'Tomato', icon: <TomatoIcon className="h-5 w-5" />, shelfLife: 7 },
  tomatoSlice: { value: 'tomatoSlice', label: 'Tomato Slice', icon: <TomatoSliceIcon className="h-5 w-5" />, shelfLife: 3 },
  toothPaste: { value: 'toothPaste', label: 'Toothpaste', icon: <ZoomOut className="h-5 w-5" />, shelfLife: 730 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 7 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <TunaIcon className="h-5 w-5" />, shelfLife: 3 },
  utensils: { value: 'utensils', label: 'Utensils', icon: <UtensilsCrossed className="h-5 w-5" />, shelfLife: 7 },
  utensilsCrossed: { value: 'utensilsCrossed', label: 'Utensils Crossed', icon: <UtensilsIcon className="h-5 w-5" />, shelfLife: 7 },
  vegan: { value: 'vegan', label: 'Vegan', icon: <VeganIcon className="h-5 w-5" />, shelfLife: 7 },
  vegetable: { value: 'vegetable', label: 'Vegetable', icon: <VegetableIcon className="h-5 w-5" />, shelfLife: 7 },
  walnut: { value: 'walnut', label: 'Walnut', icon: <WalnutIcon className="h-5 w-5" />, shelfLife: 180 },
  wash: { value: 'wash', label: 'Wash', icon: <WashIcon className="h-5 w-5" />, shelfLife: 7 },
  waterBottle: { value: 'waterBottle', label: 'Water Bottle', icon: <WaterBottleIcon className="h-5 w-5" />, shelfLife: 30 },
  waterDrop: { value: 'waterDrop', label: 'Water Drop', icon: <WaterDropIcon className="h-5 w-5" />, shelfLife: 7 },
  waterGlass: { value: 'waterGlass', label: 'Water Glass', icon: <WaterGlassIcon className="h-5 w-5" />, shelfLife: 1 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <WatermelonIcon className="h-5 w-5" />, shelfLife: 7 },
  wheat: { value: 'wheat', label: 'Wheat', icon: <WheatIcon className="h-5 w-5" />, shelfLife: 365 },
  whiskey: { value: 'whiskey', label: 'Whiskey', icon: <WhiskeyIcon className="h-5 w-5" />, shelfLife: 365 },
  whiteBread: { value: 'whiteBread', label: 'White Bread', icon: <WhiteBreadIcon className="h-5 w-5" />, shelfLife: 5 },
  whiteChocolate: { value: 'whiteChocolate', label: 'White Chocolate', icon: <WhiteChocolateIcon className="h-5 w-5" />, shelfLife: 180 },
  wine: { value: 'wine', label: 'Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 7 },
  wineGlass: { value: 'wineGlass', label: 'Wine Glass', icon: <WineGlassIcon className="h-5 w-5" />, shelfLife: 7 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <YogurtIcon className="h-5 w-5" />, shelfLife: 14 }
};

// Default selected icons (initial state)
const DEFAULT_SELECTED_ICONS = ['milk', 'coffee', 'apple', 'egg', 'banana', 'trash', 'box', 'cookie', 'cheese', 'tomato', 'tomatoSauce', 'filter'];

interface IconManagerContextType {
  availableIcons: IconOption[];
  allIcons: Record<string, IconOption>;
  toggleIcon: (iconValue: string) => void;
  isIconSelected: (iconValue: string) => boolean;
  updateIconShelfLife: (iconValue: string, days: number) => void;
}

const IconManagerContext = createContext<IconManagerContextType | undefined>(undefined);

export const IconManagerProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIconValues, setSelectedIconValues] = useState<string[]>(() => {
    const saved = localStorage.getItem('freshTrackerSelectedIcons');
    return saved ? JSON.parse(saved) : DEFAULT_SELECTED_ICONS;
  });
  
  const [customShelfLife, setCustomShelfLife] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('freshTrackerCustomShelfLife');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Create a copy of ALL_ICONS with custom shelf life values applied
  const iconsWithCustomShelfLife = { ...ALL_ICONS };
  Object.keys(customShelfLife).forEach(iconKey => {
    if (iconsWithCustomShelfLife[iconKey]) {
      iconsWithCustomShelfLife[iconKey] = {
        ...iconsWithCustomShelfLife[iconKey],
        shelfLife: customShelfLife[iconKey]
      };
    }
  });
  
  // Update available icons based on selected values
  const availableIcons = selectedIconValues.map(value => iconsWithCustomShelfLife[value]).filter(Boolean);
  
  useEffect(() => {
    localStorage.setItem('freshTrackerSelectedIcons', JSON.stringify(selectedIconValues));
  }, [selectedIconValues]);
  
  useEffect(() => {
    localStorage.setItem('freshTrackerCustomShelfLife', JSON.stringify(customShelfLife));
  }, [customShelfLife]);

  const toggleIcon = (iconValue: string) => {
    setSelectedIconValues(prev => {
      if (prev.includes(iconValue)) {
        return prev.filter(v => v !== iconValue);
      } else {
        return [...prev, iconValue];
      }
    });
  };

  const isIconSelected = (iconValue: string) => {
    return selectedIconValues.includes(iconValue);
  };
  
  const updateIconShelfLife = (iconValue: string, days: number) => {
    setCustomShelfLife(prev => ({
      ...prev,
      [iconValue]: days
    }));
  };

  return (
    <IconManagerContext.Provider value={{ 
      availableIcons, 
      allIcons: iconsWithCustomShelfLife,
      toggleIcon, 
      isIconSelected,
      updateIconShelfLife
    }}>
      {children}
    </IconManagerContext.Provider>
  );
};

export const useIconManager = (): IconManagerContextType => {
  const context = useContext(IconManagerContext);
  if (context === undefined) {
    throw new Error('useIconManager must be used within an IconManagerProvider');
  }
  return context;
};
