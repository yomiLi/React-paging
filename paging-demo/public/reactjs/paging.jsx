class Pages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: 1,
			pageIndex: this.props.pageIndex ? this.props.pageIndex : 0,
			pageSize: this.props.pageSize ? this.props.pageSize : 5,
			url: this.props.url,
			type: this.props.type ? this.props.type : 'GET',
			data: this.props.data
		};
	}
	componentWillMount() {
		this.getData();
	}
	getData() {
		var that = this;
		var query = 'pageIndex=' + this.state.pageIndex + '&pageSize=' + this.state.pageSize;
		var url = this.state.url + (this.state.url.indexOf('?') > -1 ? '&' : '?') + query;
		var params = {
			url: url,
			type: this.state.type,
			beforeSend: function (request) {
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
	getMore() {
		var that = this;
		this.setState({ flag: 1, cbData: null }, function () {
			that.getData();
		});
	}
	render() {
		return (
			<div>
				{
					React.Children.map(React.Children.toArray(React.Children.only(this.props.children)),(children)=>{
						return React.cloneElement(children,{data:this.state.cbData});
					})
				}
				{
					this.state.flag===1?<div className='getMore'>加载中</div>
					:(
						this.state.flag===2?<div className='getMore' onClick={this.getMore.bind(this)}>点击加载更多</div>
						:(
							this.state.flag===3?<div className='getMore'>我是有底线的</div>:<div className='getMore'>加载失败</div>
						)
					)
				}	
            </div>
		);
	}
}