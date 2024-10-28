"use client";
import React, { useEffect, useState } from "react";
import outline from "../../../public/res/images/components/outline.png";
import arrowd from "../../../public/res/images/components/arrowd.png";
import Vector from "../../../public/res/images/components/Vector.png";
import plus from "../../../public/res/images/components/plus.png";
import Link from "next/link";
import Navbar from "../Navbar/page.js";
import Image from "next/image";

export default function Propertylisting() {
  const options = ["Beds", "Baths", "Bedrooms", "Amenities"];
  const [dropdownId, setDropdownId] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  //const baseURL = 'http://localhost:3001/uploads';

  const handleDropdownToggle = (id) => {
    setDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;

    console.log(";;", newStatus, id);

    fetch("http://localhost:3001/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status: newStatus }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.text().then((text) => {
          throw new Error(text);
        });
      })
      .then((data) => {
        console.log("Response data:", data);
        console.log("success");

        console.log("success", data.id);
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleCheckboxChange = (id, option) => (event) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [option]: event.target.checked,
      },
    }));
  };

  const [listt, setListt] = useState([]);
  const [query, setQuery] = useState("");


  let lastId = null;
  console.log("p", listt);
  if (listt && listt.length > 0) {
    for (const item of listt) {
      if (lastId === null || item.id > lastId) {
        lastId = item.id;
      }
    }
  }

  const filteredList = listt.filter(
    (dat) =>
      dat.listing && dat.listing.toLowerCase().includes(query.toLowerCase()),
  );
  const remainingRows = 5 - filteredList.length;

  return (
    <div className="h-[70rem] bg-[#FFFFFF]">
      <Navbar />

      <p className="custo-font ml-[83px] mt-[16px] h-[2.5rem] w-[8rem] text-2xl font-normal leading-[37.5px] tracking-[0.46px] text-[#000000]">
        {lastId}listings
      </p>
      <div className="flex">
        <div className="relative left-[73px] top-[35px] h-[2rem] w-[24rem] gap-[10px] rounded-[14px] border-[1px] border-[#8E98A8] px-2.5 py-[4px]">
          <div className="flex h-[18px] w-[9rem] gap-[3px]">
            <Image
              src={outline}
              alt=""
              className="h-[1rem] w-[1rem] pt-[2px]"
            />
            <input
              placeholder="search listings"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="custo-font h-[18px] w-[8rem] border-0 text-lg font-[300] leading-[24px] tracking-[0.46px] text-[#002855] focus:border-0 focus:outline-none"
            />
          </div>
        </div>
        <div className="relative ml-[7rem] mt-[35px] h-[2rem] w-[10rem] gap-[10px] rounded-[14px] border-[1px] border-[#8E98A8] px-2">
          <div className="flex h-[18px] w-[149px] gap-[5px] pt-1">
            <p className="custo-font h-[18px] w-[128px] text-[14px] font-[300] leading-[21px] tracking-[0.46px] text-[#002855CC]">
              Rooms and beds
            </p>
            <Image src={arrowd} alt="" className="h-[16px] w-[16px]" />
          </div>
        </div>
        <div className="relative ml-[2rem] mt-[35px] h-[30px] w-[122px] gap-[10px] rounded-[14px] border-[1px] border-[#8E98A8] px-[8px]">
          <div className="flex h-[18px] w-[106px] gap-[5px] pt-1">
            <p className="custo-font h-[18px] w-[87px] text-[14px] font-[300] leading-[21px] tracking-[0.46px] text-[#002855CC]">
              Ammenities
            </p>
            <Image alt="" src={arrowd} className="h-[20px] w-[18px] pr-[7px]" />
          </div>
        </div>
        <div className="relative top-[35px] ml-[2rem] h-[30px] w-[164px] gap-[10px] rounded-[14px] border-[1px] border-[#8E98A8] px-[8px]">
          <div className="flex h-[18px] w-[144px] gap-[5px] pt-1">
            <p className="custo-font h-[18px] w-[137px] pl-2 text-[14px] font-[300] leading-[21px] tracking-[0.46px] text-[#002855CC]">
              Listing status
            </p>
            <Image
              alt=""
              src={arrowd}
              className="h-[22px] w-[30px] pr-4 pt-[0px]"
            />
          </div>
        </div>

        <Link href="/components/Listings">
          <button className="relative left-[20rem] top-[28px] flex h-[38px] w-[149px] rounded-[8px] bg-[#002855] px-[16px] py-[10px]">
            <Image alt="" src={plus} className="h-[24px] w-[24px]" />
            <p className="inter-font h-[20px] w-[87px] text-[14px] font-[500] leading-[20px] text-[white]">
              create listing
            </p>
          </button>
        </Link>
      </div>

      <div className="ml-[83px] mt-[57px] h-[60rem] w-[85rem] gap-[32px] rounded-[4px] bg-[#FFFFFF] px-[40px]">
        <div className="h-[55rem] w-[82.5rem] rounded-[4px]">
          <div className="h-[55rem] w-[16rem]">
            <table className="h-[55rem] w-[82.5rem] border-collapse">
              <thead>
                <tr>
                  <th className="h-[59.33px] w-[15rem] border-b border-[#E7EAEE] p-[8px]">
                    Listings
                  </th>
                  <th className="h-[59.33px] w-[15rem] border-b border-[#E7EAEE] p-[8px]">
                    Status
                  </th>
                  <th className="h-[59.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]">
                    Todo
                  </th>
                  <th className="h-[59.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]">
                    Bedrooms
                  </th>
                  <th className="h-[59.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]">
                    Beds
                  </th>
                  <th className="h-[59.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]">
                    Location
                  </th>
                  <th className="h-[59.33px] w-[15rem] border-b border-[#E7EAEE] p-[8px]">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((dat) => (
                  <tr key={dat.id}>
                    <td className="flex h-[182.33px] w-[16rem] items-center justify-around border-b border-[#E7EAEE] p-[8px]">
                      {(() => {
                        console.log("Rendering image for listing ID:", dat.id);
                        console.log("Image URL:", dat.image);

                        if (!dat.image) {
                          console.warn(
                            "No image URL found for listing ID:",
                            dat.id,
                          );
                          return null;
                        }

                        if (!dat.image.startsWith("blob:")) {
                          console.warn(
                            "Image URL is not a Blob URL, it might be invalid:",
                            dat.image,
                          );
                        }

                        return (
                          <Image
                            key={dat.image}
                            width={100}
                            height={75}
                            src={dat.image}
                            alt={dat.listing || "Image"}
                            className="h-auto w-[100px]"
                            onError={() =>
                              console.error("Failed to load image:", dat.image)
                            }
                          />
                        );
                      })()}
                      <p>{dat.listing}</p>
                    </td>
                    <td className="h-[136.33px] w-[15rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      <select
                        value={dat.status}
                        onChange={(e) => handleStatusChange(e, dat.id)}
                        className="rounded border p-1"
                      >
                        <option value="in-progress">In Progress</option>
                        <option value="finished">Finished</option>
                      </select>
                    </td>
                    <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      {dat.status}
                    </td>
                    <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      {dat.bedrooms}
                    </td>
                    <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      {dat.beds}
                    </td>
                    <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      {dat.district}
                    </td>
                    <td className="relative left-[95px] h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px] text-center">
                      <Image
                        src={Vector}
                        alt="edit icon"
                        onClick={() => handleDropdownToggle(dat.id)}
                        className="cursor-pointer"
                      />
                      {dropdownId === dat.id && (
                        <div className="absolute right-[140px] mt-2 w-48 rounded bg-[#E9EBF8] p-2">
                          {options.map((option) => (
                            <div
                              key={option}
                              className="cursor-pointer px-4 py-2"
                            >
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={checkedItems[dat.id?.option]}
                                  onChange={handleCheckboxChange(
                                    dat.id,
                                    option,
                                  )}
                                />
                                <span className="ml-2">{option}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {remainingRows > 0 &&
                  Array.from({ length: remainingRows }).map((_, idx) => (
                    <tr key={`placeholder-${idx}`}>
                      <td className="flex h-[136.33px] w-[244px] items-center justify-around border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="h-[136.33px] w-[15rem] border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]"></td>
                      <td className="relative left-[55px] h-[136.33px] w-[7rem] border-b border-[#E7EAEE] p-[8px]"></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
