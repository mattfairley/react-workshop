var React = require('react');
var ReactDOM = require('react-dom');

var DataProvider = require('./data-provider');
var dataProvider = new DataProvider();

var WeatherApp = React.createClass({

  getInitialState: function() {
    return {
      city: null,
      forecastData: []
    };
  },

  componentDidMount: function() {

    // this.getData('toronto');

  },

  getData: function(city) {
    dataProvider.getWeather(city, (err, data) => {
      console.log(data);
      if (!err) {
        this.setState({
          city: data.city,
          forecastData: data.forecast
        });
      }
    });
  },

  clearForecast: function(e) {
    e.preventDefault();
    this.setState({
      city: null,
      forecastData: []
    })
  },

  render: function() {

    var forecast = this.state.forecastData.map((data, i) => {
      return <ForecastDay key={i} data={data} /> 
    });

    return (
      <div className="app-container">
        <h1>React forecast app</h1>
        <CityInput onSubmit={this.getData} />
        {this.state.city ? 
          <button onClick={this.clearForecast}>Clear</button> 
          : 
          null
        }
        <ForecastContainer city={this.state.city}>
          {forecast}
        </ForecastContainer>
      </div>
    )
  }

});

var CityInput = React.createClass({

  getInitialState: function() {
    return {
      city: null
    }
  },

  onChange: function(e) {
    this.setState({
      city: e.target.value
    });
  },

  getForecast: function(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.city);
  },

  render: function() {
    return (
      <form className="input-form" onSubmit={this.getForecast}>
        <input type="text" className="city-input" placeholder="Enter a city" onChange={this.onChange} />
        <button className="button button-submit" onClick={this.getForecast}>Get the weather</button>
      </form>
    )
  }

});

var ForecastContainer = React.createClass({

  render: function() {

    return (
      <section className="forecast-container">
        <h2>
          {this.props.city ? '5-day forecast for ' : ''}
          <span className="city-name">
            {this.props.city}
          </span>
        </h2>
        {this.props.children}
      </section>
    )
  }

});

var ForecastDay = React.createClass({

  render: function() {
    console.log(this.props.data);

    var dateString = `${this.props.data.date.month}. ${this.props.data.date.day}`;

    return (
      <div className="forecast">
          <div className="forecast-date">{dateString}</div>
          <div className="forecast-temperature">{this.props.data.temp}&deg;</div>
          <div className="forecast-description">
            {this.props.data.weather}
          </div>
          <img className="forecast-icon" src={`http://openweathermap.org/img/w/${this.props.data.icon}.png`} />
      </div>
    )

  }

});

ReactDOM.render(<WeatherApp />, document.getElementById('main'));
