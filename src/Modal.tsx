import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import { LocalizationProvider, DatePicker, DatePickerToolbar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";
import dayjs from "dayjs";
import 'dayjs/locale/de-ch';

const currentDate = dayjs();
let errorMessage:String = "";

interface ModalProps {
  isOpenModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ isOpenModal, setOpenModal } :ModalProps) {
  const [name, setName] = React.useState(""); // State for name input
  const [amount, setAmount] = React.useState("");
  const [isNameValid, setIsNameValid] = React.useState<undefined | boolean>(
    undefined
  );
  const [isAmountValid, setIsAmountValid] = React.useState<undefined | boolean>(
    undefined
  );
  const [error, setError] = React.useState<DateValidationError | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<dayjs.Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  
  React.useEffect(() => {
    console.log(error);
    switch (error) {
      case "invalidDate": {
        setErrorMessage("Your date is not valid");
        break;
      }
      case "minDate" : {
        setErrorMessage("Your date is in the past");
        break;
      }
      case "maxDate": {
        setErrorMessage("Your date is to far in the future");
        break;
      }

      default: {
        setErrorMessage("");
        break;
      }
    }
  }, [error]);

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    setSelectedDate(newDate);  // Update the selected date
  };


  const handleClose = () => {
    setOpenModal(false);
    setIsNameValid(undefined);
    setIsAmountValid(undefined);
    setAmount("");
    setName("");
    setError(null);
  };

  const options = [
    "Lion",
    "Tiger",
    "Cebra",
    "Elephant",
    "Giraffe",
    "Leopard",
    "Zebra",
    "Panther",
    "Cheetah",
    "Wolf",
    "Bear",
    "Fox",
    "Kangaroo",
    "Koala",
    "Panda",
  ];

  const checkValidName = (value: string) => {
    // const regex = /^[/d][a-z]*$/;
    // const isValid = regex.test(value);
    let isValid = (value[0].toUpperCase() === value[0]) ? true : false;
    setIsNameValid(isValid);
  };

  const checkValidAmount = (value: string) => {
    const regex = /^-?\d{1,}(?:\.\d{1,2})?$/;
    const isValid = regex.test(value);
    setIsAmountValid(isValid);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    checkValidName(value); // Trigger validation on change
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(amount);
    checkValidAmount(value); // Trigger validation on change
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isNameValid) {
      alert("Please provide a valid name."); //TODO change that.
      return;
    }
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    handleClose();
  };
  console.log(isOpenModal);
  return (
    <React.Fragment>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleFormSubmit,
        }}
      >
        <Box
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <DialogTitle sx={{ padding: 0 }}>Add new Animal</DialogTitle>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            error={isNameValid != undefined && !isNameValid}
            {...(isNameValid ? { color: "success" } : "")}
            helperText={
              isNameValid != undefined && !isNameValid
                ? "Name must start with a big Charackter."
                : ""
            }
          />
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Animals" />}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              name="amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              onChange={handleAmountChange}
              error={isAmountValid != undefined && !isAmountValid}
              {...(isAmountValid ? { color: "success" } : "")}
              {...isAmountValid != undefined && !isAmountValid && (
                <FormHelperText error={true}>Amount is not valid</FormHelperText>
              )}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de-ch">
            <DatePicker
                label="Pick a date"
                onError={(newError) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
                minDate={currentDate}
                value={selectedDate}
            />
          </LocalizationProvider>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add Animal</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
