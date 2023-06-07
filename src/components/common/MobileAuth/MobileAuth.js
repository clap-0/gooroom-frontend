import {Col, Form, Modal, Row} from 'react-bootstrap';
import Button from 'components/common/Button';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {REGEXP_PHONENUMBER} from 'constants/memberConstants';
import {phoneNumberAutoFormat} from 'utils/autoFormat';

const MobileAuth = ({useMobile, mobileModalShow, closeMobileModal}) => {
  const [verifiedMobile, setVerifiedMobile] = useMobile;
  const [mobile, setMobile] = useState();
  const [authNum, setAuthNum] = useState();

  const {
    register: registerMobile,
    handleSubmit: handleSubmitMobile,
    setValue,
    formState: {errors: mobileErrors},
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        mobile: yup // 전화번호 형식 확인
          .string()
          .required('필수 항목입니다.')
          .matches(REGEXP_PHONENUMBER, '전화번호 형식이 올바르지 않습니다.'),
      }),
    ),
    defaultValues: {
      mobile: verifiedMobile,
    },
  });

  const {
    register: registerAuthNum,
    handleSubmit: handleSubmitAuthNum,
    setError,
    setFocus,
    formState: {errors: authNumErrors},
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        userAuthNum: yup // 전화번호 형식 확인
          .string()
          .required('필수 항목입니다.'),
      }),
    ),
  });

  // 서버에 주어진 전화번호로 인증번호 전송을 요청하는 함수이다.
  const requestAuthNum = data => {
    const {mobile} = data;
    /** TODO - 서버에 문자인증 요청 */
    setAuthNum('1026');
    setMobile(mobile);
  };

  // 인증번호와 입력 인증번호 비교
  const compareAuthNum = data => {
    const {userAuthNum} = data;
    if (userAuthNum === authNum) {
      setVerifiedMobile(mobile);
      closeMobileModal();
    } else {
      console.log(typeof userAuthNum, typeof authNum);
      setError('userAuthNum', {
        type: 'custom',
        message: '인증번호가 일치하지 않습니다.',
      });
      setFocus('userAuthNum');
    }
  };

  return (
    <Modal show={mobileModalShow} onHide={closeMobileModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>전화번호 인증</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-4">
        <Form onSubmit={handleSubmitMobile(requestAuthNum)}>
          <Form.Group controlId="signupFormMobile">
            <Form.Label>전화번호</Form.Label>
            <Row className="align-items-center">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="전화번호를 입력해주세요."
                  maxLength="13"
                  isInvalid={!!mobileErrors.mobile}
                  autoFocus
                  {...registerMobile('mobile', {
                    onChange: e => {
                      const formattedValue = phoneNumberAutoFormat(
                        e.target.value,
                      );
                      setValue('mobile', formattedValue);
                    },
                  })}
                />
              </Col>
              <Col sm="auto">
                <Button
                  variant={!authNum ? 'primary' : 'secondary'}
                  type="submit"
                  disabled={!!authNum}
                >
                  인증번호 받기
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
        {authNum && (
          <Form onSubmit={handleSubmitAuthNum(compareAuthNum)}>
            <Form.Group controlId="signupFormMobile">
              <Form.Label>인증번호</Form.Label>
              <Row className="align-items-start">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="전화번호를 입력해주세요."
                    isInvalid={!!authNumErrors.userAuthNum}
                    autoFocus
                    {...registerAuthNum('userAuthNum')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {authNumErrors.userAuthNum?.message}
                  </Form.Control.Feedback>
                </Col>
                <Col sm="auto">
                  <Button variant="primary" type="submit">
                    인증하기
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MobileAuth;
