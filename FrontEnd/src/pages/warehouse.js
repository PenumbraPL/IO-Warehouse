import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import AdjustIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon'
import Bar3ListIcon from '@heroicons/react/24/solid/Bars3BottomLeftIcon'
import PaletteIcon from '@heroicons/react/24/solid/InboxStackIcon'
import ClockIcon from '@heroicons/react/24/solid/ClockIcon'
import { MovePopOver } from 'src/components/warehousePagePopover/move-popover';
import { AddRack } from 'src/components/warehousePagePopover/add-rack';
import { ImportRack } from 'src/components/warehousePagePopover/Import-rack';

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
    img: '/assets/plans/wh2.png',
    title: 'Warehouse-1',
  }
];


const Page = () => {

  const canvWidth = 700;
  const canvHeight = 500;
  let imgRef = useRef();
  const canvasRef = useRef();

  // const drawRectangle = () => {
  //   const context = canvasRef.current.getContext("2d");
  //   context.drawImage(imgRef.current, 0, 0, canvWidth, canvHeight)

  //   context.strokeStyle = "red";
  //   context.lineWidth = 2;
  //   context.strokeRect(50, 30, 110, 90);
  //   context.strokeRect(170, 65, 100, 80);

  // };


  // useEffect(() => {
  //   drawRectangle();
  // }, [imgRef]);

  return (
    <>
      <Head>
        <title>
          Manage Warehouse
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
                  {/* <ImportRack /> */}
                </Stack>
              </Stack>

              <AddRack />
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


                  <ImageList variant="masonry" cols={1} gap={8}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>


                {/* <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <div>
                        <canvas
                          ref={canvasRef}
                          width={canvWidth}
                          height={canvHeight}
                        />
                        <img
                          ref={imgRef}
                          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          hidden
                        />
                      </div>


                    </ImageListItem>
                  ))}
                </ImageList> */}
                {/* <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={164}>
                    <ImageListItem key={'/assets/plans/wh1.png'}>
                      <div>
                        <canvas
                          ref={canvasRef}
                          width={canvWidth}
                          height={canvHeight}
                        />
                        <img
                          ref={imgRef}
                          src={'/assets/plans/wh1.png'}
                          srcSet={'/assets/plans/wh1.png'}
                          alt={'Warehouse'}
                          loading="lazy"
                          hidden
                        />
                      </div>
                    </ImageListItem>
                </ImageList> */}

              </Grid>
              <Grid
                xs={0}
                sm={3}
                lg={3}
              >
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
                    href="/manage-item"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <AdjustIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Manage Items</Button>

                  <MovePopOver />

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <Bar3ListIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    href="/racks"
                  >
                    Rack </Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PaletteIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    href="/palettes"
                  >
                    Pallets</Button>

                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ClockIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    href="/short_term_prods"
                  >
                    Short Shelf Life Products</Button>

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
