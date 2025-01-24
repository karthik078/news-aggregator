# News Aggregrator app

Clone this repository. 
### `git clone git@github.com:karthik078/news-aggregator.git`

And then navigate to project root.
### `cd news-aggregator`

## Local Setup 
Use Node Version : 22
In project root terminal, run the below commands
### `npm i`
### `npm run start`

Once the app starts
Open [http://localhost:3000](http://localhost:3000).



## Docker Steps
Ensure Docker is running before executing the below commands.
In the project directory, you can run below command to build the docker image 

### `docker build -t news-app .`

Once the image is built, run the below command to start the server.

### `docker-compose up`


Open [http://localhost:8080](http://localhost:8080) to view it in your browser.


# NOTE
If port 8080 is already in use, update the docker-compose.yml file with an available port.


# Enjoy!
