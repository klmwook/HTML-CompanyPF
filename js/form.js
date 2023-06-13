/*
  1. submit 버튼에 폼전송 이벤트 연결
  2. 각 폼 항목마다의 인증함수 정의
  3. 각 함수마다 인증여부에 따라 true / false 값 return
  4. 전송 버튼 클릭 시 각 함수에서 하나라도 false 값을 return 시 전송 기능 막음  
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

//제출 시 밸리데이션
btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault(); //아이디
	if (!isTxt('comments', 10)) e.preventDefault(); //comments
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault(); //비밀번호 / 비밀번호 확인
	if (!isEmail('email', 6)) e.preventDefault(); //이메일
	if (!isCheck('gender')) e.preventDefault(); //성별
	if (!isCheck('hobby')) e.preventDefault(); //취미
	if (!isSelect('edu')) e.preventDefault(); //
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
	const Email = form.querySelector(`[name=${name}]`).value.trim();

	if (Email.indexOf('@') < 0 || Email.length < len) {
		alert(`입력한 이메일 항목에 @을 추가해주시고 ${len}글자 이상 입력 하세요.`);
		return false;
	}

	return true;
}

//체크요소 형식 입력받아 인증
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;
	//현재 반복도는 체크폼요소에 하나라도 체크되어 있는게 있다면
	//지역변수 isChecked를 true로 변경
	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		alert('해당 선택사항을 하나 이상 체크하세요.');
		return false;
	} else return true;
}

//select요소 입력 받아 인증
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		alert('해당 요소중에 하나를 선택 해 주세요.');
		return false;
	} else return true;
}
