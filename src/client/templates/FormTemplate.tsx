"use client";

import * as React from "react";
import { z } from "zod";
import {
  useForm,
  Controller,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/client/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/client/components/ui/command";
import { ScrollArea } from "@/client/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { camelToCapitalSpaced } from "../lib/utils";

/* ============================================================
   Async registry
   ============================================================ */

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

/* ============================================================
   Zod helpers (v4-safe)
   ============================================================ */

function unwrap(type: unknown): z.ZodTypeAny {
  let t: any = type;

  while (
    t &&
    typeof t === "object" &&
    (t instanceof z.ZodOptional ||
      t instanceof z.ZodNullable ||
      t instanceof z.ZodDefault)
  ) {
    t = t._def.innerType;
  }

  return t as z.ZodTypeAny;
}

function isUuid(type: unknown): boolean {
  const t = unwrap(type);
  if (t instanceof z.ZodUUID) return true;

  return true;
}

function inferAsyncKind(
  name: string,
  type: unknown
): "single" | "multi" | null {
  const t = unwrap(type);

  if (t instanceof z.ZodArray && isUuid(t.element)) {
    return "multi";
  }

  if (isUuid(t) && name !== "id") {
    return "single";
  }

  return null;
}

/* ============================================================
   Async Selects
   ============================================================ */

function InfiniteSingleSelect(props: {
  value?: string;
  onChange: (v: string) => void;
  source: AsyncSource;
  queryKey: string;
}) {
  const q = useInfiniteQuery({
    queryKey: [props.queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      props.source.fetcher({ page: pageParam, limit: 20 }),
    getNextPageParam: (last) =>
      last.meta.page < last.meta.totalPages
        ? last.meta.page + 1
        : undefined,
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
                  <CommandItem
                    key={id}
                    onSelect={() => props.onChange(id)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        props.value === id
                          ? "opacity-100"
                          : "opacity-0"
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
}

function InfiniteMultiSelect(props: {
  value: string[];
  onChange: (v: string[]) => void;
  source: AsyncSource;
  queryKey: string;
}) {
  const q = useInfiniteQuery({
    queryKey: [props.queryKey],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      props.source.fetcher({ page: pageParam, limit: 20 }),
    getNextPageParam: (last) =>
      last.meta.page < last.meta.totalPages
        ? last.meta.page + 1
        : undefined,
  });

  const items = q.data?.pages.flatMap((p) => p.data) ?? [];

  const toggle = (id: string) => {
    props.onChange(
      props.value.includes(id)
        ? props.value.filter((v) => v !== id)
        : [...props.value, id]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {props.value.length
            ? `${props.value.length} selected`
            : "Select"}
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
                  <CommandItem
                    key={id}
                    onSelect={() => toggle(id)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        props.value.includes(id)
                          ? "opacity-100"
                          : "opacity-0"
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
}

/* ============================================================
   Recursive field renderer
   ============================================================ */

function RenderFields(props: {
  schema: z.ZodObject<any>;
  control: any;
  path?: string;
  asyncRegistry?: Record<string, AsyncSource>;
}) {
  const basePath = props.path ? props.path + "." : "";

  return (
    <>
      {Object.entries(props.schema.shape).map(
        ([name, fieldSchema]) => {
          const fullName = `${basePath}${name}`;
          const t = unwrap(fieldSchema);``
          const asyncKind = inferAsyncKind(name, fieldSchema);
          const source = props.asyncRegistry?.[name];

          // async select
          if (asyncKind === "single" && source) {
            return (
              <Controller
                key={fullName}
                name={fullName}
                control={props.control}
                render={({ field }) => (
                  <>
                    <Label>{camelToCapitalSpaced(name)}</Label>
                    <InfiniteSingleSelect
                      value={field.value}
                      onChange={field.onChange}
                      source={source}
                      queryKey={fullName}
                    />
                  </>
                )}
              />
            );
          }

          if (asyncKind === "multi" && source) {
            return (
              <Controller
                key={fullName}
                name={fullName}
                control={props.control}
                render={({ field }) => (
                  <>
                    <Label>{camelToCapitalSpaced(name)}</Label>
                    <InfiniteMultiSelect
                      value={field.value ?? []}
                      onChange={field.onChange}
                      source={source}
                      queryKey={fullName}
                    />
                  </>
                )}
              />
            );
          }

          // array(object)
          if (t instanceof z.ZodArray) {
            const el = unwrap(t.element);

            if (el instanceof z.ZodObject) {
              const { fields, append, remove } =
                useFieldArray({
                  control: props.control,
                  name: fullName,
                });

              return (
                <div
                  key={fullName}
                  className="space-y-4 border rounded p-4"
                >
                  <Label>{camelToCapitalSpaced(name)}</Label>

                  {fields.map((f, i) => (
                    <div
                      key={f.id}
                      className="space-y-3 border rounded p-3"
                    >
                      <RenderFields
                        schema={el}
                        control={props.control}
                        path={`${fullName}.${i}`}
                      />

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(i)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    onClick={() => append({})}
                  >
                    Add {name}
                  </Button>
                </div>
              );
            }
          }

          // nested object
          if (t instanceof z.ZodObject) {
            return (
              <div
                key={fullName}
                className="space-y-4 border rounded p-4"
              >
                <Label>{camelToCapitalSpaced(name)}</Label>
                <RenderFields
                  schema={t}
                  control={props.control}
                  path={fullName}
                />
              </div>
            );
          }

          // scalar
          return (
            <Controller
              key={fullName}
              name={fullName}
              control={props.control}
              render={({ field }) => (
                <>
                  <Label>{camelToCapitalSpaced(name)}</Label>
                  <Input {...field} />
                </>
              )}
            />
          );
        }
      )}
    </>
  );
}

/* ============================================================
   FormTemplate
   ============================================================ */

export function FormTemplate<T extends z.ZodObject<any>>(props: {
  schema: T;
  defaultValues?: Record<string, unknown>;
  onSubmit: (values: z.output<T>) => void;
  asyncRegistry?: Record<string, AsyncSource>;
}) {
  const form = useForm<FieldValues>({
    resolver: zodResolver(props.schema as any),
    defaultValues: props.defaultValues as any,
  });

  return (
	<div className="bg-white shadow rounded p-6">
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit((v) =>
        props.onSubmit(v as z.output<T>)
      )}
    >
      <RenderFields
        schema={props.schema}
        control={form.control}
		asyncRegistry={props.asyncRegistry}
      />

      <Button type="submit">Save</Button>
    </form>
	</div>
  );
}
