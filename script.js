document.addEventListener('DOMContentLoaded', () => {
    const draggable = document.getElementById('draggable');
    const target = document.getElementById('target');
    
    // Add event listeners for drag events
    draggable.addEventListener('dragstart', dragStart);
    
    target.addEventListener('dragenter', dragEnter);
    target.addEventListener('dragover', dragOver);
    target.addEventListener('dragleave', dragLeave);
    target.addEventListener('drop', drop);
    
    // Drag functions
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', 'dragged');
        setTimeout(() => {
            this.classList.add('dragging');
        }, 0);
    }
    
    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('dragover');
    }
    
    function dragOver(e) {
        e.preventDefault();
        this.classList.add('dragover');
    }
    
    function dragLeave() {
        this.classList.remove('dragover');
    }
    
    function drop(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        
        // Check if the dragged element is our draggable box
        if (e.dataTransfer.getData('text/plain') === 'dragged') {
            // Add success class to target
            this.classList.add('success');
            
            // Create fireworks
            createFireworks();
            
            // Reset after animation (1 second)
            setTimeout(() => {
                this.classList.remove('success');
                draggable.classList.remove('dragging');

                // Reset the draggable element position
                // This is optional - you can remove this if you want the element to stay in the target
                draggable.style.opacity = '1';
            }, 1000);
        }
    }
});