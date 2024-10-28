"use client";
import React, { useState } from "react";

export default function Describe({ listingid }) {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    if (event.target.value.length <= 36) {
      setText(event.target.value);
    }
  };

  console.log(";;;;;", text);


  return (
    <>
      <div className="w-[1166px]">
        <div className="ml-[30rem] mt-[10rem] h-[21rem] w-[42rem]">
          <div className="h-[20rem] w-[42rem]">
            <div className="h-[4rem] w-[42rem]">
              <p className="custo-font h-[2rem] w-[42rem] text-[35px] font-[500] leading-[24px] text-[#000000]">
                Create your description
              </p>
              <p className="custo-font h-[1.5rem] w-[42rem] text-[16px] font-[300] leading-[24px] text-[#000000]">
                Share what makes your place special
              </p>
            </div>
            <textarea
              className="h-[13rem] w-[42rem] rounded-[5px] border-[1px] border-[#000000]"
              onChange={handleTextChange}
              value={text}
            ></textarea>
          </div>
        </div>
        <p className="custo-font ml-[30rem] mt-[-3.5rem] h-[24px] w-[42rem] text-[16px] font-[400] leading-[24px] tracking-[0.46px] text-[#000000]">
          {text.length}/26
        </p>
      </div>
    </>
  );
}
