const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const api_key = '4b95b58f2acca136d03e1c6883048c6c';
const num = 500;
const myId = '198489363@N07';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
const method_user = 'flickr.people.getPhotos'; //사용자 유저 이미지
const interest_URL = `${baseURL}${method_interest}`;
const user_url = `${baseURL}${method_user}&user_id=${myId}`;

fetch(user_url)
	.then((res) => res.json())
	.then((json) => {
		console.log(json.photos.photo);
		const items = json.photos.photo;

		let tags = '';

		items.forEach((item) => {
			tags += `
        <li class='item'>
          <div>
            <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg' target='_blank'>
              <img src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg'/>
            </a>
            <p>${item.title === '' ? 'Have a Good day!!' : item.title}</p>
          </div>
        </li>
      `;
		});

		wrap.innerHTML = tags;

		//isoLayout 처음 적용 시 이미지 카드가 겹치는 원인
		//imgDOM은 생성되었지만 해당 DOM에 수반되는 소스이미지가 아직 Randering되지 않은 상태에서 isoLayout이 호출 되었기 때문.
		//해결방법 - 동적으로 만들어진 모든 imgDOM을 반복 돌면서 Onload이벤트를 연결해서 모든 소스 이미지까지 Randering 완료된 시점에 isoLayout호출
		const imgs = wrap.querySelectorAll('img');

		let count = 0;

		for (const el of imgs) {
			el.onload = () => {
				count++;
				console.log(count);
				//소스이미지 렌더링완료된 숫자와 imgDOM의 객체의 수가 동일할 때
				//모든 imgDOM에 해당하는 소스이미지가 렌더링 완료된 순간
				//이때 isoLayout 호출
				count === imgs.length && isoLayout();
				//if(count === imgs.length) isoLayout();
				//count === imgs.length ? isoLayout() : null;
			};
		}
	});

function isoLayout() {
	new Isotope(wrap, {
		// options
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}
