const menuLinks: Array<{ text: string; href: string }> = [
  { text: 'about', href: '/about' },
  { text: 'catalog', href: '/catalog' },
  { text: 'orders', href: '/orders' },
  { text: 'account', href: '/account' },
];

const mainEl = document.querySelector('main')! as HTMLDivElement;

mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1> DOM Manipulation</h1>';
//
mainEl.classList.add('flex-ctr');

const topMenuEl = document.getElementById('top-menu') as HTMLElement;

topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

const links: Array<HTMLAnchorElement> = menuLinks.map((link) => {
  const aTag: HTMLAnchorElement = document.createElement('a');
  aTag.setAttribute('href', link.href);
  aTag.textContent = link.text;
  return aTag;
});

topMenuEl.append(...links);
