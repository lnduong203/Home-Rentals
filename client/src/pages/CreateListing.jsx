import { useState } from "react";
import { useSelector } from "react-redux";
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

import MainLayout from "../layouts/MainLayout";
import { categories, types, facilities } from "../data";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategoty] = useState("");
  const [type, setType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [formLoaction, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDetail: "",
    price: 0,
  });
  const navigate = useNavigate();
  const creatorId = useSelector((state) => state.user._id);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLoaction.streetAddress);
      listingForm.append("aptSuite", formLoaction.aptSuite);
      listingForm.append("city", formLoaction.city);
      listingForm.append("province", formLoaction.province);
      listingForm.append("country", formLoaction.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      amenities.forEach((amenity) => listingForm.append("amenities", amenity));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDetail", formDescription.highlightDetail);
      listingForm.append("price", formDescription.price);
      photos.forEach((photo) => listingForm.append("listingPhotos", photo));

      const response = await fetch("http://localhost:6789/properties/create", {
        method: "POST",
        body: listingForm,
      });
      if (response.ok) navigate("/");
    } catch (error) {
      console.log("Failed to create listing", error.message);
    }
  };

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({ ...formDescription, [name]: value });
  };

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((item) => item !== facility),
      );
    } else {
      setAmenities((prevAmenities) => [...prevAmenities, facility]);
    }
  };

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({ ...formLoaction, [name]: value });
  };

  const handleUploadPhotos = (e) => {
    // e.preventDefault();
    const newPhots = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhots]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove),
    );
  };
  /**Goong map */
  const [suggestions, setSuggestions] = useState([]);
  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setFormLocation({ ...formLoaction, streetAddress: value });

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://rsapi.goong.io/Place/AutoComplete?api_key=GwAaPHJeeGrZx2aU8Tf99i1T53EMeePbERr4pTT4&input=${encodeURIComponent(value)}`,
        );
        const data = await response.json();
        setSuggestions(data.predictions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/Place/Detail?api_key=GwAaPHJeeGrZx2aU8Tf99i1T53EMeePbERr4pTT4&place_id=${suggestion.place_id}`,
      );
      const data = await response.json();
      const place = data.result;

      const addressComponents = {
        streetAddress: "",
        aptSuite: "",
        city: "",
        province: "",
        country: "",
      };

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("street_number")) {
          addressComponents.streetAddress = component.long_name;
        }
        if (types.includes("route")) {
          addressComponents.streetAddress += ` ${component.long_name}`;
        }
        if (types.includes("subpremise")) {
          addressComponents.aptSuite = component.long_name;
        }
        if (
          types.includes("locality") ||
          types.includes("administrative_area_level_2")
        ) {
          addressComponents.city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          addressComponents.province = component.long_name;
        }
        if (types.includes("country")) {
          addressComponents.country = component.long_name;
        }
      });

      setFormLocation((prevLocation) => ({
        ...prevLocation,
        ...addressComponents,
      }));
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-300">
        <div className="px-[10vw]">
          <p className="py-[2vw] text-[2vw] font-bold text-blue-900">
            Publish Your Place
          </p>
          <form onSubmit={handlePost}>
            <div className="rounded-lg bg-white px-[2vw] py-[1.5vw] shadow-sm shadow-white">
              <h1 className="py-2 text-[1.8vw] font-bold text-rose-400">
                Step 1: Tell us about your place
              </h1>
              <hr className="mb-[2vw]" />
              <h3 className="text-[1.8vw] font-bold md:text-[1.2vw]">
                Which of these categories best describes your place?
              </h3>
              <div className="my-[1.5vw] grid grid-cols-4 gap-2 px-[8vw] md:grid-cols-6 md:gap-4">
                {categories.map((item, index) => (
                  <div
                    key={index}
                    className={`${category === item.label ? "border-rose-500 shadow-md shadow-rose-400" : ""} flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-2 hover:border-rose-400`}
                    onClick={() => setCategoty(item.label)}
                  >
                    <div className="mb-[1vw] text-[1.5vw]">{item.icon}</div>
                    <p className="text-center text-[1vw] font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mt-[3vw] text-[1.8vw] font-bold md:text-[1.2vw]">
                What type od place will guests have?
              </h3>
              <div className="w-3/5">
                {types.map((item, index) => (
                  <div
                    key={index}
                    className={`${type === item.name ? "border-rose-500" : ""} my-[1vw] flex cursor-pointer justify-between rounded-lg border-2 border-gray-300 px-5 py-2 hover:border-rose-400`}
                    onClick={() => setType(item.name)}
                  >
                    <div>
                      <h4 className="text-[1.1vw] font-bold">{item.name}</h4>
                      <p className="w-4/5 text-[1vw] md:w-full">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-[2vw]">{item.icon}</div>
                  </div>
                ))}
              </div>

              <h3 className="mb-[1.5vw] mt-[3vw] text-[1.8vw] font-bold md:text-[1.2vw]">
                Where's your place loacated?
              </h3>
              <div className="w-2/3">
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="streetAddress"
                  >
                    Street Address
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded-lg border p-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                    id="streetAddress"
                    name="streetAddress"
                    type="streetAddress"
                    placeholder="Street Address"
                    value={formLoaction.streetAddress}
                    onChange={handleAddressChange}
                    required
                  />
                  <ul className="mt-2 border">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="cursor-pointer border-b p-2"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mb-0 md:mr-2 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="aptSuite"
                    >
                      Apartment, Suite, etc.
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded-lg border p-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                      id="aptSuite"
                      name="aptSuite"
                      type="text"
                      placeholder="Apartment, Suite, etc."
                      value={formLoaction.aptSuite}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                  <div className="md:ml-2 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded-lg border p-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                      id="city"
                      name="city"
                      type="text"
                      placeholder="City"
                      value={formLoaction.city}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mb-0 md:mr-2 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="province"
                    >
                      Province
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded-lg border p-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                      id="province"
                      name="province"
                      type="text"
                      placeholder="Province"
                      value={formLoaction.province}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                  <div className="md:ml-2 md:w-1/2">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded-lg border p-3 text-sm leading-tight text-gray-700 shadow focus:outline-none dark:text-white"
                      id="country"
                      name="country"
                      type="text"
                      placeholder="Country"
                      value={formLoaction.country}
                      onChange={handleChangeLocation}
                      required
                    />
                  </div>
                </div>
              </div>

              <h3 className="mb-[1.5vw] mt-[3vw] text-[1.8vw] font-bold md:text-[1.2vw]">
                Share some basics about your place
              </h3>
              <div className="grid w-2/3 grid-cols-2 gap-4 md:grid-cols-3">
                <div className="flex items-center justify-around rounded-lg border-2 py-2">
                  <p className="text-[2vw] md:text-[1.1vw]">Guests</p>
                  <div className="flex items-center">
                    <RemoveCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() =>
                        guestCount > 1 && setGuestCount(guestCount - 1)
                      }
                    />
                    <p className="mx-[0.8vw] text-[2vw] md:text-[1.2vw]">
                      {guestCount}
                    </p>
                    <AddCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => setGuestCount(guestCount + 1)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around rounded-lg border-2 py-2">
                  <p className="text-[2vw] md:text-[1.1vw]">Bedrooms</p>
                  <div className="flex items-center">
                    <RemoveCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() =>
                        bedroomCount > 1 && setBedroomCount(bedroomCount - 1)
                      }
                    />
                    <p className="mx-[0.8vw] text-[2vw] md:text-[1.2vw]">
                      {bedroomCount}
                    </p>
                    <AddCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => setBedroomCount(bedroomCount + 1)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around rounded-lg border-2 py-2">
                  <p className="text-[2vw] md:text-[1.1vw]">Beds</p>
                  <div className="flex items-center text-[2vw] md:text-[1.1vw]">
                    <RemoveCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                    />
                    <p className="mx-[0.8vw] text-[2vw] md:text-[1.2vw]">
                      {bedCount}
                    </p>
                    <AddCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => setBedCount(bedCount + 1)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around rounded-lg border-2 py-2">
                  <p className="text-[2vw] md:text-[1.1vw]">Bathrooms</p>
                  <div className="flex items-center">
                    <RemoveCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() =>
                        bathroomCount > 1 && setBathroomCount(bathroomCount - 1)
                      }
                    />
                    <p className="mx-[0.8vw] text-[2vw] md:text-[1.2vw]">
                      {bathroomCount}
                    </p>
                    <AddCircleOutline
                      className="cursor-pointer hover:text-rose-500"
                      onClick={() => setBathroomCount(bathroomCount + 1)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-[3vw] rounded-lg bg-white px-[2vw] py-[1.5vw] shadow-sm shadow-white">
              <h1 className="py-2 text-[1.8vw] font-bold text-rose-400">
                Step 2: Make your place stand out
              </h1>
              <hr className="mb-[2vw]" />
              <h3 className="text-[1.8vw] font-bold md:text-[1.2vw]">
                Tell guests what your place has to offer
              </h3>
              <div className="my-[1.5vw] grid grid-cols-4 gap-2 px-[8vw] md:grid-cols-6 md:gap-4">
                {facilities.map((item, index) => (
                  <div
                    key={index}
                    className={`${amenities.includes(item.name) ? "border-rose-500 shadow-md shadow-rose-400" : ""} flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-2 hover:border-rose-400`}
                    onClick={() => handleSelectAmenities(item.name)}
                  >
                    <div className="mb-[1vw] text-[1.5vw]">{item.icon}</div>
                    <p className="text-center text-[1vw] font-bold">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>

              <h3 className="mb-[1.5vw] mt-[3vw] text-[1.8vw] font-bold md:text-[1.2vw]">
                Add some photos of your place
              </h3>
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="photo" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="grid grid-cols-3 gap-[2vw]"
                    >
                      {photos.length < 1 && (
                        <>
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                            className="hidden"
                          />
                          <label
                            htmlFor="image"
                            className="flex h-[15vw] w-[20vw] cursor-pointer flex-col items-center justify-center border border-dashed border-gray-500"
                          >
                            <IoIosImages className="text-[3vw]" />
                            <p className="my-[1.5vw] text-[1.5vw] font-bold">
                              Upload from your device
                            </p>
                          </label>
                        </>
                      )}
                      {photos.length >= 1 && (
                        <>
                          {photos.map((photo, index) => (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="relative h-[15vw] w-[20vw] rounded-lg border border-gray-500 object-cover shadow-lg"
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                    className="h-full w-full rounded-lg object-cover"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                    className="absolute right-0 top-0 rounded-md bg-gray-200 p-1 shadow-lg hover:text-rose-500"
                                  >
                                    <IoCloseSharp />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                            className="hidden"
                          />
                          <label
                            htmlFor="image"
                            className="flex h-[15vw] w-[20vw] flex-col items-center justify-center border border-dashed border-gray-500"
                          >
                            <IoIosImages className="text-[3vw]" />
                            <p className="my-[1.5vw] text-[2vw] font-bold md:text-[1.5vw]">
                              Upload from your device
                            </p>
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <h3 className="mb-[1.5vw] mt-[3vw] text-[1.8vw] font-bold md:text-[1.2vw]">
                What make your place attractive and exciting?
              </h3>
              <div className="w-2/3">
                <p className="text-md mb-2 block font-bold text-gray-700">
                  Title
                </p>
                <input
                  name="title"
                  type="text"
                  required
                  className="mb-4 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder-gray-500 sm:text-sm"
                  placeholder="Title"
                  onChange={handleChangeDescription}
                  value={formDescription.title}
                />

                <p className="text-md mb-2 block font-bold text-gray-700">
                  Description
                </p>
                <textarea
                  name="description"
                  type="text"
                  required
                  className="mb-4 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder-gray-500 sm:text-sm"
                  placeholder="Description"
                  onChange={handleChangeDescription}
                  value={formDescription.description}
                />
                <p className="text-md mb-2 block font-bold text-gray-700">
                  Highlights
                </p>
                <input
                  name="highlight"
                  type="text"
                  required
                  className="mb-4 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder-gray-500 sm:text-sm"
                  placeholder="Hilights"
                  value={formDescription.highlights}
                  onChange={handleChangeDescription}
                />

                <p className="text-md mb-2 block font-bold text-gray-700">
                  Hilights Details
                </p>
                <textarea
                  name="highlightDetail"
                  type="text"
                  className="mb-4 block w-full rounded-md border border-gray-300 p-4 text-gray-900 placeholder-gray-500 sm:text-sm"
                  placeholder="Hilights Details"
                  value={formDescription.highlightDetail}
                  onChange={handleChangeDescription}
                />

                <p className="text-md mb-2 block font-bold text-gray-700">
                  Now, set your PRICE
                </p>
                <div className="flex items-center">
                  <span className="mr-6 text-[2vw] font-bold">$</span>
                  <input
                    name="price"
                    type="number"
                    required
                    className="mb-2 block w-[1/3] rounded-md border border-gray-300 px-4 py-5 text-gray-900 placeholder-gray-500 sm:text-sm"
                    placeholder="0.00"
                    value={formDescription.price}
                    onChange={handleChangeDescription}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mb-[3vw] rounded-lg bg-rose-500 px-4 py-3 font-bold text-white hover:shadow-md hover:shadow-white"
            >
              Create Your Listing
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
export default CreateListing;
