import { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const ddClient = useDockerDesktopClient();
  const isDarkModeEnabled = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });

  useEffect(() => {
    let timer: number;
    // sqlite3 pgadmin4.db "SELECT id,name from preferences where name='theme';" => 253|theme
    // sqlite3 pgadmin4.db "SELECT * from user_preferences where pid=112;"       => 253|1|system
    let sqlCmd = '"import sqlite3;c=sqlite3.connect(\'/var/lib/pgadmin/pgadmin4.db\');u=c.cursor();u.execute(\'insert or replace into user_preferences (pid,uid,value) values ((SELECT id from preferences where name=?),1,?)\',(\'theme\',\'system\'));c.commit();u.close();c.close()"'
    //console.log(sqlCmd);
    const start = async () => {
      setReady(() => false);

      await ddClient.docker.cli.exec("exec", [
        '-d',
        'pgadmin4_embedded_dd_vm',
        'python3',
        '-c',
        sqlCmd
      ]);
    };

    start().then(() => {
      let retries = 60;
      let timer = setInterval(async () => {

        if (retries == 0) {
          clearInterval(timer);
          setUnavailable(true);
        }

        try {
          const result = await ddClient.extension.vm?.service?.get('/ready');

          if (Boolean(result)) {
            setReady(() => true);
            clearInterval(timer);
          }
        } catch (error) {
          console.log('error when checking PGAdmin status', error);
          retries--;
        }
      }, 1000);
    }).catch(error => {
      console.log('failed to start PGAdmin4', error);
      ddClient.desktopUI.toast.error(error);
      setUnavailable(true);
    })

    return () => {
      clearInterval(timer);
    };
  }, [isDarkModeEnabled]);

  return (
    <>
      {unavailable && (
        <Grid container flex={1} direction="column" padding="16px 32px" height="100%" justifyContent="center" alignItems="center">
          <Grid item>
            PGAdmin4 failed to start, please close the extension and reopen/reinstall to try again.
          </Grid>
        </Grid>
      )}
      {!ready && (
        <Grid container flex={1} direction="column" padding="16px 32px" height="100%" justifyContent="center" alignItems="center">
          <Grid item>
            <LinearProgress/>
            <Typography mt={2}>
              Waiting for PGAdmin4 to be ready. It may take some seconds if
              it's the first time.
            </Typography>
          </Grid>
        </Grid>
      )}
      {ready && (window.location.href = 'http://localhost:59080/browser/')}
    </>
  );
}
