chrome.system.cpu.getInfo(function(info) {
    document.getElementById('modelName').textContent = info.modelName;
});

chrome.system.cpu.getInfo(function(info) {
    document.getElementById('numOfThreads').textContent = info.numOfProcessors;
});

chrome.system.memory.getInfo(function(info) {
    document.getElementById('availableCapacity').textContent = info.availableCapacity;
});

chrome.system.memory.getInfo(function(info) {
    document.getElementById('totalCapacity').textContent = info.capacity;
});

function getDimensions(){
    document.getElementById('resolution').textContent = window.screen.width * window.devicePixelRatio+ "x" + window.screen.height * window.devicePixelRatio;
}

getDimensions();
