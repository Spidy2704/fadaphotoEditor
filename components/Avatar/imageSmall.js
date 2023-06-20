import Image from "next/image";
import React from "react";

export default function imageSmall({
  item,
  avatarValue,
  setActiveOverlay,
  activeOverlay,
}) {
  console.log("|1231231",activeOverlay);

  return (
    <div>
      {Object.entries(item).map(([key, value]) => (
        <div
          key={key}
          className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-4 lg:gap-6 lg:justify-start justify-center p-2"
        >
          {value.map((image, index) => (
            <div
              key={index}
              className={`relative cursor-pointer rounded-2xl overflow-hidden bg-primary duration-300  ${activeOverlay == Object.values(image)[0] ? "border-2 border-black" : "hover:shadow-xl hover:border"}`}
              onClick={() => {
                setActiveOverlay(Object.values(image)[0]);
              }}
            >
              <Image
                width={200}
                height={200}
                key={index}
                src={avatarValue}
                alt="Main"
                className="w-full object-contain"
              />
              <Image
                width={200}
                height={200}
                key={index}
                src={Object.values(image)[0]}
                alt={Object.keys(image)[0]}
                className="absolute  top-0 w-full object-contain"
              />
              <p className="text-center font-bold py-3 px-2 text-white">
                {Object.values(image)[0].split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
