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

    if (country === 'PH') {
      document.getElementById('menu-ph').style.display = 'block';
      document.getElementById('PH').style.display = 'inline-block';
      document.getElementById('badge1').style.display = 'block';

    } else if (country === 'JP') {
      document.getElementById('menu-jp').style.display = 'block';
      document.getElementById('JP').style.display = 'inline-block';
      document.getElementById('badge2').style.display = 'block';

    } else if (country === 'CA') {
      document.getElementById('menu-ca').style.display = 'block';
      document.getElementById('CA').style.display = 'inline-block';
      document.getElementById('badge3').style.display = 'block';

    } else {
      document.getElementById('menu-na').style.display = 'block';
      document.getElementById('NA').style.display = 'inline-block';
      document.getElementById('badge4').style.display = 'block';
    }
  });
});
</script>