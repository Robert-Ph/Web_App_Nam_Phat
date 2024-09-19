import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "./text.css";

interface Film {
  title: string;
  year: number;
}

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function TextFieldAuto() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    (async () => {
      setLoading(true);
      await sleep(1e3); // For demo purposes.
      setLoading(false);

      setOptions([...topFilms]);
    })();
  };

  const handleClose = () => {
    setOpen(false);
    setOptions([]);
  };

  return (
    <Autocomplete
      className="wrap-input_container"
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
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
const topFilms = [
  { title: "Tất cả", year: 1994 },
  { title: "#1132", year: 1972 },
  { title: "#1132", year: 1974 },
  { title: "#1132 ", year: 2008 },
  { title: "#1223", year: 1957 },
  { title: "#0123", year: 1993 },
  { title: "#6738", year: 1994 },
  { title: "#1132 ", year: 2008 },
  { title: "#1223", year: 1957 },
  { title: "#0123", year: 1993 },
  { title: "#6738", year: 1994 },
];
