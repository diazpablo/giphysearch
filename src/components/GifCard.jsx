import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
`;

const Overlay = styled.div`
  position: absolute;
  opacity: 0;
  transition: .4s;
  top: 0;
  left: 0;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.h3`
  margin: 1.5rem .5rem;
  text-align: center;
  color: white;
`;

const Card = styled.a`
  position: relative;
  padding-bottom: 100%;
  margin: 0;
  cursor: pointer;

  &:hover {
    ${Overlay} {
      opacity: 1;
    }
  }
`;

const GifCard = ({ src, title, url }) => {
  return (
    <Card
      data-test-id={"gif-card"}
      href={url}
      target={url && "_blank"}
    >
      <Overlay>
        <Title>{title}</Title>
      </Overlay>
      <Image src={src} alt={title} />
    </Card>
  );
};

GifCard.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string
};

export default GifCard;
