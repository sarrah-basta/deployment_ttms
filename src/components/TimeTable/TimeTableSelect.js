import React, { useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function TimeTableSelect() {
    const [dept, setDept] = React.useState([]);
    const [course, setCourse] = React.useState([]);
    const [deptVal ,setDepVal] = React.useState('DEFAULT');
    const [courseVal ,setCourseVal] = React.useState('DEFAULT');

    useEffect(() => {
        const getData = async () => {
            const query = "Select name from Department"
            return axios
            .post(`http://0.0.0.0:$PORT/api/query`,query)
            .then((res) => {
              if (res.data.code === 200){
                setDept (res.data.data);
              } else {
                console.log(res.data.message)
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
        getData();
        console.log("dept selected--",deptVal)
        
        if (deptVal !== 'DEFAULT') {
            const Data = async () => {
                await axios
                .post(`http://0.0.0.0:$PORT/api/query/dept`,deptVal)
                .then((res) => {
                  if (res.data.code === 200){
                    setCourse(res.data.data);
                    console.log('response mesage', res.data.data);
                  } else {
                    console.log(res.data.message)
                  }
                })
                .catch(err => {
                  console.error(err);
                });
            }
            Data();
        }
    }, [deptVal]);
    console.log('dept',dept,'COURSE',course);

    const submitform = (e) => {
        e.preventDefault();
        let data = {
            day : document.getElementById('day').value,
            slot: parseInt(document.getElementById('slot').value),
            dept_name : deptVal,
            course_name : courseVal,
            section : document.getElementById('sec').value,
            Semester: document.getElementById('sem').value
        }
        
        axios
            .post(`http://0.0.0.0:$PORT/api/timetable`,data)
            .then((res) => {
              if (res.data.code === 200){
                  console.log('inserted into Time_table table');
                  alert('inserted into Time_table table');
              } else {
                console.log(res.data.message);
                alert('Error: This slot is taken!!!');
              }
            })
            .catch(err => {
              console.error(err);
            });
    }

    const dropdownChanged =(e) => {
        setDepVal(e.target.value)
    }
    const dropdownChanged1 =(e) => {
        setCourseVal(e.target.value)
    }

  return (
    <Form id='form1' onSubmit={submitform}>
    <FormGroup>
        <legend>DAY</legend>
        <Input type="select" name="day" id="day" required>
            <option disabled selected value> -- select an option -- </option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
        </Input>
    </FormGroup>
    <FormGroup>
        <legend>SLOT</legend>
        <Input type="select" name="slot" id="slot" required>
            <option disabled selected value> -- select an option -- </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
        </Input>
    </FormGroup>
    <FormGroup>
        <legend>DEPARTMENT</legend>
        <select class="form-control" id="dept" value={deptVal} onChange={dropdownChanged}>
            <option disabled value='DEFAULT'> -- select an option -- </option>
            {dept.map(d =>
                <option key={d.name} value={d.name}>{d.name}</option>
            )};
        </select>
    </FormGroup>
    <FormGroup>
        <legend>SUBJECT</legend>
        <select class="form-control" id="sub" value={courseVal} onChange={dropdownChanged1}>
            <option disabled value='DEFAULT'> -- select an option -- </option>
            {course.map(d =>
                <option key={d.course_name} value={d.course_name}>{d.course_name}</option>
            )};
        </select>
    </FormGroup>
    <FormGroup>
      <legend>SECTION</legend>
        <Input type="select" name="sec" id="sec" required>
          <option disabled selected value> -- select an option -- </option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <legend>SEMESTER</legend>
        <Input type="select" name="sem" id="sem" required>
            <option disabled selected value> -- select an option -- </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
        </Input>
    </FormGroup>
    <Button outline color="success">Submit</Button>
    </Form>
  );
}

 