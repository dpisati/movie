import React, { Component } from "react";
import "./App.css";
import MovieRow from "./components/MovieRow";
import $ from "jquery";
import movieDBlogo from "./moviedb_logo.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: "search" };
  }

  componentDidMount() {
    this.trendingChangeHandler();
  }

  cleanSearch() {
    document.getElementsByClassName("inputSearch")[0].value = "";
    this.trendingChangeHandler();
    this.setState({ icon: "search" });
  }

  changeSearchIcon() {
    if (this.state.icon === "search") {
      return "https://img.icons8.com/material-sharp/24/000000/search.png";
    } else {
      return "https://img.icons8.com/ios/24/000000/circled-x.png";
    }
  }

  searchChangeHandler(event) {
    const boundObject = this;
    const searchTerm = event.target.value;
    this.setState({ searchField: searchTerm });
    if (searchTerm === "") {
      this.trendingChangeHandler();
      this.setState({ icon: "search" });
    } else {
      boundObject.performSearch(searchTerm);
      this.setState({ icon: "x" });
    }
  }

  trendingChangeHandler() {
    const boundObject = this;
    boundObject.trendingShow();
  }

  performSearch(searchResults) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=2837f213a2b2574852f9cf54dfc18d7b&query=" +
      searchResults;
    $.ajax({
      url: urlString,
      success: searchResults => {
        const results = searchResults.results;
        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;

          if (
            movie.poster_src === "https://image.tmdb.org/t/p/w500null" ||
            movie.release_date === undefined
          ) {
          } else {
            const movieRow = <MovieRow key={movie.id} movie={movie} />;
            movieRows.push(movieRow);
          }
        });

        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("failed to fetch", xhr, status, err);
      }
    });
  }

  trendingShow(trendingResults) {
    const urlString =
      "https://api.themoviedb.org/3/trending/movie/week?api_key=2837f213a2b2574852f9cf54dfc18d7b";
    $.ajax({
      url: urlString,
      success: trendingResults => {
        const results = trendingResults.results;
        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src =
            "https://image.tmdb.org/t/p/w500" + movie.poster_path;

          const movieRow = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(movieRow);
        });

        this.setState({ rows: movieRows });
      },
      error: (xhr, status, err) => {
        console.error("failed to fetch", xhr, status, err);
      }
    });
  }

  render() {
    return (
      <div className="mainDiv">
        <div className="titleBar">
          <div className="lefttitle">
            <img
              alt="main_icon"
              className="mainIcon"
              src="data:image/png;base64,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"
            />
            <div>
              <h1 className="title">Movie Search</h1>
            </div>
          </div>
          <div>
            <div className="righttitle">
              <input
                className="inputSearch"
                onChange={this.searchChangeHandler.bind(this)}
                placeholder="Search movie..."
              />
              <img
                onClick={this.cleanSearch.bind(this)}
                alt="searchIcon"
                className="searchIcon"
                src={this.changeSearchIcon()}
              />
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="moviedblogo"
                  className="movieDBlogo"
                  src={movieDBlogo}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="container">{this.state.rows}</div>
        <div className="footer">
          "This website uses the TMDb API but is not endorsed or certified by
          TMDb."
        </div>
      </div>
    );
  }
}

export default App;
