
/*
    This module is for all the admin activities
*/

const express = require('express');
const mysql = require('mysql');
const admin = express.Router();


const db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'littleangels'
});

db.connect((err) =>{
    if(err){
        console.log(err.message);
        throw err;
    }
    console.log('[Admin] DB CONNECTED!');
});


admin.get('/', (req, res) =>{
    res.send('Admin');
});

admin.get('/createdb', (req, res)=>{
    let sql = 'CREATE DATABASE littleangels'
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send('DB Created ...');
    });
});

admin.get('/usertable', (req, res)=>{
    let sql = "CREATE TABLE UserTable(Name VARCHAR(40) NOT NULL, Email VARCHAR(50) NOT NULL PRIMARY KEY, Password VARCHAR(50) NOT NULL, Gender VARCHAR(10))";
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

admin.get('/adoptiontable', (req, res) =>{
    let sql = "CREATE TABLE adoptionpost(Id VARCHAR(25) NOT NULL PRIMARY KEY, Email VARCHAR(50) NOT NULL, Title VARCHAR(40) NOT NULL, Post VARCHAR(200) NOT NULL, Name VARCHAR(50) NOT NULL, Year INT(6), File VARCHAR(50) NOT NULL)";
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

admin.get('/emergencytable', (req, res) =>{
    let sql = `CREATE TABLE emergencytable(Id VARCHAR(25) NOT NULL PRIMARY KEY, Phone VARCHAR(15) NOT NULL, Title VARCHAR(50) NOT NULL, File VARCHAR(50) NOT NULL)`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
});

admin.get('/vettable', (req, res) =>{
    let sql = `CREATE TABLE vettable(Id VARCHAR(25) NOT NULL, Email VARCHAR(40) NOT NULL PRIMARY KEY, Name VARCHAR(30) NOT NULL, Phone VARCHAR(15) NOT NULL, Designation VARCHAR(150) NOT NULL, Dept VARCHAR(100) NOT NULL, Description VARCHAR(250) NOT NULL, Days VARCHAR(20) NOT NULL, Time VARCHAR(20) NOT NULL)`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
});

admin.get('/happymoments', (req, res) =>{
    let sql = `CREATE TABLE happymoments(Id VARCHAR(25) NOT NULL PRIMARY KEY, Description VARCHAR(100) NOT NULL, File VARCHAR(30) NOT NULL)`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
});

admin.get('/petfoods', (req, res) =>{
    let sql = `CREATE TABLE petfoods(Id VARCHAR(25) NOT NULL PRIMARY KEY, Name VARCHAR(100) NOT NULL, Price DECIMAL(6, 2), File VARCHAR(30) NOT NULL)`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
});

admin.get('/inserthappymoments', (req, res) =>{
    const hanppiness = [
        {
            id: '1',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-1.jpeg'
        },
        {
            id: '2',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-2.jpeg'
        },
        {
            id: '3',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-3.jpeg'
        },
        {
            id: '4',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-4.jpeg'
        },
        {
            id: '5',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-3.jpeg'
        },
        {
            id: '6',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-1.jpeg'
        },
        {
            id: '7',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-4.jpeg'
        },
        {
            id: '8',
            description: 'This character description generator will generate a fairly random description of a belonging to a random race. However, some aspects of the descriptions will remain the same, this is done to keep the general structure the same, while still randomizing the important details.',
            file: 'happy_moments-2.jpeg'
        }
    ];

    for(var h of hanppiness){
        let sql = `INSERT INTO happymoments (Id, Description, File) VALUES ('${h.id}', '${h.description}', '${h.file}')`;
        console.log(sql);
        db.query(sql, (err, result) =>{
            if(err) throw err;
        })
    }
    res.send('OK');
});

admin.get('/insertemergencies', (req, res) =>{
    const emergencies = [
        {
            id: '1',
            phone: '01701111000',
            title: 'Help needed in Dhanmondi 27!',
            file: '/images/rescue-1.png'
        },
        {
            id: '2',
            phone: '01901111000',
            title: 'Help needed in Mirpur 11!',
            file: '/images/rescue-2.jpg'
        },
        {
            id: '3',
            phone: '01801111000',
            title: 'Help needed in Motijheel!',
            file: '/images/rescue-3.jpg'
        },
        {
            id: '4',
            phone: '01701111000',
            title: 'Help needed in Dhanmondi 27!',
            file: '/images/rescue-2.png'
        },
        {
            id: '5',
            phone: '01901111000',
            title: 'Help needed in Mirpur 11!',
            file: '/images/rescue-1.jpg'
        },
        {
            id: '6',
            phone: '01801111000',
            title: 'Help needed in Motijheel!',
            file: '/images/rescue-3.jpg'
        }
    ];

    for(var em of emergencies){
        let sql = `INSERT INTO emergencytable (Id, Phone, Title, File) VALUES ('${em.id}', '${em.phone}', '${em.title}', '${em.file}')`;
        console.log(sql);
        db.query(sql, (err, result) =>{
            if(err) throw err;
        })
    }
    res.send('OK');
});

admin.get('/insertpetfoods', (req, res)=>{
    const foods = [
        {
            id: '1',
            name: 'Item 1',
            price: 90,
            file: '/images/product-1.png'
        },
        {
            id: '2',
            name: 'Item 2',
            price: 150,
            file: '/images/product-2.jpg'
        },
        {
            id: '3',
            name: 'Item 3',
            price: 120,
            file: '/images/product-3.jpg'
        },
        {
            id: '4',
            name: 'Item 4',
            price: 90,
            file: '/images/product-2.png'
        },
        {
            id: '5',
            name: 'Item 5',
            price: 150,
            file: '/images/product-3.jpg'
        },
        {
            id: '6',
            name: 'Item 6',
            price: 120,
            file: '/images/product-1.jpg'
        }
    ];

    for(var food of foods){
        let sql = `INSERT INTO petfoods (Id, Name, Price, File) VALUES ('${food.id}', '${food.name}', ${food.price}, '${food.file}')`;
        console.log(sql);
        db.query(sql, (err, result) =>{
            if(err) throw err;
        })
    }
    res.send('OK');
});

admin.get('/insertvets', (req, res) =>{
    const vets = [
        {
            id: 'V1',
            email: 'gtewari@me.com',
            name: 'Dr. Siamak',
            phone: '8917249',
            designation: 'DVM, MS in Theriogenology',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '7.30 PM - 10.00 PM'
        },
        {
            id: 'V2',
            email: 'microfab@aol.com',
            name: 'Dr. Arifur Rabbi',
            phone: '01785-636036',
            designation: 'DVM, MS',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '7.30 PM - 10.00 PM'
        },
        {
            id: 'V3',
            email: 'goresky@icloud.com',
            name: 'Dr. Md. Mahbubul Alam Bhuiyan',
            phone: '01711-146012',
            designation: 'Additional Veterinary officer',
            dept: 'Veterinary',
            description: 'Specialist in Treatment, Vaccination  & Management of Pet Animal & Birds.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        },
        {
            id: 'V4',
            email: 'martink@mac.com',
            name: 'Dr. Sagir Uddin Ahmed',
            phone: '01706214759',
            designation: 'DVM, MS Vet Science, PhD',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        },
        {
            id: 'V5',
            email: 'fallorn@me.com',
            name: 'Dr. Siamak Shamsi Bahar',
            phone: '8917249',
            designation: 'DVM, MS',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        },
        {
            id: 'V6',
            email: 'lbecchi@outlook.com',
            name: 'Dr. Md. Luthfor Rahman',
            phone: '01731492093',
            designation: 'Veterinary Surgeon',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '7.30 PM - 10.00 PM'
        },
        {
            id: 'V7',
            email: 'corrada@optonline.net',
            name: 'Dr. Azmat Ali',
            phone: '9883486',
            designation: 'DVM, MS',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '7.30 PM - 10.00 PM'
        },
        {
            id: 'V8',
            email: 'jonathan@hotmail.com',
            name: 'Dr. Kazi Mujibur Rahman',
            phone: '01715016218',
            designation: 'Chief vet',
            dept: 'Veterinary',
            description: 'Specialist in Treatment, Vaccination  & Management of Pet Animal & Birds.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        },
        {
            id: 'V9',
            email: 'raides@verizon.net',
            name: 'Dr. Mohammad Shariful Haque',
            phone: '8619706',
            designation: 'DVM, MS Vet Science',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        },
        {
            id: 'V10',
            email: 'lahvak@yahoo.com',
            name: 'Dr. Lf. Col Shahjada',
            phone: '01711123288',
            designation: 'Bangladesh Army (vet)',
            dept: 'Veterinary',
            description: 'Pet animal Consultant & Expert in Spaying Surgery, Neutering of Pet Animal.',
            days: 'Sat-Thurs',
            time: '8.00 AM - 9.00 PM'
        }
    ];

    for(var vet of vets){
        let sql = `INSERT INTO vettable (Id, Email, Name, Phone, Designation, Dept, Description, Days, Time) VALUES ('${vet.id}', '${vet.email}', '${vet.name}', '${vet.phone}', '${vet.designation}', '${vet.dept}' , '${vet.description}', '${vet.days}', '${vet.time}')`;
        db.query(sql, (err, result) =>{
            if(err) throw err;
        })
    }
    res.send('OK');
});

module.exports = admin;
