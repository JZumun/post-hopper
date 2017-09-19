import scrollTo from "animated-scroll-to";

const Hopper = {
	get active() {
		return this.posts[ this.activeIndex ];
	},
	get previous() {
		return this.active.getBoundingClientRect().top < 0 ? this.active
			: this.posts[ Math.max(this.activeIndex - 1, 0) ];
	},
	get next() {
		return this.posts[ Math.min(this.activeIndex + 1, this.posts.length - 1) ];
	},
	goToNext() {
		scrollTo(this.next, { element: this.container });
	},
	goToPrev() {
		scrollTo(this.previous, { element: this.container });
	},
	destroy() {
		this.posts = [];
		this.container = undefined;
		this.observer.disconnect();
	}
};

export default function({
	container,
	posts = [],
	offset = 0,
	onChangeActive
}={}) {
	const postsArray = (typeof posts === "string") ? [...window.document.querySelectorAll(posts)] : [...posts];
	const containerElement = (typeof container === "string") ? window.document.querySelector(container) : container;

	const hopper = Object.assign(Object.create(Hopper), {
		container: containerElement,
		posts: postsArray,
		activeIndex: 0,
		offset
	});

	const changeActive = changes => changes.forEach(change => {
		if (change.boundingClientRect.top >= 0) return;

		const oldActive = hopper.active;

		const index = postsArray.indexOf(change.target);
		hopper.activeIndex = change.isIntersecting ? index : Math.min(postsArray.length - 1, index + 1);

		if (oldActive !== hopper.active && onChangeActive) {
			onChangeActive.call(hopper,hopper.active,oldActive,hopper);
		}
	});

	hopper.observer = new IntersectionObserver(changeActive, { rootMargin: `-${offset}px 0px 0px 0px` });

	postsArray.forEach(post => hopper.observer.observe(post));

	return hopper;
}
