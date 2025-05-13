import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import type { user } from "../../types/users";

type Props = {
  user: user | null;
  shouldCreateUser: boolean;
  onCreateUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  onDeleteUser: () => Promise<void>;
};

const UserForm = ({
  user,
  shouldCreateUser,
  onCreateUser,
  onDeleteUser,
}: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await onCreateUser(firstName, lastName, email, password);

    setPassword("");
    setEmail("");
    setLastName("");
    setFirstName("");
  };

  const handleDelete = async () => {
    await onDeleteUser();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ m: 2 }}
        label="First Name"
        value={shouldCreateUser ? firstName : user?.firstName}
        onChange={(e) => setFirstName(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        disabled={!shouldCreateUser}
      />
      <TextField
        sx={{ m: 2 }}
        label="Last Name"
        value={shouldCreateUser ? lastName : user?.lastName}
        onChange={(e) => setLastName(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        disabled={!shouldCreateUser}
      />
      <TextField
        sx={{ m: 2 }}
        label="Email"
        value={shouldCreateUser ? email : user?.email}
        onChange={(e) => setEmail(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        disabled={!shouldCreateUser}
      />
      <TextField
        sx={{ m: 2 }}
        label="Password"
        value={shouldCreateUser ? password : "***"}
        onChange={(e) => setPassword(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        disabled={!shouldCreateUser}
      />
      <Button disabled={!shouldCreateUser} onClick={handleSubmit}>
        Create
      </Button>
      <Button disabled={shouldCreateUser} onClick={handleDelete}>
        Delete
      </Button>
    </Box>
  );
};

export default UserForm;
