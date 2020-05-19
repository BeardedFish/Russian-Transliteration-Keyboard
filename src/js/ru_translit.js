// File Name:     ru_translit.js
// By:            Darian Benam (GitHub: https://github.com/BeardedFish)
// Date:          Tuesday, May 5, 2020

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
    [ "$", "\"" ],
    [ "%", ":" ],
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
    [ "\"", "Ж" ]
];

$(document).ready(function()
{
    $('#write-area').val('');
});

function translit(event)
{
    var text = $('#write-area').val();

    for (var i = 0; i < text.length; i++)
    {
        for (var j = 0; j < translitMap.length; j++)
        {
            if (translitMap[j][0] == text[i].toLowerCase())
            {
                var translitChar;
                if (event.shiftKey === undefined || event.getModifierState === undefined)
                {
                    translitChar = translitMap[j][1];
                }
                else
                {
                    translitChar = event.shiftKey || event.getModifierState("CapsLock") ? translitMap[j][1].toUpperCase() : translitMap[j][1];
                }

                // Replace the letter to its Russian equivelent
                text = text.substring(0, i) + translitChar+ text.substring(i + 1);

                // No need to check the other letters so just break out of the inner for loop
                break;
            }
        }
    }

    var caretPos = document.getElementById('write-area').selectionStart;

    $('#write-area').val(text);
    $("#write-area").selectRange(caretPos);  
}