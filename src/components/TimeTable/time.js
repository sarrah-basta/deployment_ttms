import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import ReactLoading from "react-loading";
import { Button } from 'reactstrap';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';


export default function Demo () {
    const [flag, setFlag] = React.useState(0);

    const start_slot1 = [0 , 8, 9, 11, 12, 14, 15];
    const start_slot2 = [0, 50, 50, 0, 0, 0 ,0];
    const end_slot1 = [0, 9, 10, 11, 12, 14, 15];
    const end_slot2 = [0, 40, 40, 50, 50, 50, 50];
    const day = {
        'Monday':1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5
    }
    const today = 15;

    useEffect(() => {
        setFlag(0);
        console.log("timetable created");
        const role = localStorage.getItem('role');
        var name = '';
        if (role === 'Faculty') {
            name = localStorage.getItem('userName');
            axios
            .post(`http://127.0.0.0:port/api/query/time2`,name)
            .then((res) => {
              console.log('gotta 1st response',res);
            if (res.data.code === 200){
                axios
                .post(`http://127.0.0.0:port/api/query/time4`,(res.data.data[0]))
                .then((result) => {
                  console.log('sexond resoone', result)
                if (res.data.code === 200){
                    let faculty = result.data.data;
                    faculty.map(fac => (
                        appointments.push({
                            title: `${fac.dept_name} - ${fac.section}         ( ${Math.ceil(fac.semester/2)} YEAR)`,
                            startDate: new Date(2020, 10, today+day[fac.day], start_slot1[fac.slot], start_slot2[fac.slot]),
                            endDate: new Date(2020, 10, today+day[fac.day], end_slot1[fac.slot], end_slot2[fac.slot]),
                            id: fac,
                          })
                    ));
                    console.log("apoint", appointments);
                    console.log('state', state);
                    setState({data: appointments});
                    setFlag(1);
                    
                } else {
                    console.log(result.data.message)
                }
                })
                .catch(err => {
                console.error(err);
                });
            } else {
                console.log(res.data.message)
            }
            })
            .catch(err => {
            console.error(err);
            });

        } else if (role === 'Student') {
            name = localStorage.getItem('userName');
            axios
            .post(`http://127.0.0.0:port/api/query/time1`,name)
            .then((res) => {
            if (res.data.code === 200){
                console.log("1st reapsone",res.data.data);
                axios
                .post(`http://127.0.0.0:port/api/query/time3`,(res.data.data[0]))
                .then((result) => {
                if (res.data.code === 200){
                    let student = result.data.data;
                    console.log(start_slot1);
                    student.map(stud => (
                        appointments.push({
                            title: stud.course_name,
                            startDate: new Date(2020, 10, today+day[stud.day], start_slot1[stud.slot], start_slot2[stud.slot]),
                            endDate: new Date(2020, 10, today+day[stud.day], end_slot1[stud.slot], end_slot2[stud.slot]),
                            id: stud,
                          })
                    ));
                    console.log("apoint", appointments);
                    console.log('state', state);
                    setState({data: appointments});
                    setFlag(1);
                    
                } else {
                    console.log(result.data.message)
                }
                })
                .catch(err => {
                console.error(err);
                });
            } else {
                console.log(res.data.message)
            }
            })
            .catch(err => {
            console.error(err);
            });
            
        }
    }, []);

    const logout = () => {
      localStorage.clear();
      window.location.href = '/';
    }

    const appointments = [
        
    ];
    const [state, setState] = React.useState({data: appointments});
    console.log(appointments);
    console.log('after mounting',state);
    const commitChanges = ({ added, changed, deleted }) => {
        setState((state) => {
          let { data } = state;
          if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
          }
          if (changed) {
            data = data.map(appointment => (
              changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
          }
          if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
          }
          return { data };
        });
  }

    return (
        flag === 1 ?
        <div>
        <Button color="danger" onClick={logout}>Exit</Button>
            <Paper>
      <Scheduler
        data={state.data}
      >
        <ViewState
          defaultCurrentDate="2020-11-16"
        />
        <EditingState
          onCommitChanges={commitChanges}
        />
        <WeekView
          startDayHour={8}
          endDayHour={17}
        />
        <MonthView />
        <Appointments />

        <Toolbar />
        <ViewSwitcher />

        <EditRecurrenceMenu />

        <DragDropProvider />
      </Scheduler>
    </Paper>
        </div>   : <ReactLoading type={"bubbles"} color={"#16a596"} />
    );
}