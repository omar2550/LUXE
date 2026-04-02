import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

const ProductDetails = () => {
  const product = [
    {
      id: 1,
      name: "Ethereal Mono-Watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas nemo corporis placeat eos eveniet necessitatibus blanditiis hic omnis modi. Iste beatae eligendi nihil sunt adipisci harum nobis aut fugiat!",
      image: ["/1.png", "/2.png", "/3.png"],
      colors: ["black", "red", "blue"],
      isNew: true,
      price: 1500,
    },
  ];

  const suggestionProducts = [
    {
      id: 1,
      name: "Ethereal Mono-Watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas nemo corporis placeat eos eveniet necessitatibus blanditiis hic omnis modi. Iste beatae eligendi nihil sunt adipisci harum nobis aut fugiat!",
      image: ["/1.png", "/2.png", "/3.png"],
      colors: ["black", "red", "blue"],
      isNew: true,
      price: 1500,
    },
    {
      id: 1,
      name: "Ethereal Mono-Watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas nemo corporis placeat eos eveniet necessitatibus blanditiis hic omnis modi. Iste beatae eligendi nihil sunt adipisci harum nobis aut fugiat!",
      image: ["/1.png", "/2.png", "/3.png"],
      colors: ["black", "red", "blue"],
      isNew: true,
      price: 1500,
    },
    {
      id: 1,
      name: "Ethereal Mono-Watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas nemo corporis placeat eos eveniet necessitatibus blanditiis hic omnis modi. Iste beatae eligendi nihil sunt adipisci harum nobis aut fugiat!",
      image: ["/1.png", "/2.png", "/3.png"],
      colors: ["black", "red", "blue"],
      isNew: true,
      price: 1500,
    },
    {
      id: 1,
      name: "Ethereal Mono-Watch",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quas nemo corporis placeat eos eveniet necessitatibus blanditiis hic omnis modi. Iste beatae eligendi nihil sunt adipisci harum nobis aut fugiat!",
      image: ["/1.png", "/2.png", "/3.png"],
      colors: ["black", "red", "blue"],
      isNew: true,
      price: 1500,
    },
  ];
  const [image, setImage] = useState(product[0].image[0]);
  const [color, setColor] = useState(product[0].colors[0]);

  return (
    <section className="bg-surface px-2 py-8 sm:pl-4 sm:pr-8 sm:py-16">
      <div className="sm:grid grid-cols-3 gap-12">
        {/* Images */}
        <div className="col-span-2">
          <img
            src={image}
            alt="image"
            className="min-h- 96 w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner"
          />
          <div className="grid grid-cols-3 gap-2 mt-5">
            {product[0].image.map((img) => (
              <img
                src={img}
                alt="img"
                className="rounded-md ghost-border !border-2 sm:!border-4 cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
        </div>
        {/* details */}
        <div className="col-span-1 mt-6 sm:mt-0">
          <h3 className="text-3xl font-bold">{product[0].name}</h3>

          <div className="flex items-center gap-1">
            <p className="text-lg text-primary">
              ${product[0].price.toFixed(2)}
            </p>
            <p></p>
          </div>

          <p className="text-sm text-on-surface/50 leading-6 my-6">
            {product[0].description}
          </p>

          <div>
            <p className="text-body-sm text-on-surface/50">Select Finish</p>
            <div className="flex items-center gap-3">
              {product[0].colors.map((c) => (
                <div
                  className={`w-5 h-5 mt-3 p-1 cursor-pointer rounded-full border-8 border-transparent outline ${color === c ? "outline-primary" : "outline-transparent"}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <Button
            className={
              "flex w-full bg-signature-gradient uppercase text-surface py-4 rounded-3xl font-medium !mt-6 mb-3 hover:glow-primary !duration-500 !transition-all"
            }
          >
            <ShoppingBag />
            Add To Cart
          </Button>
          <Button
            className={
              "flex w-full glass uppercase text-primary py-4 rounded-3xl font-medium ghost-border !border-[2px]"
            }
          >
            Add To Wishlist
          </Button>
        </div>
      </div>
      {/*  */}
      <div className="mt-20">
        <h4 className="text-2xl mb-5">Curated Pairings</h4>
        <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
          {suggestionProducts.map((p, i) => (
            <ProductCard product={p} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
