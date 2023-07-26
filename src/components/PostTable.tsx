import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface dataType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "body", headerName: "Body", width: 500 },
  { field: "userId", headerName: "User ID", width: 150 },
];

const PostTable: React.FC = () => {
  const [posts, setPosts] = useState<dataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid rows={posts} columns={columns} checkboxSelection />
    </div>
  );
};

export default PostTable;
