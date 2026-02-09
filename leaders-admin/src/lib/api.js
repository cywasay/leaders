const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://leaders-backend.test/api";

export const apiRequest = async (endpoint, options = {}) => {
  const { method = "GET", body, headers = {}, ...customOptions } = options;

  // Get token from cookie (we'll implement this later in the client)
  let token = "";
  if (typeof document !== "undefined") {
    const name = "auth_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        token = c.substring(name.length, c.length);
      }
    }
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customOptions,
  };

  // For FormData, we let the browser set the Content-Type with the boundary
  if (isFormData) {
    delete config.headers["Content-Type"];
    config.body = body;
  } else if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Handle 401 Unauthorized globally if needed
    if (response.status === 401 && typeof window !== "undefined") {
      // Optional: clear cookie and redirect to login
    }

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const textData = await response.text();
      data = { message: textData || "Empty response from server" };
    }

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    const errorString =
      error instanceof Error ? error.stack : JSON.stringify(error, null, 2);
    console.error(`API Request Error [${method} ${endpoint}]:`, errorString);
    throw error;
  }
};
