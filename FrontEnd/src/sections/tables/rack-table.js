import PropTypes from 'prop-types';
import { format } from 'date-fns';
import useFetch from "react-fetch-hook";
import Alert from '@mui/material/Alert';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const RackTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    rackID = 1
  } = props;

  const { isLoadingSectors, data, error } = useFetch("https://my-json-server.typicode.com/CoreNest/TestIO/sectors");
  if (error) {
    return (<><Alert severity="error">error kod {error.status}: {error.statusText}</Alert>
      <Alert severity="info">no data https://my-json-server.typicode.com/CoreNest/TestIO/rack{rackID.toString()}</Alert></>)
  }

  if (!isLoadingSectors) {
    {data?.map((sector) => {
      // console.log(sector)
      {sector.racks.map((rack) => {
          return (
            <TableRow
              hover
              //selected={isSelected}
            >
              <TableCell>
                {sector.id}
              </TableCell>
              <TableCell>
                {rack.id}
              </TableCell>
              <TableCell>

              </TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
          );
        })
      }
      // const isSelected = selected.includes(rack.id);
    })}
  }

  // let tableBody = getData(rackID);
  
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Sector ID
                </TableCell>
                <TableCell>
                  Rack ID
                </TableCell>
                <TableCell>
                  % of capacity
                </TableCell>
                <TableCell>
                  Max capacity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
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
};

export function getData(rackID = 1, sectorID){
  const { isLoading, data, error } = useFetch("https://my-json-server.typicode.com/CoreNest/TestIO/rack" + rackID.toString());
  if (error) {
    return (<><Alert severity="error">error kod {error.status}: {error.statusText}</Alert>
      <Alert severity="info">no data https://my-json-server.typicode.com/CoreNest/TestIO/rack{rackID.toString()}</Alert></>)
  }

  const percentage = (a, b) => (a / b) * 100;

  if (!isLoading) {
    return (
      <TableBody>
        {data.map((rack) => {
          // const isSelected = selected.includes(rack.id);
            return (
              <TableRow
                hover
                key={rack.id}
                //selected={isSelected}
              >
                <TableCell>
                  {sectorID}
                </TableCell>
                <TableCell>
                  {rack.id}
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            );
        })}
      </TableBody>
    )
  }
}

RackTable.propTypes = {
  count: PropTypes.number,
  data: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
