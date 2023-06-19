import React, { useEffect, useState } from "react";
import Canvas1 from "../components/Home/Canvas";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import Link from "next/link";
import avatars from "../public/avatar/Avatar.json";
import { toast } from "react-toastify";
import NoHand from "../components/Avatar/NoHand";
import Hands from "../components/Avatar/Hands";

function OverlayPage() {
  const router = useRouter();

  console.log("avatar json", avatars);

  const [avatarValue, setAvatarValue] = useState("");
  const [found, setFound] = useState(false);
  const [name, setName] = useState("");
  const [activeOverlay,setActiveOverlay] = useState("");

console.log("active overlay",activeOverlay);

  //filer the file to show
  useEffect(() => {
    const fetchAvatarData = async () => {
      const numberToFind = router?.query?.slug;
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

    if (router?.query?.slug) {
      fetchAvatarData();
    }
  }, [router?.query?.slug]);

  console.log("dataman", avatarValue, found, name);

  return (
    <>
      <Head>
        <title>{router?.query?.slug} - FADA GM</title>
      </Head>
      <div className="min-h-screen min-w-screen flex flex-col items-center   lg:p-20 md:p-10 p-5 bg-center bg-cover bg-no-repeat bg-static bg-fixed bg-[url('/bg1.png')]">
        <div className="container-sk">
        
          {found && (
            <Link href="/">
              <Button
                variant="contained"
                className="bg-white text-primary hover:text-white font-bold"
              >
                <ArrowBackIosIcon />
                Back
              </Button>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 lg:gap-20 mt-5">
            <div className="" >
              {found && <Canvas1 activeOverlay={activeOverlay} avatarValue={avatarValue} name={name}/>}
            </div>
            <div className="w-full lg:col-span-2">
            {name !== "1of1" ? <Hands  setActiveOverlay={setActiveOverlay} avatarValue={avatarValue} name={name}/> : <NoHand />}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default OverlayPage;
