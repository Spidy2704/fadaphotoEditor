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
      <div className=" bg-center min-h-screen py-20 flex flex-col gap-4 justify-between bg-cover bg-no-repeat bg-static bg-fixed bg-[url('/bg1.png')]">
        <div>
          <Image
            placeholder="blur"
            src="/gm.png"
            width={500}
            height={500}
            alt="Picture of the author"
            blurDataURL="/blur.png"
            className="object-contain  mx-auto px-8"
          />
          <p className="lg:text-xl md:text-lg text-base text-center text-[#E27D48] font-display">Powered by FADA Labs</p>
        </div>

        <div className=" w-full px-5 md:w-1/2 mx-auto h-fit flex flex-col gap-10">
          <div className="">
            <TextField
              id="standard-basic"
              label="Enter Your #ID"
              className="w-full "
              variant="standard"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          {value ? (
            <Button
              onClick={() => fetchAvatarData(value)}
              variant="contained"
              disabled={value?.length < 1}
              className="bg-[#F3FCFF] hover:bg-[#F3FCFF] text-gray-800 w-fit px-10 mx-auto lg:text-2xl md:text-xl text-lg py-3"
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
              className="bg-[#F3FCFF] hover:bg-[#F3FCFF] text-gray-800 w-fit px-10 mx-auto lg:text-2xl md:text-xl text-lg py-3"
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
