/* Menu */


var commonComponents = (function () {
    var Menu = React.createClass({
        displayName: "Menu",

        render: function () {
            return R.ul({className: "navbar"},
                [R.li({className: "title"}, "Cashflow"),
                    R.li({className: "nav-item"}, R.a({"href": "categories.html"}, "Categories")),
                    R.li({className: "nav-item"}, R.a({"href": "index.html"}, "Transactions")),
                    R.li({className: "nav-item"}, R.a({"href": "graphs.html"}, "Graphs"))]
            )
        }
    });

    /* Time filter */
    var TimeFilter = React.createClass({
        displayName: "TimeFilter",

        // Validation
        propTypes: {
            onFilterChange: React.PropTypes.func.isRequired,
            timeFilter: React.PropTypes.object.isRequired,
            years: React.PropTypes.array.isRequired
        },

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
            this.props.onFilterChange({
                year: newYear,
                month: null});
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
                        this.props.years.map(function (year, index) {
                            // Check if selected
                            var buttonClasses = (this.props.timeFilter.year == year) ? "flat-button selected" : "flat-button";

                            return R.div({key: index, className: "item"},
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
                        this.months.map(function (month, index) {
                            var buttonClasses = (this.props.timeFilter.month == month.index) ? "flat-button selected" : "flat-button";

                            return R.div({key: index, className: "item"},
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