import { useState, useEffect, MouseEventHandler } from 'react';
import styled from 'styled-components';

const StyledMusic = styled.img`
  position: fixed;
  top: 7rem;
  height: 1.6rem;
  margin-left: 0.8rem;
  filter: invert(100%) sepia(82%) saturate(2%) hue-rotate(196deg)
    brightness(108%) contrast(101%);
  z-index: 100;
`;

const useAudio = (url: string) => {
  const [song] = useState(new Audio(url));
  const [play, setPlay] = useState(false);

  song.loop = true;
  const toggle: MouseEventHandler<HTMLImageElement> = () => setPlay(!play);

  useEffect(() => {
    play ? song.play() : song.pause();
  }, [play, song]);

  useEffect(() => {
    song.addEventListener('ended', () => setPlay(false));
    return () => {
      song.removeEventListener('ended', () => setPlay(false));
    };
  }, [song]);

  return { play, toggle };
};

const Song = () => {
  const { play, toggle } = useAudio(
    '/music/christmas-knocking-to-the-door.mp3'
  );

  return (
    <StyledMusic
      src={play ? '/music/music.svg' : '/music/music-slash.svg'}
      onClick={toggle}
    />
  );
};

export default Song;
