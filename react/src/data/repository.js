import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  try {
    const response = await axios.post(`${API_HOST}/api/users/login`, { email, password });
    const user = response.data;

    // NOTE: In this example, the login is also persistent as it is stored in local storage.
    if (user !== null) setUser(user);

    return user;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}

async function findUser(id) {
  try {
    const response = await axios.get(`${API_HOST}/api/users/select/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

async function createUser(user) {
  try {
    const response = await axios.post(`${API_HOST}/api/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function editUser(email, name) {
  try {
    const response = await axios.put(`${API_HOST}/api/users/update/${email}`, { name });
    return response.data;
  } catch (error) {
    console.error('Error editing user:', error);
    throw error;
  }
}

async function deleteUser(email) {
  try {
    const response = await axios.delete(`${API_HOST}/api/users/delete/${email}`);
    
    // If the user delete operation was successful, you might want to clear any local data.
    if(response.data && response.data.message === "User and associated reviews deleted successfully.") {
        removeUser();
        // You can add any other clean-up logic here.
    }
    
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


// --- Review ---------------------------------------------------------------------------------------

async function getReviews() {
  const response = await axios.get(API_HOST + "/api/review");
  return response.data;
}

async function createReview(review) {
  const response = await axios.post(API_HOST + "/api/review", review);
  return response.data;
}

async function editReview(reviewId, review) {
  try {
    const response = await axios.put(`${API_HOST}/api/review/${reviewId}`, review);
    return response.data;
  } catch (error) {
    console.error('Error editing review:', error);
    throw error;
  }
}

async function deleteReview(reviewId) {
  try {
    const response = await axios.delete(`${API_HOST}/api/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

// --- Reservation ----------------------------------------------------------------------------------

async function getReservations() {
  const response = await axios.get(API_HOST + "/api/reservation");
  return response.data;
}

async function createReservation(reservation) {
  const response = await axios.post(API_HOST + "/api/reservation", reservation);
  return response.data;
}

async function editReservation(reservationId, reservation) {
  try {
    const response = await axios.put(`${API_HOST}/api/reservation/${reservationId}`, reservation);
    return response.data;
  } catch (error) {
    console.error('Error editing reservation:', error);
    throw error;
  }
}

async function deleteReservation(reservationId) {
  try {
    const response = await axios.delete(`${API_HOST}/api/reservation/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error);
    throw error;
  }
}



// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  API_HOST,
  verifyUser,
  findUser,
  createUser,
  editUser,
  deleteUser,
  getReviews,
  createReview,
  editReview,
  deleteReview,
  getReservations,
  createReservation,
  editReservation,
  deleteReservation,
  getUser,
  removeUser
};