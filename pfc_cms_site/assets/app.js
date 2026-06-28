const state = { site:null, pages:null };
const bySlug = slug => state.pages.find(p => (p.slug || '') === slug);
const routeSlug = () => location.pathname.replace(/^\//,'').replace(/\/$/,'');
function escapeHtml(s=''){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function nl2br(s=''){return escapeHtml(s).replace(/\n/g,'<br>');}
async function init(){
  const [site,pages] = await Promise.all([fetch('/content/site.json').then(r=>r.json()), fetch('/content/pages.json').then(r=>r.json())]);
  state.site=site; state.pages=pages;
  document.title=site.siteTitle;
  document.getElementById('site-logo').src=site.logo;
  document.getElementById('portal-button').href=site.memberPortalUrl;
  document.querySelector('.footer-main').style.backgroundImage=`url('${site.footerImage}')`;
  document.getElementById('footer-message').textContent=site.footerMessage;
  document.getElementById('footer-legal').textContent=`© 2026 ${site.siteTitle}. All Rights Reserved. ${site.ein}`;
  renderNav(); renderPage();
  window.addEventListener('popstate',renderPage);
  document.querySelector('.mobile-toggle').addEventListener('click',e=>{const nav=document.getElementById('main-nav'); nav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));});
}
function renderNav(){
  const nav=document.getElementById('main-nav');
  nav.innerHTML=state.pages.filter(p=>p.showInNav).map(p=>`<a href="/${p.slug}/" data-link>${escapeHtml(p.navTitle||p.title)}</a>`).join('');
  nav.querySelectorAll('[data-link]').forEach(a=>a.addEventListener('click',go));
}
function go(e){ if(e.currentTarget.origin===location.origin){e.preventDefault(); history.pushState(null,'',e.currentTarget.pathname); renderPage(); document.getElementById('main-nav').classList.remove('open'); window.scrollTo(0,0);} }
function renderPage(){
  const page = bySlug(routeSlug()) || bySlug('') || state.pages[0];
  document.title = `${page.title} | ${state.site.siteTitle}`;
  const main=document.getElementById('main');
  const sections = (page.sections||[]).map(s=>`<section class="section"><div class="section-inner lead"><h2>${escapeHtml(s.heading)}</h2><p>${nl2br(s.text)}</p></div></section>`).join('');
  const cards = (page.cards&&page.cards.length)?`<section class="section"><div class="cards">${page.cards.map(c=>`<article class="card"><h3>${escapeHtml(c.title)}</h3><p>${escapeHtml(c.text)}</p><a href="${c.url}" ${c.url.startsWith('http')?'target="_blank" rel="noopener"':'data-link'}>Learn more →</a></article>`).join('')}</div></section>`:'';
  main.innerHTML=`
    <section class="hero" style="background-image:url('${page.heroImage}')"><div class="hero-content"><h1>${escapeHtml(page.heroTitle)}</h1><p>${escapeHtml(page.heroSubtitle)}</p>${page.buttonText?`<a class="button" href="${page.buttonUrl}" ${page.buttonUrl.startsWith('http')?'target="_blank" rel="noopener"':'data-link'}>${escapeHtml(page.buttonText)}</a>`:''}</div></section>
    ${sections}${cards}
    <section class="mockup-section"><div class="mockup-wrap"><img src="${page.heroImage}" alt="${escapeHtml(page.title)} reference image"><div class="mockup-note">Editable placeholder/reference image. Replace this photo in the admin panel.</div></div></section>`;
  main.querySelectorAll('[data-link]').forEach(a=>a.addEventListener('click',go));
}
init().catch(err=>{document.getElementById('main').innerHTML='<section class="section"><h1>Website loading issue</h1><p>Please check content files.</p></section>'; console.error(err);});
