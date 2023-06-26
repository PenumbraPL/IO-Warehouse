import { useEffect, useState } from 'react';
import {add, format, subDays, subHours ,formatDistance ,compareDesc} from 'date-fns';
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



export function getdata(rackID = 1) {

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
                  {format(paleta.arriveDate , 'dd.MM.yyyy')}
                </TableCell>
                <TableCell sx={{ background: (compareDesc(paleta.expiryDate,new Date()))==1 ? "red" : compareDesc(paleta.expiryDate,add(new Date(),{months:2}))==1?"blue":"" }}>
                  {format(paleta.expiryDate , 'dd.MM.yyyy')}
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

  let tabelaBody = getdata(rackID);

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
