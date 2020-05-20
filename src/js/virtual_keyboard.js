// File Name:     virtual_keyboard.js
// By:            Darian Benam (GitHub: https://github.com/BeardedFish/)
// Date:          Wednesday, May 6, 2020

var virtualKeyboardCapsLockOn = false;
var virtualKeyboardShiftOn = false;

$(function()
{
    // Regular letters (a, b, c, etc.)
    $('#virtual-keyboard .keyboard-key').click(function()
    {
        var character = $(this).find("span").html(); // The actual key that was clicked on the virtual keyboard

        if ($(this).hasClass('uppercase'))
        {
            character = character.toUpperCase();
        }

        insertAtCaret(document.getElementById('write-area'), character);
        translit(this);
    });

    //
    $('#virtual-keyboard .symbol').click(function()
    {
        var character = $('span:visible', $(this)).html(); // Get the visible span inner text

        insertAtCaret(document.getElementById('write-area'), character);
        translit(this);
    });
});

$(function()
{
    $('#virtual-keyboard .special-keyboard-key').click(function()
    {
        var specialKey = $(this).find("span").html(); // The actual key that was clicked on the virtual keyboard

        if (specialKey === "Backspace")
        {
            var startPos = document.getElementById('write-area').selectionStart;
            var endPos = document.getElementById('write-area').selectionEnd;

            if (endPos == 0) // There is nothing to backspace
            {
                return;
            }

            var text = $("#write-area").val();
            var offset = startPos == endPos ? 1 : 0;
            var newText = text.substring(0, startPos - offset) + text.substring(endPos);
            
            $("#write-area").val(newText);
            $("#write-area").focus();
            $("#write-area").selectRange(startPos - offset);  

            return;
        }
        else if (specialKey === "Caps Lock")
        {
            $(this).toggleClass("special-key-on");
            $('.keyboard-key').toggleClass('uppercase');

            virtualKeyboardCapsLockOn = $(this).hasClass("special-key-on");

            if (!virtualKeyboardShiftOn)
            {
                toggleKeysUppercase();
            }

            return;
        }
        else if (specialKey === "Enter")
        {
            specialKey = '\n';
        }
        else if (specialKey === "Shift")
        {
            $('#left-shift').toggleClass('special-key-on');
            $('#right-shift').toggleClass('special-key-on');
        
            $('.keyboard-key').toggleClass('uppercase');
            $('.symbol span').toggle();
            
            if (!virtualKeyboardCapsLockOn)
            {
                toggleKeysUppercase();
            }
        
            virtualKeyboardShiftOn = !virtualKeyboardShiftOn;
            
            return;
        }
        else if (specialKey === "Space")
        {
            specialKey = ' ';
        }
        else if (specialKey === "Tab")
        {
            specialKey = '\t';
        }

        insertAtCaret(document.getElementById('write-area'), specialKey);
    });
});

// https://stackoverflow.com/a/841121/11760346/
$.fn.selectRange = function(start, end)
{
    if (end === undefined)
    {
        end = start;
    }

    return this.each(function()
    {
        if('selectionStart' in this)
        {
            this.selectionStart = start;
            this.selectionEnd = end;
        }
        else if (this.setSelectionRange)
        {
            this.setSelectionRange(start, end);
        }
        else if (this.createTextRange)
        {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function insertAtCaret(element, text)
{
    if (document.selection)
    {
        element.focus();  

        var sel = document.selection.createRange();
        sel.text = text;

        element.focus();
    }
    else if (element.selectionStart || element.selectionStart === 0)
    {
        var startPos = element.selectionStart;
        var endPos = element.selectionEnd;
        var scrollTop = element.scrollTop;

        element.value = element.value.substring(0, startPos) + text + element.value.substring(endPos, element.value.length);

        element.focus();

        element.selectionStart = startPos + text.length;
        element.selectionEnd = startPos + text.length;
        element.scrollTop = scrollTop;
    }
    else
    {
        element.value += text;

        element.focus();
    }
}

function toggleKeysUppercase()
{
    $(".keyboard-row").find("div").each(function()
    {
        if ($(this).hasClass("keyboard-key"))
        {
            var newChar = $(this).hasClass('uppercase') ? $(this).html().toUpperCase() : $(this).html().toLowerCase();
            $(this).html(newChar);
        }
    });
}