import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { useFeaturedProducts } from "@/hooks/useProduct";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

const Featured = () => {
  const { data, isLoading } = useFeaturedProducts();

  console.log(data);

  return (
    <section className="py-16 bg-surface-container-low z-10 relative">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-semibold">Featured Artifacts</h3>
            <p className="text-on-surface-variant text-body-sm mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing consectetur
              consectetur.
            </p>
          </div>
          <div className="text-body-sm text-primary flex items-center mt-auto gap-1">
            <Link to={"/products/featured"}>View All</Link>
            <ArrowUpRight size={15} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-2 sm:max-h-screen">
          <div className="relative col-span-4 sm:col-span-2 row-span-2 overflow-hidden">
            {isLoading ? (
              <>
                <Skeleton className="aspect-[12/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center  h-full w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
              </>
            ) : (
              <Link to={`/product/${data[0]?._id}`}>
                <img
                  src={data[0]?.images[0]}
                  alt={data[0]?.images[0]}
                  className="w-full h-full object-cover object-center ghost-border !border-4 rounded-lg"
                />
                <div className="absolute bottom-3 left-5 space-y-1">
                  <Badge
                    variant="secondary"
                    className="text-[10px] text-tertiary uppercase -ml-2"
                  >
                    Limited Edition
                  </Badge>
                  <div className="glass p-2 -ml-2 rounded-lg w-[90%]">
                    <h4 className="text-sm sm:text-lg line-clamp-1">
                      {data[0]?.name}
                    </h4>
                    <p className="text-[10px] sm:text-body-sm text-on-surface-variant line-clamp-2">
                      {data[0]?.description}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="relative col-span-4 sm:col-span-2 row-span-1 overflow-hidden">
            {isLoading ? (
              <>
                <Skeleton className="aspect-[12/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center h-full w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
              </>
            ) : (
              <Link to={`/product/${data[1]?._id}`}>
                <img
                  src={data[1]?.images[0]}
                  alt={data[1]?.images[0]}
                  className="w-full h-full object-cover object-top ghost-border !border-4 rounded-2xl"
                />
                <div className="absolute top-3 left-5 glass rounded-md py-2 px-5">
                  <h4 className="text-lg line-clamp-1">{data[1]?.name}</h4>
                  <span className="text-body-sm text-primary">
                    {data[1]?.category}
                  </span>
                </div>
              </Link>
            )}
          </div>

          <div className="relative col-span-2 sm:col-span-1 row-span-1 overflow-hidden">
            {isLoading ? (
              <>
                <Skeleton className="aspect-[12/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center h-full w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
              </>
            ) : (
              <Link to={`/product/${data[2]?._id}`}>
                <img
                  src={data[2]?.images[0]}
                  alt={data[2]?.images[0]}
                  className="w-full h-full object-cover ghost-border !border-4 rounded-3xl"
                />
              </Link>
            )}
          </div>

          <div className="relative col-span-2 sm:col-span-1 row-span-1 overflow-hidden">
            {isLoading ? (
              <>
                <Skeleton className="aspect-[12/5] sm:aspect-[3/4] md:aspect-[4/5] object-cover object-center h-full w-full rounded-md ghost-border !border-2 sm:!border-4 shadow-inner" />
              </>
            ) : (
              <Link to={`/product/${data[3]?._id}`}>
                <img
                  src={data[3]?.images[0]}
                  alt={data[3]?.images[0]}
                  className="w-full h-full object-cover ghost-border !border-4 rounded-3xl"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
