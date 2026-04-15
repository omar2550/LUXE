import { algoliasearch } from "algoliasearch";
import "dotenv/config";
import Product from "../models/product.model.js";
import connectDB from "./db.js";

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);

// async function testConnection() {
//   try {
//     // محاولة جلب قائمة الـ Indices الموجودة في حسابك
//     const indices = await algolia.listIndices();

//     console.log("✅ الاتصال ناجح!");
//     console.log("قائمة الـ Indices المتاحة لديك:", indices.items);
//   } catch (error) {
//     console.error("❌ فشل الاتصال! تأكد من الـ API Keys.");
//     console.error("السبب:", error.message);
//   }
// }

// testConnection();

// const migrateDataToAlgolia = async () => {
//   try {
//     await connectDB();
//     const products = await Product.find({});

//     const records = products.map((product) => ({
//       objectID: product._id.toString(),
//       name: product.name,
//       price: product.price,
//       thumbnail: product.images[0],
//       category: product.category,
//       description: product.description?.substring(0, 200),
//     }));

//     await algolia.saveObjects({
//       indexName: "products",
//       objects: records,
//     });

//     console.log(`✅ ${records.length} Done`);
//   } catch (error) {
//     console.error("ERROR:", error);
//   }
// };

// migrateDataToAlgolia();

export default algolia;
