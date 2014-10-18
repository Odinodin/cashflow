var R = React.DOM;


/* Transactions */
var TransactionSummaryTable = React.createClass({
    displayName: "TransactionSummaryTable",

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


var TransactionRow = React.createClass({
    displayName: "TransactionRow",

    render: function() {
        return R.tr({}, [
                R.td({}, this.props.transaction.date),
                R.td({}, this.props.transaction.code),
                R.td({}, this.props.transaction.description),
                R.td({}, this.props.transaction.amount),
                (this.props.transaction.category) ? R.td({className: "tag"}, this.props.transaction.category) : null
            ]
        )

    }
});

var TransactionsTable = React.createClass({
        displayName: "TransactionsTable",

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
                        this.props.transactions.map(function (transaction) {
                            return TransactionRow({transaction: transaction});
                        }.bind(this))
                    )
                ]
            )
        }
    }
);

var TransactionPage = React.createClass({
    displayName: "TransactionPage",

    getInitialState: function () {
        return {
            transactions: [],
            years: [],
            timeFilter: {year: 2009, month: null}
        };
    },

    componentDidMount: function () {
        this.loadAvailableYears();
        this.loadTransactionsFromServer(this.state.timeFilter);
    },

    loadAvailableYears: function() {

        superagent.get("/api/transactions/time/years")
            .end(function (res) {
                this.setState({years: res.body.years});
            }.bind(this));
    },

    // Retrieve transations from API
    loadTransactionsFromServer: function (timeFilter) {
        var route = '/api/transactions/time/' + timeFilter.year;
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