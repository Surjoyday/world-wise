import { Spinner } from "@common/components";
import styles from "./SpinnerFullPage.module.css";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 2.5rem;
  height: calc(100vh - 5rem);
  background-color: var(--color-dark--1);
`;

function SpinnerFullPage() {
  return (
    <StyledDiv>
      <Spinner />
    </StyledDiv>
  );
}

export default SpinnerFullPage;
