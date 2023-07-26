import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostTable from "../components/PostTable";
import DepartmentComponent from "../components/Departments";

interface SecondPageProps {
  submitted: boolean;
}

const SecondPage: React.FC<SecondPageProps> = ({ submitted }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!submitted) {
      navigate("/");
    }
  }, [submitted, navigate]);

  if (!submitted) {
    return null;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PostTable />
      <DepartmentComponent />
    </div>
  );
};

export default SecondPage;
