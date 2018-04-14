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

var default_1 = /** @class */function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        var _this = _super.call(this, props) || this;
        _this.pageNum = 20;
        _this.defaultCls = 'pilipa-dropdown';
        _this.defaultPage = 1;
        _this.selectedIndex = -1;
        _this.seleted = false;
        _this.filterVal = '';
        _this.handleAllData(_this.props.data);
        _this.state = {
            visible: false,
            title: _this.props.title || '',
            data: _this.allData.slice(0, _this.pageNum * _this.defaultPage),
            dataTmp: _this.allData,
            selectedIndex: _this.selectedIndex,
            filterVal: ''
        };
        return _this;
    }
    default_1.prototype.componentWillReceiveProps = function (props) {
        if (props.data) {
            this.handleAllData(props.data);
            var res = this.filterData();
            this.setState({
                data: res.slice(0, this.pageNum * this.defaultPage),
                dataTmp: res
            });
        }
    };
    default_1.prototype.componentDidMount = function () {
        var _this = this;
        var $dropdowm = (0, _jquery2.default)(this.refs.dropdown);
        var button = this.refs.button;
        (0, _jquery2.default)(button).hover(function () {
            _this.handleEnter();
        }, function (e) {
            _this.handleLeave();
        });
        // $(document).on('click', (event) => {
        //   console.log('click')
        //   if($dropdowm.find(event.target).length === 0) {
        //     this.handleLeave()
        //   }
        // })
        (0, _jquery2.default)(document).keydown(function (event) {
            _this.onKeyDown(event);
        });
        (0, _jquery2.default)(document).keyup(function () {
            if (_this.event) {
                _this.event.returnValue = false;
            }
        });
    };
    default_1.prototype.componentWillUnmount = function () {
        if (this.t) {
            clearTimeout(this.t);
        }
        console.log('will unmount');
    };
    default_1.prototype.onKeyDown = function (event) {
        this.event = event;
        var $dropdowm = (0, _jquery2.default)(this.refs.dropdown);
        var keyCode = event.keyCode;
        var selectedIndex = this.state.selectedIndex;
        var $items = $dropdowm.find('.results .items');
        var $lis = $items.find('li');
        var data = this.state.data;
        if ($lis.length === 0 || $lis.eq(selectedIndex).length === 0) {
            return;
        }
        var scrollTop = $items.scrollTop();
        var itemsHeight = $items.height();
        var liOffsetTop = 0;
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
    default_1.prototype.handleAllData = function (data) {
        var _this = this;
        var _a = this.props.setFields || { key: '', title: '' },
            key = _a.key,
            title = _a.title;
        var selectTitle = this.props.title;
        data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data);
        this.allData = [];
        data.map(function (item, index) {
            var newItem = {
                key: item[key || 'key'],
                title: item[title || 'title'],
                capital: (0, _util.getCapital)(item[title || 'title']) || ['']
            };
            if (_this.props.title === item[title || 'title']) {
                _this.defaultPage = index === 0 ? 1 : Math.ceil(index + 1 / _this.pageNum);
                _this.selectedIndex = index;
            }
            _this.allData[index] = newItem;
        });
    };
    // 滚动到选中的位置
    default_1.prototype.scrollToSelectedPos = function () {
        var _this = this;
        var $dropdowm = (0, _jquery2.default)(this.refs.dropdown);
        var $items = $dropdowm.find('.results .items');
        this.state.dataTmp.map(function (item, index) {
            if (_this.state.title === item.title) {
                _this.selectedIndex = index;
                _this.defaultPage = _this.selectedIndex <= 0 ? 1 : Math.ceil(_this.selectedIndex + 1 / _this.pageNum);
                _this.setState({
                    data: _this.state.dataTmp.slice(0, _this.defaultPage * _this.pageNum),
                    selectedIndex: index
                });
                return false;
            }
        });
        if (this.selectedIndex < 0) {
            $items.scrollTop(0);
            return;
        }
        this.defaultPage = this.selectedIndex <= 0 ? 1 : Math.ceil(this.selectedIndex + 1 / this.pageNum);
        // this.setState({
        //   data: this.allData.slice(0, this.defaultPage * this.pageNum),
        //   dataTmp: this.allData
        // })
        if ($items.find('li').length === 0) {
            return;
        }
        try {
            var scrollTop = $items.find('li').eq(this.selectedIndex)[0].offsetTop;
            console.log($items.find('li').eq(this.selectedIndex)[0].offsetTop);
            $items.scrollTop(scrollTop - $items.find('li').eq(this.selectedIndex)[0].clientHeight * 3);
        } catch (e) {
            this.selectedIndex = 0;
            var scrollTop = $items.find('li').eq(this.selectedIndex)[0].offsetTop;
            console.log($items.find('li').eq(this.selectedIndex)[0].offsetTop);
            $items.scrollTop(scrollTop - $items.find('li').eq(this.selectedIndex)[0].clientHeight * 3);
        }
    };
    default_1.prototype.handleEnter = function () {
        var _this = this;
        if (this.t) {
            clearTimeout(this.t);
        }
        var results = this.refs.results;
        if (results) {
            this.scrollToSelectedPos();
            (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
            (0, _jquery2.default)(results).one('mouseover', function () {
                if (_this.t) {
                    clearTimeout(_this.t);
                }
            });
            (0, _jquery2.default)(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            return;
        }
        this.setState({
            visible: true
        }, function () {
            _this.scrollToSelectedPos();
            results = _this.refs.results;
            (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
            (0, _jquery2.default)(results).addClass('custom-slide-up-enter');
            _this.t = setTimeout(function () {
                (0, _jquery2.default)(results).removeClass('custom-slide-up-enter');
            }, 200);
            (0, _jquery2.default)(results).one('mouseover', function () {
                clearTimeout(_this.t);
            });
            (0, _jquery2.default)(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            _this.onItemScroll();
        });
    };
    default_1.prototype.onItemScroll = function () {
        var _this = this;
        var results = this.refs.results;
        (0, _jquery2.default)(results).children('.items').scroll(function (e) {
            var scrollTop = e.target.scrollTop;
            var h = (0, _jquery2.default)(results).find('ul').height();
            var ch = e.target.clientHeight;
            // 显示区域离底部小于10px的时候
            // console.log(scrollTop + ch - h, h , scrollTop + ch > h - 10)
            console.log(_this.defaultPage, 'defaultPage');
            if (scrollTop + ch > h - 10) {
                if (_this.defaultPage < Math.ceil(_this.state.dataTmp.length / _this.pageNum)) {
                    _this.defaultPage += 1;
                    // console.log(this.defaultPage, 'defaultPage')
                    _this.setState({
                        data: _this.state.dataTmp.slice(0, _this.defaultPage * _this.pageNum)
                    });
                }
            }
        });
    };
    default_1.prototype.handleLeave = function () {
        var _this = this;
        if (this.t) {
            clearTimeout(this.t);
        }
        var _a = this.refs,
            button = _a.button,
            results = _a.results;
        this.t = setTimeout(function () {
            (0, _jquery2.default)(results).addClass('custom-slide-up-leave');
            _this.t = setTimeout(function () {
                (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
                (0, _jquery2.default)(results).addClass('hidden');
                _this.defaultPage = _this.selectedIndex <= 0 ? 1 : Math.ceil(_this.selectedIndex + 1 / _this.pageNum);
                _this.setState({
                    visible: false,
                    selectedIndex: _this.selectedIndex
                    // data: this.allData.slice(0, this.defaultPage * this.pageNum),
                    // dataTmp: this.allData
                });
                _this.seleted = false;
            }, 200);
        }, 100);
    };
    default_1.prototype.handleClick = function (item, index) {
        this.seleted = true;
        this.selectedIndex = index;
        var callBack = this.props.callBack;
        this.setState({
            title: item.title,
            selectedIndex: index
        });
        this.defaultPage = index === 0 ? 1 : Math.ceil(index + 1 / this.pageNum);
        this.handleLeave();
        if (callBack) {
            setTimeout(function () {
                callBack(item);
            }, 301);
        }
    };
    default_1.prototype.filterData = function () {
        var allData = this.allData;
        if (this.filterVal === '') {
            return allData;
        }
        var pattern = null;
        try {
            pattern = new RegExp(this.filterVal, 'i');
        } catch (e) {
            console.log(e.message);
            pattern = new RegExp('', 'i');
        }
        var res = allData.filter(function (item, index) {
            if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
                return true;
            }
        });
        return res || [];
    };
    default_1.prototype.handleChange = function (e) {
        var _this = this;
        var $items = (0, _jquery2.default)(this.refs.results).find('.items');
        this.filterVal = e.target.value;
        var allData = this.allData;
        var value = (0, _jquery2.default)(this.refs.input).val().toString();
        var res = this.filterData();
        $items.scrollTop(0);
        res.map(function (item, index) {
            if (_this.state.title === item.title) {
                _this.selectedIndex = index;
                return false;
            }
        });
        this.defaultPage = 1;
        this.setState({
            data: res.slice(0, this.pageNum),
            dataTmp: res,
            selectedIndex: -1,
            filterVal: this.filterVal
        });
    };
    default_1.prototype.onMouseEnter = function (key) {
        if (this.seleted) {
            return;
        }
        this.setState({
            selectedIndex: key
        });
    };
    default_1.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            className = _a.className,
            style = _a.style,
            filter = _a.filter;
        var _b = this.state,
            visible = _b.visible,
            data = _b.data;
        // console.log(data, 'render')
        var title = this.state.title;
        title = title || this.allData.length && this.allData[0].title || '';
        return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(this.defaultCls, className), style: style, ref: 'dropdown' },
            _react2.default.createElement(
                'div',
                { className: 'costom-btn-group', ref: 'button' },
                _react2.default.createElement(
                    'div',
                    { className: 'btn-left' },
                    _react2.default.createElement(
                        'span',
                        { title: title },
                        title
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'btn-right' },
                    _react2.default.createElement('i', { className: 'fa fa-chevron-down', 'aria-hidden': 'true' })
                )
            ),
            visible && _react2.default.createElement(
                'div',
                { className: 'results', ref: 'results' },
                filter && _react2.default.createElement('input', { className: 'input', value: this.state.filterVal, onChange: this.handleChange.bind(this), ref: 'input' }),
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
                        data.length > 0 && data.map(function (item, key) {
                            return _react2.default.createElement(
                                'li',
                                { key: key, className: (0, _classnames2.default)({
                                        active: key === _this.state.selectedIndex,
                                        selected: key === _this.selectedIndex
                                    }), title: item.title, onClick: _this.handleClick.bind(_this, item, key), onMouseEnter: _this.onMouseEnter.bind(_this, key) },
                                item.title
                            );
                        })
                    )
                )
            )
        );
    };
    return default_1;
}(_react2.default.Component);
exports.default = default_1;