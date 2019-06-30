# Occupied
Occupied is a web-based platform to help facilitate and control space reservation in a given structure.

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


## Usage
After running the script, navigate to http://localhost:3000 

**NOTE**: If you have changed the frontend's **PORT** variable, navigate to that **PORT** instead. 

## Directory Structure

The folders are arranged in the following fashion:
```
.
+-- .env
+-- api
+-- client
|   +-- public
|   +-- src
+-- dummy
+-- models
+-- public.key
+-- private.key
+-- package.json
+-- package-lock.json
+-- app.js
```

## LICENSE
The License is an `MIT` License and applies to the work of all current, future, and past contributors who have worked on the repository

## CONTRIBUTING

***Coming Soon***

## FINAL WRITE-UP
For more detailed documentation on using Occupied, follow this link.
https://docs.google.com/document/d/1UKZqqj28GUtx0Fbauo5jhOKjl0ucAkwSH6tFV83ZDWg/edit?usp=sharing
