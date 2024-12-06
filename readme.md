Instructions on running Cool Guy Inventory Website

    1. Clone from github
    2. cd project folder and "npm install"
Set Up PostgreSQL (replace the development details entry in the knex file with your database connection details... needs to be a postgres database)

    1. Create database nammed 'inventory_app'
    
Running the app

    1. cd Backend -> npm run dev
    2. cd Frontend -> npm run dev (should run in localhost:5173)
    
Hooyah
    Welcome to the super cool guy inventory website. Feel free and register a username and password. Once that is created you can log in and then that will allow you to add, edit, and delete your stuff. You can return to home via localhost:5173 to view the public items or you can simply logout to view all items. Items will only be editable by the Username and Password that created them. Happy inventorying. 


---------------------------------------------------Jibberjabber from the project-------------------------------


CD BackEnd

npm install express pg knex dotenv

npm install --save-dev nodemon
npm install cors //there was an issue with my chrome browser and had me install cors in the backend

cd Front End 

npm create vite@latest . 
 - Y 
 -react
 -javascript

npm install
npm run dev //to run it. 

Api read.me replace the development details entry in the knex file with your database connection details... needs to be a postgres database
sudo service postgresql start
sudo -u postgres psql

npm install jsonwebtoken bcrypt //authentication section

npm install react-router-dom

