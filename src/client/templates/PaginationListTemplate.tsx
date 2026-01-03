import { Link } from "@tanstack/react-router";
import React from "react";
import type { ZodTypeAny } from "zod";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/client/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import { Button } from "../components/ui/button";

type Column<T> = {
  key: string;
  header?: string;
  render?: (item: T) => React.ReactNode;
};

export default function PaginationListTemplate<
  T extends Record<string, any>,
>(props: {
  title?: string;
  columns?: Column<T>[];
  itemSchema?: ZodTypeAny;
  columnOverrides?: Column<T>[];
  data: T[];
  meta: { page: number; totalPages: number; limit: number; totalItems: number };
  onPageChange?: (page: number) => void;
  createPageUrl?: string;
}) {
  const {
    title,
    columns = [],
    itemSchema,
    columnOverrides = [],
    data,
    meta,
    onPageChange,
  } = props;

  const derivedColumns: Column<T>[] = React.useMemo(() => {
    if (columns && columns.length > 0) return columns;
    if (itemSchema) {
      const shape = (itemSchema as any)._def?.shape?.() ?? {};
      return Object.keys(shape).map((k) => ({ key: k, header: k }));
    }
    return [];
  }, [columns, itemSchema]);

  const merged = derivedColumns.map((c) => {
    const override = columnOverrides.find((o) => o.key === c.key);
    return override ? { ...c, ...override } : c;
  });

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-lg font-medium">{title}</h2>}
        {props.createPageUrl && (
          <Button>
            <Link to={props.createPageUrl}>Create</Link>
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <tr>
            {merged.map((c) => (
              <TableHead key={c.key}>{c.header ?? c.key}</TableHead>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={(row as any).id ?? idx}>
              {merged.map((c) => (
                <TableCell key={c.key}>
                  {c.render ? c.render(row) : (row as any)[c.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange?.(Math.max(1, meta.page - 1))}
              />
            </PaginationItem>

            {Array.from({ length: meta.totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={meta.page === i + 1}
                  onClick={() => onPageChange?.(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange?.(Math.min(meta.totalPages, meta.page + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
