/*
  1. submit 버튼에 폼전송 이벤트 연결
  2. 각 폼 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true / false 값 return
  4. 전송 버튼 클릭 시 각 함수에서 하나라도 false 값을 return 시 전송 기능 막음  
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck()) e.preventDefault();
	if (!isSelect()) e.preventDefault();
});

//텍스트항목 입력 받아 인증
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();
	if (text.length < len) {
		alert(`입력한 텍스트 항목을 ${len}글자 이상 입력 하세요.`);
		return false;
	} else {
		return true;
	}
}

//비밀번호 입력 받아 인증 함수
//조건 - 다섯글자 이상 입력 , 2개의 비밀번호가 동일
function isPwd(name, name2, len) {
	const pwd = form.querySelector(`[name=${name}]`).value.trim();
	const pwd2 = form.querySelector(`[name=${name2}]`).value.trim();

	if (pwd !== pwd2 || pwd.length < len) {
		alert(`비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력 하세요.`);
		return false;
	}
	return true;
}

//이메일 형식 입력 받아 인증 함수
//조건 - 입력한 문자가 6글자 이상이고, @포함
function isEmail(name, len) {
	const input = form.querySelector(`input[name=${name}]`);
	const Email = input.value.trim();

	if (Email.length < len) {
		alert(`입력한 이메일 항목을 ${len}글자 이상 입력 하세요.`);
		return false;
	}

	if (Email.indexOf('@') === -1) {
		alert(`@를 추가하여 이메일을 입력 해 주세요.`);
		return false;
	}

	return true;
}

//체크요소 형식 입력받아 인증
function isCheck(name) {
	return true;
}

//select요소 입력 받아 인증
function isSelect(name) {
	return true;
}
