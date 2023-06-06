import {MATES, ROOMS} from 'constants/path';
import {Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {styled} from 'styled-components';
import {FaGithub} from 'react-icons/fa';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 8rem;
  padding-left: 2rem;
  padding-right: 2rem;

  background: white;
`;

const ColoredSpan = styled.span`
  color: #9795b5;
`;
const ColoredNav = styled(Nav.Link)`
  color: #9795b5;
  white-space: nowrap;

  &:hover {
    color: black;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Col xs={9}>
        <ColoredSpan>
          Copyright &copy; 2023 구해줘 룸메즈 | All Rights Reserved
        </ColoredSpan>
      </Col>
      <Col>
        <Nav className="d-flex flex-nowrap ms-auto align-items-center">
          <ColoredNav href={MATES}>룸메 구하기</ColoredNav>
          <ColoredNav href={ROOMS}>방 구하기</ColoredNav>&nbsp;
          <Button
            variant="outline-light"
            href="https://github.com/clap-0/gooroom-frontend"
          >
            <FaGithub />
          </Button>
        </Nav>
      </Col>
    </StyledFooter>
  );
};

export default Footer;
