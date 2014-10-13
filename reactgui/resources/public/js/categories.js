var R = React.DOM;

var CategoryEditor = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();

        // Get data from the form
        var name = this.refs.name.getDOMNode().value.trim();
        var regexes = this.refs.regexes.getDOMNode().value.trim();
        if (!name || !regexes) {
            return;
        }

        superagent.post("/api/tags")
            .send({name: name, regexes: regexes.split(' ')})
            .set('Accept', 'application/json')
            .end(function(res){
                if (res.ok) {
                    this.props.onCategoryCreate(res.body);
                } else {
                    alert('Oh no! error ' + res.text);
                }
            }.bind(this));

        // Clear form
        this.refs.name.getDOMNode().value = '';
        this.refs.regexes.getDOMNode().value = '';
        return;
    },

    render: function () {
        return R.div({className: "bg-box"},
            R.form({className: "padded", onSubmit: this.handleSubmit},
                [
                    R.input({name: "name", type: "text", placeholder: "Category name", className: "form-control", ref: "name"}),
                    R.input({name: "regexes", type: "text", placeholder: "Regexes", className: "form-control", ref: "regexes"}),
                    R.button({className: "flat-button", type: "submit"}, "Add category")
                ]
            )
        )
    }
});


var CategoryTable = React.createClass({

        render: function () {
            return R.table({className: "bg-box padded"}, [
                R.thead({},
                    R.tr({}, [
                        R.th({}, ""),
                        R.th({}, "Category"),
                        R.th({}, "Regexes")
                    ])),
                R.tbody({},
                    this.props.categories.map(function (category) {
                        return R.tr({}, [
                            R.td({}, R.button({onClick: function() {this.props.onCategoryDelete(category.name)}.bind(this),
                                className: "delete"}, "\u2716")),
                            R.td({key: "name"}, category.name),
                            R.td({key: "regexes"}, category.regexes.join(", "))]);
                    }.bind(this)))
            ])
        }
    }
);

var CategoriesPage = React.createClass({

    onCategoryCreate: function (createResult) {
        // Just load all from server again
        this.loadCategoriesFromServer();
    },

    onCategoryDelete: function(categoryName) {
        superagent.del('/api/tags/' + categoryName)
            .end(function(res) {
                // Just load list from server again
                this.loadCategoriesFromServer();
            }.bind(this))
    },

    // Retrieve list from API
    loadCategoriesFromServer: function () {
        superagent.get('/api/tags')
            .end(function (res) {
                this.setState({categories: res.body});
            }.bind(this));
    },

    getInitialState: function () {
        return { categories: []};
    },

    componentDidMount: function(){
        this.loadCategoriesFromServer();
    },

    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                CategoryEditor({onCategoryCreate: this.onCategoryCreate}),
                CategoryTable({categories: this.state.categories, onCategoryDelete: this.onCategoryDelete})
            ]);
    }
});

React.renderComponent(CategoriesPage({}), document.body);