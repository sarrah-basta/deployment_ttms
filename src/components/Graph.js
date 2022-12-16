import React, {useEffect} from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';

export default function Graph() {

    const [flag, setFlag] = React.useState(0);
    
    useEffect(() => {
        setFlag(0);
        axios
        .post(`http://0.0.0.0:port/api/stats`)
        .then((res) => {
          if (res.data.code === 200){
              let record =[];
            for (let i = 0; i<((res.data.data).length); i+=1) {
                record.push(Object.values(res.data.data[i][0])[0]);
            }
            setRecords(record);
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.error(err);
        })
        axios
        .post(`http://0.0.0.0:port/api/stats1`)
        .then((res) => {
          if (res.data.code === 200){
              let record =[];
            for (let i = 0; i<((res.data.data).length); i+=1) {
                record.push(Object.values(res.data.data[i][0])[0]);
            }
            setRecords1(record);
          } else {
            console.log(res.data.message)
          }
        })
        .catch(err => {
          console.error(err);
        }).finally(() => {
            setFlag(1);
        })
    }, [])

    const [records, setRecords] = React.useState([]);
    const [records1, setRecords1] = React.useState([]);
    var data = {
        labels: ['Student', 'Faculty', 'Department', 'Laboratory', 'Course'],
        datasets: [
          {
            label: 'Distribution across Tables',
            data: records,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }

      var data1 = {
        labels: ['IT', 'CSE', 'ECE', 'CIVIL', 'MECH'],
        datasets: [
          {
            label: 'Distribution across Tables',
            data: records1,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
    console.log("falg value",flag);
    return (
        flag === 1 ?
        <>
            <Bar data={data} options={options} />
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <Pie data={data1} options={options} />
        </> : <div>Loading data's</div>
    )
}
