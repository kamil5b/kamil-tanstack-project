
import React from 'react'
import Header from '../components/Header'
import { Link } from '@tanstack/react-router'
import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarInset,
} from '@/client/components/ui/sidebar'

const NAVIGATIONS = [
	{ to: '/product', label: 'Products' },
	{ to: '/product/new', label: 'Create Product' },
	{ to: '/tag', label: 'Tags' },
	{ to: '/tag/new', label: 'Create Tag' },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="min-h-screen bg-gray-50 text-gray-900">
				<Header />

				<div className="pt-16">
					<div className="max-w-7xl mx-auto flex gap-6 px-4">
						<Sidebar side="left" variant="sidebar" collapsible="icon" className="w-64">
							<SidebarContent>
								<SidebarHeader>
									<div className="px-2 py-2 text-sm font-semibold">Navigation</div>
								</SidebarHeader>

								<SidebarGroup>
									<SidebarGroupLabel>Management</SidebarGroupLabel>
									<SidebarMenu>
										{NAVIGATIONS.map((nav) => (
											<SidebarMenuItem key={nav.to}>
												<SidebarMenuButton asChild>
													<Link to={nav.to}>{nav.label}</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</SidebarMenu>
								</SidebarGroup>
							</SidebarContent>
						</Sidebar>

						<SidebarInset className="flex-1 py-6">{children}</SidebarInset>
					</div>
				</div>
			</div>
		</SidebarProvider>
	)
}
