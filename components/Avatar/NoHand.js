import React from "react";

export default function NoHand() {
  return (
    <div className=" h-full py-auto flex flex-col gap-2 justify-center lg:min-h-[500px]">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-red-700">
        Attention !!
      </h1>

      <p className=" lg:text-lg text-base font-bold  text-gray-700">
        The Image  is not properly sized . <br/>
        You are not allowed to use categories.
      </p>
    </div>
  );
}
