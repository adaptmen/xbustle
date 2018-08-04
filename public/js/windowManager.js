/*jslint devel: true, node: true, forin: true, plusplus: true, regexp: true*/

var WindowManager = function () {

    var get = (selector) => $(selector)[0];

    var app = get('app-area main');
    var header = {
        _main: get('header'),
        user_btn: get('header #user')
    };
    var toolbar = {
        _main: get('left-bar'),
        title: get('left-bar .menu-bar .menu-title'),
        items: get('left-bar .menu-bar .menu-items'),
        user: {
            _main: get('left-bar .user-info'),
            avatar: get('left-bar .user-info .user-avatar'),
            name: get('left-bar .user-info .user-data .name'),
            desc: get('left-bar .user-info .user-data .desc'),
        }
    };


    var init = function () {
        var html_proto = {
            add: function (html) {
                this.innerHTML += html;
            },

            replace: function (html) {
                this.innerHTML = html
            },

            addElement: function (params) {
                let new_elem = document.createElement(params.tag);
                new_elem.classList.add(params.class);
                new_elem.innerHTML = params.text;
                for (let attr in params.attribs)
                    new_elem.setAttribute(attr, params.attribs[attr]);
                return this.appendChild(new_elem);
            },

            getVal: function () {
                return $(this).val()
            },

            setVal: function (val) {
                $(this).val(val)
            },

            addVal: function (val) {
                $(this).val($(this).val() + val)
            },


            animation: {
                start: function () {

                },
                end: function () {

                }
            }
        };
        Object.assign(HTMLElement.prototype, html_proto);
    };


    return {
        app: app,
        toolbar: toolbar,
        header: header,
        init: init(),
        get: get
    }

}();