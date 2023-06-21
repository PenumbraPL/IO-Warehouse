import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, MenuItem, Select, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PaletasTable } from 'src/sections/customer/paletas-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';




const Sectors = [
  { ID: 'A', racks: [1, 12, 123] },
  { ID: 'B', racks: [1, 2, 3] },
  { ID: 'C', racks: [3, 33, 333] }
]





const Page = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedRack, setSelectedRack] = useState(-1);

  const handleChangeSector = (event) => {
    setSelectedSector(event.target.value);
    setSelectedRack(-1);
  };
  const handleChangeRack = (event) => {
    setSelectedRack(event.target.value);
  };

  // const customers = useCustomers(page, rowsPerPage);
  // const customersIds = useCustomerIds(customers);
  // const customersSelection = useSelection(customersIds);

  // const handlePageChange = useCallback(
  //   (event, value) => {
  //     setPage(value);
  //   },
  //   []
  // );

  // const handleRowsPerPageChange = useCallback(
  //   (event) => {
  //     setRowsPerPage(event.target.value);
  //   },
  //   []
  // );
  const SectorsListId = (datas) => {
    return datas.map(data => (<option label={data.ID}>
      {data.ID}
    </option>)
    )
  }
  const SectorsListRack = (datas, val) => {
    // console.log("run");

    return datas.map(data => (
      (data.ID == val) ?
        data.racks.map(num =>
          <option label={num}>{num}</option>) :
        <></>
    ))
  }
  return (
    <>
      <Head>
        <title>
          Customers | Devias Kit
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
                  Magazyn
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Box>
                      <InputLabel htmlFor="grouped-native-select">Section</InputLabel>
                      <Select native defaultValue="All" id="grouped-native-select" label="Grouping"
                        value={selectedSector} onChange={handleChangeSector}
                      >
                        <option aria-label="All" value="All" label='All' />
                        {SectorsListId(Sectors)}

                      </Select>
                    </Box>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Box>
                      <InputLabel htmlFor="grouped-native-select">Rack</InputLabel>
                      <Select native defaultValue="All" id="grouped-native-select2" label="Grouping2"
                        value={selectedRack} onChange={handleChangeRack}
                        >
                        <option aria-label="All" value={-1} label='All' />
                        {SectorsListRack(Sectors, selectedSector)}

                      </Select>
                    </Box>
                  </FormControl>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Generate raports
                </Button>
              </div>
            </Stack>
            {console.log(selectedRack)}

            <CustomersSearch />
            <PaletasTable sector={selectedSector}
              rackID={selectedRack} 

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
