var R = React.DOM;


//<div id="time_filter" class="bg-box padded">
//
//    <div id="years" class="container">
//    {% for year in years %}
//        <div class="item"><button class="flat-button {% ifequal current-year year %} selected {% endifequal %}" onclick="filterByYear({{year}})">{{year}}</button></div>
//    {% endfor %}
//    </div>
//    <div id="months" class="container">
//        <div class="item"><button class="flat-button {% if current-month = 1 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 1)">Jan</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 2 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 2)">Feb</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 3 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 3)">Mar</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 4 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 4)">Apr</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 5 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 5)">May</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 6 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 6)">Jun</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 7 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 7)">Jul</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 8 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 8)">Aug</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 9 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 9)">Sep</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 10 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 10)">Oct</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 11 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 11)">Nov</button></div>
//        <div class="item"><button class="flat-button {% if current-month = 12 %} selected {% endif %}" onclick="filterByMonth({{current-year}} , 12)">Dec</button></div>
//    </div>
//</div>


// TODO Extract in to common; parameterize callbacks, years, selected year, month
var TimeFilter = React.createClass({

    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    getInitialState: function() {
        return {years: [2012, 2013, 2014]};
    },

    render: function(){
        return R.div({className: "bg-box padded"},
            [
                R.div({className: "container"},
                    this.state.years.map(function(year) {
                        return R.div({className: "item"},
                            // TODO handle selected year
                            // TODO add click handler
                            R.button({className: "flat-button"}, year)
                        )
                    })
                ),
                R.div({className: "container"},
                    this.months.map(function(month) {
                        return R.div({className: "item"},
                            R.button({className: "flat-button"}, month));
                    })
                )
            ]
        )
    }
});


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
                this.setState({transactions: res.body});
            }.bind(this));
    },

    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TimeFilter(),
                TransactionSummaryTable(),
                TransactionsTable({transactions: this.state.transactions})
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);