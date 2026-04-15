import { productType } from "@/services/product.service";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: productType }) => {
  return (
    <div className="group relative cursor-pointer flex flex-col w-full hover-scale">
      <div className="aspect-[3/4] bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden ghost-border transition-all duration-300 group-hover:bg-surface-container-highest group-hover:glow-primary">
        <Link
          to={`/product/${product._id}`}
          className="absolute inset-0 z-10"
          aria-label={product.name}
        />

        <button
          className="absolute top-2 right-2 p-3 glass rounded-full z-20"
          onClick={() => {
            console.log("Added to wishlist");
          }}
        >
          <Heart size={18} className="text-on-surface" />
        </button>

        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-4 flex flex-col gap-1 px-2 relative">
        <h3 className="font-display text-lg font-medium text-on-surface tracking-tightest leading-tight">
          {product.name}
        </h3>

        <p className="font-body text-body-sm text-on-surface-variant line-clamp-1">
          {product.description}
        </p>

        {product.isFeatured && (
          <span className="absolute -top-3 right-0 text-[10px] font-display font-bold tracking-[0.2em] text-tertiary uppercase">
            Featured
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
