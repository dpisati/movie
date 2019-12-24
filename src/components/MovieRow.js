import React from "react";

class MovieRow extends React.Component {
  viewMovie() {
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.id;
    window.open(url);
  }

  render() {
    return (
      <div className="moviePoster" key={this.props.movie.id}>
        <img
          alt="poster"
          width="250"
          height="370"
          src={this.props.movie.poster_src}
        />

        <div className="posterInfo">
          <h3>{this.props.movie.title}</h3>
          <p>{`(${this.props.movie.release_date.slice(0, 4)})`}</p>

          <input
            className="posterButton"
            type="button"
            value="View More"
            onClick={this.viewMovie.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default MovieRow;
