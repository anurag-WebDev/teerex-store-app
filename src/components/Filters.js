import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

const Filters = ({ filters, handleFilters, filterType }) => {
  return (
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value={filters}
          control={<Checkbox />}
          label={filters}
          labelPlacement="end"
          name={filterType}
          onChange={(e) => {
            handleFilters(e);
          }}
        />
      </FormGroup>
    </FormControl>
  );
};

export default Filters;
