import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Trash2, Package, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import AppDialog from "@/components/AppDialog";
import { productType } from "@/services/product.service";
import AppAlertDialog from "@/components/AppAlertDialog";
import { SearchModal } from "@/components/SearchModal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const DashboardCustomers = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 xs:p-6 space-y-8"
    >
      {/* Edit Dialog */}
      {/* <AppDialog
        open={openUpdate}
        onOpenChange={() => setOpenUpdate(false)}
        title="Product Info"
        product={product}
        onSubmit={(data) => handelUpdateProduct(product?._id, data)}
      /> */}

      {/* Delete Dialog */}
      {/* <AppAlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        handelDeleteProduct={() => handelDeleteProduct(product?._id)}
      /> */}

      {/* Search Dialog */}
      {/* <SearchModal open={isSearchOpen} setOpen={setIsSearchOpen} /> */}

      {/* --- Header Section --- */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-y-4 xs:flex-row justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tightest bg-signature-gradient bg-clip-text text-transparent">
            LUXE Customers
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Exclusive Customers management
          </p>
        </div>
        {/* <AppDialog
          title="Add New Product"
          onSubmit={handelCreateProduct}
          disable={isPending}
          isSuccess={isSuccess}
        > */}
        <Button className="bg-signature-gradient shadow-glow-primary hover:shadow-none transition-shadow duration-500 text-on-surface font-semibold gap-2 p-2 hover-scale w-full xs:w-fit flex">
          <Plus size={18} /> Add Customer
        </Button>
        {/* </AppDialog> */}
      </motion.div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Total Products", "Live Stock", "Total Prices"].map((label, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="glass ghost-border p-6 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Package size={24} />
              </div>
              <div className="text-center">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                  {label}
                </p>
                <p className="text-2xl font-display font-bold">
                  {/* {stats[label]} */}55
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* --- Table Container --- */}
      <motion.div variants={itemVariants}>
        <Card className="glass ghost-border shadow-ambient overflow-hidden">
          <div className="p-4 pt-2 border-b border-outline-variant">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
                size={16}
              />
              <Input
                placeholder="Search..."
                className="pl-10 bg-surface-container-low border-none focus-visible:ring-1 focus-visible:ring-primary/50"
              // onClick={() => setIsSearchOpen(true)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-surface-container-lowest/50">
                <TableRow className="border-outline-variant hover:bg-transparent">
                  <TableHead className="w-[300px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {/* {products &&
                    products?.map((product) => (
                      <ProductRow
                        key={product._id}
                        product={product}
                        onEdit={onUpdate}
                        onDelete={onDelete}
                      />
                    ))} */}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const ProductRow = ({
  product,
  onEdit,
  onDelete,
}: {
  product: productType;
  onEdit: (product: productType) => void;
  onDelete: (product: productType) => void;
}) => {
  return (
    <motion.tr
      key={product._id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ backgroundColor: "rgba(250 250 250, 0.03)" }}
      className="border-outline-variant group transition-colors"
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-surface-container-highest ghost-border overflow-hidden">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="object-cover object-center h-full w-full rounded-sm"
            />
          </div>
          {product.name}
        </div>
      </TableCell>
      <TableCell className="text-on-surface-variant text-xs">
        {product.category}
      </TableCell>
      <TableCell className="font-display font-semibold">
        ${product.price}
      </TableCell>
      <TableCell className="font-display font-semibold">
        {product.stock}
      </TableCell>
      <TableCell className="text-on-surface/50">
        <Edit
          size={18}
          className="inline-block mx-2 cursor-pointer hover:text-tertiary transition-all duration-300"
          onClick={() => onEdit(product)}
        />
        <Trash2
          size={18}
          className="inline-block cursor-pointer hover:text-destructive transition-all duration-300"
          onClick={() => onDelete(product)}
        />
      </TableCell>
    </motion.tr>
  );
};

export default DashboardCustomers;
