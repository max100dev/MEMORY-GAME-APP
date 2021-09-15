
const playerSettings = {
    difficulty:null,
    category:null
};

const gameSettings = () => {
    const difficultyBtns = document.querySelectorAll(".btn-difficulties");
    const categoryBtns = document.querySelectorAll(".btn-categories");

    difficultyBtns.forEach(btn => btn.addEventListener("click", e => {
        const rawValue = e.target.innerText;
        const value = rawValue.toLowerCase();
        playerSettings.difficulty = value;
    }));

    categoryBtns.forEach(btn => btn.addEventListener("click", e => {
        const rawValue = e.target.innerText;
        const value = rawValue.toLowerCase();
        playerSettings.category = value;
        playerSettings.difficulty ? adjustToUsersChoice() :null;
    }));
};

gameSettings();



const adjustToUsersChoice = () => {
    const userGameBody = {
        cards: null,
        lives: null,
        pictures: {picture1: null, picture2: null, picture3: null,picture4: null, picture5: null, picture6: null},
        filteredPics: [],
        filterPhotos(num){
            const {pictures:pics} = this;
            this.filteredPics = [pics.picture1, pics.picture2, pics.picture3, pics.picture4, pics.picture5, pics.picture6];
            if(num === 0){ 
                this.filteredPics 
            };
        
            
            for(let i = 0; i < num; i++){
                const random = Math.floor(Math.random()*this.filteredPics.length);
                this.filteredPics.splice(random, 1);
            };
            
        
        
            this.filteredPics = [...this.filteredPics, ...this.filteredPics]; // Create duplicates of already "filtered" pics to create pair.
            return this.filteredPics;
    
        }
        
    }
    

    const {pictures: pics} = userGameBody;
    

    switch(playerSettings.difficulty){
        case 'easy':
            userGameBody.cards = 6;
            userGameBody.lives = 4;
            break;
        case 'medium':
            userGameBody.cards = 8;
            userGameBody.lives = 5;
            break;
            
        case 'hard':
             userGameBody.cards = 12;
             userGameBody.lives = 10;
            break;

        
    };


    switch(playerSettings.category){
        case 'animals':
            pics.picture1 = `./img/animals/cat.png`,
            pics.picture2 = `./img/animals/cow.png`;
            pics.picture3 = `./img/animals/dog1.png`;
            pics.picture4 = `./img/animals/dog2.png`;
            pics.picture5 = `./img/animals/fish.png`;
            pics.picture6 = `./img/animals/eagle.png`;
            break;
        case 'history':
            pics.picture1 = `./img/history/history1.png`;
            pics.picture2 = `./img/history/history2.png`;
            pics.picture3 = `./img/history/history3.png`;
            pics.picture4 = `./img/history/history4.png`;
            pics.picture5 = `./img/history/history5.png`;
            pics.picture6 = `./img/history/history6.png`;
            break;
        case 'programming':
            pics.picture1 = `./img/programming/code1.png`;
            pics.picture2 = `./img/programming/code2.png`;
            pics.picture3 = `./img/programming/code3.png`;
            pics.picture4 = `./img/programming/code4.png`;
            pics.picture5 = `./img/programming/code5.png`;
            pics.picture6 = `./img/programming/code6.png`;
            break;
       
    };

    
    switch(playerSettings.difficulty){
        case 'easy':
            userGameBody.filterPhotos(3);
            break;
        case 'medium':
            userGameBody.filterPhotos(2);
            break;
        case 'hard':
            userGameBody.filterPhotos(0);
            break;
    };

    const createCards = (cards, lives) => {
            const cardBody = document.querySelector(".card-container");

            for(let i = 0; i < cards; i++) {
                const card = document.createElement("div");
                card.classList.add("card");
                cardBody.appendChild(card);

                const front = document.createElement("div");
                front.classList.add("front");
                card.appendChild(front);

                const back = document.createElement("div");
                back.classList.add("back");
                card.appendChild(back);

                const backImg = document.createElement("img");
                backImg.classList.add("back-img");
                const random = Math.floor(Math.random()*userGameBody.filteredPics.length);
                backImg.src = userGameBody.filteredPics[random];
                userGameBody.filteredPics.splice(random, 1);
                back.appendChild(backImg);
            };


            for(let i = 0; i < lives; i++) {
                const lives = document.querySelector(".lives");
                const life = document.createElement("div");
                life.classList.add("life");
                lives.appendChild(life);
            };

    
    
            
            
    };
    
    createCards(userGameBody.cards, userGameBody.lives);
    gameRules(userGameBody.lives, userGameBody.cards);
    };


    const gameRules = (lives, panels) => {
        const cards = document.querySelectorAll(".card");

        const rules = {
            openedFirstCard: false,
            openedSecondCard: false,
            panels: panels,     // Panels reffers to the number of cards which were set by user's choice at difficulty stage, key word panel is used here because of multiple usage of word "cards" which has different meaning in that function, "panels" is used only once in its meaning at line 234.
            lives: lives,
            toCompare: [],
            indexOfCards: []
        };

        cards.forEach((card, index) => card.addEventListener("click",  () => {

            // Start game when the first card isn't opened.
            if(rules.openedFirstCard === false) {
                
                card.style.pointerEvents = `none`; // When user clicked on the card, it becomes unclickable temporary.

                rules.openedFirstCard = true; // Pass information that first card has been opened.
                card.classList.add("rotate"); // Rotate card to see the image on the other side of card.
                const back = card.lastChild ;// Get the element where that image is in.
                
                rules.toCompare.push(back.innerHTML); // Push html tag to comparing images array.
                rules.indexOfCards.push(index); // Push index of clicked card to index comparing array.
                

            }

            // Continue playing when first card was opened but second isn't. 
            else if(rules.openedFirstCard === true && rules.openedSecondCard === false) {

                cards.forEach(card => card.style.pointerEvents = `none`); // When user clicked on the card, it becomes unclickable temporary.
                
                rules.openedSecondCard = true; // Pass information that second card has been opened.
                card.classList.add("rotate"); // Rotate card to see the image on the other side of card.
                const back = card.lastChild; // Get the element where that image is in.

                rules.toCompare.push(back.innerHTML) ;// Push html tag to comparing images array.
                rules.indexOfCards.push(index); // Push index of clicked card to index comparing array.
                

            } ;

            
        const compareCards = () => {
        

            
            // Compared cards match:
            if(rules.toCompare[0] === rules.toCompare[1]) {
                

                
                
                // Play the "guessed" sound.
                let audio = new Audio("./sounds/guessed.mp3");
                audio.volume = 0.01;
                audio.play();

                // Show matched/win icon.
                const checkOrCrossBody = document.querySelector(".check-or-cross");
                const crossImg = document.createElement("img");
                crossImg.src = `./img/checkmark.png`;
                crossImg.classList.add("icon-graph");
                checkOrCrossBody.appendChild(crossImg);
                crossImg.style.animation = `game-img-display 2.3s backwards`;
                setTimeout(() => {
                    crossImg.remove();
                }, 2300);
                
                //Comments to the game. 
                const commentList = ["Nice!", "You're killing it!", "Wow!", "Fantastic!", "Isn't that too easy for you?", "Bull's eye!", "Bingo!" ];
                const commentHeading = document.querySelector(".game-title");
                const random = Math.floor(Math.random()*commentList.length);
                commentHeading.innerText = commentList[random];
                commentList.splice(random, 1);
                
                
                // Check if all cards were already guessed.
                const guesedCards = []
                cards.forEach(card => {
                    const rotated = card.classList.contains("rotate")
                    if(rotated) {
                        guesedCards.push("rotated");
                        card.style.pointerEvents = `none`;
                    }
                })
                
                if(guesedCards.length ===  panels ) {
                    gameWon();
                    return cards.forEach(card => card.style.pointerEvents = `none`);
                }

                // After 2 seconds give user ability to continue playing and freeze all cards that were matched.
                setTimeout(() => {
                    cards.forEach((card) => {
                        card.style.pointerEvents = `all`;
                        if(card.classList.contains("rotate")) {
                            card.style.pointerEvents = `none`;
                        };
                    })
                }, 2000);
                    
                // Reset all comparison tools
                rules.toCompare = [];
                rules.indexOfCards = [];
                rules.openedFirstCard = false;
                rules.openedSecondCard = false;
                    
            }
            // Compared cards don't match:
            else { 

                // Play the "failed" sound.
                let audio = new Audio("./sounds/failed.mp3");
                audio.volume = 0.01;
                audio.play();

                // Show cross/failed icon.
                const checkOrCrossBody = document.querySelector(".check-or-cross");
                const crossImg = document.createElement("img");
                crossImg.src = `./img/cross.png`;
                crossImg.classList.add("icon-graph");
                checkOrCrossBody.appendChild(crossImg);
                crossImg.style.animation = `game-img-display 2.3s backwards`;
                setTimeout(() => {
                    crossImg.remove()
                }, 2300);

                //Comments to the game. 
                const commentList = ["Dont'Worry!", "That was close!", "Try again!", "Bloody game!", "Next time!", "Close!", "Don't give up!", "Really?", "Damn it!", "Come on!" ];
                const commentHeading = document.querySelector(".game-title");
                const random = Math.floor(Math.random()*commentList.length);
                commentHeading.innerText = commentList[random];
                commentList.splice(random, 1);
                


                // Check if user did not used his all chances.
                const lives = document.querySelectorAll(".life");
                rules.lives--;
                if(rules.lives === 0) {;

                    cards.forEach(card => card.classList.add("rotate"));
                    
                    lives[0].style.animation = `subtract-life ease-in 3s forwards`;
                    lives[0].remove();
                    gameLost();
                    return cards.forEach(card => card.style.pointerEvents = `none`);

                } else {
                    lives[0].style.animation = `subtract-life ease-in 1s forwards`;
                    setTimeout(() => {
                        lives[0].remove()
                    }, 2300);
                }

                

                // Rotate back compared cards that didn't match.
                const firstCard = cards[rules.indexOfCards[0]];
                const secondCard = cards[rules.indexOfCards[1]];
                
                setTimeout(() => {
                    firstCard.classList.remove("rotate");
                    secondCard.classList.remove("rotate");
                    cards.forEach(card => card.style.pointerEvents = `all`);
                }, 2000);
                

                // Reset all comparison tools
                rules.toCompare = [];
                rules.indexOfCards = [];
                rules.openedFirstCard = false;
                rules.openedSecondCard = false;



            }
        }
        // Conditional to prevent unexpected bug.
        (rules.toCompare.length >= 2) ? compareCards() : null;
    
    
    }))


}

const difficulty = document.querySelector(".difficulty");
const difficultyButtons = document.querySelectorAll(".btn-difficulties");
const category = document.querySelector(".category");
const categoryButtons = document.querySelectorAll(".btn-categories");
const game = document.querySelector(".game");
const endLose = document.querySelector(".ended-by-lose");
const endWin = document.querySelector(".ended-by-win");

difficultyButtons.forEach(btn => btn.addEventListener("click", () => {
    difficulty.classList.add("hide-section");
    category.classList.add("display-section");
    categoryButtons.forEach(catBtn => catBtn.addEventListener("click", () => {
        category.classList.remove("display-section");
        category.classList.add("hide-section");
        game.classList.add("display-section");
    }))

}) );


const gameLost = () => {
    game.classList.remove("display-section");
    game.classList.add("longer-hide-section");
    endLose.classList.add("longer-display-section");
}
const gameWon = () => {
    game.classList.remove("display-section");
    game.classList.add("longer-hide-section");
    endWin.classList.add("longer-display-section");
}
