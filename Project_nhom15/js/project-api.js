/* Real HTTP to the local mock. No fallback that pretends a failed save succeeded. */
window.ProjectAPI = (() => {
  class APIError extends Error {
    constructor(message, status = 0, code = 'NETWORK_ERROR') {
      super(message);
      this.status = status;
      this.code = code;
    }
  }
  async function request(method, id, data, revision, options = {}) {
    const url = new URL('/api/projects' + (id ? '/' + encodeURIComponent(id) : ''), location.href);
    if (options.delay) url.searchParams.set('delay', options.delay);
    if (options.fail) url.searchParams.set('fail', '1');
    const headers = { Accept: 'application/json' };
    if (data !== undefined) headers['Content-Type'] = 'application/json';
    if (revision !== undefined) headers['If-Match'] = '"' + revision + '"';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const started = performance.now();
    const record = { method, path: url.pathname + url.search, request: data ?? null, status: 0 };
    try {
      const response = await fetch(url, { method, headers, signal: controller.signal, cache: 'no-store', body: data === undefined ? undefined : JSON.stringify(data) });
      record.status = response.status;
      record.requestId = response.headers.get('X-Request-Id');
      if (response.status !== 204 && !response.headers.get('Content-Type')?.includes('application/json')) {
        throw new APIError('Máy chủ hiện tại không có mock API. Hãy chạy python server.py 8000 --open thay cho Live Server.', response.status, 'API_UNAVAILABLE');
      }
      const result = response.status === 204 ? null : await response.json();
      record.response = result;
      if (!response.ok) throw new APIError(result.error?.message || 'API chưa thực hiện được yêu cầu.', response.status, result.error?.code);
      return result;
    } catch (error) {
      const failure = error instanceof APIError ? error : new APIError(error.name === 'AbortError'
        ? 'API phản hồi quá lâu. Tải lại danh sách để kiểm tra trước khi gửi lại yêu cầu tạo dự án.'
        : 'Không kết nối được API. Kiểm tra cửa sổ chạy server.py rồi tải lại danh sách.');
      record.error = failure.message;
      throw failure;
    } finally {
      clearTimeout(timer);
      record.duration = Math.round(performance.now() - started);
      window.dispatchEvent(new CustomEvent('project-api:request', { detail: record }));
    }
  }
  return {
    APIError,
    list: (options) => request('GET', null, undefined, undefined, options),
    get: (id, options) => request('GET', id, undefined, undefined, options),
    create: (data, options) => request('POST', null, data, undefined, options),
    update: (id, data, revision, options) => request('PATCH', id, data, revision, options),
    remove: (id, revision, options) => request('DELETE', id, undefined, revision, options),
  };
})();
