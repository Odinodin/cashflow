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


var GraphSumByCategory = React.createClass({
    displayName: "GraphSumByCategory",

    // TODO add propTypes validation

    drawChart: function (props) {
        new Highcharts.Chart(
            Highcharts.merge(
                cashFlowChartTheme,
                {
                    chart: {
                        type: 'column',
                        renderTo: 'graphSumCategory'
                    },
                    xAxis: {
                        type: 'category'
                    },
                    series: [
                        {
                            name: 'Categories',
                            data: props.sumByCategory,
                            dataLabels: {
                                enabled: true,
                                color: "#c0c0c0"
                            }
                        }
                    ]
                }));
    },

    componentDidMount: function () {
        this.drawChart(this.props);
    },

    shouldComponentUpdate: function (props) {
        // Use prop argument instead of this.props
        this.drawChart(props);
        return false;
    },

    render: function () {
        return R.div({id: "graphSumCategory"});
    }
});


var GraphNetIncome = React.createClass({
    displayName: "GraphNetIncome",

    // TODO add propTypes validation

    drawChart: function (props) {
        new Highcharts.Chart(
            Highcharts.merge(
                cashFlowChartTheme,
                {
                    chart: {
                        type: 'column',
                        renderTo: 'graphNetIncome'
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
        // Use prop argument instead of this.props
        this.drawChart(props);
        return false;
    },

    render: function () {
        return R.div({id: "graphNetIncome"});
    }
});


var GraphsPage = React.createClass({
        displayName: "GraphsPage",

        propTypes: {
            netIncomeByMonth: React.PropTypes.object.isRequired
        },

        getInitialState: function () {
            return {
                sumByCategory: [],
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

        jsonToSumByTag: function (json) {
            return cull.map(function (tagWithSum) {

                return [tagWithSum.category, Math.abs(tagWithSum.sum)];
            }, json);
        },

        componentDidMount: function () {
            superagent.get('/api/transactions/net-income')
                .end(function (res) {
                    this.setState({netIncomeByMonth: {
                        income: this.jsonToIncome(res.body),
                        expenses: this.jsonToExpenses(res.body)}})
                }.bind(this));

            superagent.get('/api/transactions/sum/2009')
                .end(function (res) {
                    this.setState({sumByCategory: this.jsonToSumByTag(res.body)})
                }.bind(this));
        },


        render: function () {
            return R.div({id: "main"},
                [
                    commonComponents.Menu(),
                    GraphNetIncome({
                        netIncomeByMonth: this.state.netIncomeByMonth
                    }),
                    GraphSumByCategory({
                        sumByCategory: this.state.sumByCategory
                    })
                ]);
        }
    });

React.renderComponent(GraphsPage({}), document.body);