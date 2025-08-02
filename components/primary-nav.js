const items = {
	about: { label: 'About', href: '/'},
	blogs: { label: 'Blogs', href: '/blogs/'},
	projects: { label: 'Projects', href: '/projects.html'}
};

class PrimaryNav extends HTMLElement {
	static observedAttributes = ['current'];
	
	constructor() {
		super();
		
		const nav = document.createElement('nav');
		nav.setAttribute('aria-label', 'primary');
		
		const ul = document.createElement('ul');
		
		for (const key in items) {
			const item = items[key];
			const li = document.createElement('li');
			li.setAttribute('id', key);
			const a = document.createElement('a');
			a.textContent = item.label;
			a.href = item.href;
			li.appendChild(a);
			ul.appendChild(li);
		}
		
		nav.appendChild(ul);
		this.appendChild(nav);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		if(name !== 'current') return;
		if(!(newValue in items)) {
			console.warn('Value of "current" attribute does not match any nav item.');
			return;
		}
		const li = this.querySelector(`#${newValue}`);
		if (!li) {
			console.error('Could not find the "current" nav item\'s element.');
			return;
		}
		li.textContent = items[newValue].label;
		li.setAttribute('aria-current', 'location');
	}
}
customElements.define('primary-nav', PrimaryNav);
