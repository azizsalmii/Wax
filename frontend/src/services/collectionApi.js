import axios from "axios";
import { API_ORIGIN } from "../services/apiOrigin";


const API_BASE = `${API_ORIGIN}/api/collections`;

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
