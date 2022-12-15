const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql');
const { parse } = require('querystring');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var connection = mySql.createConnection({
    host: "localhost",
    user: 'root',
    password: "85218521",
    database: "ttms",
    port: "3306",
    multipleStatements: true
})

connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log('connected to db');
    }
});



// bcrypt.compare(password, this.password, function(err, isMatch) {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// users table
// connection.query("CREATE TABLE users (id int  AUTO_INCREMENT PRIMARY KEY,fullname varchar(255) not null, phonenumber varchar(20), email varchar(50) NOT NULL, password varchar(255) not null, role varchar(255) not null); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'user table error');
//     } else {
//         console.log("table users created");
//     }
// });
// connection.query("INSERT into users values(1,'VJTI_admin', '9876543210','admin@gmail.com','admin123','Admin');", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'user table insertion error');
//     } else {
//         console.log("users table inserted inital values");
//     }
// });

// //tables creation
// //FACULTY TABLE
// connection.query("CREATE TABLE Faculty (fac_id int  AUTO_INCREMENT PRIMARY KEY,name varchar(25) not null, email varchar(50) NOT NULL,subject varchar(50) not null,phonenumber BIGINT); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'FACULTY table error');
//     } else {
//         console.log("table FACULTY created");
//     }
// });
// //STUDENT TABLE
// connection.query("CREATE TABLE Student (student_id int  AUTO_INCREMENT PRIMARY KEY,name varchar(50) not null, email varchar(50) NOT NULL,section varchar(5),semester int, branch varchar(25)); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'STUDENT table error');
//     } else {
//         console.log("table STUDENT created");
//     }
// });
// //DEPARTMENT TABLE
// connection.query("CREATE TABLE Department (DEP_id int  AUTO_INCREMENT PRIMARY KEY,NAME varchar(50) not null); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'DEPARTMENT table error');
//     } else {
//         console.log("table DEPATRMENT created");
//     }
// });
//FACULTY REPLACEMENT TABLE
// connection.query("CREATE TABLE Faculty_Replacement (replacement_no int  AUTO_INCREMENT PRIMARY KEY,old_id int, new_id int, from_date date,to_date date); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'FAC_REPLACEMENT table error');
//     } else {
//         console.log("table FAC_REPLACEMENT created");
//     }
// });
// //LAB TABLE
// connection.query("CREATE TABLE Lab (LAB_CODE VARCHAR(20)  PRIMARY KEY,CREDITS INT, DEPARTMENT varchar(10), FACULTY varchar(50)); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'LAB table error');
//     } else {
//         console.log("table LAB created");
//     }
// });
// //COURSE TABLE
// connection.query("CREATE TABLE Course (COURSE_CODE varchar(10) PRIMARY KEY,COURSE_NAME VARCHAR(50), COURSE_CREDITS INT, dept varchar(20)); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'COURSE table error');
//     } else {
//         console.log("table COURSE created");
//     }
// });
// //CLASS TABLE
// connection.query("CREATE TABLE Class (ROOM_NO int  AUTO_INCREMENT PRIMARY KEY,DEPARTMENT_ID INT, BATCH VARCHAR(20), SECTION VARCHAR(20)); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'CLASS table error');
//     } else {
//         console.log("table CLASS created");
//     }
// });
// //TIME TABLE TABLE
// connection.query("CREATE TABLE Time_table (day varchar(20), slot int,dept_name varchar(20),course_name varchar(50), SECTION VARCHAR(5),semester int, primary key(slot,day,dept_name,section,semester)); ", (err, rows) => {
//     if (err) {
//         console.log(err.sqlMessage, 'TIME_TABLE table error');
//     } else {
//         console.log("table TIME TABLE created");
//     }
// });



app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    connection.query("select * from users where email = ?", [email], async function (error, result, fields) {
        if (error) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
        } else {
            console.log(result);
            if (result.length > 0) {
                if (result[0].password == password) {
                    res.send({
                        "code": 200,
                        "message": "login sucessfull 🙌",
                        "name": result[0].fullname,
                        "role": result[0].role,
                    })
                }
                else {
                    res.send({
                        "code": 204,
                        "message": "Email and password does not match 🤷‍♂️"
                    })
                }
            } else {
                res.send({
                    "code": 204,
                    "message": "This User is not registered 🤦‍♂️"
                })
            }

        }
    });
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const phonenumber = req.body.phonenumber;

    connection.query(`INSERT INTO users(fullname,email,phonenumber,password,role) VALUES('${fullname}','${email}','${phonenumber}','${password}','Admin');`, (err, rows) => {
        if (err) {
            console.log(err, "inserted initial values already");
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
        } else {
            res.send({
                "code": 200,
                "message": "Admin registerd successfully"
            })
        }

    })
})

app.post('/api/getdata/:table', (req, res) => {
    const tName = req.params.table;
    connection.query(`SELECT * FROM ${tName}`, (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "fetched data successfully",
                "content": result
            })
        }
    });
});

app.post('/api/insert/:table', (req, res) => {
    console.log('req body', req.body);
    const tName = req.params.table;
    var values = Object.values(req.body);
    const name = String(req.body.name);
    const email = String(req.body.email);
    var role = '';
    var password = '';
    if (tName === 'Student') {
        role = 'Student';
        password = String(req.body.email);
    } else if (tName === 'Faculty') {
        role = 'Faculty',
            password = String(req.body.email + req.body.name);
    }

    if (tName === 'Student' || tName === 'Faculty') {
        connection.query(`insert into ${tName} values (?);INSERT into users(fullname, email, password, role) values ('${name}','${email}','${password}','${role}');`, [values], (err, result, FIELDS) => {
            if (err) {
                res.send({
                    "code": 400,
                    "message": "error ocurred.Please try again later 😉"
                })
                console.log(err);
            } else {
                res.send({
                    "code": 200,
                    "message": "inserted into db successfully"
                })
            }
        });
    } else {
        connection.query(`insert into ${tName} values (?);`, [values], (err, result, FIELDS) => {
            if (err) {
                res.send({
                    "code": 400,
                    "message": "error ocurred.Please try again later 😉"
                })
                console.log(err);
            } else {
                res.send({
                    "code": 200,
                    "message": "inserted into db successfully"
                })
            }
        });
    }

});

app.post('/api/delete/:table', (req, res) => {
    const tName = req.params.table;
    var id = req.body[1][0];
    var values = req.body[0][id];
    connection.query(`delete from ${tName} where ${id} = ?;`, [values], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "deleted from db successfully"
            })
        }
    });
});

app.post('/api/update/:table', (req, res) => {
    const tName = req.params.table;
    console.log(req);
    var id = req.body[1][0];
    var values = req.body[0];
    connection.query(`update  ${tName} set ? where ${id} = ${req.body[0][id]};`, [values], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "updated from db successfully"
            })
        }
    });
});

app.post('/api/query', (req, res) => {
    var query = Object.keys(req.body);
    connection.query(query[0], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/query/dept', (req, res) => {
    var values = Object.keys(req.body);
    connection.query('select course_name from Course where dept = ?', [values[0]], (err, result, FIELDS) => {

        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/query/time1', (req, res) => {
    var values = Object.keys(req.body);
    connection.query('select branch,section,semester from Student where name = ?', [values[0]], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/query/time2', (req, res) => {
    var values = Object.keys(req.body);
    connection.query('select subject from Faculty where name = ?', [values[0]], (err, result, FIELDS) => {
        console.log("fac res", result);
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/query/time3', (req, res) => {
    connection.query('select day,slot,course_name from Time_table where dept_name = ? and section = ? and semester = ?', [req.body.branch, req.body.section, req.body.semester], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/query/time4', (req, res) => {
    console.log('fac1 res', req);
    connection.query('select day,slot,dept_name,section,semester from Time_table where course_name = ?', [req.body.subject], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/timetable', (req, res) => {
    var keys = Object.keys(req.body);
    var values = Object.values(req.body);
    connection.query('insert into Time_table values (?)', [values], (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": err.code + "  " + err.sqlMessage
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/stats', (req, res) => {
    connection.query('select count(*) from Student;select count(*) from Faculty; select count(*) from Department; select count(*) from Lab; select count(*) from Course;', (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});

app.post('/api/stats1', (req, res) => {
    connection.query('select count(course_code) from Course where dept = "IT"; select count(course_code) from Course where dept = "CSE";select count(course_code) from Course where dept = "ECE"; select count(course_code) from Course where dept = "CIVIL"; select count(course_code) from Course where dept = "MECH"; ', (err, result, FIELDS) => {
        if (err) {
            res.send({
                "code": 400,
                "message": "error ocurred.Please try again later 😉"
            })
            console.log(err);
        } else {
            res.send({
                "code": 200,
                "message": "query exected",
                "data": result
            })
        }
    });
});



const port = process.env.PORT || $PORT;
console.log(port);
app.listen(port, () => {
    console.log(`running on port ${port}`);
});