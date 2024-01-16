let teamsArray = [];
let gamesArray = [];


// ### CLASSES & CONSTRUCTORS ###

// Enter game results to be later appended to teams
// HINT - consider deconstructing to give games unique IDs and display them easily
// e.g. all games are in one array let games = [{game}, {game}, ...]
// let [game1, game2, ...] = games
class Game {
    constructor (setsFor, setsAgainst, pointsFor, pointsAgainst) {
        //validating that input are numbers and not equal (no draw!)
        if(setsFor === setsAgainst) {
            console.log('Invalid input - setsFor and setsAgainst can not be equal');
        } else if (typeof setsFor !== 'number' || typeof setsAgainst !== 'number' || typeof pointsFor !== 'number' || typeof pointsAgainst !== 'number') {
            console.log('Invalid input - only numbers are allowed as values')
        } else {
        this._setsFor = setsFor;
        this._setsAgainst = setsAgainst;
        this._pointsFor = pointsFor;
        this._pointsAgainst = pointsAgainst;
        }
    }
        //getter
        get setsFor() {return this._setsFor;}
        get setsAgainst() {return this._setsAgainst;}
        get pointsFor() {return this._pointsFor;}
        get pointsAgainst() {return this._pointsAgainst;}
    }

class TeamOfTwo {
    constructor(player1, player2) {
        //describing the team
        this._nameP1 = player1;
        this._nameP2 = player2;
        this._nameTeam = player1 + ' / ' + player2;

        //stats
        this._gamesPlayed = 0;
        this._gamesWon = 0;
        this._gamesLost = 0;
        this._setsWon = 0;
        this._setsLost = 0;
        this._pointsWon = 0;
        this._pointsLost = 0;
        }

        //getters
        get nameP1() {return this._nameP1;}
        get nameP2() {return this._nameP2;}
        get nameTeam() {return this._nameTeam;}

        get gamesPlayed() {return this._gamesPlayed;}
        get gamesWon() {return this._gamesWon;}
        get gamesLost() {return this._gamesLost;}
        get setsWon() {return this._setsWon;}
        get setsLost() {return this._setsLost;}
        get pointsWon() {return this._pointsWon;}
        get pointsLost() {return this._pointsLost;}

        //setters for a game
        //game object has result a A vs B -> for TeamA call setter gamePlayedAsA, for TeamB call setter gamePlayedAsB
        set gamePlayedAsA (game) {
                this._gamesPlayed++;
                this._setsWon += game.setsFor;
                this._setsLost += game.setsAgainst;
                this._pointsWon += game.pointsFor;
                this._pointsLost += game.pointsAgainst;
                if (game.setsFor > game.setsAgainst) {
                    this._gamesWon++;
                } else {
                    this._gamesLost++;
                }
            }

        set gamePlayedAsB (game) {
            this._gamesPlayed++;
            this._setsWon += game.setsAgainst;
            this._setsLost += game.setsFor;
            this._pointsWon += game.pointsAgainst;
            this._pointsLost += game.pointsFor;
            if (game.setsFor < game.setsAgainst) {
                this._gamesWon++;
            } else {
                this._gamesLost++;
            }
        }
}


//--temp workspace for testing - remove later --//

const teamMolSorum = new TeamOfTwo('mol', 'sorum');
const teamEhlersWickler = new TeamOfTwo('ehlers', 'wickler');
const teamAhmanHelvig = new TeamOfTwo('ahman', 'helvig');
const teamPerusicSchweiner = new TeamOfTwo('perusic', 'schweiner');
teamsArray.push(teamMolSorum, teamEhlersWickler, teamAhmanHelvig, teamPerusicSchweiner);

//--temp workspace for testing - remove later --//

//######################################################################################//


// ### REGISTRATION ### //


// Save input fields to variables
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const saveButton = document.getElementById('saveTeam');
const teamsRegistered = document.getElementById('teamsRegistered')

// Registering a team upon click of button
saveButton.addEventListener('click', () => {    // Add Event listener for button
    let player1 = player1Input.value;           // Assign input field values to temp variables
    let player2 = player2Input.value;
    if(forbiddenInputs.includes(player1) || forbiddenInputs.includes(player2)) {    // Check that ignore when >= 1 input forbidden
        window.alert("Please only enter unique valid player names. If your team is not yet complete, please withhold your registration until it is.")
    } else {
        let newTeam = new TeamOfTwo(player1, player2);      // Create new TeamOfTwo with player input
        teamsArray.push(newTeam);                           // Push new team to teams-array
        forbiddenInputs.push(player1, player2)              // Add player names to forbiddenInputs to avoid duplicates
        player1Input.value = '';                            // Empty input fields
        player2Input.value = '';
        updateRegisteredTeamsList(teamsArray);              // Update displayed list of registered teams
    }
});

// Array ensuring no blank or tbd are entered
// Submitted (and permitted) player names are added to avoid duplicate entries
const forbiddenInputs = [
    '', ' ', 'blank', 'tbd'
]

// Updating displayed list of registered teams
function updateRegisteredTeamsList(array) {
    const container = document.getElementById('teamsRegistered');
    const listTitle = document.getElementById('registeredTeamsH');
    container.innerHTML = '';
    array.forEach(team => {
        const teamName = document.createElement('p'); // Create a paragraph element
        teamName.textContent = team.nameTeam; // Set the text content to the team's name

        container.appendChild(teamName); // Append the paragraph element to the container
    });
    listTitle.innerHTML = 'Teams registered: ' + teamsArray.length;
}



// ### ENTER RESULTS ### //


// Create array of nameTeams
let nameTeamArray = [];
const createNameTeamArray = (array) => {
    array.forEach(element => {
        nameTeamArray.push(element.nameTeam)
    });
}

createNameTeamArray(teamsArray); // Calling function to create list of teams to select from


// Save input fields to variables
const teamASelection = document.getElementById('teamADropdown');
const teamBSelection = document.getElementById('teamBDropdown');
const teamASets = document.getElementById('teamASets');
const teamBSets = document.getElementById('teamBSets');
const saveResult = document.getElementById('saveResult');
const gamesPlayed = document.getElementById('gamesPlayed')

// Filling the dropdown
function populateDropdown() {
    for (let i = 0; i < nameTeamArray.length; i++) {
      let option = document.createElement('option'); // Create a new option element
      option.text = nameTeamArray[i]; // Set the text content of the option
    //   option.value = nameTeamArray[i]; // Optionally, set the value attribute of the option
      teamASelection.appendChild(option); // Append the option to the select element
      teamBSelection.appendChild(option); // Append to second dropdown
    }
  }

  // Call the function to populate the dropdown
  populateDropdown();




// Update displayed list of registered teams --> later
// Saving a game result upon click of button
saveResult.addEventListener('click', () => {            // Add Event listener for button
    let teamA = teamAInput.value;                       // Assign input field values to temp variables
    let teamB = teamBInput.value;
    let newGame = new Game (teamA, teamB, 0, 0);        // Create new Game with results input
    gamesArray.push(newGame);                           // Push new game to games-array
    teamAInput.value = '';                              // Empty input fields
    teamBInput.value = '';
});
