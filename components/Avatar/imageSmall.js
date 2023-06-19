import Image from "next/image";
import React from "react";

export default function imageSmall({ item, avatarValue, setActiveOverlay }) {
  console.log(item, avatarValue);

  return (
    <div>
      {Object.entries(item).map(([key, value]) => (
        <div
          key={key}
          className="flex flex-wrap gap-4 lg:justify-start justify-center p-2"
        >
          {value.map((image, index) => (
            <div
              key={index}
              className="relative cursor-pointer p-1 hover:scale-105 duration-300 hover:border-primary hover:border"
              onClick={() => {
                setActiveOverlay(Object.values(image)[0]);
              }}
            >
              <Image
                width={100}
                height={100}
                key={index}
                src={avatarValue}
                alt="Main"
              />
              <Image
                width={100}
                height={100}
                key={index}
                src={Object.values(image)[0]}
                alt={Object.keys(image)[0]}
                className="absolute  top-0"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
