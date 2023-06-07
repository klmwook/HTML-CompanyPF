/*
fetchDepart();

async function fetchDepart() {
	const result = await fetch('../DB/department.json');
	const data = await result.json();

	console.log(data);
}
*/

const wrap = document.querySelector('.department .wrap');
let tags = '';

fetch('../DB/department.json')
	.then((res) => res.json()) //promise 객체 반환
	.then((data) => {
		const memberData = data.members;

		memberData.map((data) => {
			tags += `
        <article>
          <div class='pic'>
            <img src='img/${data.pic}'
          </div>
          <h2>${data.name}</h2>
          <p>${data.position}</p>          
        </article>
      `;
		});

		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
