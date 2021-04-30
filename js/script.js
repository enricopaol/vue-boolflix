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
            getVote(element) {
                let roundedVote = Math.ceil(element.vote_average / 2)
                return roundedVote
            },
            getYear(element, property) {
                let year = element[property].slice(0, 4);
                return year;
            },            
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
            toggleCredits() {
                console.log('cliccami')
                this.openCredits = !this.openCredits;
            }            
        }
          
    }
);