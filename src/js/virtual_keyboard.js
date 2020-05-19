// File Name:     virtual_keyboard.js
// By:            Darian Benam (GitHub: https://github.com/BeardedFish)
// Date:          Wednesday, May 6, 2020

$(function()
{
    $('#virtual-keyboard .keyboard-key').click(function()
    {
        var character = $(this).html(); // The actual key that was clicked on the virtual keyboard

        if (character === "Tab")
        {
            character = '\t';
        }
        else if (character === "Space")
        {
            character = ' ';
        }
        else if (character === "New Line")
        {
            character = '\n';
        }
        else if (character === "Backspace")
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

        insertAtCaret(document.getElementById('write-area'), character);
        translit(this);
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