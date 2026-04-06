import { Skeleton } from "@/components/ui/skeleton";
import { useProductsByCat } from "@/hooks/useProduct";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  // bade very bade
  const { data: clothing, isLoading: isClothingLoading } =
    useProductsByCat("Clothing");
  const { data: electronics, isLoading: isElectronicsLoading } =
    useProductsByCat("Electronics");
  const { data: homeDecor, isLoading: isHomeDecorLoading } =
    useProductsByCat("Home Decor");
  const { data: furniture, isLoading: isFurnitureLoading } =
    useProductsByCat("Furniture");

  return (
    <section className="bg-surface px-2 py-16 xs:px-4">
      <div>
        <h1 className="text-4xl xs:text-display-lg font-bold font-display">
          Elevated{" "}
          <span className="bg-signature-gradient bg-clip-text text-transparent">
            Curation
          </span>
        </h1>
        <p className="text-sm text-on-surface-variant/60 sm:w-1/2 mt-3 font-body">
          Explore our meticulously sourced collections where luxury meets
          unparalleled craftsmanship. Each category is a gateway to a world of
          refined aesthetics and timeless elegance.
        </p>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-16">
        <div className="relative col-span-2">
          {isClothingLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <Link to={"/products?Clothing"}>
              <img
                src={clothing[0]?.images[0]}
                alt={clothing[0]?.images[0]}
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div className="glass rounded-md absolute bottom-5 left-3 w-[90%] p-3 xs:p-5 flex items-center justify-between">
                <div>
                  <span className="uppercase text-[10px] xs:text-body-sm tracking-widest text-primary">
                    Premium Ware
                  </span>
                  <h2 className="text-lg xs:text-2xl">Fashion</h2>
                </div>
                <div className="w-7 h-7 xs:w-10 xs:h-10 rounded-full bg-signature-gradient flex items-center justify-center glow-primary cursor-pointer hover-scale">
                  <ArrowUpRight className="text-surface" size={16} />
                </div>
              </div>
            </Link>
          )}
        </div>
        <div className="relative">
          {isElectronicsLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <Link to={"/products?Electronics"}>
              <img
                src={electronics[0]?.images[0]}
                alt={electronics[0]?.images[0]}
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div className="glass rounded-[10px] absolute bottom-5 left-3 w-[90%] p-3 xs:p-5">
                <h2 className="text-lg xs:text-2xl">Electronics</h2>
                <p className="text-body-sm xs:text-sm text-on-surface-variant/60 mt-1 xs:mt-3 line-clamp-1 xs:line-clamp-none">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-6">
        <div className="relative sm:max-h-96">
          {isHomeDecorLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <Link to={"/products?Home-Decor"}>
              <img
                src={homeDecor[0]?.images[0]}
                alt={homeDecor[0]?.images[0]}
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div className="glass rounded-xl absolute top-5 right-3 p-2">
                <h2 className="text-sm">Home</h2>
              </div>
            </Link>
          )}
        </div>
        <div className="relative col-span-2 sm:max-h-96">
          {isFurnitureLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <>
              <img
                src={furniture[2]?.images[0]}
                alt="image"
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div
                className="glass rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit p-3 
          xs:px-10 xs:py-5 xs:space-y-3 text-center"
              >
                <span className="uppercase hidden xs:block text-[10px] tracking-widest text-tertiary">
                  Essential Accents
                </span>
                <h2 className="text-lg xs:text-2xl font-bold tracking-wide">
                  Accessories
                </h2>
                <div className="w-10 h-1 hidden xs:block bg-signature-gradient mx-auto"></div>
                <Link
                  to={"/products"}
                  className="text-primary flex items-center gap-2 justify-center text-[10px] xs:text-body-sm"
                >
                  <span> View Collection</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="sm:grid grid-cols-3 space-y-4 sm:space-y-0 gap-4 mt-6">
        {/* coming soon */}
        <div className="relative sm:max-h-96">
          {isHomeDecorLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <>
              <img
                src={homeDecor[0]?.images[0]}
                alt="image"
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div className="glass rounded-md absolute bottom-5 left-3 w-[90%] p-3">
                <h2 className="text-lg">Coming Soon</h2>
                <p className="text-on-surface-variant/60 mt-1 line-clamp-1">
                  art & Curation
                </p>
              </div>
            </>
          )}
        </div>

        <div className="relative sm:max-h-96">
          {isFurnitureLoading ? (
            <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
          ) : (
            <Link to={"/products?Furniture"}>
              <img
                src={furniture[0]?.images[0]}
                alt={furniture[0]?.images[0]}
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
              <div className="glass rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] text-center p-3">
                <h2 className="text-sm uppercase">Furniture</h2>
              </div>
            </Link>
          )}
        </div>

        {/* coming soon */}
        <div className="sm:max-h-96">
          {isFurnitureLoading ? (
            <>
              <Skeleton className="aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
            </>
          ) : (
            <>
              <img
                src={furniture[1].images[0]}
                alt="image"
                className="bg-cover w-full h-full rounded-md ghost-border !border-2 xs:!border-4"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
