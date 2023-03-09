import React, { useState } from "react";
import Loader from "./Loader";
const SearchComp = () => {
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleClick = async () => {
    if (searchText) {
      try {
        setGeneratingImg(true);
        const response = await fetch("https://dalle2-0-5xbh.onrender.com/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: searchText,
          }),
        });
        const data = await response.json();
        setUrl(data.url);
        setGeneratingImg(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Enter a text");
    }
  };
  return (
    <div className="main_component">
      <div className="input_button">
        <input
          value={searchText}
          onChange={handleChange}
          type="text"
          placeholder="Search Any Text"
        ></input>
        <button onClick={handleClick}>Fetch</button>
      </div>
      <div className="result-image">
        {url ? (
          <img src={url}></img>
        ) : (
          <img src="https://raw.githubusercontent.com/adrianhajdin/project_ai_mern_image_generation/main/client/src/assets/preview.png"></img>
        )}
        { generatingImg && 
          <div className="loader-container">
            <Loader />
          </div>
        }
      </div>
    </div>
  );
};

export default SearchComp;
