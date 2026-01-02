import React from 'react'
import { ZodTypeAny } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/client/components/ui/form'
import { Input } from '@/client/components/ui/input'
import { Textarea } from '@/client/components/ui/textarea'
import { Button } from '@/client/components/ui/button'

type FieldOverride = {
	name: string
	label?: string
	placeholder?: string
	type?: 'text' | 'number' | 'textarea'
}

export default function FormTemplate(props: {
	title?: string
	schema?: ZodTypeAny
	fieldOverrides?: FieldOverride[]
	initialValues?: Record<string, any>
	onSubmit: (values: Record<string, any>) => void
}) {
	const { schema, fieldOverrides = [], initialValues = {}, onSubmit, title } = props

	// useForm with `any` to avoid complex generic constraints between zod and react-hook-form
	const form = useForm<any>({
		resolver: schema ? zodResolver(schema as any) : undefined,
		defaultValues: initialValues,
		mode: 'onSubmit',
	})

	function getOverride(name: string) {
		return fieldOverrides.find((f) => f.name === name)
	}

	function resolveShape(schemaObj: any) {
		const maybeShape = schemaObj?._def?.shape ?? schemaObj?._def?.schema
		if (typeof maybeShape === 'function') return maybeShape()
		return maybeShape || {}
	}

	// derive fields from zod schema when provided
	const fields = React.useMemo(() => {
		if (!schema) return [] as FieldOverride[]
		const shape = resolveShape(schema as any)
		return Object.keys(shape).map((k) => ({ name: k }))
	}, [schema])

	// Recursive renderer to support nested objects and arrays
	function renderFieldRecursive(name: string, schemaPart: any): React.ReactNode {
		const typeName = schemaPart?._def?.typeName

		// Arrays
		if (typeName === 'ZodArray') {
			const itemType = schemaPart._def.type
			const arr: any[] = form.watch(name) ?? []

			return (
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<div className="text-sm font-medium">{name}</div>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								const defaultVal = itemType._def?.typeName === 'ZodObject' ? {} : ''
								form.setValue(name, [...(arr || []), defaultVal])
							}}
						>
							Add
						</Button>
					</div>

					<div className="space-y-2">
						{(arr || []).map((_, idx) => (
							<div key={idx} className="p-2 border rounded">
								{itemType._def?.typeName === 'ZodObject' ? (
									Object.keys(resolveShape(itemType)).map((k) => (
										<FormField
											key={k}
											control={form.control}
											name={`${name}.${idx}.${k}` as any}
											render={({ field }) => (
												<FormItem>
													<FormLabel>{k}</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									))
								) : (
									<FormField
										control={form.control}
										name={`${name}.${idx}` as any}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}

								<div className="mt-2">
									<Button
										type="button"
										variant="destructive"
										onClick={() => {
											const current = form.getValues()[name] || []
											const next = current.filter((_: any, i: number) => i !== idx)
											form.setValue(name, next)
										}}
									>
										Remove
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			)
		}

		// Objects
		if (typeName === 'ZodObject') {
			const shape = resolveShape(schemaPart as any)
			return (
				<div className="p-2 border rounded space-y-2">
					<div className="text-sm font-medium">{name}</div>
					{Object.keys(shape).map((k) => (
						<FormField
							key={k}
							control={form.control}
							name={`${name}.${k}` as any}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{k}</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					))}
				</div>
			)
		}

		// Fallback primitive
		return (
			<FormField
				control={form.control}
				name={name as any}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		)
	}

	return (
		<div className="bg-white shadow rounded p-6">
			{title && <h2 className="text-lg font-medium mb-4">{title}</h2>}

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit((values) => onSubmit(values))}
					className="space-y-4"
				>
					{(() => {
						const schemaShape = resolveShape(schema as any)
						return fields.map((f) => {
							const override = getOverride(f.name)
							// attempt to detect type from schema
							let detected: FieldOverride['type'] = 'text'
							try {
								const s = schemaShape?.[f.name]
								if (s && s._def?.typeName === 'ZodNumber') detected = 'number'
								if (s && s._def?.typeName === 'ZodArray') detected = 'textarea'
							} catch (e) {}

							const type = override?.type ?? detected
							const label = override?.label ?? f.name
							const placeholder = override?.placeholder ?? ''

							const s = schemaShape?.[f.name]
							if (s && (s._def?.typeName === 'ZodObject' || s._def?.typeName === 'ZodArray')) {
								return (
									<div key={f.name}>
										{renderFieldRecursive(f.name, s)}
									</div>
								)
							}

							// primitive fallback
							return (
								<FormField
									key={f.name}
									control={form.control}
									name={f.name as any}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{label}</FormLabel>
											<FormControl>
												{type === 'textarea' ? (
													<Textarea {...field} placeholder={placeholder} />
												) : (
													<Input {...field} type={type === 'number' ? 'number' : 'text'} placeholder={placeholder} />
												)}
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)
						})
					})()}

					<div className="flex gap-2">
						<Button type="submit">Save</Button>
						<Button variant="outline" type="button" onClick={() => form.reset(initialValues)}>
							Reset
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
