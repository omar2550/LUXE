import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReactElement, useEffect, useState } from "react";
import ImageInput from "./ui/imageInput";
import { productType } from "@/services/product.service";
import toast from "react-hot-toast";

const AppDialog = ({
  children,
  title,
  onSubmit,
  disable,
  isSuccess,
  open,
  onOpenChange,
  product,
}: {
  children?: ReactElement;
  title: string;
  onSubmit: (data: productType) => void;
  disable?: boolean;
  isSuccess?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: productType;
}) => {
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    isFeatured: false,
    images: [],
  });

  const isValid =
    (formdata.name.trim() !== "" &&
      formdata.category.trim() !== "" &&
      formdata.description.trim() !== "" &&
      formdata.price >= 0 &&
      formdata.stock >= 0 &&
      formdata.images.length > 0 &&
      formdata.name !== product?.name) ||
    formdata.category !== product?.category ||
    formdata.description !== product?.description ||
    formdata.price !== product?.price ||
    formdata.stock !== product?.stock ||
    formdata.isFeatured !== product?.isFeatured ||
    JSON.stringify(formdata.images) !== JSON.stringify(product?.images);

  const handleValidationAndSubmit = () => {
    if (!formdata.name.trim()) {
      toast.error("Name Filed is Required");
      return;
    }

    if (!formdata.category.trim()) {
      toast.error("Category Filed is Required");
      return;
    }

    if (formdata.price <= 0) {
      toast.error("Invalid Price");
      return;
    }

    if (formdata.stock <= 0) {
      toast.error("Invalid Stock");
      return;
    }

    if (formdata.images.length === 0) {
      toast.error("At Least Add One Image");
      return;
    }

    onSubmit(formdata);
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name,
        description: product?.description,
        category: product?.category,
        price: product?.price,
        stock: product?.stock,
        isFeatured: product?.isFeatured,
        images: product?.images,
      });
    }

    if (isSuccess) {
      setFormData({
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        isFeatured: false,
        images: [],
      });
    }
  }, [isSuccess, product]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger>{children}</DialogTrigger>}
      <DialogContent className="glass ghost-border text-on-surface">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            value={formdata.name}
            onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
            placeholder="Product Name"
            className="bg-surface-container-low border-outline-variant"
          />
          <Input
            value={formdata.category}
            onChange={(e) =>
              setFormData({ ...formdata, category: e.target.value })
            }
            placeholder="Category"
            className="bg-surface-container-low border-outline-variant"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={formdata.price}
              type="number"
              onChange={(e) =>
                setFormData({ ...formdata, price: Number(e.target.value) })
              }
              placeholder="Price"
              className="bg-surface-container-low border-outline-variant"
            />
            <Input
              value={formdata.stock}
              type="number"
              onChange={(e) =>
                setFormData({ ...formdata, stock: Number(e.target.value) })
              }
              placeholder="Stock Quantity"
              className="bg-surface-container-low border-outline-variant"
            />
          </div>
          <motion.label
            htmlFor="is-featured"
            className="flex items-center justify-between"
            whileTap={{ scale: 0.99 }}
          >
            <p>Is Featured?</p>
            <Checkbox
              checked={formdata.isFeatured}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formdata, isFeatured: checked })
              }
              id="is-featured"
              className={`
              size-5 border-on-surface-variant shadow-sm
              transition-all duration-300
            `}
            />
          </motion.label>
          <textarea
            value={formdata.description}
            onChange={(e) =>
              setFormData({ ...formdata, description: e.target.value })
            }
            name="description"
            placeholder="Product Description..."
            className="w-full rounded-[10px] ghost-border bg-surface-container-low px-3 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm resize-none"
          ></textarea>
          <ImageInput
            pImages={product?.images.map((img) => {
              return { id: img, file: img };
            })}
            onChange={(images: string[]) => {
              setFormData((prev) => ({ ...prev, images: images }));
            }}
          />
          <DialogClose>
            <Button
              className="bg-primary text-surface font-bold p-2"
              onClick={handleValidationAndSubmit}
              disabled={disable || !isValid}
            >
              Add Product
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
