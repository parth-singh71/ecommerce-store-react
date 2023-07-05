import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddProductPage = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const onProductDetailChange = (
    detailName: "name" | "description" | "price" | "quantity",
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (detailName) {
      case "name":
        setProductDetails({
          ...productDetails,
          name: e.target.value,
        });
        break;
      case "description":
        setProductDetails({
          ...productDetails,
          description: e.target.value,
        });
        break;
      case "price":
        setProductDetails({
          ...productDetails,
          price: e.target.value,
        });
        break;
      case "quantity":
        setProductDetails({
          ...productDetails,
          quantity: e.target.value,
        });
        break;
    }
  };
  return (
    <Container>
      <Stack>
        <Card
          sx={{
            minWidth: 275,
            marginX: { xs: 2, sm: 7, md: 25, xl: 30 },
            marginBottom: 2,
          }}
        >
          <CardContent>
            <Stack sx={{ mx: 2 }}>
              <TextField
                label="Product Name"
                placeholder="Product Name"
                size="small"
                sx={{ my: 1 }}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => onProductDetailChange("name", e)}
              />
              <TextField
                label="Description"
                placeholder="Description"
                inputProps={{ maxLength: 1000 }}
                size="small"
                multiline
                rows={4}
                sx={{ my: 1 }}
                onChange={(
                  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => onProductDetailChange("description", e)}
              />
              <Stack direction="row" justifyContent="space-between">
                <TextField
                  label="Price"
                  placeholder="Price"
                  size="small"
                  type="number"
                  sx={{ my: 1 }}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => onProductDetailChange("price", e)}
                />
                <TextField
                  label="Quantity"
                  placeholder="Quantity"
                  size="small"
                  type="number"
                  defaultValue="1"
                  sx={{ mt: 1, mb: 2 }}
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => onProductDetailChange("quantity", e)}
                />
              </Stack>
              {/* <Autocomplete
                disablePortal
                freeSolo
                options={top100Films}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Category"
                    size="small"
                    placeholder="Add Category"
                  />
                )}
              /> */}
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                onClick={() => {
                  console.log(productDetails);
                }}
              >
                Enlist Product
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

// const filter = createFilterOptions<FilmOptionType>();

// export default function FreeSoloCreateOption() {
//     const top100Films = [
//         { label: "The Shawshank Redemption", year: 1994 },
//         { label: "The Godfather", year: 1972 },
//         { label: "The Godfather: Part II", year: 1974 },
//         { label: "The Dark Knight", year: 2008 },
//         { label: "12 Angry Men", year: 1957 },
//         { label: "Schindler's List", year: 1993 },
//         { label: "Pulp Fiction", year: 1994 },
//       ];
//   const [value, setValue] = useState(null);

//   return (
//     <Autocomplete
//       value={value}
//       onChange={(event, newValue) => {
//         if (typeof newValue === 'string') {
//           setValue({
//             title: newValue,
//           });
//         } else if (newValue && newValue.inputValue) {
//           // Create a new value from the user input
//           setValue({
//             title: newValue.inputValue,
//           });
//         } else {
//           setValue(newValue);
//         }
//       }}
//       filterOptions={(options, params) => {
//         const filtered = filter(options, params);

//         const { inputValue } = params;
//         // Suggest the creation of a new value
//         const isExisting = options.some((option) => inputValue === option.title);
//         if (inputValue !== '' && !isExisting) {
//           filtered.push({
//             inputValue,
//             title: `Add "${inputValue}"`,
//           });
//         }

//         return filtered;
//       }}
//       selectOnFocus
//       clearOnBlur
//       handleHomeEndKeys
//       options={top100Films}
//       getOptionLabel={(option) => {
//         // Value selected with enter, right from the input
//         if (typeof option === 'string') {
//           return option;
//         }
//         // Add "xxx" option created dynamically
//         if (option.inputValue) {
//           return option.inputValue;
//         }
//         // Regular option
//         return option.title;
//       }}
//       renderOption={(props, option) => <li {...props}>{option.title}</li>}
//       sx={{ width: 300 }}
//       freeSolo
//       renderInput={(params) => (
//         <TextField {...params} label="Free solo with text demo" />
//       )}
//     />
//   );
// }

export default AddProductPage;
