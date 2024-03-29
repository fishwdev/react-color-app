import sizes from "./sizes";

export default {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'capitalize',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        },
        [sizes.down('xs')]: {
            display: 'none'
        }
    },
    slider: {
        width: '340px',
        margin: '0 15px',
        display: 'inline-block',
        '& .rc-slider-rail': {
            height: '8px'
        },
        '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus, .rc-slider-handle:hover': {
            backgroundColor: 'greenyellow',
            outline: 'none',
            border: '2px solid greenyellow',
            boxShadow: 'none',
            width: '13px',
            height: '13px',
            marginLeft: '0',
            marginTop: '-3px',
        },
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        [sizes.down('sm')]: {
            width: '150%'
        }
        ,
        [sizes.down('xs')]: {
            width: '100%'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    }
};