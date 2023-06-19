const mapContainer = document.querySelector('#map');
const position = new kakao.maps.LatLng(37.51270999164393, 127.06069417692242); //지도 위치 인스턴스
const mapOption = { center: position, level: 3 }; //지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); //지도 인스턴스 생성
const marker = new kakao.maps.Marker({ position: position }); //마커 인스턴스 생성

//마커인스턴트의 setMap함수로 지도 인스턴스 바인딩
marker.setMap(map);

//원하는 위치의 위도, 경도 좌표값을 디테일하게 구하는 법
//1-구글맵스에서 원하는 위치값을 찍어서 좌표값 복사
//2-카카오맵의 클릭한위치 마커찍기 샘플예제의 직접해보기 섹션에 해당 위치값을 붙여넣기
//3-해당 테스트화면에서 정밀하게 원하는 지점을 찍고 해당 코드값을 활용
