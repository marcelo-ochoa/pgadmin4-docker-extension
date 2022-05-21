# Docker Extension

PGAdmin4 extension for Docker Desktop

## Manual Installation

Until this extension is ready at Docker Extension Hub you can install just by executing:

```bash
$ docker extension install mochoa/pgadmin4-docker-extension:6.9.0
Extensions can install binaries, invoke commands and access files on your machine. 
Are you sure you want to continue? [y/N] y
Image not available locally, pulling mochoa/pgadmin4-docker-extension:6.9.0...
Installing new extension "mochoa/pgadmin4-docker-extension:6.9.0"
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "PGAdmin4"...
Extension UI tab "PGAdmin4" added.
Extension "PGAdmin" installed successfully
```

## Using PGAdmin Docker Extension

Once the extension is installed a new extension is listed at the pane Extension (Beta) of Docker Desktop.

By clicking at PGAdmin4 icon the extension main window will show the this extension in action

[Screenshot of the extension inside Docker Desktop](screenshot1.png?raw=true)

at the top left at the screen an ScreenshotMonitorIcon show in red PGAdmin backend is not ready yet and green backend ready to work.

First loggin will ask you for a master password for pgAdmin, fill it with your master password a click OK.

By clicking on Add New Server you can add PostgreSQL server running on Docker Desktop or externals, the IP for PostgreSQL running in Docker Desktop is available at the menu, Settings -> Resources -> Network -> Docker subnet, in my case is 192.168.65.0/24 so an internal IP for reaching PostgreSQL containers running at Docker Desktop will be 192.168.65.2.

Let see an example of PostgreSQL started using Docker Desktop Featured Images, PostgreSQL Overview shows this sample URL:

postgres://postgres:postgrespw@localhost:55000

which means for a PGAdmin Add New Server:

- Name: Test
- Hostname/address: 192.168.65.2
- Port: 55000
- Maintenance database: postgres
- Username: postgres
- Password: postgrespw

by choosing Save Password, above password is stored at PGAdmin4 internal storage and will remains until you de-install this extension.

[Screenshot of Add New Server](screenshot2.png?raw=true)


