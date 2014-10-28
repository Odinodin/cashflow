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
                        var categoryName = sum.category;
                        if (categoryName === null) categoryName = "?";

                        return R.tr({}, [
                            R.td({}, R.div({className: "category"}, categoryName)),
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
        var comp = [];
        if (trans.category) {
            var td = R.div({
                className: "category",
                onClick: function () {
                    this.props.onEditTransaction(trans.id)
                }.bind(this)}, trans.category)
            comp.push(td);
        } else {
            var td = R.div({
                className: "category category-missing",
                onClick: function () {
                    this.props.onEditTransaction(trans.id)
                }.bind(this)}, "?");
            comp.push(td);
        }

        var isThisRowBeingEdited = (transactionBeingEdited === trans.id);
        if (isThisRowBeingEdited) {
            var cells = this.props.categories.map(function (category) {
                return R.div({
                    className: "category category-candidate fade-in",
                    onClick: function () {
                        this.props.onChangeTransactionCategory(trans.id, category.name)
                    }.bind(this)
                }, category.name);

            }, this);
            comp.push(cells);
        }

        return R.td({className: "wide50"}, comp);

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

    },

    loadAvailableYears: function () {
        superagent.get("/api/transactions/time/years")
            .end(function (res) {
                this.setState({years: res.body.years});
                // TODO Ugly hack, introduce promises instead
                // I.e need to first get years before loading transactions
                this.loadTransactionsFromServer(this.state.timeFilter);
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