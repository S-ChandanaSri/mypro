"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import phhouse from "../../../public/res/images/components/phhouse.png";
import phbuild from "../../../public/res/images/components/phbuild.png";
import { v4 as uuidv4 } from "uuid";

export default function Place({
  selectedOption,
  setSelectedOption,
  setIsLoading,
  setListingid,
}) {
  const [color, setColor] = useState("blue");
  const options = [
    "House",
    "Apartment",
    "Villa",
    "Duplex",
    "Penthouse",
    "Farmhouse",
    "Bungalow",
    "Flats",
    "Studiohouse",
  ];

  const handleColor = (option) => {
    setColor(option);
    setSelectedOption(option);
  };

  return (
    <>
      <div className="mx-auto flex h-[42rem] flex-col items-center pt-7">
        <div className="mt-[28px] h-[6rem] w-[36rem] gap-[46px]">
          <p className="custo-font h-[6rem] w-[36rem] text-center text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]">
            Which of these best describes your place?
          </p>
        </div>
        <div className="grid w-[36rem] grid-cols-3 gap-8 pt-12">
          {options.map((option, index) => (
            <div key={index} className="h-[8rem] gap-[10px]">
              <button
                onClick={() => handleColor(option)}
                className={`h-[8rem] w-[12rem] gap-[10px] rounded-[7px] border-[1px] px-[15px] py-[29px] ${color === option ? "border-[5px] border-blue-700" : "border-[#8E98A8]"}`}
              >
                <div className="relative left-[10px] flex h-[96px] w-[6rem] flex-col items-center gap-[10px]">
                  <Image
                    width={48}
                    height={48}
                    alt=""
                    src={option === "House" ? phhouse : phbuild}
                    className="h-[48px] w-[48px]"
                  />
                  <p className="custo-font h-[38px] w-[5rem] text-[25px] font-[400] leading-[37.5px] tracking-[0.46px] text-[#000000]">
                    {option}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
