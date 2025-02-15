export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // 判断请求的域名是subv5oo2-em4aivtn.b4a.run 或者subv6oo-9qniz657.b4a.run
    if (url.hostname === 'subv5oo2-em4aivtn.b4a.run' || url.hostname === 'subv6oo-9qniz657.b4a.run') {
      // 如果是这两个域名中的任意一个，修改请求的目标地址为subb.v5oo.eu.org
      url.hostname = 'subb.v5oo.eu.org';
      let new_request = new Request(url, request);
      return fetch(new_request);
    }

    // 如果请求的不是上述两个域名，返回静态资源
    return env.ASSETS.fetch(request);
  },
};
