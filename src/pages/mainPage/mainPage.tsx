import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import useSWR from "swr";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../api/fetch";

const MainPage = () => {
  interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    active: boolean;
    lastLogin: Date;
  }

  const navigate = useNavigate();

  const fetcher = async (url: string, args?: RequestInit) => {
    const response = await fetchWithAuth(url, args);

    if (!response.ok) {
      navigate("/login");
      throw new Error(await response.text());
    }

    return response.json();
  };

  const { data, mutate } = useSWR<IUser[]>(["/users"], ([url]) => fetcher(url));

  const profile = useSWR(["/users/profile"], ([url]) => fetcher(url));

  const ref = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "active", headerName: "Account status" },
    { field: "lastLogin", headerName: "Last login" },
  ];

  async function sendRowData(url: string, options: object) {
    const rows = Object.fromEntries(ref.current.getSelectedRows().entries());

    await fetchWithAuth(url, {
      body: JSON.stringify(Object.keys(rows).map((item) => +item)),
      headers: {
        "Content-type": "application/json",
      },
      ...options,
    });
    mutate();
    ref.current.setRowSelectionModel([]);
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <Stack direction="row-reverse" gap={3} sx={{ margin: 1 }}>
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={() => logOut()}
        >
          Log out
        </Button>
        <Typography
          variant="body1"
          sx={{ display: "flex", alignItems: "center" }}
        >
          You are logged in as {profile.data?.email}
        </Typography>
      </Stack>
      <Container>
        <Stack direction="row" spacing={1} margin={1}>
          <Button
            variant="contained"
            startIcon={<LockIcon />}
            onClick={() =>
              sendRowData("/users/deactivate", {
                method: "PATCH",
              })
            }
          >
            Block
          </Button>
          <Button
            variant="contained"
            startIcon={<LockOpenIcon />}
            onClick={() =>
              sendRowData("/users/activate", {
                method: "PATCH",
              })
            }
          >
            Unblock
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() =>
              sendRowData("/users", {
                method: "DELETE",
              })
            }
          >
            Delete
          </Button>
        </Stack>
        {data && (
          <DataGrid
            apiRef={ref}
            autosizeOnMount
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
