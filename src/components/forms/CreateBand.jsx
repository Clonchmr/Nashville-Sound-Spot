import { useEffect, useState } from "react";
import { getAllGenres } from "../../services/genreServices";
import { CreateNewBand, GetBandsByUser } from "../../services/BandServices";
import { useNavigate } from "react-router-dom";

export const CreateBand = ({ currentUser }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [newBand, setNewBand] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [allBands, setAllBands] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllGenres().then(setAllGenres);
  }, []);

  const handleProfilePictureUpload = async (e) => {
    const CLOUDINARY_CLOUD_NAME = "dxrufjdna";
    const UPLOAD_PRESET = "profile_pictures_preset";
    const file = e.target.files?.[0];

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "profile_pictures");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("No image URL received from Cloudinary");
      }

      const optimizedUrl = data.secure_url.replace(
        "/upload/",
        "/upload/c_fill,w_400,h_400,g_face/"
      );
      const img = new Image();
      img.src = optimizedUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      setImageUrl(optimizedUrl);
    } catch (error) {
      console.error("Image upload failed", error);
      alert("Failed to upload image. Please try again.");

      e.target.value = "";
    }
  };

  const handleNewBand = (e) => {
    e.preventDefault();

    if (!imageUrl) {
      console.error("Failed to create band");
      alert("Failed to create band. Please try again.");
      return;
    }

    const newBandInfo = {
      userId: currentUser.id,
      bandName: newBand.bandName,
      description: newBand.description,
      genreId: parseInt(newBand.genreId),
      profilePicture: imageUrl,
    };
    CreateNewBand(newBandInfo)
      .then(() => GetBandsByUser(currentUser.id))
      .then(setAllBands)
      .then(() => navigate("/mybands"))
      .catch((error) => {
        console.error("Failed to create band:", error);
        alert("Failed to create band. Please try again");
      });
  };
  return (
    <form>
      <div className="container">
        <h3 className="mt-3 mb-4">Add a new band:</h3>
        <fieldset className="create-band-headers row">
          <label className="form-label">Band Name</label>
          <input
            type="text"
            required
            className="form-control col mb-3"
            placeholder="Enter Band Name..."
            onChange={(e) => {
              const newBandObj = { ...newBand };
              newBandObj.bandName = e.target.value;
              setNewBand(newBandObj);
            }}
          />
          <select
            required
            className="form-select col mb-3"
            onChange={(e) => {
              const newBandObj = { ...newBand };
              newBandObj.genreId = e.target.value;
              setNewBand(newBandObj);
            }}
          >
            <option value="">Choose Genre</option>
            {allGenres.map((genre) => {
              return (
                <option key={genre.id} value={genre.id}>
                  {genre.type}
                </option>
              );
            })}
          </select>
        </fieldset>
        <fieldset>
          <label className="form-label">Bio</label>
          <textarea
            className="form-control mb-3"
            required
            placeholder="Tell us about yourself..."
            onChange={(e) => {
              const newBandObj = { ...newBand };
              newBandObj.description = e.target.value;
              setNewBand(newBandObj);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="formFile" className="form-label">
            Add Profile Picture
          </label>
          <input
            className="form-control mb-3"
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleProfilePictureUpload}
          />
        </fieldset>
        <fieldset>
          <button className="btn btn-dark mt-3" onClick={handleNewBand}>
            Create Band
          </button>
        </fieldset>
      </div>
    </form>
  );
};
