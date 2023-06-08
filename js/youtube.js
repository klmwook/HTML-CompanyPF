//외부 API 서비스 token 값 발행
//외부 API 데이터를 가져오기 위해 url 생성을 위한 API 사용법 숙지
//해당 api 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력

//자주쓰는 문자열 관련 메서드
//문자열.substr(시작문자열순서, 자를 문자열 갯수) : 특정문자열에서 원하는 위치에서 원하는 글자 갯수까지 잘라서 변환
//문자열.split('구분자') : 구분자를 기점으로 문자열을 나눠서 배열로 반환
//배열.join('구분자') : 배열값을 구분자로 이어 붙여서 하나의 문자열로 반환

const wrap = document.querySelector('.youtube .wrap');

//이벤트 위임 (Event Delegate)
//현재 없는 요소에 이벤트를 전달하기 위해서 항상 있는 상위 부모요소에 이벤트를 위임 (이벤트 버블링 활용한 개념)

//e.target vs e.currentTarget
//e.currentTarget : 현재 이벤트 구문상에 선택자로 연결되어 있는 요소를 지칭
//e.target : 화면상에서 이벤트가 발생한 대상을 지칭

fetchData();

document.body.addEventListener('click', (e) => {
	if (e.target.className === 'thumb') createPop();
	if (e.target.className === 'close') removePop();
});

//데이터 fetching 함수
async function fetchData() {
	const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
	const list = 'PLGrvPC1Wr19hfiUx9COmzcnOQLVEihTor';
	const num = 10;
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

	const data = await fetch(url);
	const json = await data.json();
	console.log(json.items);

	createList(json.items);
}

//동적으로 목록 생성함수
function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		let tit = item.snippet.title;
		let desc = item.snippet.description;
		let date = item.snippet.publishedAt;

		tags += `
      <article>
        <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
        <div class='txt'>
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
        </div>
        <div class='pic'>
          <img class='thumb' src=${item.snippet.thumbnails.standard.url} alt=${
			item.snippet.resourceId.videoId
		}/>
        </div>
      </article>
      `;
	});

	wrap.innerHTML = tags;

	//Then구문 안쪽에서 동기적으로 돔요소가 동적으로 생성된 이후에만 해당 요소에 접근 가능
	// const pic = document.querySelectorAll('.pic')[0];

	// pic.addEventListener('click', () => {
	// 	console.log('clicked');
	// });
}

//동적으로 팝업 생성함수
function createPop() {
	const tags = `	
		<div class='con'></div>
		<span class='close'>close</span>	
	`;

	const pop = document.createElement('aside');
	pop.className = 'pop';
	pop.innerHTML = tags;
	document.body.append(pop);
	//특정 코드를 강제로 동기화시키고 싶을 때는 setTimeout에 delay를 0초로 지정해서 코드를 패키징 (강제로 web api에 넘어갔다가 다시 콜스택 제일 마지막에 등록)
	setTimeout(() => document.querySelector('.pop').classList.add('on'), 0);
	document.body.style.overflow = 'hidden';
}

//팝업 제거 함수
function removePop() {
	document.querySelector('.pop').classList.remove('on');
	setTimeout(() => {
		document.querySelector('.pop').remove();
	}, 1000);

	document.body.style.overflow = 'auto';
}
