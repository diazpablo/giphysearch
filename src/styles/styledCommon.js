import styled from "styled-components";
import { device } from "./breakpoints";

const BORDER_RADIUS = ".5rem";

export const Container = styled.div`
  margin: 0 1rem;
  @media ${device.laptop} {
    max-width: 1100px;
    margin: 0 auto;
  }
`;

export const TextInput = styled.input.attrs({
  type: "text"
})`
  font-size: 1rem;
  border-radius: ${BORDER_RADIUS};
  padding: .3rem .5rem;
  transition: .4s;
  border-style: solid;
  border-width: 1px;

  &:focus {
    border-color: blue;
    outline: none;
  }
`;

export const Button = styled.button.attrs({
  type: "button"
})`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  padding: .3rem .5rem;
  transition: .4s;
  border-radius: ${BORDER_RADIUS};

  &:hover:not(:disabled) {
    box-shadow: 0 0 10px black;
  }
`;

export const Select = styled.select`
  font-size: 1rem;
  padding: .3rem .5rem;
  border-radius: ${BORDER_RADIUS};

  border-style: solid;
  border-width: 1px;

  &:focus {
    border-color: blue;
    outline: none;
  }
`;

export const Error = styled.p`
  color: red;
  font-weight: bold;
`;
