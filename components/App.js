var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'XZFApH8JIXMv8ubbv3U9ElMxsGOV22WZ';

App = React.createClass({
	getInitialState() {
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

	handleSearch: function(searchingText) {
		this.setState({
			loading: true
		});
		this.getGif(searchingText, function(gif) {
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this));
	},

	getGif: function(searchingText, callback) {
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function() {
			if (xhr.status === 200) {
				var data = JSON.parse(xhr.responseText).data;
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
			}
			else {
				console.log('Error: Page not found!');
			};
		};
		xhr.send();
	},

	render() {
		var styles = {
			textAlign: 'center',
			width: '90%'
		};

		return (
			<div className={'container'} style={styles}>
				<h1>Wyszukiwarka GIF-ow!</h1>
				<p>Znajdz gif-a na <a href='http://giphy.com'>giphy</a>!<br></br>Nacisnij enter, aby pobrac kolejnego GIF-a.</p><
				Search onSearch={
					this.handleSearch
				}/>
				<Gif
					loading={
						this.state.loading
					}
					url={
						this.state.gif.url
					}
					sourceUrl={
						this.state.gif.sourceUrl
					}
				/>
			</div>
		);
	}
});