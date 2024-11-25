// Profile Creation component
import AxiosApi from "./AxiosApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";

const ProfileCreation = ({ accountId }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!accountId) {
      navigate("/");
    }
  }, [accountId, navigate]);

  const handleProfileCreation = async (e) => {
    e.preventDefault();
    const profile = {
      name,
      surname,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
    };

    try {
      const response = await AxiosApi.post(
        `/accounts/${accountId}/profile`,
        profile
      );
      console.log(response.data);
      toast.success("Profile created successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Profile creation failed");
    }
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleProfileCreation}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

ProfileCreation.propTypes = {
  accountId: PropTypes.number.isRequired,
};

export default ProfileCreation;
