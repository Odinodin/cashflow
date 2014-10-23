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

    drawChart: function (props) {
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
                            data: props.netIncomeByMonth.income,
                            dataLabels: {
                                enabled: false,
                                color: "#c0c0c0"
                            },
                            color: "#87ba82"
                        },
                        {
                            name: 'Expenses',
                            data: props.netIncomeByMonth.expenses,
                            dataLabels: {
                                enabled: false,
                                color: "#c0c0c0"
                            },
                            color: "#ff7472"
                        }
                    ]
                }));
    },

    componentDidMount: function () {
        this.drawChart(this.props);
    },

    shouldComponentUpdate: function (props) {
        this.drawChart(props);
        return false;
    },

    render: function () {
        return R.div({id: "graph"});
    }
});


var GraphsPage = React.createClass({
        displayName: "GraphsPage",

        propTypes: {
            netIncomeByMonth: React.PropTypes.object.isRequired
        },

        getInitialState: function () {
            return {
                netIncomeByMonth: {
                    income: [],
                    expenses: []}};
        },

        jsonToExpenses: function (json) {
            return cull.map(function (obj) {
                return [obj.time, obj.expense * -1];
            }, json);
        },

        jsonToIncome: function (json) {
            return cull.map(function (obj) {
                return [obj.time, obj.income];
            }, json);
        },

        componentDidMount: function () {
            // TODO Retrieve data from server
            superagent.get('/api/transactions/net-income')
                .end(function (res) {
                    this.setState({netIncomeByMonth: {
                        income: this.jsonToIncome(res.body),
                        expenses: this.jsonToExpenses(res.body)}})
                }.bind(this));

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
    })
    ;

React.renderComponent(GraphsPage({}), document.body);