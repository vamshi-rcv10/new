import axios from "axios";

// helper function to attach JWT from localStorage
const authHeader = () => {
  const token = localStorage.getItem("token"); // or get from Redux/store
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/create", order, authHeader());
    return data;
  } catch (error) {
    console.error("Create order error:", error.response?.data || error.message);
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get(
      "/api/orders/newOrderForCurrentUser",
      authHeader()
    );
    return data;
  } catch (error) {
    console.error(
      "Get new order error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put(
      "/api/orders/pay",
      { paymentId },
      authHeader()
    );
    return data;
  } catch (error) {
    console.error("Pay order error:", error.response?.data || error.message);
    throw error;
  }
};

export const trackOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(
      `/api/orders/track/${orderId}`,
      authHeader()
    );
    return data;
  } catch (error) {
    console.error(
      "Track order error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAll = async (state) => {
  try {
    const { data } = await axios.get(
      `/api/orders/${state ?? ""}`,
      authHeader()
    );
    return data;
  } catch (error) {
    console.error("Get all orders error:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllStatus = async () => {
  try {
    const { data } = await axios.get(`/api/orders/allstatus`, authHeader());
    return data;
  } catch (error) {
    console.error(
      "Get all statuses error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
