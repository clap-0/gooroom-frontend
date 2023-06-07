import Room from 'components/Room';
import styled from 'styled-components';
import {Row, Col, Stack, Form, Modal} from 'react-bootstrap';
import {useState} from 'react';
import Button from 'components/common/Button/Button';
import {gu} from 'constants/roomConstants';
import {useForm} from 'react-hook-form';
import {SlLocationPin} from 'react-icons/sl';
import {formatPrice} from 'utils/mateUtils';
import UnexpectedPage from './UnexpectedPage';
import Loading from 'components/common/Loading/Loading';
import useRooms from 'hooks/useRooms';
import CODE from 'constants/errorCode';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const ResidenceComponent = ({residenceType}) => {
  let residenceLabel = '';
  if (residenceType === 'ONE_ROOM') {
    residenceLabel = '원룸';
  } else if (residenceType === 'TWO_ROOM') {
    residenceLabel = '투룸';
  } else if (residenceType === 'APARTMENT') {
    residenceLabel = '아파트';
  } else if (residenceType === 'STUDIO') {
    residenceLabel = '오피스텔';
  }

  return <span>{residenceLabel}</span>;
};
const StyledRoomList = styled.div`
  overflow-y: scroll;
  height: 65vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const RoomPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        city: yup.string().required().oneOf(gu),
        dong: yup.string().required(),
        airConditional: yup
          .mixed()
          .optional()
          .transform((value, originalValue) => {
            return ['true', 'false', 'undefined'].includes(value)
              ? JSON.parse(value)
              : undefined;
          }),
        refrigerator: yup
          .mixed()
          .optional()
          .transform((value, originalValue) => {
            return ['true', 'false', 'undefined'].includes(value)
              ? JSON.parse(value)
              : undefined;
          }),
        washingMachine: yup
          .mixed()
          .optional()
          .transform((value, originalValue) => {
            return ['true', 'false', 'undefined'].includes(value)
              ? JSON.parse(value)
              : undefined;
          }),
        parking: yup
          .mixed()
          .optional()
          .transform((value, originalValue) => {
            return ['true', 'false', 'undefined'].includes(value)
              ? JSON.parse(value)
              : undefined;
          }),
      }),
    ),
  });

  const [address, setAddress] = useState();

  const [unexpectedError, setUnexpectedError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const {rooms, getRooms} = useRooms();

  const handleFilter = async data => {
    setLoading(true);
    const {
      city = gu[0],
      dong = '',
      airConditional = undefined,
      refrigerator = undefined,
      washingMachine = undefined,
      parking = undefined,
    } = data;

    const response = await getRooms({
      city,
      dong,
      airConditional,
      refrigerator,
      washingMachine,
      parking,
    });

    switch (response) {
      case CODE.UNEXPECTED:
        setUnexpectedError(true);
        break;
      default:
    }

    setLoading(false);
  };

  if (unexpectedError) {
    return <UnexpectedPage />;
  }

  // 서버에서 데이터를 가져오는 중에는 로딩화면 렌더링
  if (loading) {
    return <Loading />;
  }

  const handleRoomClick = location => {
    setAddress(location);
  };

  const showFilter = () => setShow(true);
  const hideFilter = () => setShow(false);

  return (
    <Stack direction="horizontal">
      {/* 지도 */}
      <Col>
        <Room address={address}></Room>
      </Col>
      {/* 지도 컨트롤러 */}
      <Col sm={4}>
        <Stack direction="horizontal" className="d-flex align-items-center">
          {/* 매물 검색 */}
          <Form
            className="d-flex align-items-center gap-2 px-2 py-4"
            onSubmit={handleSubmit(handleFilter)}
          >
            <Form.Group controlId="formDong">
              <Form.Select
                {...register('city')}
                isInvalid={!!errors['city']}
                style={{width: '8rem'}}
              >
                {gu.map((value, index) => (
                  <option key={index}>{value}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formDong">
              <Form.Control
                maxLength={10}
                placeholder="xx동"
                {...register('dong')}
                isInvalid={!!errors['dong']}
              />
            </Form.Group>
            <Button
              style={{whiteSpace: 'nowrap'}}
              variant="primary"
              type="submit"
            >
              검색
            </Button>
            <Button
              style={{whiteSpace: 'nowrap'}}
              variant="secondary"
              onClick={showFilter}
            >
              필터링
            </Button>
            <Modal show={show} onHide={hideFilter}>
              <Modal.Header closeButton>
                <Modal.Title>필터링</Modal.Title>
              </Modal.Header>
              <Form onSubmit={handleSubmit(handleFilter)}>
                <Modal.Body>
                  {/* 에어컨 */}
                  <Form.Group className="mb-3" controlId="formAirConditioner">
                    <Form.Label>에어컨</Form.Label>
                    <Form.Select
                      {...register('airConditional')}
                      isInvalid={!!errors['airConditional']}
                    >
                      <option value={undefined}>에어컨</option>
                      <option value={true}>O</option>
                      <option value={false}>X</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRefrigerator">
                    <Form.Label>냉장고</Form.Label>
                    <Form.Select
                      {...register('refrigerator')}
                      isInvalid={!!errors['refrigerator']}
                    >
                      <option value={undefined}>냉장고</option>
                      <option value={true}>O</option>
                      <option value={false}>X</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formWashingMachine">
                    <Form.Label>세탁기</Form.Label>
                    <Form.Select
                      {...register('washingMachine')}
                      isInvalid={!!errors['washingMachine']}
                    >
                      <option value={undefined}>세탁기</option>
                      <option value={true}>O</option>
                      <option value={false}>X</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formParking">
                    <Form.Label>주차장</Form.Label>
                    <Form.Select
                      {...register('parking')}
                      isInvalid={!!errors['parking']}
                    >
                      <option value={undefined}>주차장</option>
                      <option value={true}>O</option>
                      <option value={false}>X</option>
                    </Form.Select>
                  </Form.Group>
                </Modal.Body>
              </Form>
            </Modal>
          </Form>
        </Stack>
        <StyledRoomList>
          {/* 매물 출력 */}
          {/* 서버 연결가능하면 Rooms.map -> rooms  */}
          {rooms.map((room, index) => (
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #a2a2a2',
                height: '6rem',
              }}
              key={index}
              onClick={() => handleRoomClick(room.location)}
            >
              <div
                style={{
                  width: '30%',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SlLocationPin fill="#6A5ACD" size="4em"></SlLocationPin>
              </div>
              <div>
                <Row>
                  <h5 style={{marginTop: '10px'}}>
                    {room.rentType === 'WOLSE'
                      ? `월세 ${formatPrice(room.deposit)}/${formatPrice(
                          room.monthlyFee,
                        )}`
                      : `전세 ${formatPrice(room.deposit)}`}
                  </h5>
                </Row>
                <Row>
                  <span style={{display: 'inline-block'}}>
                    <ResidenceComponent residenceType="ONE_ROOM" />
                    {'  | '}
                    {room.floor}층 {'  | '}
                    {room.houseSize}
                  </span>
                </Row>
                <Row>
                  <span style={{fontSize: '15px'}}>
                    {room.city} {room.dong}
                  </span>
                </Row>
              </div>
            </div>
          ))}
        </StyledRoomList>
      </Col>
    </Stack>
  );
};

export default RoomPage;
