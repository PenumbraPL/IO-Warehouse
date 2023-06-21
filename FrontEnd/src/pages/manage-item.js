import React from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { subDays, subHours } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Unstable_Grid2 as Grid } from '@mui/material';

const now = new Date();

// Palettes drop down
const items = [
  {
    id: 1, 
    name: 'Iulia Albu',
    arriveDate: subDays(subHours(now, 8), 6).getTime(),
    expiryDate: subDays(subHours(now, 8), 6).getTime(),
    amount: 10
  },
];

// Slots drop down
const slots = [
  {
    id: 1, 
    name: 'Iulia Albu'
  },
];

// Item to send
const currItem = {
  id: 1, 
  name: 'Iulia Albu',
  arriveDate: subDays(subHours(now, 8), 6).getTime(),
  expiryDate: subDays(subHours(now, 8), 6).getTime(),
  amount: 10
};



const Page = () => {
  const [currID, setCurrID] = React.useState(0);
  const [currPalAmount, setAmount] = React.useState(0);
  const [currSlot, setSlot] = React.useState(0);
  const [currPalID, setCurrPalID] = React.useState(0);
  const [currMaxTime, setMaxTime] = React.useState(0);
  const [operation, setOperation] = React.useState('');

  const handleIDChange = (event) => {
    setCurrID(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleSlotChange = (event) => {
    setSlot(event.target.value);
  };
  const handlePalChange = (event) => {
    setCurrPalID(event.target.value);
  };
  const handleTimeChange = (event) => {
    setMaxTime(event.target.value);
  };
  const handleOperChange = (event) => {
    setOperation(event.target.value);
  };

  return (
    <>
      <Head>
        <title>
          Manage Items | Devias Kit
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
                   Manage Items
                </Typography>
              </Stack>
            </Stack>
            
            <Grid
              container
              spacing={3}
            >
            <Grid
                xs={3}
                sm={6}
                lg={6}
              >
            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={4}
            >
                <FormControl fullWidth margin='normal' size='medium'>
                    <InputLabel 
                      id="id-label"
                      >
                      Id
                      </InputLabel>
                    <Select
                      labelId="id-label"
                      id="id-select"
                      value={currID}
                      label="Id"
                      onChange={handleIDChange}
                    >
                      {items.map((palette) => {
                        return (
                          <MenuItem value={palette.amount}>{palette.id}</MenuItem>
                        );
                      })}

                    </Select>
                </FormControl>


                <FormControl fullWidth margin='normal' size='medium'>
                      <TextField 
                          id="amount-field" 
                          labelId="amount-label" 
                          label="Amount of palettes" 
                          variant="filled" 
                          onChange={handleAmountChange}
                          />
                </FormControl>


                <FormControl fullWidth margin='normal' size='medium'>
                    <InputLabel 
                      id="slot-label"
                      >
                      Slot
                      </InputLabel>
                    <Select
                      labelId="slot-label"
                      id="slot-select"
                      value={currSlot}
                      label="Slot"
                      onChange={handleSlotChange}
                    >
                      {slots.map((slot) => {
                        return (
                          <MenuItem value={slot.id}>{slot.id}</MenuItem>
                        );
                      })}

                    </Select>
                </FormControl>

                <FormControl fullWidth margin='normal' size='medium'>
                    <InputLabel 
                      id="palette-label"
                      >
                      Palette ID
                      </InputLabel>
                    <Select
                      labelId="palette-label"
                      id="palette-select"
                      value={currPalID}
                      label="Pal"
                      onChange={handlePalChange}
                    >
                      {items.map((palette) => {
                        return (
                          <MenuItem value={palette.amount}>{palette.id}</MenuItem>
                        );
                      })}

                    </Select>
                </FormControl>


                <FormControl fullWidth margin='normal' size='medium'>
                    <InputLabel 
                      id="slot-label"
                      >
                      Operation
                      </InputLabel>
                    <Select
                      labelId="slot-label"
                      id="slot-select"
                      value={operation}
                      label="Slot"
                      onChange={handleOperChange}
                    >
                      <MenuItem value={'Add'}> Add </MenuItem>
                      <MenuItem value={'Delete'}> Delete </MenuItem>
                      <MenuItem value={'Reserve'}> Reserve </MenuItem>
                      <MenuItem value={'Deliver'}> Deliver </MenuItem>
                    </Select>
                </FormControl>


                <FormControl fullWidth margin='normal' size='medium'>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack>
                          <DatePicker 
                              label="Expiry date" 
                              onChange={handleTimeChange}
                              />
                         </Stack>
                    </LocalizationProvider>
                </FormControl>

                <Button variant="contained" color="primary"> Send </Button>

              </Stack>
              </Grid>

              <Grid
                xs={3}
                sm={6}
                lg={6}
              ></Grid>
              </Grid>
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
