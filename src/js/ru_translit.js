// File Name:     ru_translit.js
// By:            Darian Benam (GitHub: https://github.com/BeardedFish/)
// Date:          Tuesday, May 5, 2020

var ctrlKeyDown = false;
var shiftWithArrowsDown = false;

var translitMap = [
    // [ "a", "a" ],
    [ "b", "б" ],
    [ "c", "ц" ],
    [ "d", "д" ],
    // [ "e", "е" ],
    [ "f", "ф" ],
    [ "g", "г" ],
    [ "h", "ч" ],
    [ "i", "и" ],
    [ "j", "й" ],
    [ "k", "к" ],
    [ "l", "л" ],
    [ "m", "м" ],
    [ "n", "н" ],
    [ "o", "о" ],
    [ "p", "п" ],
    [ "q", "я" ],
    [ "r", "р" ],
    [ "s", "с" ],
    [ "t", "т" ],
    [ "u", "у" ],
    [ "v", "в" ],
    [ "w", "ш" ],
    // [ "x", "x" ],
    [ "y", "ы" ],
    [ "z", "з" ],
    [ "`", "ё" ],
    [ "~", "Ё" ],
    [ "$", "₽" ],
    [ "#", "№" ],
    // [ "%", "" ],
    [ "=", "ъ" ],
    [ "+", "Ъ" ],
    [ "[", "ю" ],
    [ "{", "Ю" ],
    [ "]", "щ" ],
    [ "}", "Щ" ],
    [ "\\", "э" ],
    [ "|", "Э" ],
    [ ";", "ь" ],
    [ ":", "Ь" ],
    [ "'", "ж" ],
    [ "\"", "Ж" ],
    [ "<", "«" ],
    [ ">", "»" ]
];

$(window).on("load", function()
{
    $("#write-area").val("");

    $("#write-area").keydown(function(event)
    {
        ctrlKeyDown = event.ctrlKey;
        shiftWithArrowsDown = event.shiftKey && event.keyCode >= 37 && event.keyCode <= 40; // This is to prevent a bug that doesn't allow the user to highlight text with shift and arrow keys
    });

    $("#write-area").keyup(function()
    {
        if (!ctrlKeyDown && !shiftWithArrowsDown)
        {
            translit();
        }
    });

    $("#write-area").on("paste", function()
    {
        setTimeout(function() // If we don't put translit() in the setTimeout() function then the translit() function will never transliterate the pasted text 
        {
            translit();
        }, 100);
    });
});

function isUpperCase(str)
{
    if (str === '`' || str === '-' || str === '=' || str === ';' || str === '\'' || str === '[' || str === ']')
    {
        return false;    
    }

    return str === str.toUpperCase();
}

function translit()
{
    var text = $("#write-area").val();

    for (var i = 0; i < text.length; i++)
    {
        for (var j = 0; j < translitMap.length; j++)
        {
            if (translitMap[j][0] == text[i].toLowerCase())
            {
                // Replace the letter to its Russian equivelent
                var translitChar = isUpperCase(text[i]) ? translitMap[j][1].toUpperCase() : translitMap[j][1];
                text = text.substring(0, i) + translitChar+ text.substring(i + 1);

                // No need to check the other letters so just break out of the inner for loop
                break;
            }
        }
    }

    var caretPos = document.getElementById('write-area').selectionStart;

    $("#write-area").val(text);
    $("#write-area").selectRange(caretPos);  
}