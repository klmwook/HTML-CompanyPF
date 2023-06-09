const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btnSearch');

const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');

const api_key = '4b95b58f2acca136d03e1c6883048c6c';
const num = 50;
const myId = '198489363@N07';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
const method_user = 'flickr.people.getPhotos'; //사용자 유저 이미지
const method_search = 'flickr.photos.search';
const url_interest = `${baseURL}${method_interest}`;
const url_user = `${baseURL}${method_user}&user_id=${myId}`;

fecthData(url_interest);

btnSearch.addEventListener('click', () => {
	const value = input.value.trim();
	if (value === '') return alert('검색어를 입력 해 주세요.');
	const url_search = `${baseURL}${method_search}&tags=${value}`;
	fecthData(url_search);
});

btnInterest.addEventListener('click', () => fecthData(url_interest));
btnMine.addEventListener('click', () => fecthData(url_user));

//변수 아이디
wrap.addEventListener('click', (e) => {
	if (e.target.className == 'pic_owner') {
		const owner_Id = e.target.innerText; //owner명
		const url_owner = `${baseURL}${method_user}&user_id=${owner_Id}`;
		fecthData(url_owner);
	}
});

async function fecthData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	createList(items);
	setLoading();
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class='item'>
          <div>
            <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg' target='_blank'>
              <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg'/>
            </a>
            <p>${item.title === '' ? 'Have a Good day!!' : item.title}</p>

						<article class='profile'>						
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />	
							<span class='pic_owner'>${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});

	wrap.innerHTML = tags;
}

function setLoading() {
	//isoLayout 처음 적용 시 이미지 카드가 겹치는 원인
	//imgDOM은 생성되었지만 해당 DOM에 수반되는 소스이미지가 아직 Randering되지 않은 상태에서 isoLayout이 호출 되었기 때문.
	//해결방법 - 동적으로 만들어진 모든 imgDOM을 반복 돌면서 Onload이벤트를 연결해서 모든 소스 이미지까지 Randering 완료된 시점에 isoLayout호출
	const imgs = wrap.querySelectorAll('img');

	let count = 0;

	for (const el of imgs) {
		//만약 이미지에 엑스박스가 뜨면 onerror이벤트로 잡아서 defalut 이미지로 대체
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};

		//디폴트로 변경된 이미지까지 포함해서 카운트 (무한루프에 빠지지 않음)
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
}

function isoLayout() {
	new Isotope(wrap, {
		// options
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});

	wrap.classList.add('on');
	loading.classList.add('off');
}
