//외부 API 서비스 token 값 발행
//외부 API 데이터를 가져오기 위해 url 생성을 위한 API 사용법 숙지
//해당 api 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력

//자주쓰는 문자열 관련 메서드
//문자열.substr(시작문자열순서, 자를 문자열 갯수) : 특정문자열에서 원하는 위치에서 원하는 글자 갯수까지 잘라서 변환
//문자열.split('구분자') : 구분자를 기점으로 문자열을 나눠서 배열로 반환
//배열.join('구분자') : 배열값을 구분자로 이어 붙여서 하나의 문자열로 반환

const wrap = document.querySelector('.youtube .wrap');
const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
const list = 'PLGrvPC1Wr19hfiUx9COmzcnOQLVEihTor';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

fetch(url)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.forEach((item) => {
			let tit = item.snippet.title;
			let desc = item.snippet.description;
			let date = item.snippet.publishedAt;
			console.log(date);
			console.log(date.split('T')[0].split('-').join('.'));

			tags += `
      <article>
        <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
        <div class='txt'>
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${item.snippet.publishedAt}</span>
        </div>
        <div class='pic'>
          <img src=${item.snippet.thumbnails.standard.url} />
        </div>
      </article>
      `;
		});

		wrap.innerHTML = tags;
	});
