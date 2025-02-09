import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import moment from 'moment';

// Register Chart.js components
ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title
);

const Dashboard = ({ tasks }) => {
    // Helper function to filter tasks by status
    const getCompletedTasks = (tasks) => tasks.filter(task => task.status === 'Completed').length;

    // 1. Task Distribution by Priority
    const priorityCounts = tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
    }, {});

    const taskDistributionData = {
        labels: Object.keys(priorityCounts),
        datasets: [
            {
                data: Object.values(priorityCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // 2. Completion Rate Over Time
    const tasksByDate = tasks.reduce((acc, task) => {
        const date = moment(task.dueDate).format('YYYY-MM-DD');
        if (!acc[date]) {
            acc[date] = { completed: 0, total: 0 };
        }
        acc[date].total += 1;
        if (task.status === 'Completed') {
            acc[date].completed += 1;
        }
        return acc;
    }, {});

    
    
    const sortedDates = Object.keys(tasksByDate).sort();
    const completionRateData = {
        labels: sortedDates,
        datasets: [
            {
                label: 'Completion Rate (%)',
                data: sortedDates.map(date => {
                    const { completed, total } = tasksByDate[date];
                    return total > 0 ? (completed / total) * 100 : 0;
                }),
                borderColor: '#36A2EB',
                fill: false,
            },
        ],
    };

    // 3. Upcoming Deadlines
    const upcomingDeadlines = tasks
        .filter(task => moment(task.dueDate).isAfter(moment()) && task.status !== 'Completed')
        .sort((a, b) => moment(a.dueDate).diff(moment(b.dueDate)))
        .slice(0, 5); // Show the next 5 upcoming tasks

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Analytical Dashboard</h2>

            {/* Task Distribution by Priority */}
            <div className="card mb-4 d-flex d-flex flex-row flex-1 flex-wrap">
                <div className="card-body" style={{width:"50%"}}>
                    <h5 className="card-title">Task Distribution by Priority</h5>
                    <div className="chart-container" style={{width:"50%"}}>
                        <Pie data={taskDistributionData} />
                    </div>
                </div>
                 {/* Completion Rate Over Time */}
                <div className="card-body">
                    <h5 className="card-title">Completion Rate Over Time</h5>
                    <div className="chart-container" style={{minHeight:"250px", minWidth:"300px",width:"50%"}}>
                        <Line
                            data={completionRateData}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        max: 100,
                                        ticks: {
                                            callback: (value) => `${value}%`,
                                        },
                                    },
                                },
                            }}
                        style={{ width: '100%', height: '100vh' }}
                        />
                    </div>
                </div>
            </div>

           


            {/* Upcoming Deadlines */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Upcoming Deadlines</h5>
                    <ul className="list-group">
                        {upcomingDeadlines.map(task => (
                            <li key={task._id} className="list-group-item">
                                <strong>{task.title}</strong> - Due: {moment(task.dueDate).format('MMM Do, YYYY')}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;