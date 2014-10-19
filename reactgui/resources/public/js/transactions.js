var R = React.DOM;

/* Transactions */
var TransactionSummaryTable = React.createClass({
    displayName: "TransactionSummaryTable",

    propTypes: {
        transactionSums: React.PropTypes.array.isRequired
    },

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
                    this.props.transactionSums.map(function (sum) {
                        return R.tr({}, [
                            R.td({}, R.div({className: "tag"}, sum.category)),
                            R.td({}, R.div({}, sum.sum))])
                    }.bind(this))
                )

            ]
        )
    }
});

var TransactionRow = React.createClass({
    displayName: "TransactionRow",

    propTypes: {
        transaction: React.PropTypes.object.isRequired,
        categories: React.PropTypes.array.isRequired,
        onEditTransaction: React.PropTypes.func.isRequired,
        transactionBeingEdited: React.PropTypes.number,
        onChangeTransactionCategory: React.PropTypes.func.isRequired
    },

    categoryComponent: function (trans, transactionBeingEdited) {
        if (transactionBeingEdited === trans.id) {
            return this.props.categories.map(function (category) {

                return R.td({
                    className: "tag category-candidate",
                    onClick: function () {
                        this.props.onChangeTransactionCategory(trans.id, category.name)
                    }.bind(this)
                }, category.name);

            }, this);

        }

        if (trans.category) {
            return R.td({className: "tag", onClick: function () {
                this.props.onEditTransaction(trans.id)
            }.bind(this)}, trans.category)
        }

        return R.td({className: "tag category-missing", onClick: function () {
            this.props.onEditTransaction(trans.id)
        }.bind(this)}, "?");
    },

    render: function () {
        return R.tr({}, [
                R.td({}, this.props.transaction.date),
                R.td({}, this.props.transaction.code),
                R.td({}, this.props.transaction.description),
                R.td({}, this.props.transaction.amount),
                this.categoryComponent(this.props.transaction, this.props.transactionBeingEdited)
            ]
        )
    }
});

var TransactionsTable = React.createClass({
        displayName: "TransactionsTable",

        propTypes: {
            onChangeTransactionCategory: React.PropTypes.func.isRequired,
            categories: React.PropTypes.array.isRequired
        },

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
                            return TransactionRow({
                                transaction: transaction,
                                categories: this.props.categories,
                                transactionBeingEdited: this.props.transactionBeingEdited,
                                onChangeTransactionCategory: this.props.onChangeTransactionCategory,
                                onEditTransaction: this.props.onEditTransaction
                            });
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
            transactionSums: [],
            categories: [],
            years: [],
            timeFilter: {year: 2009, month: null}
        };
    },

    componentDidMount: function () {
        this.loadAvailableYears();
        this.loadTransactionsFromServer(this.state.timeFilter);
    },

    loadAvailableYears: function () {
        superagent.get("/api/transactions/time/years")
            .end(function (res) {
                this.setState({years: res.body.years});
            }.bind(this));
    },

    loadCategoriesFromServer: function () {
        superagent.get("/api/categories")
            .end(function (res) {
                this.setState({categories: res.body});
            }.bind(this));
    },

    loadTransactionSumsFromServer: function (timeFilter) {
        var route = '/api/transactions/sum/' + timeFilter.year;
        if (timeFilter.month) route += '/' + timeFilter.month;
        superagent.get(route)
            .end(function (res) {
                // Update transaction list and clear edit-state
                this.setState({
                    transactionSums: res.body});
            }.bind(this));

    },

    // Retrieve transations from API
    loadTransactionsFromServer: function (timeFilter) {
        var route = '/api/transactions/time/' + timeFilter.year;
        if (timeFilter.month) route += '/' + timeFilter.month;
        superagent.get(route)
            .end(function (res) {
                // Update transaction list and clear edit-state
                this.setState({
                    transactions: res.body,
                    transactionBeingEdited: -1});
            }.bind(this));

        this.loadTransactionSumsFromServer(timeFilter);
    },

    onTimeFilterChange: function (timeFilter) {
        this.setState({timeFilter: timeFilter});
        this.loadTransactionsFromServer(timeFilter);
    },

    onEditTransaction: function (transactionId) {
        this.loadCategoriesFromServer();
        this.setState({transactionBeingEdited: transactionId});
    },

    onChangeTransactionCategory: function (transactionId, category) {
        // A transaction has changed category; post the change to the backend and refresh state
        superagent.post("/api/transactions/" + transactionId)
            .send({id: transactionId, category: category})
            .set('Accept', 'application/json')
            .end(function (res) {
                if (res.ok) {
                    this.loadTransactionsFromServer(this.state.timeFilter);
                } else {
                    alert('Oh no! error ' + res.text);
                }
            }.bind(this));
    },

    render: function () {
        return R.div({id: "main"},
            [
                commonComponents.Menu(),
                commonComponents.TimeFilter({
                    years: this.state.years,
                    timeFilter: this.state.timeFilter,
                    onFilterChange: this.onTimeFilterChange}),
                TransactionSummaryTable({
                    transactionSums: this.state.transactionSums
                }),
                TransactionsTable({
                    transactions: this.state.transactions,
                    categories: this.state.categories,
                    transactionBeingEdited: this.state.transactionBeingEdited,
                    onChangeTransactionCategory: this.onChangeTransactionCategory,
                    onEditTransaction: this.onEditTransaction
                })
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);