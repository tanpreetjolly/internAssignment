import { TextField, Button } from "@mui/material";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS styles

interface User {
  name: string;
  email: string;
  mobile: number | null;
}

interface FirstProps {
  setSubmitted: (submitted: boolean) => void;
}

const First = ({ setSubmitted }: FirstProps) => {
  const navigate = useNavigate();

  const [details, setDetails] = useState<User>({
    name: "",
    email: "",
    mobile: null,
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (details.name && details.email && details.mobile) {
      localStorage.setItem("userDetails", JSON.stringify(details));
      navigate("/second");
      setSubmitted(true);
    } else {
      // Display the toast notification
      toast.error("Enter Complete details");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          value={details.name || ""}
          name="name"
          label="Name"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          value={details.mobile || ""}
          name="mobile"
          label="Mobile No."
          variant="outlined"
          type="number"
          onChange={handleChange}
        />
        <TextField
          value={details.email || ""}
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleChange}
        />
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default First;
