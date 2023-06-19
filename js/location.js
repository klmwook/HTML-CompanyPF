/*
//const mapOption = { center: markInfo[0].position, level: 3 }; //지도 생성 옵션
//const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
//const markerImage = new kakao.maps.MarkerImage(markInfo[0].imgSrc, markInfo[0].imgSize, markInfo[0].imgPos);
//const marker = new kakao.maps.Marker({ position: markInfo[0].position, image: markerImage });
//
////마커인스턴트의 setMap 함수로 지도 인스턴스 바인딩
//marker.setMap(map);
//
//btnBranch1.addEventListener('click', () => map.panTo(position));
//btnBranch2.addEventListener('click', () => map.panTo(position2));

//원하는 위치의 위도, 경도 좌표값을 디테일 하게 구하는 법
//1. 구글맵스에서 원하는 위치값을 찍어서 좌표값 복사
//2. 카카오맵의 클릭한 위치 마커찍기 샘플예제의 직접해보기 섹션에 해당 위치값을 붙여넣기
//3. 해당 테스트화면의 정밀하게 원하는 지점을 찍고 해당 코드값을 활용
*/
const mapContainer = document.querySelector('#map');
const btns = document.querySelectorAll('.branch li');
const btnToggle = document.querySelector('.btnToggle');
let toggle = false;
let active_index = 0;

const markInfo = [
	{
		title: '코엑스',
		position: new kakao.maps.LatLng(37.512678514580735, 127.0605810427011),
		imgSrc: 'img/marker1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[0],
	},
	{
		title: '광화문',
		position: new kakao.maps.LatLng(37.575266, 126.977054),
		imgSrc: 'img/marker2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[1],
	},
	{
		title: '카카오본사',
		position: new kakao.maps.LatLng(33.450701, 126.570667),
		imgSrc: 'img/marker3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: btns[2],
	},
];

//MarkerInfo의 첫번째 데이터로 기본 지도 인스턴스 생성
const map = new kakao.maps.Map(mapContainer, { center: markInfo[0].position, level: 3 });
//마우스 휠 zoom 기능 비활성화
map.setZoomable(false);

//맵타입 인스턴스 생성후 맵인스턴스에 바인딩
const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

//맵 줌 컨트롤 인스턴스 생성후 맵인스턴스에 바인딩
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

markInfo.forEach((info, idx) => {
	const marker = new kakao.maps.Marker({ position: info.position, image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos) });
	marker.setMap(map);

	//지정 버튼을 클릭 시
	info.button.addEventListener('click', () => {
		//현재 클릭한 버튼의 순번을 active_index 전역 변수에 옮겨닮음
		//추후 브라우저 리사이즈시 현재 활성화 된 지역위치의 데이터 순번이 필요하기 때문.
		active_index = idx;
		map.panTo(info.position);

		for (const el of btns) el.classList.remove('on');
		btns[idx].classList.add('on');
	});
});

//브라우저 리사이즈 시 지도 위치 및 마커 가운데 보정
window.addEventListener('resize', () => {
	//현재 활성화 되어 있는 순번의 지역 위치값으로 맵 인스턴스 가운데 위치 보정
	map.setCenter(markInfo[active_index].position);
});

//토글 버튼 클릭 시 교통량 정보 on/off
btnToggle.addEventListener('click', () => {
	//클릭 할 때 마다 toggle에 담겨있는 boolean 값이 계속 반전 됨.
	toggle = !toggle;
	if (toggle) {
		map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnToggle.innerHTML = 'Traffic OFF';
	} else {
		map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		btnToggle.innerHTML = 'Traffic ON';
	}
});
