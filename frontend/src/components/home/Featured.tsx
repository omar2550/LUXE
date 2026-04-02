import { ArrowUpRight } from "lucide-react";
import { Badge } from "../ui/badge";

const Featured = () => {
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
            <span>View All</span>
            <ArrowUpRight size={15} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 grid-rows-2 gap-2 max-h-screen">
          <div className="relative col-span-4 sm:col-span-2 row-span-2 overflow-hidden">
            <img
              src="/bg2.png"
              alt="image"
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
                <h4 className="text-sm sm:text-lg">Sonic Soul</h4>
                <p className="text-[10px] sm:text-body-sm text-on-surface-variant">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Dolorum soluta reprehenderit.
                </p>
              </div>
            </div>
          </div>

          <div className="relative col-span-4 sm:col-span-2 row-span-1 overflow-hidden">
            <img
              src="/bg2.png"
              alt="image"
              className="w-full h-full object-cover object-top ghost-border !border-4 rounded-2xl"
            />
            <div className="absolute top-3 left-5 glass rounded-md py-2 px-5">
              <h4 className="text-lg">Sonic Soul</h4>
              <span className="text-body-sm text-primary">
                Audio Excellence
              </span>
            </div>
          </div>

          <div className="relative col-span-2 sm:col-span-1 row-span-1 overflow-hidden">
            <img
              src="/bg2.png"
              alt="image"
              className="w-full h-full object-cover ghost-border !border-4 rounded-3xl"
            />
          </div>

          <div className="relative col-span-2 sm:col-span-1 row-span-1 overflow-hidden">
            <img
              src="/bg2.png"
              alt="image"
              className="w-full h-full object-cover ghost-border !border-4 rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
