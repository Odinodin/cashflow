var R = React.DOM;
var p = React.PropTypes;

/* Transactions */
var TransactionSummaryTable = React.createClass({
    displayName: "TransactionSummaryTable",

    propTypes: {
        transactionSums: p.array.isRequired
    },

    render: function () {
        return R.div({className: "bg-box padded"}, R.table({},
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

                        var categoryDiv;
                        if (sum.category !== null) {
                            categoryDiv = R.div({className: "category"}, sum.category);
                        } else {
                            categoryDiv = R.div({className: "category category-missing"}, "?");
                        }

                        return R.tr({}, [
                            R.td({}, categoryDiv),
                            R.td({}, R.div({}, sum.sum))])
                    }.bind(this))
                )
            ]
        ))
    }
});


var TransactionsFilter = React.createClass({
    displayName: "TransactionsFilter",

    propTypes: {
        filter: p.shape({
            showCategorized: p.bool.isRequired,
            showUncategorized: p.bool.isRequired
        }).isRequired,
        onFilterChange: p.func.isRequired
    },

    handleCategoryChange: function(event) {
        this.props.onFilterChange({
            showCategorized: event.target.checked,
            showUncategorized: this.props.filter.showUncategorized
        });
    },

    handleNoCategoryChange: function(event) {
        this.props.onFilterChange({
            showCategorized: this.props.filter.showCategorized,
            showUncategorized: event.target.checked});
    },
        
    render: function() {

        return R.div({className: "bg-box padded"}, [
                R.input({type:"checkbox", checked: this.props.filter.showCategorized, onChange: this.handleCategoryChange}, "Category"),
                R.input({type:"checkbox", checked: this.props.filter.showUncategorized, onChange: this.handleNoCategoryChange}, "No category")
            ]);
    }

});

var TransactionRow = React.createClass({
    displayName: "TransactionRow",

    propTypes: {
        transaction: p.object.isRequired,
        categories: p.array.isRequired,
        onEditTransaction: p.func.isRequired,
        transactionBeingEdited: p.string,
        onChangeTransactionCategory: p.func.isRequired
    },

    suggestedCategoryForTrans: function (trans, categories) {

        var suggested = cull.select(function (cat) {
            return cull.some(function (match) {
                return trans.description.toUpperCase().indexOf(match.toUpperCase()) > -1
            }, cat.matches);
        }, categories);
        return suggested[0];
    },

    categoryComponent: function (trans, transactionBeingEdited, categories) {
        var comp = [];
        var hasCategory = trans.category;
        if (hasCategory) {
            // Transaction has a category
            var td = R.div({
                className: "category",
                onClick: function () {
                    this.props.onEditTransaction(trans.id)
                }.bind(this)
            }, trans.category);
            comp.push(td);
        } else {
            // Transaction has no category assigned
            var noCategoryDiv = R.div({
                className: "category category-missing",
                onClick: function () {
                    this.props.onEditTransaction(trans.id)
                }.bind(this)
            }, "?");
            comp.push(noCategoryDiv);
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

        if (!isThisRowBeingEdited && !hasCategory) {
            var suggestedCategory = this.suggestedCategoryForTrans(trans, categories);

            if (suggestedCategory) {
                var suggestedCategoryDiv = R.div({
                    className: "category category-suggestion",
                    onClick: function () {
                        this.props.onChangeTransactionCategory(trans.id, suggestedCategory.name)
                    }.bind(this)
                }, suggestedCategory.name + "?");
                comp.push(suggestedCategoryDiv);
            }
        }

        return R.td({className: "wide50"}, comp);

    },

    render: function () {
        return R.tr({className: "transaction-row"}, [
                R.td({}, this.props.transaction.date),
                R.td({}, this.props.transaction.code),
                R.td({}, this.props.transaction.description),
                R.td({}, this.props.transaction.amount),
                this.categoryComponent(this.props.transaction, this.props.transactionBeingEdited, this.props.categories)
            ]
        )
    }
});

var TransactionsTable = React.createClass({
        displayName: "TransactionsTable",

        propTypes: {
            onChangeTransactionCategory: p.func.isRequired,
            categories: p.array.isRequired,
            transactionsFilter: p.shape({
                showCategorized: p.bool.isRequired,
                showUncategorized: p.bool.isRequired
            }).isRequired
        },

        render: function () {
            return R.div({className: "bg-box padded"}, R.table({}, [
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

                            var shouldShow = (transaction.category && this.props.transactionsFilter.showCategorized) ||
                                (!transaction.category && this.props.transactionsFilter.showUncategorized);
                            if (!shouldShow) {
                                return null;
                            }

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
            ))
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
            timeFilter: {year: 2009, month: null},
            transactionsFilter: {
                showCategorized: true,
                showUncategorized: true}
        };
    },

    componentDidMount: function () {
        this.loadAvailableYears();
        this.loadCategoriesFromServer();
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
                    transactionSums: res.body
                });
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
                    transactionBeingEdited: "none"
                });
            }.bind(this));

        this.loadTransactionSumsFromServer(timeFilter);
    },

    onTimeFilterChange: function (timeFilter) {
        this.setState({timeFilter: timeFilter});
        this.loadTransactionsFromServer(timeFilter);
    },

    onTransactionFilterChange: function (transactionFilter) {
        console.log ("filter:" , transactionFilter) ;
        this.setState({transactionsFilter: transactionFilter})
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
                    onFilterChange: this.onTimeFilterChange
                }),
                TransactionSummaryTable({
                    transactionSums: this.state.transactionSums
                }),
                TransactionsFilter({
                    filter: this.state.transactionsFilter,
                    onFilterChange: this.onTransactionFilterChange
                }),
                TransactionsTable({
                    transactions: this.state.transactions,
                    categories: this.state.categories,
                    transactionBeingEdited: this.state.transactionBeingEdited,
                    onChangeTransactionCategory: this.onChangeTransactionCategory,
                    onEditTransaction: this.onEditTransaction,
                    transactionsFilter: this.state.transactionsFilter
                })
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);