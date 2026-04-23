import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddToCart } from "@/hooks/useCart";
import { useProduct } from "@/hooks/useProduct";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useProduct(id);

  const [image, setImage] = useState(product?.images[0]);

  // Will be Active Soon
  // const [color, setColor] = useState("red");
  // product[0].colors[0]

  const { mutate, isPending } = useAddToCart();
  const handelAddToCart = () => {
    mutate(id);
  };

  return (
    <section className="bg-surface px-2 py-8 sm:pl-4 sm:pr-8 sm:py-16">
      <div className="sm:grid grid-cols-2 gap-12">
        {/* Images */}
        <div>
          {isLoading ? (
            <Skeleton className="aspect-[3/4] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
          ) : (
            <img
              src={image || product?.images[0]}
              alt="image"
              className=" object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner"
            />
          )}
          <div className="grid grid-cols-3 gap-2 mt-5">
            {product?.images.map((img) => (
              <img
                key={img}
                src={img}
                alt="img"
                className="rounded-md ghost-border !border-2 sm:!border-4 cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
        </div>
        {/* details */}
        <div className="mt-6 sm:mt-0">
          {isLoading ? (
            <Skeleton className="h-4 w-1/3" />
          ) : (
            <h3 className="text-3xl font-bold">{product?.name}</h3>
          )}

          {isLoading ? (
            <Skeleton className="h-4 w-full mb-6 mt-1" />
          ) : (
            <p className="text-sm text-on-surface/50 leading-6 mb-6 mt-1">
              {product?.description}
            </p>
          )}

          <div className="flex items-center gap-1 mb-2">
            {isLoading ? (
              <Skeleton className="h-4 w-1/3" />
            ) : (
              <p className="text-lg text-primary">
                ${product?.price.toFixed(2)}
              </p>
            )}
            {/* {isLoading ? (
              <Skeleton className="h-4 w-1/3" />
            ) : (
              <p className="line-through text-muted">$111</p>
            )} */}
          </div>

          {/* <div>
            <p className="text-body-sm text-on-surface/50">Select Finish</p>
            <div className="flex items-center gap-3">
              {isLoading
                ? ["", "", "", ""].map((c, i) => (
                  <Skeleton
                    key={c + i}
                    className={`w-5 h-5 mt-3 p-1 cursor-pointer rounded-full border-8 border-transparent outline ${color === c ? "outline-primary" : "outline-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))
                : ["red", "black", "blue", "yellow"].map((c) => (
                  <div
                    key={c}
                    className={`w-5 h-5 mt-3 p-1 cursor-pointer rounded-full border-8 border-transparent outline ${color === c ? "outline-primary" : "outline-transparent"}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                  />
                ))}
            </div>
          </div> */}

          <Button
            className={
              "flex w-full bg-signature-gradient uppercase text-surface py-3 rounded-3xl font-medium mt-6 mb-3 hover:glow-primary !duration-500 !transition-all"
            }
            onClick={handelAddToCart}
            disabled={isPending}
          >
            <ShoppingBag />
            Add To Cart
          </Button>
          <Button
            disabled
            className={
              "flex w-full glass uppercase text-primary py-4 rounded-3xl font-medium ghost-border !border-[2px]"
            }
          >
            Add To Wishlist
          </Button>
        </div>
      </div>
      {/* suggestion products */}
      {/* <div className="mt-20">
        <h4 className="text-2xl mb-5">Curated Pairings</h4>
        <div className="grid xs:grid-cols-2 md:grid-cols-4 gap-4">
          {suggestionProducts.map((p, i) => (
            <ProductCard product={p} key={i} />
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default ProductDetails;
