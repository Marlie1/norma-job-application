import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import '../Assets/css/Modal.css'


function GetList() {
    useEffect(() => {
        fetchItems();
    });


    const [movies, setMovies] = useState<any>([]);
    const [search, setSearch] = useState<string>('');
    const apiKey = "45e72af51ad7bb107f12e61387040e94"
    const fetchItems = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);

        const allmovies = await data.json()
        setMovies(allmovies.results)
    }
    return (
        <div className="container">
            <input type="text" className="w-100 mt-4 pl-3 py-2 rounded" placeholder="Search for movies..." onKeyUp={(e:any) => setSearch(e.target.value)}/>

            <div className="d-flex flex-wrap mt-4">

                {
                    movies.filter((item:any)=> item.title.toLowerCase().includes(search.toLowerCase())).map((movie: any) =>
                        <div className="d-flex p-4 col-md-6 col-lg-3 flex-wrap flex-1" key={movie.id}>
                            <div className="card align-items-center fluid w-100 h-100 p-4"  >
                                <figure><img className="card-img-top" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Card images cap" /></figure>
                                <div className="card-body p-0">
                                    <Link to={`/MovieDetail/${movie.id}`}><h5 className="card-title">{movie.title}</h5></Link>

                                    <p className="card-text">{movie.release_date}</p>
                                </div>
                                <div className="star-ratings ">
                                    <div className="fill-ratings" style={{ width: `${movie.vote_average*10}%` }}>
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

            </div>
        </div>
    )
}
export default GetList




