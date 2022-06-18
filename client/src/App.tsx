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

export default function SvgIconsSize(props: any) {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          flexGrow: 1,
        },
      }}
    >
      { props.statusOk ? <SvgIcon component={StarIcon} inheritViewBox color="success" fontSize="large" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> : <CircularProgress /> }
    </Box>
  );
}

export function App() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
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
  const pages = ['Documentation', 'FAQ', 'Support'];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="a"
            border={"1px"}
            onClick={() => backendInfo?.startsWith("ok") ? window.location.href = "http://localhost:9080/browser/" : null }
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <SvgIconsSize statusOk={backendInfo?.startsWith("ok")} />
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="pgadmin.html"
            target="pgadmin"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           pgAdmin
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`${page}.html`}
                target="pgadmin"
                sx={{ my: 2, color: 'white', display: 'block' }}
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
