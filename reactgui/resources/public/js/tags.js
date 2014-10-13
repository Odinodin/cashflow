var R = React.DOM;

/* Tags */
var TagEditor = React.createClass({

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
                    this.props.onTagCreate(res.body);
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
                    R.input({name: "name", type: "text", placeholder: "Tag name", className: "form-control", ref: "name"}),
                    R.input({name: "regexes", type: "text", placeholder: "Regexes", className: "form-control", ref: "regexes"}),
                    R.button({className: "flat-button", type: "submit"}, "Add tag")
                ]
            )
        )
    }
});

/* Tag table */
var TagTable = React.createClass({

        render: function () {
            return R.table({className: "bg-box padded"}, [
                R.thead({},
                    R.tr({}, [
                        R.th({}, ""),
                        R.th({}, "Tag"),
                        R.th({}, "Regexes")
                    ])),
                R.tbody({},
                    this.props.tags.map(function (tag) {
                        return R.tr({}, [
                            R.td({}, R.button({onClick: function() {this.props.onTagDelete(tag.name)}.bind(this),
                                className: "delete"}, "\u2716")),
                            R.td({key: "name"}, tag.name),
                            R.td({key: "regexes"}, tag.regexes.join(", "))]);
                    }.bind(this)))
            ])
        }
    }
);

var TagsPage = React.createClass({

    onTagCreate: function (tagCreateResult) {
        // Just load all tags from server again
        this.loadTagsFromServer();
    },

    onTagDelete: function(tagName) {
        superagent.del('/api/tags/' + tagName)
            .end(function(res) {
                // Just load all tags from server again
                this.loadTagsFromServer();
            }.bind(this))
    },

    // Retrieve tags from API
    loadTagsFromServer: function () {
        superagent.get('/api/tags')
            .end(function (res) {
                this.setState({tags: res.body});
            }.bind(this));
    },

    getInitialState: function () {
        return { tags: []};
    },

    componentDidMount: function(){
        this.loadTagsFromServer();
    },

    render: function () {
        return R.div({id: "main"},
            [
                Menu(),
                TagEditor({onTagCreate: this.onTagCreate}),
                TagTable({tags: this.state.tags, onTagDelete: this.onTagDelete})
            ]);
    }
});

React.renderComponent(TagsPage({}), document.body);