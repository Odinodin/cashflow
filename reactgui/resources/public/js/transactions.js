var R = React.DOM;

/* Transactions */
var TransactionSummaryTable = React.createClass({
    render: function () {
        return R.table({className: "bg-box padded"},
            [
                R.thead({},
                    R.tr({},
                        [
                            R.th({}, "Tag"),
                            R.th({}, "Amount")
                        ])
                ),
                R.tbody({},
                    R.tr({},
                        [
                            R.td({}, R.div({className: "tag"}, "Hardcoded tagname")),
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
                            R.th({}, "Tags")
                        ])),
                    R.tbody({},
                        R.tr({}, [
                                R.td({}, "some date"),
                                R.td({}, "Code"),
                                R.td({}, "Something somthing"),
                                R.td({}, "1234"),
                                R.td({}, "Hardcoded tagname")
                            ]
                        )
                    )
                ]
            )
        }
    }
);

/* Menu */
var Menu = React.createClass({
    render: function () {
        return R.ul({className: "navbar"},
            [R.li({className: "title"}, "Cashflow"),
                R.li({className: "nav-item"}, R.a({"href": "tags.html"}, "Tags")),
                R.li({className: "nav-item"}, R.a({"href": "transactions.html"}, "Transactions")),
                R.li({className: "nav-item"}, R.a({"href": "/graphs"}, "Graphs"))]
        )
    }
});

var TransactionPage = React.createClass({
    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TransactionSummaryTable(),
                TransactionsTable()
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);
