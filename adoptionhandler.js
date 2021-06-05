const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const adoption = express.Router();

const UPLOAD_FOLDER = `/uploads/`;
const errorHandler = (err, req, res, next) =>{
    res.send(`Server Side Error : ${err.message}`);
};

adoption.use(express.json());
adoption.use(cookieParser());
adoption.use(errorHandler);
adoption.use(express.static(`${__dirname}/public`));

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
    console.log('[Adoption] DB CONNECTED!');
});

const storage = multer.diskStorage({
    destination : '/uploads/',
    filename : (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        const fileName =  `${Date.now()}`;
        console.log(fileName + ext);
        cb(null, fileName + ext);
    }
});

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 100000000,
    },
    fileFilter :(req, file, cb) =>{
        console.log(file);
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
            console.log(true);
            cb(null, true);
        }else{
            cb(new Error('Only jpg, png, jpeg allowed'));
        }
    }
});

adoption.get('/', (req, res)=>{
    let sql = `SELECT * FROM adoptionpost`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.render('adoption/index', {data : result});
    });
});

adoption.get('/create-post', (req, res)=>{
    if(req.cookies.email){
        res.render('adoption/create-post');
    }else{
        res.redirect('/login');
    }
});

adoption.get('/postSubmitted', (req, res)=>{

    let email = req.cookies.email;
    let title = req.query.title;
    let postBody = req.query.post;
    let fileLink = '/images/ado-1.jpg';
    let m = new Date().getMonth();


    if(m === 0){
        m = 'Jan';
    }else if(m === 1){
        m = 'Feb';
    }
    else if(m === 2){
        m = 'Mar';
    }
    else if(m === 3){
        m = 'Apr';
    }
    else if(m === 4){
        m = 'May';
    }else if(m === 5){
        m = 'Jun';
    }else if(m === 6){
        m = 'Jul';
    }else if(m === 7){
        m = 'Aug';
    }
    else if(m === 8){
        m = 'Sept';
    }else if(m === 9){
        m = 'Oct';
    }else if(m === 10){
        m = 'Nov';
    }else if(m === 11){
        m = 'Dec';
    }
    let nam = '';
    let sql = `SELECT Name FROM usertable WHERE Email='${email}'`;

    db.query(sql, (err, result) =>{
        if(err) throw err;
        nam = result[0].Name;
        let year = new Date().getFullYear();
        let id = `ADP${Math.floor(Math.random() * 1000000) + Math.floor(Math.random() * 20000) + Math.floor(Math.random() * 50000)}`;
        let sql = `INSERT INTO adoptionpost (Id, Email, Title, Post, Name, Year, File) VALUES ('${id}','${email}', '${title}', '${postBody}', '${nam}', ${year},  '${fileLink}')`;
        db.query(sql, (err, result)=>{
            if(err) throw err;
            res.redirect('/adoption');
        });
    });
});

adoption.get('/details/:id', (req, res)=>{
    console.log();
    let sql = `SELECT * FROM adoptionpost WHERE Id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.render('adoption/details', {data : result[0]});
    });
});

adoption.post('/postdelete', (req, res) =>{
    console.log(1, req.body);
    let id = req.body.id;
    let t = id.slice(id.indexOf('details'), id.length);
    let tp = t.indexOf('/');
    tp = tp + 1;
    let str = t.slice(tp, t.length);
    console.log(str);
    let sql = `DELETE FROM adoptionpost WHERE Id='${str}'`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.status(200).send('200');
    });
})

module.exports = adoption;