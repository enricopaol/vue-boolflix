var app = new Vue(
    {
        el: '#root',
        data: {
            api_key: 'eb9246517e88c3bbd5a354470a892d61',
            searchQuery: '',
            resultMovies: []            
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
                        console.log(result)

                        this.resultMovies = result;
                    })                                        
            }
        }
    }
);