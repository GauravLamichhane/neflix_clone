const API_BASE_URL = "http://localhost:8000/api";

// Authentication Functions
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    const data = await response.json();
    // Store tokens
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    return data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password, first_name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        password2: password,
        first_name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMsg = Object.values(error).flat().join(", ");
      throw new Error(errorMsg || "Registration failed");
    }

    const data = await response.json();
    // Store tokens
    localStorage.setItem("access_token", data.tokens.access);
    localStorage.setItem("refresh_token", data.tokens.refresh);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Content CRUD Functions
export const getContent = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/content/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createContent = async (formData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/content/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMsg = Object.values(error).flat().join(", ");
      throw new Error(errorMsg || "Failed to create content");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (id, formData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/content/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      const errorMsg = Object.values(error).flat().join(", ");
      throw new Error(errorMsg || "Failed to update content");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (id) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/content/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete content");
    }

    return true;
  } catch (error) {
    throw error;
  }
};
