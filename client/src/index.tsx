import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from "@mui/material/AppBar";
import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import { App } from './App';

const iFrame = <iframe src='pgadmin.html' 
                        frameBorder={0}
                        width={"100%"}
                        height={"870"}
                        name='pgadmin'
                        id='pgadmin'
                        sandbox='allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation' />;
ReactDOM.render(
  <React.StrictMode>
    <DockerMuiThemeProvider>
      <CssBaseline />
      <AppBar position="static">
        <App />
      </AppBar>
      {iFrame}
    </DockerMuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
