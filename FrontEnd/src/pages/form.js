import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, MenuItem, Select, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';

const now = new Date();

// this to swap on our data section look
const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  }
];

const data2 = [
  {
    rack:
    {
      height: 10, // liczba wszystkich miejsc
      slots:
      // only slots which are occupied or reserved
      {
        name: "<itemName>",
        position: 1,
        reserved: 1,

        arriveDate: "5.10.2000",
        expiryDate: "5.10.2020"
      }

    },
  }
];
const Sectors = [
  { ID: 'A', racks: [1, 12, 123] },
  { ID: 'B', racks: [1, 2, 3] },
  { ID: 'C', racks: [3, 33, 333] }
]


const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};


const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSector, setSelectedSector] = useState('');

  const handleChange = (event) => {
    
    setSelectedSector(event.target.value);
  };
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

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
  const SectorsListId = (datas) => {
    return datas.map(data => (<option label={data.ID}>
      {data.ID}
    </option>)
    )
  }
  const SectorsListRack = (datas, val) => {
    // console.log("run");
    
    return datas.map(data => (
        (data.ID == val)?
        data.racks.map(num => 
           <option label={num}>num</option> ):
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
                        value={selectedSector} onChange={handleChange}>
                        <option aria-label="All" value="All" label='All'/>
                        {SectorsListId(Sectors)}

                      </Select>
                    </Box>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Box>
                      <InputLabel htmlFor="grouped-native-select">Rack</InputLabel>
                      <Select native defaultValue="All" id="grouped-native-select2" label="Grouping2">
                        <option aria-label="All" value="All" label='All'/>
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
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
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
