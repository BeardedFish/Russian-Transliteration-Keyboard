// The text area on the page.
var $write = $('#write');

// Clear the text in the text area box when the page loads.
$(document).ready(function () {
    $write.val('');
});

$(function () {
    var shift = false,
        capslock = false;

    $('#keyboard li').click(function () {
        var $this = $(this),
            character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();

            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }

        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.letter').toggleClass('uppercase');
            capslock = true;
            return false;
        }

        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.html();

            $write.deleteAtCaret();
            return false;
        }

        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";

        // Uppercase letter
        if ($this.hasClass('uppercase')) character = character.toUpperCase();

        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');

            shift = false;
        }

        // Add the character
        $write.insertAtCaret(character);
    });
});

function translit(event) {
    var englishKeys = ["q", "w", "r", "t", "y", "u", "i", "p", "[", "]", "\'", "s", "d", "f", "g", "h", "j", "k", "l", ":", "'", "z", "c", "v", "b", "n", "m", ",", ".", "/"];
    var translitKey = ["я", "ш", "p", "т", "ы", "у", "и", "п", "ю", "щ", "э", "с", "д", "ф", "г", "ч", "й", "к", "л", "Ь", "ж", "з", "ц", "в", "б", "н", "м", ";", ",", "="];

    var replaced = false; // States whether the key has been translit or not.
    var char; // The character to be written onto the text area.

    for (var i = 0; i < englishKeys.length; i++) {
        if (englishKeys[i].toLowerCase() == event.key.toLowerCase()) {
            if (event.shiftKey) {
                char = translitKey[i].toUpperCase();
            } else {
                char = translitKey[i];
            }

            replaced = true;
            break;
        }
    }

    if (replaced) {
        event.preventDefault()
        $write.insertAtCaret(char);
    }
}

jQuery.fn.extend({
    insertAtCaret: function (myValue) {
        return this.each(function (i) {
            if (document.selection) {
                // For browsers like Internet Explorer:
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            }
            else if (this.selectionStart || this.selectionStart == '0') {
                // For browsers like Firefox and Webkit based:
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    },
    deleteAtCaret: function () {
        return this.each(function (i) {
            if (document.selection) {
                // For browsers like Internet Explorer:
                this.focus();
                var sel = document.selection.createRange();
                sel.text = '';
                this.focus();
            }
            else if (this.selectionStart || this.selectionStart == '0') {
                // For browsers like Firefox and Webkit based:
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                if (startPos == endPos) {
                    this.value = this.value.substring(0, startPos - 1) + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos - 1;
                    this.selectionEnd = startPos - 1;
                    this.scrollTop = scrollTop;
                } else {
                    this.value = this.value.substring(0, startPos) + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos;
                    this.selectionEnd = startPos;
                    this.scrollTop = scrollTop;
                }
            } else {
                this.value = this.value.substring(0, this.value.length - 2);
                this.focus();
            }
        });
    }
});