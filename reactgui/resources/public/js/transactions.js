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
            console.log("transactions: ", this.props);
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

    getInitialState: function() {
        return {transactions: []};
    },

    componentDidMount: function(){
        this.loadTransactionsFromServer();
    },

    // Retrieve transations from API
    loadTransactionsFromServer: function () {
        superagent.get('/api/transactions')
            .end(function (res) {
                console.log("TRANS: ", res.body);
                this.setState({transactions: res.body});
            }.bind(this));
    },

    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TransactionSummaryTable(),
                TransactionsTable({transactions: this.state.transactions})
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);