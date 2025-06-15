import config from "../config";
import { toast } from "react-toastify";

/**
 * Handles API response and error formatting
 * @param {Response} response - Fetch API response object
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} If response is not OK
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Gets default headers with auth token if available
 * @returns {Object} Headers configuration
 */
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Handles API errors consistently
 * @param {Error} error - The error object
 * @param {string} defaultMessage - Default error message
 */
const handleError = (error, defaultMessage) => {
  console.error("API Error:", error);

  let message = defaultMessage;
  if (error.message) {
    message = error.message;
  } else if (error.data?.message) {
    message = error.data.message;
  }

  toast.error(message);
  throw error;
};

/**
 * API Service with all CRUD operations
 */
const api = {
  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} [queryParams] - Optional query parameters
   * @returns {Promise<any>} Response data
   */
  get: async (endpoint, queryParams = null) => {
    try {
      let url = `${config.apiBaseUrl}${endpoint}`;
      
      if (queryParams) {
        const params = new URLSearchParams(queryParams);
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to fetch data");
    }
  },

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<any>} Response data
   */
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to save data");
    }
  },

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<any>} Response data
   */
  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to update data");
    }
  },

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @returns {Promise<any>} Response data
   */
  patch: async (endpoint, data) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(data),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to partially update data");
    }
  },

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @returns {Promise<any>} Response data
   */
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to delete data");
    }
  },

  /**
   * File upload request
   * @param {string} endpoint - API endpoint
   * @param {File} file - File to upload
   * @param {Object} [additionalData] - Additional form data
   * @returns {Promise<any>} Response data
   */
  upload: async (endpoint, file, additionalData = {}) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      for (const key in additionalData) {
        formData.append(key, additionalData[key]);
      }

      const headers = {};
      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
        method: "POST",
        headers,
        body: formData,
      });

      return await handleResponse(response);
    } catch (error) {
      return handleError(error, "Failed to upload file");
    }
  },
};

export default api;