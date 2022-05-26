class Game {

    grid = null;
    grid_length = 9;

    players = {player1: '', player2: ''};

    /**
     * @description Creates an instance of Game.
     * @param {Object} params : parameters to configure Game instance
     * @memberof Game
     */
    constructor(...params){
        Object.keys(params[0]).forEach( k => this[k] = params[0][k] );
    }

    run(){
        this.drawGrid();
        this.getEvents();
    }

    /**
     * @description draw basic grid of the game
     * @memberof Game
     */
    drawGrid(){
        let html = '';
        for(let i=0; i < this.grid_length; i++){
            html += `<div data-cell-index="${i}" class="cell" data-action="setpion"></div>`;
        }
        this.grid.innerHTML = html;
    }

    /**
     * @description Start a new game -> reload interface
     * @memberof Game
     */
    restart(){}

    /**
     * @description Handle events action in the interface
     * @memberof Game
     */
    getEvents(){

        document.addEventListener('click', (evt) => {
            let btn = evt.target.closest('[data-action]');
            if( btn != null ){
                let m = `action${btn.dataset.action[0].toUpperCase()+btn.dataset.action.slice(1)}`;
                if( typeof(this[m]) == 'function' ) this[m](btn);
            }
        })

        document.querySelectorAll('#players-names input').forEach( (input) => {
            input.addEventListener('keyup', (evt) => {
                let player = {
                    name: input.name,
                    value: input.value
                };
                this.setPlayer( player );
            })
        })
    }

    /**
     * @description Action to begin the game
     * @memberof Game
     */
    actionStartgame(){
        let canStart = this.verifPlayerName();
        if( canStart ){
            Swal.fire({
                icon: 'info',
                title: `Good game !`,
                showConfirmButton: false,
                timer: 1500
            })
            this.grid.classList.remove('uk-invisible');
        }
    }

    actionSetpion(btn){
        console.log('btn :', btn);
    }

    /**
     * @description Verification of players names
     * @memberof Game
     */
    verifPlayerName(){
        let canStart = false;
        for( let indexplayer in this.getPlayers() ){
            let player = this.getPlayers()[indexplayer];
            if( player == '' ){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `No name for ${indexplayer}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                canStart = false;
                return canStart;
            } else {
                canStart = true;
            }
        }
        return canStart;
    }

    /**
     * @description Get informations of players
     * @memberof Game
     */
    getPlayers(){
        return this.players;
    }

    /**
     * @description Set informations of players
     * @param {Object} players
     * @memberof Game
     */
    setPlayer( player ){
        this.players[player.name] = player.value;
    }
}