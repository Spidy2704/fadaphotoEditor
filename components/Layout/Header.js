import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import MenuIcon from "@mui/icons-material/Menu";
import Router, { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';


export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white ">
      <div className="container-sk py-2 flex justify-between gap-8 items-center">
        <Link href="/">
          <Image
            placeholder="blur"
            src="/logo.png"
            width={500}
            height={500}
            alt="logo"
            className="object-contain h-10 md:h-[55px] w-fit my-auto"
            blurDataURL="/blur.png "
          />
        </Link>

        <div className=" hidden md:flex justify-between items-center gap-6 tracking-wide lg:text-lg text-base">
          <Link
            href="/"
            className={`${
              router.pathname == "about-us" &&
              " underline underline-offset-4 text-red-600"
            }  lg:text-lg md:text-base text-sm tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
          >
            About&nbsp;Us
          </Link>
          <Link
            href="/"
            className={`${
              router.pathname == "all-listings" &&
              " underline underline-offset-4 text-red-600"
            }  lg:text-lg md:text-base text-sm tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
          >
            All&nbsp;Listings
          </Link>
          <Link
            href="/"
            className={`${
              router.pathname == "become-a-host" &&
              " underline underline-offset-4 text-red-600"
            }  lg:text-lg md:text-base text-sm tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
          >
            Become&nbsp;Host
          </Link>
        </div>

        <div className=" hidden md:flex justify-between items-center gap-6 tracking-wide lg:text-lg text-base">
          <Link href="/signin">
            <Button className="capitalize lg:text-lg md:text-base text-sm rounded-full  bg-primary3 hover:bg-primary px-4 lg:px-10 text-white">
              Sign&nbsp;in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="outlined"
              className="capitalize lg:text-lg md:text-base text-sm rounded-full  text-primary3 hover:text-primary px-4 lg:px-10 bg-white border-primary3 border hover:border-primary"
            >
              Sign&nbsp;Up
            </Button>
          </Link>
        </div>

        <IconButton
          onClick={toggleDrawer}
          className=" bg-secondary/10 hover:bg-secondary/30 duration-300 md:hidden"
        >
          <MenuIcon className="text-black" />
        </IconButton>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="text-white"
      >

   
        <div className="h-full bg-footerbg ">

        <IconButton onClick={()=>toggleDrawer()} className="m-3"><CloseIcon className="text-white"/></IconButton>
          <Image
            placeholder="blur"
            src="/logo2.png"
            width={500}
            height={500}
            alt="logo"
            className="object-contain h-[85px] w-fit p-4 my-auto mx-auto "
            blurDataURL="/blur.png "
          />

          <div className=" flex justify-center items-center flex-col gap-4 tracking-wide lg:text-lg text-base mt-10">
            <Link
              onClick={() => toggleDrawer()}
              href="/"
              className={`${
                router.pathname == "about-us" &&
                " underline underline-offset-4 text-red-600"
              }  lg:text-lg text-base tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
            >
              About&nbsp;Us
            </Link>
            <Link
              onClick={() => toggleDrawer()}
              href="/"
              className={`${
                router.pathname == "all-listings" &&
                " underline underline-offset-4 text-red-600"
              }  lg:text-lg text-base tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
            >
              All&nbsp;Listings
            </Link>
            <Link
              onClick={() => toggleDrawer()}
              href="/"
              className={`${
                router.pathname == "become-a-host" &&
                " underline underline-offset-4 text-red-600"
              }  lg:text-lg text-base tracking-wide hover:underline underline-offset-4 hover:text-red-600 duration-300`}
            >
              Become&nbsp;Host
            </Link>




            <Link href="/signin" className="w-full px-5"    onClick={() => toggleDrawer()}>
            <Button className="capitalize lg:text-lg md:text-base text-sm rounded-full  bg-primary3 hover:bg-primary w-full text-white">
              Sign&nbsp;in
            </Button>
          </Link>
          <Link href="/signup" className="w-full px-5"     onClick={() => toggleDrawer()}>
            <Button
              variant="outlined"
              className="capitalize lg:text-lg md:text-base text-sm rounded-full  text-primary3 hover:text-primary w-full bg-white border-primary3 border hover:border-primary"
            >
              Sign&nbsp;Up
            </Button>
          </Link>





          </div>
        </div>
      </Drawer>
    </nav>
  );
}
