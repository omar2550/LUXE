import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useProduct } from "@/hooks/useProduct";

const Hero = () => {
  const { data } = useProduct("69d2a67139868d6fb9dbad3a");

  return (
    <section className="relative content-center overflow-hidden bg-surface-container-low min-h-screen ">
      {/* Glow 1 */}
      <div className="absolute top-5 right-5 w-[250px] h-[250px] bg-primary/30 rounded-full blur-[120px]" />

      {/* Glow 2 */}
      <div className="absolute bottom-5 left-5 w-[250px] h-[250px] bg-secondary/30 rounded-full blur-[120px]" />

      <div className="px-4 mx-auto flex sm:flex-row flex-col my-16 sm:my-0 sm:items-center justify-between gap-4 relative">
        <div>
          <h1 className="text-4xl sm:text-display-lg font-bold">
            The Future of
            <br />
            <span className="bg-signature-gradient bg-clip-text text-transparent">
              Elegance
            </span>
          </h1>
          <p className="text-body-sm text-on-surface-variant my-8 max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            eveniet quaerat nam possimus quod numquam optio aliquam quae ipsam
            veritatis.
          </p>
          <div className="flex items-center gap-3">
            <Link to={"/products"}>
              <Button
                variant="default"
                className={
                  "bg-signature-gradient !text-surface text-body-sm px-5 py-3"
                }
              >
                Explore Collection
              </Button>
            </Link>
            <Button size="lg" className={"glass"}>
              View
            </Button>
          </div>
        </div>

        <div className="sm:w-1/2 aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] max-h-[90vh] relative overflow-hidden">
          <img
            src={data?.images[0]}
            alt={data?.images[0]}
            className="h-full w-full object-cover object-center mx-auto rounded-lg ghost-border !border-4"
          />
          <div className="glass rounded-lg absolute bottom-3 left-3 w-[90%] p-5">
            <span className="uppercase text-body-sm tracking-widest text-primary">
              From The Owner
            </span>
            <h2 className="text-2xl line-clamp-1">{data?.name}</h2>
            <div className="flex items-center justify-between">
              <p className="tracking-widest text-on-surface-variant">
                ${data?.price}
              </p>
              <Link to={"/product/69d2a67139868d6fb9dbad3a"}>
                <ArrowRight className="text-secondary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
