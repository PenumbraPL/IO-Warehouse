import React, { useState, useEffect } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Popover from '@mui/material/Popover';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useFetch from "react-fetch-hook";

import {
    Box,
    Button,
    Stack,
    SvgIcon,
} from '@mui/material';


// async function getSectorsData() {
//   try {
//     const user = JSON.parse(localStorage.user)
//     const resp = await fetch('http://localhost:3001/api/sectors', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           //authorization: user.authorization
//         },
//     })
//     if(resp.status != 200){
//       console.log(resp)
//     }
//     return await resp.json()
//   } catch (err) {
//     console.log(err)
//   }
// }

function sendRack(rackId, sectorId) {
   // e.preventDefault()
  
    const data = {
        id: parseInt(rackId),
        sectorId: sectorId,
        occupied: 0,
        capacity: 10
    }
    console.log(data)
    fetch('http://localhost:3001/api/racks', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log(response.status)
        console.log(response)
        response.json()
          .then(() => {}).catch(err=>console.log(err))
    })
    ;
  }



export const AddRack = () => {
        
    let sectors = [];
    // [
    //     {
    //         id: 1,
    //         racks: [1, 2, 3, 4]
    //     },
    // ];

    // useEffect(() => {
    //     const fun = async () => {
    //       sectors = await getSectorsData();
    //       //console.log(sectors)
    //     }
    //     fun();
    //   });
    
      const { loading, data, error } = useFetch(
        "http://localhost:3001/api/sectors/"
      );

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAdd = (event) => {
        event.preventDefault()
        sendRack(rackId, sector);
    }

    const [sector, setSector] = React.useState(0);
    const [rackId, setRackId] = React.useState('');

    const handleSectChange = (event) => {
        setSector(event.target.value);
    };
    const handleIdChange = (event) => {
        setRackId(event.target.value);
    };

    console.log(sectors)
    if(data && !loading)
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
                    Add/Delete racks

                    <Stack
                        spacing={1}
                        mb={1}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="sector-label">sector</InputLabel>
                            <Select
                                labelId="sector-label"
                                id="sector-select"
                                value={sector}
                                label="sector"
                                onChange={handleSectChange}
                            >
                                {data?.map((sector, index) => {
                                    return (
                                        <MenuItem key={index}
    value={sector.ID}> {sector.name} </MenuItem>
                                    );
                                })} 
 
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="rack-id-select"
                                label="rack-id"
                                variant="filled"
                                onChange={handleIdChange}
                            />
                        </FormControl>
                    </Stack>


                    <Button variant="contained"
                        href="#contained-buttons"
                        onClick={handleAdd}
                        >
                        Add
                    </Button>
                    <Button variant="contained"
                        href="#contained-buttons">
                        Delete
                    </Button>
                </Box>
            </Popover>
        </>
    );
};
