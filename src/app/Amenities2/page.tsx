"use client";
import React from "react";
import Image from "next/image";
import plus1 from "../../../public/res/images/infoCards/plus1.png";
import subt1 from "../../../public/res/images/infoCards/subt1.png";

interface Amenities2Props {
  label1: string;
  label2: string;
  handleminus: () => void;
  handleplus: () => void;
  count: number;
}
const Amenities2: React.FC<Amenities2Props> = ({
  label1,
  label2,
  handleminus,
  handleplus,
  count,
}) => {
  return (
    <div>
      <div className="relative top-[106px] flex h-[2.5rem] w-[42rem] justify-between">
        <div>
          <p className="custo-font h-[2rem] w-[13rem] text-lg font-normal leading-[27px] tracking-[0.46px] text-[#000000]">
            {" "}
            {label1}{" "}
          </p>
          <p className="custo-font h-[2.5rem] w-[21rem] pt-1 text-xs font-[300] leading-[18px] tracking-[0.46px] text-[#000000]">
            {label2}
          </p>
        </div>
        <div className="mt-[0.5rem] flex h-[2rem] w-[7rem] gap-[13px]">
          <button
            className="h-[2rem] w-[2rem] rounded-[50%] border-[0.51px] border-[#000000] focus:outline-none focus:ring-2"
            onClick={handleminus}
          >
            <Image
              src={subt1}
              width={14.24}
              height={14.24}
              alt="subt1"
              className="ml-[8px] mt-[1.63px] h-[14.24px] w-[14.24px]"
            />
          </button>
          <p className="custo-font mr-[5px] mt-[3px] h-[27px] w-[11px] text-lg font-normal leading-[27px] tracking-[0.46px] text-[#000000]">
            {" "}
            {count}{" "}
          </p>
          <button
            className="h-[2rem] w-[2rem] rounded-[50%] border-[0.51px] border-[#000000] focus:outline-none focus:ring-2"
            onClick={handleplus}
          >
            <Image
              src={plus1}
              width={14.24}
              height={14.24}
              alt="plus1"
              className="ml-[8px] mt-[1.63px] h-[14.24px] w-[14.24px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Amenities2;
