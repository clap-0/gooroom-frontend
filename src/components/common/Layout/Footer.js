import {MATES, ROOMS} from 'constants/path';
import {Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {styled} from 'styled-components';
import {FaGithub} from 'react-icons/fa';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 8rem;
  padding-left: 2rem;
  padding-right: 2rem;

  background: white;
`;

const ColoredSpan = styled.span`
  color: #9795b5;
`;

const StyledNav = styled(Nav)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
`;

const ColoredNavLink = styled(Nav.Link)`
  color: #9795b5;
  white-space: nowrap;

  &:hover {
    color: black;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Col>
        <ColoredSpan>
          Copyright &copy; 2023 구해줘 룸메즈 | All Rights Reserved
        </ColoredSpan>
      </Col>
      <Col>
        <StyledNav className="d-flex flex-nowrap justify-flex-end align-items-center">
          <ColoredNavLink href={MATES}>룸메 구하기</ColoredNavLink>
          <ColoredNavLink href={ROOMS}>방 구하기</ColoredNavLink>&nbsp;
          <Button
            style={{transition: '0.25s'}}
            variant="outline-light"
            href="https://github.com/clap-0/gooroom-frontend"
          >
            <FaGithub />
          </Button>
        </StyledNav>
      </Col>
    </StyledFooter>
  );
};

export default Footer;
