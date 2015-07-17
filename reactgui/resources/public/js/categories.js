var R = React.DOM;

var CategoryEditor = React.createFactory(React.createClass({
    displayName: "CategoryEditor",

    handleSubmit: function (e) {
        e.preventDefault();

        // Get data from the form
        var name = this.refs.name.getDOMNode().value.trim();
        var matches = this.refs.matches.getDOMNode().value.trim();
        if (!name || !matches) {
            return;
        }

        matches = matches.split(',');
        matches = cull.map(function(it) {
            return it.trim();
        }, matches);

        superagent.post("/api/categories")
            .send({name: name, matches: matches})
            .set('Accept', 'application/json')
            .end(function(res){
                if (res.ok) {
                    this.props.onCategoryCreate(res.body);
                } else {
                    console.log('Failed to post category', res);
                }
            }.bind(this));

        // Clear form
        this.refs.name.getDOMNode().value = '';
        this.refs.matches.getDOMNode().value = '';
        return;
    },

    render: function () {
        return R.div({className: "bg-box"},
            R.form({className: "padded", onSubmit: this.handleSubmit},
                [
                    R.input({name: "name", type: "text", placeholder: "Category name", className: "form-control", ref: "name"}),
                    R.input({name: "matches", type: "text", placeholder: "Matches", className: "form-control", ref: "matches"}),
                    R.button({className: "flat-button", type: "submit"}, "Add category")
                ]
            )
        )
    }
}));

var CategoryTable = React.createFactory(React.createClass({
        displayName: "CategoryTable",

        onEditContent: function(category, refId) {

            var matches = this.refs[refId].getDOMNode().textContent;
            var matches = matches.split(',');
            matches = cull.map(function(it) {
                return it.trim();
            }, matches);

            // No actual change ..
            if (cull.difference(matches,category.matches).length === 0) {
                console.log("no change ...");
                return;
            }

            // TODO duplicated from above, extract this to a store ..
            superagent.post("/api/categories")
                .send({name: category.name, matches: matches})
                .set('Accept', 'application/json')
                .end(function(res){
                    if (res.ok) {
                        this.props.onCategoryCreate(res.body);
                    } else {
                        console.log('Failed to post category', res);
                    }
                }.bind(this));
        },

        render: function () {
            return R.div({className: "bg-box padded"}, R.table({}, [
                R.thead({},
                    R.tr({}, [
                        R.th({}, ""),
                        R.th({}, "Category"),
                        R.th({}, "Matches")
                    ])),
                R.tbody({},
                    this.props.categories.map(function (category, index) {
                        return R.tr({}, [
                            R.td({}, R.button({onClick: function() {this.props.onCategoryDelete(category.name)}.bind(this),
                                className: "delete"}, "\u2716")),
                            R.td({key: "name", className: "category"}, category.name),
                            R.td({key: "matches", contentEditable: true, onBlur: this.onEditContent.bind(this, category, "category_" + index), ref: "category_" + index}, category.matches.join(", "))]);
                    }.bind(this)))
            ]))
        }
    }
));

var CategoriesPage = React.createFactory(React.createClass({
    displayName: "CategoriesPage",

    onCategoryCreate: function (createResult) {
        // Just load all from server again
        this.loadCategoriesFromServer();
    },

    onCategoryDelete: function(categoryName) {
        superagent.del('/api/categories/' + categoryName)
            .end(function(res) {
                // Just load list from server again
                this.loadCategoriesFromServer();
            }.bind(this))
    },

    // Retrieve list from API
    loadCategoriesFromServer: function () {
        superagent.get('/api/categories')
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
                commonComponents.Menu(),
                CategoryEditor({onCategoryCreate: this.onCategoryCreate}),
                CategoryTable({
                    categories: this.state.categories,
                    onCategoryDelete: this.onCategoryDelete,
                    onCategoryCreate: this.onCategoryCreate})
            ]);
    }
}));

React.render(CategoriesPage({}), document.body);