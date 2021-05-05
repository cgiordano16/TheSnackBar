import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)
`
    background-color: #181115;  
    color: white;
    text-decoration: none;
    margin-right: 15px;
    padding-top: 25px;
    font-size: 20px;

    &:hover {
      text-decoration: underline;
      font-weight: bold;
    }

`;