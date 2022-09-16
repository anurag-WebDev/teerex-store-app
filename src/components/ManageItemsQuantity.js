import { Box, Stack, IconButton } from "@mui/material";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

const ManageItemsQuantity = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box>{value}</Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

export default ManageItemsQuantity;
