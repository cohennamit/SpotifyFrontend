export async function getSongs(query) {
    const API_KEY = 'AIzaSyBCisp-vtFHADlUJuhG563ZQW3osxaj_eQ';
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=1&key=${API_KEY}`
            // `https://www.googleapis.com/youtube/v3/search?part=snippet,contentDetails&q=${this.query}&type=video&maxResults=10&key=${API_KEY}`
        );
        const { items } = await response.json();
        return items
        // const searchResults = items 
        // if(this.isSearchPage){
        // this.$router.push(`/search/${this.query}`);
    // }
    } catch (error) {
        console.error(error);
    }
}