$(function(){

    var words = ["CHANGE", "CANE", "CAGE", "ACE", "HANG"];   

    $("#circle div span img").click(function(e){
        shuffle();
    })

    var createdWord = [];
    var letter = false;
    function shuffle(e){
        if (createdWord.length == 0) {  // Only run the shuffle function if no word is being created
          var letters = ['C', 'H', 'A', 'N', 'G', 'E'];
        
          for (let i = 0; i < 6; i++){
            let randNum = Math.floor(Math.random() * letters.length);
            $(`#l${i + 1}`).text(`${letters[randNum]}`);
            letters.splice(randNum, 1);
          }
        }else { // If a word is being created, animate the shuffle button to indicate an error
            $(`#circle div span img`).animate({
            marginLeft: "-=10px"
            }, 50).animate({
            marginLeft: "+=20px"
            }, 100).animate({
            marginLeft: "-=20px"
            }, 100).animate({
            marginLeft: "+=20px"
            }, 100).animate({
            marginLeft: "-=10px"
            }, 50);
        }
    }    

    $("#circle #hint").click(function(){
        $("#squares span").each(function() {
          if ($(this).css("opacity") != 1) {
            $(this).fadeIn(2500).css("opacity", "0.5").delay(1000).fadeOut(2500, function () {
              $(this).fadeIn(2500).css("opacity", "0");
            });
          }
        });
    });

    for (let j = 0; j < 6; j++){
        $(`.letters #l${j+1}`).click(function(){
            // Check if the letter has already been selected
            if (!$(this).hasClass("selected")) {
                createdWord.push($(this).text());
                $(this).css("background", "red");
                $(`#word`).append($(this).text());
                // Add the selected class to the letter
                $(this).addClass("selected");
            } else {
                // Display an animation to indicate an error
                $(this).animate({
                    left: "-=10"
                }, 50).animate({
                    left: "+=20"
                }, 100).animate({
                    left: "-=20"
                }, 100).animate({
                    left: "+=20"
                }, 100).animate({
                    left: "-=10"
                }, 50);
            }
        });
    }
    
    var userWord = createdWord.join("");
    for (let i = 0; i < words.length; i++) {
      if (userWord == words[i]) {
        // Set the text of the span elements in the table to the corresponding letters of the valid solution
        for (let k = 0; k < userWord.length; k++) {
          $(`#squares span:eq(${k})`).text(userWord[k]);
        }
        // Clear the created word and reset the background colors of the letters
        createdWord = [];
        $(`.letters div`).css("background", "white");
        $(`#word`).text("");
        break;
      }
    }
    
    function checkWord() {
        
        var userWord = $('#word').text();
       
        if (userWord === "CHANGE"){
            for (let i = 2; i < 8; i++){
                $(`#change #squares #3${i}`).css("opacity", "1");
                $(`#change #squares`).css("background", "purple");
                $(`#change #squares #3${i}`).css("color", "white");
            }
        } else if (userWord === "CAGE"){
            for (let i = 1; i < 5; i++){
                $(`#cage #squares #5${i}`).css("opacity", "1");
                $(`#cage #squares`).css("background", "purple");
                $(`#cage #squares #5${i}`).css("color", "white");
            }
        } else if (userWord === "CANE"){
            for (let i = 2; i < 6; i++){
                $(`#${i}4`).css("opacity", "1");
                $(`.cane`).css("background", "purple");
                $(`.cane #${i}4`).css("color", "white");
            }
        } else if (userWord === "ACE"){
            for (let i = 1; i < 4; i++){
                $(`#${i}7`).css("opacity", "1");
                $(`.ace`).css("background", "purple");
                $(`.ace #${i}7`).css("color", "white");
            }
        }else if (userWord === "HANG"){
            for (let i = 6; i < 10; i++){
                $(`#1${i}`).css("opacity", "1");
                $(`#hang #squares`).css("background", "purple");
                $(`#hang #squares #1${i}`).css("color", "white");
            }
        }

        createdWord = [];
        $(`.letters div`).css("background", "white");
        $(`.letters div`).removeClass("selected");
        $(`#word`).text("");
    }

    $('.letters div').contextmenu(function(event) {
        // Prevent the default context menu from appearing
        event.preventDefault();
        
        // Call the "checkWord" function
        checkWord();
    });
      
    function shakeWord() {
        $('#word').animate({
          left: "-=10"
        }, 50).animate({
          left: "+=20"
        }, 100).animate({
          left: "-=20"
        }, 100).animate({
          left: "+=20"
        }, 100).animate({
          left: "-=10"
        }, 50);
    }
});