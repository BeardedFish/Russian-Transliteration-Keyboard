/*
 * File Name: ru_translit.js
 * Purpose:
 * Date: Tuesday, May 5, 2020
 */

var translitMap = [
    [ "q", "я" ],
    [ "w", "ш" ],
    [ "r", "р" ],
    [ "t", "т" ],
    [ "y", "ы" ],
    [ "u", "у" ],
    [ "i", "и" ],
    [ "p", "п" ],
    [ "[", "ю" ],
    [ "]", "щ" ],
    [ "\'", "ж" ],
    [ "\\", "э" ],
    [ "s", "с" ],
    [ "d", "д" ],
    [ "f", "ф" ],
    [ "g", "г" ],
    [ "h", "х" ],
    [ "j", "й" ],
    [ "k", "к" ],
    [ "l", "л" ],
    [ ";", "ь" ],
    [ ":", "Ь" ],
    [ "'", "ж" ],
    [ "z", "з" ],
    [ "c", "ц" ],
    [ "v", "в" ],
    [ "b", "б" ],
    [ "n", "н" ],
    [ "m", "м" ],
    [ ",", ";" ],
    [ ".", "," ],
    [ "/", "=" ],
    [ "?", "%" ],
    [ "`", "ё" ],
    [ "~", "Ё" ],
    [ "!", "№" ],
    [ "@", "!" ],
    [ "#", "/" ],
    [ "$", "\"" ],
    [ "%", ":" ],
    [ "^", "«" ],
    [ "*", "»" ],
    [ "=", "ъ" ],
    [ "+", "Ъ" ]
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
                // Replace the letter to its Russian equivelent
                var translitChar = event.shiftKey ? translitMap[j][1].toUpperCase() : translitMap[j][1];
                text = text.substring(0, i) + translitChar+ text.substring(i + 1);

                // No need to check the other letters so just break out of the inner for loop
                break;
            }
        }
    }

    $('#write-area').val(text);
}