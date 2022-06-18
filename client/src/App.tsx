import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/icons-material/ScreenshotMonitor';
import { ReactComponent as StarIcon } from './pgadmin.svg';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export function App() {

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

  const pages = ['pgAdmin','Documentation', 'FAQ', 'Support'];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="app"
              onClick={() => backendInfo?.startsWith("ok") ? window.location.href = "http://localhost:9080/browser/" : null}
              sx={{ my: 1, color: 'white', display: 'block' }}
            >
              { backendInfo?.startsWith("ok") ? <SvgIcon component={StarIcon} inheritViewBox color="success" fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> : <CircularProgress /> }
            </Button>            
            {pages.map((page) => (
              <Button
                key={page}
                href={`${page}.html`}
                target="pgadmin"
                sx={{ my: 1, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
