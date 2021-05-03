var app = new Vue(
    {
        el: '#root',
        data: {
            api_key: 'eb9246517e88c3bbd5a354470a892d61',
            searchQuery: '',
            resultMovies: [],
            resultTvShows: [],
            cast: [],
            openCredits: false,
            genres: [],
            selectedGenre: '',
            flagImages: {
                en: 'https://lipis.github.io/flag-icon-css/flags/4x3/gb.svg',
                it: 'https://lipis.github.io/flag-icon-css/flags/4x3/it.svg',
                pl: 'https://lipis.github.io/flag-icon-css/flags/4x3/pl.svg',
                fr: 'https://lipis.github.io/flag-icon-css/flags/4x3/fr.svg',
                es: 'https://lipis.github.io/flag-icon-css/flags/4x3/es.svg',   
                de: 'https://lipis.github.io/flag-icon-css/flags/4x3/de.svg',
                da: 'https://lipis.github.io/flag-icon-css/flags/4x3/dk.svg',
                sv: 'https://lipis.github.io/flag-icon-css/flags/4x3/se.svg',
                tr: 'https://lipis.github.io/flag-icon-css/flags/4x3/tr.svg',
                ja: 'https://lipis.github.io/flag-icon-css/flags/4x3/jp.svg',
                el: 'https://lipis.github.io/flag-icon-css/flags/4x3/gr.svg'                          
            }            

        },
        methods: {
            // To search movies
            searchMovie() {
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: this.api_key,
                            query: this.searchQuery,
                            language: 'it-IT'
                        }
                    })
                    .then((response) => {
                        const result = response.data.results;
                        this.resultMovies = result;                                                
                    })                    
            },
            // To search tv shows
            searchTvShows() {
                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: this.api_key,
                            query: this.searchQuery,
                            language: 'it-IT'
                        }
                    })
                    .then((response) => {
                        const result = response.data.results;
                        this.resultTvShows = result;                                                                        
                    }) 
            },
            // To get the vote of a movie/tvShow:
            // Return a number representing the manipouled vote
            getVote(element) {
                let roundedVote = Math.ceil(element.vote_average / 2)
                return roundedVote
            },
            // To get the year of a film/Tv Show:
            // element --> The movie or Tv Show
            // property --> a string representing the key of the property representing the year of release.
            // Return: a string representing the year of release
            getYear(element, property) {
                let year = element[property].slice(0, 4);
                return year;
            },   
            // To get the cast of a movie/tv show         
            getCredits(element, type) {  
                let id = element.id;
                axios
                    .get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
                        params: {
                            api_key: this.api_key
                        }
                    })
                    .then((response) => {
                        const cast = response.data.cast;
                        cast.splice(5, cast.length - 5);
                        this.cast = cast;                      
                    })                                        
            },
            // To open and close the credits container
            toggleCredits() {
                this.openCredits = !this.openCredits;
            },
            // To get the genre for each movie/tv-show.
            // Take an array of Ids of the genres and returns a string representing the corresponding genres
            getGenre(arrayIds) {
                let newArrayGenres = [];
                arrayIds.forEach((element) => {
                    this.genres.forEach((obj) => {
                        if (element === obj.id) {                            
                            newArrayGenres.push(obj.name);
                        }
                    })
                })                
                return newArrayGenres.join(', ');
            },
            filterElement(element) {
                let isRightGenre = false
                element.genre_ids.forEach((id) => {
                    if(id === this.selectedGenre || this.selectedGenre === '') {                        
                        isRightGenre = true;                                                
                    }                    
                })   
                return isRightGenre            
            }            
        },
        mounted() {
            // To get the list of movie genres
            axios 
                .get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: this.api_key,
                        language: 'it-IT'
                    }
                })
                .then((response) => {                    
                    this.genres = response.data.genres;
                })
        }
          
    }
);