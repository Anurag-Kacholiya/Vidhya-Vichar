import axios from "axios";

export const userCreation = async (name, email, password, role, department) => {
  return await axios.post("http://localhost:3000/auth/register", {
    name,
    email,
    password,
    role,
    department
  });
};

export const userLogin = async (email, password) => {
  return await axios.post("http://localhost:3000/auth/login", {
    email,
    password,
  });
};