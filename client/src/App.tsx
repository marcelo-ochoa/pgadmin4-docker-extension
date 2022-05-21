import { Button, Stack, Link, Box, StyledEngineProvider,Toolbar,Typography } from '@mui/material';
import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { useState } from 'react';
import { red } from '@mui/material/colors';

export default function SvgIconsSize(props: any) {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >

      { props.statusOk ? <ScreenshotMonitorIcon color="success"  fontSize="large" /> : <ScreenshotMonitorIcon sx={{color: red[500], fontSize: "large" }} /> }
    </Box>
  );
}

export function App() {
  const ddClient = createDockerDesktopClient();
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

  return (
    <Toolbar>
      <Typography variant="h6" component="div">
        <StyledEngineProvider injectFirst>
          <SvgIconsSize statusOk={backendInfo?.startsWith("ok")}/>
        </StyledEngineProvider>
      </Typography>
    </Toolbar>
  );
}
