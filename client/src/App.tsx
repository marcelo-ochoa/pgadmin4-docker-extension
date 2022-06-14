import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function SvgIconsSize(props: any) {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          flexGrow: 1,
        },
      }}
    >

      { props.statusOk ? <ScreenshotMonitorIcon color="success" fontSize="medium" /> : <ScreenshotMonitorIcon sx={{color: red[500], fontSize: "medium" }} /> }
    </Box>
  );
}

export function App() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [backendInfo, setBackendInfo] = useState<string | undefined>();

  let timer = setTimeout(() => checkBackend("http://localhost:9080/browser/"), 100);

  async function checkBackend(url: string) {
    clearTimeout(timer);
    timer = setTimeout(() => checkBackend(url), 3000);
    let status = await fetch(url)
      .then(response => response.ok);
    if (status) {
      setBackendInfo("ok");
      clearTimeout(timer);
    } else {
      setBackendInfo("error");
    }
  }

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            pgAdmin4 Extension
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <SvgIconsSize statusOk={backendInfo?.startsWith("ok")} />
              </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
