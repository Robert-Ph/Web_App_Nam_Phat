import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./text.css";

interface AutocompleteProps<T> {
  options: T[];
  getOptionLabel: (option: T) => string;
  onSelect: (object: T | null) => void;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T
  ) => React.ReactNode;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function TextFieldAuto<T>({
  options,
  getOptionLabel,
  onSelect,
  renderOption,
}: AutocompleteProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    // (async () => {
    //   setLoading(true);
    //   await sleep(1e3); // For demo purposes.
    //   setLoading(false);
    // })();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      className={"wrap-input_container"}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) =>
        getOptionLabel(option) === getOptionLabel(value)
      }
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      onChange={(event, newValue) => {
        onSelect(newValue);
      }}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
