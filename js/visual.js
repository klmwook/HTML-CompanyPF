/*
  swiper 적용순서
  1. html의 head분에 swiper 전용 css,js,cdn 코드 연결
  2. html 구조를 frame >.swiper-wrapper > .swiper-silde 클래스 명으로 생성
  3. css에서 전체 frame의 넓이와 높이값만 지정 (자식요소 크기 지정할 필요 없음)
  4. 스크립트 파일에서 new Swiper('프레임명')
*/

const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');

const swiper = new Swiper('#visual', {
	loop: true,
	//effect: 'fade',
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoplay: {
		delay: 2000,
	},
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
});

btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
});
