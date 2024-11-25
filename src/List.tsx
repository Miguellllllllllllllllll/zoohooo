import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Beispiel-Daten
const animals = [
  { name: "Luna", species: "Hund", price: 1200, birthday: "2021-03-15" },
  { name: "Milo", species: "Katze", price: 800, birthday: "2020-06-20" },
  { name: "Bella", species: "Pferd", price: 4500, birthday: "2018-09-12" },
  { name: "Max", species: "Papagei", price: 600, birthday: "2022-01-05" },
];

function ResponsiveAppList() {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 3 }}
      >
        Tierliste
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Tierart</strong>
              </TableCell>
              <TableCell>
                <strong>Preis (€)</strong>
              </TableCell>
              <TableCell>
                <strong>Geburtstag</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal, index) => (
              <TableRow key={index}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.price}</TableCell>
                <TableCell>{animal.birthday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ResponsiveAppList;
