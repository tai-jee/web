function getAge(birthDay: number, birthMonth: number, birthYear: number) {
	const today = new Date();
	let age = today.getFullYear() - birthYear;

	const hasHadBirthdayThisYear =
		today.getMonth() > birthMonth - 1 ||
		(today.getMonth() === birthMonth - 1 && today.getDate() >= birthDay);

	if (!hasHadBirthdayThisYear) {
		age--;
	}

	return age;
}

const elements = document.querySelectorAll(".age");

elements.forEach((el) => {
	el.textContent = getAge(25, 1, 2008).toString();
});
