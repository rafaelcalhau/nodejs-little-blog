# Little Blog

Just a small blog application written in JavaScript (NodeJS)

## Installation

### Requirements
* MySQL Database
* NodeJS

### First steps
- You will need run npm install and set up the MySQL database.
- Refer to sql.txt to get the database structure and initial data.
- Copy .env.example to .env and create a good string for your secret code. A MD5 hash string should be good.
- Open config/dbConnection.example.js and edit the mysql credentials.
- Rename config/dbConnection.example.js to config/dbConnection.js
- Open app/views/home/index.ejs and change <base href="http://localhost:3000/"> to <base href="www.yourdomain.com/">, keep the final slash "/".

### Admin
* URL: /admin
* User: admin
* Password: 123123

## Author

* **Rafael Calhau** - http://www.calhau.me

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
[MIT](https://choosealicense.com/licenses/mit/)