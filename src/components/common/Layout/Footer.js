import {MATES, ROOMS, LOGOUT, USERS, LOGIN} from 'constants/path';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Col, Container, Row} from 'react-bootstrap';
import {useRecoilValue} from 'recoil';
import {AuthState} from 'stores/AuthState';
import {styled} from 'styled-components';
import {FaGithub} from 'react-icons/fa';

const ColoredSpan = styled.span`
  color: #9795b5;
  margin: none;
`;
const ColoredNav = styled(Nav.Link)`
  color: #9795b5;
  &:hover {
    color: black;
  }
`;

const Footer = () => {
  return (
    <footer>
      <Container>
        <br />
        <Row style={{alignItems: 'center'}}>
          <Col xs={9} style={{marginTop: '8px'}}>
            <ColoredSpan>
              Copyright &copy; 2023 구해줘 룸메즈 | All Rights Reserved
            </ColoredSpan>
          </Col>
          <Col>
            <Nav className="ms-auto align-items-center">
              <ColoredNav href={MATES} style={{marginLeft: '20px'}}>
                룸메 구하기
              </ColoredNav>
              <ColoredNav href={ROOMS}>방 구하기</ColoredNav>&nbsp;
              <Button
                variant="outline-light"
                href="https://github.com/clap-0/gooroom-frontend"
              >
                <FaGithub />
              </Button>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
