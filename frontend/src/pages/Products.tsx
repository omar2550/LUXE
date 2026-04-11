import ProductCard from "@/components/ProductCard";
import { PagePagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductsByCat } from "@/hooks/useProduct";
import { useState } from "react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cat, setCat] = useState<string>("Clothing");

  const { data: productsData, isLoading: isProductLoading } =
    useProductsByCat(cat);

  const limit = 6;
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(productsData?.length / limit || 1);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  return (
    <section className="bg-surface px-4 py-16">
      {/* header */}
      <header>
        <h1 className="text-4xl xs:text-display-lg bg-signature-gradient bg-clip-text text-transparent font-bold">
          The Curated Edit
        </h1>
        <p className="text-sm text-on-surface-variant/60 sm:w-1/2 mt-3">
          Discover our signature collection of artisanal pieces, where
          architectural precision meets ethereal luxury. Each item is a
          testament to timeless craftsmanship.
        </p>
      </header>

      <div className="grid sm:grid-cols-4 gap-4 mt-16">
        {/* Filters */}
        <div className="sm:col-span-1">
          {/* Price */}
          <div>
            <p className="text-body-sm uppercase text-on-surface-variant">
              Price range
            </p>
            <Slider
              defaultValue={[50, 5000]}
              max={10000}
              step={10}
              className="mt-5"
            />
            <div className="flex items-center justify-between uppercase text-on-surface/50 text-body-sm mt-2 pr-5">
              <span>$5</span>
              <span>+$10,000</span>
            </div>
          </div>

          {/* Palette */}
          <div className="mt-5">
            <p className="text-body-sm uppercase text-on-surface-variant">
              Palette
            </p>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-primary bg-black" />
              <div className="w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-white" />
              <div className="w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-blue-700" />
              <div className="w-5 h-5 mt-3 cursor-pointer rounded-full border border-transparent outline outline-transparent bg-yellow-500" />
            </div>
          </div>

          {/* Category */}
          <div className="mt-5">
            <p className="text-body-sm uppercase text-on-surface-variant">
              Category
            </p>
            <div className="mt-3 pr-5 cursor-pointer">
              <span
                className={`text-body-sm ${cat === "Clothing" ? "text-on-surface" : "text-on-surface/50"}`}
                onClick={() => {
                  setCat("Clothing");
                  setSearchParams({ page: "1" });
                }}
              >
                Clothing
              </span>
            </div>
            <div className="mt-2 pr-5 cursor-pointer">
              <span
                className={`text-body-sm ${cat === "Electronics" ? "text-on-surface" : "text-on-surface/50"}`}
                onClick={() => {
                  setCat("Electronics");
                  setSearchParams({ page: "1" });
                }}
              >
                Electronics
              </span>
            </div>
            <div className="mt-2 pr-5 cursor-pointer">
              <span
                className={`text-body-sm ${cat === "Home Decor" ? "text-on-surface" : "text-on-surface/50"}`}
                onClick={() => {
                  setCat("Home Decor");
                  setSearchParams({ page: "1" });
                }}
              >
                Home Decor
              </span>
            </div>
            <div className="mt-2 pr-5 cursor-pointer">
              <span
                className={`text-body-sm ${cat === "Furniture" ? "text-on-surface" : "text-on-surface/50"}`}
                onClick={() => {
                  setCat("Furniture");
                  setSearchParams({ page: "1" });
                }}
              >
                Furniture
              </span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="sm:col-span-3">
          <div className="xs:flex items-center justify-between -mt-1.5 mb-5">
            <p className={`text-body-sm text-on-surface/50`}>
              Showing {"58"} Pieces
            </p>
            <div className="flex items-center gap-1 xs:-mt-2">
              <span className={`text-body-sm text-on-surface/50`}>
                SORT<span className="text-[16px] font-bold">:</span>
              </span>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by...</SelectLabel>
                    <SelectItem value="Newest Arrivals">
                      Newest Arrivals
                    </SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-4">
            {isProductLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i + i + "sk"} className="w-full">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <div className="mt-4 flex flex-col gap-1 px-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))
              : productsData
                  .slice(startIndex, endIndex)
                  .map((p, i) => <ProductCard product={p} key={i} />)}
          </div>
          <div className="mt-6">
            <PagePagination
              currentPage={currentPage}
              totalPages={totalPages}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
