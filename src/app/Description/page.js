"use client";
import React, { useState } from "react";
import Image from "next/image";

import Describehome from "@/components/root/InfoCards/infoCards/Describehome";
import { strings } from "@/constants/strings";
import { Describeinfo } from "@/constants/arrays";

export default function Description({ listingid }) {
  const [selectedopt, setSelectedOpt] = useState([]);

  const handlecolor = (option) => {
    if (selectedopt.includes(option)) {
      setSelectedOpt(selectedopt.filter((item) => item !== option));
    } else if (selectedopt.length < 2) {
      setSelectedOpt([...selectedopt, option]);
    }
  };

  console.log("99999", selectedopt);
 
  return (
    <Describehome
      title={strings.Describehome.heading}
      subtitle={strings.Describehome.subheading}
      cards={Describeinfo}
      handlecolor={handlecolor}
      selectedopt={selectedopt}
    />
  );
}
