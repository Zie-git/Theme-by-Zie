<script>
function getCountryLive({ ipInfoToken = '', timeoutMs = 4000, fallback = 'US' } = {}) {
  // 1) Shopify server-side country (instant, no API needed)
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
      fetch(url, opts)
        .then(res => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(err => {
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

document.addEventListener('DOMContentLoaded', function () {
  getCountryLive({ ipInfoToken: 'b53e036b187230' }).then(country => {
    console.log('Live country:', country);

    // Define rules
    const countryMap = {
      'PH': { menus: ['menu-ph', 'menu-ph-mobile'], badges: ['PH', 'badge1'] },
      'JP': { menus: ['menu-jp', 'menu-jp-mobile'], badges: ['JP', 'badge2'] },
      'CA': { menus: ['menu-ca', 'menu-ca-mobile'], badges: ['CA', 'badge3'] },
      'US': { menus: ['menu-na', 'menu-na-mobile'], badges: ['NA', 'badge4'] }
    };

    // Default fallback if not matched
    const config = countryMap[country] || countryMap['US'];

    // Show menus
    if (config.menus) {
      config.menus.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block !important';
      });
    }

    // Show badges
    if (config.badges) {
      config.badges.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'inline-block !important';
      });
    }
  });
});
</script>

