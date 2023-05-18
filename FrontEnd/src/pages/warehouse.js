import React, {useState} from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import AdjustIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon'
import ArrowUpLeftIcon from '@heroicons/react/24/solid/ArrowUpLeftIcon'
import Bar3ListIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon'
import PaletteIcon from '@heroicons/react/24/solid/InboxStackIcon'
import ClockIcon from '@heroicons/react/24/solid/ClockIcon'
import Popover from '@mui/material/Popover';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
  
  

    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };

  return (

  <>
    <Head>
      <title>
        Companies | Devias Kit
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
                Warehouse
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
            <div>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add Rack
              </Button>
            </div>
          </Stack>
   
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={10}
              sm={6}
              lg={6}
            >
              <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={164}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid
              xs={0}
              sm={3}
              lg={3}
            >
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
                m={5}>
              Move pallets.

              <FormControl fullWidth>
              <Stack
                spacing = {1} mb={1}
                >
                <InputLabel id="demo-simple-select-label">Id</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <TextField id="filled-basic" label="Amount of palettes" variant="filled" />

                <InputLabel id="demo-simple-select-label2">Current Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select2"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <InputLabel id="demo-simple-select-label3">New Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label3"
                  id="demo-simple-select3"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                </Stack>
              </FormControl>

                <Button variant="contained" href="#contained-buttons">
                  Send
                </Button>
                </Box>
              </Popover>




            </Grid>
            <Grid
              xs={2}
              sm={3}
              lg={3}
            >
              <Stack
                direction="column"
                spacing={2}>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <AdjustIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Manage Items
                  </Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpLeftIcon />
                      </SvgIcon>
                    )}
                    aria-describedby={id} variant="contained" onClick={handleClick}
                  >
                    Move Item
                  </Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <Bar3ListIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                  Rack List
                  </Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PaletteIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Palettes
                  </Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ClockIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Short Self Life Products
                  </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  </>
)
                    };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
