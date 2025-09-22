<script>
function getCountryLive({ ipInfoToken = '', timeoutMs = 4000, fallback = 'US' } = {}) {
  // 1) Shopify server-side country (instant)
  if (window.SHOPIFY_COUNTRY) {
    return Promise.resolve(window.SHOPIFY_COUNTRY.toUpperCase());
  }

  // 2) fallback to ipinfo.io
  const ipInfoUrl = ipInfoToken
    ? `https://ipinfo.io/json?token=${encodeURIComponent(ipInfoToken)}`
    : `https://ipinfo.io/json`;

  function fetchWithTimeout(url, opts = {}) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), timeoutMs);
      fetch(url, opts).then(res => {
        clearTimeout(timer);
        resolve(res);
      }).catch(err => {
        clearTimeout(timer);
        reject(err);
      });
    });
  }

  return fetchWithTimeout(ipInfoUrl, { credentials: 'omit' })
    .then(res => {
      if (!res.ok) throw new Error('geo failed ' + res.status);
      return res.json();
    })
    .then(data => (data && data.country) ? data.country.toUpperCase() : fallback)
    .catch(() => fallback);
}

// Run after DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  getCountryLive({ ipInfoToken: 'b53e036b187230' }).then(country => {
    console.log('Live country:', country);

    // helper
    function show(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = 'block';
    }

    if (country === 'PH') {
      show('menu-ph');
      show('menu-ph-mobile');

    } else if (country === 'JP') {
      show('menu-jp');
      show('menu-jp-mobile');

    } else if (country === 'CA') {
      show('menu-ca');
      show('menu-ca-mobile');

    } else {
      show('menu-na');
      show('menu-na-mobile');
    }
  });
});
</script>
