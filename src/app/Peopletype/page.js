"use client";
import React, { useState } from "react";
import People from "@/components/root/InfoCards/infoCards/People";
import { peopletypeinfo } from "@/constants/arrays";
import { strings } from "@/constants/strings";

export default function Peopletype({ listingid }) {
  const [peopletype, setPeopletype] = useState(null);

  const handlepeople = (secondoption) => {
    setPeopletype(secondoption.label);
  };
 

  return (
    <People
      title={strings.peopletype.heading}
      subtitle={strings.peopletype.subheading}
      cards={peopletypeinfo}
      handlepeople={handlepeople}
      option={peopletype}
    />
  );
}
