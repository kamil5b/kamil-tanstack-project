"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/client/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/client/components/ui/popover";
import { ScrollArea } from "@/client/components/ui/scroll-area";

export type AsyncSource = {
  fetcher: (data: { page: number; limit: number }) => Promise<{
    data: any[];
    meta: {
      page: number;
      totalPages: number;
      limit: number;
      totalItems: number;
    };
  }>;
  getValue: (item: any) => string;
  getLabel: (item: any) => string;
};

export const InfiniteSingleSelect = (props: {
  value?: string;
  onChange: (v: string) => void;
  source: AsyncSource;
  queryKey: string;
}) => {
  const q = useInfiniteQuery({
    queryKey: [props.queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      props.source.fetcher({ page: pageParam, limit: 20 }),
    getNextPageParam: (last) =>
      last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined,
  });

  const items = q.data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {props.value ?? "Select"}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <ScrollArea className="h-64">
              {items.map((item) => {
                const id = props.source.getValue(item);
                return (
                  <CommandItem key={id} onSelect={() => props.onChange(id)}>
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        props.value === id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {props.source.getLabel(item)}
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const InfiniteMultiSelect = (props: {
  value: string[];
  onChange: (v: string[]) => void;
  source: AsyncSource;
  queryKey: string;
}) => {
  const q = useInfiniteQuery({
    queryKey: [props.queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      props.source.fetcher({ page: pageParam, limit: 20 }),
    getNextPageParam: (last) =>
      last.meta.page < last.meta.totalPages ? last.meta.page + 1 : undefined,
  });

  const items = q.data?.pages.flatMap((p) => p.data) ?? [];

  const toggle = (id: string) => {
    props.onChange(
      props.value.includes(id)
        ? props.value.filter((v) => v !== id)
        : [...props.value, id],
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {props.value.length ? `${props.value.length} selected` : "Select"}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <ScrollArea className="h-64">
              {items.map((item) => {
                const id = props.source.getValue(item);
                return (
                  <CommandItem key={id} onSelect={() => toggle(id)}>
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        props.value.includes(id) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {props.source.getLabel(item)}
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
