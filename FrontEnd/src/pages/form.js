import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Box, Button, Container, Select, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PaletasTable, generateRaport } from 'src/sections/customer/paletas-table';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

let Sectors = [
  { ID: 'A', racks: [1, 12, 123] },
  { ID: 'B', racks: [1, 2, 3] },
  { ID: 'C', racks: [3, 33, 333] }
]
async function getSectorsData() {
  try {
    const user = JSON.parse(localStorage.user)
    const resp = await fetch('http://localhost:3001/api/sectors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //authorization: user.authorization
        },
    })
    if(resp.status != 200){
      console.log(resp)
    }
    return await resp.json()
  } catch (err) {
    console.log(err)
  }
}

const Page = () => {

  useEffect(() => {
    const fun = async () => {
      Sectors = await getSectorsData();
      console.log(Sectors)
    }
    fun();
  });

  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedRack, setSelectedRack] = useState(-1);
  const [RaportTable, setRaportTable] = useState();
  // {SectorsListRack(Sectors, selectedSector)}
  function generateRaport() {
    setRaportTable(<PaletasTable sector={selectedSector}
      rackID={selectedRack}
    />)
  }
  const handleChangeSector = (event) => {
    setSelectedSector(event.target.value);
    setSelectedRack(-1);
  };
  const handleChangeRack = (event) => {
    setSelectedRack(event.target.value);
  };


  const SectorsListId = (datas) => {
    return datas.map(data => (<MenuItem key={data.ID}
      value={data.ID}>{data.ID}</MenuItem>))
  }
  const SectorsListRack = (datas, val) => {

    return datas.map(data => (
      (data.ID == val) ?
        data.racks.map(num =>
          <MenuItem key={num}
            value={num}>{num}</MenuItem>) :
        <></>
    ))
  }

  return (
    <>
      <Head>
        <title>
          Raport
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
                  <InputLabel id="select-sector-label">Section</InputLabel>
                  <FormControl sx={{ m: 1, minWidth: 140 }}>


                    <Select
                      labelId="select-sector-label"
                      id="select-sector"
                      value={selectedSector}
                      label="Section"
                      onChange={handleChangeSector}
                    >
                      {/* <option aria-label="All" value="All" label='All' /> */}
                      {SectorsListId(Sectors)}

                    </Select>

                  </FormControl >
                  <InputLabel id="select-rack-label">Rack</InputLabel>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="select-rack-label"
                      id="select-rack"
                      value={selectedRack}
                      label="Rack"
                      onChange={handleChangeRack}
                    >
                      {SectorsListRack(Sectors, selectedSector)}

                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
              <div>
                <Button
                  onClick={generateRaport}
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <Cog6ToothIcon class="h-6 w-6 text-gray-500" />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Generate raports
                </Button>
              </div>
            </Stack>

            {/* <CustomersSearch /> */}
            {RaportTable}
            {/* <PaletasTable sector={selectedSector}
              rackID={selectedRack}
            /> */}
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
