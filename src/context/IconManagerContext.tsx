import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Accessibility, Activity, Airplay, AlarmClock, Album, AlignCenter, Ambulance, Ampersand, Anchor, Angry, 
  Annoyed, Antenna, Apple, Archive, Armchair, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Asterisk, 
  AtSign, Baby, Backpack, Badge, Bag, Banana, Bandage, Bank, Barcode, BatteryFull, BatteryLow, 
  BatteryMedium, BatteryWarning, Bean, Bed, Beer, Bell, Bike, Bird, Bitcoin, Book, Bookmark, Box, 
  Briefcase, Brush, Bug, Building, Bus, Cake, Calculator, Calendar, Camera, Candy, Car, Carrot, 
  CassetteTape, Cast, Cat, ChartBar, ChartPie, Check, Cherry, ChevronDown, ChevronLeft, ChevronRight, 
  ChevronUp, Chrome, Church, Cigarette, Circle, Clipboard, Clock, Cloud, Code, Coffee, Cog, Coins, 
  Command, Compass, Computer, Cone, Construction, Contact, Container, Contrast, Cookie, Copy, Copyright, 
  CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, 
  CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Cross, Crown, CupSoda, Database, Delete, Diamond, 
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Disc, Divide, Dna, Dog, DollarSign, Donut, DoorClosed, 
  DoorOpen, Download, Draft, Droplet, Ear, Earth, Egg, Ellipsis, Eraser, Euro, Expand, ExternalLink, 
  Eye, Facebook, Factory, Fan, FastForward, Feather, File, Film, Filter, Fingerprint, FireExtinguisher, 
  Fish, Flag, Flame, Flashlight, FlaskRound, Flower, Folder, Folders, Football, Fork, Frame, Gamepad, 
  Gavel, Gem, Gift, GitBranch, Github, GlassWater, Glasses, Globe, GraduationCap, Grape, Grid, Group, 
  Guitar, Hammer, Hand, HardDrive, HardHat, Hash, Headphones, Headset, Heart, HelpCircle, Hexagon, 
  History, Home, Hourglass, House, Image, Inbox, Info, Instagram, Italic, Key, Keyboard, Lamp, Laptop, 
  Layers, LayoutDashboard, Leaf, LifeBuoy, Lightbulb, Link, Linkedin, List, Loader, Locate, Lock, LogIn, 
  LogOut, Lollipop, Luggage, Magnet, Mail, Map, Martini, Maximize, Medal, Menu, MessageCircle, Mic, 
  Milk, Minimize, Minus, Monitor, Moon, MoreHorizontal, MoreVertical, MousePointer, Move, Music, 
  Navigation, Network, Newspaper, Note, Notebook, Nut, Octagon, Package, PaintBucket, Paintbrush, 
  Palette, Paperclip, Pause, Pen, Percent, Phone, PictureInPicture, PieChart, Pill, Pin, Pizza, Plane, 
  Play, Plus, Pocket, PoundSterling, Power, Printer, Puzzle, QrCode, Quote, Rabbit, Radio, Receipt, 
  Rectangle, Recycle, Redo, RefreshCw, Regex, Repeat, Reply, Rewind, Ribbon, Rocket, RotateCw, Route, 
  Rss, Ruler, Salad, Save, Scale, Scissors, ScreenShare, Search, Send, Server, Settings, Share, Shield, 
  ShoppingBag, ShoppingCart, Shovel, Shrink, Shuffle, Sidebar, Sigma, Signal, SkipBack, SkipForward, 
  Skull, Slash, SlidersHorizontal, Smartphone, Smile, Snowflake, Sofa, SortAsc, SortDesc, Speaker, 
  SpellCheck, Square, Star, StopCircle, Store, Suitcase, Sun, Sunglasses, Sandwich, Tag, Target, Taxi, 
  Telescope, Terminal, Text, Thermometer, ThumbsDown, ThumbsUp, Ticket, Timer, ToggleLeft, ToggleRight, 
  Tool, Trash, Trash2, TrendingDown, TrendingUp, Trophy, Truck, Tv, Twitch, Twitter, Umbrella, 
  Underline, Undo, Unlink, Upload, User, Users, Utensils, Video, View, Voicemail, Volume, Wallet, Wand, 
  Watch, Wifi, Wind, Wine, Wrench, X, Youtube, Zap, ZoomIn, ZoomOut, ChefHat, Beef, IceCream, Croissant, 
  Drumstick
} from "lucide-react";

export type IconOption = {
  value: string;
  label: string;
  icon: React.ReactElement;
  shelfLife: number; // Default shelf life in days
};

// Define all possible icons - sorted alphabetically
export const ALL_ICONS: Record<string, IconOption> = {
  accessibility: { value: 'accessibility', label: 'Accessibility', icon: <Accessibility className="h-5 w-5" />, shelfLife: 7 },
  activity: { value: 'activity', label: 'Activity', icon: <Activity className="h-5 w-5" />, shelfLife: 7 },
  airplay: { value: 'airplay', label: 'Airplay', icon: <Airplay className="h-5 w-5" />, shelfLife: 7 },
  alarmClock: { value: 'alarmClock', label: 'Alarm Clock', icon: <AlarmClock className="h-5 w-5" />, shelfLife: 7 },
  album: { value: 'album', label: 'Album', icon: <Album className="h-5 w-5" />, shelfLife: 7 },
  alignCenter: { value: 'alignCenter', label: 'Align Center', icon: <AlignCenter className="h-5 w-5" />, shelfLife: 7 },
  ambulance: { value: 'ambulance', label: 'Ambulance', icon: <Ambulance className="h-5 w-5" />, shelfLife: 7 },
  ampersand: { value: 'ampersand', label: 'Ampersand', icon: <Ampersand className="h-5 w-5" />, shelfLife: 7 },
  anchor: { value: 'anchor', label: 'Anchor', icon: <Anchor className="h-5 w-5" />, shelfLife: 7 },
  angry: { value: 'angry', label: 'Angry', icon: <Angry className="h-5 w-5" />, shelfLife: 7 },
  annoyed: { value: 'annoyed', label: 'Annoyed', icon: <Annoyed className="h-5 w-5" />, shelfLife: 7 },
  antenna: { value: 'antenna', label: 'Antenna', icon: <Antenna className="h-5 w-5" />, shelfLife: 7 },
  apple: { value: 'apple', label: 'Apple', icon: <Apple className="h-5 w-5" />, shelfLife: 5 },
  archive: { value: 'archive', label: 'Archive', icon: <Archive className="h-5 w-5" />, shelfLife: 7 },
  armchair: { value: 'armchair', label: 'Armchair', icon: <Armchair className="h-5 w-5" />, shelfLife: 7 },
  arrowDown: { value: 'arrowDown', label: 'Arrow Down', icon: <ArrowDown className="h-5 w-5" />, shelfLife: 7 },
  arrowLeft: { value: 'arrowLeft', label: 'Arrow Left', icon: <ArrowLeft className="h-5 w-5" />, shelfLife: 7 },
  arrowRight: { value: 'arrowRight', label: 'Arrow Right', icon: <ArrowRight className="h-5 w-5" />, shelfLife: 7 },
  arrowUp: { value: 'arrowUp', label: 'Arrow Up', icon: <ArrowUp className="h-5 w-5" />, shelfLife: 7 },
  asterisk: { value: 'asterisk', label: 'Asterisk', icon: <Asterisk className="h-5 w-5" />, shelfLife: 7 },
  atSign: { value: 'atSign', label: 'At Sign', icon: <AtSign className="h-5 w-5" />, shelfLife: 7 },
  baby: { value: 'baby', label: 'Baby', icon: <Baby className="h-5 w-5" />, shelfLife: 7 },
  backpack: { value: 'backpack', label: 'Backpack', icon: <Backpack className="h-5 w-5" />, shelfLife: 7 },
  badge: { value: 'badge', label: 'Badge', icon: <Badge className="h-5 w-5" />, shelfLife: 7 },
  bag: { value: 'bag', label: 'Bag', icon: <Bag className="h-5 w-5" />, shelfLife: 7 },
  banana: { value: 'banana', label: 'Banana', icon: <Banana className="h-5 w-5" />, shelfLife: 5 },
  bandage: { value: 'bandage', label: 'Bandage', icon: <Bandage className="h-5 w-5" />, shelfLife: 30 },
  bank: { value: 'bank', label: 'Bank', icon: <Bank className="h-5 w-5" />, shelfLife: 7 },
  barcode: { value: 'barcode', label: 'Barcode', icon: <Barcode className="h-5 w-5" />, shelfLife: 7 },
  batteryFull: { value: 'batteryFull', label: 'Battery Full', icon: <BatteryFull className="h-5 w-5" />, shelfLife: 7 },
  batteryLow: { value: 'batteryLow', label: 'Battery Low', icon: <BatteryLow className="h-5 w-5" />, shelfLife: 7 },
  batteryMedium: { value: 'batteryMedium', label: 'Battery Medium', icon: <BatteryMedium className="h-5 w-5" />, shelfLife: 7 },
  batteryWarning: { value: 'batteryWarning', label: 'Battery Warning', icon: <BatteryWarning className="h-5 w-5" />, shelfLife: 7 },
  bean: { value: 'bean', label: 'Bean', icon: <Bean className="h-5 w-5" />, shelfLife: 7 },
  bed: { value: 'bed', label: 'Bed', icon: <Bed className="h-5 w-5" />, shelfLife: 7 },
  beef: { value: 'beef', label: 'Beef', icon: <Beef className="h-5 w-5" />, shelfLife: 3 },
  beer: { value: 'beer', label: 'Beer', icon: <Beer className="h-5 w-5" />, shelfLife: 5 },
  bell: { value: 'bell', label: 'Bell', icon: <Bell className="h-5 w-5" />, shelfLife: 7 },
  bike: { value: 'bike', label: 'Bike', icon: <Bike className="h-5 w-5" />, shelfLife: 7 },
  bird: { value: 'bird', label: 'Bird', icon: <Bird className="h-5 w-5" />, shelfLife: 7 },
  bitcoin: { value: 'bitcoin', label: 'Bitcoin', icon: <Bitcoin className="h-5 w-5" />, shelfLife: 7 },
  book: { value: 'book', label: 'Book', icon: <Book className="h-5 w-5" />, shelfLife: 7 },
  bookmark: { value: 'bookmark', label: 'Bookmark', icon: <Bookmark className="h-5 w-5" />, shelfLife: 7 },
  box: { value: 'box', label: 'Generic', icon: <Box className="h-5 w-5" />, shelfLife: 7 },
  briefcase: { value: 'briefcase', label: 'Briefcase', icon: <Briefcase className="h-5 w-5" />, shelfLife: 7 },
  brush: { value: 'brush', label: 'Brush', icon: <Brush className="h-5 w-5" />, shelfLife: 7 },
  bug: { value: 'bug', label: 'Bug', icon: <Bug className="h-5 w-5" />, shelfLife: 7 },
  building: { value: 'building', label: 'Building', icon: <Building className="h-5 w-5" />, shelfLife: 7 },
  bus: { value: 'bus', label: 'Bus', icon: <Bus className="h-5 w-5" />, shelfLife: 7 },
  cake: { value: 'cake', label: 'Cake', icon: <Cake className="h-5 w-5" />, shelfLife: 5 },
  calculator: { value: 'calculator', label: 'Calculator', icon: <Calculator className="h-5 w-5" />, shelfLife: 7 },
  calendar: { value: 'calendar', label: 'Calendar', icon: <Calendar className="h-5 w-5" />, shelfLife: 7 },
  camera: { value: 'camera', label: 'Camera', icon: <Camera className="h-5 w-5" />, shelfLife: 7 },
  candy: { value: 'candy', label: 'Candy', icon: <Candy className="h-5 w-5" />, shelfLife: 14 },
  car: { value: 'car', label: 'Car', icon: <Car className="h-5 w-5" />, shelfLife: 7 },
  carrot: { value: 'carrot', label: 'Carrot', icon: <Carrot className="h-5 w-5" />, shelfLife: 5 },
  cassetteTape: { value: 'cassetteTape', label: 'Cassette Tape', icon: <CassetteTape className="h-5 w-5" />, shelfLife: 7 },
  cast: { value: 'cast', label: 'Cast', icon: <Cast className="h-5 w-5" />, shelfLife: 7 },
  cat: { value: 'cat', label: 'Cat', icon: <Cat className="h-5 w-5" />, shelfLife: 7 },
  chartBar: { value: 'chartBar', label: 'Chart Bar', icon: <ChartBar className="h-5 w-5" />, shelfLife: 7 },
  chartPie: { value: 'chartPie', label: 'Chart Pie', icon: <ChartPie className="h-5 w-5" />, shelfLife: 7 },
  check: { value: 'check', label: 'Check', icon: <Check className="h-5 w-5" />, shelfLife: 7 },
  chefHat: { value: 'chefHat', label: 'Chef Hat', icon: <ChefHat className="h-5 w-5" />, shelfLife: 7 },
  cherry: { value: 'cherry', label: 'Cherry', icon: <Cherry className="h-5 w-5" />, shelfLife: 5 },
  chevronDown: { value: 'chevronDown', label: 'Chevron Down', icon: <ChevronDown className="h-5 w-5" />, shelfLife: 7 },
  chevronLeft: { value: 'chevronLeft', label: 'Chevron Left', icon: <ChevronLeft className="h-5 w-5" />, shelfLife: 7 },
  chevronRight: { value: 'chevronRight', label: 'Chevron Right', icon: <ChevronRight className="h-5 w-5" />, shelfLife: 7 },
  chevronUp: { value: 'chevronUp', label: 'Chevron Up', icon: <ChevronUp className="h-5 w-5" />, shelfLife: 7 },
  chrome: { value: 'chrome', label: 'Chrome', icon: <Chrome className="h-5 w-5" />, shelfLife: 7 },
  church: { value: 'church', label: 'Church', icon: <Church className="h-5 w-5" />, shelfLife: 7 },
  cigarette: { value: 'cigarette', label: 'Cigarette', icon: <Cigarette className="h-5 w-5" />, shelfLife: 7 },
  circle: { value: 'circle', label: 'Circle', icon: <Circle className="h-5 w-5" />, shelfLife: 7 },
  clipboard: { value: 'clipboard', label: 'Clipboard', icon: <Clipboard className="h-5 w-5" />, shelfLife: 7 },
  clock: { value: 'clock', label: 'Clock', icon: <Clock className="h-5 w-5" />, shelfLife: 7 },
  cloud: { value: 'cloud', label: 'Cloud', icon: <Cloud className="h-5 w-5" />, shelfLife: 7 },
  code: { value: 'code', label: 'Code', icon: <Code className="h-5 w-5" />, shelfLife: 7 },
  coffee: { value: 'coffee', label: 'Coffee', icon: <Coffee className="h-5 w-5" />, shelfLife: 14 },
  cog: { value: 'cog', label: 'Cog', icon: <Cog className="h-5 w-5" />, shelfLife: 7 },
  coins: { value: 'coins', label: 'Coins', icon: <Coins className="h-5 w-5" />, shelfLife: 7 },
  command: { value: 'command', label: 'Command', icon: <Command className="h-5 w-5" />, shelfLife: 7 },
  compass: { value: 'compass', label: 'Compass', icon: <Compass className="h-5 w-5" />, shelfLife: 7 },
  computer: { value: 'computer', label: 'Computer', icon: <Computer className="h-5 w-5" />, shelfLife: 7 },
  cone: { value: 'cone', label: 'Cone', icon: <Cone className="h-5 w-5" />, shelfLife: 7 },
  construction: { value: 'construction', label: 'Construction', icon: <Construction className="h-5 w-5" />, shelfLife: 7 },
  contact: { value: 'contact', label: 'Contact', icon: <Contact className="h-5 w-5" />, shelfLife: 7 },
  container: { value: 'container', label: 'Container', icon: <Container className="h-5 w-5" />, shelfLife: 7 },
  contrast: { value: 'contrast', label: 'Contrast', icon: <Contrast className="h-5 w-5" />, shelfLife: 7 },
  cookie: { value: 'cookie', label: 'Cookie', icon: <Cookie className="h-5 w-5" />, shelfLife: 5 },
  copy: { value: 'copy', label: 'Copy', icon: <Copy className="h-5 w-5" />, shelfLife: 7 },
  copyright: { value: 'copyright', label: 'Copyright', icon: <Copyright className="h-5 w-5" />, shelfLife: 7 },
  cornerDownLeft: { value: 'cornerDownLeft', label: 'Corner Down Left', icon: <CornerDownLeft className="h-5 w-5" />, shelfLife: 7 },
  cornerDownRight: { value: 'cornerDownRight', label: 'Corner Down Right', icon: <CornerDownRight className="h-5 w-5" />, shelfLife: 7 },
  cornerLeftDown: { value: 'cornerLeftDown', label: 'Corner Left Down', icon: <CornerLeftDown className="h-5 w-5" />, shelfLife: 7 },
  cornerLeftUp: { value: 'cornerLeftUp', label: 'Corner Left Up', icon: <CornerLeftUp className="h-5 w-5" />, shelfLife: 7 },
  cornerRightDown: { value: 'cornerRightDown', label: 'Corner Right Down', icon: <CornerRightDown className="h-5 w-5" />, shelfLife: 7 },
  cornerRightUp: { value: 'cornerRightUp', label: 'Corner Right Up', icon: <CornerRightUp className="h-5 w-5" />, shelfLife: 7 },
  cornerUpLeft: { value: 'cornerUpLeft', label: 'Corner Up Left', icon: <CornerUpLeft className="h-5 w-5" />, shelfLife: 7 },
  cornerUpRight: { value: 'cornerUpRight', label: 'Corner Up Right', icon: <CornerUpRight className="h-5 w-5" />, shelfLife: 7 },
  cpu: { value: 'cpu', label: 'CPU', icon: <Cpu className="h-5 w-5" />, shelfLife: 7 },
  creditCard: { value: 'creditCard', label: 'Credit Card', icon: <CreditCard className="h-5 w-5" />, shelfLife: 7 },
  croissant: { value: 'croissant', label: 'Croissant', icon: <Croissant className="h-5 w-5" />, shelfLife: 5 },
  crop: { value: 'crop', label: 'Crop', icon: <Crop className="h-5 w-5" />, shelfLife: 7 },
  cross: { value: 'cross', label: 'Cross', icon: <Cross className="h-5 w-5" />, shelfLife: 7 },
  crown: { value: 'crown', label: 'Crown', icon: <Crown className="h-5 w-5" />, shelfLife: 7 },
  cupSoda: { value: 'cupSoda', label: 'Cup Soda', icon: <CupSoda className="h-5 w-5" />, shelfLife: 3 },
  database: { value: 'database', label: 'Database', icon: <Database className="h-5 w-5" />, shelfLife: 7 },
  delete: { value: 'delete', label: 'Delete', icon: <Delete className="h-5 w-5" />, shelfLife: 7 },
  diamond: { value: 'diamond', label: 'Diamond', icon: <Diamond className="h-5 w-5" />, shelfLife: 7 },
  dice1: { value: 'dice1', label: 'Dice 1', icon: <Dice1 className="h-5 w-5" />, shelfLife: 7 },
  dice2: { value: 'dice2', label: 'Dice 2', icon: <Dice2 className="h-5 w-5" />, shelfLife: 7 },
  dice3: { value: 'dice3', label: 'Dice 3', icon: <Dice3 className="h-5 w-5" />, shelfLife: 7 },
  dice4: { value: 'dice4', label: 'Dice 4', icon: <Dice4 className="h-5 w-5" />, shelfLife: 7 },
  dice5: { value: 'dice5', label: 'Dice 5', icon: <Dice5 className="h-5 w-5" />, shelfLife: 7 },
  dice6: { value: 'dice6', label: 'Dice 6', icon: <Dice6 className="h-5 w-5" />, shelfLife: 7 },
  disc: { value: 'disc', label: 'Disc', icon: <Disc className="h-5 w-5" />, shelfLife: 7 },
  divide: { value: 'divide', label: 'Divide', icon: <Divide className="h-5 w-5" />, shelfLife: 7 },
  dna: { value: 'dna', label: 'DNA', icon: <Dna className="h-5 w-5" />, shelfLife: 7 },
  dog: { value: 'dog', label: 'Dog', icon: <Dog className="h-5 w-5" />, shelfLife: 7 },
  dollarSign: { value: 'dollarSign', label: 'Dollar Sign', icon: <DollarSign className="h-5 w-5" />, shelfLife: 7 },
  donut: { value: 'donut', label: 'Donut', icon: <Donut className="h-5 w-5" />, shelfLife: 5 },
  doorClosed: { value: 'doorClosed', label: 'Door Closed', icon: <DoorClosed className="h-5 w-5" />, shelfLife: 7 },
  doorOpen: { value: 'doorOpen', label: 'Door Open', icon: <DoorOpen className="h-5 w-5" />, shelfLife: 7 },
  download: { value: 'download', label: 'Download', icon: <Download className="h-5 w-5" />, shelfLife: 7 },
  draft: { value: 'draft', label: 'Draft', icon: <Draft className="h-5 w-5" />, shelfLife: 7 },
  droplet: { value: 'droplet', label: 'Droplet', icon: <Droplet className="h-5 w-5" />, shelfLife: 7 },
  drumstick: { value: 'drumstick', label: 'Chicken', icon: <Drumstick className="h-5 w-5" />, shelfLife: 3 },
  ear: { value: 'ear', label: 'Ear', icon: <Ear className="h-5 w-5" />, shelfLife: 7 },
  earth: { value: 'earth', label: 'Earth', icon: <Earth className="h-5 w-5" />, shelfLife: 7 },
  egg: { value: 'egg', label: 'Egg', icon: <Egg className="h-5 w-5" />, shelfLife: 14 },
  ellipsis: { value: 'ellipsis', label: 'Ellipsis', icon: <Ellipsis className="h-5 w-5" />, shelfLife: 7 },
  eraser: { value: 'eraser', label: 'Eraser', icon: <Eraser className="h-5 w-5" />, shelfLife: 7 },
  euro: { value: 'euro', label: 'Euro', icon: <Euro className="h-5 w-5" />, shelfLife: 7 },
  expand: { value: 'expand', label: 'Expand', icon: <Expand className="h-5 w-5" />, shelfLife: 7 },
  externalLink: { value: 'externalLink', label: 'External Link', icon: <ExternalLink className="h-5 w-5" />, shelfLife: 7 },
  eye: { value: 'eye', label: 'Eye', icon: <Eye className="h-5 w-5" />, shelfLife: 7 },
  facebook: { value: 'facebook', label: 'Facebook', icon: <Facebook className="h-5 w-5" />, shelfLife: 7 },
  factory: { value: 'factory', label: 'Factory', icon: <Factory className="h-5 w-5" />, shelfLife: 7 },
  fan: { value: 'fan', label: 'Fan', icon: <Fan className="h-5 w-5" />, shelfLife: 7 },
  fastForward: { value: 'fastForward', label: 'Fast Forward', icon: <FastForward className="h-5 w-5" />, shelfLife: 7 },
  feather: { value: 'feather', label: 'Feather', icon: <Feather className="h-5 w-5" />, shelfLife: 7 },
  file: { value: 'file', label: 'File', icon: <File className="h-5 w-5" />, shelfLife: 7 },
  film: { value: 'film', label: 'Film', icon: <Film className="h-5 w-5" />, shelfLife: 7 },
  filter: { value: 'filter', label: 'Filter', icon: <Filter className="h-5 w-5" />, shelfLife: 7 },
  fingerprint: { value: 'fingerprint', label: 'Fingerprint', icon: <Fingerprint className="h-5 w-5" />, shelfLife: 7 },
  fireExtinguisher: { value: 'fireExtinguisher', label: 'Fire Extinguisher', icon: <FireExtinguisher className="h-5 w-5" />, shelfLife: 7 },
  fish: { value: 'fish', label: 'Fish', icon: <Fish className="h-5 w-5" />, shelfLife: 2 },
  flag: { value: 'flag', label: 'Flag', icon: <Flag className="h-5 w-5" />, shelfLife: 7 },
  flame: { value: 'flame', label: 'Flame', icon: <Flame className="h-5 w-5" />, shelfLife: 7 },
  flashlight: { value: 'flashlight', label: 'Flashlight', icon: <Flashlight className="h-5 w-5" />, shelfLife: 7 },
  flaskRound: { value: 'flaskRound', label: 'Flask Round', icon: <FlaskRound className="h-5 w-5" />, shelfLife: 7 },
  flower: { value: 'flower', label: 'Flower', icon: <Flower className="h-5 w-5" />, shelfLife: 7 },
  folder: { value: 'folder', label: 'Folder', icon: <Folder className="h-5 w-5" />, shelfLife: 7 },
  iceCream: { value: 'iceCream', label: 'Ice Cream', icon: <IceCream className="h-5 w-5" />, shelfLife: 7 },
  milk: { value: 'milk', label: 'Milk', icon: <Milk className="h-5 w-5" />, shelfLife: 7 },
  pizza: { value: 'pizza', label: 'Pizza', icon: <Pizza className="h-5 w-5" />, shelfLife: 3 },
  salad: { value: 'salad', label: 'Salad', icon: <Salad className="h-5 w-5" />, shelfLife: 5 },
  sandwich: { value: 'sandwich', label: 'Sandwich', icon: <Sandwich className="h-5 w-5" />, shelfLife: 3 },
  trash: { value: 'trash', label: 'Trash', icon: <Trash className="h-5 w-5" />, shelfLife: 7 },
  wine: { value: 'wine', label: 'Wine', icon: <Wine className="h-5 w-5" />, shelfLife: 7 }
};

// Default selected icons (initial state)
const DEFAULT_SELECTED_ICONS = ['milk', 'coffee', 'apple', 'egg', 'banana', 'trash', 'box', 'cookie', 'pizza'];

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
