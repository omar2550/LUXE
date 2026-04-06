import { faker } from "@faker-js/faker";
import cloudinary from "./config/cloudinary.js";
import Product from "./models/product.model.js";
import connectDB from "./config/db.js";
import axios from "axios"; // هنحتاج axios لطلب الـ API


const realProductsInfo = [
  {
    category: "Electronics",
    productKeywords: ["laptop", "smartphone", "headphones", "smartwatch", "tablet", "camera", "console", "speaker"],
    brands: ["Apple", "Samsung", "Sony", "Dell", "HP", "Asus", "Bose", "Google", "Microsoft", "Logitech", "Nikon", "Nintendo"],
    models: ["Pro Ultra", "Next-Gen", "Wireless Z", "Elite Series", "Vanguard", "Zenith", "Quantum Edition", "Alpha v2", "Master Class"],
  },
  {
    category: "Furniture",
    productKeywords: ["sofa", "desk", "chair", "bed", "bookshelf", "table", "wardrobe", "cupboard"],
    brands: ["IKEA", "Ashley", "West Elm", "Pottery Barn", "Herman Miller", "Wayfair", "Crate & Barrel", "Roche Bobois", "Steelcase"],
    models: ["Minimalist", "Ergo-Comfort", "Nordic Style", "Modern Loft", "Heritage", "Urban Edge", "Rustic Oak", "Velvet Luxury", "Eco-Friendly"],
  },
  {
    category: "Clothing",
    productKeywords: ["jacket", "sneakers", "hoodie", "t-shirt", "jeans", "dress", "suit", "backpack"],
    brands: ["Nike", "Adidas", "Zara", "Levis", "North Face", "Puma", "Gucci", "Ralph Lauren", "H&M", "Patagonia", "Under Armour"],
    models: ["Streetwear", "Urban Edition", "Classic Fit", "Performance", "Retro", "Limited Drop", "All-Season", "Cloud-Walk", "Signature Series"],
  },
  {
    category: "Home Decor",
    productKeywords: ["lamp", "vase", "mirror", "painting", "clock", "candle", "rug", "plant"],
    brands: ["Philips Hue", "Artemide", "Target Home", "Wayfair Basics", "Zara Home", "Anthropologie", "Jonathan Adler", "CB2", "Nest"],
    models: ["Ambient Light", "Luxury Touch", "Industrial", "Boho Chic", "Edison", "Golden Glow", "Abstract Series", "Marble Finish", "Zen Style"],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    // console.log("🧹 Cleaning old products...");
    // await Product.deleteMany({});

    const products = [];
    const totalProducts = 30;
    console.log(`🚀 Starting professional seeding with Unsplash API...`);

    for (let i = 0; i < totalProducts; i++) {
      const base = faker.helpers.arrayElement(realProductsInfo);
      const productKeyword = faker.helpers.arrayElement(base.productKeywords);
      const brand = faker.helpers.arrayElement(base.brands);
      const model = faker.helpers.arrayElement(base.models);
      
      const productName = `${brand} ${productKeyword.charAt(0).toUpperCase() + productKeyword.slice(1)} - ${model}`;
      const cleanBrand = brand.toLowerCase().replace(/\s+/g, '-');
      const cleanModel = model.toLowerCase().replace(/\s+/g, '-');
      const seoFriendlyName = `${cleanBrand}-${productKeyword}-${cleanModel}`.replace(/[^a-z0-9-]/g, '');

      let finalImageUrl = "";

      try {
        // --- استخدام Unsplash API الرسمي لجلب رابط صورة حقيقي ---
        const response = await axios.get(`https://api.unsplash.com/photos/random`, {
          params: {
            query: `${productKeyword} product`, // بنبحث بالنوع + كلمة product لدقة أعلى
            client_id: "xU7wQScKxJZqFqeZzI6LdjWsQhpiAQRAvpV3JDFTPzY",
            orientation: "squarish"
          }
        });

        // الرابط اللي جاي من API رسمي ومستقر جداً
        // هنضيف له بيانات المنتج في الـ URL برضه زي ما تحب
        finalImageUrl = `${response.data.urls.regular}&brand=${cleanBrand}&model=${cleanModel}&product_name=${seoFriendlyName}`;
        
        console.log(`[${i + 1}/${totalProducts}] Photo Found: ${productName}...${finalImageUrl}`);

        const uploadRes = await cloudinary.uploader.upload(finalImageUrl, {
          folder: "products",
          public_id: `${seoFriendlyName}-${i}`, 
          overwrite: true,
          transformation: [
            { width: 1000, height: 1000, crop: "fill", gravity: "center" },
            { fetch_format: "webp", quality: "auto" }
          ]
        });

        products.push({
          name: productName,
          description: `Premium ${productName} from ${brand}. ${faker.commerce.productDescription()} Built for durability and style.`,
          price: parseFloat(faker.commerce.price({ min: 100, max: 1500 })),
          images: [uploadRes.secure_url],
          stock: faker.number.int({ min: 5, max: 50 }),
          category: base.category,
        });

        // تأخير بسيط (اختياري) عشان نتجنب الـ Rate Limit بتاع Unsplash (50 طلب في الساعة للـ Demo)
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`❌ Error fetching/uploading ${productName}:`, error.response?.data || error.message);
      }
    }

    if (products.length > 0) {
      await Product.insertMany(products);
      console.log(`✅ SUCCESS! ${products.length} products inserted.`);
    }
    
    process.exit();
  } catch (error) {
    console.error("❌ General Error:", error);
    process.exit(1);
  }
};

seedProducts();