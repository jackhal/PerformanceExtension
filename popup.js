function displayBytes(bytes, decimalPlaces = 2) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';

    let i = 0;
    for (; bytes >= 1024 && i < units.length - 1; i++) {
        bytes /= 1024;
    }

    return `${bytes.toFixed(decimalPlaces)} ${units[i]}`;
}

chrome.system.cpu.getInfo(function(info) {
    document.getElementById('modelName').textContent = info.modelName;
    document.getElementById('numOfThreads').textContent = info.numOfProcessors;
});

chrome.system.memory.getInfo(function(info) {
    document.getElementById('availableCapacity').textContent = displayBytes(info.availableCapacity);
    document.getElementById('totalCapacity').textContent = displayBytes(info.capacity);
});

chrome.processes.onUpdated.addListener(function(processes) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var currentTab = tabs[0]; 
        chrome.processes.getProcessIdForTab(currentTab.id, function(processId) {
            var process = processes[processId];
            if (process) {
                var cpuElement = document.getElementById('cpuUsage');
                if (cpuElement) {
                    if(process.cpu == undefined){
                        cpuElement.textContent = '0%';
                    }else{
                        cpuElement.textContent = parseFloat(process.cpu.toFixed(2)) + '%';
                    }
                }

                var cssCache = document.getElementById('cssCache');
                if(cssCache){
                    cssCache.textContent = displayBytes(process.cssCache.liveSize) + '/' + displayBytes(process.cssCache.size);
                }

                var imageCache = document.getElementById('imageCache');
                if(imageCache){
                    imageCache.textContent = displayBytes(process.imageCache.liveSize) + '/' + displayBytes(process.imageCache.size);
                }

                var jsMemory = document.getElementById('jsMemory');
                if(jsMemory){
                    jsMemory.textContent = displayBytes(process.jsMemoryUsed) + '/' + displayBytes(process.jsMemoryAllocated);
                }

                var network = document.getElementById('network');
                if(network){
                    network.textContent = displayBytes(process.network) + '/s';
                }

                var scriptCache = document.getElementById('scriptCache');
                if(scriptCache){
                    scriptCache.textContent = displayBytes(process.scriptCache.liveSize) + '/' + displayBytes(process.scriptCache.size);
                }

                var sqliteMemory = document.getElementById('sqliteMemory');
                if(sqliteMemory){
                    if(process.sqliteMemory == undefined){
                        sqliteMemory.textContent = 'N/A';
                    }else{
                        sqliteMemory.textContent = displayBytes(process.sqliteMemory);
                    }
                }
            }
        });
    });
});


function getDimensions(){
    document.getElementById('resolution').textContent = window.screen.width * window.devicePixelRatio+ "x" + window.screen.height * window.devicePixelRatio;
}

getDimensions();
