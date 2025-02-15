export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // 判断请求的域名是subv5oo2-em4aivtn.b4a.run 或者subv6oo-9qniz657.b4a.run
    if (url.hostname === 'subv5oo2-em4aivtn.b4a.run' || url.hostname === 'subv6oo-9qniz657.b4a.run') {
      // 保留原路径，只修改hostname
      url.hostname = 'subb.v5oo.eu.org';  // 只修改域名部分，不影响路径

      let new_request = new Request(url, request);
      return fetch(new_request);
    }

    // 其他请求，返回静态资源
    return env.ASSETS.fetch(request);
  },
};
