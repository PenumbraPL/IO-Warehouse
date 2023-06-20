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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let [age, setAge] = React.useState('');

    const [section, setSection] = React.useState(0);


  const handleChange = (event) => {
    setSection(event.target.value);
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

                    <FormControl fullWidth>
                        <Stack
                            spacing={1} mb={1}
                        >
                            <InputLabel id="demo-simple-select-label3">Section</InputLabel>
                            <Select
                                labelId="demo-simple-select-label3"
                                id="demo-simple-select3"
                                value={section}
                                label="Section"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>S1</MenuItem>
                                <MenuItem value={2}>S2</MenuItem>
                                <MenuItem value={3}>S3</MenuItem>
                            </Select>

                            <TextField id="filled-basic" label="ID" variant="filled" />

                        </Stack>
                    </FormControl>

                    <Button variant="contained" href="#contained-buttons">
                        Add
                    </Button>
                    <Button variant="contained" href="#contained-buttons">
                        Delete
                    </Button>
                </Box>
            </Popover>
        </>
    );
};
