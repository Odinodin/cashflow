var R = React.DOM;




/* Transactions */
var TransactionSummaryTable = React.createClass({
    render: function () {
        return R.table({className: "bg-box padded"},
            [
                R.thead({},
                    R.tr({},
                        [
                            R.th({}, "Category"),
                            R.th({}, "Amount")
                        ])
                ),
                R.tbody({},
                    R.tr({},
                        [
                            R.td({}, R.div({className: "tag"}, "Hardcoded category")),
                            R.td({}, R.div({}, "134"))]
                    )
                )
            ]
        )
    }
});

var TransactionsTable = React.createClass({
        render: function () {
            return R.table({className: "bg-box padded"}, [
                    R.thead({},
                        R.tr({}, [
                            R.th({}, "Date"),
                            R.th({}, "Code"),
                            R.th({}, "Description"),
                            R.th({}, "Amount"),
                            R.th({}, "Category")
                        ])),
                    R.tbody({},
                        this.props.transactions.map(function (trans) {
                            return R.tr({}, [
                                    R.td({}, trans.date),
                                    R.td({}, trans.code),
                                    R.td({}, trans.description),
                                    R.td({}, trans.amount),
                                    (trans.category) ? R.td({className: "tag"}, trans.category) : null
                                ]
                            )
                        }.bind(this))
                    )
                ]
            )
        }
    }
);

var TransactionPage = React.createClass({

    getInitialState: function () {
        return {
            transactions: [],
            years: [2009, 2010, 2012],
            timeFilter: {year: 2009, month: null}
        };
    },

    componentDidMount: function () {
        this.loadTransactionsFromServer(this.state.timeFilter);
    },

    // Retrieve transations from API
    loadTransactionsFromServer: function (timeFilter) {
        var route = '/api/transactions/' + timeFilter.year;
        if (timeFilter.month) route += '/' + timeFilter.month;

        superagent.get(route)
            .end(function (res) {
                this.setState({transactions: res.body});
            }.bind(this));
    },

    onTimeFilterChange: function (timeFilter) {
        this.setState({timeFilter: timeFilter});
        this.loadTransactionsFromServer(timeFilter);
    },

    render: function () {
        return R.div({id: "main"},
            [
                commonComponents.Menu(),
                commonComponents.TimeFilter({
                    years: this.state.years,
                    timeFilter: this.state.timeFilter,
                    onFilterChange: this.onTimeFilterChange}),
                TransactionSummaryTable(),
                TransactionsTable({transactions: this.state.transactions})
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);