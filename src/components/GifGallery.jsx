import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GifCard from "./GifCard";
import { device } from "../styles/breakpoints";

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 100%;
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${device.laptop} {
    grid-template-columns: repeat(5, 1fr);
  }
  grid-gap: 0.5rem;
`;

const GifGallery = ({ gifs }) => {
  if (!gifs || !gifs.length) return null;
  return (
    <Gallery>
      {
        gifs.map(gif => (
          <GifCard
            key={gif.id}
            src={gif.images.original.url}
            title={gif.title}
            url={gif.url}
          />
        ))
      }
    </Gallery>
  );
};

GifGallery.propTypes = {
  gifs: PropTypes.array
};

export default GifGallery;
