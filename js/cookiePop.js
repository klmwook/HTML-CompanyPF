//쿠키는 사용자의 컴퓨터에 물리적인 파일형태로 저장하는 경량의 텍스트 자료
//name = value 형식으로 저장, 쿠키 생성시 쿠키의 생성주기를 설정가능
//name = value; path=/; expires=만료일;
//document.cookie : 생성된 쿠키값 확인 가능

//문자열.indexOf(찾을문자열) : 전체 문자열에서 인수로 전달한 문자열의 순번을 반환
//전체 문자열에서 indexOf 특정 문자열을 찾지 못하면 -1을 반환
//indexOf를 쓰는 이유는 -1을 통해서 전체 문자열에 특정 문자값이 있는지 없는지를 판단

const btnShow = document.querySelector('header h1');
const btnDel = document.querySelectorAll('header #gnb li')[0];
const pop = document.querySelector('#pop');
const ck = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');

const txt = 'hello world';
console.log(txt.indexOf('world'));
