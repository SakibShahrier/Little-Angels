
/*
    This module is for all the public activities
*/

const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const public = express.Router();

const errorHandler = (err, req, res, next) =>{
    res.send(`Server Side Error : ${err.message}`);
};

//public.use(express.urlencoded({extended : false}));
public.use(express.json());
public.use(cookieParser());
public.use(errorHandler);

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
    console.log('[Public] DB CONNECTED!');
});


public.get('/', (req, res)=>{
    let sql = `SELECT * FROM petfoods`;
    let p, m;
    db.query(sql, (err, result) =>{
        if(err)throw err;
        p = result;
        console.log(p);
    });
    sql = `SELECT * FROM happymoments`;
    db.query(sql, (err, result) =>{
        if(err)throw err;
        m = result;
        console.log(m);
    });
    res.render('index', {productCount : 4, bestMoments : 5, products : p, moments : m});
});

public.get('/register', (req, res)=>{
    res.render('sign-up/sign-up');
});

public.post('/submit', (req, res)=>{
    let email = req.body.email;
    let sql = `INSERT INTO usertable (Name, Email, Password, Gender) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.gender}')`;
    db.query(sql, (err, result) =>{
        if(err){
            res.status(500).send('Server Side Error!');
        }
    });
    res.cookie('email', email, {maxAge : 1000 * 60 * 60 * 24});
    res.status(200).send('200');
});

public.get('/login', (req, res)=>{
    const cookie = req.cookies;
    if(cookie.email){
        res.redirect('/');
    }else{
        res.render('log-in/Log-in');
    }
});

public.get('/loginReq', (req, res)=>{
    let correctCredential = false;
    let sql = `SELECT password FROM usertable WHERE email='${req.query.email}'`;

    db.query(sql, (err, result)=>{
        if(err) throw err;
        if(result[0].password === req.query.password ? true : false){
            res.cookie('email', req.query.email, {maxAge : 1000 * 60 * 60 * 24, httpOnly : false});
            console.log(result);
            res.redirect('/');
        }else{
            res.redirect('/login');
        }
    });
});

public.get('/logout', (req, res)=>{
    res.clearCookie('email');
    res.redirect('/');
});

public.get('/profile', (req, res) =>{
    if(req.cookies.email){
        let sql = `SELECT * FROM usertable WHERE email='${req.cookies.email}'`;

        db.query(sql, (err, result) =>{
            if(err) throw err;
            console.log(result[0]);
            res.render('profile_info', {data : result[0]});
        });
    }else{
        res.redirect('/login');
    }
});

public.post('/changed', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let sql;

    if(email !== '' && password !== ''){
        sql = `UPDATE usertable SET Email = '${email}', Password= '${password}' WHERE Email = '${req.cookies.email}';`;
    }else if(email === '' && password !== ''){
        sql = `UPDATE usertable SET Password= '${password}' WHERE Email = '${req.cookies.email}';`;
    }else if(email !== '' && password === ''){
        sql = `UPDATE usertable SET Email = '${email}' WHERE Email = '${req.cookies.email}';`;
    }
    console.log(sql);
    db.query(sql, (err, result) =>{
        if(err){
            res.status(500).send('Server Side Error');
        }
        res.status(200).send('200');
    });
});


public.get('/happy_moments', (req, res)=>{
    let sql = `SELECT * FROM happymoments`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.render('happy_moments/index', {moments : result});
    });
});

public.get('/food_grocery', (req, res)=>{
    let sql = `SELECT * FROM petfoods`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        let n = result.length;
        res.render('food_grocery/index', {count : n, total : n, foods : result});
    });
});

public.get('/emergency', (req, res)=>{
    let sql = `SELECT * FROM emergencytable`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        let n = result.length;
        res.render('emergency/index', {count : n, total : n, emergencies : result});
    });
});

public.post('/emergency', (req, res)=>{
    
});

public.get('/vets', (req, res)=>{
    let sql = `SELECT * FROM vettable`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.render('vets/index', {vets : result});
    });
});

public.get('/vets/profile_info/:id', (req, res)=>{
    let sql = `SELECT * FROM vettable WHERE Id='${req.params.id}'`;
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.render('vets/profile_info', {data: result[0]});
    });
});


module.exports = public;

