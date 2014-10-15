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

    months: [
        {index: 1, name: "Jan"},
        {index: 2, name: "Feb"},
        {index: 3, name: "Mar"},
        {index: 4, name: "Apr"},
        {index: 5, name: "May"},
        {index: 6, name: "Jun"},
        {index: 7, name: "Jul"},
        {index: 8, name: "Aug"},
        {index: 9, name: "Sep"},
        {index: 10, name: "Oct"},
        {index: 11, name: "Nov"},
        {index: 12, name: "Dec"}
    ],

    // Called when year filter changes. Invoke callback if value actually changed
    onYearChange: function (newYear) {
        if (this.props.timeFilter.year != newYear) {
            this.props.onFilterChange({year: newYear,
                month: this.props.timeFilter.month})
        }
    },

    // Called when month filter changes. Invoke callback if value actually changed
    onMonthChange: function (newMonth) {
        if (this.props.timeFilter.month != newMonth) {
            this.props.onFilterChange({
                year: this.props.timeFilter.year,
                month: newMonth})
        }
    },

    render: function () {
        return R.div({className: "bg-box padded"},
            [
                R.div({className: "container"},
                    this.props.years.map(function (year) {
                        // Check if selected
                        var buttonClasses = (this.props.timeFilter.year == year) ? "flat-button selected" : "flat-button";

                        return R.div({className: "item"},
                            R.button({
                                className: buttonClasses,
                                onClick: function () {
                                    this.onYearChange(year)
                                }.bind(this)
                            }, year)
                        )
                    }, this)
                ),
                R.div({className: "container"},
                    this.months.map(function (month) {
                        var buttonClasses = (this.props.timeFilter.month == month.index) ? "flat-button selected" : "flat-button";

                        return R.div({className: "item"},
                            R.button({
                                className: buttonClasses,
                                onClick: function () {
                                    this.onMonthChange(month.index)
                                }.bind(this)
                            }, month.name));
                    }, this)
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

    getInitialState: function () {
        return {
            transactions: [],
            years: [2012, 2013, 2014],
            timeFilter: {year: 2014, month: 1}
        };
    },

    componentDidMount: function () {
        this.loadTransactionsFromServer();
    },

    // Retrieve transations from API
    loadTransactionsFromServer: function () {
        superagent.get('/api/transactions')
            .end(function (res) {
                this.setState({transactions: res.body});
            }.bind(this));
    },

    onTimeFilterChange: function (timeFilter) {
        this.setState({timeFilter: timeFilter});
    },

    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TimeFilter({
                    years: this.state.years,
                    timeFilter: this.state.timeFilter,
                    onFilterChange: this.onTimeFilterChange}),
                TransactionSummaryTable(),
                TransactionsTable({transactions: this.state.transactions})
            ]);
    }
});

React.renderComponent(TransactionPage({}), document.body);