/* Banner de cookies + Consent Mode v2 (mesmo comportamento da LP UPFY).
   O padrão "denied" e a leitura do aceite salvo ficam no <head>, antes do GTM. */
(function () {
  var KEY = 'upfy_consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }

  var css = '.ck-banner{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:80;width:min(680px,calc(100% - 32px));display:flex;align-items:center;gap:12px 16px;flex-wrap:wrap;padding:14px 14px 14px 20px;border-radius:22px;background:rgba(255,255,255,.82);-webkit-backdrop-filter:blur(28px) saturate(180%);backdrop-filter:blur(28px) saturate(180%);border:1px solid rgba(255,255,255,.9);box-shadow:inset 0 1px 0 #fff,0 30px 60px -30px rgba(16,16,70,.45);font:500 14px/1.45 -apple-system,BlinkMacSystemFont,"SF Pro Text","Geist","Instrument Sans",system-ui,sans-serif;color:#1D1D1F}'
    + '.ck-banner p{flex:1 1 260px;margin:0}.ck-banner a{color:#0006FF}'
    + '.ck-banner .ck-b{display:flex;gap:8px;margin-left:auto}'
    + '.ck-banner button{min-height:44px;padding:0 18px;border-radius:999px;border:0;font-family:inherit;font-weight:600;font-size:14px;line-height:1;cursor:pointer}'
    + '.ck-banner .ck-no{background:rgba(118,118,128,.12);color:#1D1D1F}'
    + '.ck-banner .ck-yes{color:#fff;background:linear-gradient(180deg,#3B40FF 0%,#0006FF 55%,#0005E0 100%)}'
    + '@media (max-width:640px){.ck-banner{font-size:12px;padding:10px 10px 10px 14px}.ck-banner button{min-height:34px;font-size:12px;padding:0 14px}}';

  var el;
  function close() { if (el) { el.remove(); el = null; } }
  function choose(v) {
    set(v);
    if (v === 'granted') {
      gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
      window.dataLayer.push({ event: 'consent_granted' });
    } else {
      gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
    }
    close();
  }
  function open() {
    if (el) return;
    if (!document.getElementById('ck-style')) {
      var s = document.createElement('style'); s.id = 'ck-style'; s.textContent = css; document.head.appendChild(s);
    }
    el = document.createElement('div');
    el.className = 'ck-banner'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Cookies');
    el.innerHTML = '<p>Usamos cookies para medir o acesso e melhorar nossos anúncios. <a href="https://lp.upfy.net.br/privacidade" target="_blank" rel="noopener">Política de Privacidade</a></p>'
      + '<div class="ck-b"><button type="button" class="ck-no">Recusar</button><button type="button" class="ck-yes">Aceitar</button></div>';
    el.querySelector('.ck-no').onclick = function () { choose('denied'); };
    el.querySelector('.ck-yes').onclick = function () { choose('granted'); };
    document.body.appendChild(el);
  }
  window.upfyCookiePrefs = open;
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-cookie-prefs]');
    if (t) { e.preventDefault(); open(); }
  });
  if (!get()) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', open); else open();
  }
})();
