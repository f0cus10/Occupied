# Occupied
Occupied is a web-based platform to help facilitate and control space reservation within a given establishment.

It represents the structures (e.g. buildings, halls) as **Blueprints** and spaces within those structures (e.g. classrooms, meeting rooms) as **Spaces**.

## Local Installation

To install a localized version of **Occupied** for personal, organizational, or developmental purposes, follow these steps:

### Prerequisites
To ensure proper installation, please make sure you have installed 
1. [Node.js + npm](https://nodejs.org/en/download/) for your system
2. `git` for cloning and version control
3. [PostgreSQL](https://www.postgresql.org/download/) for your system. 

### Clone Repository
Next, clone this repository through git using: `git clone github.com/f0cus10/Occupied.git`

### Configure Variables
In order to successfully run the program, you must configure some variables through the following steps:

1. Generate a 512-bit *(public,private)* key pair.
2. Specify the environment variables in a file called `.env`
 
#### Public, Private Key placement
After generating the 512-bit key pair, place the public key, and the private key in the `public.key` and `private.key` files respectively. Make sure to copy all of the key including
the **BEGINNING** and **END** demarcations. You can generate the pair through `ssh-keygen` or from here.

#### Environment Variables
An example for the environments vairables is provided in the `.env.example` file. Simply copy it to a `.env` file and specify the variables. 

### Running Occupied
After all the configuration is complete, you are ready to run Occupied!!!

Next, all you have to do is go to the project's direcory and run the following commands:
```bash
npm install
node app.js

# In a new terminal window
cd client
npm install
npm start
```

This starts the front-end and the back-end of the program separately. 

**Optionally**, If you'd like to run the full-stack with one command, 
```bash
# Navigate to Occupied root directory
npm run dev
```
*Caveat*: This method will limit the output from the server logs.


## Usage
After running the script, navigate to http://localhost:3000 

**NOTE**: If you have changed the frontend's **PORT** variable, navigate to that **PORT** instead. 

## Troubleshooting

***COMING SOON***

For now, contact the maintainers or create an [issue](https://github.com/f0cus10/Occupied/issues/new). 

## Directory Structure

The folders are arranged in the following fashion:
```
.
+-- .env               // contains the environment variables
+-- api                // main REST API logic 
+-- client             // React client
|   +-- public         // Icons, Labels, and other public stuff
|   +-- src            // All the frontend logic
+-- dummy              // Hardcoded testing data
+-- models             // Sequelize database models
+-- public.key         // 512-bit RSA Public Key
+-- private.key        // 512-bit RSA Private Key
+-- package.json       // Dependencies and scripts
+-- app.js             // Backend starter logic
```
## Versioning
This project uses [Semantic Versioning](semver.org) for versioning. For the versions available, see the [tags](https://github.com/f0cus10/Occupied/tags). 

## LICENSE
This project is licensed under the **MIT** License. See the [LICENSE](LICENSE) file for details.
