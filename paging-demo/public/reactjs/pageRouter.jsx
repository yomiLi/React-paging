$(document).ready(function () {
	var container = document.getElementById('container');
	ReactDOM.render(<Pages url='/api/test' type='GET'><ShowData/></Pages>, container);
});

// $(document).ready(function () {
// 	var path = window.location.pathname;
// 	var container = document.getElementById('container');
// 	var content = null,
// 		title = '',
// 		nav = '';
// 	if (path == '/' || path == '/home') {
// 		title = '首页';
// 		nav = 'home';
// 		content = <HomePage/>;
// 	}
// 	if (path == '/pages') {
// 		title = '分页组件';
// 		nav = 'home';
// 		content = <Pages url='/api/test' type='GET'><ShowData/></Pages>;
// 	}
// 	document.title = title;
// 	ReactDOM.render(<Layout title={title} nav={nav}>{content}</Layout>, container);
// });
// // var Router = ReactRouter.Router;
// // var Route = ReactRouter.Route;
// // var ReactDOM = ReactDOM;
// // var React = React;
// // var browserHistory = History.createBrowserHistory();
// // ReactDOM.render(
// // 	<Router history={browserHistory}>
// // 		<Route path='/' component={Layout}>
// // 		    <Route path="home" component={HomePage}></Route>
// // 	    </Route>
// //   	</Router>, document.getElementById('container'));