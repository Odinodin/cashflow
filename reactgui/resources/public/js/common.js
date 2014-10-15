/* Menu */


var commonComponents = (function() {
    var Menu = React.createClass({
        render: function () {
            return R.ul({className: "navbar"},
                [R.li({className: "title"}, "Cashflow"),
                    R.li({className: "nav-item"}, R.a({"href": "categories.html"}, "Categories")),
                    R.li({className: "nav-item"}, R.a({"href": "index.html"}, "Transactions")),
                    R.li({className: "nav-item"}, R.a({"href": "/graphs"}, "Graphs"))]
            )
        }
    });


    /* Time filter */
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

    return {
        Menu: Menu,
        TimeFilter: TimeFilter
    }

}());

