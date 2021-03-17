import React, {useContext} from 'react'
import Chart from 'chart.js'
import { Bar, Doughnut, defaults } from 'react-chartjs-2'
import { GlobalContext } from '../../context/GlobalState'
import { IncomeExpenses } from '../IncomeExpenses'
import { AppContext } from '../../context/AppContext'
import "./Chart.scss";

defaults.global.legend.position = 'bottom'

export const ChartV = () => {

const context = useContext(AppContext);

    return (<AppContext.Provider>
        
    <div className="chart-container">

        <Doughnut height={400}
        data={{
           labels: ['Expenses', 'Incomes'],
           datasets: [
               {
                   label: '# of votes',
                   data: [ context.tempExpense, context.tempIncome ],  
                   backgroundColor: [     
                       'rgba(217, 30, 24, 0.75)',
                       'rgba(54, 162, 235, 0.75)',
                       ],
                   borderColor: [
                       'rgba(217, 30, 24, 1)',
                       'rgba(54, 162, 235, 1)',
                       ],
                   borderWidth: 3,
               }
           ]
        }}
        options={{
            maintainAspectRatio:false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                           beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                labels: {
                 fontSize: 16,  
                 fontFamily: 'Lato', 
                },                
            },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 3
            }
        }
            
        }} /> 
           
        </div>
        </AppContext.Provider>
     
    );
}
