import { List, ListItemText, Box, ListItemButton } from "@mui/material";
import type { user } from "../../types/users";

type Props = {
  users: user[];
  userClicked: (selectedUser: user) => void;
};

const PaginatedList = ({ users, userClicked }: Props) => {  
  return (
    <Box sx={{marginRight: 20, width: 500}}>
      <List>
        {users.map((user) => (
          <ListItemButton key={user.id} onClick={() => userClicked(user)}>
            <ListItemText primary={user.firstName} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default PaginatedList;
