import { useEffect, useState } from "react";
import { getAllGenres } from "../../services/genreServices";
import { CreateNewBand } from "../../services/BandServices";
import { useNavigate } from "react-router-dom";

export const CreateBand = ({ currentUser }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAllGenres().then(setAllGenres);
  }, []);

  const handleProfilePictureUpload = async (e) => {
    const CLOUDINARY_CLOUD_NAME = "dxrufjdna";
    const UPLOAD_PRESET = "profile_pictures_preset";
    const file = e.target.files?.[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "profile-pictures");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    const optimizedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/c_fill,w_400,h_400,g_face/"
    );
    setImageUrl(optimizedUrl);
  };

  const handleNewBand = (e) => {
    e.preventDefault();
    const newBand = {
      userId: currentUser.id,
      bandName: name,
      description: bio,
      genreId: parseInt(genre),
      profilePicture: imageUrl,
    };
    CreateNewBand(newBand).then(navigate("/"));
  };
  return (
    <form>
      <div className="container">
        <h3 className="mt-3">Add a new band:</h3>
        <fieldset className="row">
          <label className="form-label">Band Name</label>
          <input
            type="text"
            required
            className="form-control col mb-3"
            placeholder="Enter Band Name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <select
            required
            className="form-select col mb-3"
            onChange={(e) => {
              setGenre(e.target.value);
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
              setBio(e.target.value);
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
          <button className="btn btn-secondary" onClick={handleNewBand}>
            Create Band
          </button>
        </fieldset>
      </div>
    </form>
  );
};
