export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (['subv5oo2-em4aivtn.b4a.run', 'subv6oo-9qniz657.b4a.run'].includes(url.hostname)) {
      url.hostname = 'subb.v5oo.eu.org';
      
      // 保留原始 Host 头
      const newHeaders = new Headers(request.headers);
      newHeaders.set('Host', request.headers.get('Host'));
      
      const newRequest = new Request(url, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: 'follow'
      });
      
      // 处理重定向中的 Location 头
      const response = await fetch(newRequest);
      if ([301, 302, 307, 308].includes(response.status)) {
        const location = response.headers.get('Location')?.replace('subb.v5oo.eu.org', url.hostname);
        const modifiedResponse = new Response(response.body, response);
        if (location) modifiedResponse.headers.set('Location', location);
        return modifiedResponse;
      }
      
      return response;
    }
    
    return env.ASSETS.fetch(request);
  }
};
