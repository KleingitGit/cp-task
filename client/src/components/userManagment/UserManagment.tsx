import { useEffect, useState } from "react";
import PaginatedList from "../paginatedList/paginatedList";
import { Box, Fab, Pagination } from "@mui/material";
import UserForm from "../userForm/UserForm";
import type { user } from "../../types/users";
import { createUser, deleteUser, fetchUsers } from "../../queries/users";

const UserManagment = () => {
  const [selectedUser, setSelectedUser] = useState<user | null>(null);
  const [shouldCreateUser, setShouldCreateUser] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<user[] | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    onFetchUsers();
  }, [page]);

  const onFetchUsers = async () => {
    const res = await fetchUsers(page);
    setUsers(res.users);
    setNumberOfPages(res.numberOfPages);
  };

  const onDeleteUser = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      await onFetchUsers();
      setSelectedUser(null);
      setShouldCreateUser(true);
    }
  };

  const onCreateUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await createUser({
      firstName,
      lastName,
      email,
      password,
    });
    await onFetchUsers();
  };

  return (
    <>
      {numberOfPages > 0 ? (
        <Pagination
          count={numberOfPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          shape="rounded"
        />
      ) : (
        <> </>
      )}
      <Box sx={{ display: "flex" }}>
        <PaginatedList
          users={users ?? []}
          userClicked={function (selectedUser: user): void {
            setShouldCreateUser(false);
            setSelectedUser(selectedUser);
          }}
        />
        <UserForm
          user={selectedUser}
          shouldCreateUser={shouldCreateUser}
          onCreateUser={onCreateUser}
          onDeleteUser={onDeleteUser}
        />
      </Box>
      <Fab
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => {
          setShouldCreateUser(true);
          setSelectedUser(null);
        }}
      >
        +
      </Fab>
    </>
  );
};

export default UserManagment;
