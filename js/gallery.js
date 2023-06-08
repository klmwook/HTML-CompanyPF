const wrap = document.querySelector('.gallery .wrap');
const api_key = '4b95b58f2acca136d03e1c6883048c6c';
const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
const num = 5;
const baseURL = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${num}`;

fetch(baseURL)
	.then((res) => res.json())
	.then((json) => {
		console.log(json);
	});
