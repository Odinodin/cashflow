var R = React.DOM;


var cashFlowChartTheme = {
    colors: ['#ff7472', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
        '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: '#1a1a1a'
    },
    title: null,
    subtitle: {
        style: {
            color: '#c0c0c0',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: '#c0c0c0'
        },
        itemHoverStyle: {
            color: 'gray'
        }
    },

    xAxis: {
        labels: {
            style: {color: '#c0c0c0'}
        }
    },

    yAxis: {
        labels: {
            style: {color: '#c0c0c0'}
        }
    }
};

var GraphNetIncome = React.createClass({
    displayName: "GraphNetIncome",


    componentDidMount: function () {
        new Highcharts.Chart(
            Highcharts.merge(
                cashFlowChartTheme,
                {
                    chart: {
                        type: 'column',
                        renderTo: 'graph'
                    },
                    xAxis: {
                        type: 'category'
                    },
                    series: [
                        {
                            name: 'Income',
                            data: this.props.netIncomeByMonth.income,
                            dataLabels: {
                                enabled: false,
                                color: "#c0c0c0"
                            },
                            color: "#87ba82"
                        },
                        {
                            name: 'Expenses',
                            data: this.props.netIncomeByMonth.expenses,
                            dataLabels: {
                                enabled: false,
                                color: "#c0c0c0"
                            },
                            color: "#ff7472"
                        }
                    ]
                }));
    },

    render: function () {
        return R.div({id: "graph"});
    }
});


var GraphsPage = React.createClass({
    displayName: "GraphsPage",

    getInitialState: function () {
        // TODO test data for now
        return {netIncomeByMonth: {income: [
            [1, 10],
            [2, 20]
        ], expenses: [
            [1, 30],
            [2, 10]
        ]}};
    },

    componentDidMount: function () {
        // TODO Retrieve data from server
    },

    render: function () {
        return R.div({id: "main"},
            [
                commonComponents.Menu(),
                GraphNetIncome({
                    netIncomeByMonth: this.state.netIncomeByMonth
                })
            ]);
    }
});

React.renderComponent(GraphsPage({}), document.body);