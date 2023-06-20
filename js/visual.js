const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');
const pagination = document.querySelector('.swiper-pagination');
const btnPrev = document.querySelector('.swiper-button-prev');
const btnNext = document.querySelector('.swiper-button-next');

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
	slidesPerView: 3,
	spaceBetween: 30,
	breakpoints: {
		//0px 이상일때 (mobile)
		0: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		//640px 이상일떄 (tablet)
		640: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// 1000px이상일떄 (desktop)
		1000: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
});
btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
});

[pagination, btnPrev, btnNext].forEach((el) => {
	el.addEventListener('click', () => {
		btnPause.classList.add('on');
		btnPlay.classList.remove('on');
	});
});
swiper.on('sliderMove', () => {
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
});
