import { useState, useEffect } from "react";
import AxiosApi from "../components/AxiosApi";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async (userId) => {
      try {
        const response = await AxiosApi.get(`/accounts/${userId}/profile`);
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }, [userId]);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? (
        <div>
          <p>
            Name: {profile.name} {profile.surname}
          </p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
          <p>City: {profile.city}</p>
          <p>Country: {profile.country}</p>
          <p>Postal Code: {profile.postalCode}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ProfilePage;
