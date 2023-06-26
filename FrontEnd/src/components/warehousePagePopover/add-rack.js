import React, { useState } from 'react';
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
    Stack,
    SvgIcon,
} from '@mui/material';

export const AddRack = () => {
    const sectors = [
        {
            id: 1,
            racks: [1, 2, 3, 4]
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [sector, setSector] = React.useState(0);
    const [rackId, setRackId] = React.useState(0);

    const handleSectChange = (event) => {
        setSector(event.target.value);
    };
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
                                {sectors.map((sector) => {
                                    return (
                                        <MenuItem key={sector.id}
value={sector.id}> {sector.id} </MenuItem>
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
                        href="#contained-buttons">
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
