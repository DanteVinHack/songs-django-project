import React from "react";
import { ISong } from "../../types/song";

interface ISongProps extends React.PropsWithChildren {
  song: ISong;
}

export const Song: React.FC = ({ song }: ISongProps) => {
  console.log(song.title, song.url);
  return (
    <li>
      <h1>{song.title}</h1>
      <audio src={song.url} controls></audio>
    </li>
  );
};
