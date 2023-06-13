const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

//텍스트항목 입력받아 인증
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();

	if (text.length < len) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트를 ${len}글자 이상 입력하세요`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//비밀번호 입력받아 인증
function isPwd(pwd1, pwd2, len) {
	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	//num.test(pwd1_val) : pwd1_val에서 정규표현식으로 분류한 값이 포함되어있으면 true반환, 그렇지 않으면 false반환

	if (pwd1_val !== pwd2_val || pwd1_val.length < len || !num.test(pwd1_val) || !eng.test(pwd1_val) || !spc.test(pwd1_val)) {
		resetErr(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.innerText = `비밀번호는 ${len}글자 이상 특수문자, 영문, 숫자를 모두 포함하세요.`;
		pwdEl1.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(pwdEl1);
		return true;
	}
}

//이메일 형식 입력받아 인증
function isEmail(name, len) {
	// const spc = /[@]/;
	// const emailEl = form.querySelector(`[name=${name}]`);
	// const email = form.querySelector(`[name=${name}]`).value;
	// if (email.indexOf('@') < 0 || email.length < len || !spc.test(email)) {
	// 	resetErr(emailEl);
	// 	const errMsg = document.createElement('p');
	// 	errMsg.innerText = `이메일은 ${len}글자 이상 @를 포함하세요.`;
	// 	emailEl.closest('td').append(errMsg);
	// 	return false;
	// } else {
	// 	resetErr(emailEl);
	// 	return true;
	// }

	const email = form.querySelector(`[name=${name}]`);
	const email_val = email.value;

	//순서 1 - 이메일 주소에 @ 있는지 유무 판단
	if (/@/.test(email_val)) {
		const [forwardTxt, backwoadTxt] = email_val.split('@');

		//순서 3 - @가 있다는 전제하에 @ 앞뒤로 문자값이 있는지 확인해서 없으면 에러 반환
		if (!forwardTxt || !backwoadTxt) {
			resetErr(email);
			const errMsg = document.createElement('p');
			errMsg.innerText = '@앞쪽이나 뒤쪽에 문자값이 없습니다.';
			email.closest('td').append(errMsg);
			return false;
			//순서 4 - 뒤쪽 문자에 .이 없으면 에러 반환
		} else {
			//정규표현식 안쪽에 예약어로 인지되는 문자앞에 역슬러쉬를 붙여서 예약어에서 제외시켜서 문자로 연산
			if (!/\./.test(backwoadTxt)) {
				resetErr(email);
				const errMsg = document.createElement('p');
				errMsg.innerText = '@ 뒤쪽의 서비스명이 올바른지 확인하세요.';
				email.closest('td').append(errMsg);
				return false;
			}
		}
	}
	//순서 2 - @ 없으면 에러 문구 출력하고 false 반환
	else {
		resetErr(email);
		const errMsg = document.createElement('p');
		errMsg.innerHTML = '@를 포함하세요';
		email.closest('td').append(errMsg);
		return false;
	}

	return true;
}

//체크요소 형식 입력받아 인증
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;
	for (const input of inputs) input.checked && (isChecked = true);

	if (!isChecked) {
		resetErr(inputs);
		const errMsg = document.createElement('p');
		errMsg.innerText = `항목을 하나이상 선택하세요.`;
		inputs[0].closest('td').append(errMsg);
		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

//select요소 입력받아 인증
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `항목을 하나이상 선택하세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

//에러메세지 제거 함수
function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) el.closest('td').querySelector('p').remove();
}
