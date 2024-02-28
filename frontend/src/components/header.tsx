'use client';

import Link from "next/link";
import { appRoutes } from "./app-layout";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/navigation-menu";

export function Header() {
  return (
    <header className="bg-gradient-to-t from-slate-50 to-rose-700 h-64 flex justify-center items-center">
      <NavigationMenu className="px-4 py-2 bg-slate-50 rounded-[20px]">
        <NavigationMenuList className="flex">

          <NavigationMenuItem>
            <h1 className="font-bold text-xl px-4">Aury</h1>
          </NavigationMenuItem>

          <div className="flex">
            {
              appRoutes.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <Link href={route.path} passHref>
                    <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-xl font-medium`}>
                      {route.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))
            }
          </div>

        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}