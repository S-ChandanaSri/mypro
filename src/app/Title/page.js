"use client";
import React, { useState } from "react";

export default function Title({ listingid }) {
  const [textt, setTextt] = useState("");

  const handleTextChangee = (event) => {
    if (event.target.value.length <= 36) {
      setTextt(event.target.value);
    }
  };

  console.log("title", textt);

  return (
    <>
      <div className="w-[1166px]">
        <div className="ml-[470px] mt-[150px] h-[21rem] w-[42rem]">
          <div className="h-[20rem] w-[42rem]">
            <div className="h-[4rem] w-[42rem]">
              <p className="custo-font h-[2rem] w-[42rem] text-[35px] font-[500] leading-[24px] text-[#000000]">
                Now,let’s give your property a title
              </p>
              <p className="custo-font h-[23px] w-[42rem] text-[16px] font-[300] leading-[24px] text-[#000000]">
                Short title works best Don’t woory you can change it later
              </p>
            </div>
            <textarea
              className="h-[13rem] w-[42rem] rounded-[5px] border-[1px] border-[#000000]"
              onChange={handleTextChangee}
              value={textt}
            ></textarea>
          </div>
        </div>
        <p className="custo-font relative ml-[470px] mt-[-4rem] h-[24px] w-[42rem] text-[16px] font-[400] leading-[24px] tracking-[0.46px] text-[#000000]">
          {textt.length}/26
        </p>
      </div>
    </>
  );
}
