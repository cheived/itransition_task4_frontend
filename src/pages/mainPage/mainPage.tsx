import { Container } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { FC } from "react";
import useSWR from "swr";

const MainPage = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    [
      "http://localhost:3000/users",
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoic3RyaW5nQGdnLmdnZyIsImlhdCI6MTcyNjY3NDY0OSwiZXhwIjoxNzI5MjY2NjQ5fQ.Cv4trjgC4mV6GfKpVyhBi0Ck7daBSFGw5wYt4UGU6ys",
        },
      },
    ],
    ([url, token]) => fetcher(url, token)
  );
  console.log(data);

  const ref = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "active", headerName: "Account status" },
  ];

  // setTimeout(() => {
  //   console.log(ref.current.getSelectedRows());
  // }, 3000);
  return (
    <>
      <Container>
        <DataGrid
          apiRef={ref}
          columns={columns}
          rows={data?.map((item) => ({
            ...item,
            status: item.status ? "Active" : "Disabled",
          }))}
          checkboxSelection
          onCellClick={() => console.log(ref.current.getSelectedRows())}
        />
      </Container>
    </>
  );
};

export default MainPage;
