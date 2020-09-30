import React from 'react';
import {
  Box,
  Button,
  Grow,
  Popper,
  MenuList,
  MenuItem,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';

const DropDownButton = ({ itemList, selectedIndex, onChangeSelectedIndex }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  const ITEM_HEIGHT = 48;

  const handleMenuItemClick = (event, index) => {
    onChangeSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Box ref={ref}>
      <Button
        endIcon={<ArrowDropDownIcon />}
        size="small"
        variant="text"
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
      >
        {itemList[selectedIndex]}
      </Button>
      <Popper
        open={open}
        anchorEl={ref.current}
        role={undefined}
        transition
        disablePortal={false}

      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper
              style={{ maxHeight: ITEM_HEIGHT * 4.5, overflow: 'auto' }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                >
                  {itemList.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default DropDownButton;
