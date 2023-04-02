function stateChange(event) {
    //event.data = 1 (song is playling)
    if (event.data === 1) {
        this.$store.commit({ type: 'play' })
    }
    //event.data = 0 (song has ended)
    if (event.data === 0) {
        this.$store.commit({ type: 'pause' })
        //resets the interval that counts the duration of the song
        clearInterval(this.intervalId)
        //set the current time to 0 preparing for the next song to play 
        this.currentTime = 0
        //check if repeat or shuffle is on and set actions accordingly 
        if (this.isRepeating) {
            this.$store.commit({ type: 'setSameSong' })
        }
        else if (this.isShuffling) {
            this.$store.commit({ type: 'setRandomSong' })
        }
        else {
            this.$store.commit({ type: 'setNextSong' })
        }
        //set the song player to set the next song
        this.$refs.songPlayer.playVideo()
        this.$store.commit({ type: 'play' })
        //sets the song player to play the next song
        this.onReady()
    }
}
function onReady() {
    //updates new song's duration
    this.duration = this.$refs.songPlayer.getDuration()
    //activates an interval that will update the current time of the song every second 
    this.intervalId = setInterval(() => {
        this.currentTime = this.$refs.songPlayer.getCurrentTime()
    }, 1000)
    //plays the song    
    this.$refs.songPlayer.playVideo()
    this.$store.commit({ type: 'play' })
}