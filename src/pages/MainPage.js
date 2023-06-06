import Button from 'components/common/Button/Button';
import Link from 'components/common/Link/Link';
import {MATES} from 'constants/path';
import {Carousel} from 'react-bootstrap';
import {styled} from 'styled-components';

const StyledHero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 55vh;

  background: #9795b5;
  color: white;
`;

const StyledButtonLink = styled(Link)`
  color: white;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

const MainPage = () => {
  return (
    <Carousel slide={false} controls={false} touch={false}>
      <Carousel.Item>
        <StyledHero></StyledHero>
        <Carousel.Caption>
          <h1>당신과 딱 맞는 룸메이트</h1>
          <p style={{whiteSpace: 'pre-line'}}>
            생활 패턴, 청소 주기, MBTI까지 당신이 찾아 헤맨 완벽한 친구를
            구해줄게요.
          </p>
          <Button variant="primary" style={{borderRadius: '12px'}}>
            <StyledButtonLink to={MATES}>찾으러 가기</StyledButtonLink>
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MainPage;
