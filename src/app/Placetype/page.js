"use client";
import React, { useEffect, useState } from "react";
import { placetypeinfo } from "@/constants/arrays";
import { strings } from "@/constants/strings";
import Placet from "@/components/root/InfoCards/infoCards/Placet";

export default function Placetype({ listingid }) {
  const [placetype, setPlacetype] = useState(null);

  const handletype = (selectedOption) => {
    setPlacetype(selectedOption.label);
  };

  return (
    <Placet
      title={strings.Placetype.place1.heading}
      cards={placetypeinfo}
      handletype={handletype}
      option={placetype}
    />
  );
}
