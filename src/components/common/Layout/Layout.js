import {Outlet} from 'react-router-dom';
import Header from './Header';
import Alert from 'components/common/Alert';
import {useAlertState} from 'contexts/AlertContext';
import Footer from './Footer';
import {StyledLayout, StyledMain} from './styles';

const Layout = () => {
  const alertState = useAlertState();

  return (
    <StyledLayout>
      <Header />
      <Alert show={alertState.show} variant={alertState.variant}>
        {alertState.message}
      </Alert>
      <StyledMain>
        <Outlet />
      </StyledMain>
      <Footer></Footer>
    </StyledLayout>
  );
};

export default Layout;
