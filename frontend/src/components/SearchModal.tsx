import { algoliasearch } from "algoliasearch";
import { InstantSearch, useSearchBox, useHits } from "react-instantsearch";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY,
);

export function SearchModal({ open, setOpen }) {
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <CustomSearchContent open={open} setOpen={setOpen} />
    </InstantSearch>
  );
}

function CustomSearchContent({ open, setOpen }) {
  const { query, refine } = useSearchBox();
  const { items } = useHits();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-2 h-fit max-h-[60vh]" showCloseButton={false}>
        <Input
          placeholder="Search fro a product..."
          value={query}
          onChange={(e) => refine(e.target.value)}
        />
        <AnimatePresence>
          <CommandListContent hits={items} />
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function CommandListContent({ hits }) {
  if (hits.length === 0)
    return (
      <p className="font-display text-on-surface-variant text-center p-2 text-sm font-semibold">
        There is No Results
      </p>
    );

  return (
    <div className="mt-5 space-y-4">
      {hits.map((hit) => (
        <motion.div
          key={hit.objectID}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            borderColor: "rgba(var(--primary), 0.5)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Link to={`/product/${hit.objectID}`}>
            <div className="flex items-center gap-4 cursor-pointer">
              <img
                src={hit.thumbnail}
                alt={hit.name}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold">{hit.name}</span>
                <span className="text-sm text-muted-foreground">
                  {hit.price} $
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
