"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { svgs } from "@/constants/images";
import { strings } from "@/constants/strings";
import {
  filterData,
  FilterOptionAmenitiesEssentials,
  FilterOptionBathroomsList,
  FilterOptionBedsList,
  FilterOptionHostLanguages,
  FilterOptionPropertyTypes,
} from "@/constants/filterOptionFlowArrays";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function FilterOptionFlow({ setPopup }: any) {
  const [beds, setBeds] = useState<string[]>([]);
  const [bathrooms, setBathrooms] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("15");
  const [maxPrice, setMaxPrice] = useState<string>("105");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("/api/properties", {
    //
    //         beds: beds.join(","),
    //         bathrooms: bathrooms.join(","),
    //         propertyType: propertyType.join(","),
    //         minPrice,
    //         maxPrice,
    //
    //     });
    //     setFilteredData(response.data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }

    // };

    // fetchData();

    console.log({
      beds: beds.join(","),
      bathrooms: bathrooms.join(","),
      propertyType: propertyType.join(","),
      minPrice,
      maxPrice,
      amenities: selectedAmenities.join(","),
      languages: selectedLanguages.join(","),
    });
  }, [
    beds,
    bathrooms,
    propertyType,
    minPrice,
    maxPrice,
    selectedAmenities,
    selectedLanguages,
  ]);

  const handleBedClick = (bed: string) => {
    setBeds((prev) =>
      prev.includes(bed) ? prev.filter((b) => b !== bed) : [...prev, bed],
    );
  };

  const handleBathroomClick = (bathroom: string) => {
    setBathrooms((prev) =>
      prev.includes(bathroom)
        ? prev.filter((b) => b !== bathroom)
        : [...prev, bathroom],
    );
  };

  const handlePropertyTypeClick = (type: string) => {
    setPropertyType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities((prev: string[]) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev: string[]) =>
      prev.includes(language)
        ? prev.filter((item) => item !== language)
        : [...prev, language],
    );
  };
  return (
    <div className="inset-0 flex items-center justify-center bg-neutral-800 bg-opacity-50">
      <div className="popup max-h-[40rem] w-[26.25rem] rounded-2xl bg-neutral-50 font-serif md:w-[45rem] lg:w-[55.5rem]">
        <div className="flex h-11 flex-row justify-start p-2">
          <div className="flex w-full flex-row items-center">
            <div className="relative h-9 w-9" onClick={() => setPopup(false)}>
              <Image src={svgs.filterXcross} alt="xcross icon" fill={true} />
            </div>
            <div className="w-full text-center text-lg">
              {strings.filterOptionFlow.filters}
            </div>
          </div>
        </div>
        <hr className="border bg-neutral-500" />

        {/* filters section*/}
        <div className="scrollbar-thin flex h-[31rem] flex-col gap-9 overflow-y-auto">
          <div className="flex flex-col gap-10 pl-10">
            <div className="flex flex-col gap-1">
              <p className="text-xl">{strings.filterOptionFlow.priceRange}</p>
              <p className="text-lg">
                The average nightly price is $38,not including fees or taxes.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="h-24 pe-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filterData}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend
                      verticalAlign="top"
                      align="center"
                      layout="horizontal"
                      iconType="circle"
                      iconSize={10}
                    />
                    <Bar dataKey="checkIn" stackId="a" fill="#002855" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-between gap-y-2 pe-4 md:flex-row">
                <div className="flex h-16 flex-col rounded-lg border border-neutral-500 p-1 lg:w-80">
                  <label className="text-sm">
                    {strings.filterOptionFlow.minimum}
                  </label>
                  <input
                    type="text"
                    value={`$${minPrice}`}
                    onChange={(e) =>
                      setMinPrice(e.target.value.replace("$", ""))
                    }
                    className="text-lg"
                  />
                </div>
                <div className="flex h-16 flex-col rounded-lg border border-neutral-500 p-1 lg:w-80">
                  <label className="text-sm">
                    {strings.filterOptionFlow.maximum}
                  </label>
                  <input
                    type="text"
                    value={`$${maxPrice}`}
                    onChange={(e) =>
                      setMaxPrice(e.target.value.replace("$", ""))
                    }
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className="border bg-neutral-500" />
          <div className="flex flex-col gap-9 pl-10">
            <div className="text-xl">
              {strings.filterOptionFlow.bedsAndBathrooms}
            </div>
            <p className="text-lg">{strings.filterOptionFlow.beds}</p>
            <div className="flex flex-row flex-wrap gap-3 text-sm">
              <p
                className={`flex items-center justify-center rounded-3xl p-1 px-4 ${beds.length == 0 ? "bg-secondary-900 text-neutral-50" : "border border-neutral-500 bg-neutral-50 text-neutral-950"} `}
                onClick={() => setBeds([])}
              >
                {strings.filterOptionFlow.any}
              </p>
              {FilterOptionBedsList?.map((bed, index) => (
                <p
                  className={`flex items-center justify-center rounded-3xl border border-neutral-500 px-6 py-1 ${
                    beds.includes(bed) ? "bg-secondary-50" : ""
                  }`}
                  key={index}
                  onClick={() => handleBedClick(bed)}
                >
                  {bed}
                </p>
              ))}
            </div>
            <p className="text-lg">{strings.filterOptionFlow.bathrooms}</p>
            <div className="flex flex-row flex-wrap gap-3 text-sm">
              <p
                onClick={() => setBathrooms([])}
                className={`flex items-center rounded-3xl p-1 px-4 ${bathrooms.length == 0 ? "bg-secondary-900 text-neutral-50" : "border border-neutral-500 bg-neutral-50 text-neutral-950"} `}
              >
                {strings.filterOptionFlow.any}
              </p>
              {FilterOptionBathroomsList?.map((bathroom, index) => (
                <p
                  className={`flex items-center justify-center rounded-3xl border border-neutral-500 px-6 py-1 ${
                    bathrooms.includes(bathroom) ? "bg-secondary-50" : ""
                  }`}
                  key={index}
                  onClick={() => handleBathroomClick(bathroom)}
                >
                  {bathroom}
                </p>
              ))}
            </div>
          </div>
          <hr className="border bg-neutral-500" />
          <div className="flex flex-col gap-5 pl-10 text-xl">
            <div>{strings.filterOptionFlow.propertyTypes}</div>
            <div className="flex flex-col gap-7 md:flex-row">
              {FilterOptionPropertyTypes.map((property, index) => (
                <div
                  key={index}
                  className={`flex w-44 flex-col gap-12 rounded-md border border-neutral-500 px-3 py-4 ${
                    propertyType.includes(property.name)
                      ? "bg-secondary-50"
                      : ""
                  }`}
                  onClick={() => handlePropertyTypeClick(property.name)}
                >
                  <div className="relative h-9 w-9">
                    {" "}
                    <Image src={property.icon} alt="xcross icon" fill={true} />
                  </div>
                  <div>{property.name}</div>
                </div>
              ))}
            </div>
          </div>
          <hr className="border bg-neutral-500" />
          <div className="flex flex-col gap-9 pl-10 text-xl">
            <div>{strings.filterOptionFlow.amenities}</div>
            <div className="flex flex-col gap-2">
              <div>{strings.filterOptionFlow.essentials}</div>
              <div className="grid grid-cols-1 gap-5 text-lg md:grid-cols-2">
                {FilterOptionAmenitiesEssentials.map((amenity, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    {amenity}
                  </div>
                ))}
              </div>
              <p className="text-lg text-secondary-600 underline">
                {strings.filterOptionFlow.showMore}
              </p>
            </div>
          </div>
          <hr className="border bg-neutral-500" />
          <div className="flex flex-col gap-5 pl-10">
            <div className="text-xl">
              {strings.filterOptionFlow.hostLanguage}
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-1 gap-5 text-lg md:grid-cols-2">
                {FilterOptionHostLanguages.map((language, index) => (
                  <div className="flex gap-2" key={index}>
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(language)}
                      onChange={() => handleLanguageChange(language)}
                    />
                    {language}
                  </div>
                ))}
              </div>
              <p className="text-lg text-secondary-600 underline">
                {strings.filterOptionFlow.showMore}
              </p>
            </div>
          </div>
          <hr className="border bg-neutral-500" />
        </div>

        <div className="flex flex-row justify-between p-4">
          <button
            className="text-xl text-secondary-600 underline"
            onClick={() => {
              setBeds([]);
              setBathrooms([]);
              setPropertyType([]);
              setMinPrice("15");
              setMaxPrice("105");
              setSelectedAmenities([]);
              setSelectedLanguages([]);
            }}
          >
            {strings.filterOptionFlow.clearAll}
          </button>
          <button className="rounded-lg bg-secondary-900 px-12 py-3 text-lg text-neutral-50">
            Show 100+ places
          </button>
        </div>
      </div>
    </div>
  );
}
