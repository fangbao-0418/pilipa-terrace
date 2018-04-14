'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../_util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();

var AutoComplete = /** @class */function (_super) {
    __extends(AutoComplete, _super);
    function AutoComplete(props) {
        var _this = _super.call(this, props) || this;
        _this.pageNum = 20;
        _this.allData = [];
        _this.defaultCls = 'pilipa-auto-complete';
        _this.filterVal = '';
        _this.handleAllData(_this.props.data);
        _this.state = {
            data: _this.allData.slice(0, _this.pageNum),
            dataTmp: _this.allData,
            page: 1,
            visible: false,
            hover: false,
            selectedIndex: -1
        };
        return _this;
    }
    AutoComplete.prototype.componentWillReceiveProps = function (props) {
        if (props.data.length) {
            this.handleAllData(props.data);
            var res = this.filterData();
            this.setState({
                data: res.slice(0, this.state.page * this.pageNum),
                dataTmp: res
            });
        }
    };
    AutoComplete.prototype.componentDidMount = function () {
        var _this = this;
        (0, _jquery2.default)(this.refs.input).off('click');
        (0, _jquery2.default)(this.refs.input).click(function () {
            _this.searchShow();
        });
        (0, _jquery2.default)(document).keydown(function (event) {
            _this.onKeyDown(event);
        });
        (0, _jquery2.default)(document).keyup(function () {
            if (_this.event) {
                _this.event.returnValue = false;
            }
        });
    };
    AutoComplete.prototype.onKeyDown = function (event) {
        this.event = event;
        var $results = (0, _jquery2.default)(this.refs.results);
        var $items = $results.find('.items');
        var $lis = $results.find('.items li');
        var keyCode = event.keyCode;
        var data = this.state.data;
        var selectedIndex = this.state.selectedIndex;
        var liOffsetTop = 0;
        var scrollTop = $items.scrollTop();
        var itemsHeight = $items.height();
        if ($lis.length === 0 || $lis.eq(selectedIndex).length === 0) {
            return;
        }
        switch (keyCode) {
            // 回车
            case 13:
                $lis.eq(this.state.selectedIndex).trigger('click');
                break;
            // ↑
            case 38:
                event.preventDefault();
                selectedIndex = selectedIndex <= 0 ? 0 : selectedIndex - 1;
                liOffsetTop = $lis.eq(selectedIndex)[0].offsetTop;
                if (scrollTop > liOffsetTop) {
                    $items.scrollTop(liOffsetTop);
                }
                this.setState({
                    selectedIndex: selectedIndex
                });
                break;
            // ↓
            case 40:
                event.preventDefault();
                selectedIndex = selectedIndex >= data.length - 1 ? data.length - 1 : selectedIndex + 1;
                liOffsetTop = $lis.eq(selectedIndex)[0].offsetTop;
                if (scrollTop + itemsHeight - $lis.eq(selectedIndex).height() < liOffsetTop) {
                    $items.scrollTop(scrollTop + $lis.eq(selectedIndex)[0].clientHeight);
                }
                this.setState({
                    selectedIndex: selectedIndex
                });
                break;
        }
    };
    AutoComplete.prototype.onKeyUp = function () {};
    AutoComplete.prototype.handleAllData = function (data) {
        var _this = this;
        var _a = this.props.setFields || { key: '', title: '' },
            key = _a.key,
            title = _a.title;
        this.allData = [];
        data.map(function (item, index) {
            var newItem = {
                key: item[key || 'key'],
                title: item[title || 'title'],
                capital: (0, _util.getCapital)(item[title || 'title']) || ['']
            };
            _this.allData[index] = newItem;
        });
    };
    AutoComplete.prototype.searchChange = function () {
        var $items = (0, _jquery2.default)(this.refs.results).find('.items');
        var el = (0, _jquery2.default)(this.refs.input);
        var value = el.val().toString() || '';
        $items.scrollTop(0);
        if (!value) {
            this.setState({
                visible: false
            });
        } else {
            this.searchShow();
        }
    };
    AutoComplete.prototype.filterData = function () {
        var allData = this.allData;
        if (this.filterVal === '') {
            return this.allData;
        }
        var pattern = null;
        try {
            pattern = new RegExp(this.filterVal, 'i');
        } catch (e) {
            pattern = new RegExp('', 'i');
        }
        var res = allData.filter(function (item) {
            if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
                return true;
            }
        });
        return res || [];
    };
    AutoComplete.prototype.searchShow = function () {
        var _this = this;
        var allData = this.allData;
        var el = (0, _jquery2.default)(this.refs.input);
        this.filterVal = el.val().toString() || '';
        var res = this.filterData();
        this.setState({
            data: res.slice(0, this.pageNum),
            dataTmp: res,
            visible: true,
            page: 1,
            selectedIndex: -1
        }, function () {
            _this.listenScroll();
            var results = _this.refs.results;
            (0, _jquery2.default)(results).addClass('custom-slide-up-enter');
            setTimeout(function () {
                (0, _jquery2.default)(results).addClass('custom-slide-up-enter');
            }, 300);
            el.off('blur');
            (0, _jquery2.default)(results).off('blur');
            (0, _jquery2.default)(results).hover(function () {
                _this.setState({
                    hover: true
                });
            }, function () {
                _this.setState({
                    hover: false
                });
            });
            el.blur(function () {
                if (!_this.state.hover) {
                    (0, _jquery2.default)(results).addClass('custom-slide-up-leave');
                    setTimeout(function () {
                        (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
                        _this.setState({
                            visible: false
                        });
                    }, 300);
                }
            });
        });
    };
    AutoComplete.prototype.handleSelect = function (item) {
        var _this = this;
        (0, _jquery2.default)(this.refs.input).val(item.title);
        var results = this.refs.results;
        (0, _jquery2.default)(results).addClass('custom-slide-up-leave');
        setTimeout(function () {
            (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
            _this.setState({
                visible: false
            });
        }, 300);
        if (this.props.onSelect) {
            this.props.onSelect(item);
        }
    };
    AutoComplete.prototype.listenScroll = function () {
        var _this = this;
        var results = this.refs.results;
        (0, _jquery2.default)(results).children('.items').off('scroll');
        (0, _jquery2.default)(results).children('.items').scroll(function (e) {
            var scrollTop = e.target.scrollTop;
            var h = (0, _jquery2.default)(results).find('ul').height();
            var ch = e.target.clientHeight;
            if (scrollTop + ch > h - 10) {
                if (_this.state.page < Math.ceil(_this.state.dataTmp.length / _this.pageNum)) {
                    _this.setState({
                        page: _this.state.page + 1,
                        data: _this.state.dataTmp.slice(0, _this.pageNum * (_this.state.page + 1))
                    });
                }
            }
        });
    };
    AutoComplete.prototype.render = function () {
        var _this = this;
        var _a = this.state,
            data = _a.data,
            visible = _a.visible;
        var _b = this.props,
            className = _b.className,
            placeholder = _b.placeholder;
        return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(this.defaultCls, className), style: this.props.style },
            _react2.default.createElement('input', { type: 'text', placeholder: placeholder, onChange: this.searchChange.bind(this), ref: 'input' }),
            visible && _react2.default.createElement(
                'div',
                { className: 'results', ref: 'results' },
                data.length === 0 && _react2.default.createElement(
                    'p',
                    null,
                    '\u672A\u641C\u5230\u7ED3\u679C'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'items' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        data && data.map(function (item, index) {
                            return _react2.default.createElement(
                                'li',
                                { onClick: _this.handleSelect.bind(_this, item), key: 'auto-complete-' + index, title: item.title, className: (0, _classnames2.default)({
                                        active: _this.state.selectedIndex === index
                                    }), onMouseEnter: function onMouseEnter() {
                                        _this.setState({
                                            selectedIndex: index
                                        });
                                    } },
                                item.title
                            );
                        })
                    )
                )
            )
        );
    };
    return AutoComplete;
}(_react2.default.Component);
exports.default = AutoComplete;