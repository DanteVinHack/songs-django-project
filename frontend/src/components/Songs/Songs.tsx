import React, { useEffect, useState } from "react";
import axios from "axios";
import { Song } from "./Song";

export const Songs: React.FC = () => {
  const [song, setSong] = useState({});

  const fetchingSong = () => {
    axios
      .get("http://localhost:8000/songs/")
      .then((response) => {
        return response.data;
      })
      .then(() => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchingSong();
  }, []);

  return (
    <>
      <Song song={song} />
    </>
  );
};
