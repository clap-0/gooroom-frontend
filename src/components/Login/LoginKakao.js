/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigate} from 'react-router-dom';
import Loading from './Loading';
import {useEffect} from 'react';
import {REDIRECT_URI_KAKAO} from 'constants/path';
import customAxios from 'utils/customAxios';
import {setRefreshToken} from 'utils/RefreshToken';
import {useAuthDispatch} from 'hooks/useAuth';

const LoginKakao = props => {
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();

  const code = new URL(window.location.href).searchParams.get('code');

  // LoginKakao 컴포넌트가 처음 나타날 때 서버에 인가 코드를 보낸다.
  useEffect(() => {
    const postLoginKakao = async () => {
      const response = await customAxios.post(REDIRECT_URI_KAKAO, code);
      const responseJson = JSON.parse(response);

      // access token과 refresh token을 서버에게 받아 저장한다.
      setRefreshToken(responseJson['Authorization-refresh']);
      authDispatch({type: 'SET_TOKEN', token: responseJson.Authorization});

      return navigate('/');
    };
    postLoginKakao();
  }, []);

  return (
    <Loading title="로그인 중입니다." description="잠시만 기다려주세요." />
  );
};

export default LoginKakao;