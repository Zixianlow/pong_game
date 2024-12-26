export const TournamentState = {
    tournamentData: null,

    setTournamentData(data) {
        this.tournamentData = data;
        this.saveTournamentData();
    },

    getTournamentData() {
        if (!this.tournamentData) {
            this.loadTournamentData();
        }
        return this.tournamentData;
    },

    saveTournamentData() {
        localStorage.setItem('tournamentData', JSON.stringify(this.tournamentData));
    },

    loadTournamentData() {
        const data = localStorage.getItem('tournamentData');
        if (data) {
            this.tournamentData = JSON.parse(data);
        }
    },

    clearTournamentData() {
        this.tournamentData = null;
        localStorage.removeItem('tournamentData');
    }
};