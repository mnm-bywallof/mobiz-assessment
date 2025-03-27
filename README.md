![image](https://cdn.prod.website-files.com/64d5148d08487ce19be14741/64df848bd554afda7be46517_5f2ac85c9fc48660ffbdfd78_Mobiz_Logo_Blue_Dark.jpg-p-500%20(1).png)
# Mobiz Technical Assessment

👋🙋‍♂️

This repo consists of two applications as per folder: web (React Application) and backend (NodeJS with Express)

Clone this repo
### To Run API (backend)
NB: You do not need to run this application because it is hosted on Google Cloud as a Docker container via Google Cloud Run (https://mobiz-backend-990423892517.us-central1.run.app)

Go into the backend Directory
```
cd backend
```

Install all the dependecies
```
npm install 
```

Run the application (server)
```
npm run start
```
Base URL for the Docker container = https://mobiz-backend-990423892517.us-central1.run.app but when running locally you can use http://locahost:8080
The API Endpoints:
1. Get all Employees GET /employees
2. Get an Employee GET /employee/3ad2e501-0a65-11f0-8bc0-0e0def4dbf15 (The GUID is the ID stored on the Database)
3. Update an Employee PUT /employee Body data in JSON Object: ```{id,firstName,lastName,email,employmentType}```
4. Delete an Employee DELETE /employee/3ad2e501-0a65-11f0-8bc0-0e0def4dbf15 (The GUID is the ID stored on the Database)

The Database Table is as follows:
```
CREATE TABLE `Employee` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `employmentType` varchar(20) NOT NULL,
  `joined` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

###To Run Front-End (React Application)
Go into the web directory
```
cd web
```

Install packages
```
npm install
```

Run application
```
npm run start
```

Upon loading the web application, you should be landing on the employees table just as shown below:
![image](https://github.com/user-attachments/assets/beee17b3-7bcf-482f-8aa0-9721769c6813)
