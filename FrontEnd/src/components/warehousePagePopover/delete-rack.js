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


function deleteRack(rackId) {

    fetch('http://localhost:3001/api/racks/' + rackId.toString(), {
        method: 'DELETE',
       // body: JSON.stringify(data),
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



export const DeleteRack = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (event) => {
        event.preventDefault()
        deleteRack(rackId);
    }

    const [rackId, setRackId] = React.useState('');

    const handleIdChange = (event) => {
        setRackId(event.target.value);
    };


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
                Delete Rack
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
                    Delete rack

                    <Stack
                        spacing={1}
                        mb={1}
                    >
 
                        <FormControl fullWidth>
                            <TextField
                                id="rack-id-select"
                                label="rackID"
                                variant="filled"
                                onChange={handleIdChange}
                            />
                        </FormControl>
                    </Stack>


                    <Button variant="contained"
                        href="#contained-buttons"
                        onClick={handleDelete}
                        >
                        Send
                    </Button>
                </Box>
            </Popover>
        </>
    );
};
