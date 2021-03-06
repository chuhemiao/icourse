import { Principal } from '@dfinity/principal';
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
import { ProposeArg } from './idl/controllerCanister/controllerCanister.did';
import { demianActor } from './service';
import { pTypeInfo } from './utils/constant';

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

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }} key={index}>
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
  const [list, setList] = useState([]);
  const [owner, setOwner] = useState([]);

  const [formValue, setFormPropole] = useState<any>(initFormValue);

  const setAgeHandle = (event: any) => {
    setFormPropole(event.target.value);
  };
  const getOwner = async () => {
    console.log(demianActor, 'demianActor');
    const owner = await demianActor.get_owner();
    console.log('owner', owner);
    //@ts-ignore
    setOwner(owner);
  };
  const getPropeseList = async () => {
    console.log(demianActor, 'demianActor');
    const arrPropose = await demianActor.get_propose_list();
    console.log('get_propose', arrPropose);
    //@ts-ignore
    setList(arrPropose);
  };

  const submitCanister = async () => {
    const ProposeArg: ProposeArg = {
      member: [
        Principal.fromText(
          'c526v-pnjpe-x57vs-xe3qb-idgh7-xre3a-jdzef-l654c-5sg4x-5iigp-xae'
        )
      ],
      code: [],
      canister_id: [],
      operation: { addMember: null }
    };
    const arrPropose = await demianActor.propose(ProposeArg);
    console.log(arrPropose, 'arrPropose');
  };
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    // getPropeseList();
    // getOwner();
  };
  console.log(list, 'debug list');
  console.log(owner, 'debug owner');

  useEffect(() => {
    getPropeseList();
    getOwner();
  }, []);

  return (
    <Box sx={{ width: '100%', marginTop: '30px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'>
          <Tab label='??????' {...a11yProps(0)} />
          <Tab label='????????????' {...a11yProps(1)} />
          <Tab label='????????????' {...a11yProps(2)} />
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
          <Button onClick={() => submitCanister()}>??????</Button>
          <Button>??????</Button>
        </ButtonGroup>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <>
          {owner.map((item, index) => {
            return (
              <div key={index}>
                ????????????
                <div> {index}</div>
                <div>{item.toText()}</div>
              </div>
            );
          })}
        </>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <>
          {list.map((item, index) => {
            return (
              <div key={index}>
                ????????????
                <div> {Number(item.id)}</div>
                <div>{item.member[0].toText()}</div>
              </div>
            );
          })}
        </>
      </TabPanel>
    </Box>
  );
}
