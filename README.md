This is an editor that can help you write better, faster, using AI. The purpose of the editor is to help the writer build a develop collate research material, develop notes and content, and duild a narrative to convery about topic of the article.

<picture>
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="./public/banner.png">
</picture>

## Getting Started Dockerized

### Step 1:

Get an [OpenAI API key](https://openai.com).

Once you have the API key:

```bash
## go to the repository folder.
cd path/to/this_repo
## copy .env.local.example to .env.local
cp .env.local.example .env.local
```

Update the .env.local file with your OpenAI API key.

### Step 2:

Build a docker container

```bash
docker build -t fountain-pen .
```

### Step 3:

Start a project

```bash
./run_project.sh PROJECT_NAME
```

This script will set up the project directories for you and start the docker container.

the PROJECT_NAME can be an existing project name, or a new one. These projects are saved in the data folder.

**NOTE: you might have to run `chmod +x run_project.sh` to make the run_project script executable.**

## Getting Started Without Docker

### Step 1:

Get an [OpenAI API key](https://openai.com).

Once you have the API key:

```bash
## go to the repository folder.
cd path/to/this_repo
## copy .env.local.example to .env.local
cp .env.local.example .env.local
```

Update the .env.local file with your OpenAI API key, and your project name.
each time you start a new project, the app will make the respective directories in the data folder.

### Step 2:

Build and start:

```bash
npm i
npm run build
npm start
```

OR

Development server:

```bash
npm i
npm run dev
```

### Step 3:

Open http://localhost:3000/editor in your browser.

The editor should look like this.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/interface.png">
  <source media="(prefers-color-scheme: light)" srcset="./public/interface.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="./public/interface.png">
</picture>
