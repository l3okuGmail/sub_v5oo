export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const TARGET_DOMAIN = 'subb.v5oo.eu.org'; // 目标主域名
    
    // 匹配需要代理的域名列表
    const PROXY_DOMAINS = [
      'subv5oo2-em4aivtn.b4a.run',
      'subv6oo-9qniz657.b4a.run'
    ];

    if (PROXY_DOMAINS.includes(url.hostname)) {
      // 克隆原始请求的 headers 并设置正确的 Host
      const newHeaders = new Headers(request.headers);
      newHeaders.set('Host', TARGET_DOMAIN); // 关键：让目标服务器认为是直接访问它
      
      // 构建新 URL（仅修改域名）
      const targetUrl = new URL(url.toString());
      targetUrl.hostname = TARGET_DOMAIN;

      // 创建新请求（保留所有原始信息）
      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: 'manual' // 手动处理重定向
      });

      // 发送请求并处理响应
      const response = await fetch(newRequest);

      // 修正重定向中的 Location 头
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('Location');
        if (location) {
          // 将重定向目标域名替换回原始代理域名
          const fixedLocation = location.replace(TARGET_DOMAIN, url.hostname);
          return Response.redirect(fixedLocation, response.status);
        }
      }

      // 直接返回其他响应
      return response;
    }

    // 非代理域名请求，返回静态资源
    return env.ASSETS.fetch(request);
  }
};
