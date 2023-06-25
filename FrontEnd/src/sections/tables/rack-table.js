import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
    selected = []
  } = props;
  const percentage = (a, b) => (a / b) * 100;

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
              {items.map((rack) => {
                const isSelected = selected.includes(rack.id);
                return (
                  <TableRow
                    hover
                    key={rack.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      {rack.sectorId}
                    </TableCell>
                    <TableCell>
                      {rack.id}
                    </TableCell>
                    <TableCell>
                      {percentage(rack.occupied, rack.capacity)}%
                    </TableCell>
                    <TableCell>
                      {rack.capacity}
                    </TableCell>
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
};

RackTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
