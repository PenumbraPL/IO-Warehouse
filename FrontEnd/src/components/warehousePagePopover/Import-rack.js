import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpLeftIcon from '@heroicons/react/24/solid/ArrowUpLeftIcon'
import AdjustIcon from '@heroicons/react/24/solid/AdjustmentsVerticalIcon'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
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

const itemData2 = [
    {
      img: '/assets/products/product-1.png',
      title: 'Product-1',
    },
    {
      img: '/assets/products/product-2.png',
      title: 'Product-2',
    },
    {
      img: '/assets/products/product-5.png',
      title: 'Product-3',
    },
    {
      img: '/assets/products/product-4.png',
      title: 'Product-4',
    }
  ];



export const ImportRack = () => {

    const [anchorE3, setAnchorE3] = React.useState(null);
    const open3 = Boolean(anchorE3);
    const id3 = open3 ? 'simple-popover' : undefined;
  
    const handleClick = (event) => {
      setAnchorE3(event.currentTarget);
    };
  
    const handleClose3 = () => {
      setAnchorE3(null);
    };
    const handleChange3 = (event) => {
      setSection(event.target.value);
    };


  const handleChange = (event) => {
    setSection(event.target.value);
  };
  
  const handleClick4 = (event) => {
    imgRef = choosenImage
  };

  const [choosenImage, setImage] = React.useState();

  const chooseImage = (event) => {
    setImage(event.currentTarget);
  }


  const canvWidth = 700;
  const canvHeight = 500;
  let imgRef = useRef();
  const canvasRef = useRef();
    return (
        <>
            <Button
                onClick={handleClick}
                startIcon={(
                    <SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>
                )}
                variant="contained"
            >
                Add Rack
            </Button>

            <Popover
        id={id3}
        open={open3}
        anchorEl={anchorE3}
        onClose={handleClose3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >

        <Box
          m={5}>
          <Typography sx={{ p: 2 }} variant='h6' > Choose plan of warehouse: </Typography>

          <ImageList sx={{ width: 700, height: 500 }} cols={3} rowHeight={164}>
            {itemData2.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  ref={imgRef}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  onClick={chooseImage}
                />


              </ImageListItem>
            ))}
          </ImageList>

          <Typography sx={{ p: 2 }} variant='h6' > {choosenImage ? choosenImage.alt : ""} </Typography>

          <Button
            onClick={handleClick4}
            variant="contained"
            href="#contained-buttons">
            Confirm
          </Button>
        </Box>
      </Popover>
        </>
    );
};
