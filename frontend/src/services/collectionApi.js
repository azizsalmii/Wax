import axios from "axios";

const API_BASE = "http://localhost:5000/api/collections";

// GET all
export const getCollections = () => axios.get(API_BASE);

// GET by id
export const getCollectionById = (id) => axios.get(`${API_BASE}/${id}`);

// CREATE (avec image)
export const createCollection = (formData) =>
  axios.post(API_BASE, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// UPDATE (avec image optionnelle)
export const updateCollection = (id, formData) =>
  axios.put(`${API_BASE}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// DELETE
export const deleteCollection = (id) => axios.delete(`${API_BASE}/${id}`);
