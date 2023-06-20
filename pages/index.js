import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";
import avatars from "../public/avatar/Avatar.json";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [avatarValue, setAvatarValue] = useState("");
  const [found, setFound] = useState(false);
  const [name, setName] = useState("");

  const fetchAvatarData = async (value) => {
    const numberToFind = value;
    let isFound = false;
    let foundName = "";

    for (let i = 0; i < avatars.length; i++) {
      const avatarObj = avatars[i];
      const avatarKey = Object.keys(avatarObj)[0];
      const avatarValues = avatarObj[avatarKey];

      for (let j = 0; j < avatarValues.length; j++) {
        const avatarValueObj = avatarValues[j];
        const avatarNumber = Object.keys(avatarValueObj)[0];

        if (avatarNumber === numberToFind) {
          const valueToSave = avatarValueObj[avatarNumber];
          setAvatarValue(valueToSave);
          isFound = true;
          foundName = avatarKey;
          break;
        }
      }

      if (isFound) {
        break;
      }
    }

    // Update the found state and name state
    if (isFound) {
      router.push(`/${value}`);
      toast.success("ID found!", { toastId: 0 });
      setFound(isFound);
      setName(foundName);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 0));
      toast.error("Invalid ID.", {
        toastId: 1,
      });
      setFound(false);
      setName("");
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>FADA GM</title>
      </Head>

      <div className="p-5 bg-center min-h-screen  flex flex-col gap-4 justify-between bg-cover bg-no-repeat bg-static bg-fixed backdrop-brightness-50  bg-[url('/bg1.png')]">
        

        <div className=" w-full px-5 md:w-1/2 mx-auto h-fit flex flex-col gap-10">
         <div className="my-20 ">

         <Image
            placeholder="blur"
            src="/gm.png"
            width={1000}
            height={500}
            alt="Picture of the author"
            blurDataURL="/blur.png"
            className="object-contain  w-full  mx-auto"
          />
               <p className="lg:text-xl  md:text-lg text-base text-center   text-[#F3FCFF] font-display font-semibold">
            Powered by FADA Labs
          </p>
         </div>

          <div className="flex w-full justify-center ">
          <input
  onChange={(e) => {
    setValue(e.target.value);
  }}
  onInput={(e) => {
    if (e.target.value.length > 9) {
      e.target.value = e.target.value.slice(0, 9);
    }
  }}
  placeholder="Enter Your #ID"
  className="text-center focus:outline-none w-full lg:w-1/2 lg:text-2xl md:text-xl text-lg px-5 py-3 rounded-xl focus:shadow-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  type="number"
/>
          </div>
          {value ? (
            <Button
              onClick={() => fetchAvatarData(value)}
              variant="contained"
              disabled={value?.length < 1}
              className="bg-[#F3FCFF] rounded-2xl overflow-hidden hover:bg-[#F3FCFF] text-gray-600 font-bold w-fit px-10 mx-auto lg:text-2xl md:text-xl text-lg py-3"
              fullWidth
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                toast.warn("Please Enter Your ID.");
              }}
              className="bg-[#F3FCFF] rounded-2xl hover:bg-[#F3FCFF] text-gray-600 font-bold w-fit px-10 mx-auto lg:text-2xl md:text-xl text-lg py-3"
              fullWidth
            >
              Submit
            </Button>
          )}
     
        </div>

        <span></span>
      </div>
    </>
  );
}
