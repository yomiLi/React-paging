$(document).ready(function () {
	var container = document.getElementById('container');
	ReactDOM.render(<Pages url='/api/test' type='GET'><ShowData/></Pages>, container);
});

class ShowData extends React.Component {
		constructor(props) {
			super(props);
			this.state = { data: [] }
		}
		componentWillReceiveProps(nextProps) {
			if (nextProps.data) {
				Array.prototype.push.apply(this.state.data, nextProps.data);
				this.setState({ data: this.state.data });
			}
		}
		render() {
			return <div>
			{this.state.data.map((item,index)=>{
				return <div key={index}>{item}</div>
			})}
		</div>;
		}
	}
	/*Pages的url返回结果必须为数组*/
	/*Pages的子组件showData可以根据业务逻辑的实际情况，自行替换*/