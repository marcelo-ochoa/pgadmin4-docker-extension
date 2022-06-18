# Docker Extension

PGAdmin4 extension for Docker Desktop

## Manual Installation

Until this extension is ready at Docker Extension Hub you can install just by executing:

```bash
$ docker extension install mochoa/pgadmin4-docker-extension:6.10.0
Extensions can install binaries, invoke commands and access files on your machine. 
Are you sure you want to continue? [y/N] y
Image not available locally, pulling mochoa/pgadmin4-docker-extension:6.10.0...
Installing new extension "mochoa/pgadmin4-docker-extension:6.10.0"
Installing service in Desktop VM...
Setting additional compose attributes
VM service started
Installing Desktop extension UI for tab "PGAdmin4"...
Extension UI tab "PGAdmin4" added.
Extension "PGAdmin" installed successfully
```

**Note**: Docker Extension CLI is required to execute above command, follow the instructions at [Extension SDK (Beta) -> Prerequisites](https://docs.docker.com/desktop/extensions-sdk/#prerequisites) page for instructions on how to add it.

## Using PGAdmin Docker Extension

Once the extension is installed a new extension is listed at the pane Extension (Beta) of Docker Desktop.

By clicking at PGAdmin4 icon the extension main window will show the this extension in action

![Screenshot of the extension inside Docker Desktop](screenshot1.png?raw=true)

at the top left at the screen a Monitor Icon show in red means PGAdmin4 backend is not ready yet and when it turn in green backend is ready to work.

- ![Monitor Red](monitor-red.png?raw=true) PGAdmin4 is not ready
- ![Monitor Green](monitor-green.png?raw=true) PGAdmin4 ready to work

When monitor indicator is green just click on **PostgreSQL green icon** ![icon](monitor-green.png?raw=true) and you will see PGAdmin4 window.

First loggin will ask you for a master password for pgAdmin, fill it with your master password and click OK.

![Setting master password](screenshot2.png?raw=true)

By clicking on Add New Server you can add PostgreSQL server running at Docker Desktop or externals, the IP for PostgreSQL running at Docker Desktop is available at the menu, Settings -> Resources -> Network -> Docker subnet, in my case is 192.168.65.0/24 so an internal IP for reaching PostgreSQL containers running at Docker Desktop will be 192.168.65.2.

![Docker Desktop Subnet](https://miro.medium.com/max/700/0*m4e0OEQprx_GgUA7)

Let see an example of PostgreSQL started using Docker Desktop Featured Images, PostgreSQL Overview shows this sample URL:

postgres://postgres:postgrespw@localhost:55000

which means for a PGAdmin Add New Server:

- Name: Test
- Hostname/address: 192.168.65.2
- Port: 55000
- Maintenance database: postgres
- Username: postgres
- Password: postgrespw

by choosing Save Password, the above password is stored at PGAdmin4 internal storage and will remain until you de-install this extension.

![Screenshot of Add New Server](screenshot5.png?raw=true)

### Knowns caveats

For some reasons that I don't know if you are using PGAdmin Docker Desktop Extension and want to switch to another extension such as Disk Usage by clicking at left side pane Extensions (Beta) -> Disk Usage main windows focus still at PGAdmin Extension, as a workaround just click on some left main pane options such as Home or Containers and go back to the desire extension. This problem is visible also when using Logs Explorer and the extension is showing a lot of logs.
