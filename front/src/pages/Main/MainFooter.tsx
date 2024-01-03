import styled from "styled-components";
import { useRef } from "react";

const StyledFooter = styled.footer`
  width: 100%;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-between;
`;

const StyledScreen = styled.img`
  width: 2rem;
  height: 2rem;
`;

const StyledShareLink = styled.img`
  width: 2rem;
  height: 2rem;
`;

const MainFooter = (): JSX.Element => {
  const screenRef = useRef<HTMLImageElement>(null);
  const shareLinkRef = useRef<HTMLImageElement>(null);

  return (<>
  <StyledFooter>
  <StyledScreen
            ref={screenRef}
            src={'/icons/screen.svg'}
            // onClick={() =>
            //   screenTime(setScreen, [
            //     headerRef,
            //     menuRef,
            //     screenRef,
            //     shareLinkRef,
            //     props.leftArrow,
            //     props.rightArrow
            //   ])
            // }
          />

          <StyledShareLink
            ref={shareLinkRef}
            src={'/icons/shareLink.svg'}
            // onClick={shareLink}
          />
  </StyledFooter>
  </>);
};

export default MainFooter;