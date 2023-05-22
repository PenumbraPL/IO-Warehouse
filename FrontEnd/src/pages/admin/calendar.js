import React, {useState} from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpLeftIcon from '@heroicons/react/24/solid/ArrowUpLeftIcon';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Popover from '@mui/material/Popover';

import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/ad-layout';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const itemData = [
  {
    img: '/assets/plans/wh1.png',
    title: 'Warehouse-1',
  }
];

const Page = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
  <>
    <Head>
      <title>
        Calendar | Devias Kit
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
                Calendar
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            
          </Stack>
  
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={12}
            >
                   <DateCalendar />
            </Grid>
          </Grid>
          <Grid container>
          <Grid
              xs={8}
              sm={6}
              lg={8}
            ></Grid>
          <Grid
              xs={4}
              sm={6}
              lg={4}
            >
              <Button
                color="inherit"
                startIcon={(
                  <SvgIcon fontSize="small">
                    <ArrowUpLeftIcon />
                  </SvgIcon>
                )}
                aria-describedby={id} variant="contained" onClick={handleClick}
               >
                  Send Application
              </Button>
              <Popover 
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              >
                <Box
                  m={3} >
                  <Box
                    mb={1}>
                    Book term
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack>
                          <DatePicker label="Pick date" />
                          <TimePicker label="Pick starting time" /> 
                          <TimePicker label="Pick finishing time" />
                          <Button variant="contained" color="primary"> Send </Button>
                          </Stack>
                    </LocalizationProvider>
                </Box>
              </Popover>
          </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
