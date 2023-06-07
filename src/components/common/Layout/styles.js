import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const StyledMain = styled.main`
  flex: 1;
`;

const StyledBrandName = styled.div`
  width: 126px;

  font-family: 'BrandNameFont';
  font-size: 16px;

  display: flex;
  align-items: center;

  color: #000000;
`;

export const BrandName = ({children}) => {
  return <StyledBrandName>{children}</StyledBrandName>;
};
