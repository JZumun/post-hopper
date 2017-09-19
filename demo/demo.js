var demoHopper = new PostHopper({
	posts: ".article",
	container: ".articles",
	onChangeActive: (active,oldActive,hopper) => {
		document.querySelector(".active-counter").innerText = `Current Post: ${hopper.activeIndex + 1}`;
	}
});

document.querySelector(".previous-button").addEventListener("click",e=>demoHopper.goToPrev());
document.querySelector(".next-button").addEventListener("click",e=>demoHopper.goToNext());
