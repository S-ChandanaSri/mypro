"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
//import { useLocation, useNavigate } from 'react-router-dom';

export default function Address() {
  const iframeRef = useRef(null);
  const [loadingg, setLoadingg] = useState(true);
  const options = useMemo(() => countryList().getData(), []);
  const [error, setError] = useState(null);
  const [valuee, setValue] = useState(null);
  //const location = useLocation();
  //console.log("llllllllllll",location.state)

  const [address, setAddress] = useState({
    road: "",
    city: "",
    country: "",
    zipcode: "",
    street: "",
    state: "",
    country_code: "",
    village: "",
    mandal: "",
    district: "",
  });

  const changeHandler = (selectedOption) => {
    setValue(selectedOption);
    setAddress((prevAddress) => ({
      ...prevAddress,
      country: selectedOption.label,
      country_code: selectedOption.value,
    }));
  };

  if (loadingg) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="relative left-[350px] top-[10px] flex h-[670px] flex-col items-center">
        <p className="custo-font h-[68px] w-[597px] text-[45px] font-[400] leading-[67.5px] tracking-[0.46px] text-[#000000]">
          {" "}
          Confirm your address{" "}
        </p>
        <p className="custo-font h-[54px] w-[852px] text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]">
          {" "}
          Your address will only be shared with your guest only after they have
          made rservations{" "}
        </p>
        <div className="left-[251px] top-[364px] h-[76px] w-[709px] rounded-[5px] border-[1px] border-[#000000] px-[10px] py-[12px]">
          <Select
            options={options}
            value={valuee}
            className="h-full w-full border-none outline-none"
            onChange={changeHandler}
            styles={{
              control: (base) => ({
                ...base,
                height: "100%",
                border: "none",
                boxShadow: "none",
              }),
            }}
          >
            {valuee && (
              <p>
                <span>{valuee.value} </span> {valuee.label}
              </p>
            )}
          </Select>
        </div>
        <div className="relative top-[2px] h-[402px] w-[709px] rounded-[5px] border-[1px] border-[#000000] px-[10px] py-[12px]">
          <div className="pt-3">
            <div className="h-[57x] w-[210px] gap-[3px]">
              <p className="custo-font h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                Street address
              </p>
              <p className="custo-font relative bottom-1.5 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.street}
                {address.village}
              </p>
            </div>
            <div className="left-[250px] top-[533px] w-[710px] border-[1px] border-[#8E98A8]"></div>
            <div className="w-[210px] gap-[3px]">
              <p className="custo-font relative top-1 h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                Mandal
              </p>
              <p className="custo-font relative bottom-1.5 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.mandal}
              </p>
            </div>
            <div className="left-[250px] top-[533px] w-[710px] border-[1px] border-[#8E98A8]"></div>
            <div className="h-[57x] w-[210px] gap-[3px]">
              <p className="custo-font relative top-1 h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                City
              </p>
              <p className="custo-font relative bottom-1.5 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.city}
              </p>
            </div>
            <div className="left-[250px] top-[533px] w-[710px] border-[1px] border-[#8E98A8]"></div>
            <div className="h-[57x] w-[210px] gap-[3px]">
              <p className="custo-font relative top-1 h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                City
              </p>
              <p className="custo-font relative bottom-1.5 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.district}
              </p>
            </div>
            <div className="left-[250px] top-[533px] w-[710px] border-[1px] border-[#8E98A8]"></div>
            <div className="h-[57x] w-[210px] gap-[3px]">
              <p className="custo-font relative top-1 h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                State
              </p>
              <p className="custo-font relative bottom-1.5 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.state}
              </p>
            </div>
            <div className="left-[250px] top-[533px] w-[710px] border-[1px] border-[#8E98A8]"></div>
            <div className="h-[57x] w-[210px] gap-[3px]">
              <p className="custo-font relative top-1 h-[34px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                zipcode
              </p>
              <p className="custo-font relative bottom-2 h-[24px] w-[210px] text-[16px] font-[300] leading-[24px] tracking-[0.46px] text-[#8E98A8]">
                {address.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
