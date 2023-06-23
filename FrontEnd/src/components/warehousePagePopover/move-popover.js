import React from 'react';
import ArrowUpLeftIcon from '@heroicons/react/24/solid/ArrowUpLeftIcon'
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
import { palette } from '@mui/system';
import { subDays, subHours } from 'date-fns';

const now = new Date();

export const MovePopOver = () => {
    const items = [
        {
          id: 1, 
          name: 'Iulia Albu',
          arriveDate: subDays(subHours(now, 8), 6).getTime(),
          expiryDate: subDays(subHours(now, 8), 6).getTime(),
          amount: 10
        },
    ];

    const racks = [
    {
        id: 1,
        height: 1, 
        slots: {
            name: 'A',
            position: '10-2',
            reserved: false,
            arriveDate: subDays(subHours(now, 8), 6).getTime(),
            expiryDate: subDays(subHours(now, 8), 6).getTime(),
        },
        amount: 10
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

    const [palId, setPalId] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [currRack, setCurrRack] = React.useState(0);
    const [newRack, setNewRack] = React.useState(0);


    const handleIdChange = (event) => {
        setPalId(event.target.value);
    };
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };
    const handleCurrRackChange = (event) => {
        setCurrRack(event.target.value);
    };
    const handleNewRackChange = (event) => {
        setNewRack(event.target.value);
    };

    return (
        <>
            <Button
                startIcon={(
                    <SvgIcon fontSize="small">
                        <ArrowUpLeftIcon /> 
                    </SvgIcon>
                )}
                // aria-describedby={id}
                variant="contained" onClick={handleClick}
            >
                Move Item
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
                    Move palette.

                        <Stack
                            spacing={1} mb={1}
                        >
                        <FormControl fullWidth>
                            <InputLabel id="palId-label">Id</InputLabel>
                            <Select
                                labelId="palId-label"
                                id="palId-select"
                                value={palId}
                                label="id"
                                onChange={handleIdChange}
                            >

                            {items.map((palette) => {
                                return(
                                    <MenuItem value={palette.id}>{palette.id}</MenuItem>
                                );
                            })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField 
                                id="amount-select" 
                                label="Amount of palettes" 
                                variant="filled" 
                                onChange={handleAmountChange}
                                />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="curr-pos-label">Current Position</InputLabel>
                            <Select
                                labelId="curr-pos-label"
                                id="curr-pos-select"
                                value={currRack}
                                label="currRack"
                                onChange={handleCurrRackChange}
                            >
                            {racks.map((rack) => {
                                return(
                                    <MenuItem value={rack.id}>{rack.id}</MenuItem>
                                );
                            })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="new-pos-label"> New Position </InputLabel>
                            <Select
                                labelId="new-pos-label"
                                id="new-pos-select"
                                value={newRack}
                                label="newRack"
                                onChange={handleNewRackChange}
                            >
                            {racks.map((rack) => {
                                return(
                                    <MenuItem value={rack.id}>{rack.id}</MenuItem>
                                );
                            })}
                            </Select>
                        </FormControl>
                        </Stack>

                    <Button variant="contained" href="#contained-buttons">
                        Send
                    </Button>
                </Box>
            </Popover>
        </>
    );
};
