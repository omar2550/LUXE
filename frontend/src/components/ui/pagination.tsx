import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { Link, SetURLSearchParams } from "react-router-dom";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  to: string;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  to,
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <Link
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          to={to}
          {...props}
        />
      }
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

type PagePaginationTypes = {
  currentPage: number;
  totalPages: number;
  setSearchParams: SetURLSearchParams;
  cat: string;
};

const PagePagination = ({
  currentPage,
  totalPages,
  setSearchParams,
  cat,
}: PagePaginationTypes) => {
  const handelPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ page: String(newPage), cat: cat });
    }
  };

  const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 4) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const paginationItems = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage <= 1
                ? "text-on-surface-variant/40 pointer-events-none"
                : ""
            }
            to={`/products?page=${currentPage - 1}&cat=${cat}`}
          />
        </PaginationItem>
        {paginationItems.map((item: number | string, i) => {
          const itemKey = `page-${item}-${i}`;

          if (item === "...") {
            return (
              <PaginationItem key={itemKey}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem
              key={itemKey}
              onClick={() => handelPageChange(Number(item))}
            >
              <PaginationLink
                isActive={currentPage === item}
                to={`/products?page=${item}&cat=${cat}`}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage >= totalPages
                ? "text-on-surface-variant/40 pointer-events-none"
                : ""
            }
            to={`/products?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export {
  PagePagination,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
