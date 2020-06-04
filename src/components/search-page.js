import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMovies } from "../actions";
import { fetchImage } from "../actions";
import { Link } from "react-router-dom";
import _ from "lodash";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    //console.log(props);
    //the props is an object that just contains the fetchMovies function

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.renderMovies = this.renderMovies.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
    console.log(this.state);
  }

  onSearchButtonClick(event) {
    event.preventDefault();

    // We need to go and fetch movie data based on the search term
    // the state at this point is already updated from event handler of the user typing, so we invoke the fetch movies function (making the api call) and then resetting the state back back to it's original state (clearing term)
    console.log(this.props.fetchImage(this.state.term));
    this.props.fetchImage(this.state.term)
    this.props.fetchMovies(this.state.term);
    this.setState({ term: '' });
  }


  renderMovies() {

    return _.map(this.props.movies, movie => {
      return (
        <tr key={movie.id}>
          <td>{movie.title}</td>
          <td>{movie.rating}</td>
          <td>{movie.rating}</td>
          <td>{movie.rating}</td>
          <td><button className="btn btn-primary">Add To My List</button></td>
        </tr>

      );
    });
  }



  /*
  rating: 3
  date: "2008-07-21 00:00:00"
  id: 58
  dubious: "0"
  year: 2003
  submitterid: 1
  imdbid: "0234215"
  visible: "1"
  title: "Matrix Reloaded, The"


  */


  render() {
    const { movies } = this.props;
    console.log(movies);

    return (
      <div>
        <h1 className="heading">Can You See Her?</h1>
        <h3>Search a movie here to see Bechdel Test Results</h3>
        <form onSubmit={this.onSearchButtonClick} className="input-group">
          <input
            placeholder="Type movie to search here"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-secondary">
              Search</button>
          </span>
        </form>
        {/* <ul className="list-group">
          {this.renderMovies()}
        </ul> */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Two Female Characters</th>
              <th>Female Conversation</th>
              <th>Not About Men</th>
            </tr>
          </thead>
          <tbody>{this.renderMovies()}</tbody>
        </table>
        <Link to="/">Back to Homepage</Link>
      </div>

    )
  }
}

/*
class WeatherList extends Component {
  renderWeather(cityData) {
    console.log('cityData in weatherlist', cityData)
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);
    console.log(temps,pressures,humidities)
    return (
      <tr key={cityData.city.id}>
        <td>{name}</td>
        <td><Chart data={temps} color="orange" units="F" /></td>
        <td><Chart data={pressures} color="green" units="hPa" /></td>
        <td><Chart data={humidities} color="black" units="%" /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (K)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}
*/

// export default SearchPage;

function mapStateToProps(state) {
  console.log('Inside mapStateToProps', state);
  return { movies: state.movies }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovies, fetchImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
