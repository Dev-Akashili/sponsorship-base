interface RequestOptions {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
    identity?: boolean;
  }
  
  const apiUrl = import.meta.env.VITE_API_LOCAL_URL;
  
  export const request = async <T>(url: string, options: RequestOptions = {}) => {
    const response = await fetch(
      options.identity ? `${apiUrl}/${url}` : `${apiUrl}/api/v1/${url}`,
      {
        method: options.method,
        headers: options.headers,
        body: options.body,
        credentials: "include",
      }
    );
  
    if (response.status === 204) {
      return {} as T;
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isJson = (response: any) => {
      try {
        JSON.parse(response);
      } catch (e) {
        console.error(e)
        return false;
      }
      return true;
    };
  
    if (isJson(response)) {
      return response.json();
    }
  
    return response;
  };
  