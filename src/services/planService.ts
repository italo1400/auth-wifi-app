import { apiFetch } from "../config/api";

export const fetchPlans = async () => {
  return apiFetch({ path: "/plans" });
};
