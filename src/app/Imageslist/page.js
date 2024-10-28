"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import pica from "pica";
import frame from "../../../public/res/images/components/frame.png";
import { useListing } from "../context/ListingContext";
import { useRouter } from "next/navigation";

export default function Imageslist({ listingid }) {
  const router = useRouter();

  const [isopenn, setIsopenn] = useState(null);
  const dropdownref = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [blur, setBlur] = useState(0);
  const optionss = ["Edit", "Cover photo", "Delete"];

  const handleDropdownClick = (index) => {
    console.log(`Dropdown clicked: ${index}, current isopenn: ${isopenn}`);
    setIsopenn(isopenn === index ? null : index);
  };

  const handleOptionClick = (option, imageIndex) => {
    console.log(`Option clicked: ${option}, Image index: ${imageIndex}`);
    console.log(typeof files[imageIndex]?.preview);

    if (option === "Edit") {
      setSelectedImage(files[imageIndex]?.preview || "");
      setSelectedImageIndex(imageIndex);
      setShowEditPopup(true);
    }

    if (option === "Cover photo") {
      const updatedFiles = [...files];
      const [coverPhoto] = updatedFiles.splice(imageIndex, 1);
      updatedFiles.unshift(coverPhoto);

      const reindexedFiles = updatedFiles.map((file, idx) => ({
        ...file,
        index: idx,
      }));

      setFiles(reindexedFiles);

      const coverPhotoId = coverPhoto.index;
      console.log("Cover Photo ID:", coverPhotoId);

      fetch("http://localhost:3001/updatecoverphoto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: coverPhotoId,
          listingId: listingid,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cover photo updated successfully:", data);
        })
        .catch((error) => console.error("Error updating cover photo:", error));
    }
  };

  const getImageStyle = useMemo(() => {
    return {
      filter: `
        brightness(${brightness}%)
        contrast(${contrast}%)
        hue-rotate(${hueRotate}deg)
        blur(${blur}px)
      `,
    };
  }, [brightness, contrast, hueRotate, blur]);

  const closePopup = () => {
    setShowEditPopup(false);
    setBrightness(100);
    setContrast(100);
    setHueRotate(0);
    setBlur(0);
  };

  const handleClickOutside = (event) => {
    if (dropdownref.current && !dropdownref.current.contains(event.target)) {
      setIsopenn(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log("88888888888", files);

 

  const handleDragStart = (ev) => {
    const id = ev.currentTarget.id;
    ev.dataTransfer.setData("text/plain", id);
    ev.dataTransfer.effectAllowed = "move";

    console.log("Drag Start - ID:", id);
    console.log("Data Transfer Data:", ev.dataTransfer.getData("text/plain"));
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();

    console.log("Drag Over - Target ID:", ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragId = ev.dataTransfer.getData("text/plain");
    const dropId = ev.currentTarget.id;

    console.log("Drop Event - Drag ID:", dragId, "Drop ID:", dropId);

    const dragIndex = files.findIndex(
      (file) => file.index === parseInt(dragId, 10),
    );
    const dropIndex = files.findIndex(
      (file) => file.index === parseInt(dropId, 10),
    );

    console.log("Files:", files);
    console.log("Drag Index:", dragIndex, "Drop Index:", dropIndex);

    if (dragIndex === -1 || dropIndex === -1) {
      console.log("Invalid indices");
      return;
    }

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(dragIndex, 1);
    newFiles.splice(dropIndex, 0, movedFile);

    const updatedFiles = newFiles.map((file, index) => ({
      ...file,
      index,
    }));

    console.log("Reordering Files:", updatedFiles);

    setFiles(updatedFiles);
  };

  const readBlobData = async (blobUrl) => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log("File data:", event.target.result);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error reading Blob data:", error);
    }
  };

  const picaInstance = pica();
  const [totalHeight, setTotalHeight] = useState(0);
  const maxDropzoneHeight = 1600;

  const imageSizes = [
    { width: 383, height: 325 },
    { width: 383, height: 245 },
    { width: 383, height: 245 },
    { width: 383, height: 245 },
    { width: 383, height: 245 },
  ];

  const resizeImage = (file, size) => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      console.log("Creating Blob URL:", img.src);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size.width;
        canvas.height = size.height;
        picaInstance
          .resize(img, canvas)
          .then((result) => picaInstance.toBlob(result, "image/jpeg"))
          .then((blob) => {
            const blobUrl = URL.createObjectURL(blob);
            console.log("Created Blob URL:", blobUrl);
            resolve(blobUrl);
          })
          .catch((error) => reject(error));
      };
    });
  };

  const displayImage = (blobUrl) => {
    const img = document.createElement("img");
    img.src = blobUrl;
    document.body.appendChild(img);
  };

  const onDrop = async (acceptedFiles) => {
    let newHeight = totalHeight;

    const newFiles = acceptedFiles.slice(0, 10 - files.length);
    const rowHeight = 325;
    const totalImages = files.length + newFiles.length;
    const imagesPerRow = 3;
    const numRows = Math.ceil(totalImages / imagesPerRow);

    newHeight = numRows * rowHeight;
    const currentIndex = files.length;

    for (let i = 0; i < newFiles.length; i++) {
      const size = imageSizes[(files.length + i) % imageSizes.length];
      const preview = await resizeImage(newFiles[i], size);
      const updatedFile = {
        ...newFiles[i],
        preview,
        height: size.height,
        index: currentIndex + i,
      };

      setFiles((prevFiles) => [...prevFiles, updatedFile]);
    }

    setTotalHeight(newHeight);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    disabled: files.length >= 10,
  });

  const totalHeightt = files.reduce((sum, file, index) => {
    return (
      sum +
      (index === 0
        ? imageSizes[0].height
        : imageSizes[index % imageSizes.length].height)
    );
  }, 0);

  const containerHeight = Math.max(totalHeightt, 0);

  const thumbs = files.map((file, index) => (
    <div
      key={file.index}
      id={file.index}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`mb-2 rounded-sm border border-gray-300`}
      style={{
        width:
          index === 0
            ? "100%"
            : `${imageSizes[index % imageSizes.length].width}px`,
        height: "325px",
        flexBasis: index === 0 ? "100%" : "33.33%",
        boxSizing: "border-box",
      }}
    >
      <Image
        src={file.preview}
        className="block h-full w-full object-cover"
        alt={`Preview ${index}`}
      />
    </div>
  ));

  useEffect(() => {
    if (files.length > 0) {
      setUploading(true);
      setUploadProgress(0);
      const uploadInterval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= files.length) {
            clearInterval(uploadInterval);
            setUploading(false);
            return files.length;
          }
          return prevProgress + 1;
        });
      }, 1000);
    }
  }, [files]);

  return (
    <div>
      <div className="flex h-[1155px] pb-[200px]">
        <div className="relative left-[412px] top-[140px] flex flex-col rounded-[15px]">
          <div className="relative top-[-80px] w-[688px]">
            <p className="h-[53px] w-[640px] text-[35px] font-[400] leading-[27px] tracking-[0.46px] text-[#000000]">
              Add some of the photos of property
            </p>
            <p className="w-[461px] text-[18px] font-[300] leading-[27px] tracking-[0.46px] text-[#000000]">
              You need to add at least 5 images to get started{" "}
            </p>
          </div>
          <section
            className="relative right-[150px] top-[-71px] w-[1066px] rounded-[15px] border-[2px] border-[#8E98A8]"
            style={{ height: `${totalHeight}px` }}
          >
            <div
              className="col-span-2 flex cursor-pointer items-center justify-center border border-dashed p-4 sm:col-span-3"
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              {files.length === 0 && (
                <div className="flex h-full w-full cursor-pointer items-center justify-center">
                  <div className="relative top-[150px] text-center">
                    <p className="text-lg font-medium leading-6 tracking-wider text-black">
                      Drag your images here
                    </p>
                    <p className="text-sm font-normal leading-6 tracking-wider text-black">
                      Choose at least 5 photos
                    </p>
                    <p className="text-sm font-normal leading-6 tracking-wider text-black">
                      Upload from your device
                    </p>
                  </div>
                </div>
              )}
            </div>
            {files.length > 0 && (
              <>
                <aside className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  {thumbs.map((thumb, index) => (
                    <div
                      key={index}
                      className={`relative ${index === 0 ? "col-span-3" : ""}`}
                      id={index}
                      draggable={true}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {thumb}
                      <div className="absolute right-[10px] top-[15px] h-[38px] w-[54px] rounded-[15px] border-[1px] border-[black]">
                        <button
                          onClick={() => handleDropdownClick(index)}
                          className="h-[38px] w-[54px]"
                        >
                          <div className="h-[38px] w-[54px] rounded-[30px] bg-[white] px-[18px] py-[10px]">
                            <Image
                              src={frame}
                              className="relative top-[5px] h-[5.59px] w-[22px]"
                              alt="frame icon"
                            />
                          </div>
                        </button>
                        {isopenn === index && (
                          <div className="absolute right-[0px] top-[40px] mt-5 flex w-[160px] cursor-pointer flex-col border-x border-t bg-white">
                            {optionss.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="border-b px-4 py-3"
                                onClick={() => handleOptionClick(option, index)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </aside>
                <div className="mt-4 flex justify-center">
                  {files.length < 10 && (
                    <button
                      type="button"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                      className="rounded border border-gray-300 bg-blue-500 px-4 py-2 text-white"
                    >
                      Upload More Images
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </div>

      {showEditPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-xl">Edit Image</h2>
            <div className="mb-4">
              <Image
                src={selectedImage}
                alt="Selected for Editing"
                style={getImageStyle}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Brightness: {brightness}%</label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Contrast: {contrast}%</label>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => setContrast(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Hue Rotate: {hueRotate}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={hueRotate}
                onChange={(e) => setHueRotate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block">Blur: {blur}px</label>
              <input
                type="range"
                min="0"
                max="10"
                value={blur}
                onChange={(e) => setBlur(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={closePopup}
                className="mr-4 rounded-lg bg-gray-300 px-4 py-2 text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const img = new window.Image();
                  img.src = selectedImage;
                  img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        hue-rotate(${hueRotate}deg)
        blur(${blur}px)
      `;
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob((blob) => {
                      const updatedImagePreview = URL.createObjectURL(blob);

                      const updatedFiles = [...files];
                      updatedFiles[selectedImageIndex] = {
                        ...updatedFiles[selectedImageIndex],
                        preview: updatedImagePreview,
                      };
                      setFiles(updatedFiles);

                      closePopup();
                    }, "image/jpeg");
                  };
                }}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
