// Dashboard JavaScript for 90 Degree Robotics

document.addEventListener('DOMContentLoaded', function() {
    // Device selection functionality
    const deviceLinks = document.querySelectorAll('[data-device]');
    const currentDeviceElement = document.getElementById('currentDevice');
    const connectionStatusElement = document.getElementById('connectionStatus');
    const batteryLevelElement = document.getElementById('batteryLevel');
    const batteryProgressBar = document.querySelector('.progress-bar');
    const currentOperationElement = document.getElementById('currentOperation');
    const lastUpdateElement = document.getElementById('lastUpdate');
    
    // Camera selection functionality
    const cameraLinks = document.querySelectorAll('[data-camera]');
    const cameraNameElement = document.querySelector('.camera-name');
    const cameraFeed = document.getElementById('cameraFeed');
    
    // Control buttons
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const homeBtn = document.getElementById('homeBtn');
    const refreshStatusBtn = document.getElementById('refreshStatus');
    
    // Camera control buttons
    const panLeftBtn = document.getElementById('panLeft');
    const panRightBtn = document.getElementById('panRight');
    const panUpBtn = document.getElementById('panUp');
    const panDownBtn = document.getElementById('panDown');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const toggleFullscreenBtn = document.getElementById('toggleFullscreen');
    
    // Telemetry elements
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const motorSpeedElement = document.getElementById('motorSpeed');
    const cpuUsageElement = document.getElementById('cpuUsage');
    const memoryUsageElement = document.getElementById('memoryUsage');
    const uptimeElement = document.getElementById('uptime');
    const signalStrengthElement = document.getElementById('signalStrength');
    
    // Operation mode radios
    const modeAutoRadio = document.getElementById('modeAuto');
    const modeManualRadio = document.getElementById('modeManual');
    
    // Mock device data - in a real implementation, this would come from an API
    const deviceData = {
        'team-mobile-wagon-1': {
            name: 'Team Mobile Wagon #1',
            status: 'Online',
            batteryLevel: 78,
            operation: 'Standby',
            lastUpdate: 'Apr 20, 2025 12:15 PM',
            telemetry: {
                temperature: '24.5°C',
                humidity: '42%',
                motorSpeed: '0 RPM',
                cpuUsage: '12%',
                memoryUsage: '156 MB',
                uptime: '3 days, 4 hours',
                signalStrength: 'Strong'
            }
        },
        'deep-dropping-cart-1': {
            name: 'Deep Dropping Cart #1',
            status: 'Online',
            batteryLevel: 65,
            operation: 'Navigation',
            lastUpdate: 'Apr 20, 2025 12:10 PM',
            telemetry: {
                temperature: '26.2°C',
                humidity: '38%',
                motorSpeed: '120 RPM',
                cpuUsage: '34%',
                memoryUsage: '245 MB',
                uptime: '1 day, 7 hours',
                signalStrength: 'Good'
            }
        },
        'prototype-device-1': {
            name: 'Prototype Device #1',
            status: 'Offline',
            batteryLevel: 0,
            operation: 'Powered Off',
            lastUpdate: 'Apr 19, 2025 3:45 PM',
            telemetry: {
                temperature: 'N/A',
                humidity: 'N/A',
                motorSpeed: 'N/A',
                cpuUsage: 'N/A',
                memoryUsage: 'N/A',
                uptime: 'N/A',
                signalStrength: 'None'
            }
        }
    };
    
    // Mock camera data
    const cameraData = {
        '1': {
            name: 'Camera 1',
            status: 'Live',
            source: 'images/camera-placeholder.jpg'
        },
        '2': {
            name: 'Camera 2',
            status: 'Live',
            source: 'images/camera-placeholder.jpg'
        },
        '3': {
            name: 'Camera 3',
            status: 'Offline',
            source: 'images/camera-placeholder.jpg'
        }
    };
    
    // Function to update device information
    function updateDeviceInfo(deviceId) {
        const device = deviceData[deviceId];
        if (!device) return;
        
        currentDeviceElement.textContent = device.name;
        
        // Update connection status with appropriate badge
        let statusBadge = `<span class="badge bg-success">Online</span>`;
        if (device.status === 'Offline') {
            statusBadge = `<span class="badge bg-danger">Offline</span>`;
        } else if (device.status === 'Warning') {
            statusBadge = `<span class="badge bg-warning">Warning</span>`;
        }
        connectionStatusElement.innerHTML = statusBadge;
        
        // Update battery level and progress bar
        batteryLevelElement.textContent = `${device.batteryLevel}%`;
        batteryProgressBar.style.width = `${device.batteryLevel}%`;
        
        // Set appropriate color for battery level
        if (device.batteryLevel > 60) {
            batteryProgressBar.className = 'progress-bar bg-success';
        } else if (device.batteryLevel > 20) {
            batteryProgressBar.className = 'progress-bar bg-warning';
        } else {
            batteryProgressBar.className = 'progress-bar bg-danger';
        }
        
        currentOperationElement.textContent = device.operation;
        lastUpdateElement.textContent = device.lastUpdate;
        
        // Update telemetry
        temperatureElement.textContent = device.telemetry.temperature;
        humidityElement.textContent = device.telemetry.humidity;
        motorSpeedElement.textContent = device.telemetry.motorSpeed;
        cpuUsageElement.textContent = device.telemetry.cpuUsage;
        memoryUsageElement.textContent = device.telemetry.memoryUsage;
        uptimeElement.textContent = device.telemetry.uptime;
        signalStrengthElement.innerHTML = `<i class="fas fa-signal"></i> ${device.telemetry.signalStrength}`;
        
        // Enable/disable controls based on device status
        const controlsEnabled = device.status === 'Online';
        startBtn.disabled = !controlsEnabled;
        stopBtn.disabled = !controlsEnabled;
        pauseBtn.disabled = !controlsEnabled;
        homeBtn.disabled = !controlsEnabled;
        modeAutoRadio.disabled = !controlsEnabled;
        modeManualRadio.disabled = !controlsEnabled;
    }
    
    // Function to update camera feed
    function updateCameraFeed(cameraId) {
        const camera = cameraData[cameraId];
        if (!camera) return;
        
        cameraNameElement.textContent = camera.name;
        
        // Update camera status
        const cameraStatusElement = document.querySelector('.camera-status');
        cameraStatusElement.textContent = camera.status;
        cameraStatusElement.style.color = camera.status === 'Live' ? '#0f0' : '#f00';
        
        // Update camera feed image
        const cameraImage = cameraFeed.querySelector('img');
        cameraImage.src = camera.source;
        
        // Enable/disable camera controls based on status
        const controlsEnabled = camera.status === 'Live';
        panLeftBtn.disabled = !controlsEnabled;
        panRightBtn.disabled = !controlsEnabled;
        panUpBtn.disabled = !controlsEnabled;
        panDownBtn.disabled = !controlsEnabled;
        zoomInBtn.disabled = !controlsEnabled;
        zoomOutBtn.disabled = !controlsEnabled;
    }
    
    // Initialize with default device
    updateDeviceInfo('team-mobile-wagon-1');
    
    // Device selection event listeners
    deviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const deviceId = this.getAttribute('data-device');
            updateDeviceInfo(deviceId);
            
            // Update dropdown button text
            document.getElementById('deviceSelector').textContent = deviceData[deviceId].name;
        });
    });
    
    // Camera selection event listeners
    cameraLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const cameraId = this.getAttribute('data-camera');
            updateCameraFeed(cameraId);
            
            // Update dropdown button text
            document.getElementById('cameraSelector').textContent = `Camera ${cameraId}`;
        });
    });
    
    // Refresh status button
    refreshStatusBtn.addEventListener('click', function() {
        const currentDevice = currentDeviceElement.textContent;
        let deviceId = 'team-mobile-wagon-1'; // Default
        
        // Find the device ID based on the name
        for (const [id, device] of Object.entries(deviceData)) {
            if (device.name === currentDevice) {
                deviceId = id;
                break;
            }
        }
        
        // Simulate refresh with loading indicator
        this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Refreshing...';
        this.disabled = true;
        
        setTimeout(() => {
            updateDeviceInfo(deviceId);
            this.innerHTML = 'Refresh';
            this.disabled = false;
            
            // Update last update time
            const now = new Date();
            const formattedTime = now.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
            lastUpdateElement.textContent = formattedTime;
            
            // Show a temporary success message
            const statusContainer = document.querySelector('.status-container');
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Device status refreshed successfully!';
            statusContainer.appendChild(successAlert);
            
            setTimeout(() => {
                successAlert.remove();
            }, 3000);
        }, 1500);
    });
    
    // Control button event listeners
    startBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        currentOperationElement.textContent = 'Starting...';
        
        setTimeout(() => {
            currentOperationElement.textContent = 'Running';
            motorSpeedElement.textContent = '150 RPM';
            cpuUsageElement.textContent = '45%';
            
            // Show a temporary success message
            const controlsContainer = document.querySelector('.device-controls');
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Device started successfully!';
            controlsContainer.appendChild(successAlert);
            
            setTimeout(() => {
                successAlert.remove();
            }, 3000);
        }, 1000);
    });
    
    stopBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        currentOperationElement.textContent = 'Stopping...';
        
        setTimeout(() => {
            currentOperationElement.textContent = 'Standby';
            motorSpeedElement.textContent = '0 RPM';
            cpuUsageElement.textContent = '12%';
            
            // Show a temporary success message
            const controlsContainer = document.querySelector('.device-controls');
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Device stopped successfully!';
            controlsContainer.appendChild(successAlert);
            
            setTimeout(() => {
                successAlert.remove();
            }, 3000);
        }, 1000);
    });
    
    pauseBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        currentOperationElement.textContent = 'Pausing...';
        
        setTimeout(() => {
            currentOperationElement.textContent = 'Paused';
            motorSpeedElement.textContent = '0 RPM';
            cpuUsageElement.textContent = '18%';
            
            // Show a temporary success message
            const controlsContainer = document.querySelector('.device-controls');
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Device paused successfully!';
            controlsContainer.appendChild(successAlert);
            
            setTimeout(() => {
                successAlert.remove();
            }, 3000);
        }, 1000);
    });
    
    homeBtn.addEventListener('click', function() {
        if (this.disabled) return;
        
        currentOperationElement.textContent = 'Returning Home...';
        
        setTimeout(() => {
            currentOperationElement.textContent = 'Homing Complete';
            motorSpeedElement.textContent = '0 RPM';
            cpuUsageElement.textContent = '10%';
            
            // Show a temporary success message
            const controlsContainer = document.querySelector('.device-controls');
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Device returned home successfully!';
            controlsContainer.appendChild(successAlert);
            
            setTimeout(() => {
                successAlert.remove();
            }, 3000);
        }, 2000);
    });
    
    // Camera control event listeners
    panLeftBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Panning left...');
    });
    
    panRightBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Panning right...');
    });
    
    panUpBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Panning up...');
    });
    
    panDownBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Panning down...');
    });
    
    zoomInBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Zooming in...');
    });
    
    zoomOutBtn.addEventListener('click', function() {
        if (this.disabled) return;
        showCameraControlFeedback('Zooming out...');
    });
    
    // Function to show camera control feedback
    function showCameraControlFeedback(message) {
        const cameraContainer = document.querySelector('.camera-container');
        
        // Check if feedback element already exists
        let feedbackElement = cameraContainer.querySelector('.camera-feedback');
        if (!feedbackElement) {
            feedbackElement = document.createElement('div');
            feedbackElement.className = 'camera-feedback';
            feedbackElement.style.position = 'absolute';
            feedbackElement.style.top = '50%';
            feedbackElement.style.left = '50%';
            feedbackElement.style.transform = 'translate(-50%, -50%)';
            feedbackElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            feedbackElement.style.color = 'white';
            feedbackElement.style.padding = '10px 20px';
            feedbackElement.style.borderRadius = '5px';
            feedbackElement.style.zIndex = '100';
            cameraContainer.appendChild(feedbackElement);
        }
        
        feedbackElement.textContent = message;
        
        setTimeout(() => {
            feedbackElement.remove();
        }, 1000);
    }
    
    // Fullscreen toggle
    toggleFullscreenBtn.addEventListener('click', function() {
        const cameraContainer = document.querySelector('.camera-container');
        
        if (!document.fullscreenElement) {
            if (cameraContainer.requestFullscreen) {
                cameraContainer.requestFullscreen();
            } else if (cameraContainer.webkitRequestFullscreen) {
                cameraContainer.webkitRequestFullscreen();
            } else if (cameraContainer.msRequestFullscreen) {
                cameraContainer.msRequestFullscreen();
            }
            
            cameraContainer.classList.add('fullscreen-mode');
            
            // Add exit fullscreen button
            const exitBtn = document.createElement('button');
            exitBtn.className = 'fullscreen-exit';
            exitBtn.innerHTML = '<i class="fas fa-times"></i>';
            exitBtn.addEventListener('click', function() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            });
            cameraContainer.appendChild(exitBtn);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });
    
    // Handle fullscreen change
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        const cameraContainer = document.querySelector('.camera-container');
        
        if (!document.fullscreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
            cameraContainer.classList.remove('fullscreen-mode');
            
            // Remove exit button if it exists
            const exitBtn = cameraContainer.querySelector('.fullscreen-exit');
            if (exitBtn) {
                exitBtn.remove();
            }
        }
    }
    
    // Operation mode change
    modeAutoRadio.addEventListener('change', function() {
        if (this.checked) {
            showModeChangeFeedback('Switching to Automatic mode...');
        }
    });
    
    modeManualRadio.addEventListener('change', function() {
        if (this.checked) {
            showModeChangeFeedback('Switching to Manual mode...');
        }
    });
    
    function showModeChangeFeedback(message) {
        const controlsContainer = document.querySelector('.device-controls');
        const feedbackAlert = document.createElement('div');
        feedbackAlert.className = 'alert alert-info mt-3';
        feedbackAlert.textContent = message;
        controlsContainer.appendChild(feedbackAlert);
        
        setTimeout(() => {
            feedbackAlert.textContent = 'Mode changed successfully!';
            feedbackAlert.className = 'alert alert-success mt-3';
            
            setTimeout(() => {
                feedbackAlert.remove();
            }, 2000);
        }, 1500);
    }
    
    // Simulate periodic updates (in a real implementation, this would be websockets or polling)
    setInterval(() => {
        // Simulate battery drain
        const currentDevice = currentDeviceElement.textContent;
        let deviceId = null;
        
        // Find the device ID based on the name
        for (const [id, device] of Object.entries(deviceData)) {
            if (device.name === currentDevice) {
                deviceId = id;
                break;
            }
        }
        
        if (deviceId && deviceData[deviceId].status === 'Online') {
            // Only update if the device is online
            if (deviceData[deviceId].batteryLevel > 0 && 
                deviceData[deviceId].operation !== 'Standby' && 
                deviceData[deviceId].operation !== 'Powered Off') {
                deviceData[deviceId].batteryLevel -= 1;
                updateDeviceInfo(deviceId);
            }
        }
    }, 60000); // Update every minute
});
