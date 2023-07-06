import React, { useState } from 'react';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { useTheme, styled } from '@mui/material/styles';

// material-ui
import { Avatar, ButtonBase, InputAdornment, OutlinedInput } from '@mui/material';

const OutlineInputStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 230,
    height: 40,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    '& input': {
        background: 'transparent !important',
        paddingLeft: '4px !important'
    },
    [theme.breakpoints.down('lg')]: {
        width: 250
    },
    [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: 4,
        background: '#fff'
    }
}));

const SearchBox = ({ updateValue, value }: any) => {
    const theme = useTheme();

    return (
        <OutlineInputStyle
            id="input-search-header"
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            placeholder="Buscar"
            startAdornment={
                <InputAdornment position="start">
                    <FindInPageIcon/>
                </InputAdornment>
            }
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
        />
    );
};

export default SearchBox;