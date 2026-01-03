import { Link } from '@tanstack/react-router'
import {
  ChevronRight,
} from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/client/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/client/components/ui/sidebar"

export default function AppSidebar({ children }: { children: React.ReactNode }) {
    const navData: { title: string; url: string; isActive?: boolean; items?: { title: string; url: string }[] }[] = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "Products",
            url: "/product"
        },
        {
            title: "Tags",
            url: "/tag"
        }
    ]
  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarHeader className="border-b p-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/tanstack-word-logo-white.svg" alt="Logo" className="h-8 invert dark:invert-0" />
          </Link>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarMenu>
              {navData.map((item) => {
                // Handle nested items with Collapsible
                if (item.items) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {/* {item.icon && <item.icon />} */}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link 
                                    to={subItem.url}
                                    activeProps={{ className: "font-bold text-cyan-500" }}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                // Handle single items
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link 
                        to={item.url}
                        activeProps={{ className: "bg-cyan-600 text-white hover:bg-cyan-700" }}
                      >
                        {/* {item.icon && <item.icon />} */}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <main className="flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}