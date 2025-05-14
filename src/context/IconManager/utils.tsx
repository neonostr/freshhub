
import React from 'react';
import { IconOptionExtended } from '@/types/iconTypes';
import {
  FaApple, FaCarrot, FaCheese, FaWineBottle, FaWineGlass, FaCoffee, FaEgg, 
  FaCookieBite, FaBreadSlice, FaPizzaSlice, FaFish, FaBeer, FaIceCream, 
  FaLemon, FaBacon, FaHamburger, FaBirthdayCake, FaWater, FaCandyCane,
  FaBone, FaDrumstickBite, FaFilter
} from 'react-icons/fa';
import {
  GiWatermelon, GiGrapes, GiCherry, GiBanana, GiMilkCarton, GiSlicedBread,
  GiRoastChicken, GiSteak, GiBacon, GiSausage, GiCakeSlice, GiDonut,
  GiCupcake, GiTomato, GiPotato, GiOni, GiGarlic, GiAvocado, GiBroccoli,
  GiCabbage, GiCorn, GiCookie, GiMaceHead, GiMushroomHouse, GiBeanstalk,
  GiOlive, GiPeanut, GiBowlOfRice, GiPhone, GiSaltShaker, GiChiliPepper, GiPeach,
  GiPear, GiCoconuts, GiCupcake as GiMuffin, GiHotDog, GiNoodles, GiPopcorn, GiRiceBowl,
  GiOpenedFoodCan, GiSodaCan, GiWaterDrop, GiPorcelainVase
} from 'react-icons/gi';
import {
  BiSolidSad as BiSolidSalad, BiSolidCoffeeBean, BiSolidDrink, BiSolidCheese, 
  BiSolidHot as BiSolidSoup
} from 'react-icons/bi';
import {
  ImSpoonKnife
} from 'react-icons/im';
import {
  IoFastFoodSharp
} from 'react-icons/io5';
import {
  HiMiniBeaker
} from 'react-icons/hi2';
import { 
  TbBread, TbMilk, TbSalad, TbMeat, TbEggs, TbSoup, TbCheese, 
  TbBottle, TbApple, TbMushroom
} from 'react-icons/tb';
import { BsFillCircleFill } from 'react-icons/bs';

// Comprehensive mapping of food icons to appropriate React Icons
const iconMappings: Record<string, React.ComponentType<any>> = {
  // Dairy products
  'milk': TbMilk,
  'almondMilk': TbMilk,
  'cashewMilk': TbMilk,
  'coconutMilk': TbMilk,
  'cream': TbMilk,
  'oatMilk': TbMilk,
  'sourCream': TbMilk,
  'soyMilk': TbMilk,
  'buttermilk': TbMilk,
  'kefir': TbMilk,
  'yogurt': TbMilk,
  'cheese': TbCheese,
  'butter': BiSolidCheese,

  // Fruits
  'apples': FaApple,
  'apricots': GiPeach,
  'blackberries': GiCherry,
  'blueberries': GiCherry,
  'cherries': GiCherry,
  'bananas': GiBanana,
  'coconuts': GiCoconuts,
  'cranberries': GiCherry,
  'grapes': GiGrapes,
  'kiwi': FaLemon,
  'mangoes': GiPeach,
  'oranges': FaLemon,
  'peaches': GiPeach,
  'pears': GiPear,
  'pineapple': GiPeach,
  'plums': GiPeach,
  'raisins': GiGrapes,
  'raspberries': GiCherry,
  'strawberries': GiCherry,
  'watermelon': GiWatermelon,

  // Vegetables
  'asparagus': BiSolidSalad,
  'avocados': GiAvocado,
  'basil': BiSolidSalad,
  'bellPepper': GiChiliPepper,
  'broccoli': GiBroccoli,
  'carrots': FaCarrot,
  'cauliflower': GiCabbage,
  'corn': GiCorn,
  'cucumbers': FaCarrot,
  'garlic': GiGarlic,
  'greenBeans': GiBeanstalk,
  'kale': BiSolidSalad,
  'lettuce': TbSalad,
  'mushrooms': GiMushroomHouse,
  'olives': GiOlive,
  'onions': GiOni,
  'peas': GiBeanstalk,
  'potatoes': GiPotato,
  'spinach': BiSolidSalad,
  'tomatoes': GiTomato,

  // Meat and Poultry
  'bacon': FaBacon,
  'beef': TbMeat,
  'chicken': GiRoastChicken,
  'ham': GiBacon,
  'lamb': TbMeat,
  'pork': TbMeat,
  'prosciutto': GiBacon,
  'sausages': GiSausage,
  'steaks': GiSteak,
  'turkey': FaDrumstickBite,

  // Seafood
  'crab': FaFish,
  'fish': FaFish,
  'lobster': FaFish,
  'scallops': FaFish,
  'shrimp': FaFish,
  'tuna': FaFish,

  // Baked Goods
  'bagels': FaBreadSlice,
  'biscotti': FaCookieBite,
  'bread': TbBread,
  'cake': GiCakeSlice,
  'cookies': GiCookie,
  'crackers': GiMaceHead,
  'muffins': GiMuffin,
  'pretzels': FaBreadSlice,
  'scones': GiCupcake,
  'tortillas': FaBreadSlice,

  // Prepared Foods and Others
  'appleJuice': HiMiniBeaker,
  'beans': GiBeanstalk,
  'cashews': GiPeanut,
  'cereals': GiBowlOfRice,
  'chips': GiMaceHead,
  'coffee': FaCoffee,
  'eggs': TbEggs,
  'granola': GiMaceHead,
  'iceCream': FaIceCream,
  'oliveOil': HiMiniBeaker,
  'orangeJuice': HiMiniBeaker,
  'pasta': GiNoodles,
  'pecans': GiPeanut,
  'pizza': FaPizzaSlice,
  'popcorn': GiPopcorn,
  'redWine': FaWineGlass,
  'rice': GiRiceBowl,
  'soda': GiSodaCan,
  'tomatoSauce': BiSolidSoup,
  'vinegars': HiMiniBeaker,
  'walnuts': GiPeanut,
  'water': GiWaterDrop,
  'whiteWine': FaWineBottle,
  'almonds': GiPeanut,
  'waterFilter': FaFilter,
  'honey': GiPhone,  // Using GiPhone as substitute for honey
};

// Function to render a food icon from its name
export const renderFoodIcon = (iconName: string, className = "h-5 w-5") => {
  // Ensure we have a valid icon name
  if (!iconName) {
    console.error("No icon name provided to renderFoodIcon");
    iconName = 'apple'; // Default fallback
  }
  
  // Get the component from our mappings
  const IconComponent = iconMappings[iconName];
  
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  
  console.warn(`Icon "${iconName}" not found in food icon mappings, using fallback`);
  return <BsFillCircleFill className={className} />;
};

// Create icon component from name
export const createIconFromName = (iconName: string, className = "h-5 w-5") => {
  // Ensure we have a valid icon name
  if (!iconName) {
    console.error("No icon name provided to createIconFromName");
    iconName = 'apple'; // Default fallback
  }
  
  console.log(`Creating icon from name: ${iconName}`);
  
  return renderFoodIcon(iconName, className);
};

// Create serializable product data for storage
export const createSerializableProducts = (
  products: Record<string, IconOptionExtended>
) => {
  return Object.entries(products).reduce((acc, [key, product]) => {
    // Ensure iconName is stored properly - this is a critical fix
    const iconName = product.iconName || 'apple';
    console.log(`Serializing product ${product.label} with icon: ${iconName}`);
    
    // Store only the essential data without the React element
    return {
      ...acc,
      [key]: {
        value: product.value,
        label: product.label,
        shelfLife: product.shelfLife,
        // Store icon name explicitly to ensure it's retained
        iconName: iconName
      }
    };
  }, {} as Record<string, Omit<IconOptionExtended, 'icon'> & { iconName: string }>);
};

// Reconstruct custom products from storage
export const reconstructProductsFromStorage = (
  savedData: string
): Record<string, IconOptionExtended> => {
  try {
    // Parse the saved custom products
    const parsed = JSON.parse(savedData);
    const reconstructedProducts: Record<string, IconOptionExtended> = {};
    
    for (const [key, product] of Object.entries(parsed)) {
      const productData = product as Partial<IconOptionExtended>;
      
      if (productData.value && productData.label && productData.shelfLife) {
        // Use the stored icon name or default to 'apple' only if iconName is undefined
        const iconName = productData.iconName || 'apple';
        console.log(`Reconstructing product ${productData.label} with icon: ${iconName}`);
        
        // Create the icon component from the stored name
        const iconElement = createIconFromName(iconName);
        
        // Create the fully reconstructed product
        reconstructedProducts[key] = {
          value: productData.value,
          label: productData.label,
          shelfLife: productData.shelfLife,
          icon: iconElement as React.ReactElement,
          iconName: iconName // Store the icon name explicitly
        };
      }
    }
    
    return reconstructedProducts;
  } catch (e) {
    console.error("Error parsing custom products:", e);
    return {};
  }
};
