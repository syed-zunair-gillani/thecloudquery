import axios from 'axios';

// Base URL for your WordPress site
const API_BASE_URL = "https://staging.thecloudquery.com/wp-json";
const WP_USERNAME = "danira";
const WP_PASSWORD = "danira-digital2430";

let jwtToken = null;
let tokenExpiry = null; // track expiry if available

// Step 1: Authenticate and get a JWT token
export const getJWTToken = async () => {
  // Basic token cache with simple expiration (assuming 1-hour expiry from server)
  const now = Date.now();
  if (jwtToken && tokenExpiry && now < tokenExpiry) return jwtToken;

  try {
    const response = await axios.post(`${API_BASE_URL}/jwt-auth/v1/token`, {
      username: WP_USERNAME,
      password: WP_PASSWORD,
    });

    jwtToken = response.data.token;

    // Estimate token expiry (adjust if your server provides exact timestamp)
    tokenExpiry = now + 60 * 60 * 1000; // 1 hour

    return jwtToken;
  } catch (error) {
    console.error("Failed to retrieve JWT token:", error.response?.data || error.message);
    throw error;
  }
};

// Step 2: Create an axios instance with the JWT token in Authorization header
const getAxiosInstance = async () => {
  const token = await getJWTToken();

  return axios.create({
    baseURL: `${API_BASE_URL}/wp/v2`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Step 3: Fetch all pages with limited fields
export const fetchPages = async ({ perPage = 10, page = 1 } = {}) => {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get(`/pages`, {
      params: {
        per_page: perPage,
        page,
        _fields: 'id,title,slug,content',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pages:', error.response?.data || error.message);
    throw error;
  }
};

// Step 4: Fetch a single page by slug, limited fields
export const fetchPageBySlug = async (slug) => {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get(`/pages`, {
      params: {
        slug,
        _fields: 'id,title,slug,content',
      },
    });
    return response.data[0]; // usually one result
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error.response?.data || error.message);
    throw error;
  }
};

// Step 5: Fetch all posts, paginated and limited fields
export const fetchPosts = async ({ perPage = 10, page = 1 } = {}) => {
  try {
    const axiosInstance = await getAxiosInstance();
    const response = await axiosInstance.get(`/posts`, {
      params: {
        per_page: perPage,
        page,
        _fields: 'id,title,excerpt,slug,featured_media',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error.response?.data || error.message);
    throw error;
  }
};

// Optional: Fetch multiple resources in parallel
export const fetchPageAndPosts = async (slug, postLimit = 5) => {
  try {
    const [page, posts] = await Promise.all([
      fetchPageBySlug(slug),
      fetchPosts({ perPage: postLimit }),
    ]);

    return { page, posts };
  } catch (err) {
    console.error("Error fetching page and posts in parallel:", err);
    throw err;
  }
};
