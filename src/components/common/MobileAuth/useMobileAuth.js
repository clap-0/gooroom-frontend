import {useState} from 'react';
import MobileAuth from './MobileAuth';

const useMobileAuth = () => {
  // 전화번호 인증 모달창이 열려있는지 여부를 저장
  const [mobileModalShow, setMobileModalShow] = useState(false);
  const useMobile = useState(undefined);
  const [mobile, _] = useMobile;

  const closeMobileModal = () => setMobileModalShow(false);
  const openMobileModal = () => setMobileModalShow(true);

  const MobileAuthModal = () => (
    <MobileAuth
      useMobile={useMobile}
      mobileModalShow={mobileModalShow}
      closeMobileModal={closeMobileModal}
    />
  );

  return {mobile, openMobileModal, closeMobileModal, MobileAuthModal};
};

export default useMobileAuth;
