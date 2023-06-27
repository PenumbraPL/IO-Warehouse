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
import useFetch from "react-fetch-hook";
import Alert from "@mui/material/Alert";

export const PalettesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const { loading, data, error } = useFetch(
    "http://localhost:3001/api/slots"
  );

  if (error) {
    return (
      <>
        <Alert severity="error">
          error kod {error.status}: {error.statusText}
        </Alert>
        <Alert severity="info">
          no data http://localhost:3001/api/slots
        </Alert>
      </>
    );
  }

  if (!loading && data) {
    console.log('loaded!', data);
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Product Name
                </TableCell>
                <TableCell>
                  Sector ID
                </TableCell>
                <TableCell>
                  Rack ID
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Expiry Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((pallet) => {
                return (
                  <TableRow hover>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                      </Stack>
                      {pallet.itemName}
                    </TableCell>
                    <TableCell>{pallet.sectorName}</TableCell>
                    <TableCell>{pallet.rackId}</TableCell>
                    <TableCell>{pallet.itemDescription}</TableCell>
                    <TableCell>{pallet.expiryDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
  } else {
    return null; // Add a fallback or loading state here if needed
  }
};

PalettesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
