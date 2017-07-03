'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pages = function (_React$Component) {
	_inherits(Pages, _React$Component);

	function Pages(props) {
		_classCallCheck(this, Pages);

		var _this = _possibleConstructorReturn(this, (Pages.__proto__ || Object.getPrototypeOf(Pages)).call(this, props));

		_this.state = {
			flag: 1,
			pageIndex: _this.props.pageIndex ? _this.props.pageIndex : 0,
			pageSize: _this.props.pageSize ? _this.props.pageSize : 5,
			url: _this.props.url,
			type: _this.props.type ? _this.props.type : 'GET',
			data: _this.props.data
		};
		return _this;
	}

	_createClass(Pages, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.getData();
		}
	}, {
		key: 'getData',
		value: function getData() {
			var that = this;
			var query = 'pageIndex=' + this.state.pageIndex + '&pageSize=' + this.state.pageSize;
			var url = this.state.url + (this.state.url.indexOf('?') > -1 ? '&' : '?') + query;
			var params = {
				url: url,
				type: this.state.type,
				beforeSend: function beforeSend(request) {
					request.setRequestHeader("Content-Type", 'application/json');
				}
			};
			if (!!this.state.data) {
				params.data = JSON.stringify(this.state.data);
			}
			params.success = function (d) {
				var flag = 2;
				if (d.length != that.state.pageSize) {
					flag = 3;
				}
				that.setState({ flag: flag, pageIndex: that.state.pageIndex + 1, cbData: d });
			};
			params.error = function (d) {
				that.setState({ flag: 4 });
			};
			$.ajax(params);
		}
	}, {
		key: 'getMore',
		value: function getMore() {
			var that = this;
			this.setState({ flag: 1, cbData: null }, function () {
				that.getData();
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'div',
				null,
				React.Children.map(React.Children.toArray(React.Children.only(this.props.children)), function (children) {
					return React.cloneElement(children, { data: _this2.state.cbData });
				}),
				this.state.flag === 1 ? React.createElement(
					'div',
					{ className: 'getMore' },
					'\u52A0\u8F7D\u4E2D'
				) : this.state.flag === 2 ? React.createElement(
					'div',
					{ className: 'getMore', onClick: this.getMore.bind(this) },
					'\u70B9\u51FB\u52A0\u8F7D\u66F4\u591A'
				) : this.state.flag === 3 ? React.createElement(
					'div',
					{ className: 'getMore' },
					'\u6211\u662F\u6709\u5E95\u7EBF\u7684'
				) : React.createElement(
					'div',
					{ className: 'getMore' },
					'\u52A0\u8F7D\u5931\u8D25'
				)
			);
		}
	}]);

	return Pages;
}(React.Component);