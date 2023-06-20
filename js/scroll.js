const secs = document.querySelectorAll('.myScroll');
const list = document.querySelector('#scroll_navi');
const vidsText = document.querySelector('#vids .scrolledText');
const vidsText2 = document.querySelector('#vids .scrolledText2');
const btns = list.querySelectorAll('li');
const speed = 500;
const baseline = -300;
let enableEvent = true;
let autoScroll = false;
let eventBlocker = null;

window.addEventListener('scroll', () => {
	vids_scroll();

	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		activation();
		eventBlocker = null;
	}, speed);
});
window.addEventListener('resize', () => {
	if (eventBlocker) return;
	eventBlocker = setTimeout(() => {
		modifyPos();
		eventBlocker = null;
	}, speed);
});
autoScroll && window.addEventListener('mousewheel', moveAuto, { passive: false });

btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => enableEvent && moveScroll(idx));
});

function activation() {
	const scroll = window.scrollY;

	if (scroll <= 500) {
		for (const el of secs) el.classList.remove('on');
	}

	secs.forEach((_, idx) => {
		if (scroll >= secs[idx].offsetTop + baseline) {
			for (const el of btns) el.classList.remove('on');
			btns[idx].classList.add('on');
			//for (const el of secs) el.classList.remove('on');
			secs[idx].classList.add('on');
		}
	});
}

function moveScroll(idx) {
	enableEvent = false;
	new Anime(window, {
		prop: 'scroll',
		value: secs[idx].offsetTop,
		duration: speed,
		callback: () => (enableEvent = true),
	});
}

function modifyPos() {
	const active = list.querySelector('li.on');
	const active_index = Array.from(btns).indexOf(active);
	window.scrollTo({ top: secs[active_index].offsetTop, behavior: 'smooth' });
}

function moveAuto(e) {
	e.preventDefault();
	const active = list.querySelector('li.on');
	const active_index = Array.from(btns).indexOf(active);

	if (e.deltaY > 0) {
		if (active_index === btns.length - 1) return;
		moveScroll(active_index + 1);
	} else {
		if (active_index === 0) return;
		moveScroll(active_index - 1);
	}
}

function vids_scroll() {
	const scroll = window.scrollY;
	let scroll2 = scroll - secs[1].offsetTop - baseline;

	if (scroll > secs[1].offsetTop + baseline) {
		vidsText.style.left = scroll2 + 'px';
		vidsText2.style.left = scroll2 * 2.5 + 'px';
	} else {
		vidsText.style.left = 0 + 'px';
		vidsText2.style.left = 0 + 'px';
	}
}

function sec4_custom_scroll() {
	const scroll = window.scrollY;
	let scroll2 = (scroll - secs[3].offsetTop - baseline) / 500;

	if (scroll > secs[3].offsetTop + baseline) {
		box.style.transform = `scale(${1 + scroll2}) rotate(${0 + scroll2 * 100}deg)`;
		box.style.opacity = 1 - scroll2;
	} else {
		box.style.transform = `scale(1) rotate(0deg)`;
		box.style.opacity = 1;
	}
}
