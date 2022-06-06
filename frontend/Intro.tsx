import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { demianActor } from './service';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  const getPropeseList = async () => {
    // @ts-ignore
    const arrPropose = await demianActor.get_propose(BigInt(0));
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

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
        提案 One
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
