"use client";

import React, { useState, useEffect } from "react";
import { strings } from "@/constants/strings";
import {
  ouramenitiesinfo2,
  OurAmenitiesnfo,
  ouramenitiesinfo3,
} from "@/constants/arrays";
import { useRouter } from "next/navigation";
import InfoCards from "@/components/root/InfoCards/infoCards/Amenities";

export default function Amenities({ listingid }) {
  const [selectedoption, setSelectedOption] = useState([]);
  const router = useRouter();

  const handleClick = (option) => {
    if (selectedoption.includes(option.label)) {
      setSelectedOption(selectedoption.filter((item) => item !== option.label));
    } else {
      setSelectedOption([...selectedoption, option.label]);
    }
  };

  const handleClick1 = (option1) => {
    if (selectedoption.includes(option1.label)) {
      setSelectedOption(
        selectedoption.filter((item) => item !== option1.label),
      );
    } else {
      setSelectedOption([...selectedoption, option1.label]);
    }
  };

  const handleClick3 = (option3) => {
    if (selectedoption.includes(option3.label)) {
      setSelectedOption(
        selectedoption.filter((item) => item !== option3.label),
      );
    } else {
      setSelectedOption([...selectedoption, option3.label]);
    }
  };

 

  return (
    <>
      <div className="h-[1770px]">
        <InfoCards
          title={strings.Amenity.guestamenities.heading}
          subText={strings.Amenity.guestamenities.subHeading}
          cards={OurAmenitiesnfo}
          handleClick={handleClick}
          selectedOption={selectedoption}
        />

        <InfoCards
          title={strings.Amenity.guestamenities1.heading}
          cards={ouramenitiesinfo2}
          handleClick={handleClick1}
          selectedOption={selectedoption}
        />

        <InfoCards
          title={strings.Amenity.guestamenities1.heading}
          cards={ouramenitiesinfo3}
          handleClick={handleClick3}
          selectedOption={selectedoption}
        />
      </div>
    </>
  );
}
