
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.en.970e3f8792361abdb6ff.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2115.baseline.en.b8124a0bdac53fbdfe63.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2422.baseline.en.726c53be23c0d07b789d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.baseline.en.a4d5b8ce55e0f25b6ec1.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.94433389212538cda678.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.baseline.en.7ec3164fc01d10bbabc6.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5019.baseline.en.723e311f4a05eaa581cf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/235.baseline.en.cc824a8cccdfe3bda9ad.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.baseline.en.4108502d9f2c1ca7f6c3.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4143.baseline.en.2e2d663dfd0af9c78f7d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/9962.baseline.en.3bf7091438aa3237ab29.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/3395.baseline.en.6bebcf5d55a9a738560c.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2594.baseline.en.bd12189515db74facbbf.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5449.baseline.en.3a519f1ef58d0e8c891c.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.baseline.en.51a37bc9f3fe7e46ff2c.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/2115.baseline.en.01168f2adbe1d5a266a9.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.cd97aa36693bd9e67b06.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.baseline.en.cb164c3255e5d577ddea.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0104/6917/9492/files/logo_x320.png?v=1620470788"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  