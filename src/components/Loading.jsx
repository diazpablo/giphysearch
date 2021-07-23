import React from "react";
import styled from "styled-components";

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 3rem;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  --size: 48px;
  --primary-color: black;

  height: var(--size);
  width: var(--size);
  /* TEN */

  border: calc(var(--size) / 8) solid transparent;
  border-left: calc(var(--size) / 8) solid var(--primary-color);
  border-radius: 100%;
  box-sizing: border-box;
  position: relative;
  animation: spin .7s linear infinite;

  &:after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: calc(0px - var(--size) / 8);
    left: calc(0px - var(--size) / 8);
    border-radius: 100%;
    border: calc(var(--size) / 8) solid var(--primary-color);
    opacity: .5;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <LoaderWrapper data-test-id={"loading"}>
      <Loader />
    </LoaderWrapper>
  );
};

export default Loading;
