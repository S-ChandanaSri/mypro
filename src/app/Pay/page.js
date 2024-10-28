"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import imageimage from "../../../public/res/images/components/imageimage.png";

export default function Pay({ listingid, salary }) {
  const [num, setNum] = useState(0);
  console.log("///", listingid);
  //const [salary,setSalary]=useState(1000);
  const [addition, setAddition] = useState(0);
  useEffect(() => {
    const calculatedAddition = parseInt(salary, 10) + parseInt(num, 10);
    setAddition(calculatedAddition);
  }, [salary, num]);

  const handleNumChange = (e) => {
    setNum(e.target.value);
  };
  console.log("add", addition);

  
  return (
    <>
      <div className="w-[1166px]">
        <div className="relative left-[470px] top-[80px] h-[508px] w-[672px]">
          <div className="h-[67px] w-[637px]">
            <p className="custo-font h-[34px] w-[637px] text-[35px] font-[500] leading-[24px] text-[#000000]">
              Now set your price
            </p>
            <p className="custo-font h-[23px] w-[637px] text-[16px] font-[300] leading-[24px] text-[#000000]">
              Don’t worry you can change this later
            </p>
          </div>
          <div className="flex h-[481px] w-[672px] flex-col items-center">
            <div className="relative top-[50px] flex h-[49px] w-[185px] items-center">
              <Image
                width={40}
                alt=""
                src={imageimage}
                className="w-[40px] pb-6 pr-1"
              />
              <p className="custo-font h-[49px] w-[145px] text-[56px] font-[600] leading-[24px] text-[#000000]">
                {salary}
              </p>
            </div>
            <div className="relative top-[80px] h-[191px] w-[672px] border-[2px] border-[#000000B2]">
              <div className="flex h-[61px] w-[647px] items-center justify-between pl-3">
                <p className="custo-font h-[24px] w-[84px] text-[16px] font-[400] leading-[24px] text-[#000000]">
                  Base price
                </p>
                <p className="custo-font h-[24px] w-[85px] text-[16px] font-[400] leading-[24px] text-[#000000]">
                  {salary}
                </p>
              </div>
              <div className="w-[671px] border-[1px] border-[#8E98A8]"></div>
              <div className="flex h-[61px] w-[647px] items-center justify-between pr-3">
                <p className="custo-font h-[24px] w-[89px] pl-2 text-[16px] font-[400] leading-[24px] text-[#000000]">
                  Guest fee
                </p>
                <input
                  value={num}
                  onChange={handleNumChange}
                  className="custo-font h-[24px] w-[85px] pl-3 text-[16px] font-[400] leading-[24px] text-[#000000] focus:outline-none"
                />
              </div>
              <div className="w-[671px] border-[1px] border-[#8E98A8]"></div>
              <div className="flex h-[24px] w-[647px] justify-between pl-3 pt-5">
                <p className="custo-font h-[24px] w-[145px] text-[16px] font-[400] leading-[24px] text-[#000000]">
                  Total before taxes
                </p>
                <p className="custo-font h-[24px] w-[85px] text-[16px] font-[400] leading-[24px] text-[#000000]">
                  {addition}
                </p>
              </div>
            </div>
            <div className="relative top-[90px] h-[64px] w-[672px] border-[2px] border-[black]">
              <div className="h-[64px] w-[672px]">
                <div className="flex h-[24px] w-[647px] justify-between pl-3 pt-5">
                  <p className="custo-font h-[24px] w-[145px] pl-3 text-[16px] font-[400] leading-[24px] text-[#000000]">
                    You Earn
                  </p>
                  <p className="custo-font h-[24px] w-[85px] text-[16px] font-[400] leading-[24px] text-[#000000]">
                    {addition}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
