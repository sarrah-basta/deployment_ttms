import React,{ useEffect } from 'react';
import MaterialTable from 'material-table';
import TableData from './LandingPage/tabledata';
import axios from 'axios';
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export default function MaterialTableDemo(props) {

  const { active } = props;

  //function to access the nested object by string literals
  Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
  }

  var temp = Object.byString(TableData,active)
  const [tableKey, setTableKey] = React.useState(0);
  

  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        setTableKey(0);
        await axios
        .post(`http://127.0.0.0:port/api/getdata/${active}`)
        .then((res) => {
          if (res.data.code === 200){
            temp.data = res.data.content
          } else {
            console.log(active,res.data.message)
          }
        })
        .catch(err => {
          console.error(err);
        });
        setState(temp);
        setTableKey(1);
        console.log('state',state);
      }
      getData();
    },1200);
  }, [temp]);

  
  const [state, setState] = React.useState(temp);
  

  const tableName = active+" "+"Information";

  const insert = (props) => {
    axios
      .post(`http://127.0.0.0:port/api/insert/${active}`,props)
      .then((res) => {
        if (res.data.code === 200){
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
    return props;
  }

  const deleteRow = (props) => {
    var data = [];
    data.push(props);
    data.push(Object.keys(props));
    axios
      .post(`http://127.0.0.0:port/api/delete/${active}`,data)
      .then((res) => {
        if (res.data.code === 200){
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
    return props;
  }

  const update = (props) => {
    var data = [];
    
    data.push(props);
    data.push(Object.keys(props));
    console.log('props', props,data);
    axios
      .post(`http://127.0.0.0:port/api/update/${active}`,data)
      .then((res) => {
        if (res.data.code === 200){
          console.log(res.data.message);
        } else {
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
    return props;
  }
  return (
    tableKey ===1 ? 
    <MaterialTable
      icons={tableIcons}
      title={tableName}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(insert(newData));
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = update(newData);
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(deleteRow(oldData)), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    /> : <ReactLoading type={"bubbles"} color={"#16a596"} />
  ); 
}