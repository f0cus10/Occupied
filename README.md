# Occupied
Occupied is a web-based platform to help facilitate and control space reservation in a given structure.

It represents the structures (e.g. buildings, halls) as **Blueprints** and spaces within those structures (e.g. classrooms, meeting rooms) as **Spaces**.

## Installation

<details><summary> PREREQUISITES </summary>
<p>
* Node.JS + NPM
* PostgreSQL
* 512 bit (Public, Private) pair
* Environment Variables
</p>
</details>

After gathering all the dependencies,

* Clone this repository
* Run,
```bash
cd Occupied
node app.js #This will start the backend
```
* Open a new terminal and run,
```bash
cd client
npm start #This will start the frontend
```
**Optionally**,
You could run `npm run dev` but output would be limited

Currently, the build has been tested to work on `Ubuntu >= 18.04`. 

## Usage
After running the script, navigate to http://localhost:3000 

**NOTE**: If you have changed the frontend's PORT variable, navigate to that PORT instead. 

## Folder structure

The folders are arranged in the following fashion:

.
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