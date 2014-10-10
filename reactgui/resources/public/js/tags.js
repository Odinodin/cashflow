var R = React.DOM;

/* Tags */
var TagEditor = React.createClass({

    handleSubmit: function(e) {
        e.preventDefault();

        // Get data from the form
        var name = this.refs.name.getDOMNode().value.trim();
        var regexes = this.refs.regexes.getDOMNode().value.trim();
        if (!name || !regexes) {
            return;
        }

        // TODO post data to server
        atomic.post("/api/tags", {})

        // Clear form
        this.refs.name.getDOMNode().value = '';
        this.refs.regexes.getDOMNode().value = '';
        return;
    },

    render: function () {
        return R.div({className: "bg-box"},
            R.form({className: "padded", onSubmit: this.handleSubmit},
                [
                    R.input({name: "name", type: "text", placeholder: "Tag name", className: "form-control", ref: "name"}),
                    R.input({name: "regexes", type: "text", placeholder: "Regexes", className: "form-control", ref: "regexes"}),
                    R.button({className: "flat-button", type: "submit"}, "Add tag")
                    // {% if error %}<label class="error">{{error}}</label>{% endif %}
                ]
            )
        )
    }
});

/* Tag table */
var TagTable = React.createClass({

        getInitialState: function () {
            return {
                tags: [
                    {name: "X", regexes: ["a", "b"]},
                    {name: "Y", regexes: ["c", "d"]}
                ]
            }
        },

        componentDidMount: function () {
            // Retrieve tags from API
            atomic.get('/api/tags')
                .success(function (tags){
                    this.setState({
                        tags: tags
                    });
                }.bind(this))
                .error(function(error) {
                    console.log("Faile to get /api/tags: " + error)
                });
        },

        render: function () {
            return R.table({className: "bg-box padded"}, [
                R.thead({},
                    R.tr({}, [
                        R.th({}, ""),
                        R.th({}, "Tag"),
                        R.th({}, "Regexes")
                    ])),
                R.tbody({},
                    this.state.tags.map(function (tag) {
                        return R.tr({}, [
                            R.td({}, R.button({className: "delete"}, "\u2716")),
                            R.td({}, tag.name),
                            R.td({}, tag.regexes.join(", "))]);
                    }))
            ])
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

var TagsPage = React.createClass({
    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TagEditor(),
                TagTable()
            ]);
    }
});

React.renderComponent(TagsPage({}), document.body);