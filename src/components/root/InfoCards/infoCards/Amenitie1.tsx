import React, { useState } from "react";
import { CardInfo2 } from "@/constants/types";
import Image from "next/image";
import { amenitiesinfo } from "@/constants/arrays";

interface InfoCardsProps {
  title: string;
  subtitle: string;
  guests: number;
  bedrooms: number;
  beds: number;
  setGuests: (value: number) => void;
  setBedrooms: (value: number) => void;
  setBeds: (value: number) => void;
  setIsClicked: (value: number) => void;
  isClicked: number;
  icon: string;
  icon2: string;
}

interface CounterProps {
  label: string;
  count: number;
  setCount: (value: number) => void;
  icon: string;
  icon2: string;
}

const Counter: React.FC<CounterProps> = ({
  label,
  count,
  icon,
  icon2,
  setCount,
}) => {
  return (
    <>
      <div className="relative top-[126px] mb-[30px] flex h-[38px] w-[667px] justify-between">
        <p className="custo-font h-[38px] w-[88px] text-[25px] font-[300] leading-[37.5px] tracking-[0.46px] text-[#000000]">
          {label}
        </p>
        <div className="flex h-[30px] w-[94px] gap-[12px]">
          <button
            className="h-[30px] w-[30px] rounded-[50%] border-[0.51px] border-[#000000]"
            onClick={() => setCount(count + 1)}
          >
            <Image
              src={icon}
              width={17.8}
              height={17.8}
              alt="plus"
              className="relative left-[6.1px] h-[17.8px] w-[17.8px]"
            />
          </button>
          <p className="custo-font h-[27px] w-[11px] text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]">
            {count}
          </p>
          <button
            className="h-[30px] w-[30px] rounded-[50%] border-[0.51px] border-[#000000]"
            onClick={() => setCount(count - 1)}
          >
            <Image
              src={icon2}
              width={14.24}
              height={14.24}
              className="relative left-[7px] top-[1.63px] h-[14.24px] w-[14.24px]"
              alt="minus"
            />
          </button>
        </div>
      </div>
      <div className="relative top-[5.5rem] w-[667px] border-[2px] border-[#8E98A8]"></div>
    </>
  );
};

const Amenitie1: React.FC<InfoCardsProps> = ({
  title,
  subtitle,
  setGuests,
  setBedrooms,
  setBeds,
  setIsClicked,
  guests,
  bedrooms,
  beds,
  isClicked,
  icon,
  icon2,
}) => {
  return (
    <>
      <div className="ml-[22rem] flex h-[670px] flex-col items-center">
        <div className="h-[914px] w-[1166px] rounded-[15px] border-[black]">
          <p className="custo-font relative top-[2rem] h-[4rem] w-[25rem] text-[35px] font-[400] leading-[52.5px] tracking-[0.46px] text-[#000000]">
            {" "}
            {title}{" "}
          </p>
          <p className="custo-font relative top-[5rem] h-[2rem] w-[21rem] text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]">
            {" "}
            {subtitle}{" "}
          </p>
          <div className="mt-[2rem]">
            {amenitiesinfo.map((info) => (
              <Counter
                key={info.label}
                label={info.label}
                count={
                  info.label === "Guests"
                    ? guests
                    : info.label === "Bedrooms"
                      ? bedrooms
                      : beds
                }
                setCount={
                  info.label === "Guests"
                    ? setGuests
                    : info.label === "Bedrooms"
                      ? setBedrooms
                      : setBeds
                }
                icon={info.icon}
                icon2={info.icon2}
              />
            ))}
          </div>
        </div>

        <div className="relative left-[-21.5rem] top-[-2.5rem] h-[10rem] w-[30rem]">
          <p className="custo-font h-[3.5rem] w-[30rem] text-[18px] font-[500] leading-[27px] tracking-[0.46px] text-[#000000]">
            {" "}
            Do bedrooms have separate locks or connected to each other?{" "}
          </p>
          <div className="h-[5.1rem] w-[27rem]">
            <div className="flex h-[2rem] w-[27rem] justify-between pt-4">
              <p className="custo-font h-[2rem] w-[10rem] text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]">
                {" "}
                Separate Lock{" "}
              </p>
              <button
                onClick={() => setIsClicked(0)}
                className={`h-[25px] w-[25px] rounded-[50%] border-[2px] border-[#002855] ${isClicked === 0 ? "bg-blue-800" : ""}`}
              ></button>
            </div>
            <div className="flex h-[2rem] w-[27rem] justify-between pt-8">
              <p className="custo-font h-[2rem] w-[13rem] text-[18px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]">
                {" "}
                Connected to each other{" "}
              </p>
              <button
                onClick={() => setIsClicked(1)}
                className={`h-[25px] w-[25px] rounded-[50%] border-[2px] border-[#002855] ${isClicked === 1 ? "bg-blue-800" : ""}`}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Amenitie1;
