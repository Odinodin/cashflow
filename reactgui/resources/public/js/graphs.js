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

var GraphTypeSelector = React.createClass({
    displayName: "GraphTypeSelector",

    propTypes: {
        selectedGraphType: React.PropTypes.string.isRequired,
        graphTypes: React.PropTypes.array.isRequired,
        onChangeGraphType: React.PropTypes.func.isRequired
    },

    render: function() {
        return R.div({className: "container bg-box padded"},
            this.props.graphTypes.map(function(graphType) {
                var classes = "flat-button";
                if (this.props.selectedGraphType === graphType.name) {
                    classes += " selected";
                }

                return R.button({className: classes, onClick: function() {this.props.onChangeGraphType(graphType.name)}.bind(this)}, graphType.name)
            }.bind(this))
        )
    }
});

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

    propTypes: {
        netIncomeByMonth: React.PropTypes.object.isRequired
    },

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

    getDefaultProps: function() {
        return {
            graphTypes:[{name: "Net income"}, {name: "Categories"}]
        };
    },

    getInitialState: function () {
        return {
            selectedGraphType: "Net income",
            years: [],
            timeFilter: {},
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

    loadAvailableYears: function () {
        superagent.get("/api/transactions/time/years")
            .end(function (res) {
                this.setState({
                    years: res.body.years,
                    timeFilter: {year: res.body.years[res.body.years.length -1]}
                });

                // TODO Ugly hack, introduce promises instead
                // I.e need to first get years before loading sum by category
                this.loadSumByCategoryFromServer(this.state.timeFilter);

            }.bind(this));
    },

    loadSumByCategoryFromServer : function(timeFilter) {
        var route = '/api/transactions/sum/' + timeFilter.year;
        if (timeFilter.month) route += '/' + timeFilter.month;

        superagent.get(route)
            .end(function (res) {
                this.setState({sumByCategory: this.jsonToSumByTag(res.body)})
            }.bind(this));
    },

    loadNetIncomeFromServer: function() {
        superagent.get('/api/transactions/net-income')
            .end(function (res) {
                this.setState({netIncomeByMonth: {
                    income: this.jsonToIncome(res.body),
                    expenses: this.jsonToExpenses(res.body)}})
            }.bind(this));
    },

    componentDidMount: function () {
        this.loadAvailableYears();
        this.loadNetIncomeFromServer();
    },

    onTimeFilterChange: function (timeFilter) {
        this.setState({timeFilter: timeFilter});
        this.loadSumByCategoryFromServer(timeFilter)
    },

    onChangeGraphType: function(graphTypeSelected) {
        this.setState({selectedGraphType: graphTypeSelected});
    },

    render: function () {
        var comps = [
            commonComponents.Menu(),
            commonComponents.TimeFilter({
                years: this.state.years,
                timeFilter: this.state.timeFilter,
                onFilterChange: this.onTimeFilterChange}),
            GraphTypeSelector({
                graphTypes: this.props.graphTypes,
                selectedGraphType: this.state.selectedGraphType,
                onChangeGraphType: this.onChangeGraphType
            })
        ];

        // Decide which graphs to show
        if (this.state.selectedGraphType === 'Net income') {
            comps.push(GraphNetIncome({
                netIncomeByMonth: this.state.netIncomeByMonth
            }));
        } else if (this.state.selectedGraphType === 'Categories') {
            comps.push(GraphSumByCategory({
                sumByCategory: this.state.sumByCategory
            }));
        }

        return R.div({id: "main"}, comps);
    }
});

React.renderComponent(GraphsPage({}), document.body);