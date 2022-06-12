import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { demianActor } from './service';
import { pTypeInfo } from './utils/constant';
// import { ProposeArg,Operation } from './idl/controllerCanister/controllerCanister.did';

const pTypeData = Object.keys(pTypeInfo).map((p: string) => ({
  label: p.toUpperCase(),
  value: p
}));

const initFormValue = {
  pType: '',
  canisterId: '',
  wasm_code: null
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  const getPropeseList = async () => {
    // @ts-ignore
    const arrPropose = await demianActor.propose(BigInt(0));
    console.log('get_propose', arrPropose);
  };

  useEffect(() => {
    getPropeseList();
  }, []);

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index: Number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const [formValue, setFormPropole] = useState<any>(initFormValue);

  const setAgeHandle = (event: any) => {
    setFormPropole(event.target.value);
  };

  // create delete add install start uninstall ...

  // const ProposeArg: ProposeArg = {
  //   member: [],
  //   code: [[1]],
  //   canister_id: 'blocs-gyaaa-aaaal-qadya-cai',
  //   operation:  Operation.addMember ,
  // };

  // const submitCanister = async () => {
  //   const arrPropose = await demianActor.propose(ProposeArg);
  //   console.log('get_propose', arrPropose);
  // };

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab label='提案' {...a11yProps(0)} />
          <Tab label='canister列表' {...a11yProps(1)} />
          <Tab label='小组成员' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ m: 1, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Propose</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={formValue}
              label='install'
              onChange={(formValue) => setAgeHandle(formValue)}>
              {pTypeData.map((pd) => {
                return <MenuItem value={pd.label}>{pd.value}</MenuItem>;
              })}
            </Select>

            {formValue?.pType == 'create' && (
              <div>
                <Typography>CanisterId</Typography>
                <Input
                  placeholder='canisterId'
                  inputProps={formValue.canisterId}
                />
                <Typography>Required</Typography>
              </div>
            )}
            {formValue?.pType == 'install' && (
              <Typography>WASM Code</Typography>
            )}
          </FormControl>
        </Box>
        <ButtonGroup
          variant='contained'
          aria-label='outlined primary button group'>
          <Button>提交</Button>
          <Button>取消</Button>
        </ButtonGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
        canister列表 Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        小组成员
      </TabPanel>
    </Box>
  );
}
