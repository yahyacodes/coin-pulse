"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Logs } from "lucide-react";

export function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between">
        <NavigationMenu className="lg:w-[60rem] md:w-[40rem] w-[24rem] mx-auto md:border mt-4 border-neutral-300 rounded-md p-2 relative bg-background">
          <NavigationMenuList className="md:w-full md:flex md:items-center md:justify-between">
            <NavigationMenuItem className="xl:mr-24 md:mr-0 md:flex hidden">
              <Link href="/" className="flex gap-0">
                <svg
                  fill="none"
                  height="35"
                  viewBox="0 0 38 48"
                  width="38"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="m19 12.5c-4.1421 0-7.5-3.35786-7.5-7.5h-5c0 6.9036 5.5964 12.5 12.5 12.5s12.5-5.5964 12.5-12.5h-5c0 4.14214-3.3579 7.5-7.5 7.5zm-7.5 30.5c0-4.1421 3.3579-7.5 7.5-7.5s7.5 3.3579 7.5 7.5h5c0-6.9036-5.5964-12.5-12.5-12.5s-12.5 5.5964-12.5 12.5zm-4-19c0-4.1421-3.35786-7.5-7.5-7.5v-5c6.90356 0 12.5 5.5964 12.5 12.5s-5.59644 12.5-12.5 12.5v-5c4.14214 0 7.5-3.3579 7.5-7.5zm23 0c0-4.1421 3.3579-7.5 7.5-7.5v-5c-6.9036 0-12.5 5.5964-12.5 12.5s5.5964 12.5 12.5 12.5v-5c-4.1421 0-7.5-3.3579-7.5-7.5z"
                    fill="#0c111d"
                    fill-rule="evenodd"
                  />
                </svg>

                <h1 className="font-bold text-xl mt-1">CoinPulse</h1>
              </Link>
            </NavigationMenuItem>
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } md:block absolute md:relative top-full md:mt-0 md:left-0 mt-8 left-10 right-0`}
            >
              <div className="flex flex-col md:flex-row">
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Link href={"/about"}>About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Link href={"/trending-coin"}>Trending Coin</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Link href={"/contact-us"}>Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </div>
            </div>
          </NavigationMenuList>

          <NavigationMenuList className="flex md:hidden justify-center">
            <div className="flex">
              <NavigationMenuItem>
                <Link href="/" className="flex gap-0">
                  <svg
                    fill="none"
                    height="35"
                    viewBox="0 0 38 48"
                    width="38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="m19 12.5c-4.1421 0-7.5-3.35786-7.5-7.5h-5c0 6.9036 5.5964 12.5 12.5 12.5s12.5-5.5964 12.5-12.5h-5c0 4.14214-3.3579 7.5-7.5 7.5zm-7.5 30.5c0-4.1421 3.3579-7.5 7.5-7.5s7.5 3.3579 7.5 7.5h5c0-6.9036-5.5964-12.5-12.5-12.5s-12.5 5.5964-12.5 12.5zm-4-19c0-4.1421-3.35786-7.5-7.5-7.5v-5c6.90356 0 12.5 5.5964 12.5 12.5s-5.59644 12.5-12.5 12.5v-5c4.14214 0 7.5-3.3579 7.5-7.5zm23 0c0-4.1421 3.3579-7.5 7.5-7.5v-5c-6.9036 0-12.5 5.5964-12.5 12.5s5.5964 12.5 12.5 12.5v-5c-4.1421 0-7.5-3.3579-7.5-7.5z"
                      fill="#0c111d"
                      fill-rule="evenodd"
                    />
                  </svg>

                  <h1 className="font-bold text-xl mt-1">CoinPulse</h1>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="flex justify-end mt-2">
                <Logs className="text-primary ml-40" onClick={toggleMenu} />
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-background h-full z-40 md:hidden p-4 rounded-br-3xl">
          {/* This div creates a full-screen white background when the menu is open on small screens */}
        </div>
      )}
    </>
  );
}
