import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { color } from '@mui/system';


const data2 = 
  {
    rack:
      [
        {
          height: 10, // liczba wszystkich miejsc
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
        },
      ]
  };


export const PaletasTable = (props) => {
  const {
    sector = "All",
    rackID = 1,
    // onDeselectAll,
    // onDeselectOne,
    // onPageChange = () => { },
    // onRowsPerPageChange,
    // onSelectAll,
    // onSelectOne,
    // page = 0,
    // rowsPerPage = 0,
    // selected = []
  } = props;

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);

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

            <TableBody>
              {data2.rack.map((rack) => {
                // const isSelected = selected.includes(paleta.ID);
                
                return (rack.slots.map((paleta) => {
                return (
                  <TableRow
                    hover
                    // key={paleta.ID}
                    // selected={isSelected}
                  >
                    <TableCell>
                    {sector}
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
                    <TableCell sx={{background: paleta.expiryDate =="5.10.2020" ?"red":""}}>
                      {paleta.expiryDate}
                    </TableCell>
                  </TableRow>
                );}))
              }
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        count={5}
        // onPageChange={onPageChange}
        // onRowsPerPageChange={onRowsPerPageChange}
        // page={page}
        // rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

PaletasTable.propTypes = {
  sector: PropTypes.string,
  rackID: PropTypes.int,
};
