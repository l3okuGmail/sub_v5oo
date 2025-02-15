export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // 根据请求的域名决定转发的目标
    if (url.hostname === 'subv5oo2-em4aivtn.b4a.run' || url.hostname === 'subv6oo-9qniz657.b4a.run') {
      // 转发到subb.v5oo.eu.org
      url.hostname = 'subb.v5oo.eu.org';  // 确保只有一个目标域名
      let new_request = new Request(url, request);
      return fetch(new_request);
    }

    // 如果不是这两个域名，返回静态资源
    return env.ASSETS.fetch(request);
  },
};
