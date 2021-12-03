import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';



function MovieDetail({ match }: any) {
    useEffect(() => {
        fetchItems();
    });
    
    const [movies, setMovies] = useState<any>([]);
    const [Id, setId] = useState<any>([]);
    const [similar, setSimilar] = useState<any>([]);
    const apiKey = "45e72af51ad7bb107f12e61387040e94"

    const fetchItems = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${apiKey}`);
        const movie = await data.json()
        setMovies(movie)
        const similar = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${apiKey}`);
        const similarMovies = await similar.json()
        setSimilar(similarMovies.results)
        setId(match.params.id)
    }
    if (match.params.id !== Id) {
        fetchItems()
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    return (
        <div className="container d-flex flex-wrap mt-4 justify-content-center">
            <div className="d-flex p-4 col-md-12 col-lg-12 flex-wrap flex-1 " key={movies.id}>
                <div className="card align-items-center fluid w-100 h-100 p-4 position-relative"  >
                    <figure><img className="card-img-top" style={{ width: "200px" }} src={`https://image.tmdb.org/t/p/original${movies.poster_path}`} alt="Card images cap" /></figure>
                    <div className="card-body w-100 text-left ">
                        <h5 className="card-title" ><b className="text-info">Title :</b> {movies.title}</h5>
                        <p className="card-text"><b className="text-info">Overview :</b>{movies.overview}</p>
                        <p className="card-text d-flex"><b className="text-info">Status :</b>
                            {movies.status === 'Released' ? <h6 className="pl-2"><span className="badge badge-success ">{movies.status}</span></h6> : <h6 className="pl-2"><span className="badge badge-secondary ">{movies.status}</span></h6>}
                        </p>
                        {console.log(movies.vote_average*10)}
                        <p className="card-text"><b className="text-info">Genres :</b>
                            {
                                movies?.genres?.map((genres: any, index: number) =>
                                    <span>{genres.name}{index + 1 < movies.genres.length && ', '}</span>
                                )
                            }
                        </p>
                        <div className="position-relative w-100">
                            <div className="container">
                                <Slider {...settings} >
                                    {
                                        similar.map((movie: any) =>
                                            <div className="d-flex p-4 col-md-12 col-lg-12 flex-wrap flex-1" key={movie.id}>
                                                <div className="card align-items-center fluid w-100 h-100 p-4"  >
                                                    <figure><img className="card-img-top" style={{ width: "100px" }} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Card images cap" /></figure>
                                                    <div className="card-body p-0">
                                                        <Link to={`/MovieDetail/${movie.id}`}><h5 className="card-title text-truncate" style={{ maxWidth: "150px" }}>{movie.title}</h5></Link>
                                                    </div>
                                                    <div className="star-ratings">
                                                        <div className="fill-ratings" style={{ width: `${movie.vote_average * 10}%` }}>
                                                            
                                                            <span>★★★★★</span>
                                                        </div>
                                                        <div className="empty-ratings">
                                                            <span>★★★★★</span>
                                                        </div>
                                                        <p className="text m-0 w-100 d-flex justify-content-center" style={{fontSize:"12px",textAlign:"center"}}>{movie.vote_average.toFixed(1)}/10</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieDetail

