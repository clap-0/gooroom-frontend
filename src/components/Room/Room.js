/* global kakao */
import React, {useEffect} from 'react';

const {kakao} = window;

const Room = ({address}) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.4945, 126.9597),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    if (address) {
      //위도, 경도로 변환 및 마커표시
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          map.setCenter(coords);
        }
      });
    }
  }, [address]);

  return (
    <>
      <div id="map" style={{width: '100%', height: '80vh'}}></div>
    </>
  );
};

export default Room;
