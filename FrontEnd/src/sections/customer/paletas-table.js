import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFetch from "react-fetch-hook";
import Alert from '@mui/material/Alert';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';


const data2 = [
  {
    capacity: 10, // liczba wszystkich miejsc
    slots:
      // only slots which are occupied or reserved
      [{
        name: "<itemName>",
        position: 1,
        reserved: 1,
        arriveDate: "5.10.2000",
        expiryDate: "5.10.2020"
      },
      {
        name: "<itemName2>",
        position: 2,
        reserved: 1,
        arriveDate: "1.11.2001",
        expiryDate: "3.3.2023"
      }
      ]
  }
];

export function getData(rackID = 1) {
  const { isLoading, data, error } = useFetch("https://my-json-server.typicode.com/CoreNest/TestIO/rack" + rackID.toString());
  if (error) {

    return (<><Alert severity="error">error kod {error.status}: {error.statusText}</Alert>
      <Alert severity="info">no data https://my-json-server.typicode.com/CoreNest/TestIO/rack{rackID.toString()}</Alert></>)

  }

  if (!isLoading) {
    return (
      <TableBody >
        {data.map((rack) => {
          // const isSelected = selected.includes(paleta.ID);

          return (rack.slots.map((paleta) => {
            return (
              <TableRow
                hover
                key={paleta.position}
              // selected={isSelected}
              >
                <TableCell>
                  1{/* {sector} */}
                </TableCell>
                <TableCell>
                  {rackID}
                </TableCell>
                <TableCell>
                  {paleta.position}
                </TableCell>
                <TableCell>
                  {paleta.name}
                </TableCell>
                <TableCell>
                  {paleta.arriveDate}
                </TableCell>
                <TableCell sx={{ background: paleta.expiryDate == "5.10.2020" ? "red" : "" }}>
                  {paleta.expiryDate}
                </TableCell>
              </TableRow>
            );
          }))
        }
        )}
      </TableBody>
    )
  }
}

export const PaletasTable = (props) => {
  const {
    sector = "All",
    rackID = 1
  } = props;

  let tabelaBody = getData(rackID);  

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Sector
                </TableCell>
                <TableCell>
                  Rack
                </TableCell>
                {/* <TableCell>
                  Paleta
                </TableCell> */}
                <TableCell>
                  Position
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  ArriveDate
                </TableCell>
                <TableCell>
                  ExpiryDate
                </TableCell>
              </TableRow>
            </TableHead>                
            {tabelaBody}
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

PaletasTable.propTypes = {
  sector: PropTypes.string,
  rackID: PropTypes.int,
};
