/* Menu */
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