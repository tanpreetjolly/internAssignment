import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import data from "../data/data.json";

interface DepartmentData {
  department: string;
  sub_departments: string[];
}

interface Props {
  data: DepartmentData[];
}

const DepartmentCheckboxList: React.FC<Props> = () => {
  const [selected, setSelected] = useState<{
    [key: string]: boolean | "indeterminate";
  }>({});

  const handleDepartmentSelect = (department: string) => {
    const newSelected = { ...selected };
    const isDepartmentSelected =
      selected[department] === "indeterminate" || selected[department] === true;

    newSelected[department] = !isDepartmentSelected;
    data
      .find((d) => d.department === department)!
      .sub_departments.forEach((subDept) => {
        newSelected[subDept] = !isDepartmentSelected;
      });

    setSelected(newSelected);
  };

  const handleSubDepartmentSelect = (subDept: string) => {
    const parentDept = data.find((dept) =>
      dept.sub_departments.includes(subDept)
    )!.department;
    const subDepartments = data.find(
      (dept) => dept.department === parentDept
    )!.sub_departments;
    const newSelected = { ...selected };
    const isSubDeptSelected = selected[subDept] === true;

    newSelected[subDept] = !isSubDeptSelected;
    if (!isSubDeptSelected && subDepartments.every((sub) => newSelected[sub])) {
      newSelected[parentDept] = true;
    } else if (
      isSubDeptSelected &&
      subDepartments.every((sub) => !newSelected[sub])
    ) {
      newSelected[parentDept] = false;
    }

    setSelected(newSelected);
  };

  return (
    <FormGroup>
      {data.map((department) => (
        <Box
          key={department.department}
          style={{
            display: "flex",
            flexDirection: "column",
            background: "lightgray",
            padding: "5px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={selected[department.department] === true}
                indeterminate={
                  selected[department.department] === "indeterminate"
                }
                onChange={() => handleDepartmentSelect(department.department)}
              />
            }
            label={department.department}
          />
          {department.sub_departments.map((subDept) => (
            <FormControlLabel
              key={subDept}
              sx={{ marginLeft: 5 }}
              control={
                <Checkbox
                  checked={selected[subDept] || false}
                  onChange={() => handleSubDepartmentSelect(subDept)}
                />
              }
              label={subDept}
            />
          ))}
        </Box>
      ))}
    </FormGroup>
  );
};

export default DepartmentCheckboxList;
