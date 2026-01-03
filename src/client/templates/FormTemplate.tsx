"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import {
  Controller,
  type FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import {
  type AsyncSource,
  InfiniteMultiSelect,
  InfiniteSingleSelect,
} from "../components/AsyncSelects";
import { camelToCapitalSpaced } from "../lib/utils";

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
  type: unknown,
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
   Recursive field renderer
   ============================================================ */

function RenderFields(props: {
  schema: z.ZodObject<any>;
  control: any;
  path?: string;
  asyncRegistry?: Record<string, AsyncSource>;
}) {
  const basePath = props.path ? `${props.path}.` : "";

  return (
    <>
      {Object.entries(props.schema.shape).map(([name, fieldSchema]) => {
        const fullName = `${basePath}${name}`;
        const t = unwrap(fieldSchema);
        ``;
        const asyncKind = inferAsyncKind(name, fieldSchema);
        const source = props.asyncRegistry?.[name];
        if (name === "id") {
          return (
            <Controller
              key={fullName}
              name={fullName}
              control={props.control}
              render={({ field }) => (
                <input type="hidden" {...field} value={field.value ?? ""} />
              )}
            />
          );
        }
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
            const { fields, append, remove } = useFieldArray({
              control: props.control,
              name: fullName,
            });

            return (
              <div key={fullName} className="space-y-4 border rounded p-4">
                <Label>{camelToCapitalSpaced(name)}</Label>

                {fields.map((f, i) => (
                  <div key={f.id} className="space-y-3 border rounded p-3">
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

                <Button type="button" onClick={() => append({})}>
                  Add {name}
                </Button>
              </div>
            );
          }
        }

        // nested object
        if (t instanceof z.ZodObject) {
          return (
            <div key={fullName} className="space-y-4 border rounded p-4">
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
      })}
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
  const router = useRouter();

  return (
    <div className="bg-white shadow rounded p-6">
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(async (v) => {
          // 1. Wait for the submission to finish
          await props.onSubmit(v as z.output<T>);

          // 2. Navigate back only after success
          router.history.back();
        })}
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
