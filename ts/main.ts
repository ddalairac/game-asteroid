import { EventHandler } from './event-handler.js';
import { Game } from './game.js';
import { Render } from './render.js';

new Render()
new Game()
new EventHandler()


const ascii_logo = `
                _                 _     _   
      /\\       | |               (_)   | |  
     /  \\   ___| |_ ___ _ __ ___  _  __| |  
    / /\\ \\ / __| __/ _ \\ '__/ _ \\| |/ _  |  
   / ____ \\\\__ \\ ||  __/ | | (_) | | (_| |  
  /_/    \\_\\___/\\__\\___|_|  \\___/|_|\\__,_|  
                                            `;

const ascii_iso = `
                     //\\                    
                    // \\\\                   
                   //   \\\\                  
                 _//_____\\\\_                
                 \\    |    /                
                //\\   |   /\\\\               
               //__\\__|__/__\\\\              
              *****************             `; 
const ascii_iso2 = `
                ( )  ( )  ( )               
               o   O  o  O   o              
                  . o o o .                 
                     . .                    
                                            
 `;

const ascii_by = `  by: Dalairac Diego                       
`;
const ascii_github = `   github.com/ddalairac/game-asteroid       
                                            `;


console.log("%c" + ascii_logo +
    "%c" + ascii_iso +
    "%c" + ascii_iso2 +
    "%c" + ascii_by+
    "%c" + ascii_github,
    'background: #222; color: white;',
    'background: #222; color: #bada55;',
    'background: #222; color: white;',
    'background: #222; color: white;',
    'background: #222; color: #bada55;')