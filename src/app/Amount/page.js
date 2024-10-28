"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Image from "next/image";
import imageimage from "../../../public/res/images/components/imageimage.png";
import Group from "../../../public/res/images/components/Group.png";

export default function Amount({ salary, setSalary }) {
  const [edit, setEdit] = useState(false);
  const decimalDigits = 0;

  const handleedit = () => {
    setEdit(true);
  };

  const onChangehandler = (e) => {
    setSalary(e.target.value);
  };

  const onBluehandler = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setSalary(value.toFixed(decimalDigits));
    }
    setEdit(false);
  };

  return (
    <div className="w-[1166px]">
      <div className="relative left-[470px] top-[140px] h-[257px] w-[672px]">
        <div className="h-[306px] w-[672px]">
          <div className="h-[67px] w-[637px]">
            <p className="custo-font h-[34px] w-[637px] text-[35px] font-[500] leading-[24px] text-[#000000]">
              Now set your price
            </p>
            <p className="custo-font h-[23px] w-[637px] pt-4 text-[16px] font-[300] leading-[24px] text-[#000000]">
              Don’t worry you can change this later
            </p>
          </div>
          {edit ? (
            <TextField
              id="outlined-adornment-amount"
              label="Amount"
              fullWidth
              sx={{ m: 1 }}
              type="number"
              value={salary}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={onChangehandler}
              onBlur={onBluehandler}
            />
          ) : (
            <div className="mt-[3rem] flex h-[10rem] w-[42rem] items-center border-[2px] border-[black]">
              <Image
                width={40}
                src={imageimage}
                className="ml-[14rem] mt-[1rem] w-[2.5rem] pb-6 pr-1"
                alt="Currency Symbol"
              />
              <p className="custo-font ml-[20px] mt-[10px] h-[3rem] w-[145px] text-[56px] font-[600] leading-[24px] text-[#000000]">
                {salary}
              </p>
              <button
                onClick={handleedit}
                className="absolute right-[20px] top-[12rem] -translate-y-1/2 transform"
              >
                <Image
                  width={17}
                  height={17}
                  src={Group}
                  className="h-[1rem] w-[1rem]"
                  alt="Edit Icon"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
