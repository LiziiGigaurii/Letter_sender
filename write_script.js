
  const nameInput = document.getElementById('username');
  const display = document.getElementById('to-display');
  const paper = document.getElementById('paper');
  const editor = document.getElementById('editor');
  const inkPicker = document.getElementById('inkColor');
  const bgPicker = document.getElementById('bgColor');

  nameInput.addEventListener('input', () => {
    display.textContent = nameInput.value || "_______";
  });

  function changePaperColor(color) {
    paper.style.backgroundColor = color;
  }

  function addSticker(emoji) {
    const sticker = document.createElement('div');
    sticker.className = 'placed-sticker';
    sticker.innerHTML = emoji;
    sticker.style.left = '50px';
    sticker.style.top = '100px';
    sticker.ondblclick = function() {
        sticker.style.transform = "scale(0)";
        setTimeout(() => sticker.remove(), 200);
    };
    paper.appendChild(sticker);
    makeElementDraggable(sticker);
  }

  function makeElementDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
  }

  function clearAll() {
    if(confirm("Reset everything?")) {
        document.querySelectorAll('.placed-sticker').forEach(s => s.remove());
        paper.style.backgroundColor = "#ffffff";
        bgPicker.value = "#ffffff";
        editor.style.color = "#444444";
        inkPicker.value = "#444444";
        editor.innerHTML = "";
    }
  }

  function sendLetter() {
    const recipient = document.getElementById('username').value;
    if (!recipient) {
        alert("Please enter a username first!");
        return;
    }
}

const modal = document.getElementById('customModal');

// Change your old clearAll function to this:
function clearAll() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// This runs when they click "Reset All" in the modal
function confirmClear() {
    // 1. Remove stickers
    document.querySelectorAll('.placed-sticker').forEach(s => s.remove());
    
    // 2. Reset colors
    paper.style.backgroundColor = "#ffffff";
    document.getElementById('bgColor').value = "#ffffff";
    editor.style.color = "#444444";
    document.getElementById('inkColor').value = "#444444";
    
    // 3. Clear text
    editor.innerHTML = "";
    
    // 4. Close the modal
    closeModal();
}

const warningModal = document.getElementById('warningModal');

function sendLetter() {
    const recipient = document.getElementById('username').value;

    if (!recipient || recipient.trim() === "") {
        warningModal.style.display = 'flex';
    } else {
        // For now, it just sends the default browser alert on success
        alert("Your letter to " + recipient + " has been sent!");
    }
}

function closeWarning() {
    warningModal.style.display = 'none';
}