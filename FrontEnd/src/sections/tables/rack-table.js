import PropTypes from "prop-types";
import { format } from "date-fns";
import useFetch from "react-fetch-hook";
import Alert from "@mui/material/Alert";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import Rack, { useGetData } from "src/components/racks";

export const RackTable = (props) => {
  const {
    count = 0,
    //items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    rackID = 1,
  } = props;

  // const { loading, data, error } = useFetch(
  //   "https://my-json-server.typicode.com/CoreNest/TestIO/sectors"
  // );

  const { loading, data, error } = useFetch(
    "http://localhost:3001/api/racks"
  );

  if (error) {
    return (
      <>
        <Alert severity="error">
          error kod {error.status}: {error.statusText}
        </Alert>
        <Alert severity="info">
          no data http://localhost:3001/api/racks
        </Alert>
      </>
    );
  }

  const percentage = (a, b) => (a / b) * 100;

  if (!loading && data) {
    console.log('loaded!', data, error);
    return (
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sector ID</TableCell>
                  <TableCell>Rack ID</TableCell>
                  <TableCell>% of capacity used</TableCell>
                  <TableCell>Max capacity</TableCell>
                </TableRow>
              </TableHead>
              {data?.map((item, index) => {
                  return (
                    <TableBody key={index}>
                    <TableRow hover>
                      <TableCell>{item.sectorId}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell> {percentage(item.occupied, item.capacity)}</TableCell>
                      <TableCell>{item.capacity}</TableCell>
                    </TableRow>
                  </TableBody>
                  )
              })}
              {/* {data?.map((sector) => {
                return sector.racks.map((rack, index) => (
                  <TableBody key={index}>
                    <TableRow hover>
                      <TableCell>{sector.id}</TableCell>
                      <TableCell>{rack}</TableCell>
                      <TableCell>
                        <Rack id={rack}></Rack>
                      </TableCell>
                      <TableCell>
                        <Rack id={rack} max={true}></Rack>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ));
              })} */}
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

RackTable.propTypes = {
  count: PropTypes.number,
  data: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
