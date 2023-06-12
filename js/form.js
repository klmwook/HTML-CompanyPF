/*
  1. submit 버튼에 폼전송 이벤트 연결
  2. 각 폼 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true / false 값 return
  4. 전송 버튼 클릭 시 각 함수에서 하나라도 false 값을 return 시 전송 기능 막음  
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt) e.preventDefault();
	if (!isPwd) e.preventDefault();
	if (!isEmail) e.preventDefault();
	if (!isCheck) e.preventDefault();
	if (!isSelect) e.preventDefault();
});

//userid 인증 함수
function isTxt() {
	return true;
}

//pwd 인증 함수
function isPwd() {
	return true;
}

function isEmail() {
	return true;
}

function isCheck() {
	return true;
}

function isSelect() {
	return true;
}
