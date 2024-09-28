import React, { createContext, useState, useEffect, useContext } from "react";
import { fetchPlans } from "../services/planService";

interface Plan {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
  created_at: string;
  updated_at: string;
}

interface PlanContextType {
  plans: Plan[];
  loading: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPlans = async () => {
      const data = await fetchPlans();
      setPlans(data);
      setLoading(false);
    };
    loadPlans();
  }, []);

  return (
    <PlanContext.Provider value={{ plans, loading }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlans = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlans must be used within a PlanProvider");
  }
  return context;
};
