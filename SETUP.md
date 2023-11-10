# TCET ERP System

Made in mind for testing APIs, database replication, providing data to frontend. 

## Installation for Testing

### Prerequisites

Well before anything, you will have to install WSL. All you have to do is:

`wsl --install`

After this, you will need to restart.

Install Docker Desktop, it is docker bundled with a frontend. It will allow you do get the backend and databases up and running without any other installation steps. 

The link for downloading Docker Desktop is given below.

[Docker Desktop Installer](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)

Again, you will need to restart.

### Installation

After this, use these commands to set up the databases and the backend.

```bash
docker-compose pull
docker-compose up -d
```

The last step is a troublesome one, but a very necessary step. You will have to change your hosts file. On Linux, it will be in `/etc/hosts/` (use sudo vim/nano/any editor with admin privs and go to the next step). For Windows, it will be in `C:\Windows\System32\drivers\etc\hosts`. Open Notepad(or any code editor) as Admin, and open the specific hosts file, and go to the next step. You can use Microsoft PowerToys to change your Hosts file using the Hosts file editor.

Add the following to your hosts file.
```
  127.0.0.1   mongo1
  127.0.0.1   mongo2
  127.0.0.1   mongo3
```

And voila! You have the backend set up! It will be running on port 4000.

You can use MongoDBCompass to login with the URI specified in the `docker-compose.yaml` and the `.env.sample`



NOTE! If, for any reason, the backend doesn't work, try restarting the backend container in Docker Desktop, in the Containers tab.