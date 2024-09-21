import { Button, Container, Stack } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { FC } from "react";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const fetcher = async (...args) => {
    const response = await fetch(...args);

    if (!response.ok) {
      navigate("/login");
      throw new Error(await response.text());
    }

    return response.json();
  };
  const { data, error, isLoading } = useSWR(
    [
      "http://localhost:3000/users",
      {
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
      },
    ],
    ([url, token]) => fetcher(url, token)
  );

  const ref = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "active", headerName: "Account status" },
  ];

  async function deleteMany() {
    const rows = Object.fromEntries(ref.current.getSelectedRows().entries());
    console.log(Object.keys(rows).map((item) => +item));

    await fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify(Object.keys(rows).map((item) => +item)),
    });
  }

  async function changeStatus(status: boolean) {
    const rows = Object.fromEntries(ref.current.getSelectedRows().entries());
    console.log(Object.keys(rows).map((item) => +item));

    await fetch("http://localhost:3000/users", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
      body: JSON.stringify({
        ids: Object.keys(rows).map((item) => +item),
        status,
      }),
    });
  }

  return (
    <>
      <Container>
        <Stack direction="row" spacing={1} margin={1}>
          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={() => changeStatus(false)}
          >
            Block
          </Button>
          <Button
            variant="contained"
            startIcon={<LockOpenIcon />}
            onClick={() => changeStatus(true)}
          >
            Unblock
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => deleteMany()}
          >
            Delete
          </Button>
        </Stack>
        {data && (
          <DataGrid
            apiRef={ref}
            columns={columns}
            rows={data.map((item) => ({
              ...item,
              active: item.active ? "Active" : "Disabled",
            }))}
            checkboxSelection
          />
        )}
      </Container>
    </>
  );
};

export default MainPage;
