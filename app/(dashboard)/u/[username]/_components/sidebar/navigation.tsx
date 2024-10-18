"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

import { NavItem, NavItemSkeleton } from "./nav-item"

import {
    Fullscreen,
} from "lucide-react"

export const Navigation = () => {
    const pathname = usePathname()
    const {user} = useUser()

    const routes = [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen
        },
    ]

    if(!user?.username){
        return (
            <ul className="space-y-2">
                {[...Array(2)].map((_,i)=>(
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        )
    }
  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {routes.map((route)=>(
            <NavItem 
                key = {route.href}
                label = {route.label}
                icon = {route.icon}
                href = {route.href}
                isActive = {pathname === route.href}

            />
        ))}
    </ul>
  )
}
