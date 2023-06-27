import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/paletas-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import { RackTable } from 'src/sections/tables/rack-table';
import { AddRack } from "src/components/warehousePagePopover/add-rack";
import { DeleteRack } from "src/components/warehousePagePopover/delete-rack";

const now = new Date();


let rackData = [];

const useRacks = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(rackData, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useRackIds = (racks) => {
  return useMemo(
    () => {
      return racks.map((rack) => rack.id);
    },
    [racks]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const racks = useRacks(page, rowsPerPage);
  const racksIds = useRackIds(racks);
  const racksSelection = useSelection(racksIds);


  useEffect(() => {});

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Rack List | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Rack List
                </Typography>
              </Stack>

            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
            >
              <AddRack/>
              <DeleteRack/>
            </Stack>

            <RackTable
              count={rackData.length}
              items={racks}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
