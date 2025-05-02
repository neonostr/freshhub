import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Apple, Banana, Beer, Beef, Cake, Candy, Carrot, Cherry, Coffee, Cookie, Croissant, CupSoda, 
  Drumstick, Egg, Fish, IceCream, Milk, Pizza, Salad, Sandwich, Wine, Box, Trash,
  Cheese, Bottle as Filter, FlaskConical, Lemon, Grape, Orange, Bread, Salt, Pepper, Oil, Bowl, 
  Baby, Bacon, Baseline, Bookmark, BatteryFull, BatteryLow, BatteryMedium, Baggage, Backpack, Axe, Brush, BookDown, 
  Baguette, Bean, BadgeInfo, Avocado, BookOpen, Flame, BookXmark, Bookmark as Custard, BookPlus, Cactus, Calculator, 
  Calendar, Candle, Candy as Cake2, Candy as IcePop, Candy as Muffin, Caravan, CardboardBox, 
  CassetteTape as Cereal, Cat, ChefHat, ChevronsRight, ChocolateIcon, CherrySymbol, Chili, CircleEllipsis, CircleIcon, CirclePlus, 
  Cigarette as Cinnamon, Clipboard, Clock, ClockIcon, CloudFog, CloudIcon, CloudMeatball as CloudCookie, 
  Cloudy, CloudFog as CloudRain, Coffee as CoffeeBag, CoffeeIcon, Cog, Command, Compass as CookieJar, Contact, Container, 
  CookingPot, Copy, Copyright, CorkScrew as Corn, Cornflakes as Cracker, Crop, CreditCard, Crown, DesertIcon, 
  Diamond, Dice1, DonutIcon, Droplet, EggFried, EyeIcon, Factory, FastFood, FilmIcon, FilterX as Mint, 
  Fish as Salmon, Fish as Tuna, FishIcon, FishingRodIcon, Flour, Flower, Folder, FolderArchive, FolderDown, FolderIcon, 
  FolderLock, FootPrints, Footprints, ForkKnife as Fork, FrenchFries as Fries, FrozenIcon, Fruit, Fuel, FuelIcon, 
  Garden, GardenIcon, Garlic, Gift, GiftIcon, Ginger, GingerIcon, GingerBread as GingerbreadCookie, Glass, 
  GlassWater, GlassWine, Globe, GlobeIcon, Grain, Grape as GrapeCluster, Grapefruit, GreenBean as GreenBeans, GreenOnion as GreenOnion, 
  Grilled, Ham, HamburgerIcon as Hamburger, HardDrive, Hash, HatIcon, HatChef as ChefHat2, Heart as Honey, HeartIcon, 
  HerbIcon, Herbs, HeartIcon as HotSauce, Home, HotelBellIcon as HotelBell, HotIcon, HotDog, 
  IceCreamCone, IceCreamScoop, IceCreamShake, Image, Inbox, IndentDecrease, IndianRupee, JackOLantern as Pumpkin, 
  JamJar as Jam, JarIcon, JelloBowl as Jello, Jug, Kebab, Key, KetchupBottle as Ketchup, KiwiIcon as Kiwi, Knife, KnifeIcon, 
  Lamp, Laptop, LayerIcon, Layer, LemonSlice, Lettuce, Library, LimeIcon as Lime, Liquidsoap as Soap, Lobster, 
  LockedIcon, Macaron, Man, Mandarin, Mango, Marketplace as Market, MarketStall as Grocery, Mars, MarshmallowIcon as Marshmallow, 
  Maximize, Medal, Melon, Menu, MessageCircle, Mic, MilkBottle, Minimize, Mint as MintLeaf, MixingBowl, 
  MoonIcon, Moon, MoreHorizontal, MousePointer, Mushroom, Muscle, Music, Navigation, NestingDolls, Network, 
  Newspaper, NotepadText, Notebook as Notepad, Nut, Nutrition, OatsIcon as Oats, Octagon, OliveOil, Olive, Onion, 
  OnionIcon, OrangeSlice, Oven, OvenIcon, Package, PaintBucket, Paintbrush, Palette, Pancake, PancakeStack as Pancakes, 
  Paprika, Pasta, PastaIcon, PeachIcon as Peach, Pear, PearIcon, Pen, Pepper as PepperShaker, Peppermint, Percent, 
  Phone, PictureInPicture, Pie, PieChart, PieIcon, Pill, Pin, Package as PickleJar, Pineapple, PizzaSlice, 
  Placeholder, Plane, Planning, Plant, Plant2, PlantPot, Play, Plum, Plus, Pocket, 
  Popcorn, Popsicle, Pot, PotIcon, PotFlower, Potato, PotatoBag as Potatoes, PoundSterling, Prawn, Pretzel, 
  Printer, Projector, Protein, ProteinShake, Pumpkin as CannedPumpkin, PumpkinIcon, Puzzle, QrCode, Quote, Rabbit, 
  Radio, Radish, RadioIcon, Receipt, Rectangle as RecipeBox, Recycle, Redo, RefreshCw, Regex, Repeat, 
  Reply, Restaurant, Rewind, Ribbon, Rice, RiceBall, RiceBowl as RiceBowl, Rocket, RotateCw, Route, 
  Router, Rss, Ruler, RunningIcon, Rum, Sage, Salt as SaltShaker, Scale, Scissors, ScreenShare, 
  Search, SecurityIcon, Send, Server, Settings, Share, Shield, ShoppingBag, ShoppingCart, Shovel, 
  Shrimp, Shrink, Shuffle, Sidebar, Sigma, Signal, SkipBack, SkipForward, Skull, 
  Slice, SlidersHorizontal, Smartphone, Smile, Smilie, Snowcone, Snowflake, Sofa, SortAsc, SortDesc, 
  Soup as SoupBowl, Soy, SoyMilk, Spa, Speaker, SpellCheck, Spice, SpiceRack, Spinach, 
  SpoonIcon as Spoon, SpoonKnife, Square, Staff, Star, Starfruit, StirFry, Stool, StopCircle, Store, 
  StrawberryIcon as Strawberry, Stuffed, Suitcase, Sun, SunflowerIcon as Sunflower, Support, SushiIcon as Sushi, SushiRoll, Table, TableLamp, 
  TableSet as DiningTable, Tag, Target, Tea, TeaCup, TeaKettle as Kettle, Text, TextIcon, Thermometer, 
  ThumbsDown, ThumbsUp, Ticket, Timer, TimerIcon, TimerOff, TimerReset, ToggleLeft, ToggleRight, Tomato, 
  Tool, TomatoSlice, ToothIcon, Toothbrush, TopHat, Trophy, Truck, Tv, Twitch, Twitter, 
  Umbrella, Underline, Undo, Unlink, Upload, User, Users, Utensils, UtensilsCrossed as UtensilsCrossed, Vegan, 
  Vegetable, Video, VideoIcon, View, Voicemail, Volume, Wallet, WalnutIcon as Walnut, Wash, WashingMachine, 
  Watch, WaterBottle, WaterDrop, WaterGlass, Watermelon, Wave, WaveSine, WaveSawtooth, WaveSquare, WaveTriangle, 
  Webcam, Wheat, Whiskey, WhiteBread, WhiteChocolate as WhiteChocolate, Wifi, Wind, WineGlass, Wrench, X, 
  YogaIcon, YogurtIcon as Yogurt, Youtube, Zap, ZoomIn, ZoomOut as ToothPaste
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
  avocado: { value: 'avocado', label: 'Avocado', icon: <Avocado className="h-5 w-5" />, shelfLife: 5 },
  bacon: { value: 'bacon', label: 'Bacon', icon: <Bacon className="h-5 w-5" />, shelfLife: 7 },
  baguette: { value: 'baguette', label: 'Baguette', icon: <Baguette className="h-5 w-5" />, shelfLife: 3 },
  banana: { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  bean: { value: 'bean', label: 'Beans', icon: <Bean className="h-5 w-5" />, shelfLife: 5 },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  beer: { value: 'beer', label: 'Beer', icon: <Beer className="h-5 w-5" />, shelfLife: 30 },
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  bread: { value: 'bread', label: 'Bread', icon: <Bread className="h-5 w-5" />, shelfLife: 5 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  cake2: { value: 'cake2', label: 'Birthday Cake', icon: <Cake2 className="h-5 w-5" />, shelfLife: 4 },
  candy: { value: 'candy', label: 'Candy', icon: <Candy className="h-5 w-5" />, shelfLife: 180 },
  cardboardBox: { value: 'cardboardBox', label: 'Cardboard Box', icon: <CardboardBox className="h-5 w-5" />, shelfLife: 365 },
  carrot: { value: 'carrot', label: 'Carrot', icon: <Carrot className="h-5 w-5" />, shelfLife: 14 },
  cannedPumpkin: { value: 'cannedPumpkin', label: 'Canned Pumpkin', icon: <CannedPumpkin className="h-5 w-5" />, shelfLife: 365 },
  cereal: { value: 'cereal', label: 'Cereal', icon: <Cereal className="h-5 w-5" />, shelfLife: 180 },
  cheese: { value: 'cheese', label: 'Cheese', icon: <Cheese className="h-5 w-5" />, shelfLife: 14 },
  chefHat: { value: 'chefHat', label: 'Chef Hat', icon: <ChefHat className="h-5 w-5" />, shelfLife: 7 },
  chefHat2: { value: 'chefHat2', label: 'Chef Hat (Alt)', icon: <ChefHat2 className="h-5 w-5" />, shelfLife: 7 },
  cherry: { value: 'cherry', label: 'Cherry', icon: <Cherry className="h-5 w-5" />, shelfLife: 7 },
  cherrySymbol: { value: 'cherrySymbol', label: 'Cherry Symbol', icon: <CherrySymbol className="h-5 w-5" />, shelfLife: 7 },
  chili: { value: 'chili', label: 'Chili', icon: <Chili className="h-5 w-5" />, shelfLife: 7 },
  chocolateIcon: { value: 'chocolateIcon', label: 'Chocolate', icon: <ChocolateIcon className="h-5 w-5" />, shelfLife: 180 },
  cinnamon: { value: 'cinnamon', label: 'Cinnamon', icon: <Cinnamon className="h-5 w-5" />, shelfLife: 365 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  coffeeBag: { value: 'coffeeBag', label: 'Coffee Bag', icon: <CoffeeBag className="h-5 w-5" />, shelfLife: 30 },
  coffeeIcon: { value: 'coffeeIcon', label: 'Coffee Cup', icon: <CoffeeIcon className="h-5 w-5" />, shelfLife: 1 },
  container: { value: 'container', label: 'Container', icon: <Container className="h-5 w-5" />, shelfLife: 7 },
  cookieJar: { value: 'cookieJar', label: 'Cookie Jar', icon: <CookieJar className="h-5 w-5" />, shelfLife: 14 },
  cookie: { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" />, shelfLife: 7 },
  cloudCookie: { value: 'cloudCookie', label: 'Cloud Cookie', icon: <CloudCookie className="h-5 w-5" />, shelfLife: 7 },
  cookingPot: { value: 'cookingPot', label: 'Cooking Pot', icon: <CookingPot className="h-5 w-5" />, shelfLife: 5 },
  corn: { value: 'corn', label: 'Corn', icon: <Corn className="h-5 w-5" />, shelfLife: 5 },
  cracker: { value: 'cracker', label: 'Cracker', icon: <Cracker className="h-5 w-5" />, shelfLife: 30 },
  croissant: { value: 'croissant', label: 'Croissant', icon: <Croissant className="h-5 w-5" />, shelfLife: 3 },
  cupSoda: { value: 'cupSoda', label: 'Cup Soda', icon: <CupSoda className="h-5 w-5" />, shelfLife: 1 },
  custard: { value: 'custard', label: 'Custard', icon: <Custard className="h-5 w-5" />, shelfLife: 5 },
  desertIcon: { value: 'desertIcon', label: 'Dessert', icon: <DesertIcon className="h-5 w-5" />, shelfLife: 5 },
  diningTable: { value: 'diningTable', label: 'Dining Table', icon: <DiningTable className="h-5 w-5" />, shelfLife: 7 },
  donutIcon: { value: 'donutIcon', label: 'Donut', icon: <DonutIcon className="h-5 w-5" />, shelfLife: 3 },
  drumstick: { value: 'drumstick', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  egg: { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" />, shelfLife: 30 },
  eggFried: { value: 'eggFried', label: 'Fried Egg', icon: <EggFried className="h-5 w-5" />, shelfLife: 1 },
  filter: { value: 'filter', label: 'Filter', icon: <Filter className="h-5 w-5" />, shelfLife: 30 },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  fishIcon: { value: 'fishIcon', label: 'Fish Icon', icon: <FishIcon className="h-5 w-5" />, shelfLife: 2 },
  flame: { value: 'flame', label: 'Flame', icon: <Flame className="h-5 w-5" />, shelfLife: 7 },
  flaskConical: { value: 'flaskConical', label: 'Flask', icon: <FlaskConical className="h-5 w-5" />, shelfLife: 7 },
  flour: { value: 'flour', label: 'Flour', icon: <Flour className="h-5 w-5" />, shelfLife: 180 },
  fork: { value: 'fork', label: 'Fork', icon: <Fork className="h-5 w-5" />, shelfLife: 7 },
  fries: { value: 'fries', label: 'French Fries', icon: <Fries className="h-5 w-5" />, shelfLife: 1 },
  frozenIcon: { value: 'frozenIcon', label: 'Frozen Food', icon: <FrozenIcon className="h-5 w-5" />, shelfLife: 90 },
  garlic: { value: 'garlic', label: 'Garlic', icon: <Garlic className="h-5 w-5" />, shelfLife: 90 },
  ginger: { value: 'ginger', label: 'Ginger', icon: <Ginger className="h-5 w-5" />, shelfLife: 14 },
  gingerbreadCookie: { value: 'gingerbreadCookie', label: 'Gingerbread Cookie', icon: <GingerbreadCookie className="h-5 w-5" />, shelfLife: 14 },
  glassWater: { value: 'glassWater', label: 'Glass Water', icon: <GlassWater className="h-5 w-5" />, shelfLife: 1 },
  glassWine: { value: 'glassWine', label: 'Glass Wine', icon: <GlassWine className="h-5 w-5" />, shelfLife: 5 },
  grape: { value: 'grape', label: 'Grape', icon: <Grape className="h-5 w-5" />, shelfLife: 7 },
  grapeCluster: { value: 'grapeCluster', label: 'Grape Cluster', icon: <GrapeCluster className="h-5 w-5" />, shelfLife: 7 },
  grapefruit: { value: 'grapefruit', label: 'Grapefruit', icon: <Grapefruit className="h-5 w-5" />, shelfLife: 14 },
  greenBeans: { value: 'greenBeans', label: 'Green Beans', icon: <GreenBeans className="h-5 w-5" />, shelfLife: 7 },
  greenOnion: { value: 'greenOnion', label: 'Green Onion', icon: <GreenOnion className="h-5 w-5" />, shelfLife: 7 },
  grocery: { value: 'grocery', label: 'Grocery', icon: <Grocery className="h-5 w-5" />, shelfLife: 7 },
  hamburger: { value: 'hamburger', label: 'Hamburger', icon: <Hamburger className="h-5 w-5" />, shelfLife: 1 },
  ham: { value: 'ham', label: 'Ham', icon: <Ham className="h-5 w-5" />, shelfLife: 7 },
  herbIcon: { value: 'herbIcon', label: 'Herb', icon: <HerbIcon className="h-5 w-5" />, shelfLife: 7 },
  herbs: { value: 'herbs', label: 'Herbs', icon: <Herbs className="h-5 w-5" />, shelfLife: 7 },
  honey: { value: 'honey', label: 'Honey', icon: <Honey className="h-5 w-5" />, shelfLife: 365 },
  hotDog: { value: 'hotDog', label: 'Hot Dog', icon: <HotDog className="h-5 w-5" />, shelfLife: 1 },
  hotIcon: { value: 'hotIcon', label: 'Hot', icon: <HotIcon className="h-5 w-5" />, shelfLife: 7 },
  hotSauce: { value: 'hotSauce', label: 'Hot Sauce', icon: <HotSauce className="h-5 w-5" />, shelfLife: 180 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 14 },
  iceCreamCone: { value: 'iceCreamCone', label: 'Ice Cream Cone', icon: <IceCreamCone className="h-5 w-5" />, shelfLife: 1 },
  iceCreamScoop: { value: 'iceCreamScoop', label: 'Ice Cream Scoop', icon: <IceCreamScoop className="h-5 w-5" />, shelfLife: 14 },
  iceCreamShake: { value: 'iceCreamShake', label: 'Ice Cream Shake', icon: <IceCreamShake className="h-5 w-5" />, shelfLife: 1 },
  icePop: { value: 'icePop', label: 'Ice Pop', icon: <IcePop className="h-5 w-5" />, shelfLife: 180 },
  jam: { value: 'jam', label: 'Jam', icon: <Jam className="h-5 w-5" />, shelfLife: 30 },
  jarIcon: { value: 'jarIcon', label: 'Jar', icon: <JarIcon className="h-5 w-5" />, shelfLife: 30 },
  jello: { value: 'jello', label: 'Jello', icon: <Jello className="h-5 w-5" />, shelfLife: 7 },
  jug: { value: 'jug', label: 'Jug', icon: <Jug className="h-5 w-5" />, shelfLife: 7 },
  kebab: { value: 'kebab', label: 'Kebab', icon: <Kebab className="h-5 w-5" />, shelfLife: 1 },
  kettle: { value: 'kettle', label: 'Kettle', icon: <Kettle className="h-5 w-5" />, shelfLife: 7 },
  ketchup: { value: 'ketchup', label: 'Ketchup', icon: <Ketchup className="h-5 w-5" />, shelfLife: 180 },
  kiwi: { value: 'kiwi', label: 'Kiwi', icon: <Kiwi className="h-5 w-5" />, shelfLife: 7 },
  knife: { value: 'knife', label: 'Knife', icon: <Knife className="h-5 w-5" />, shelfLife: 7 },
  lemon: { value: 'lemon', label: 'Lemon', icon: <Lemon className="h-5 w-5" />, shelfLife: 14 },
  lemonSlice: { value: 'lemonSlice', label: 'Lemon Slice', icon: <LemonSlice className="h-5 w-5" />, shelfLife: 3 },
  lettuce: { value: 'lettuce', label: 'Lettuce', icon: <Lettuce className="h-5 w-5" />, shelfLife: 7 },
  lime: { value: 'lime', label: 'Lime', icon: <Lime className="h-5 w-5" />, shelfLife: 14 },
  lobster: { value: 'lobster', label: 'Lobster', icon: <Lobster className="h-5 w-5" />, shelfLife: 1 },
  macaron: { value: 'macaron', label: 'Macaron', icon: <Macaron className="h-5 w-5" />, shelfLife: 5 },
  mandarin: { value: 'mandarin', label: 'Mandarin', icon: <Mandarin className="h-5 w-5" />, shelfLife: 14 },
  mango: { value: 'mango', label: 'Mango', icon: <Mango className="h-5 w-5" />, shelfLife: 5 },
  market: { value: 'market', label: 'Market', icon: <Market className="h-5 w-5" />, shelfLife: 7 },
  marshmallow: { value: 'marshmallow', label: 'Marshmallow', icon: <Marshmallow className="h-5 w-5" />, shelfLife: 180 },
  melon: { value: 'melon', label: 'Melon', icon: <Melon className="h-5 w-5" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  milkBottle: { value: 'milkBottle', label: 'Milk Bottle', icon: <MilkBottle className="h-5 w-5" />, shelfLife: 7 },
  mint: { value: 'mint', label: 'Mint', icon: <Mint className="h-5 w-5" />, shelfLife: 5 },
  mintLeaf: { value: 'mintLeaf', label: 'Mint Leaf', icon: <MintLeaf className="h-5 w-5" />, shelfLife: 5 },
  mixingBowl: { value: 'mixingBowl', label: 'Mixing Bowl', icon: <MixingBowl className="h-5 w-5" />, shelfLife: 7 },
  muffin: { value: 'muffin', label: 'Muffin', icon: <Muffin className="h-5 w-5" />, shelfLife: 5 },
  mushroom: { value: 'mushroom', label: 'Mushroom', icon: <Mushroom className="h-5 w-5" />, shelfLife: 7 },
  nut: { value: 'nut', label: 'Nut', icon: <Nut className="h-5 w-5" />, shelfLife: 180 },
  oats: { value: 'oats', label: 'Oats', icon: <Oats className="h-5 w-5" />, shelfLife: 365 },
  oil: { value: 'oil', label: 'Oil', icon: <Oil className="h-5 w-5" />, shelfLife: 365 },
  olive: { value: 'olive', label: 'Olive', icon: <Olive className="h-5 w-5" />, shelfLife: 14 },
  oliveOil: { value: 'oliveOil', label: 'Olive Oil', icon: <OliveOil className="h-5 w-5" />, shelfLife: 365 },
  onion: { value: 'onion', label: 'Onion', icon: <Onion className="h-5 w-5" />, shelfLife: 30 },
  orange: { value: 'orange', label: 'Orange', icon: <Orange className="h-5 w-5" />, shelfLife: 14 },
  orangeSlice: { value: 'orangeSlice', label: 'Orange Slice', icon: <OrangeSlice className="h-5 w-5" />, shelfLife: 3 },
  pancake: { value: 'pancake', label: 'Pancake', icon: <Pancake className="h-5 w-5" />, shelfLife: 1 },
  pancakes: { value: 'pancakes', label: 'Pancakes Stack', icon: <Pancakes className="h-5 w-5" />, shelfLife: 1 },
  paprika: { value: 'paprika', label: 'Paprika', icon: <Paprika className="h-5 w-5" />, shelfLife: 365 },
  pasta: { value: 'pasta', label: 'Pasta', icon: <Pasta className="h-5 w-5" />, shelfLife: 365 },
  pastaIcon: { value: 'pastaIcon', label: 'Pasta Icon', icon: <PastaIcon className="h-5 w-5" />, shelfLife: 365 },
  peach: { value: 'peach', label: 'Peach', icon: <Peach className="h-5 w-5" />, shelfLife: 5 },
  pear: { value: 'pear', label: 'Pear', icon: <Pear className="h-5 w-5" />, shelfLife: 7 },
  pearIcon: { value: 'pearIcon', label: 'Pear Icon', icon: <PearIcon className="h-5 w-5" />, shelfLife: 7 },
  pepper: { value: 'pepper', label: 'Pepper', icon: <Pepper className="h-5 w-5" />, shelfLife: 365 },
  pepperShaker: { value: 'pepperShaker', label: 'Pepper Shaker', icon: <PepperShaker className="h-5 w-5" />, shelfLife: 365 },
  peppermint: { value: 'peppermint', label: 'Peppermint', icon: <Peppermint className="h-5 w-5" />, shelfLife: 7 },
  pickleJar: { value: 'pickleJar', label: 'Pickle Jar', icon: <PickleJar className="h-5 w-5" />, shelfLife: 30 },
  pie: { value: 'pie', label: 'Pie', icon: <Pie className="h-5 w-5" />, shelfLife: 5 },
  pieIcon: { value: 'pieIcon', label: 'Pie Icon', icon: <PieIcon className="h-5 w-5" />, shelfLife: 5 },
  pineapple: { value: 'pineapple', label: 'Pineapple', icon: <Pineapple className="h-5 w-5" />, shelfLife: 7 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  pizzaSlice: { value: 'pizzaSlice', label: 'Pizza Slice', icon: <PizzaSlice className="h-5 w-5" />, shelfLife: 3 },
  plant: { value: 'plant', label: 'Plant', icon: <Plant className="h-5 w-5" />, shelfLife: 7 },
  plant2: { value: 'plant2', label: 'Plant 2', icon: <Plant2 className="h-5 w-5" />, shelfLife: 7 },
  plantPot: { value: 'plantPot', label: 'Plant Pot', icon: <PlantPot className="h-5 w-5" />, shelfLife: 7 },
  plum: { value: 'plum', label: 'Plum', icon: <Plum className="h-5 w-5" />, shelfLife: 5 },
  popcorn: { value: 'popcorn', label: 'Popcorn', icon: <Popcorn className="h-5 w-5" />, shelfLife: 7 },
  popsicle: { value: 'popsicle', label: 'Popsicle', icon: <Popsicle className="h-5 w-5" />, shelfLife: 7 },
  pot: { value: 'pot', label: 'Pot', icon: <Pot className="h-5 w-5" />, shelfLife: 7 },
  potIcon: { value: 'potIcon', label: 'Pot Icon', icon: <PotIcon className="h-5 w-5" />, shelfLife: 7 },
  potato: { value: 'potato', label: 'Potato', icon: <Potato className="h-5 w-5" />, shelfLife: 30 },
  potatoes: { value: 'potatoes', label: 'Potatoes', icon: <Potatoes className="h-5 w-5" />, shelfLife: 30 },
  prawn: { value: 'prawn', label: 'Prawn', icon: <Prawn className="h-5 w-5" />, shelfLife: 2 },
  pretzel: { value: 'pretzel', label: 'Pretzel', icon: <Pretzel className="h-5 w-5" />, shelfLife: 5 },
  protein: { value: 'protein', label: 'Protein', icon: <Protein className="h-5 w-5" />, shelfLife: 30 },
  proteinShake: { value: 'proteinShake', label: 'Protein Shake', icon: <ProteinShake className="h-5 w-5" />, shelfLife: 1 },
  pumpkin: { value: 'pumpkin', label: 'Pumpkin', icon: <Pumpkin className="h-5 w-5" />, shelfLife: 30 },
  pumpkinIcon: { value: 'pumpkinIcon', label: 'Pumpkin Icon', icon: <PumpkinIcon className="h-5 w-5" />, shelfLife: 30 },
  radish: { value: 'radish', label: 'Radish', icon: <Radish className="h-5 w-5" />, shelfLife: 14 },
  recipeBox: { value: 'recipeBox', label: 'Recipe Box', icon: <RecipeBox className="h-5 w-5" />, shelfLife: 7 },
  restaurant: { value: 'restaurant', label: 'Restaurant', icon: <Restaurant className="h-5 w-5" />, shelfLife: 7 },
  rice: { value: 'rice', label: 'Rice', icon: <Rice className="h-5 w-5" />, shelfLife: 365 },
  riceBall: { value: 'riceBall', label: 'Rice Ball', icon: <RiceBall className="h-5 w-5" />, shelfLife: 1 },
  riceBowl: { value: 'riceBowl', label: 'Rice Bowl', icon: <RiceBowl className="h-5 w-5" />, shelfLife: 1 },
  rum: { value: 'rum', label: 'Rum', icon: <Rum className="h-5 w-5" />, shelfLife: 365 },
  sage: { value: 'sage', label: 'Sage', icon: <Sage className="h-5 w-5" />, shelfLife: 7 },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  salt: { value: 'salt', label: 'Salt', icon: <Salt className="h-5 w-5" />, shelfLife: 1825 },
  saltShaker: { value: 'saltShaker', label: 'Salt Shaker', icon: <SaltShaker className="h-5 w-5" />, shelfLife: 1825 },
  salmon: { value: 'salmon', label: 'Salmon', icon: <Salmon className="h-5 w-5" />, shelfLife: 3 },
  sandwich: { value: 'sandwich', label: 'Sandwich', icon: <Sandwich className="h-5 w-5" />, shelfLife: 3 },
  shoppingBag: { value: 'shoppingBag', label: 'Shopping Bag', icon: <ShoppingBag className="h-5 w-5" />, shelfLife: 7 },
  shoppingCart: { value: 'shoppingCart', label: 'Shopping Cart', icon: <ShoppingCart className="h-5 w-5" />, shelfLife: 7 },
  shrimp: { value: 'shrimp', label: 'Shrimp', icon: <Shrimp className="h-5 w-5" />, shelfLife: 2 },
  soap: { value: 'soap', label: 'Soap', icon: <Soap className="h-5 w-5" />, shelfLife: 365 },
  soupBowl: { value: 'soupBowl', label: 'Soup Bowl', icon: <SoupBowl className="h-5 w-5" />, shelfLife: 3 },
  soy: { value: 'soy', label: 'Soy', icon: <Soy className="h-5 w-5" />, shelfLife: 365 },
  soyMilk: { value: 'soyMilk', label: 'Soy Milk', icon: <SoyMilk className="h-5 w-5" />, shelfLife: 10 },
  spice: { value: 'spice', label: 'Spice', icon: <Spice className="h-5 w-5" />, shelfLife: 365 },
  spiceRack: { value: 'spiceRack', label: 'Spice Rack', icon: <SpiceRack className="h-5 w-5" />, shelfLife: 365 },
  spinach: { value: 'spinach', label: 'Spinach', icon: <Spinach className="h-5 w-5" />, shelfLife: 5 },
  spoon: { value: 'spoon', label: 'Spoon', icon: <Spoon className="h-5 w-5" />, shelfLife: 7 },
  starfruit: { value: 'starfruit', label: 'Starfruit', icon: <Starfruit className="h-5 w-5" />, shelfLife: 5 },
  stirFry: { value: 'stirFry', label: 'Stir Fry', icon: <StirFry className="h-5 w-5" />, shelfLife: 3 },
  strawberry: { value: 'strawberry', label: 'Strawberry', icon: <Strawberry className="h-5 w-5" />, shelfLife: 5 },
  stuffed: { value: 'stuffed', label: 'Stuffed', icon: <Stuffed className="h-5 w-5" />, shelfLife: 3 },
  sunflower: { value: 'sunflower', label: 'Sunflower', icon: <Sunflower className="h-5 w-5" />, shelfLife: 7 },
  sushi: { value: 'sushi', label: 'Sushi', icon: <Sushi className="h-5 w-5" />, shelfLife: 1 },
  sushiRoll: { value: 'sushiRoll', label: 'Sushi Roll', icon: <SushiRoll className="h-5 w-5" />, shelfLife: 1 },
  tea: { value: 'tea', label: 'Tea', icon: <Tea className="h-5 w-5" />, shelfLife: 180 },
  teaCup: { value: 'teaCup', label: 'Tea Cup', icon: <TeaCup className="h-5 w-5" />, shelfLife: 1 },
  tomato: { value: 'tomato', label: 'Tomato', icon: <Tomato className="h-5 w-5" />, shelfLife: 7 },
  tomatoSlice: { value: 'tomatoSlice', label: 'Tomato Slice', icon: <TomatoSlice className="h-5 w-5" />, shelfLife: 3 },
  toothPaste: { value: 'toothPaste', label: 'Toothpaste', icon: <ToothPaste className="h-5 w-5" />, shelfLife: 730 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 7 },
  tuna: { value: 'tuna', label: 'Tuna', icon: <Tuna className="h-5 w-5" />, shelfLife: 3 },
  utensils: { value: 'utensils', label: 'Utensils', icon: <Utensils className="h-5 w-5" />, shelfLife: 7 },
  utensilsCrossed: { value: 'utensilsCrossed', label: 'Utensils Crossed', icon: <UtensilsCrossed className="h-5 w-5" />, shelfLife: 7 },
  vegan: { value: 'vegan', label: 'Vegan', icon: <Vegan className="h-5 w-5" />, shelfLife: 7 },
  vegetable: { value: 'vegetable', label: 'Vegetable', icon: <Vegetable className="h-5 w-5" />, shelfLife: 7 },
  walnut: { value: 'walnut', label: 'Walnut', icon: <Walnut className="h-5 w-5" />, shelfLife: 180 },
  wash: { value: 'wash', label: 'Wash', icon: <Wash className="h-5 w-5" />, shelfLife: 7 },
  waterBottle: { value: 'waterBottle', label: 'Water Bottle', icon: <WaterBottle className="h-5 w-5" />, shelfLife: 30 },
  waterDrop: { value: 'waterDrop', label: 'Water Drop', icon: <WaterDrop className="h-5 w-5" />, shelfLife: 7 },
  waterGlass: { value: 'waterGlass', label: 'Water Glass', icon: <WaterGlass className="h-5 w-5" />, shelfLife: 1 },
  watermelon: { value: 'watermelon', label: 'Watermelon', icon: <Watermelon className="h-5 w-5" />, shelfLife: 7 },
  wheat: { value: 'wheat', label: 'Wheat', icon: <Wheat className="h-5 w-5" />, shelfLife: 365 },
  whiskey: { value: 'whiskey', label: 'Whiskey', icon: <Whiskey className="h-5 w-5" />, shelfLife: 365 },
  whiteBread: { value: 'whiteBread', label: 'White Bread', icon: <WhiteBread className="h-5 w-5" />, shelfLife: 5 },
  whiteChocolate: { value: 'whiteChocolate', label: 'White Chocolate', icon: <WhiteChocolate className="h-5 w-5" />, shelfLife: 180 },
  wine: { value: 'wine', label: 'Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 7 },
  wineGlass: { value: 'wineGlass', label: 'Wine Glass', icon: <WineGlass className="h-5 w-5" />, shelfLife: 7 },
  yogurt: { value: 'yogurt', label: 'Yogurt', icon: <Yogurt className="h-5 w-5" />, shelfLife: 14 }
};

// Default selected icons (initial state)
const DEFAULT_SELECTED_ICONS = ['milk', 'coffee', 'apple', 'egg', 'banana', 'trash', 'box', 'cookie', 'cheese', 'tomato'];

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
